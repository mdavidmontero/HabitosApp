import { useState } from "react";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { View, Text, FlatList, Pressable } from "react-native";
import {
  getHabitosByUser,
  marcarCompletado,
} from "../../../actions/habitos.actions";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAuthStore } from "../../store/useAuthStore";
import { format } from "date-fns";
import { MainLayout } from "../../layouts/MainLayout";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Habit = {
  id: string;
  nombre: string;
  completed?: boolean;
  days: number[];
};

export const DailyHabitsScreen = () => {
  const user = useAuthStore((state) => state.user);
  const currentDay = new Date().getDay();
  const todayDate = format(new Date(), "yyyy-MM-dd");
  const { top } = useSafeAreaInsets();
  const queryClient = useQueryClient();

  const [habitosLocal, setHabitosLocal] = useState<Habit[]>([]);

  const { data, isLoading } = useQuery<Habit[]>(
    ["habitosdias"],
    () => getHabitosByUser(user?.id!),
    {
      onSuccess: (data) => {
        setHabitosLocal(data);
      },
    }
  );

  const marcarCompletadoMutation = useMutation(
    async ({ id, date }: { id: string; date: string }) => {
      await marcarCompletado(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["habitosdias"]);
        queryClient.invalidateQueries(["habitosnotCompleted"]);
      },
      onError: (error) => {
        console.error("Error en la mutación:", error);
      },
    }
  );

  const handleToggleComplete = (id: string, isCompleted: boolean) => {
    setHabitosLocal((prevHabitos) =>
      prevHabitos.map((habito) =>
        habito.id === id ? { ...habito, completed: !isCompleted } : habito
      )
    );

    marcarCompletadoMutation.mutate({ id, date: todayDate });
  };

  const habitosHoy = habitosLocal.filter((habito) =>
    habito.days.includes(currentDay)
  );

  const calcularProgreso = () => {
    const habitosCompletados = habitosHoy.filter(
      (habito) => habito.completed === true
    ).length;
    const totalHabitos = habitosHoy.length;
    return totalHabitos > 0 ? (habitosCompletados / totalHabitos) * 100 : 0;
  };

  const progreso = calcularProgreso();

  return (
    <MainLayout>
      <View className="z-10 flex-1 p-4" style={{ paddingTop: top + 50 }}>
        <Text className="text-lg font-bold text-center text-white">
          Hábitos de Hoy
        </Text>

        <View className="flex items-center justify-center my-2 mb-5">
          <AnimatedCircularProgress
            size={180}
            width={18}
            fill={progreso}
            tintColor="#002D32"
            backgroundColor="#FFFFFF"
            rotation={0}
            padding={5}
          >
            {(fill) => (
              <View
                style={{
                  position: "absolute",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: "#FFFF", fontSize: 24, fontWeight: "bold" }}
                >
                  {Math.round(fill)}%
                </Text>
                <Text style={{ color: "#FFF", fontSize: 14 }}>Completados</Text>
              </View>
            )}
          </AnimatedCircularProgress>
        </View>

        <FlatList
          data={habitosHoy}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isCompleted = item.completed
              ? typeof item.completed === "boolean"
                ? item.completed
                : item.completed[todayDate] || false
              : false;

            return (
              <View className="flex flex-row items-center justify-between p-2 mb-2 bg-white rounded-lg shadow-lg">
                <Text className="text-base">{item.nombre}</Text>
                <Pressable
                  onPress={() => handleToggleComplete(item.id, isCompleted)}
                  className={`p-2 rounded-full ${
                    isCompleted ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <Text className="text-white">✓</Text>
                </Pressable>
              </View>
            );
          }}
        />
      </View>
    </MainLayout>
  );
};
