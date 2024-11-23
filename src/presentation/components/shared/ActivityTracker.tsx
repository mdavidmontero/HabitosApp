import React, { useMemo } from "react";
import { Text, View } from "react-native";
import { Activity } from "../../../types";
import { CaloriesDisplay } from "./CaloriesDisplay";

type CalorieTrackerProps = {
  activities: Activity[];
};

export const ActivityTracker = ({ activities }: CalorieTrackerProps) => {
  const caloriesConsumed = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [activities]
  );
  const caloriesBurned = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const netCalories = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [caloriesBurned, caloriesConsumed]
  );

  return (
    <View>
      <Text className="text-2xl font-black text-center text-white">
        Resumen de Calorias
      </Text>
      <View className="flex flex-row items-center gap-2 mt-5 justify-evenly">
        <CaloriesDisplay calories={caloriesConsumed} text="Consumidas" />
        <CaloriesDisplay calories={caloriesBurned} text="Quemadas" />
        <CaloriesDisplay calories={netCalories} text="Diferencia" />
      </View>
    </View>
  );
};
