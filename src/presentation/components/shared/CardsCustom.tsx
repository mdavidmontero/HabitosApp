import { LinearGradient } from "expo-linear-gradient";
import {
  ImageBackground,
  Pressable,
  View,
  Text,
  useWindowDimensions,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
} from "react-native";

interface Props {
  title: string;
  subtitle: string;
  imagenUrl: any;
  style?: StyleProp<ViewStyle>;
  onPress: (event: GestureResponderEvent) => void;
}
export default function CardsCustom({
  title,
  subtitle,
  imagenUrl,
  style,
  onPress,
}: Props) {
  const { width, height } = useWindowDimensions();
  return (
    <Pressable onPress={onPress} style={style}>
      <ImageBackground
        source={imagenUrl}
        style={{
          width: width * 0.38,
          height: height * 0.25,
          borderRadius: 15,
          overflow: "hidden",
          justifyContent: "flex-end",
        }}
      >
        <LinearGradient
          colors={["rgba(0, 0, 0, 0.7)", "transparent"]} //["#FFA500", "#FF6347"]
          start={[0, 1]}
          end={[0, 0.2]}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "100%",
          }}
        />

        <View style={{ padding: 10 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#fff",
              textAlign: "left",
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#fff",
              textAlign: "left",
            }}
          >
            {subtitle}
          </Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
}
