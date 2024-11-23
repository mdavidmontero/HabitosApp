import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { ActivityIndicator, Text, View } from "react-native";
import { RootStackParamList } from "../../router/StackNavigator";
import { MainLayout } from "../../layouts/MainLayout";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CardsCustom from "../../components/shared/CardsCustom";
import { FlatList } from "react-native-gesture-handler";
import TitleCustom from "../../components/shared/TitleCustom";
import { useHabitos } from "../../hooks/habitos/useHabitos";
import { ListItem } from "../../components/shared/RenderItem";
import { useEffect, useState } from "react";
import { Habito } from "../../../domain/entities/habitos.entities";

export const HabitosHomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const [habitosDay, setHabitosDayt] = useState<Habito[]>([]);
  const { habitosNotCompleted } = useHabitos();
  const currentDay = new Date().getDay();
  useEffect(() => {
    if (habitosNotCompleted.data) {
      const habitosHoy = habitosNotCompleted.data!.filter((habito) =>
        habito.days.includes(currentDay)
      );
      setHabitosDayt(habitosHoy);
    }
  }, [habitosNotCompleted.data]);

  const navigation =
    useNavigation<StackScreenProps<RootStackParamList>["navigation"]>();
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
          onPress={() => navigation.navigate("DailyHabitsScreen")}
          style={{
            marginLeft: 10,
          }}
          title="Habitos"
          subtitle="Completar un hábito"
          imagenUrl={require("../../../../assets/images/habito2.jpg")}
        />

        <CardsCustom
          onPress={() => navigation.navigate("SleepTrackerScreen")}
          style={{
            marginTop: 30,
          }}
          title="Horas de Sueño"
          subtitle="Calidad de sueño"
          imagenUrl={require("../../../../assets/images/habito3.jpg")}
        />

        <CardsCustom
          onPress={() => navigation.navigate("PedometerScreen")}
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

      {habitosDay.length === 0 ? (
        <View className="z-10 items-center justify-center p-2 mx-5 my-3 bg-white rounded-2xl">
          <Text className="text-lg  text-center text-[#1d7c8d] font-black">
            No tienes hábitos hoy
          </Text>
        </View>
      ) : (
        <FlatList
          className="z-10 mx-4 my-2 bg-white rounded-2xl"
          data={habitosDay}
          renderItem={({ item }) => <ListItem item={item} />}
          keyExtractor={(item) => item.id}
        />
      )}
    </MainLayout>
  );
};
