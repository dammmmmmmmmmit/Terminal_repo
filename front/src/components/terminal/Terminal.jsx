import { useState, useEffect, useRef } from "react";
import Prompt from "./Prompt.jsx"; 
import Output from "./Output.jsx";
import { runCommand } from "./commands.jsx";

import { useTheme } from "../../context/ThemeContext"; 

export default function Terminal() {
  const { mode, setMode, customColor, setCustomColor, getTextStyle } = useTheme();
  
  const [history, setHistory] = useState([]);
  const [showConfig, setShowConfig] = useState(false); 
  
  const bottomRef = useRef(null);
  const inputRef = useRef(null);


  const currentThemeClass = mode === 'rainbow' ? getTextStyle() : '';

  useEffect(() => {
    setHistory(runCommand("welcome", currentThemeClass));
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

    if (trimmedInput === "welcome") {
       setHistory(runCommand("welcome", currentThemeClass));
       return;
    }

    
    if (trimmedInput === "theme" || trimmedInput === "config") {
      setShowConfig(true);
      setHistory((prev) => [...prev, 
        <div key={Date.now()} className="text-gray-500">Opening theme settings...</div>
      ]);
      return;
    }

    setHistory((prev) => [
      ...prev,
      <div key={Date.now() + "cmd"} className="mb-2">
        <span 
            className={`mr-2 ${currentThemeClass}`} 
            style={mode === 'custom' ? { color: customColor } : {}}
        >
            User@terminal.dammmmmmmmmmit:~$
        </span>
        <span className="text-gray-100">{input}</span>
      </div>,
      ...runCommand(input, currentThemeClass),
    ]);
  };

  const containerClass = `min-h-screen p-6 bg-black text-sm font-mono overflow-y-auto cursor-text ${mode === 'rainbow' ? getTextStyle() : ''}`;
  const containerStyle = mode === 'custom' ? { color: customColor } : {};

  return (
    <div onClick={handleTerminalClick} className={containerClass} style={containerStyle}>
      <Output history={history} />
      
      {!showConfig && <Prompt onCommand={onCommand} inputRef={inputRef} />}
      
      {showConfig && (
        <div className="mt-4 p-4 border border-gray-700 bg-gray-900 rounded max-w-md shadow-lg z-50 relative">
            <h3 className="text-white text-lg mb-2 border-b border-gray-700 pb-2">Theme Configuration</h3>
            
            <div className="flex gap-4 mb-4">
                <button 
                    onClick={() => setMode('rainbow')}
                    className={`px-3 py-1 rounded transition-colors ${mode === 'rainbow' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                >
                    Rainbow Mode
                </button>
                <button 
                    onClick={() => setMode('custom')}
                    className={`px-3 py-1 rounded transition-colors ${mode === 'custom' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                >
                    Solid Color
                </button>
            </div>

            {mode === 'custom' && (
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-gray-300">Pick Color:</span>
                    <input 
                        type="color" 
                        value={customColor}
                        onChange={(e) => setCustomColor(e.target.value)}
                        className="h-8 w-16 cursor-pointer bg-transparent border border-gray-600 rounded"
                    />
                </div>
            )}

            <button 
                onClick={() => { setShowConfig(false); inputRef.current?.focus(); }}
                className="w-full py-2 bg-red-900/50 text-red-300 hover:bg-red-900/80 rounded border border-red-900 transition-colors"
            >
                [ Close Menu ]
            </button>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}