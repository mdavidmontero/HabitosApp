import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../views/auth/LoginView";
import RegisterView from "../views/auth/RegisterView";

export type RootStackParamList = {
  LoginView: undefined;
  RegisterView: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginView" component={LoginScreen} />
      <Stack.Screen name="RegisterView" component={RegisterView} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
