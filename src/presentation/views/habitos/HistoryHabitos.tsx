import { ActivityIndicator, Text, View } from "react-native";
import { useQuery } from "react-query";
import { getHabitosByUser } from "../../../actions/habitos.actions";
import { useAuthStore } from "../../store/useAuthStore";
import { FlatList, Pressable } from "react-native-gesture-handler";
import { Habito } from "../../../domain/entities/habitos.entities";
import { StackScreenProps } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../router/StackNavigator";

export const HistoryHabitos = () => {
  const user = useAuthStore((state) => state.user);
  const { data, isLoading } = useQuery({
    queryKey: ["habitos"],
    queryFn: () => getHabitosByUser(user?.id!),
  });
  return (
    <View className="flex items-center justify-center mt-5">
      <Text className="text-xl font-bold text-center text-white">
        Listado de Habitos
      </Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#2563eb" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ListItem item={item} />}
          className="w-full p-2"
        />
      )}
    </View>
  );
};

const ListItem = ({ item }: { item: Habito }) => {
  const navigation =
    useNavigation<StackScreenProps<RootStackParamList>["navigation"]>();

  return (
    <>
      <Pressable
        onPress={() => {
          navigation.navigate("newHabbito", { habito: item.id });
        }}
      >
        <View className="m-2 bg-[#b2ebf2] shadow-lg border-l-4 border-[#1c849e] rounded-lg">
          <Text className="p-2 ml-2 text-base font-bold text-start text-[#0f303d] ">
            {item.nombre}
          </Text>
        </View>
      </Pressable>
    </>
  );
};
