import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Image } from "react-native";
import StackNavigator, { RootStackParamList } from "./StackNavigator";
import {
  useWindowDimensions,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { logout } from "../../actions/auth.actions";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "../store/useAuthStore";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeScreen } from "../views/home/HomeScreen";

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  const dimensions = useWindowDimensions();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerType: dimensions.width >= 758 ? "permanent" : "slide",
        headerShown: true,
        headerTitle: "Habitips",
        headerTintColor: "#FFF",
        headerTransparent: true,
        drawerStyle: {
          backgroundColor: "#1fa3bb",
        },
        drawerActiveTintColor: "#d5f5f8",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={StackNavigator}
        options={{
          title: "",
        }}
      />
      <Drawer.Screen name="Inicio" component={HomeScreen} />
    </Drawer.Navigator>
  );
}

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const navigation =
    useNavigation<StackScreenProps<RootStackParamList>["navigation"]>();
  const user = useAuthStore((state) => state.user);
  const handleLogout = async () => {
    await logout();
    navigation.navigate("LoginScreen");
  };
  return (
    <DrawerContentScrollView {...props}>
      <View className="items-center justify-center h-24 mt-10 mb-5 rounded-full">
        <Image
          source={require("../../../assets/images/habito2.jpg")}
          style={{
            width: 150,
            height: 150,
            borderRadius: 100,
            borderWidth: 2,
            borderColor: "#1fa3bb",
            marginBottom: 10,
          }}
        />
      </View>

      <View className="items-center mb-5">
        <Text className="text-xl font-bold text-[#d5f5f8]">
          {user?.nombres.split(" ")[0] + " " + user?.apellidos.split(" ")[0]}
        </Text>
        <View className="w-4/5 mt-2 border-b-4 border-white" />
      </View>

      <View className="flex-1 px-3 mt-2">
        <DrawerItemList {...props} />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="px-4 py-3 my-2 rounded"
        >
          <View className="flex-row items-center gap-2">
            <Text className="text-base font-bold text-white">Historial</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="px-4 py-3 my-2 rounded"
        >
          <View className="flex-row items-center gap-2">
            <Text className="text-base font-bold text-white">
              Instrucciones
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View className="px-5 mt-20">
        <TouchableOpacity
          onPress={handleLogout}
          className="py-3 bg-white rounded-full"
        >
          <Text className="text-[#1fa3bb] font-bold text-center">
            Cerrar Sesión
          </Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerNavigation;
