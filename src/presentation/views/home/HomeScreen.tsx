import { ScrollView, Text, View } from "react-native";
import { useAuthStore } from "../../store/useAuthStore";
import { HabitosHomeScreen } from "../habitos/HabitosHomeScreen";

export const HomeScreen = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <ScrollView>
      <View className="flex-1">
        <HabitosHomeScreen />
      </View>
    </ScrollView>
  );
};
