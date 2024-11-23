import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import {
  getHabitosByUser,
  marcarCompletado,
} from "../../../actions/habitos.actions";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAuthStore } from "../../store/useAuthStore";
import { format } from "date-fns";
import { MainLayout } from "../../layouts/MainLayout";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Definir tipos
type Habit = {
  id: string;
  nombre: string;
  completed?: Record<string, boolean>;
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
    ({ id, date }: { id: string; date: string }) => marcarCompletado(id, date),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["habitosdias"]);
      },
    }
  );

  const handleToggleComplete = (id: string, isCompleted: boolean) => {
    setHabitosLocal((prevHabitos) =>
      prevHabitos.map((habito) =>
        habito.id === id
          ? {
              ...habito,
              completed: {
                ...habito.completed,
                [todayDate]: !isCompleted, // Alternar el estado
              },
            }
          : habito
      )
    );

    marcarCompletadoMutation.mutate({ id, date: todayDate });
  };

  const habitosHoy = habitosLocal.filter((habito) =>
    habito.days.includes(currentDay)
  );

  return (
    <MainLayout>
      <View className="flex-1 p-4" style={{ paddingTop: top + 50 }}>
        <Text className="text-lg font-bold text-center text-white">
          Hábitos de Hoy
        </Text>
        <FlatList
          data={habitosHoy}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="flex flex-row items-center justify-between p-2 mb-2 bg-white rounded-lg shadow-sm">
              <Text className="text-base">{item.nombre}</Text>
              <Pressable
                onPress={() =>
                  handleToggleComplete(item.id, !!item.completed?.[todayDate])
                }
                className={`p-2 rounded-full ${
                  item.completed?.[todayDate] ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <Text className="text-white">✓</Text>
              </Pressable>
            </View>
          )}
        />
      </View>
    </MainLayout>
  );
};
