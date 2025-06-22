import type { ColorData, InputModel } from '@/entities/color';
import type { UnionToIntersection } from '@/shared/types';

// Типы, описывающие процесс трансформации цвета
export type TransformCallback = (data: ColorData) => Record<string, string>;
export type SubtoneMap = Record<string, TransformCallback>;

// Тип, описывающий объект, возвращаемый createTone
export type Tone<
  T extends TransformCallback,
  O extends { name?: string; subtone?: SubtoneMap }
> = T & {
  _name: O['name'];
  _subtones: O['subtone'];
};

// Главный тип, вычисляющий финальную структуру палитры
export type Palette<
  TInput extends InputModel,
  TConfig extends {
    base: Tone<TransformCallback, { name?: string; subtone?: SubtoneMap }>;
    tones?: Record<string, Tone<TransformCallback, { name?: string; subtone?: SubtoneMap }>>;
  }
> =
  {
    [ColorKey in keyof TInput]: TInput[ColorKey] & ReturnType<TConfig['base']>;
  } &
  UnionToIntersection<
    TConfig['tones'] extends Record<string, string>
      ? {
          [ToneKey in keyof TConfig['tones']]: {
            [ColorKey in keyof TInput as `${ColorKey & string}_${TConfig['tones'][ToneKey]['_name'] & string}`]:
              ReturnType<TConfig['tones'][ToneKey]>;
          };
        }[keyof TConfig['tones']]
      : {}
  > &
  UnionToIntersection<
    TConfig['tones'] extends Record<string, string>
      ? {
          [ToneKey in keyof TConfig['tones']]: UnionToIntersection<
            {
              [SubtoneKey in keyof TConfig['tones'][ToneKey]['_subtones']]: {
                [ColorKey in keyof TInput as `${ColorKey & string}_${SubtoneKey & string}_${TConfig['tones'][ToneKey]['_name'] & string}`]:
                  ReturnType<TConfig['tones'][ToneKey]['_subtones'][SubtoneKey]>;
              };
            }[keyof TConfig['tones'][ToneKey]['_subtones']]
          >;
        }[keyof TConfig['tones']]
      : {}
  >;