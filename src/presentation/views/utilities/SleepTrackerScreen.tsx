import { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Accelerometer } from "expo-sensors";
import { MainLayout } from "../../layouts/MainLayout";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SleepTrackerScreen() {
  const [sleepDuration, setSleepDuration] = useState(0);
  const [isSleeping, setIsSleeping] = useState(false);
  const [lastMovementTime, setLastMovementTime] = useState(Date.now());
  const { top } = useSafeAreaInsets();

  useEffect(() => {
    const loadData = async () => {
      const savedSleepDuration = await AsyncStorage.getItem("sleepDuration");
      const savedIsSleeping = await AsyncStorage.getItem("isSleeping");
      const savedLastMovementTime = await AsyncStorage.getItem(
        "lastMovementTime"
      );

      if (savedSleepDuration) {
        setSleepDuration(Number(savedSleepDuration));
      }
      if (savedIsSleeping) {
        setIsSleeping(savedIsSleeping === "true");
      }
      if (savedLastMovementTime) {
        setLastMovementTime(Number(savedLastMovementTime));
      }
    };

    loadData();

    let subscription: any = null;

    const startSleepTracking = () => {
      subscription = Accelerometer.addListener((data) => {
        const { x, y, z } = data;

        const movementThreshold = 0.05;
        const zThreshold = 0.98;

        if (
          Math.abs(x) < movementThreshold &&
          Math.abs(y) < movementThreshold &&
          Math.abs(z - 1) < zThreshold
        ) {
          if (!isSleeping) {
            setIsSleeping(true);
            setLastMovementTime(Date.now());
            AsyncStorage.setItem("isSleeping", "true");
            AsyncStorage.setItem("lastMovementTime", Date.now().toString());
          }
        } else {
          if (isSleeping) {
            const sleepTime = (Date.now() - lastMovementTime) / 1000;
            setSleepDuration((prev) => prev + sleepTime);
            AsyncStorage.setItem(
              "sleepDuration",
              (sleepDuration + sleepTime).toString()
            );
            setIsSleeping(false);
            AsyncStorage.setItem("isSleeping", "false");
          }
        }
      });
    };

    startSleepTracking();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [isSleeping, lastMovementTime, sleepDuration]);

  const getSleepQuality = () => {
    const hoursSlept = sleepDuration / 3600; // Convertir el tiempo a horas
    if (hoursSlept > 8) {
      return "Sueño Pesado";
    } else if (hoursSlept < 8) {
      return "Sueño Ligero";
    } else {
      return "Sueño Perfecto";
    }
  };

  const resetSleepTracker = () => {
    setSleepDuration(0);
    setIsSleeping(false);
    AsyncStorage.setItem("sleepDuration", "0");
    AsyncStorage.setItem("isSleeping", "false");
    AsyncStorage.setItem("lastMovementTime", Date.now().toString());
  };

  return (
    <MainLayout>
      <View
        style={{
          paddingTop: top + 45,
        }}
        className="z-10 flex flex-col items-center h-full p-5"
      >
        <Text className="mb-4 text-2xl font-bold text-white">
          Rastreador de Sueño
        </Text>

        <View className="items-center justify-center w-full p-5 mb-4 space-y-4 bg-gray-900 rounded-lg shadow-md">
          <Text className="text-lg text-gray-400">
            Estado del Sueño: {isSleeping ? "Durmiendo..." : "Despierto"}
          </Text>

          <Text className="mt-2 text-lg text-white">
            Tiempo de sueño estimado: {Math.floor(sleepDuration / 60)} minutos
          </Text>

          <Text className="mt-2 text-lg text-white">{getSleepQuality()}</Text>
        </View>

        <TouchableOpacity
          className="w-full px-4 py-3 mb-4 bg-[#3d7076] rounded-lg"
          onPress={resetSleepTracker}
        >
          <Text className="text-lg font-bold text-center text-white">
            Reiniciar Rastreador
          </Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
}
