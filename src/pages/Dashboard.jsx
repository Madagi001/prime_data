import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockData } from '../mockData';
import WalletCard from '../components/WalletCard';
import TopCategories from '../components/TopCategories';
import TransactionList from '../components/TransactionList';
import ServiceFormModal from '../components/ServiceFormModal';
import { Bell } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();
    const { categories, transactions } = mockData;
    const [modalOpen, setModalOpen] = useState(false);
    const [activeService, setActiveService] = useState('');

    const openForm = (serviceName) => {
        setActiveService(serviceName);
        setModalOpen(true);
    };

    // Defaults for uninitialized mock users
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

            {/* Main Content Area */}
            <div style={{ padding: '0 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                <WalletCard balance={walletBalance} commission={commission} onAction={openForm} />
                <TopCategories categories={categories} />
                <TransactionList transactions={transactions} />
            </div>

            <ServiceFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} serviceName={activeService} />
        </div>
    );
};
export default Dashboard;
