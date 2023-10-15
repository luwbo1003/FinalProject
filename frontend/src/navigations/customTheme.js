import { DefaultTheme } from "@react-navigation/native";
import { colors } from "../../styles";

export const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.primary04,
    text: "black",
  },
};
