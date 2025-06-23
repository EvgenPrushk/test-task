import React from 'react';
import { getContrastColor } from './../../shared/lib//getContrastColor';

interface ColorSwatchProps {
  name: string;
  colorValue: string;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({ name, colorValue }) => {
  const isColor = typeof colorValue === 'string' && (colorValue.startsWith('#') || /^[a-zA-Z]+$/.test(colorValue));

  if (!isColor) {
    return null;
  }

  const textColor = getContrastColor(colorValue);
  console.log('textColor', textColor)
  console.log('colorValue', colorValue)

  const styles: React.CSSProperties = {
    backgroundColor: colorValue,
    color: '#000',
    padding: '1rem',
    borderRadius: '8px',
    fontFamily: 'monospace',
    border: '1px solid rgba(0,0,0,0.1)',
    wordBreak: 'break-all'
  };

  return (
    <div style={styles}>
      <div style={{ fontWeight: 'bold' }}>{name}</div>
      <div>{colorValue}</div>
    </div>
  );
};