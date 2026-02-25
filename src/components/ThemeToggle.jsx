import React from "react";
import { useTheme } from "./context/ThemeContext";

function ThemeToggle({ className }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className={className ? `theme-toggle ${className}` : "theme-toggle"}
    >
      {isDark ? "🌙" : "☀️"}
    </button>
  );
}

export default ThemeToggle;
