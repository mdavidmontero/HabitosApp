import React, { Dispatch, useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";

import uuid from "react-native-uuid";
import { Text, View, TextInput, Pressable } from "react-native";
import {
  ActivityActions,
  ActivityState,
} from "../../reducers/activity-reducer";
import { Activity } from "../../../types";
import { categories } from "../../../data";

export type FormProps = {
  dispatch: Dispatch<ActivityActions>;
  state: ActivityState;
};

const initialState: Activity = {
  id: uuid.v4(),
  category: 1,
  name: "",
  calories: 0,
};

export const FormCalories = ({ dispatch, state }: FormProps) => {
  const [activity, setActivity] = useState<Activity>(initialState);

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(
        (stateActivity) => stateActivity.id === state.activeId
      )[0];
      setActivity(selectedActivity);
    }
  }, [state.activeId, state.activities]);

  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== "" && calories > 0;
  };

  const handleSubmit = () => {
    dispatch({ type: "save-activity", payload: { newActivity: activity } });
    setActivity({ ...initialState, id: uuid.v4() });
  };

  return (
    <View className="p-10 space-y-5 bg-white rounded-lg shadow">
      <View className="flex flex-col gap-3">
        <Text id="category" className="font-bold">
          Categoria
        </Text>
        <View className="bg-white border rounded-lg border-slate-300">
          <Picker
            id="category"
            selectedValue={activity.category}
            onValueChange={(item: number) =>
              setActivity({ ...activity, category: item })
            }
          >
            {categories.map((category) => (
              <Picker.Item label={category.name} value={category.id} />
            ))}
          </Picker>
          Pick
        </View>
      </View>
      <View className="flex flex-col gap-3">
        <Text id="category" className="font-bold">
          Actividad
        </Text>
        <TextInput
          id="name"
          keyboardType="default"
          value={activity.name}
          onChangeText={(text) => setActivity({ ...activity, name: text })}
          className="p-2 rounded-lg border-slate-300 "
          placeholder="Ej:Ejecicio con pesas, hamburguesa.."
        />
      </View>

      <View className="flex flex-col gap-3">
        <Text id="category" className="font-bold">
          Calorias
        </Text>
        <TextInput
          id="calories"
          keyboardType="numeric"
          value={activity.calories.toString()}
          onChangeText={(text) => setActivity({ ...activity, calories: +text })}
          className="p-2 rounded-lg border-slate-300 "
          placeholder="Ej: 300,500"
        />
      </View>
      <Pressable
        disabled={!isValidActivity()}
        onPress={handleSubmit}
        className="w-full p-3 font-bold text-white uppercase bg-gray-800 rounded hover:bg-gray-900 disabled:opacity-10"
      >
        <Text
          disabled={!isValidActivity()}
          className="font-bold text-center text-white disabled:opacity-10"
        >
          {activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
        </Text>
      </Pressable>
    </View>
  );
};
