import { getContrastColor } from "./getContrastColor";

export const getTextColorForBackground = (backgroundColor: string): string => {
  // Особые случаи, когда всегда нужен черный текст
  if (backgroundColor === "#fff" || 
      backgroundColor === "white" ||
      backgroundColor === "transparent" ||
      backgroundColor === "rgba(255,255,255,0)") {
    return "black";
  }

  // Особые случаи, когда всегда нужен белый текст
  if (backgroundColor === "#000" || 
      backgroundColor === "black") {
    return "white";
  }

  // Общий случай - вычисляем контрастный цвет
  return getContrastColor(backgroundColor);
};