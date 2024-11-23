import { View, Text } from "react-native";
import { Habito } from "../../../domain/entities/habitos.entities";

export const ListItem = ({ item }: { item: Habito }) => {
  return (
    <View className=" m-2 bg-[#b2ebf2] shadow-lg border-l-4 border-[#1c849e] rounded-lg">
      <Text className="p-2 ml-2 text-base font-bold text-start text-[#0f303d] ">
        {item.nombre}
      </Text>
    </View>
  );
};
