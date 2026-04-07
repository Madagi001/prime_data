import React from 'react';

const Pricing = () => (
    <div style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
        <h1 className="animate-fade-in" style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Pricing & Plans</h1>
        <div className="glass-card animate-fade-in" style={{ padding: '1.5rem', animationDelay: '0.1s' }}>
            <p style={{ color: 'var(--text-secondary)' }}>Current active data and airtime rates will be displayed here.</p>
        </div>
    </div>
);
export default Pricing;
