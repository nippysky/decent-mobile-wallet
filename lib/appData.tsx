import {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from "react-native-toast-message";
import { JSX } from "react";
import { NORMAL_TEXT } from "./constants/font";
import { COLORS } from "./constants/colors";

export const toastConfig = {
  /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
  success: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ borderWidth: 1, borderColor: COLORS.decentPrimary }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        backgroundColor: COLORS.decentPrimary,
      }}
      text1Style={[NORMAL_TEXT, { color: COLORS.decentPrimary }]}
    />
  ),
  /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
  error: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
};
