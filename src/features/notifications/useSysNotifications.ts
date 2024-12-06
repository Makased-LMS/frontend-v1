import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../../services/apiNotifications";

export function useSysNotifications(payload) {
    const { isFetching, data: notifications  } = useQuery({
        queryKey: ["notifications", payload],
        queryFn: async() => {
            const res = await getNotifications(payload)
            return res.data.items;
        },
        throwOnError: true
    });
    
    return { isLoading: isFetching, notifications };
}
