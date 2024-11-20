import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  FlatList,
  Platform,
  Modal,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAuthStore } from "../../store/useAuthStore";
import { useHabitStore } from "../../store/useHabitStore";
import { MainLayout } from "../../layouts/MainLayout";
import { crearHabito } from "../../../actions/habitos.actions";
import Day from "../../components/Day";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HistoryHabitos } from "./HistoryHabitos";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../router/StackNavigator";

export const ListHabitosScreen = () => {
  const { top } = useSafeAreaInsets();
  const navigation =
    useNavigation<StackScreenProps<RootStackParamList>["navigation"]>();
  const [modalVisible, setModalVisible] = useState(false);

  const [modalVisibleEdit, setModalVisibleEdit] = useState(false);

  return (
    <MainLayout style={{ paddingTop: top + 40 }}>
      <View>
        <Pressable
          onPress={() => navigation.navigate("newHabbito", { habito: "" })}
          className="absolute right-0 p-3 mx-4 bg-white rounded-full shadow-md"
        >
          <AntDesign name="pluscircleo" size={24} color="#2563eb" />
        </Pressable>

        <HistoryHabitos />
      </View>
    </MainLayout>
  );
};
