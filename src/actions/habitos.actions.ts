import {
  doc,
  updateDoc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  query,
  where,
  setDoc,
  onSnapshot,
  CollectionReference,
  DocumentData,
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
