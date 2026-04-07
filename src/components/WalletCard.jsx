import React from 'react';
import { PlusCircle, Send } from 'lucide-react';

const WalletCard = ({ balance, commission, onAction }) => {
    const formatNaira = (amount) => {
        return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
    };

    return (
        <div className="animate-fade-in" style={{
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            borderRadius: '24px',
            padding: '1.5rem',
            color: 'white',
            boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Decorative background element */}
            <div style={{
                position: 'absolute', right: '-10%', top: '-20%', width: '150px', height: '150px',
                background: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(20px)'
            }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
                <div>
                    <p style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.25rem' }}>Wallet Balance</p>
                    <h2 style={{ fontSize: '2.25rem', fontWeight: '700', margin: 0 }}>{formatNaira(balance)}</h2>
                    <p style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '0.25rem' }}>Commission: {formatNaira(commission)}</p>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', position: 'relative', zIndex: 1 }}>
                <button onClick={() => onAction('Fund Wallet')} style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)',
                    color: 'white', padding: '0.875rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '600', backdropFilter: 'blur(4px)', cursor: 'pointer', fontFamily: 'inherit'
                }}>
                    <PlusCircle size={18} /> Fund Wallet
                </button>
                <button onClick={() => onAction('Transfer Funds')} style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white', padding: '0.875rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '600', backdropFilter: 'blur(4px)', cursor: 'pointer', fontFamily: 'inherit'
                }}>
                    <Send size={18} /> Transfer
                </button>
            </div>
        </div>
    );
};

export default WalletCard;
