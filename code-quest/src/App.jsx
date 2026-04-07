import React, { useState } from 'react';
import Layout from './components/Layout';
import WorldMap from './components/WorldMap';
import Dashboard from './components/Dashboard';
import QuestLog from './components/QuestLog';
import CodeWorkspace from './components/CodeWorkspace';
import Onboarding from './components/Onboarding';
import Auth from './components/Auth';
import Toolbox from './components/Toolbox';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [user, setUser] = useState(null);
  const [onboarded, setOnboarded] = useState(false);
  const [stats, setStats] = useState({
    xp: 250,
    streak: 3,
    level: 1,
    badges: []
  });

  const [currentView, setCurrentView] = useState('dashboard'); // dashboard, map, workspace
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [isToolboxOpen, setIsToolboxOpen] = useState(false);

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setIsLogOpen(true);
  };

  const handleStartQuest = () => {
    setIsLogOpen(false);
    setCurrentView('workspace');
  };

  const handleCompleteQuest = (code) => {
    setStats(prev => ({
      ...prev,
      xp: prev.xp + 150,
      level: prev.xp + 150 >= 1000 ? prev.level + 1 : prev.level
    }));
    setCurrentView('dashboard');
  };

  if (!user) {
    return <Auth onLogin={(u) => setUser(u)} />;
  }

  if (!onboarded) {
    return <Onboarding onFinish={(name) => {
      setUser(prev => ({ ...prev, name }));
      setOnboarded(true);
    }} />;
  }

  return (
    <Layout
      user={user}
      stats={stats}
      activeView={currentView}
      onViewChange={(v) => setCurrentView(v)}
    >
      <AnimatePresence mode="wait">
        {currentView === 'dashboard' && (
          <Dashboard
            onStartLevel={handleLevelSelect}
            onOpenToolbox={() => setIsToolboxOpen(true)}
          />
        )}

        {currentView === 'map' && (
          <WorldMap onSelectLevel={handleLevelSelect} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isToolboxOpen && (
          <Toolbox onClose={() => setIsToolboxOpen(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLogOpen && (
          <QuestLog
            level={selectedLevel}
            onClose={() => setIsLogOpen(false)}
            onStart={handleStartQuest}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {currentView === 'workspace' && (
          <div className="fixed inset-0 z-50 pt-[80px]">
            <CodeWorkspace
              level={selectedLevel}
              onBack={() => setCurrentView('dashboard')}
              onComplete={handleCompleteQuest}
            />
          </div>
        )}
      </AnimatePresence>
    </Layout>
  );
}

export default App;
