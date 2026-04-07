import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, Clock, Play, Star, Sparkles, Layout as LayoutIcon, Code2, Cpu, GitBranch } from 'lucide-react';

const MODULES = [
    {
        title: "Engineering Fundamentals",
        description: "Master the essential toolchain and core principles of modern software development.",
        isTools: true,
        parts: [
            { id: 't1', title: "The Shell (Standard Streams)", duration: "5 mins", status: "current", type: "tool", icon: <Code2 size={18} /> },
            { id: 't2', title: "Distributed Version Control (Git)", duration: "10 mins", status: "locked", type: "tool", icon: <GitBranch size={18} /> }
        ]
    },
    {
        title: "Architectural Systems",
        description: "Build robust, semantic structural foundations and professional design systems.",
        parts: [
            { id: 'l1', title: "Semantic Core (HTML5)", duration: "10 mins", status: "completed", type: "html", icon: <LayoutIcon size={18} /> },
            { id: 'l2', title: "External Integration (Links)", duration: "15 mins", status: "current", type: "html", icon: <CheckCircle2 size={18} /> },
            { id: 'l3', title: "Design Systems (CSS3)", duration: "20 mins", status: "locked", type: "css", icon: <Star size={18} /> }
        ]
    },
];

export default function Dashboard({ onStartLevel, onOpenToolbox }) {
    return (
        <div className="max-w-5xl mx-auto py-12 px-6">
            <div className="mb-12">
                <h2 className="text-4xl font-black font-heading mb-4">Curriculum</h2>
                <p className="text-xl text-text-muted max-w-2xl">
                    Follow our path from absolute beginner to master developer. Inspired by world-class coding bootcamps.
                </p>
            </div>

            <div className="space-y-12">
                {MODULES.map((module, idx) => (
                    <section key={idx} className="relative">
                        <div className="flex items-start gap-6">
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-white/10 flex items-center justify-center text-indigo-400 font-bold">
                                    {idx + 1}
                                </div>
                                {idx !== MODULES.length - 1 && <div className="w-0.5 h-full bg-white/5 my-4" />}
                            </div>

                            <div className="flex-1 space-y-6">
                                <div>
                                    <h3 className="text-2xl font-bold font-heading">{module.title}</h3>
                                    <p className="text-text-muted mt-1">{module.description}</p>
                                </div>

                                <div className="grid gap-4">
                                    {module.parts.map((part) => (
                                        <motion.div
                                            key={part.id}
                                            whileHover={{ scale: 1.01, x: 5 }}
                                            className={`group flex items-center justify-between p-5 rounded-2xl border transition-all ${part.status === 'current'
                                                ? 'bg-white/5 border-indigo-500/50 shadow-lg shadow-indigo-500/5'
                                                : part.status === 'completed'
                                                    ? 'bg-emerald-500/5 border-emerald-500/20'
                                                    : 'bg-white/2 border-white/5 opacity-60'
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`p-3 rounded-xl ${part.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-text-muted'
                                                    }`}>
                                                    {part.icon}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-lg">{part.title}</h4>
                                                    <span className="text-xs font-bold text-text-muted flex items-center gap-1.5 uppercase tracking-wider">
                                                        <Clock size={12} /> {part.duration}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                {part.status === 'completed' ? (
                                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase">
                                                        <CheckCircle2 size={14} /> Completed
                                                    </div>
                                                ) : part.status === 'current' ? (
                                                    <button
                                                        onClick={() => part.type === 'tool' ? onOpenToolbox() : onStartLevel(part)}
                                                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-lg shadow-indigo-600/20"
                                                    >
                                                        <Play size={16} fill="currentColor" /> {part.status === 'current' ? 'Resume' : 'Start'}
                                                    </button>
                                                ) : (
                                                    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-text-muted text-xs font-black uppercase">
                                                        Locked
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}
