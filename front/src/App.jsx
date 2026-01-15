import { useState } from "react";
import Loader from "./components/loader/Loader";
import Terminal from "./components/terminal/Terminal";
import { playBootSound } from "./utils/sound";

export default function App() {
  const [started, setStarted] = useState(false); 
  const [loading, setLoading] = useState(false); 

  const handleStart = () => {
   
    playBootSound();
    
    setStarted(true);
    setLoading(true);

        setTimeout(() => setLoading(false), 12000);
  };

  
  if (!started) {
    return (
      <div 
        onClick={handleStart} 
        className="min-h-screen bg-black flex items-center justify-center cursor-pointer text-green-500 font-mono"
      >
        <div className="text-center animate-pulse">
          <p className="text-xl mb-2">[ SYSTEM OFFLINE ]</p>
          <p className="text-sm opacity-70">Click anywhere to initialize...</p>
        </div>
      </div>
    );
  }

    return (
    <div className="min-h-screen bg-black text-gray-100 font-mono selection:bg-green-500/30">
      {loading ? <Loader /> : <Terminal />}
    </div>
  );
}