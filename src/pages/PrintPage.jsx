import React, { useState } from 'react';
import ServiceFormModal from '../components/ServiceFormModal';
import { Printer } from 'lucide-react';

const PrintPage = () => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>
            <h1 className="animate-fade-in" style={{ fontSize: '1.5rem', fontWeight: '700', margin: '0 0 0.25rem 0', color: 'var(--text-primary)' }}>
                Print Recharge Card
            </h1>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Buy and print physical recharge cards for MTN, Airtel, Glo and 9Mobile instantly.
            </p>

            {/* Main CTA Card */}
            <div
                className="animate-fade-in glass-card"
                onClick={() => setModalOpen(true)}
                style={{
                    padding: '2rem 1.5rem',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem',
                    cursor: 'pointer', textAlign: 'center',
                    background: 'linear-gradient(135deg, rgba(244,63,94,0.12), rgba(244,63,94,0.04))',
                    border: '1px solid rgba(244,63,94,0.25)',
                    borderRadius: '20px',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    animationDelay: '0.1s'
                }}
                onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
                <div style={{
                    width: '72px', height: '72px', borderRadius: '20px',
                    background: 'rgba(244,63,94,0.15)', border: '1px solid rgba(244,63,94,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 24px rgba(244,63,94,0.2)'
                }}>
                    <Printer size={34} color="#F43F5E" />
                </div>

                <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700', margin: '0 0 0.375rem 0' }}>
                        Buy &amp; Print Cards
                    </h2>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                        Choose network, denomination and quantity — then print all PINs at once.
                    </p>
                </div>

                <button style={{
                    background: '#F43F5E', color: 'white',
                    padding: '0.875rem 2rem', borderRadius: '12px',
                    border: 'none', fontSize: '0.9375rem', fontWeight: '600',
                    cursor: 'pointer', fontFamily: 'inherit',
                    boxShadow: '0 4px 15px rgba(244,63,94,0.35)',
                    width: '100%'
                }}>
                    🖨 &nbsp;Get Started
                </button>
            </div>

            {/* Info cards */}
            <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem', animationDelay: '0.2s' }}>
                {[
                    { emoji: '📶', title: 'All Networks', desc: 'MTN, Airtel, Glo & 9Mobile' },
                    { emoji: '💳', title: 'All Denominations', desc: '₦100 to ₦5,000' },
                    { emoji: '🔢', title: 'Bulk Quantity', desc: 'Up to 50 cards at once' },
                    { emoji: '⚡', title: 'Instant PINs', desc: 'Generated immediately' },
                ].map((info, i) => (
                    <div key={i} className="glass-card" style={{ padding: '1rem', borderRadius: '14px', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                        <span style={{ fontSize: '1.5rem' }}>{info.emoji}</span>
                        <p style={{ margin: 0, fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-primary)' }}>{info.title}</p>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{info.desc}</p>
                    </div>
                ))}
            </div>

            <ServiceFormModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                serviceName="Print Recharge Card"
            />
        </div>
    );
};

export default PrintPage;
