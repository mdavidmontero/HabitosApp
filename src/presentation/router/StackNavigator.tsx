import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../views/home/HomeScreen";
import LoginScreen from "../views/auth/LoginView";
import RegisterView from "../views/auth/RegisterView";

export type RootStackParamList = {
  Home: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
export default StackNavigator;
