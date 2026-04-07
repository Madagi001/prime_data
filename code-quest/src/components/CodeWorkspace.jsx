import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Eye, Book, ChevronLeft, Send, Sparkles } from 'lucide-react';

export default function CodeWorkspace({ level, onBack, onComplete }) {
    const [code, setCode] = useState(level.initialCode || "<h1>Hello World</h1>");
    const [preview, setPreview] = useState("");

    useEffect(() => {
        setPreview(code);
    }, [code]);

    return (
        <div className="h-full flex flex-col bg-slate-950">
            {/* Workspace Header */}
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-slate-900/50">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-lg text-text-muted">
                        <ChevronLeft size={20} />
                    </button>
                    <div>
                        <span className="text-xs font-bold text-text-muted uppercase tracking-widest">Quest {level.id}</span>
                        <h3 className="font-bold">{level.title}</h3>
                    </div>
                </div>
                <button
                    onClick={() => onComplete(code)}
                    className="flex items-center gap-2 px-6 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 font-bold transition-all"
                >
                    <Send size={18} />
                    Submit Solution
                </button>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Left: Instructions */}
                <div className="w-1/4 border-r border-white/10 p-6 overflow-y-auto bg-slate-900/30">
                    <div className="flex items-center gap-2 text-indigo-400 mb-4">
                        <Book size={20} />
                        <h4 className="font-black uppercase tracking-wider text-sm">Instructions</h4>
                    </div>
                    <div className="prose prose-invert prose-sm">
                        <p className="text-lg font-medium leading-relaxed mb-4">
                            Welcome, Architect! Your first task is to give your world a name.
                        </p>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                            <p className="font-bold flex items-center gap-2">
                                <Sparkles size={16} className="text-amber-400" /> Objective:
                            </p>
                            <ul className="list-disc pl-4 space-y-2 text-text-muted">
                                <li>Use an <code className="text-indigo-400">&lt;h1&gt;</code> tag.</li>
                                <li>Change text to "Hello [Your Name]".</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Center: Editor */}
                <div className="flex-1 flex flex-col border-r border-white/10">
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border-b border-white/5 text-xs font-bold text-text-muted">
                        <Code2 size={14} /> index.html
                    </div>
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        spellCheck={false}
                        className="flex-1 bg-slate-950 p-6 font-mono text-lg resize-none outline-none text-emerald-400 caret-white"
                        placeholder="Write your code here..."
                    />
                </div>

                {/* Right: Preview */}
                <div className="w-1/3 flex flex-col bg-slate-900/20">
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border-b border-white/5 text-xs font-bold text-text-muted">
                        <Eye size={14} /> Magic Mirror (Preview)
                    </div>
                    <div className="flex-1 p-8 bg-white/5 flex items-center justify-center overflow-auto">
                        <div
                            className="preview-container w-full h-full bg-white rounded-lg p-6 shadow-2xl origin-top"
                            dangerouslySetInnerHTML={{ __html: preview }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
