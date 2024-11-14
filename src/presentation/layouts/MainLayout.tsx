import React from "react";
import {
  Text,
  View,
  Image,
  SafeAreaView,
  useWindowDimensions,
  StyleProp,
  ViewStyle,
} from "react-native";

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const MainLayout = ({ children, style }: Props) => {
  return (
    <>
      <View
        style={[
          style,
          {
            flex: 1,
            position: "relative",
            backgroundColor: "#b2ebf2",
          },
        ]}
      >
        <Image
          source={require("../../../assets/images/Rectangle.png")}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "36%",
            objectFit: "fill",
          }}
        />
        {children}
      </View>
      <Image
        source={require("../../../assets/images/Figure_Abajo.png")}
        style={{
          position: "absolute",
          bottom: 0,
          height: 250,
          width: 250,
          objectFit: "fill",
        }}
      />
    </>
  );
};
