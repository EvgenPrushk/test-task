export function getContrastColor(hexColor: string): string {
  if (!hexColor || !hexColor.startsWith('#')) {
    // Пытаемся обработать строковые цвета
    if (document.body.style.color !== undefined) {
       const temp = document.createElement('div');
       temp.style.color = hexColor;
       document.body.appendChild(temp);
       const rgbColor = window.getComputedStyle(temp).color;
       document.body.removeChild(temp);
       if (rgbColor.startsWith('rgb')) {
          const [r, g, b] = rgbColor.match(/\d+/g)!.map(Number);
          const yiq = (r * 299 + g * 587 + b * 114) / 1000;
          return yiq >= 128 ? '#000' : '#FFF';
       }
    }
    return '#000'; // fallback
  }
  const color = hexColor.slice(1);
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? '#000' : '#FFF';
}