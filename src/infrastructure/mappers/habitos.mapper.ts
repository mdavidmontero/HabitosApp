import { Habito } from "../../domain/entities/habitos.entities";
import { HabitoResponse } from "../interfaces/habitos-response";

export class HabitoMapper {
  static toDomain(habito: HabitoResponse): Habito {
    return {
      id: habito.id,
      nombre: habito.nombre,
      descripcion: habito.descripcion,
      start_time: habito.start_time,
      reminder_time: habito.reminder_time,
      user_id: habito.user_id,
      days: habito.days,
    };
  }
}
