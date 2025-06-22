import type { ColorData, InputModel } from "@/entities/color";
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
  TBase extends TransformCallback,
  TBaseOptions extends { name?: string; subtone?: SubtoneMap },
  TBaseTone extends Tone<TBase, TBaseOptions>,
  TTones extends Record<
    string,
    Tone<TransformCallback, { name?: string; subtone?: SubtoneMap }>
  > = {}
>(
  input: TInput,
  config: {
    base: TBaseTone;
    tones?: TTones;
  }
): Palette<TInput, typeof config> {
  const palette: Record<string, Record<string, string>> = {};

  for (const colorKey in input) {
    const colorData = input[colorKey];
    palette[colorKey] = {
      ...colorData,
      ...config.base(colorData as ColorData),
    };
  }

  if (config.tones) {
    for (const toneKey in config.tones) {
      const tone = config.tones[toneKey];
      const toneName = tone._name;
      if (!toneName) continue;

      for (const colorKey in input) {
        const colorData = input[colorKey];
        palette[`${colorKey}_${toneName}`] = tone(colorData as ColorData);

        if (tone._subtones) {
          for (const subtoneKey in tone._subtones) {
            const subtoneTransform = tone._subtones[subtoneKey];
            palette[`${colorKey}_${subtoneKey}_${toneName}`] = subtoneTransform(
              colorData as ColorData
            );
          }
        }
      }
    }
  }
  console.log("palette", palette);
  return palette as Palette<TInput, typeof config>;
}
