import React from "react";
import { View, Text, Alert, StyleSheet, FlatList } from "react-native";
import { CheckBox } from "@ui-kitten/components";
import { useHabitos } from "../../hooks/habitos/useHabitos";

const CompletedHabitosScreen = () => {
  const { habitosNotCompleted } = useHabitos();

  const renderHabit = ({ item }: any) => (
    <View className="flex flex-row items-center mb-4">
      <CheckBox
        checked={item.completed}
        onChange={() => {}}
        style={{ marginRight: 8 }}
      />
      <Text className="text-lg">{item.name}</Text>
    </View>
  );

  return (
    <View className="p-4">
      <FlatList
        data={habitosNotCompleted.data}
        renderItem={renderHabit}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default CompletedHabitosScreen;
