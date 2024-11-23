export interface Habito {
  id: string;
  nombre: string;
  descripcion: string;
  start_time: string;
  reminder_time: number;
  user_id: string | null;
  days: number[];
  completed: boolean;
}
