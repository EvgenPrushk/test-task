import React from 'react';
import { ColorSwatch } from './../../../shared/ui/ColorSwatch';

interface ColorGroupProps {
  title: string;
  colors: Record<string, string>;
}

export const ColorGroup: React.FC<ColorGroupProps> = ({ title, colors }) => {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3 style={{ textTransform: 'capitalize', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
        {title.replace(/_/g, ' ')}
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {Object.entries(colors).map(([name, value]) => (
          <ColorSwatch key={name} name={name} colorValue={value} />
        ))}
      </div>
    </div>
  );
};