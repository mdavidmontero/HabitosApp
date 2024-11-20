import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../views/home/HomeScreen";
import LoginScreen from "../views/auth/LoginView";
import { HabitoFormNewScreen } from "../views/habitos/HabitoForm";
import CompletedHabitosScreen from "../views/habitos/CompletedHabitos";
import { HistoryHabitos } from "../views/habitos/HistoryHabitos";
import { ListHabitosScreen } from "../views/habitos/ListHabitosScreen";

export type RootStackParamList = {
  Home: undefined;
  NewHabito: undefined;
  CompletedHabito: undefined;
  LoginScreen: undefined;
  ListHabitos: undefined;
  HistoryHabitos: undefined;
  newHabbito: { habito?: string };
};

const Stack = createStackNavigator<RootStackParamList>();

function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ListHabitos" component={ListHabitosScreen} />
      <Stack.Screen name="newHabbito" component={HabitoFormNewScreen} />
      <Stack.Screen name="CompletedHabito" component={CompletedHabitosScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="HistoryHabitos" component={HistoryHabitos} />
    </Stack.Navigator>
  );
}
export default StackNavigator;
