import React from "react";
import {
  StyleSheet,
  useWindowDimensions,
  View,
  Image,
  ImageStyle,
  StyleProp,
} from "react-native";

interface Props {
  images: string;
  style?: StyleProp<ImageStyle>;
}

export const ListImages = ({ images, style }: Props) => {
  const { width, height } = useWindowDimensions();

  return (
    <View
      style={[styles.container, { width: width * 0.9, height: height * 0.3 }]}
    >
      <Image
        source={
          images
            ? require("../../../../assets/images/habito2.jpg")
            : { uri: images }
        }
        style={[styles.image, style]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
});
