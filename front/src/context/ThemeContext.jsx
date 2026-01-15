import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [themeColor, setThemeColor] = useState("#22c55e"); 

  useEffect(() => {
    const savedColor = localStorage.getItem("terminal_theme_color");
    if (savedColor) {
      setThemeColor(savedColor);
    }
  }, []);

  const updateThemeColor = (color) => {
    setThemeColor(color);
    localStorage.setItem("terminal_theme_color", color);
  };

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor: updateThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}