import React from 'react';
import { Trophy, Flame, Zap, User, HelpCircle, Layout as LayoutIcon, Map as MapIcon, Users, Github, Twitter, Youtube } from 'lucide-react';

export default function Layout({ children, stats, activeView, onViewChange, user }) {
  const { xp, streak, level } = stats;

  return (
    <div className="min-h-screen flex flex-col bg-bg-darker">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onViewChange('dashboard')}>
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap className="text-white fill-white" size={24} />
            </div>
            <h1 className="text-xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              CODE QUEST
            </h1>
          </div>

          <div className="h-6 w-px bg-white/10 mx-2" />

          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => onViewChange('dashboard')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${activeView === 'dashboard' ? 'bg-white/10 text-white' : 'text-text-muted hover:text-white'}`}
            >
              <LayoutIcon size={16} /> Curriculum
            </button>
            <button
              onClick={() => onViewChange('map')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${activeView === 'map' ? 'bg-white/10 text-white' : 'text-text-muted hover:text-white'}`}
            >
              <MapIcon size={16} /> Quest Map
            </button>
            <button
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold text-text-muted hover:text-white opacity-50 cursor-not-allowed transition-all"
            >
              <Users size={16} /> Community
            </button>
          </div>
        </div>

        <div className="flex items-center gap-8">
          {/* Streak */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20">
            <Flame size={18} className="text-orange-500 fill-orange-500" />
            <span className="font-bold text-orange-500">{streak} Day Streak</span>
          </div>

          {/* XP Progress */}
          <div className="flex flex-col gap-1 w-48">
            <div className="flex justify-between text-xs font-semibold text-text-muted">
              <span>LVL {level}</span>
              <span>{xp}/1000 XP</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                style={{ width: `${(xp / 1000) * 100}%` }}
              />
            </div>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
            <HelpCircle size={18} className="text-text-muted group-hover:text-white" />
            <span className="text-sm font-semibold">Technical Mentor</span>
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-white/10 text-right">
            <div className="hidden sm:block">
              <div className="text-sm font-bold">{user?.name || "Candidate 2026"}</div>
              <div className="text-xs text-text-muted font-medium">Clearance: Level 1</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 border-2 border-white/20 p-0.5">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                <User size={20} className="text-indigo-400" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 relative">
        {children}
      </main>

      {/* Premium Footer */}
      <footer className="border-t border-white/10 bg-slate-950/50 py-12 px-6 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Zap className="text-indigo-500 fill-indigo-500" size={24} />
              <span className="text-lg font-black font-heading">CODE QUEST</span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              Empowering the next generation of web architects and data explorers through high-quality, open-education.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-text-muted">Curriculum</h4>
            <ul className="space-y-2 text-sm font-medium">
              <li className="hover:text-indigo-400 cursor-pointer">Foundations</li>
              <li className="hover:text-indigo-400 cursor-pointer">JavaScript Deep Dive</li>
              <li className="hover:text-indigo-400 cursor-pointer">Python Path</li>
              <li className="hover:text-indigo-400 cursor-pointer">AI Masterclass</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-text-muted">Community</h4>
            <ul className="space-y-2 text-sm font-medium">
              <li className="hover:text-indigo-400 cursor-pointer">Documentation</li>
              <li className="hover:text-indigo-400 cursor-pointer">Open Source</li>
              <li className="hover:text-indigo-400 cursor-pointer">Discord Community</li>
              <li className="hover:text-indigo-400 cursor-pointer">Success Stories</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-text-muted">Connect</h4>
            <div className="flex gap-4">
              <Github className="text-text-muted hover:text-white cursor-pointer" size={20} />
              <Twitter className="text-text-muted hover:text-white cursor-pointer" size={20} />
              <Youtube className="text-text-muted hover:text-white cursor-pointer" size={20} />
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/5 mt-12 pt-8 flex justify-between items-center text-xs text-text-muted font-bold">
          <div>© 2026 CODE QUEST. FORGED IN CODE.</div>
          <div className="flex gap-6 uppercase">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Cookie Settings</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
