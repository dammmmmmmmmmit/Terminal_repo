import { useState, useEffect, useRef } from "react";
import Prompt from "./Prompt.jsx";
import Output from "./Output.jsx";
import { runCommand } from "./commands.jsx";
import { useTheme } from "../../context/ThemeContext";

export default function Terminal() {
  const { themeColor, setThemeColor } = useTheme();
  
  const [history, setHistory] = useState([]);
  const [showConfig, setShowConfig] = useState(false);
  
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setHistory(runCommand("welcome"));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleTerminalClick = () => {
    if (!showConfig) {
      inputRef.current?.focus();
    }
  };

  const onCommand = (input) => {
    const trimmedInput = input.trim().toLowerCase();

    if (trimmedInput === "clear") {
      setHistory([]);
      return;
    }

    if (trimmedInput === "theme" || trimmedInput === "config") {
      setShowConfig(true);
      setHistory((prev) => [...prev, 
        <div key={Date.now()} className="opacity-50">Opening theme settings...</div>
      ]);
      return;
    }

    setHistory((prev) => [
      ...prev,
      <div key={Date.now() + "cmd"} className="mb-2 opacity-80">
        <span className="mr-2">User@terminal.dammmmmmmmmmit:~$</span>
        <span>{input}</span>
      </div>,
      ...runCommand(input),
    ]);
  };

  return (
    <div 
      onClick={handleTerminalClick} 
      className="min-h-screen p-6 bg-black text-sm font-mono overflow-y-auto cursor-text selection:bg-gray-800 animate-pulse"
      style={{ color: themeColor, textShadow: `0 0 2px ${themeColor}` }} // Adds a faint glow!
    >
      <Output history={history} />
      
      {!showConfig && <Prompt onCommand={onCommand} inputRef={inputRef} />}
      
      {showConfig && (
        <div className="mt-4 p-4 border border-gray-700 bg-gray-900/90 rounded max-w-md shadow-lg z-50 relative">
          <h3 className="text-lg mb-4 border-b border-gray-700 pb-2 font-bold" style={{ color: themeColor }}>
            Terminal Color Settings
          </h3>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="text-gray-400">Select Phosphor Color:</span>
            <input 
              type="color" 
              value={themeColor}
              onChange={(e) => setThemeColor(e.target.value)}
              className="h-10 w-20 cursor-pointer bg-transparent border border-gray-600 rounded"
            />
          </div>

          <button 
            onClick={() => { setShowConfig(false); inputRef.current?.focus(); }}
            className="w-full py-2 hover:bg-white/10 rounded border transition-colors"
            style={{ borderColor: themeColor, color: themeColor }}
          >
            [ Close Menu ]
          </button>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}