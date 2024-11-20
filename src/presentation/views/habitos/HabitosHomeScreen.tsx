import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { Text, View } from "react-native";
import { RootStackParamList } from "../../router/StackNavigator";
import { MainLayout } from "../../layouts/MainLayout";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CardsCustom from "../../components/shared/CardsCustom";
import { FlatList } from "react-native-gesture-handler";
import TitleCustom from "../../components/shared/TitleCustom";

export const HabitosHomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const navigation =
    useNavigation<StackScreenProps<RootStackParamList>["navigation"]>();

  const data = [
    "Realizar una rutina de meditación",
    "Hacer ejercicio",
    "Comer alimentos saludables",
    "Darle un pequeño descanso",
  ];
  return (
    <MainLayout style={{ paddingTop: top + 35 }}>
      <Text className="my-4 text-2xl font-semibold text-center text-white ">
        Hábitos
      </Text>
      <View className="z-10 flex-row flex-wrap items-center justify-center p-2 mx-5 bg-white rounded-3xl">
        <CardsCustom
          onPress={() => navigation.navigate("ListHabitos")}
          title="Nuevo Hábito"
          subtitle="Empieza hoy mismo"
          imagenUrl={require("../../../../assets/images/habito1.jpg")}
        />

        <CardsCustom
          onPress={() => navigation.navigate("CompletedHabito")}
          style={{
            marginLeft: 10,
          }}
          title="Habitos"
          subtitle="Completar un hábito"
          imagenUrl={require("../../../../assets/images/habito2.jpg")}
        />

        <CardsCustom
          onPress={() => navigation.navigate("CompletedHabito")}
          style={{
            marginTop: 30,
          }}
          title="Horas de Sueño"
          subtitle="Calidad de sueño"
          imagenUrl={require("../../../../assets/images/habito3.jpg")}
        />

        <CardsCustom
          onPress={() => navigation.navigate("CompletedHabito")}
          style={{
            marginTop: 30,
            marginLeft: 10,
          }}
          title="Otro Hábito"
          subtitle="Otro Hábito"
          imagenUrl={require("../../../../assets/images/habito4.jpg")}
        />
      </View>
      <TitleCustom title="En Curso" />
      <FlatList
        className="z-10 mx-4 my-2 bg-white rounded-2xl"
        data={data}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={(item) => item.toString()}
      />
      Flat
    </MainLayout>
  );
};

export const ListItem = ({ item }: { item: string }) => {
  return (
    <View className=" m-2 bg-[#b2ebf2] shadow-lg border-l-4 border-[#1c849e] rounded-lg">
      <Text className="p-2 ml-2 text-base font-bold text-start text-[#0f303d] ">
        {item}
      </Text>
    </View>
  );
};
