import type { InputModel } from '@/entities/color';
import type { Palette, Tone, TransformCallback, SubtoneMap } from './types';

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
    base: Tone<any, any>;
    tones?: Record<string, Tone<any, any>>;
  }
>(input: TInput, config: TConfig): Palette<TInput, TConfig> {
  const palette: any = {};

  for (const colorKey in input) {
    const colorData = input[colorKey];
    palette[colorKey] = {
      ...colorData,
      ...config.base(colorData),
    };
  }

  if (config.tones) {
    for (const toneKey in config.tones) {
      const tone = config.tones[toneKey];
      const toneName = tone._name;
      if (!toneName) continue;

      for (const colorKey in input) {
        const colorData = input[colorKey];
        palette[`${colorKey}_${toneName}`] = tone(colorData);

        if (tone._subtones) {
          for (const subtoneKey in tone._subtones) {
            const subtoneTransform = tone._subtones[subtoneKey];
            palette[`${colorKey}_${subtoneKey}_${toneName}`] = subtoneTransform(colorData);
          }
        }
      }
    }
  }

  return palette;
}