import type { ColorData, InputModel } from '@entities/color';
import type { UnionToIntersection } from '@shared/types';

export type TransformCallback = (data: ColorData) => Record<string, string>;
export type SubtoneMap = Record<string, TransformCallback>;

export type Tone<
  T extends TransformCallback,
  O extends { name?: string; subtone?: SubtoneMap }
> = T & {
  _name: O['name'];
  _subtones: O['subtone'];
};

type BaseColorOutput<TInput extends InputModel, TBase extends TransformCallback> = {
  [K in keyof TInput]: TInput[K] & ReturnType<TBase>;
};

type ToneColorOutput<
  TInput extends InputModel,
  TTone extends Tone<TransformCallback, { name?: string; subtone?: SubtoneMap }>
> = {
  [K in keyof TInput as `${K & string}_${TTone['_name'] & string}`]: ReturnType<TTone>;
};

type SubtoneColorOutput<
  TInput extends InputModel,
  TTone extends Tone<TransformCallback, { name?: string; subtone?: SubtoneMap }>
> =
  TTone['_subtones'] extends SubtoneMap
    ? UnionToIntersection<{
        [SubtoneKey in keyof TTone['_subtones']]: {
          [K in keyof TInput as `${K & string}_${SubtoneKey & string}_${TTone['_name'] & string}`]:
            ReturnType<TTone['_subtones'][SubtoneKey]>;
        };
      }[keyof TTone['_subtones']]>
    : {};

export type Palette<
  TInput extends InputModel,
  TConfig extends {
    base: Tone<TransformCallback, { name?: string; subtone?: SubtoneMap }>;
    tones?: Record<string, Tone<TransformCallback, { name?: string; subtone?: SubtoneMap }>>;
  }
> =
  BaseColorOutput<TInput, TConfig['base']> &

  (TConfig['tones'] extends Record<string, any>
    ? UnionToIntersection<{
        [ToneKey in keyof TConfig['tones']]:
          ToneColorOutput<TInput, TConfig['tones'][ToneKey]> &
          SubtoneColorOutput<TInput, TConfig['tones'][ToneKey]>;
      }[keyof TConfig['tones']]>
    : {});
