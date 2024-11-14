import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../views/home/HomeScreen";
import LoginScreen from "../views/auth/LoginView";
import { HabitosScreen } from "../views/habitos/HabitoForm";
import CompletedHabitosScreen from "../views/habitos/CompletedHabitos";

export type RootStackParamList = {
  Home: undefined;
  NewHabito: undefined;
  CompletedHabito: undefined;
  LoginScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="NewHabito" component={HabitosScreen} />
      <Stack.Screen name="CompletedHabito" component={CompletedHabitosScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
}
export default StackNavigator;
