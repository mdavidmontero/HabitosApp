import { Category } from "../types";

export const categories: Category[] = [
  {
    id: 1,
    name: "Comida",
  },
  { id: 2, name: "Ejercicio" },
];

export type Activity = {
  category: number;
  name: string;
  calories: number;
};
