import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../views/home/HomeScreen";
import LoginScreen from "../views/auth/LoginView";
import { HabitoFormNewScreen } from "../views/habitos/HabitoForm";
import CompletedHabitosScreen from "../views/habitos/CompletedHabitos";
import { HistoryHabitos } from "../views/habitos/HistoryHabitos";
import { ListHabitosScreen } from "../views/habitos/ListHabitosScreen";
import { DailyHabitsScreen } from "../views/habitos/TodayHabitScreen";
import PedometerScreen from "../views/utilities/PedometerScreen";
import SleepTrackerScreen from "../views/utilities/SleepTrackerScreen";
import { HomeActivityCaloriesScreen } from "../views/utilities/activityCalories/HomeActivityCaloriesScreen";
import { ProfileScreen } from "../views/profile/ProfileScreen";

export type RootStackParamList = {
  Home: undefined;
  NewHabito: undefined;
  CompletedHabito: undefined;
  LoginScreen: undefined;
  ListHabitos: undefined;
  HistoryHabitos: undefined;
  newHabbito: { habito?: string };
  DailyHabitsScreen: undefined;
  PedometerScreen: undefined;
  SleepTrackerScreen: undefined;
  HomeActivityCaloriesScreen: undefined;
  ProfileScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ListHabitos" component={ListHabitosScreen} />
      {/* @ts-ignore */}
      <Stack.Screen name="newHabbito" component={HabitoFormNewScreen} />
      <Stack.Screen name="CompletedHabito" component={CompletedHabitosScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="HistoryHabitos" component={HistoryHabitos} />
      <Stack.Screen name="DailyHabitsScreen" component={DailyHabitsScreen} />
      <Stack.Screen name="PedometerScreen" component={PedometerScreen} />
      <Stack.Screen name="SleepTrackerScreen" component={SleepTrackerScreen} />
      <Stack.Screen
        name="HomeActivityCaloriesScreen"
        component={HomeActivityCaloriesScreen}
      />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
export default StackNavigator;
