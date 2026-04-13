import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockData } from '../mockData';
import WalletCard from '../components/WalletCard';
import TransactionList from '../components/TransactionList';
import ServiceFormModal from '../components/ServiceFormModal';
import { Bell, ChevronDown } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();
    const { categories, transactions } = mockData;
    const [modalOpen, setModalOpen] = useState(false);
    const [activeService, setActiveService] = useState('');
    const [expandedCategory, setExpandedCategory] = useState(null);

    const openForm = (serviceName) => {
        setActiveService(serviceName);
        setModalOpen(true);
    };

    const toggleCategory = (id) => {
        setExpandedCategory(expandedCategory === id ? null : id);
    };

    const walletBalance = 0.00;
    const commission = 0.00;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            {/* Header */}
            <header className="animate-fade-in" style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '1.5rem 1.75rem 1.25rem 1.75rem'
            }}>
                <div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: '0 0 0.25rem 0' }}>Good Morning,</p>
                    <h1 style={{ fontSize: '1.375rem', fontWeight: '700', margin: 0 }}>{user?.name || 'User'} 👋</h1>
                </div>
                <div style={{
                    width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'var(--glass-bg)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--glass-border)',
                    position: 'relative', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }}>
                    <Bell size={20} color="var(--text-primary)" />
                    <span style={{ position: 'absolute', top: '12px', right: '12px', width: '8px', height: '8px', backgroundColor: 'var(--danger)', borderRadius: '50%', border: '2px solid var(--bg-primary)' }}></span>
                </div>
            </header>

            {/* Main Content */}
            <div style={{ padding: '0 1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                <WalletCard balance={walletBalance} commission={commission} onAction={openForm} />

                {/* All Services — Always Visible Grid */}
                <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 0 1.25rem 0' }}>
                        <h3 style={{ fontSize: '1.0625rem', fontWeight: '600', margin: 0, color: 'var(--text-primary)' }}>Services</h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                        {categories.filter(c => !['Wallet', 'Rewards', 'Support'].includes(c.name)).map((cat) => {
                            return (
                                <div key={cat.id} className="glass-card" style={{ padding: '0.875rem 1rem', borderRadius: '14px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                        {React.createElement(LucideIcons[cat.icon] || LucideIcons.Layers, { size: 14, color: cat.color })}
                                        <h4 style={{ fontSize: '0.8125rem', fontWeight: '600', margin: 0, color: 'var(--text-secondary)' }}>{cat.name}</h4>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.6rem' }}>
                                        {cat.services.map(sub => {
                                            const SubIcon = LucideIcons[sub.icon] || LucideIcons.Zap;
                                            return (
                                                <div key={sub.id} onClick={() => openForm(sub.name)} style={{
                                                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                                                    gap: '0.4rem', cursor: 'pointer', position: 'relative'
                                                }}>
                                                    <div style={{
                                                        width: '40px', height: '40px', borderRadius: '11px',
                                                        backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s',
                                                        boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
                                                    }}
                                                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.08)'}
                                                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                                    >
                                                        <SubIcon size={18} color={sub.color} />
                                                    </div>
                                                    <span style={{ fontSize: '0.65rem', color: 'var(--text-primary)', textAlign: 'center', fontWeight: '500', lineHeight: 1.2 }}>
                                                        {sub.name}
                                                    </span>
                                                    {sub.badge && (
                                                        <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: 'var(--danger)', color: 'white', fontSize: '0.45rem', padding: '1px 3px', borderRadius: '4px', fontWeight: 'bold' }}>{sub.badge}</span>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Recent Transactions */}
                <TransactionList transactions={transactions} />
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            ` }} />

            <ServiceFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} serviceName={activeService} />
        </div>
    );
};
export default Dashboard;
