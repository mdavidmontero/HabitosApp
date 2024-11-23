import { RolUsuario } from "../domain/entities/user.entities";

export type RegisterUser = {
  nombres: string;
  apellidos: string;
  telefono: string;
  correo: string;
  password: string;
  roles: RolUsuario;
};

export const initialUserState: RegisterUser = {
  nombres: "",
  apellidos: "",
  telefono: "",
  correo: "",
  password: "",
  roles: RolUsuario.CLIENTE,
};

export type Category = {
  id: number;
  name: string;
};

export type Activity = {
  id: string;
  category: number;
  name: string;
  calories: number;
};
