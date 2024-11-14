export interface User {
  id: string;
  nombres: string;
  apellidos: string;
  telefono: string;
  correo: string;
  password: string;
  roles: RolUsuario;
}

export interface UserRegisro {
  id: string;
  nombres: string;
  apellidos: string;
  telefono: string;
  correo: string;
  roles: RolUsuario;
}

export enum RolUsuario {
  ADMIN = "ADMIN",
  CLIENTE = "CLIENTE",
}
