export const isValidColor = (color: string): boolean => {
  if (!color || typeof color !== 'string') return false;

  // Проверка hex (#fff, #ffffff, с прозрачностью #ffffffff)
  if (/^#([0-9A-F]{3,4}|[0-9A-F]{6}|[0-9A-F]{8})$/i.test(color)) return true;

  // Проверка rgb/rgba (поддерживает проценты и пробелы)
  if (/^rgba?\(\s*(\d{1,3}%?)\s*,\s*(\d{1,3}%?)\s*,\s*(\d{1,3}%?)\s*(?:,\s*([\d.]+)\s*)?\)$/i.test(color)) {
    return true;
  }

  // Проверка hsl/hsla
  if (/^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3}%)\s*,\s*(\d{1,3}%)\s*(?:,\s*([\d.]+)\s*)?\)$/i.test(color)) {
    return true;
  }

  // Проверка именованных цветов (red, blue и т.д.)
  const s = new Option().style;
  s.color = color;
  return s.color !== '';
};
