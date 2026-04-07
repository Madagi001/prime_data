import React from 'react';
import { motion } from 'framer-motion';
import { X, Play, Sword, Zap, BookOpen } from 'lucide-react';

export default function QuestLog({ level, onClose, onStart }) {
    if (!level) return null;

    const isBoss = level.type === 'boss';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className={`relative w-full max-w-2xl glass-card overflow-hidden border-2 
          ${isBoss ? 'border-rose-500/30' : 'border-indigo-500/30'}`}
            >
                {/* Header Decor */}
                <div className={`h-24 w-full flex items-center px-8 relative
          ${isBoss ? 'bg-rose-500/10' : 'bg-indigo-500/10'}`}>
                    <div className="flex-1">
                        <div className="text-xs font-black uppercase tracking-[0.2em] opacity-60">
                            Technical Briefing: Level {level.id}
                        </div>
                        <h2 className="text-3xl font-bold font-heading">{level.title}</h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-8 grid grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <section>
                            <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-text-muted mb-3">
                                <BookOpen size={16} /> Technical Objective
                            </h4>
                            <p className="text-lg leading-relaxed">
                                {isBoss
                                    ? "This is a comprehensive production mission. Apply all learned methodologies to build a verified architectural system."
                                    : "Every distributed system requires a stable core. Your mission is to implement the primary structural layer of this system."}
                            </p>
                        </section>

                        <section>
                            <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-text-muted mb-3">
                                <Zap size={16} /> Tech Mastery
                            </h4>
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-primary/20 border border-white/10">
                                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                                    <Sword size={24} />
                                </div>
                                <div>
                                    <div className="font-bold text-primary">Requirement: {level.type.toUpperCase()}</div>
                                    <div className="text-sm opacity-60">Master the core syntax and semantics.</div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="space-y-6">
                        <section>
                            <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-text-muted mb-3">
                                Verification Rewards
                            </h4>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                                    <span className="font-medium text-emerald-400 text-sm">Experience Points</span>
                                    <span className="font-black text-emerald-400">+150 XP</span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                                    <span className="font-medium text-amber-400 text-sm">Badge</span>
                                    <span className="font-black text-amber-400">Builder</span>
                                </div>
                            </div>
                        </section>

                        <button
                            onClick={onStart}
                            className={`w-full py-4 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all
                ${isBoss
                                    ? 'bg-rose-500 hover:bg-rose-600 shadow-xl shadow-rose-500/20'
                                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-500/20'}`}
                        >
                            <Play fill="currentColor" size={20} />
                            START QUEST
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
