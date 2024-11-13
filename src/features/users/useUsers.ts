import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "../../services/apiUser";

export function useUsers() {

    const { isFetching, data: users  } = useQuery({
      queryKey: ["users"],
      queryFn: async() => {return await searchUsers()},
      throwOnError: true
    });
  
    return { isLoading: isFetching, users };
  }
  