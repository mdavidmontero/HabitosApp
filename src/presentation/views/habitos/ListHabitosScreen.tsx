import React from "react";
import { View, Pressable } from "react-native";
import { MainLayout } from "../../layouts/MainLayout";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HistoryHabitos } from "./HistoryHabitos";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../router/StackNavigator";

export const ListHabitosScreen = () => {
  const { top } = useSafeAreaInsets();
  const navigation =
    useNavigation<StackScreenProps<RootStackParamList>["navigation"]>();

  return (
    <MainLayout style={{ paddingTop: top + 40 }}>
      <View className="z-10">
        <Pressable
          onPress={() => navigation.navigate("newHabbito", { habito: "" })}
          className="absolute right-0 p-3 mx-4 bg-white rounded-full shadow-md"
        >
          <AntDesign name="pluscircleo" size={24} color="#2563eb" />
        </Pressable>

        <HistoryHabitos />
      </View>
    </MainLayout>
  );
};
