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
import { useQueryClient } from "react-query";

export const HabitosScreen = () => {
  const user = useAuthStore((state) => state.user);
  const listDays = useHabitStore((state) => state.listDays);
  const [nombreHabito, setNombreHabito] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [reminderTime, setReminderTime] = useState("5");
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingHabitId, setEditingHabitId] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { top } = useSafeAreaInsets();
  const queryClient = useQueryClient();

  const handleDay = (day: { id: number }) => {
    const isSelected = selectedDays.includes(day.id);
    if (isSelected) {
      setSelectedDays(
        selectedDays.filter((selectedDay) => selectedDay !== day.id)
      );
    } else {
      setSelectedDays([...selectedDays, day.id]);
    }
  };

  const handleGuardarHabito = async () => {
    if (
      !nombreHabito ||
      !startTime ||
      !reminderTime ||
      !user?.id ||
      selectedDays.length === 0
    ) {
      Alert.alert(
        "Error",
        "Por favor completa todos los campos requeridos y selecciona al menos un día."
      );
      return;
    }

    const formattedStartTime = startTime.toTimeString().split(" ")[0];
    const parsedReminderTime = parseInt(reminderTime, 10);

    if (isNaN(parsedReminderTime)) {
      Alert.alert(
        "Error",
        "El tiempo de recordatorio debe ser un número válido."
      );
      return;
    }

    try {
      await crearHabito({
        id: "",
        nombre: nombreHabito,
        descripcion,
        start_time: formattedStartTime,
        reminder_time: parsedReminderTime,
        user_id: user.id,
        days: selectedDays,
      });
      Alert.alert("Éxito", "Hábito guardado correctamente");
      queryClient.invalidateQueries("habitos");
      resetForm();
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "No se pudo guardar el hábito");
    }
  };

  const onChangeHora = (event: any, selectedTime: any) => {
    const currentDate = selectedTime || startTime;
    setShowTimePicker(false);
    setStartTime(currentDate);
  };

  const resetForm = () => {
    setNombreHabito("");
    setDescripcion("");
    setReminderTime("5");
    setStartTime(new Date());
    setIsEditing(false);
    setEditingHabitId(null);
    setSelectedDays([]);
    setModalVisible(false);
  };

  return (
    <MainLayout style={{ paddingTop: top + 40 }}>
      <View>
        <Pressable
          onPress={() => setModalVisible(true)}
          className="absolute right-0 p-3 mx-4 bg-white rounded-full shadow-md"
        >
          <AntDesign name="pluscircleo" size={24} color="#2563eb" />
        </Pressable>

        <Modal
          transparent={false}
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <ScrollView className="flex-1 p-6 bg-[#b2ebf2]">
            <Text className="text-2xl font-bold text-center text-teal-800">
              {isEditing ? "Editar Hábito" : "Agregar Hábito"}
            </Text>
            <TextInput
              className="p-4 mt-4 mb-4 text-black bg-white border border-[#1fa3bb] rounded-full shadow-sm focus:border-teal-500"
              placeholder="Nombre del Hábito"
              value={nombreHabito}
              onChangeText={setNombreHabito}
            />
            <TextInput
              className="p-4 mb-4 text-black bg-white border border-[#1fa3bb] rounded-full shadow-sm focus:border-teal-500"
              placeholder="Descripción"
              value={descripcion}
              onChangeText={setDescripcion}
              multiline
            />
            <Pressable
              className="p-4 mb-4 bg-white border border-[#1fa3bb] rounded-full shadow-sm"
              onPress={() => setShowTimePicker(true)}
            >
              <Text className="text-black">
                {startTime
                  ? startTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Seleccionar Hora de Inicio"}
              </Text>
            </Pressable>
            <TextInput
              className="p-4 mb-4 text-black bg-white border border-[#1fa3bb] rounded-full shadow-sm focus:border-teal-500"
              placeholder="Tiempo de Recordatorio (minutos)"
              value={reminderTime}
              onChangeText={setReminderTime}
              keyboardType="numeric"
            />
            <Text className="text-lg font-semibold text-center text-teal-800">
              Días de Hábito
            </Text>
            <View className="flex flex-row flex-wrap justify-center mt-2">
              {listDays.map((day) => (
                <Day
                  key={day.id}
                  day={day}
                  handleDay={handleDay}
                  isSelected={selectedDays.includes(day.id)}
                />
              ))}
            </View>
            <Pressable
              onPress={handleGuardarHabito}
              disabled={
                !nombreHabito ||
                !startTime ||
                !reminderTime ||
                !user?.id ||
                selectedDays.length === 0
              }
              className="px-4 py-3 mt-6 mb-10 text-white bg-teal-700 rounded-full shadow-lg"
            >
              <Text className="text-base font-bold text-center text-white">
                Guardar
              </Text>
            </Pressable>
            {showTimePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={startTime}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={onChangeHora}
              />
            )}
          </ScrollView>
        </Modal>
      </View>
    </MainLayout>
  );
};
