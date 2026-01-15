import { useTheme } from "../../context/ThemeContext";

export default function AboutPanel({ onClose }) {
  const { themeColor } = useTheme();

  return (
    <div 
      className="h-full w-full border-2 p-4 flex flex-col shadow-lg animate-in fade-in slide-in-from-right-10 duration-500 bg-black/90"
      style={{ borderColor: themeColor, color: themeColor, boxShadow: `0 0 10px ${themeColor}40` }}
    >
      {/* --- HEADER --- */}
      <div className="flex justify-between items-center border-b pb-2 mb-4" style={{ borderColor: themeColor }}>
        <h2 className="text-xl font-bold tracking-widest bg-opacity-20 uppercase">
          [ IDENTITY_RECORD ]
        </h2>
        <button 
          onClick={onClose}
          className="hover:bg-red-900/50 px-3 py-1 text-sm border border-transparent hover:border-red-500 transition-colors"
        >
          [X] CLOSE
        </button>
      </div>

      {/* --- SCROLLABLE CONTENT AREA --- */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar font-sans text-sm leading-relaxed opacity-90">
        
        {/* SUMMARY */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-2 decoration-2 underline underline-offset-4">>> SUBJECT SUMMARY</h3>
          <p>
            Full Stack Developer and Machine Learning enthusiast with a passion for building 
            immersive web experiences. Currently triangulating the intersection of 
            retro-aesthetics and modern functionality.
          </p>
        </div>

        {/* EXPERIENCE */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-2 decoration-2 underline underline-offset-4">>> MISSION HISTORY</h3>
          
          <div className="mb-4">
            <div className="flex justify-between font-bold opacity-80">
              <span>Data Analyst</span>
              <span>2019 - 2021</span>
            </div>
            <div className="italic opacity-70 mb-1"><a href="https://thehive.ai/"/>hive.ai</div>
            <ul className="list-disc pl-5 space-y-1 opacity-80">
              <li>-------</li>
              <li>-------</li>
            </ul>
          </div>

          <div className="mb-4">
            <div className="flex justify-between font-bold opacity-80">
              <span>Freelance Developer</span>
              <span>2023 - 2024</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 opacity-80">
              <li>---------</li>
            </ul>
          </div>
        </div>

        {/* SKILLS */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-2 decoration-2 underline underline-offset-4">>> WEAPONRY</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>▸ JavaScript (ES6+)</div>
            <div>▸ React.js & Tailwind</div>
            <div>▸ Python & PyTorch</div>
            <div>▸ Node.js & Express</div>
            <div>▸ PostgreSQL</div>
            <div>▸ Linux / Bash</div>
          </div>
        </div>

      </div>
    </div>
  );
}