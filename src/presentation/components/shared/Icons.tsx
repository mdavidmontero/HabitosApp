import React from "react";
import { Button, Icon } from "@ui-kitten/components";

interface IconsProps {
  name: string;
}
export const Icons = ({ name }: IconsProps) => (
  <Icon name={name} fill="white" width={24} height={24} />
);
