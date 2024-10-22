import { Toast } from "toastify-react-native";

export const AlertError = (message: string) => {
  Toast.error(message, "top");
};
export const AlertSuccess = (message: string) => {
  Toast.success(message, "top");
};
