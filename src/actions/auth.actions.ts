import { AuthApiError } from "@supabase/supabase-js";
import { supabase } from "../config/supabase/supabase";

export const obtenerUsuarioPorId = async (idusuario: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("idusuario", idusuario);
  if (error) {
    throw error;
  }
  return data;
};

export const LoginUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error instanceof AuthApiError) {
    if (error.code === "invalid_credentials") {
      throw new Error("Credenciales Invalidas");
    }
  }
  return data;
};

export const registerUser = async (email: string, password: string) => {
  const {
    data: { session },
    error,
  } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  if (error instanceof AuthApiError) {
    if (error.code === "user_already_exists") {
      throw new Error("Usuario ya existe");
    }
  }
  return session;
};
