import { QueryClient, QueryCache } from "@tanstack/react-query";

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        // onError: (error) => {
        //     console.error(`Something went wrong: ${error}`);
        // },
    }),
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 60 * 60 * 1000,
            retry: (failureCount, error) => {
                if (error.response?.status === 401) {
                    return false;
                }
                return failureCount < 3;
            },

        },
    },
});

export default queryClient;