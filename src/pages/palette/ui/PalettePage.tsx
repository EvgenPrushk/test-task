import React from "react";
import { PaletteDisplay } from "./../../../features/palette-generator/ui/PaletteDisplay";
import { colors } from "./../../../app/providers/colors";
import s from "./PalettePage.module.scss";

export const PalettePage = () => {
  return (
    <div className={s.wrap}>
      <header className={s.header}>
        <h1>Color Palette Management System</h1>
        <p>
          Cпасибо тебе за уделенное время на проверку тестового задания
        </p>
      </header>
      <main>
        <PaletteDisplay palette={colors} />
      </main>
    </div>
  );
};
