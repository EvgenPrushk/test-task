import React from 'react';
import { ColorGroup } from './../../../entities/color/ui/ColorGroup';

interface PaletteDisplayProps {
  palette: Record<string, Record<string, string>>
}
const groupPalette = <
  T extends Record<string, Record<string, string>>
>(
  palette: T
): Record<
  string,
  Record<string, Record<string, string>>
> => {
  const grouped: Record<string, Record<string, Record<string, string>>> = {};

  for (const key in palette) {
    const baseColorName = key.split('_')[0];
    if (!grouped[baseColorName]) {
      grouped[baseColorName] = {};
    }
    const itemTitle = key === baseColorName ? 'base' : key.replace(`${baseColorName}_`, '');
    grouped[baseColorName][itemTitle] = palette[key];
  }

  return grouped;
};

export const PaletteDisplay: React.FC<PaletteDisplayProps> = ({ palette }) => {
  const groupedPalette = groupPalette(palette);

  return (
    <div>
      {Object.entries(groupedPalette).map(([baseName, colorGroup]) => (
        <section key={baseName} style={{ marginBottom: '3rem', border: '1px solid #ddd', padding: '1rem 2rem', borderRadius: '12px', background: '#fff' }}>
          <h2 style={{ fontSize: '2rem' }}>{baseName.charAt(0).toUpperCase() + baseName.slice(1)}</h2>
          {Object.entries(colorGroup).map(([groupName, colors]) => (
             <ColorGroup key={groupName} title={groupName} colors={colors} />
          ))}
        </section>
      ))}
    </div>
  );
};