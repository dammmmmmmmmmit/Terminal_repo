import { useState, useEffect, useRef } from "react";
import Prompt from "./Prompt.jsx";
import Output from "./Output.jsx";
import { runCommand } from "./commands.jsx";
import { useTheme } from "../../context/ThemeContext";
import AboutPanel from "./AboutPanel.jsx"; 

export default function Terminal() {
  const { themeColor, setThemeColor } = useTheme();
  
  const [history, setHistory] = useState([]);
  const [showConfig, setShowConfig] = useState(false);
  const [showAbout, setShowAbout] = useState(false); 
  
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setHistory(runCommand("welcome"));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, showAbout]); 

  const handleTerminalClick = () => {
    if (!showConfig) {
      inputRef.current?.focus();
    }
  };

  const onCommand = (input) => {
    const trimmedInput = input.trim().toLowerCase();

    if (trimmedInput === "about") {
      setShowAbout(true);
      setHistory((prev) => [
        ...prev,
        <div key={Date.now() + "cmd"} className="mb-2 opacity-80">
          <span className="mr-2">User@terminal:~$</span>
          <span>{input}</span>
        </div>,
        <div key={Date.now()} className="opacity-60 mb-4">>> Accessing Identity Record... [GRANTED]</div>
      ]);
      return;
    }

    if (trimmedInput === "clear") {
      setHistory([]);
      return;
    }

    if (trimmedInput === "theme" || trimmedInput === "config") {
      setShowConfig(true);
      return;
    }

    setHistory((prev) => [
      ...prev,
      <div key={Date.now() + "cmd"} className="mb-2 opacity-80">
        <span className="mr-2">User@terminal:~$</span>
        <span>{input}</span>
      </div>,
      ...runCommand(input),
    ]);
  };

  return (
    <div 
      className="h-screen w-screen bg-black overflow-hidden flex"
      style={{ color: themeColor, textShadow: `0 0 2px ${themeColor}` }}
    >
      
      {/* --- LEFT SIDE: TERMINAL --- */}
      <div 
        onClick={handleTerminalClick}
        className={`h-full p-6 overflow-y-auto no-scrollbar transition-all duration-500 ease-in-out ${showAbout ? 'w-1/2 border-r border-dashed' : 'w-full'}`}
        style={{ borderColor: themeColor }}
      >
        <Output history={history} />
        
        {!showConfig && <Prompt onCommand={onCommand} inputRef={inputRef} />}

        {showConfig && (
          <div className="mt-4 p-4 border border-gray-700 bg-gray-900/90 rounded max-w-md relative z-50">
            <h3 className="text-lg mb-4 border-b border-gray-700 pb-2 font-bold">Terminal Color Settings</h3>
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
              className="w-full py-2 border rounded hover:bg-white/10"
              style={{ borderColor: themeColor }}
            >
              [ Close Menu ]
            </button>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {showAbout && (
        <div className="w-1/2 h-full p-6 bg-black animate-in fade-in slide-in-from-right">
          <AboutPanel onClose={() => setShowAbout(false)} />
        </div>
      )}
    </div>
  );
}