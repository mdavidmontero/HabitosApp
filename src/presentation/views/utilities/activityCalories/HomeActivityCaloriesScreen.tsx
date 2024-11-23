import { Alert, Pressable, Text, View } from "react-native";
import { MainLayout } from "../../../layouts/MainLayout";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FormCalories } from "../../../components/shared/Form";
import { useEffect, useMemo, useReducer } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  activityReducer,
  initialState,
} from "../../../reducers/activity-reducer";
import { ActivityList } from "../../../components/shared/ActivityList";
import { ActivityTracker } from "../../../components/shared/ActivityTracker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const HomeActivityCaloriesScreen = () => {
  const [state, dispatch] = useReducer(activityReducer, initialState);
  const { top } = useSafeAreaInsets();

  useEffect(() => {
    const loadActivities = async () => {
      const activities = await AsyncStorage.getItem("activities");
      const parsedActivities = activities ? JSON.parse(activities) : [];
      dispatch({
        type: "set-activities",
        payload: { activities: parsedActivities },
      });
    };

    loadActivities();
  }, []);

  useEffect(() => {
    const saveActivities = async () => {
      await AsyncStorage.setItem(
        "activities",
        JSON.stringify(state.activities)
      );
    };

    saveActivities();
  }, [state.activities]);

  const restartApp = useMemo(
    () => state.activities.length > 0,
    [state.activities]
  );

  return (
    <MainLayout style={{ paddingTop: top + 40 }}>
      <View className="z-10 flex-1 p-5">
        <Pressable
          className="absolute right-0 z-10 px-4 disabled:bg-gray-400"
          onPress={() => {
            Alert.alert(
              "¿Estás seguro?",
              "¿Deseas reiniciar el registro de actividades?",
              [
                {
                  text: "Cancelar",
                  style: "cancel",
                },
                {
                  text: "Reiniciar",
                  onPress: () => {
                    dispatch({ type: "restart-app" });
                  },
                },
              ]
            );
          }}
          disabled={!restartApp}
        >
          <MaterialIcons name="cleaning-services" size={24} color="white" />
        </Pressable>
        <Text className="text-lg font-bold text-center text-white">
          Contador de Calorias
        </Text>

        <View className="px-5 py-5 mt-5 rounded-lg bg-[#b2ebf2]  border-[#1fa3bb] border-2 shadow-md">
          <View className="mx-auto">
            <FormCalories dispatch={dispatch} state={state} />
          </View>
        </View>

        <View className="py-10 my-4 bg-gray-800">
          <View className="mx-auto">
            <ActivityTracker activities={state.activities} />
          </View>
        </View>

        <View className="mx-auto">
          <ActivityList activities={state.activities} dispatch={dispatch} />
        </View>
      </View>
    </MainLayout>
  );
};
