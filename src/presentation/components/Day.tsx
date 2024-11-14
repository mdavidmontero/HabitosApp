import { useEffect, useState } from "react";
import { Pressable, Text, StyleProp, ViewStyle, TextStyle } from "react-native";
import { dayColors } from "../../constants/colors";

interface DayProps {
  day: {
    id: number;
    name: string;
    isAvailable: boolean;
  };
  handleDay: (day: { id: number }) => void;
  isSelected: boolean;
}

export default function Day({ day, handleDay, isSelected }: DayProps) {
  const [status, setStatus] = useState<"available" | "selected">("available");

  useEffect(() => {
    if (isSelected) {
      setStatus("selected");
    } else if (day.isAvailable) {
      setStatus("available");
    }
  }, [isSelected, day.isAvailable]);

  const backgroundColor = dayColors[status].background;
  const borderColor = dayColors[status].border;
  const textColor = dayColors[status].color;

  return (
    <Pressable
      onPress={() => handleDay(day)}
      className="items-center justify-center ml-1 border rounded-full w-11 h-11"
      style={{ backgroundColor, borderColor } as StyleProp<ViewStyle>}
    >
      <Text
        className="text-lg"
        style={{ color: textColor } as StyleProp<TextStyle>}
      >
        {day.name[0]}
      </Text>
    </Pressable>
  );
}
