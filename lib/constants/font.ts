import { StyleProp, TextStyle } from "react-native";
import { COLORS } from "./colors";

// TEXT & BUTTON STYLES
export const HEADING_BOLD: StyleProp<TextStyle> = {
  fontSize: 23,
  fontFamily: "Poippins-Bold",
  letterSpacing: 0.2,
  color: COLORS.white,
  fontWeight: "bold",
};

export const BUTTON_TEXT: StyleProp<TextStyle> = {
  color: COLORS.black,
  letterSpacing: 0.5,
  fontSize: 16,
  fontFamily: "Poippins-SemiBold",
};

export const NORMAL_TEXT: StyleProp<TextStyle> = {
  fontSize: 16,
  fontFamily: "Poippins-Regular",
  color: COLORS.white,
};

export const TEXT_LINK: StyleProp<TextStyle> = {
  fontSize: 15,
  fontFamily: "Poippins-Bold",
  color: COLORS.decentPrimary,
};

export const INFO_TEXT: StyleProp<TextStyle> = {
  fontSize: 15,
  fontFamily: "Poippins-Light",
  color: COLORS.decentAltText,
};

export const ERROR_TEXT: StyleProp<TextStyle> = {
  fontSize: 13,
  fontFamily: "Poippins-Regular",
  color: COLORS.red,
};
