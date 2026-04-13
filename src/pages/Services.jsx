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

            {/* All Services — Always Visible List */}
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', animationDelay: '0.1s' }}>
                {categories.filter(c => !['Wallet', 'Rewards', 'Support'].includes(c.name)).map((cat) => {
                    const CategoryIcon = LucideIcons[cat.icon] || LucideIcons.Layers;

                    return (
                        <div key={cat.id} className="glass-card" style={{ padding: '1rem', borderRadius: '14px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.875rem' }}>
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '8px',
                                    backgroundColor: `rgba(255,255,255,0.05)`, border: `1px solid ${cat.color}44`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <CategoryIcon size={16} color={cat.color} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '0.9375rem', fontWeight: '600', margin: '0 0 0.1rem 0', color: 'var(--text-primary)' }}>{cat.name}</h3>
                                    <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', margin: 0 }}>{cat.desc}</p>
                                </div>
                            </div>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
                                {cat.services.map(sub => {
                                    const SubIcon = LucideIcons[sub.icon] || LucideIcons.Zap;
                                    return (
                                        <div key={sub.id} onClick={() => openForm(sub.name)} style={{
                                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', position: 'relative'
                                        }}>
                                            <div style={{
                                                width: '44px', height: '44px', borderRadius: '12px',
                                                backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s',
                                                boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
                                            }}
                                                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                                                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                            >
                                                <SubIcon size={20} color={sub.color} />
                                            </div>
                                            <span style={{ fontSize: '0.65rem', color: 'var(--text-primary)', textAlign: 'center', fontWeight: '500', lineHeight: 1.2 }}>
                                                {sub.name}
                                            </span>
                                            {sub.badge && (
                                                <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: 'var(--danger)', color: 'white', fontSize: '0.45rem', padding: '1px 3px', borderRadius: '4px', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(244,63,94,0.4)' }}>{sub.badge}</span>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
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
