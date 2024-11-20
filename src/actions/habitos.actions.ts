import {
  doc,
  updateDoc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  where,
  setDoc,
  onSnapshot,
  CollectionReference,
  DocumentData,
  query,
} from "firebase/firestore";
import { db } from "../config/firebase/app";
import { Habito } from "../domain/entities/habitos.entities";

const habitosRef: CollectionReference<DocumentData> = collection(db, "habitos");

export const crearHabito = async (habito: Habito): Promise<void> => {
  try {
    const docRef = await addDoc(habitosRef, habito);
    await updateDoc(docRef, { id: docRef.id });
  } catch (error) {
    console.error("Error al crear hábito:", error);
    throw error;
  }
};

export const getHabitosByUser = async (userId: string): Promise<Habito[]> => {
  try {
    const querySnapshot = await getDocs(
      query(habitosRef, where("user_id", "==", userId))
    );
    const habitos = querySnapshot.docs.map((doc) => doc.data() as Habito);
    return habitos;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getHabitoById = async (id: string): Promise<Habito> => {
  try {
    const docRef = await getDoc(doc(habitosRef, id));
    const habito = docRef.data() as Habito;
    return habito;
  } catch (error) {
    console.log(error);
    return [] as never;
  }
};

export const updateHabito = async (
  id: string,
  newHabito: Partial<Habito>
): Promise<void> => {
  try {
    await updateDoc(doc(habitosRef, id), newHabito);
    console.log("Habito actualizado correctamente");
  } catch (error) {
    console.error("Error al actualizar hábito:", error);
    throw error;
  }
};
