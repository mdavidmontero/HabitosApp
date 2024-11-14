import React from "react";
import { View, FlatList, Text, Alert } from "react-native";
import { Button, CheckBox } from "@ui-kitten/components"; // UI Kitten Components
import { useQuery, useQueryClient } from "react-query";
import { useAuthStore } from "../../store/useAuthStore";
// import {
//   getHabitos,
//   getHabitosNotCompleted,
//   updateStreak,
// } from "../../../actions/habitos.actions";

const CompletedHabitosScreen = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  // const {
  //   data: habitos,
  //   error,
  //   isLoading,
  // } = useQuery(
  //   ["habitoscompleted", user?.id],
  //   () => getHabitosNotCompleted(user?.id!),
  //   {
  //     enabled: !!user?.id,
  //   }
  // );

  const handleCompleteHabit = async (habitId: any) => {
    try {
      // await updateStreak(habitId, user?.id!);
      queryClient.invalidateQueries("habitoscompleted");
      Alert.alert("Éxito", "Hábito completado correctamente");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo completar el hábito");
    }
  };

  const renderHabit = ({ item }: any) => (
    <View className="flex flex-row items-center mb-4">
      <CheckBox
        checked={item.completed}
        onChange={() => handleCompleteHabit(item.id)}
        style={{ marginRight: 8 }}
      />
      <Text className="text-lg">{item.name}</Text>
    </View>
  );

  // if (isLoading) return <Text>Cargando...</Text>;

  return (
    <View className="p-4">
      {/* <FlatList
        data={habitos}
        renderItem={renderHabit}
        keyExtractor={(item) => item.id.toString()}
      /> */}
    </View>
  );
};

export default CompletedHabitosScreen;
