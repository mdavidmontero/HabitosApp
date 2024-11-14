import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Button, Input, Layout, Text } from "@ui-kitten/components";
import ToastManager from "toastify-react-native";
import { useNavigation } from "@react-navigation/native";
import { initialUserState, RegisterUser } from "../../../types";
import { useRegisterUser } from "../../hooks/auth/useRegisterMutation";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../router/AuthNavigation";

export default function RegisterView() {
  const [user, setUser] = useState<RegisterUser>(initialUserState);
  const navigation =
    useNavigation<StackScreenProps<RootStackParamList>["navigation"]>();

  const mutation = useRegisterUser(user);

  const handleRegister = () => {
    mutation.mutate();
    if (mutation.isSuccess) {
      navigation.navigate("LoginView");
    }
  };

  return (
    <View className="justify-center flex-1 p-5 bg-white ">
      <ToastManager />
      <Text category="h4" style={styles.title}>
        Registro
      </Text>
      <View className="mb-5">
        <Input
          label="Nombres"
          placeholder="Juan"
          value={user.nombres}
          onChangeText={(text) => setUser({ ...user, nombres: text })}
          size="large"
          status="primary"
          keyboardType="default"
          autoCapitalize="none"
        />
      </View>
      <View className="mb-5">
        <Input
          label="Apellidos"
          placeholder="Perez"
          value={user.apellidos}
          onChangeText={(text) => setUser({ ...user, apellidos: text })}
          size="large"
          status="primary"
          keyboardType="default"
          autoCapitalize="none"
        />
      </View>
      <View className="mb-5">
        <Input
          label="Telefono"
          placeholder="3238447789"
          value={user.telefono}
          onChangeText={(text) =>
            setUser({
              ...user,
              telefono: text,
            })
          }
          size="large"
          status="primary"
          keyboardType="number-pad"
          autoCapitalize="none"
        />
      </View>
      <View className="mb-5">
        <Input
          label="Correo"
          placeholder="email@address.com"
          value={user.correo}
          onChangeText={(text) =>
            setUser({
              ...user,
              correo: text,
            })
          }
          size="large"
          status="primary"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View className="mb-5">
        <Input
          label="Contraseña"
          placeholder="Password"
          value={user.password}
          onChangeText={(text) => setUser({ ...user, password: text })}
          secureTextEntry={true}
          size="large"
          status="primary"
          autoCapitalize="none"
        />
      </View>
      <View className="mb-5">
        <Button
          size="large"
          disabled={mutation.isLoading}
          onPress={handleRegister}
        >
          Sign Up
        </Button>
        <Pressable onPress={() => navigation.navigate("LoginView")}>
          <Text
            style={{
              textAlign: "center",
              color: "#007AFF",
              fontSize: 16,
              marginTop: 10,
            }}
          >
            Ya tienes una cuenta? Inicia sesion
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
});
