import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Lock, CheckCircle2, Star, Sparkles } from 'lucide-react';

const WORLDS = [
    {
        id: 1,
        name: "Architectural Systems",
        color: "var(--world-1)",
        glow: "var(--world-1-glow)",
        image: "/src/assets/world_1.png",
        description: "Master the structural foundations of professional web engineering.",
        levels: [
            { id: 1, title: "The Foundation", type: "html", unlocked: true, completed: true },
            { id: 2, title: "The Portal", type: "html", unlocked: true, completed: false },
            { id: 3, title: "The Chameleon", type: "css", unlocked: false, completed: false },
            { id: 4, title: "The Interior Designer", type: "css", unlocked: false, completed: false },
            { id: 5, title: "FINAL MISSION: Hero Profile", type: "boss", unlocked: false, completed: false },
        ]
    },
    {
        id: 2,
        name: "Logic & Algorithms",
        color: "var(--world-2)",
        glow: "var(--world-2-glow)",
        image: "/src/assets/world_2.png",
        description: "Implement complex behavioral logic using JavaScript.",
        levels: []
    },
    {
        id: 3,
        name: "The Data Explorer",
        color: "var(--world-3)",
        glow: "var(--world-3-glow)",
        image: "/src/assets/world_3.png",
        description: "Talk to the computer's brain (Python).",
        levels: []
    },
    {
        id: 4,
        name: "The AI Master",
        color: "var(--world-4)",
        glow: "var(--world-4-glow)",
        image: "/src/assets/world_4.png",
        description: "Teach the computer to learn (ML/AI).",
        levels: []
    }
];

export default function WorldMap({ onSelectLevel }) {
    const [activeWorld, setActiveWorld] = useState(1);

    return (
        <div className="w-full h-[calc(100vh-80px)] overflow-hidden relative p-8">
            {/* World Background Decoration */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto h-full grid grid-cols-12 gap-8 relative z-10">
                {/* World Selection Sidebar */}
                <div className="col-span-3 flex flex-col gap-4">
                    <h2 className="text-2xl font-bold font-heading mb-4">Your Quest Map</h2>
                    {WORLDS.map((world) => (
                        <button
                            key={world.id}
                            onClick={() => setActiveWorld(world.id)}
                            className={`p - 4 rounded - 2xl border transition - all duration - 300 text - left group
                ${activeWorld === world.id
                                    ? 'bg-white/10 border-white/20 shadow-xl'
                                    : 'bg-white/5 border-white/5 opacity-60 hover:opacity-100'
                                } `}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-8 rounded-full" style={{ backgroundColor: world.color }} />
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-text-muted group-hover:text-white/60 transition-colors">
                                        World {world.id}
                                    </div>
                                    <div className="font-bold text-lg">{world.name}</div>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Visual Map Area */}
                <div className="col-span-9 glass-card border-white/10 overflow-hidden relative flex flex-col">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeWorld}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex-1 relative flex items-center justify-center"
                        >
                            {/* World Identity */}
                            <div className="absolute top-8 left-8">
                                <h3 className="text-3xl font-extrabold font-heading" style={{ color: WORLDS[activeWorld - 1].color }}>
                                    {WORLDS[activeWorld - 1].name}
                                </h3>
                                <p className="text-text-muted mt-2 max-w-md">{WORLDS[activeWorld - 1].description}</p>
                            </div>

                            {/* Levels Visualization */}
                            <div className="relative w-full h-full flex items-center justify-center">
                                {/* Connecting Path (Simulated) */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                                    <path d="M 200 400 Q 400 200 600 400 T 800 300" stroke="white" strokeWidth="4" fill="none" strokeDasharray="12 8" />
                                </svg>

                                {/* Level Nodes */}
                                {WORLDS[activeWorld - 1].levels.length > 0 ? (
                                    <div className="flex gap-12 relative z-20">
                                        {WORLDS[activeWorld - 1].levels.map((level, idx) => (
                                            <motion.button
                                                key={level.id}
                                                whileHover={{ scale: 1.1, translateY: -5 }}
                                                whileTap={{ scale: 0.95 }}
                                                disabled={!level.unlocked}
                                                onClick={() => onSelectLevel(level)}
                                                className={`relative w - 20 h - 20 rounded - 3xl flex items - center justify - center transition - all shadow - 2xl
                          ${level.completed
                                                        ? 'bg-emerald-500 shadow-emerald-500/40'
                                                        : level.unlocked
                                                            ? 'bg-indigo-600 shadow-indigo-500/40'
                                                            : 'bg-slate-800 border-white/5 opacity-50 cursor-not-allowed'
                                                    } `}
                                            >
                                                {level.completed ? (
                                                    <CheckCircle2 className="text-white" size={32} />
                                                ) : level.unlocked ? (
                                                    <div className="text-2xl font-black text-white">{level.id}</div>
                                                ) : (
                                                    <Lock className="text-slate-500" size={24} />
                                                )}

                                                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-bold">
                                                    {level.title}
                                                </div>

                                                {level.unlocked && !level.completed && (
                                                    <motion.div
                                                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                                                        transition={{ repeat: Infinity, duration: 2 }}
                                                        className="absolute -inset-2 rounded-3xl border-2 border-indigo-400/30"
                                                    />
                                                )}
                                            </motion.button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                                            <Lock className="text-text-muted" size={40} />
                                        </div>
                                        <p className="text-text-muted font-bold">Defeat World 1 Boss to Unlock</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
