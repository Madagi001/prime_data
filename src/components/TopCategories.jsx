import React from 'react';
import * as LucideIcons from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TopCategories = ({ categories }) => {
    const navigate = useNavigate();
    // Only take the first 4 for the quick dashboard layout
    const topCategories = categories.slice(0, 4);

    return (
        <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.0625rem', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>Quick Actions</h3>
                <button onClick={() => navigate('/services')} style={{ background: 'none', border: 'none', color: 'var(--accent-green)', fontSize: '0.875rem', fontWeight: '600', cursor: 'pointer', padding: 0 }}>View All</button>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1rem',
            }}>
                {topCategories.map((cat) => {
                    const Icon = LucideIcons[cat.icon] || LucideIcons.HelpCircle;
                    return (
                        <div key={cat.id} onClick={() => navigate('/services')} style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'
                        }}>
                            <div style={{
                                width: '56px', height: '56px', borderRadius: '16px',
                                backgroundColor: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'transform 0.2s',
                                cursor: 'pointer'
                            }}
                                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <Icon size={24} color={cat.color} />
                            </div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-primary)', textAlign: 'center', fontWeight: '500' }}>
                                {cat.name}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TopCategories;
