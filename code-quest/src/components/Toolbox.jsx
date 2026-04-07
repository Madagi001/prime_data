import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, GitBranch, Search, ChevronRight, X, Play, Square, Code, Box, Info } from 'lucide-react';

export default function Toolbox({ onClose }) {
    const [activeTab, setActiveTab] = useState('terminal');

    return (
        <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-6">
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-5xl h-[80vh] bg-slate-900 border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            >
                {/* Header */}
                <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-slate-800/50">
                    <div className="flex items-center gap-4">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-rose-500" />
                            <div className="w-3 h-3 rounded-full bg-amber-500" />
                            <div className="w-3 h-3 rounded-full bg-emerald-500" />
                        </div>
                        <div className="h-4 w-px bg-white/10 mx-2" />
                        <h2 className="text-sm font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                            <Box size={16} /> Developer Toolbox
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 flex overflow-hidden">
                    {/* Sidebar Tabs */}
                    <div className="w-64 border-r border-white/10 p-4 bg-slate-950/20">
                        <div className="space-y-2">
                            <TabButton
                                active={activeTab === 'terminal'}
                                onClick={() => setActiveTab('terminal')}
                                icon={<Terminal size={18} />}
                                label="Terminal"
                                desc="Run commands like a pro"
                            />
                            <TabButton
                                active={activeTab === 'git'}
                                onClick={() => setActiveTab('git')}
                                icon={<GitBranch size={18} />}
                                label="Git Lab"
                                desc="Track your changes"
                            />
                            <TabButton
                                active={activeTab === 'inspector'}
                                onClick={() => setActiveTab('inspector')}
                                icon={<Search size={18} />}
                                label="Inspector"
                                desc="Inspect the matrix"
                            />
                        </div>

                        <div className="mt-8 p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                            <h4 className="flex items-center gap-2 text-xs font-black uppercase text-indigo-400 mb-2">
                                <Info size={12} /> Pro Tip
                            </h4>
                            <p className="text-xs text-text-muted leading-relaxed">
                                Most developers spend 80% of their time in the terminal. Mastering it is your first superpower!
                            </p>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 relative overflow-hidden flex flex-col">
                        <AnimatePresence mode="wait">
                            {activeTab === 'terminal' && <TerminalSim key="terminal" />}
                            {activeTab === 'git' && <GitSim key="git" />}
                            {activeTab === 'inspector' && <InspectorSim key="inspector" />}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

function TabButton({ active, onClick, icon, label, desc }) {
    return (
        <button
            onClick={onClick}
            className={`w-full p-4 rounded-2xl text-left border transition-all ${active
                    ? 'bg-indigo-600 border-indigo-500 shadow-lg shadow-indigo-600/20 text-white'
                    : 'bg-white/5 border-white/5 text-text-muted hover:bg-white/10'
                }`}
        >
            <div className="flex items-center gap-3 mb-1">
                {icon}
                <span className="font-bold">{label}</span>
            </div>
            <div className={`text-[10px] font-medium opacity-60 ${active ? 'text-white' : ''}`}>{desc}</div>
        </button>
    );
}

function TerminalSim() {
    const [history, setHistory] = useState([
        { type: 'info', text: 'CodeQuest Terminal v1.0.4' },
        { type: 'info', text: 'Type "help" for a list of available commands.' },
    ]);
    const [input, setInput] = useState('');
    const scrollRef = useRef();

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [history]);

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.trim().toLowerCase();
            const newHistory = [...history, { type: 'input', text: `> ${input}` }];

            switch (cmd) {
                case 'help':
                    newHistory.push({ type: 'output', text: 'Available commands: ls, cd, clear, whoami, hack' });
                    break;
                case 'ls':
                    newHistory.push({ type: 'output', text: 'drwxr-xr-x  projects\n-rw-r--r--  readme.md\n-rw-r--r--  secret.txt' });
                    break;
                case 'whoami':
                    newHistory.push({ type: 'output', text: 'recruit@codequest.dev' });
                    break;
                case 'clear':
                    setHistory([]);
                    setInput('');
                    return;
                case 'hack':
                    newHistory.push({ type: 'output', text: 'Accessing mainframes...\n[##########] 100%\nAccess Granted. (Just kidding, keep studying!)' });
                    break;
                case '':
                    break;
                default:
                    newHistory.push({ type: 'error', text: `Command not found: ${cmd}` });
            }

            setHistory(newHistory);
            setInput('');
        }
    };

    return (
        <div className="flex-1 bg-black p-6 font-mono text-sm overflow-hidden flex flex-col">
            <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-1 mb-4">
                {history.map((line, i) => (
                    <div key={i} className={`whitespace-pre-wrap ${line.type === 'input' ? 'text-white font-bold' :
                            line.type === 'error' ? 'text-rose-400' :
                                line.type === 'info' ? 'text-indigo-400' : 'text-emerald-400'
                        }`}>
                        {line.text}
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-2">
                <span className="text-indigo-400 font-bold">recruit@codequest:~$</span>
                <input
                    autoFocus
                    className="bg-transparent border-none outline-none text-white flex-1"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleCommand}
                />
            </div>
        </div>
    );
}

function GitSim() {
    const [step, setStep] = useState(0);
    const steps = [
        { title: "Stage Changes", desc: "Select which files you want to include in your next snapshot.", cmd: "git add ." },
        { title: "Commit", desc: "Create a permanent record of the changes with a message.", cmd: "git commit -m 'initial version'" },
        { title: "Push", desc: "Send your code to the cloud for everyone to see.", cmd: "git push origin main" }
    ];

    return (
        <div className="flex-1 bg-slate-900 p-8 flex flex-col items-center justify-center">
            <div className="w-full max-w-xl space-y-8">
                <div className="text-center">
                    <h3 className="text-2xl font-bold font-heading mb-2">Visual Git Lab</h3>
                    <p className="text-text-muted">Master the flow of professional collaboration.</p>
                </div>

                <div className="flex justify-between relative px-2">
                    {/* Progress Line */}
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2 z-0" />
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(step / 2) * 100}%` }}
                        className="absolute top-1/2 left-0 h-0.5 bg-indigo-500 -translate-y-1/2 z-0"
                    />

                    {[0, 1, 2].map((i) => (
                        <div key={i} className="relative z-10 flex flex-col items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all ${i <= step ? 'bg-indigo-600 border-indigo-400' : 'bg-slate-800 border-white/10 text-white/40'
                                }`}>
                                {i < step ? <CheckCircle size={14} /> : i + 1}
                            </div>
                        </div>
                    ))}
                </div>

                <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-6 bg-white/2 border-white/5 text-center"
                >
                    <h4 className="text-lg font-bold mb-2">{steps[step].title}</h4>
                    <p className="text-sm text-text-muted mb-6">{steps[step].desc}</p>
                    <div className="bg-black p-3 rounded-xl font-mono text-indigo-400 text-sm mb-6">
                        $ {steps[step].cmd}
                    </div>
                    <button
                        onClick={() => setStep((s) => (s + 1) % 3)}
                        className="px-8 py-3 bg-white text-slate-950 rounded-xl font-black text-sm uppercase tracking-wider hover:bg-indigo-400 hover:text-white transition-all shadow-xl shadow-white/5"
                    >
                        {step === 2 ? 'Restart Lab' : 'Execute Command'}
                    </button>
                </motion.div>
            </div>
        </div>
    );
}

function CheckCircle({ size }) {
    return <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white"><ChevronRight size={size} /></div>;
}

function InspectorSim() {
    return (
        <div className="flex-1 bg-slate-900 p-8 flex items-center justify-center text-center">
            <div className="max-w-md space-y-6">
                <div className="w-32 h-32 bg-amber-500/10 rounded-full border border-amber-500/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Search size={48} className="text-amber-400" />
                </div>
                <h3 className="text-2xl font-bold font-heading">DOM Inspector Coming Soon</h3>
                <p className="text-text-muted">
                    Soon you'll be able to click on any element on the screen to see its secret code and CSS properties.
                </p>
                <div className="flex gap-2 justify-center">
                    <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[10px] font-black uppercase text-text-muted">WIP</div>
                    <div className="px-3 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20 text-[10px] font-black uppercase text-indigo-400">Experimental</div>
                </div>
            </div>
        </div>
    );
}
