import { useState, useEffect, useRef } from "react";

// ✅ Ensure this is your correct Worker URL
const API_URL = "https://terminal-ai-backend.aditya122sharma.workers.dev";

export default function AiChat({ onClose }) {
    const [stage, setStage] = useState("login"); // login | chat
    const [mode, setMode] = useState(""); // "admin" or "guest"
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [history, setHistory] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history, stage]);

    // --- HANDLE LOGIN (Admin or Guest) ---
    const handleLogin = async (e, type) => {
        if (e) e.preventDefault();
        setLoading(true);
        setError("");

        // If Guest, we send the password "guest" automatically
        const pwdToSend = type === "guest" ? "guest" : password;

        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password: pwdToSend, messages: [] })
            });

            if (res.status === 401) {
                setError("ACCESS DENIED: INVALID PASSPHRASE");
                setLoading(false);
            } else {
                setMode(type === "guest" ? "guest" : "admin");
                setStage("chat");
                setLoading(false);
                setHistory([
                    {
                        role: "assistant", content: type === "guest"
                            ? "Visitor Access Granted. I can answer questions about Aditya's resume."
                            : "Admin Access Granted. System Unlocked."
                    }
                ]);
            }
        } catch (err) {
            setError("CONNECTION ERROR: SERVER UNREACHABLE");
            setLoading(false);
        }
    };

    // --- HANDLE SEND MESSAGE ---
    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newHistory = [...history, { role: "user", content: input }];
        setHistory(newHistory);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    // IMPORTANT: We keep sending the password so the backend knows which model to use
                    password: mode === "guest" ? "guest" : password,
                    messages: newHistory.filter(m => m.role !== "assistant")
                })
            });

            const data = await res.json();

            if (data.choices && data.choices[0]) {
                setHistory(prev => [...prev, data.choices[0].message]);
            } else {
                throw new Error("No response from Neural Net");
            }
        } catch (err) {
            setHistory(prev => [...prev, { role: "assistant", content: `[ERROR] ${err.message}` }]);
        } finally {
            setLoading(false);
        }
    };

    // --- RENDER: LOGIN SCREEN ---
    if (stage === "login") {
        return (
            <div className="border border-red-500 p-6 max-w-md mx-auto mt-4 animate-in fade-in bg-black/90 font-mono">
                <div className="text-red-500 font-bold mb-4 text-center border-b border-red-900 pb-2 tracking-widest">
                    ⚠ CLASSIFIED ACCESS ⚠
                </div>

                {/* THE EMAIL HINT YOU WANTED */}
                <div className="mb-6 text-xs text-gray-400 text-center italic opacity-80">
                    {">"} To access Admin AI (Llama-70B), email me for the passphrase.
                </div>

                <form onSubmit={(e) => handleLogin(e, "admin")} className="flex flex-col gap-4">
                    {/* Admin Password Input */}
                    <div className="flex items-center gap-2">
                        <span className="text-red-500 font-bold">PASSPHRASE:</span>
                        <input
                            ref={inputRef}
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="bg-transparent border-b border-red-900 focus:border-red-500 outline-none flex-1 text-red-400"
                            autoFocus
                            placeholder="Enter secret..."
                        />
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-800">
                        {/* Hidden submit button so 'Enter' key works for Admin */}
                        <button type="submit" className="hidden"></button>

                        <span className="text-xs text-gray-600">OR</span>

                        {/* Guest Button */}
                        <button
                            type="button"
                            onClick={() => handleLogin(null, "guest")}
                            className="text-xs border border-green-700 text-green-500 px-4 py-2 hover:bg-green-900/30 transition-colors"
                        >
                            [ ENTER AS GUEST ]
                        </button>
                    </div>

                    {error && <div className="text-red-500 font-bold text-xs animate-pulse text-center mt-2">>> {error}</div>}
                    {loading && <div className="text-gray-500 text-xs text-center mt-2">Authenticating...</div>}
                </form>
            </div>
        );
    }

    // --- RENDER: CHAT SCREEN ---
    return (
        <div className={`border p-4 h-96 flex flex-col bg-black/80 mt-4 relative shadow-[0_0_15px_rgba(0,0,0,0.5)] font-mono ${mode === 'admin' ? 'border-green-500/50' : 'border-blue-500/50'}`}>
            {/* Status Bar */}
            <div className="absolute top-2 left-2 text-[10px] opacity-50 uppercase tracking-widest flex gap-2">
                <span>MODE: {mode === 'admin' ? 'ADMIN' : 'GUEST'}</span>
                <span>MODEL: {mode === 'admin' ? 'LLAMA-3-70B' : 'LLAMA-3-8B'}</span>
            </div>

            <button
                onClick={onClose}
                className={`absolute top-2 right-2 text-xs border px-2 py-1 hover:opacity-100 opacity-70 ${mode === 'admin' ? 'text-green-700 border-green-900' : 'text-blue-700 border-blue-900'}`}
            >
                [ DISCONNECT ]
            </button>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 mb-4 p-2 mt-6">
                {history.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-2 border-l-2 ${msg.role === 'user'
                                ? 'border-gray-500 bg-gray-900/10 text-gray-300'
                                : mode === 'admin'
                                    ? 'border-green-500 text-green-400'
                                    : 'border-blue-500 text-blue-400'
                            }`}>
                            <span className="font-bold text-[10px] opacity-50 block mb-1 tracking-wider">
                                {msg.role === 'user' ? '>> USER' : '>> SYSTEM'}
                            </span>
                            <div className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                        </div>
                    </div>
                ))}
                {loading && <div className={`animate-pulse text-xs ml-2 ${mode === 'admin' ? 'text-green-500' : 'text-blue-500'}`}>Receiving transmission...</div>}
                <div ref={bottomRef} />
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSend} className={`border-t pt-3 flex gap-2 items-center ${mode === 'admin' ? 'border-green-900/50' : 'border-blue-900/50'}`}>
                <span className={`${mode === 'admin' ? 'text-green-500' : 'text-blue-500'} font-bold animate-pulse`}>{">"}</span>
                <input
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    className={`flex-1 bg-transparent outline-none ${mode === 'admin' ? 'text-green-400 placeholder-green-900' : 'text-blue-400 placeholder-blue-900'}`}
                    placeholder={mode === 'admin' ? "Command the neural net..." : "Ask about Aditya's resume..."}
                    autoFocus
                />
            </form>
        </div>
    );
}