import React, { Dispatch, useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import { Activity } from "../../../types";
import { ActivityActions } from "../../reducers/activity-reducer";
import { categories } from "../../../data/index";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";

type ActivityListProps = {
  activities: Activity[];
  dispatch: Dispatch<ActivityActions>;
};

export const ActivityList = ({ activities, dispatch }: ActivityListProps) => {
  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")),
    []
  );

  const isEmptyActivities = useMemo(
    () => activities.length === 0,
    [activities]
  );
  return (
    <>
      <Text className="text-2xl font-bold text-center text-slate-600">
        Comida y Actividades
      </Text>
      {isEmptyActivities ? (
        <Text className="text-center text-slate-600">
          No tienes actividades Aún
        </Text>
      ) : (
        activities.map((activity) => (
          <View
            key={activity.id}
            className="flex flex-row justify-between py-3 mt-3 shadow"
          >
            <View className="flex">
              <Text
                className={` p-2 -lef-8 mb-2 text-white uppercase font-bold w-32 ${
                  activity.category === 1 ? "bg-lime-500" : "bg-orange-500"
                }`}
              >
                {categoryName(activity.category)}
              </Text>
              <View className="flex flex-row justify-between w-full p-2 bg-white rounded-lg">
                <View>
                  <Text className="text-lg font-bold">{activity.name}</Text>
                  <Text className="text-xl font-black">
                    {activity.calories} Calorias{" "}
                  </Text>
                </View>
                <View className="flex items-center gap-3">
                  <Pressable
                    onPress={() =>
                      dispatch({
                        type: "set-activeId",
                        payload: {
                          id: activity.id,
                        },
                      })
                    }
                  >
                    <Entypo name="pencil" size={24} color="black" />
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      dispatch({
                        type: "delete-activity",
                        payload: { id: activity.id },
                      });
                    }}
                  >
                    <AntDesign name="delete" size={24} color="#dc2626" />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        ))
      )}
    </>
  );
};
