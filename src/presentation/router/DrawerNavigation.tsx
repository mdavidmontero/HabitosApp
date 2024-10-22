import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeScreen } from "../views/home/HomeScreen";
import StackNavigator from "./StackNavigator";
import { useWindowDimensions } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { supabase } from "../../config/supabase/supabase";

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  const dimensions = useWindowDimensions();
  const logout = async () => {
    await supabase.auth.signOut();
  };
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: dimensions.width >= 758 ? "permanent" : "slide",
        headerShown: true,
        headerStyle: {
          backgroundColor: "#3463FA",
          borderRadius: 10,
        },
        headerTitle: "",

        headerTintColor: "#FFF",
        headerRight: () => (
          <Entypo name="log-out" size={24} color="#FFF" onPress={logout} />
        ),
        drawerStyle: {
          backgroundColor: "#3463FA",
        },
        drawerActiveBackgroundColor: "none",
        drawerActiveTintColor: "#fff",
      }}
    >
      <Drawer.Screen name="StackNavigator" component={StackNavigator} />
      <Drawer.Screen name="Feed" component={HomeScreen} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
