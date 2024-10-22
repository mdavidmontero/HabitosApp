import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Button, Input, Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import ToastManager from "toastify-react-native";
import { useAuthMutation } from "../../hooks/auth/useAuthMutation";
import { RootStackParamList } from "../../router/AuthNavigation";

export default function LoginScreen() {
  const navigation =
    useNavigation<StackScreenProps<RootStackParamList>["navigation"]>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isLoading } = useAuthMutation({ email, password });
  const handleLogin = () => {
    mutate();
  };
  return (
    <View className="justify-center flex-1 p-5 bg-white ">
      <ToastManager
        style={{
          position: "absolute",
          top: 0,
        }}
      />
      <Text category="h4" style={styles.title}>
        Iniciar Sesión
      </Text>
      <View className="mb-5">
        <Input
          label="Email"
          placeholder="email@address.com"
          value={email}
          onChangeText={(text) => setEmail(text)}
          size="large"
          status="primary"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View className="mb-5">
        <Input
          label="Password"
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          size="large"
          status="primary"
          autoCapitalize="none"
        />
      </View>
      <View className="mb-5">
        <Button size="large" disabled={isLoading} onPress={handleLogin}>
          Iniciar
        </Button>
        <Pressable onPress={() => navigation.navigate("RegisterView")}>
          <Text
            style={{
              textAlign: "center",
              color: "#007AFF",
              fontSize: 16,
              marginTop: 10,
            }}
          >
            ¿No tienes una cuenta? Registrate
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
