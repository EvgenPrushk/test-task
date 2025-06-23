import React from "react";
import { isValidColor, getTextColorForBackground } from "./../../shared/lib";
import s from "./ColorSwatch.module.scss";
import { DEFAULT_FALLBACK_COLOR } from "./../../shared/types";

interface ColorSwatchProps {
  name: string;
  colorValue: string;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  name,
  colorValue,
}) => {
  const isColor =
    typeof colorValue === "string" &&
    (colorValue.startsWith("#") || /^[a-zA-Z]+$/.test(colorValue));

  if (!isColor) {
    return null;
  }

  const styles: React.CSSProperties = {
    backgroundColor: isValidColor(colorValue)
      ? colorValue
      : DEFAULT_FALLBACK_COLOR,
    color: getTextColorForBackground(colorValue),
    padding: "1rem",
    borderRadius: "8px",
    fontFamily: "monospace",
    border: "1px solid rgba(0,0,0,0.1)",
    wordBreak: "break-all",
  };

  return (
    <div style={styles}>
      <div className={s.title}>{name}</div>
      <div>{colorValue}</div>
    </div>
  );
};
