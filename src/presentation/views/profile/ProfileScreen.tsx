import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { MainLayout } from "../../layouts/MainLayout";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuthStore } from "../../store/useAuthStore";
import { useEffect, useState } from "react";
import { CameraOne } from "../../../config/adapters/cameraPhoto";
import { RolUsuario } from "../../../domain/entities/user.entities";
import { ModalPhto } from "../../components/ui/ModalPhoto";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  actualizarUsuario,
  obtenerUsuarioPorId,
} from "../../../actions/user.actions";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../router/StackNavigator";

export const ProfileScreen = () => {
  const { top } = useSafeAreaInsets();
  const [modal, setModal] = useState(false);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const navigation =
    useNavigation<StackScreenProps<RootStackParamList>["navigation"]>();
  const [userUpdate, setUserUpdate] = useState({
    id: "",
    nombres: "",
    apellidos: "",
    telefono: "",
    correo: "",
    photoProfile: "",
    roles: RolUsuario.CLIENTE,
  });

  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: () => obtenerUsuarioPorId(user?.id!),
  });

  useEffect(() => {
    if (data) {
      setUserUpdate({
        id: data?.id,
        nombres: data?.nombres,
        apellidos: data?.apellidos,
        telefono: data?.telefono,
        correo: data?.correo,
        photoProfile: data?.photoProfile,
        roles: data?.roles,
      });
    }
  }, [data]);

  const handleTakePicture = async () => {
    const result = await CameraOne.takePicture();
    if (result && result.length > 0) {
      setUserUpdate({ ...userUpdate, photoProfile: result[0].uri });
      setModal(false);
    }
  };

  const handleSelectFromGallery = async () => {
    const result = await CameraOne.getPicturesFromLibraryOne();
    if (result) {
      setUserUpdate({ ...userUpdate, photoProfile: result });
      setModal(false);
    } else {
      console.error("No image selected or an error occurred");
    }
  };

  const handlePhoto = () => {
    setModal(true);
  };

  const mutation = useMutation({
    mutationFn: () => actualizarUsuario(user?.id!, userUpdate),
    onSuccess: () => {
      setUser(userUpdate);
      navigation.goBack();
    },
    onError: (error) => {
      console.error("Error saving decoración:", error);
    },
  });

  const handleSave = () => {
    if (
      !userUpdate.nombres.trim() ||
      !userUpdate.apellidos.trim() ||
      !userUpdate.telefono.trim() ||
      !userUpdate.correo.trim() ||
      userUpdate.telefono.length !== 10
    ) {
      Alert.alert("Error", "Por favor ingrese todos los datos correctamente");
      return;
    }
    mutation.mutate();
  };

  return (
    <MainLayout style={{ paddingTop: top + 40 }}>
      {modal && (
        <ModalPhto
          modal={modal}
          setModal={setModal}
          handleTakePicture={handleTakePicture}
          handleSelectFromGallery={handleSelectFromGallery}
        />
      )}
      <Text className="my-2 text-xl font-bold text-center text-white">
        Actualizar Perfil
      </Text>
      <View className="z-10 flex-1 p-5 mx-5 bg-white rounded-lg shadow">
        <View className="items-center justify-center">
          <Pressable onPress={handlePhoto}>
            <Image
              source={
                userUpdate.photoProfile
                  ? { uri: userUpdate.photoProfile }
                  : user?.photoProfile
                  ? { uri: user.photoProfile }
                  : require("../../../../assets/images/habito2.jpg")
              }
              className="rounded-full h-44 w-44"
            />
          </Pressable>
        </View>
        <Text>Nombre: </Text>
        <TextInput
          value={userUpdate.nombres}
          className="p-2 mt-2 mb-2 text-black bg-white border border-[#1fa3bb] rounded-full shadow-sm focus:border-teal-500"
          onChangeText={(text) =>
            setUserUpdate({ ...userUpdate, nombres: text })
          }
        />
        <Text>Apellidos: </Text>
        <TextInput
          value={userUpdate.apellidos}
          className="p-2 mt-2 mb-2 text-black bg-white border border-[#1fa3bb] rounded-full shadow-sm focus:border-teal-500"
          onChangeText={(text) =>
            setUserUpdate({ ...userUpdate, apellidos: text })
          }
        />
        <Text>Telefono: </Text>
        <TextInput
          value={userUpdate.telefono}
          className="p-2 mt-2 mb-2 text-black bg-white border border-[#1fa3bb] rounded-full shadow-sm focus:border-teal-500"
          onChangeText={(text) =>
            setUserUpdate({ ...userUpdate, telefono: text })
          }
        />
        <Text>Correo: </Text>
        <TextInput
          className="p-2 mt-2 mb-2 text-black bg-gray-100 border border-[#1fa3bb] rounded-full shadow-sm focus:border-teal-500"
          readOnly
          value={user?.correo}
        />

        {mutation.isLoading && <ActivityIndicator color="#0e7490" />}
        <Pressable
          disabled={mutation.isLoading}
          onPress={handleSave}
          className="px-4 py-3 mt-6 mb-3 text-white rounded-full shadow-lg bg-cyan-700 disabled:bg-gray-400"
        >
          <Text
            disabled={mutation.isLoading}
            className="font-bold text-center text-white text-md disabled:text-gray-400"
          >
            Actualizar
          </Text>
        </Pressable>
      </View>
    </MainLayout>
  );
};
