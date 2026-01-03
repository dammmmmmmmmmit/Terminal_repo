import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Modes: 'rainbow' | 'custom'
  const [mode, setMode] = useState("rainbow");
  
  // Default custom color (Green)
  const [customColor, setCustomColor] = useState("#4ade80");

  // This generates the CSS class string based on current state
  const getTextStyle = () => {
    if (mode === "rainbow") {
      // UPDATED: Tighter gradient so colors show up on short text too
      return "bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-purple-500 to-red-500 text-transparent bg-clip-text animate-text-gradient bg-[length:200%_auto]";
    }
    return ""; 
  };

  return (
    <ThemeContext.Provider value={{ mode, setMode, customColor, setCustomColor, getTextStyle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);