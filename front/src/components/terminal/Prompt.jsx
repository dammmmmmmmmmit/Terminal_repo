import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";

export default function Prompt({ onCommand, inputRef }) {
  const { mode, getTextStyle, customColor } = useTheme();
  const [input, setInput] = useState("");

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onCommand(input);
    setInput("");
  };

  
  const promptClass = mode === 'rainbow' ? getTextStyle() : '';
  const promptStyle = mode === 'custom' ? { color: customColor } : {};

  return (
    <form onSubmit={handleSubmit} className="flex flex-row items-center mt-2">
      <span className={`mr-2 ${promptClass}`} style={promptStyle}>
        User@terminal.dammmmmmmmmmit:~$
      </span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="bg-transparent border-none outline-none text-gray-100 flex-1 font-mono"
        autoComplete="off"
        autoFocus
      />
    </form>
  );
}