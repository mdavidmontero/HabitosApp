import { Text, View } from "react-native";
import { useAuthStore } from "../../store/useAuthStore";

export const HomeScreen = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <View className="items-center justify-center flex-1">
      <Text>Hola {user?.name}</Text>
      <Text>Hola {user?.email}</Text>
    </View>
  );
};
