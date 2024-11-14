import { Text } from "react-native";
interface Props {
  title: string;
}
export default function TitleCustom({ title }: Props) {
  return (
    <Text className="z-10 w-full p-2 mt-4 text-xl font-bold text-center text-white bg-colorsTitle">
      {title}
    </Text>
  );
}
