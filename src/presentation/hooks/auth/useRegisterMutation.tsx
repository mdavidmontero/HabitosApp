import { useMutation } from "react-query";
import { registerUser } from "../../../actions/auth.actions";
import { AlertError, AlertSuccess } from "../../components/shared/Alert";
import { RegisterUser } from "../../../types";

export const useRegisterUser = (user: RegisterUser) => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: () =>
      registerUser(
        user.nombres,
        user.apellidos,
        user.telefono,
        user.correo,
        user.password,
        user.roles
      ),
    onSuccess: () => {
      AlertSuccess("Usuario registrado correctamente");
    },
    onError: (error: any) => {
      AlertError("Error al registrar usuario: ");
    },
  });
};
