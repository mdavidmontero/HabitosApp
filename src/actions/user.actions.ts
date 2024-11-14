import {
  getAuth,
  deleteUser,
  createUserWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import {
  collection,
  DocumentData,
  doc,
  setDoc,
  updateDoc,
  DocumentSnapshot,
  CollectionReference,
  getDoc,
} from "firebase/firestore";
import { db } from "../config/firebase/app";
import { User, UserRegisro } from "../domain/entities/user.entities";

export async function crearUsuario(usuario: UserRegisro): Promise<void> {
  try {
    const docuRef = doc(db, `usuarios/${usuario.id}`);
    await setDoc(docuRef, usuario);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
}

export async function crearUsuarioYAutenticacion(
  usuario: User,
  password: string
): Promise<void> {
  let userCredential: UserCredential | null = null;
  try {
    const auth = getAuth();
    userCredential = await createUserWithEmailAndPassword(
      auth,
      usuario.correo,
      password
    );

    if (userCredential.user) {
      const { uid } = userCredential.user;
      const usuarioConId: User = { ...usuario, id: uid };
      const docRef = doc(db, "usuarios", uid);
      await setDoc(docRef, usuarioConId);
    }
  } catch (error) {
    if (userCredential && userCredential.user) {
      await userCredential.user.delete();
    }
    console.error("Error al crear usuario y autenticación:", error);
    throw error;
  }
}

export async function obtenerUsuarioPorId(
  userId: string | undefined
): Promise<User | null> {
  if (!userId) {
    console.error("El ID del usuario es indefinido");
    return null;
  }

  try {
    const userDocRef = doc(db, "usuarios", userId);
    const userDocSnap: DocumentSnapshot<DocumentData> = await getDoc(
      userDocRef
    );
    if (userDocSnap.exists()) {
      return userDocSnap.data() as User;
    } else {
      console.error("No se encontró el usuario con el ID:", userId);
      return null;
    }
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error);
    throw error;
  }
}

export async function actualizarUsuario(
  userId: string,
  newData: Partial<User>
): Promise<void> {
  try {
    const userDocRef = doc(db, "usuarios", userId);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      await updateDoc(userDocRef, newData);
    } else {
      console.error("No se encontró el usuario con el ID:", userId);
      throw new Error("Usuario no encontrado");
    }
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw error;
  }
}
