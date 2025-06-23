// src/features/palette-generator/model/index.test.ts

import { createTone, createPalette } from "./index";

export type ColorsUnion = 'red' | 'green' | 'blue' | 'yellow';

export type ColorData = {
  main: string;
  dark: string;
  light: string;
  extra: string;
};

export type InputModel = Partial<Record<ColorsUnion, ColorData>>;



// --- ARRANGE (Подготовка данных для всех тестов) ---

// 1. Моковые входные данные
const fullTestInput: InputModel = {
  red: { main: "red", dark: "darkred", light: "lightred", extra: "extrared" },
  blue: {
    main: "blue",
    dark: "darkblue",
    light: "lightblue",
    extra: "extrablue",
  },
};

// Новый набор данных с опциональными/отсутствующими свойствами
const partialTestInput: InputModel = {
  red: { main: "red", dark: "darkred", light: "lightred", extra: "extrared" },
  blue: undefined, // Явно указываем undefined
  // 'green' полностью отсутствует
};

// 2. Создание тонов
const baseColors = createTone((data: ColorData) => ({
  background: data.main,
}));

const brightness = createTone(
  (data: ColorData) => ({ foreground: data.main }),
  {
    name: "brightness",
    subtone: {
      low: (data: ColorData) => ({ white: data.light }),
    },
  }
);

// --- TESTS ---

describe("createTone", () => {
  // Тесты для createTone остаются без изменений, так как
  // на эту функцию изменение InputModel не повлияло.
  it("should return a function", () => {
    const tone = createTone((data) => ({ test: data.main }));
    expect(tone).toBeInstanceOf(Function);
  });

  it("should attach metadata properties", () => {
    const subtone = { low: (data: ColorData) => ({ sub: data.light }) };
    const tone = createTone((data) => ({ test: data.main }), {
      name: "testTone",
      subtone,
    });
    expect(tone._name).toBe("testTone");
    expect(tone._subtones).toEqual(subtone);
  });
});

describe("createPalette", () => {
  describe("with full input data", () => {
    it("should apply base tone to all colors", () => {
      const palette = createPalette(fullTestInput, { base: baseColors });
      expect(palette?.red?.background).toBe("red");
      expect(palette?.blue?.background).toBe("blue");
    });

    it("should generate main tones and subtone variations correctly", () => {
      const palette = createPalette(fullTestInput, {
        base: baseColors,
        tones: { brightness },
      }) as any;

      expect(palette.red_brightness).toEqual({ foreground: "red" });
      expect(palette.red_low_brightness).toEqual({ white: "lightred" });

      expect(palette.blue_brightness).toEqual({ foreground: "blue" });
      expect(palette.blue_low_brightness).toEqual({ white: "lightblue" });
    });

    it("should generate a complete palette matching the snapshot", () => {
      const fullPalette = createPalette(fullTestInput, {
        base: baseColors,
        tones: { brightness },
      });
      // Этот снимок будет для полного набора данных
      expect(fullPalette).toMatchSnapshot("full palette");
    });
  });

  describe("with partial or undefined input data", () => {
    it("should gracefully skip undefined color entries in the input", () => {
      const palette = createPalette(partialTestInput, {
        base: baseColors,
        tones: { brightness },
      }) as any;

      // Проверяем, что 'red' обработан
      expect(palette.red).toBeDefined();
      expect(palette.red_brightness).toBeDefined();

      // Ключевая проверка: 'blue' и его производные должны отсутствовать
      expect(palette).not.toHaveProperty("blue");
      expect(palette).not.toHaveProperty("blue_brightness");
      expect(palette).not.toHaveProperty("blue_low_brightness");
    });

    it("should not generate properties for completely missing keys", () => {
      const palette = createPalette(partialTestInput, { base: baseColors });
      // 'green' отсутствовал в partialTestInput, его не должно быть в результате
      expect(palette).not.toHaveProperty("green");
    });

    it("should generate a correct partial palette matching the snapshot", () => {
      const partialPalette = createPalette(partialTestInput, {
        base: baseColors,
        tones: { brightness },
      });
      // Этот снимок будет для частичного набора данных
      expect(partialPalette).toMatchSnapshot("partial palette");
    });

    it("should handle empty input object gracefully", () => {
      const palette = createPalette({}, { base: baseColors });
      expect(palette).toEqual({});
    });
  });
});
