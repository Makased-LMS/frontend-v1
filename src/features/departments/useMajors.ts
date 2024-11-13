import { useQuery } from "@tanstack/react-query";
import { getMajors } from "../../services/apiMajors";

export function useMajors(departmentId: number) {

    const { isFetching, data: majors } = useQuery({
        queryKey: ["majors", departmentId],
        queryFn: async () => {                
            return await getMajors(departmentId)       
        },
    });

    return { isLoading: isFetching, majors };
}
