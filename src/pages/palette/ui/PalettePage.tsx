import React from 'react';
import { PaletteDisplay } from './../../../features/palette-generator/ui/PaletteDisplay';
import { colors } from './../../../app/providers/colors';

export const PalettePage: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1>Color Palette Management System</h1>
        <p>A palette generated based on TypeScript logic and Feature-Sliced Design.</p>
      </header>
      <main>
        <PaletteDisplay palette={colors} />
      </main>
    </div>
  );
};

