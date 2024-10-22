import { useMutation } from "react-query";
import { supabase } from "../../../config/supabase/supabase";
import { registerUser } from "../../../actions/auth.actions";
import { AuthApiError } from "@supabase/supabase-js";
import { AlertError } from "../../components/shared/Alert";
import { RegisterUser } from "../../../types";

export const useRegisterUser = (user: RegisterUser, resetUser: () => void) => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: () => registerUser(user.email, user.password),
    onSuccess: async (session) => {
      if (session) {
        const datos = await supabase.from("users").insert({
          name: user.name,
          apellidos: user.apellidos,
          telefono: user.telefono,
          email: user.email,
          idusuario: session.user.id,
        });

        if (datos.status == 201) {
          resetUser();
        }
      }
    },
    onError: (error: AuthApiError) => {
      AlertError(error.message);
    },
  });
};
