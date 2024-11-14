import { useMutation } from "react-query";
import { AlertError, AlertSuccess } from "../../components/shared/Alert";
import { login } from "../../../actions/auth.actions";
import { FirebaseError } from "firebase/app";
import { obtenerUsuarioPorId } from "../../../actions/user.actions";
import { useAuthStore } from "../../store/useAuthStore";
import { useState } from "react";

export interface Login {
  email: string;
  password: string;
}

export const useAuthMutation = ({ email, password }: Login) => {
  const setUsers = useAuthStore((state) => state.setUser);
  const [error, setError] = useState<boolean>(false);
  const { mutate, isLoading } = useMutation({
    mutationKey: ["login"],
    mutationFn: () => login(email, password),
    onSuccess: async (data) => {
      try {
        const usuario = await obtenerUsuarioPorId(data!);
        if (usuario) {
          setUsers(usuario);
        } else {
          setError(true);
          AlertSuccess("Usuario no encontrado");
        }
      } catch (error: any) {
        setError(true);
        AlertSuccess(
          error.message ||
            "Credenciales incorrectas. Por favor, verifica tus datos e intenta de nuevo."
        );
      } finally {
        setError(false);
      }
    },
    onError: (error: FirebaseError | Error) => {
      AlertError(error.message);
    },
  });

  return {
    mutate,
    isLoading,
  };
};
