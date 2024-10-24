import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import {
  Image,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { RootStackParamList } from "../../router/StackNavigator";

export const HabitosHomeScreen = () => {
  const { width, height } = useWindowDimensions();
  const navigation =
    useNavigation<StackScreenProps<RootStackParamList>["navigation"]>();
  return (
    <View className="flex flex-row flex-wrap justify-between p-3">
      {/* Ingreso de Habitos */}
      <Pressable onPress={() => navigation.navigate("NewHabito")}>
        <View
          className="items-center justify-center m-2 bg-pink-500 shadow-lg rounded-2xl"
          style={{
            width: width * 0.42,
            height: height * 0.25,
          }}
        >
          <Image
            style={{ width: 80, height: 80 }}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/12192/12192697.png",
            }}
          />
          <Text className="mt-3 text-lg font-bold text-center text-white">
            Ingreso de Hábitos
          </Text>
        </View>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("CompletedHabito")}>
        <View
          className="items-center justify-center m-2 shadow-lg bg-amber-400 rounded-2xl"
          style={{
            width: width * 0.42,
            height: height * 0.25,
          }}
        >
          <Image
            style={{ width: 80, height: 80 }}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/12192/12192697.png",
            }}
          />
          <Text className="mt-3 text-lg font-bold text-center text-white">
            Listado Habitos
          </Text>
        </View>
      </Pressable>

      <Pressable onPress={() => console.log("Horas de Sueño")}>
        <View
          className="items-center justify-center m-2 bg-blue-400 shadow-lg rounded-2xl"
          style={{
            width: width * 0.42,
            height: height * 0.25,
          }}
        >
          <Image
            style={{ width: 80, height: 80 }}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/12192/12192697.png",
            }}
          />
          <Text className="mt-3 text-lg font-bold text-center text-white">
            Horas de Sueño
          </Text>
        </View>
      </Pressable>

      <Pressable onPress={() => console.log("Otro Hábito")}>
        <View
          className="items-center justify-center m-2 bg-green-500 shadow-lg rounded-2xl"
          style={{
            width: width * 0.42,
            height: height * 0.25,
          }}
        >
          <Image
            style={{ width: 80, height: 80 }}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/12192/12192697.png",
            }}
          />
          <Text className="mt-3 text-lg font-bold text-center text-white">
            Otro Hábito
          </Text>
        </View>
      </Pressable>

      <Text className="w-full mt-4 text-xl font-semibold text-center text-gray-800">
        En Curso
      </Text>
    </View>
  );
};
