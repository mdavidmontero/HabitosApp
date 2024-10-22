import { PropsWithChildren, useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { supabase } from "../../config/supabase/supabase";
import { LoadingScreen } from "../components/shared/LoadingScreen";
import { obtenerUsuarioPorId } from "../../actions/auth.actions";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { setUser, setSession } = useAuthStore();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session!);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setLoading(true);
      try {
        obtenerUsuarioPorId(session?.user.id!).then((data) => {
          if (data.length > 0) {
            setUser(data[0]);
          } else {
            setUser(null);
          }
        });
      } catch (error) {
        throw new Error("Error al obtener el usuario");
      }
      setLoading(false);
      setSession(session!);
    });
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
};
