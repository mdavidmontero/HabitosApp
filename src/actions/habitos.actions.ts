import { supabase } from "../config/supabase/supabase";

export const getHabitos = async (userId: string) => {
  const { data, error } = await supabase
    .from("habits")
    .select("*")
    .eq("user_id", userId);

  if (error) throw new Error("No se pudieron cargar los hábitos");
  return data;
};

export const getHabitosNotCompleted = async (userId: string) => {
  const today = new Date().toISOString().slice(0, 10);

  const { data: habits, error: habitsError } = await supabase
    .from("habits")
    .select("id, name")
    .eq("user_id", userId);

  if (habitsError) {
    console.error("Error al obtener los hábitos:", habitsError);
    return [];
  }

  const { data: completedLogs, error: logsError } = await supabase
    .from("habits_logs")
    .select("habit_id")
    .eq("date", today)
    .in(
      "habit_id",
      habits.map((habit) => habit.id)
    );

  if (logsError) {
    console.error("Error al obtener los logs:", logsError);
    return [];
  }

  const completedHabitIds = completedLogs.map((log) => log.habit_id);
  const uncompletedHabits = habits.filter(
    (habit) => !completedHabitIds.includes(habit.id)
  );

  return uncompletedHabits;
};

export const deleteHabito = async (id: number) => {
  const { error } = await supabase.from("habits").delete().eq("id", id);

  if (error) throw new Error("No se pudo eliminar el hábito");
};

export async function updateStreak(habitId: string, userId: string) {
  const today = new Date().toISOString().slice(0, 10);

  try {
    // Consultar el log del hábito para el día actual
    const { data: logData, error: logError } = await supabase
      .from("habits_logs")
      .select("*")
      .eq("habit_id", habitId)
      .eq("date", today)
      .limit(1); // Evitar que devuelva más de una fila

    // Si hay un error en la consulta, lo mostramos
    if (logError && logError.code !== "PGRST116") {
      console.error("Error al obtener logs:", logError);
      return;
    }

    if (!logData || logData.length === 0) {
      const { data: habitDetails, error: habitDetailsError } = await supabase
        .from("habits")
        .select("name")
        .eq("id", habitId)
        .single();

      if (habitDetailsError || !habitDetails) {
        console.error(
          "Error al obtener los detalles del hábito:",
          habitDetailsError
        );
        return;
      }
      console.log(today);
      console.log(habitDetails.name);
      console.log(habitId);
      const data = await supabase.from("habits_logs").insert({
        habit_id: habitId,
        name: habitDetails.name,
        date: today,
        completed: true,
      });
      console.log(data);

      const { data: habitData, error: habitError } = await supabase
        .from("habits")
        .select("streak, last_completed")
        .eq("id", habitId)
        .single();

      if (habitError) {
        console.error("Error al obtener hábito:", habitError);
        return;
      }

      // Calcular la nueva racha
      const lastCompletedDate = new Date(habitData?.last_completed);
      const streak = habitData?.streak || 0;
      let newStreak = streak;

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (
        lastCompletedDate.toISOString().slice(0, 10) ===
        yesterday.toISOString().slice(0, 10)
      ) {
        newStreak += 1;
      } else {
        newStreak = 1;
      }

      const { error: updateError } = await supabase
        .from("habits")
        .update({
          streak: newStreak,
          last_completed: today,
        })
        .eq("id", habitId);

      if (updateError) {
        console.error("Error al actualizar la racha:", updateError);
      }
    }
  } catch (err) {
    console.error("Error en la función updateStreak:", err);
  }
}
