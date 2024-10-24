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
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { supabase } from "../../../config/supabase/supabase";
import { useAuthStore } from "../../store/useAuthStore";
import { Button, Card } from "@ui-kitten/components";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery, useQueryClient } from "react-query";
import { deleteHabito, getHabitos } from "../../../actions/habitos.actions";

export const HabitosScreen = () => {
  const [nombreHabito, setNombreHabito] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [reminderTime, setReminderTime] = useState("5");
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingHabitId, setEditingHabitId] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { top } = useSafeAreaInsets();
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const {
    data: habitos,
    error,
    isLoading,
  } = useQuery(["habitos", user?.id], () => getHabitos(user?.id!), {
    enabled: !!user?.id,
  });

  const handleGuardarHabito = async () => {
    if (!nombreHabito || !startTime || !reminderTime) {
      Alert.alert("Error", "Por favor completa todos los campos requeridos.");
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
      if (isEditing && editingHabitId) {
        const { error } = await supabase
          .from("habits")
          .update({
            name: nombreHabito,
            description: descripcion,
            start_time: formattedStartTime,
            reminder_time: parsedReminderTime,
          })
          .eq("id", editingHabitId)
          .eq("user_id", user?.id);

        if (error) throw error;

        queryClient.invalidateQueries("habitoscompleted");
        Alert.alert("Éxito", "Hábito actualizado correctamente");
      } else {
        const { error } = await supabase.from("habits").insert([
          {
            name: nombreHabito,
            description: descripcion,
            start_time: formattedStartTime,
            reminder_time: parsedReminderTime,
            user_id: user?.id,
          },
        ]);

        if (error) throw error;
        queryClient.invalidateQueries("habitoscompleted");

        Alert.alert("Éxito", "Hábito guardado correctamente");
      }

      resetForm();

      queryClient.invalidateQueries("habitos");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "No se pudo guardar el hábito");
    }
  };

  const handleEditHabito = (habit: any) => {
    setNombreHabito(habit.name);
    setDescripcion(habit.description);
    setReminderTime(habit.reminder_time.toString());

    const startTime = new Date();
    const [hours, minutes, seconds] = habit.start_time.split(":");
    startTime.setHours(parseInt(hours), parseInt(minutes), parseInt(seconds));

    setStartTime(startTime);
    setIsEditing(true);
    setEditingHabitId(habit.id);
    setModalVisible(true);
  };

  const handleDeleteConfirmation = (id: number) => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de que deseas eliminar este hábito?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => handleDeleteHabito(id),
        },
      ]
    );
  };

  const handleDeleteHabito = async (id: number) => {
    try {
      await deleteHabito(id);
      if (error) throw error;
      Alert.alert("Éxito", "Hábito eliminado correctamente");
      queryClient.invalidateQueries("habitos");
    } catch (error) {
      Alert.alert("Error", "No se pudo eliminar el hábito");
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
    setModalVisible(false);
  };

  const renderHabit = ({ item }: any) => (
    <Card style={{ marginBottom: 10 }}>
      <View className="p-2">
        <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
        <Text className="text-gray-600">{item.description}</Text>
        <Text className="text-gray-700">Hora de Inicio: {item.start_time}</Text>
        <Text className="text-gray-700">
          Recordatorio: {item.reminder_time} minutos
        </Text>
      </View>
      <View className="flex flex-row items-center justify-between gap-2">
        <Button status="warning" onPress={() => handleEditHabito(item)}>
          Editar
        </Button>
        <Button
          status="danger"
          onPress={() => handleDeleteConfirmation(item.id)}
        >
          Eliminar
        </Button>
      </View>
    </Card>
  );

  if (isLoading) {
    return <Text>Cargando...</Text>;
  }

  return (
    <View className="flex-1 p-4 bg-gray-50" style={{ paddingTop: top }}>
      <Pressable
        onPress={() => setModalVisible(true)}
        className="absolute right-0 p-4 bg-white rounded-full shadow-md"
      >
        <AntDesign name="pluscircleo" size={24} color="#2563eb" />
      </Pressable>

      <FlatList
        className="mt-6"
        data={habitos}
        renderItem={renderHabit}
        keyExtractor={(item) => item.id.toString()}
      />

      <Modal
        transparent={false}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 p-6 bg-white">
          <Text className="text-2xl font-bold text-center text-black">
            {isEditing ? "Editar Hábito" : "Agregar Hábito"}
          </Text>

          <TextInput
            className="p-3 mt-4 border border-gray-300 rounded-lg"
            placeholder="Nombre del Hábito"
            value={nombreHabito}
            onChangeText={setNombreHabito}
          />
          <TextInput
            className="p-3 mt-4 border border-gray-300 rounded-lg"
            placeholder="Descripción"
            value={descripcion}
            onChangeText={setDescripcion}
            multiline
          />

          <Pressable
            className="p-3 mt-4 border border-gray-300 rounded-lg"
            onPress={() => setShowTimePicker(true)}
          >
            <Text>
              {startTime
                ? startTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Seleccionar Hora de Inicio"}
            </Text>
          </Pressable>

          <TextInput
            className="p-3 mt-4 border border-gray-300 rounded-lg"
            placeholder="Tiempo de Recordatorio (minutos)"
            value={reminderTime}
            onChangeText={setReminderTime}
            keyboardType="numeric"
          />

          <Button style={{ marginTop: 10 }} onPress={handleGuardarHabito}>
            {isEditing ? "Actualizar" : "Guardar"}
          </Button>

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
        </View>
      </Modal>
    </View>
  );
};
