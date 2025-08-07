"use client";

import { ModeContext } from "@-ft/mode-next";
import { useContext } from "react";

export function ThemeSwitch() {
  const { mode, setMode } = useContext(ModeContext);

  return (
    <button
      onClick={() =>
        setMode(
          mode === "system" ? "light" : mode === "light" ? "dark" : "system"
        )
      }
    >
      Change theme (currently {mode})
    </button>
  );
}
