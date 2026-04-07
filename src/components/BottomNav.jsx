import React from 'react';
import { Home, Grid, Tag, User, Headphones } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/services', label: 'Services', icon: Grid },
        { path: '/pricing', label: 'Pricing', icon: Tag },
        { path: '/support', label: 'Support', icon: Headphones },
        { path: '/profile', label: 'Profile', icon: User },
    ];

    return (
        <div style={{
            position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
            width: '100%', maxWidth: '480px',
            backgroundColor: 'rgba(10, 10, 11, 0.95)',
            backdropFilter: 'blur(10px)',
            borderTop: '1px solid var(--glass-border)',
            padding: '0.875rem 1.75rem',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            zIndex: 50
        }}>
            {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                    <div key={item.path} onClick={() => navigate(item.path)} style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem',
                        color: isActive ? 'var(--accent-green)' : 'var(--text-secondary)',
                        cursor: 'pointer', transition: 'color 0.2s'
                    }}>
                        <Icon size={24} fill={isActive && (item.label === 'Home' || item.label === 'Profile') ? 'currentColor' : 'none'} />
                        <span style={{ fontSize: '0.6875rem', fontWeight: isActive ? '600' : '500' }}>{item.label}</span>
                    </div>
                );
            })}
        </div>
    );
};
export default BottomNav;
