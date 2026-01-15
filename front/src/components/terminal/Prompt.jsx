import { useState, useEffect } from "react";
import { playKeystroke } from "../../utils/sound"; 

export default function Prompt({ onCommand, inputRef }) {
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

  return (
    <form onSubmit={handleSubmit} className="flex flex-row items-center mt-2">
      <span className="mr-2 shrink-0 opacity-80">
        User@terminal.dammmmmmmmmmit:~$
      </span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          playKeystroke();
        }}
        className="flex-1 bg-transparent border-none outline-none w-full min-w-0 font-mono font-bold"
        autoComplete="off"
        autoFocus
      />
    </form>
  );
}