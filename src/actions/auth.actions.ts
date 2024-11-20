import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  onAuthStateChanged,
  User,
  sendPasswordResetEmail,
} from "firebase/auth";
import { RolUsuario, UserRegisro } from "../domain/entities/user.entities";
import { crearUsuario } from "./user.actions";

const auth = getAuth();

export const registerUser = async (
  nombres: string,
  apellidos: string,
  telefono: string,
  correo: string,
  password: string,
  roles: RolUsuario
): Promise<string | null> => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      correo,
      password
    );
    const usuario: UserRegisro = {
      id: userCredential.user.uid,
      nombres,
      apellidos,
      telefono,
      correo,
      roles,
    };
    await crearUsuario(usuario);
    return userCredential.user.uid;
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      throw new Error("El correo electrónico ya está en uso.");
    }
    if (error.code === "auth/weak-password") {
      throw new Error("La contraseña debe tener al menos 6 caracteres.");
    }
    throw error;
  }
};

export const login = async (
  email: string,
  password: string
): Promise<string | null> => {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user.uid;
  } catch (error: any) {
    if (error.code == "auth/invalid-credential") {
      throw new Error("El correo electrónico o contraseña no son válidos.");
    }

    throw error;
  }
};
export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    throw new Error(
      "Error al enviar el correo de restablecimiento: " + error.message
    );
  }
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
};

export const onAuthStateChangedListener = (
  callback: (user: User | null) => void
): (() => void) => {
  return onAuthStateChanged(auth, callback);
};
