import { useMutation } from "react-query";
import { LoginUser } from "../../../actions/auth.actions";
import { AuthApiError } from "@supabase/supabase-js";
import { AlertError } from "../../components/shared/Alert";

export interface Login {
  email: string;
  password: string;
}

export const useAuthMutation = ({ email, password }: Login) => {
  const { mutate, isLoading } = useMutation({
    mutationKey: ["login"],
    mutationFn: () => LoginUser(email, password),
    onError: (error: AuthApiError) => {
      AlertError(error.message);
    },
  });

  return {
    mutate,
    isLoading,
  };
};
