import { Text, View } from "react-native";

type CalorieDisplayProps = {
  calories: number;
  text: string;
};
export const CaloriesDisplay = ({ calories, text }: CalorieDisplayProps) => {
  return (
    <View className="flex flex-col items-center gap-2 font-bold text-center rounded-full">
      <Text className="font-black text-white text-md">{calories} </Text>
      <Text className="font-black text-white text-md">{text}</Text>
    </View>
  );
};
