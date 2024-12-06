import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core";
import { readNotification } from "../../services/apiNotifications";


export function useNotificationsReader() {
    const notifications = useNotifications()
    const queryClient = useQueryClient();
    const { mutateAsync: notificationsReader, isPending } = useMutation({
        mutationFn: async (id: string) => {
            await readNotification(id)
            queryClient.invalidateQueries({ queryKey:['notifications'] })
        },
        onError: (err) => {            
            notifications.show(err.message.response?.data?.title, {
                severity: 'error',
                autoHideDuration: 3000,
            });
        }
    });

    return { notificationsReader, isLoading: isPending };
}
