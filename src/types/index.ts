export type RegisterUser = {
  name: string;
  apellidos: string;
  telefono: string;
  email: string;
  password: string;
  idusuario: string;
};

export const initialUserState: RegisterUser = {
  name: "",
  apellidos: "",
  telefono: "",
  email: "",
  password: "",
  idusuario: "",
};
