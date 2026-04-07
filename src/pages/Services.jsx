import React, { useState } from 'react';
import { mockData } from '../mockData';
import * as LucideIcons from 'lucide-react';
import ServiceFormModal from '../components/ServiceFormModal';

const Services = () => {
    const { categories } = mockData;
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [activeService, setActiveService] = useState('');

    const toggleCategory = (id) => {
        setExpandedCategory(expandedCategory === id ? null : id);
    };

    const openForm = (serviceName) => {
        setActiveService(serviceName);
        setModalOpen(true);
    };

    return (
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
            <h1 className="animate-fade-in" style={{ fontSize: '1.5rem', fontWeight: '700', margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>All Services</h1>

            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', animationDelay: '0.1s' }}>
                {categories.map((cat) => {
                    const CategoryIcon = LucideIcons[cat.icon] || LucideIcons.Layers;
                    const isExpanded = expandedCategory === cat.id;

                    return (
                        <div key={cat.id} className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                            <div
                                onClick={() => toggleCategory(cat.id)}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem', cursor: 'pointer',
                                    background: isExpanded ? 'rgba(255,255,255,0.03)' : 'transparent', transition: 'background 0.2s'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{
                                        width: '48px', height: '48px', borderRadius: '12px',
                                        backgroundColor: 'var(--glass-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        border: '1px solid var(--glass-border)',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                                    }}>
                                        <CategoryIcon size={24} color={cat.color} />
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1.0625rem', fontWeight: '600', margin: '0 0 0.25rem 0' }}>{cat.name}</h3>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>{cat.desc}</p>
                                    </div>
                                </div>
                                <LucideIcons.ChevronDown size={20} color="var(--text-secondary)" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }} />
                            </div>

                            {/* Expanded Content */}
                            {isExpanded && (
                                <div style={{
                                    padding: '0 1.25rem 1.25rem 1.25rem',
                                    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem',
                                    borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.25rem',
                                    animation: 'slideDown 0.3s ease-out forwards'
                                }}>
                                    {cat.services.map(sub => {
                                        const SubIcon = LucideIcons[sub.icon] || LucideIcons.Zap;
                                        return (
                                            <div key={sub.id} onClick={() => openForm(sub.name)} style={{
                                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', position: 'relative'
                                            }}>
                                                <div style={{
                                                    width: '44px', height: '44px', borderRadius: '12px',
                                                    backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s'
                                                }}
                                                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                                >
                                                    <SubIcon size={20} color={sub.color} />
                                                </div>
                                                <span style={{ fontSize: '0.75rem', color: 'var(--text-primary)', textAlign: 'center', fontWeight: '500', lineHeight: 1.2 }}>
                                                    {sub.name}
                                                </span>
                                                {sub.badge && (
                                                    <span style={{ position: 'absolute', top: '-5px', right: '0', background: 'var(--danger)', color: 'white', fontSize: '0.5rem', padding: '2px 4px', borderRadius: '4px', fontWeight: 'bold' }}>{sub.badge}</span>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}} />

            <ServiceFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} serviceName={activeService} />
        </div>
    );
};

export default Services;
