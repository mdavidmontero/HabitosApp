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

import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";

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
    ("Habito actualizado correctamente");
  } catch (error) {
    console.error("Error al actualizar hábito:", error);
    throw error;
  }
};

export const marcarCompletado = async (id: string): Promise<void> => {
  try {
    const docRef = doc(habitosRef, id);
    const habito = (await getDoc(docRef)).data() as Habito;

    const isCompleted = habito.completed || false;

    await updateDoc(docRef, {
      completed: !isCompleted,
    });
  } catch (error) {
    console.error("Error al alternar el estado del hábito:", error);
    throw error;
  }
};

export const getHabitosCompletados = async (
  userId: string
): Promise<Habito[]> => {
  try {
    const querySnapshot = await getDocs(
      query(habitosRef, where("user_id", "==", userId))
    );

    const habitos = querySnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() } as Habito))
      .filter((habito) => habito.completed === false);

    return habitos;
  } catch (error) {
    console.error("Error al obtener hábitos completados:", error);
    throw error;
  }
};

export const saveStepsToFirebase = async (
  pastStepCount: number,
  currentStepCount: number,
  userId: string
) => {
  const today = format(new Date(), "yyyy-MM-dd");
  const stepsData = {
    date: today,
    pastStepCount,
    currentStepCount,
    user_id: userId,
  };

  try {
    await setDoc(doc(db, "steps", today), stepsData);
    await AsyncStorage.removeItem(`steps-${today}`);
  } catch (error) {
    console.error("Error saving steps to Firebase: ", error);
    throw new Error("Failed to save steps to Firebase.");
  }
};

// Guarda los pasos en una nueva colección de Firebase con timestamp
export const saveStepsToNewCollection = async (
  pastStepCount: number,
  currentStepCount: number
) => {
  const today = format(new Date(), "yyyy-MM-dd");
  const stepsData = {
    date: today,
    pastStepCount,
    currentStepCount,
    timestamp: new Date().toISOString(),
  };

  try {
    const docRef = await addDoc(
      collection(db, "newStepsCollection"),
      stepsData
    );
  } catch (error) {
    throw new Error("Failed to save steps to new collection.");
  }
};
