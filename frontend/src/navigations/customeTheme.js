import { DefaultTheme } from "@react-navigation/native";
import { colors } from "../../style";

export const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.primary03,
    text: "black",
  },
};
