import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import handleTokens from '../../utils/handleTokens'

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { clearTokens } = handleTokens();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: () => {
      clearTokens();
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });

  return { logout, isLoading };
}
