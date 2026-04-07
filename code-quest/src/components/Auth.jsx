import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, User, ArrowRight, Github, Chrome, Zap } from 'lucide-react';

export default function Auth({ onLogin }) {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            onLogin({ email: "recruit@codequest.dev" });
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-bg-darker flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl shadow-indigo-500/20 mb-6 group">
                        <Zap className="text-white fill-white group-hover:scale-110 transition-transform" size={32} />
                    </div>
                    <h1 className="text-4xl font-black font-heading bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                        CODE QUEST
                    </h1>
                    <p className="text-text-muted mt-2 font-medium">Elevate your skills to the next dimension.</p>
                </div>

                <div className="glass-card p-8 border-white/10 shadow-2xl relative overflow-hidden">
                    <div className="flex gap-4 mb-8 p-1 bg-white/5 rounded-xl border border-white/10">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${isLogin ? 'bg-white shadow-lg text-slate-950' : 'text-text-muted hover:text-white'}`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${!isLogin ? 'bg-white shadow-lg text-slate-950' : 'text-text-muted hover:text-white'}`}
                        >
                            Sign Up
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <AnimatePresence mode="wait">
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-1"
                                >
                                    <label className="text-xs font-bold text-text-muted uppercase px-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Adept Coder"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-indigo-500 focus:bg-white/10 transition-all font-medium"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-text-muted uppercase px-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-indigo-500 focus:bg-white/10 transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-xs font-bold text-text-muted uppercase">Password</label>
                                {isLogin && <button type="button" className="text-xs font-bold text-indigo-400 hover:text-indigo-300">Forgot?</button>}
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-indigo-500 focus:bg-white/10 transition-all font-medium"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl font-black text-lg shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all mt-6 group"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    {isLogin ? 'Sign In' : 'Create Account'}
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0f172a] px-2 text-text-muted font-bold">Or continue with</span></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 py-3 border border-white/10 rounded-xl hover:bg-white/5 transition-colors font-bold text-sm">
                            <Github size={18} /> GitHub
                        </button>
                        <button className="flex items-center justify-center gap-2 py-3 border border-white/10 rounded-xl hover:bg-white/5 transition-colors font-bold text-sm">
                            <Chrome size={18} /> Google
                        </button>
                    </div>
                </div>

                <p className="text-center mt-8 text-sm text-text-muted">
                    New to the frontier? <button onClick={() => setIsLogin(false)} className="text-indigo-400 font-bold hover:underline">Join the quest.</button>
                </p>
            </motion.div>
        </div>
    );
}
