import { View } from "react-native";
import { Spinner } from "@ui-kitten/components";

export const LoadingScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Spinner size="medium" />
    </View>
  );
};
