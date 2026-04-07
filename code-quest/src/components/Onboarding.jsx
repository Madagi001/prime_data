import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Send, Sparkles, Terminal } from 'lucide-react';

export default function Onboarding({ onFinish }) {
    const [name, setName] = useState("");
    const [step, setStep] = useState(1);

    return (
        <div className="fixed inset-0 z-[200] bg-slate-950 flex items-center justify-center p-6 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 opacity-40">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-500/20 blur-[150px] rounded-full" />
            </div>

            <AnimatePresence mode="wait">
                {step === 1 ? (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="max-w-xl w-full text-center space-y-8 relative"
                    >
                        <div className="w-24 h-24 bg-indigo-600 rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-indigo-500/40 transform -rotate-12">
                            <Rocket size={48} className="text-white fill-white" />
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-5xl font-black font-heading leading-tight">
                                Welcome, <span className="text-indigo-400">Candidate.</span> 🛰️
                            </h1>
                            <p className="text-xl text-text-muted leading-relaxed">
                                The digital infrastructure of 2026 is failing. We are looking for high-capacity engineers, system architects, and data pioneers to rebuild the global stack.
                            </p>
                        </div>

                        <button
                            onClick={() => setStep(2)}
                            className="px-12 py-4 bg-white text-slate-950 rounded-2xl font-black text-xl hover:bg-primary hover:text-white transition-all shadow-xl shadow-white/10"
                        >
                            INITIALIZE PROTOCOL
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="max-w-md w-full glass-card p-10 space-y-8 border-indigo-500/30 shadow-2xl shadow-indigo-500/10"
                    >
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-indigo-400 text-sm font-black uppercase tracking-widest">
                                <Terminal size={16} /> Identity Verification
                            </div>
                            <h2 className="text-3xl font-bold font-heading">Prove you exist.</h2>
                            <p className="text-text-muted">Enter your handle to claim your first badge.</p>
                        </div>

                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Enter Your Name..."
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-slate-900/50 border-2 border-white/10 rounded-2xl px-6 py-4 text-xl font-bold outline-none focus:border-indigo-500 transition-colors"
                            />

                            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                                        <Sparkles className="text-emerald-400" size={20} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-emerald-400">Junior Coder Badge</div>
                                        <div className="text-xs opacity-60">+10 XP Reward</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            disabled={!name}
                            onClick={() => onFinish(name)}
                            className="w-full py-5 bg-indigo-600 border-b-4 border-indigo-800 rounded-2xl font-black text-xl flex items-center justify-center gap-3 active:border-b-0 active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send size={24} />
                            CLAIM REWARDS
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
