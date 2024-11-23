import { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Pedometer } from "expo-sensors";
import { MainLayout } from "../../layouts/MainLayout";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";

import { saveStepsToFirebase } from "../../../actions/habitos.actions";
import { useAuthStore } from "../../store/useAuthStore";

export default function PedometerScreen() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const user = useAuthStore((state) => state.user);
  const { top } = useSafeAreaInsets();

  useEffect(() => {
    let stepSubscription: any = null;

    const loadStepsFromStorage = async () => {
      const today = format(new Date(), "yyyy-MM-dd");
      const storedData = await AsyncStorage.getItem(`steps-${today}`);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setPastStepCount(parsedData.pastStepCount);
        setCurrentStepCount(parsedData.currentStepCount);
      }
    };

    const subscribe = async () => {
      await loadStepsFromStorage();

      const isAvailable = await Pedometer.isAvailableAsync();
      setIsPedometerAvailable(String(isAvailable));

      if (isAvailable) {
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - 1);

        const pastStepCountResult = await Pedometer.getStepCountAsync(
          start,
          end
        );
        if (pastStepCountResult) {
          setPastStepCount((prev) => prev + pastStepCountResult.steps);
        }

        stepSubscription = Pedometer.watchStepCount((result) => {
          setCurrentStepCount(result.steps);
        });
      }
    };

    subscribe();

    return () => {
      if (stepSubscription) {
        stepSubscription.remove();
      }
    };
  }, []);

  useEffect(() => {
    const saveStepsToStorage = async () => {
      const today = format(new Date(), "yyyy-MM-dd");
      const data = {
        pastStepCount,
        currentStepCount,
      };
      await AsyncStorage.setItem(`steps-${today}`, JSON.stringify(data));
    };

    saveStepsToStorage();
  }, [pastStepCount, currentStepCount]);

  const saveStepsToNewCollection = async () => {
    await saveStepsToFirebase(pastStepCount, currentStepCount, user?.id!);
  };

  return (
    <MainLayout>
      <View
        style={{ paddingTop: top + 45 }}
        className="z-10 flex flex-col items-center h-full p-5 "
      >
        <Text className="mb-4 text-2xl font-bold text-white">
          Contador de Pasos
        </Text>

        <View className="items-center justify-center w-full p-5 mb-4 space-y-4 bg-gray-900 rounded-lg shadow-md">
          <Image
            source={require("../../../../assets/images/contadorpasos.png")}
            style={{ width: 200, height: 200, borderRadius: 100 }}
          />
          <Text className="text-lg text-gray-400">
            Estado del Podómetro:{" "}
            {isPedometerAvailable === "checking"
              ? "Verificando..."
              : isPedometerAvailable === "true"
              ? "Disponible"
              : "No Disponible"}
          </Text>
          <Text className="mt-2 text-lg text-white">
            Pasos en las últimas 24 horas: {pastStepCount}
          </Text>
          <Text className="mt-2 text-lg text-white">
            Pasos en tiempo real: {currentStepCount}
          </Text>
        </View>

        <TouchableOpacity
          className="w-full px-4 py-3 mb-4 bg-[#3d7076] rounded-lg"
          onPress={saveStepsToNewCollection}
        >
          <Text className="text-lg font-bold text-center text-white">
            Registrar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-full px-4 py-3 bg-[#325490] rounded-lg"
          onPress={() => {
            setPastStepCount(0);
            setCurrentStepCount(0);
          }}
        >
          <Text className="text-lg font-bold text-center text-white">
            Reiniciar Contador
          </Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
}
