import React from 'react';
import { ColorSwatch } from './../../../shared/ui/ColorSwatch';
import s from './ColorGroup.module.scss';

interface ColorGroupProps {
  title: string;
  colors: Record<string, string>;
}

export const ColorGroup: React.FC<ColorGroupProps> = ({ title, colors }) => {
  return (
    <div className={s.wrap}>
      <h3 className={s.colorTitle}>
        {title.replace(/_/g, ' ')}
      </h3>
    
      <div className={s.gridWrap}>
        {Object.entries(colors).map(([name, value]) => (
          <ColorSwatch key={name} name={name} colorValue={value} />
        ))}
      </div>
    </div>
  );
};