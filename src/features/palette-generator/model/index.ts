
import type { ColorData, InputModel } from "@entities/color";
import type { Palette, Tone, TransformCallback, SubtoneMap } from "./types";

export function createTone<
  T extends TransformCallback,
  O extends { name?: string; subtone?: SubtoneMap }
>(transform: T, options?: O): Tone<T, O> {
  return Object.assign(transform, {
    _name: options?.name,
    _subtones: options?.subtone,
  });
}

export function createPalette<
  TInput extends InputModel,
  TConfig extends {
    base: Tone<TransformCallback, any>;
    tones?: Record<string, Tone<TransformCallback, any>>;
  }
>(
  input: TInput,
  config: TConfig
): Palette<TInput, TConfig> {
  const palette: Record<string, any> = {};

  // --- Первый проход для базовых цветов ---
  for (const colorKey in input) {
    if (Object.prototype.hasOwnProperty.call(input, colorKey)) {
      const colorData = input[colorKey as keyof TInput];

      // ВАЖНАЯ ПРОВЕРКА: Пропускаем, если значение undefined
      if (!colorData) {
        continue;
      }

      palette[colorKey] = {
        ...colorData,
        ...config.base(colorData as ColorData),
      };
    }
  }

  // --- Второй проход для тонов и подтонов ---
  if (config.tones) {
    for (const toneKey in config.tones) {
      const tone = config.tones[toneKey];
      const toneName = tone._name;
      if (!toneName) continue;

      for (const colorKey in input) {
        if (Object.prototype.hasOwnProperty.call(input, colorKey)) {
          const colorData = input[colorKey as keyof TInput];
          
          // ВАЖНАЯ ПРОВЕРКА: Пропускаем и здесь
          if (!colorData) {
            continue;
          }

          palette[`${colorKey}_${toneName}`] = tone(colorData as ColorData);

          if (tone._subtones) {
            for (const subtoneKey in tone._subtones) {
              const subtoneTransform = tone._subtones[subtoneKey];
              palette[`${colorKey}_${subtoneKey}_${toneName}`] =
                subtoneTransform(colorData);
            }
          }
        }
      }
    }
  }

  console.log('Palette',palette)
  return palette as Palette<TInput, TConfig>;
}