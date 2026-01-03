import { useEffect, useState } from "react";
import Loader from "./components/loader/Loader";
import Terminal from "./components/terminal/Terminal";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    
    <div className="min-h-screen bg-black text-gray-100 font-mono selection:bg-green-500/30">
      
      {loading ? <Loader /> : <Terminal />}
    </div>
  );
}