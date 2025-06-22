import type { InputModel } from "@/entities/color";
import { createPalette, createTone } from "./../../features/palette-generator";

const input = {
  red: { main: "red", dark: "darkred", light: "#ffcccb", extra: "#D2122E" },
  green: {
    main: "green",
    dark: "darkgreen",
    light: "lightgreen",
    extra: "#00A36C",
  },
  blue: {
    main: "blue",
    dark: "darkblue",
    light: "lightblue",
    extra: "#0047AB",
  },
  yellow: {
    main: "yellow",
    dark: "#CCCC00",
    light: "#ffffed",
    extra: "#FDDA0D",
  },
  orange: {
    main: "orange",
    dark: "#CC5500",
    light: "#fff4e6",
    extra: "#FFA500",
  },
} satisfies InputModel;

const baseColors = createTone((data) => ({
  background: data.main,
  color: data.light,
}));

const brightness = createTone(
  (data) => ({ foreground: data.main, customProp: "#f0f0f0" }),
  {
    name: "brightness",
    subtone: {
      low: (data) => ({ white: data.light }),
      medium: (data) => ({ shadow: data.main }),
    },
  }
);

const depths = createTone(
  (data) => ({
    background: data.light,
    foreground: data.main,
    color: data.extra,
  }),
  {
    name: "depth",
    subtone: {
      "8-bit": (data) => ({ borderColor: data.main }),
      "16-bit": (data) => ({ anotherColor: data.light }),
    },
  }
);

export const colors = createPalette(input, {
  base: baseColors,
  tones: {
    brightness,
    depths,
  },
});
