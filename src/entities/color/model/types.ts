export type ColorsUnion = 'red' | 'green' | 'blue' | 'yellow' | 'orange';

export type ColorData = {
  main: string;
  dark: string;
  light: string;
  extra: string;
};

export type InputModel = Record<ColorsUnion, ColorData>;
