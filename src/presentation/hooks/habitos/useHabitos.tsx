import { useQuery } from "react-query";
import { format } from "date-fns";
import { getHabitosCompletados } from "../../../actions/habitos.actions";
import { useAuthStore } from "../../store/useAuthStore";
const todayDate = format(new Date(), "yyyy-MM-dd");

export const useHabitos = () => {
  const user = useAuthStore((state) => state.user);
  const habitosNotCompleted = useQuery({
    queryKey: ["habitosnotCompleted"],
    queryFn: () => getHabitosCompletados(user?.id!),
  });

  return {
    habitosNotCompleted,
  };
};
