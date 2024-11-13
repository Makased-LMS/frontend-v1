import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core";
import { addUser, deleteUser, editUser, User } from "../../services/apiUser";

type UserPayload = {
    id?: number
    user?: User
}

type data = {
    payload: UserPayload,
    action: string
}

export function useDispatchUsers() {
    const queryClient = useQueryClient();
    const notifications = useNotifications();

    const { mutate: usersDispatch, isPending } = useMutation({
        mutationFn: async ({payload, action}: data) => {
            switch(action){
                case 'add': await addUser(payload.user); break;
                case 'edit': await editUser(payload.id, payload.user); break;
                case 'delete': await deleteUser(payload.id); break;
                default: throw new Error('Unknown action')
            }
        },
        onSuccess: () => {
            notifications.show('Successful Users action', {
                severity: 'success',
                autoHideDuration: 3000,
            });
            
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: (err) => {
            notifications.show(err.message, {
                severity: 'error',
                autoHideDuration: 3000,
            });
        }
    });

    return { usersDispatch, isLoading: isPending };
}
