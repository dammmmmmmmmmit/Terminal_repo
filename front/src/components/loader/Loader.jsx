import { useEffect } from "react";

export default function Loader({ onFinish }) {
  const text = "booting system...";

  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 1500); 

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <pre className="font-mono text-sm">
        {text.split("").map((char, i) => (
          <span
            key={i}
            className="rainbow-char"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            {char}
          </span>
        ))}
      </pre>
    </div>
  );
}
