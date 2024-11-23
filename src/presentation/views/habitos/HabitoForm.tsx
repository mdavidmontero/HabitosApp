import { useEffect, useState } from "react";
import { format } from "date-fns";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAuthStore } from "../../store/useAuthStore";
import { useHabitStore } from "../../store/useHabitStore";
import {
  crearHabito,
  getHabitoById,
  updateHabito,
} from "../../../actions/habitos.actions";
import Day from "../../components/Day";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery, useQueryClient } from "react-query";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../router/StackNavigator";
import { MainLayout } from "../../layouts/MainLayout";
import { StackScreenProps } from "@react-navigation/stack";

interface Props {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

export const HabitoFormNewScreen = ({}: Props) => {
  const route = useRoute<RouteProp<RootStackParamList, "newHabbito">>();
  const id = route.params?.habito;
  const user = useAuthStore((state) => state.user);
  const listDays = useHabitStore((state) => state.listDays);
  const [nombreHabito, setNombreHabito] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [reminderTime, setReminderTime] = useState("5");
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const todayDate = format(new Date(), "yyyy-MM-dd");
  const navigation =
    useNavigation<StackScreenProps<RootStackParamList>["navigation"]>();
  const { top } = useSafeAreaInsets();
  const queryClient = useQueryClient();
  console.log(nombreHabito, descripcion, startTime, reminderTime, selectedDays);

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

  const { data } = useQuery({
    queryKey: ["habito", id],
    queryFn: () => getHabitoById(id!),
    enabled: !!id,
  });
  useEffect(() => {
    if (data?.id) {
      setNombreHabito(data?.nombre);
      setDescripcion(data?.descripcion);
      setReminderTime(data?.reminder_time!.toString());
      setSelectedDays(data?.days);
    }
  }, [data, id]);

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

    if (id === "") {
      await crearHabito({
        id: "",
        nombre: nombreHabito,
        descripcion,
        start_time: formattedStartTime,
        reminder_time: parsedReminderTime,
        user_id: user.id,
        days: selectedDays,
        completed: {
          [todayDate]: false,
        },
      });
      Alert.alert("Éxito", "Hábito guardado correctamente");
      queryClient.invalidateQueries("habitos");
      resetForm();
      navigation.navigate("ListHabitos");
    } else {
      await updateHabito(id!, {
        nombre: nombreHabito,
        descripcion,
        reminder_time: parsedReminderTime,
        days: selectedDays,
        completed: {
          [todayDate]: false,
        },
      });
      Alert.alert("Éxito", "Hábito actualizado correctamente");
      queryClient.invalidateQueries(["habito", id]);
      queryClient.invalidateQueries("habitos");
      resetForm();
      navigation.navigate("ListHabitos");
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
    setSelectedDays([]);
  };

  return (
    <MainLayout style={{ paddingTop: top + 40 }}>
      <View className="z-10 flex-1 p-6 ">
        <Text className="text-2xl font-bold text-center text-teal-800">
          {data?.id ? "Editar Hábito" : "Agregar Hábito"}
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
          className="px-4 py-3 mt-6 mb-3 text-white bg-teal-700 rounded-full shadow-lg disabled:bg-gray-400"
        >
          <Text className="text-base font-bold text-center text-white">
            Guardar
          </Text>
        </Pressable>
        <Pressable
          onLongPress={() => navigation.goBack()}
          className="px-4 py-3 mt-6 mb-10 text-white bg-red-700 rounded-full shadow-lg disabled:bg-gray-400"
        >
          <Text className="text-base font-bold text-center text-white">
            Cerrar
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
      </View>
    </MainLayout>
  );
};
