import React from 'react';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

const TransactionList = ({ transactions }) => {
    const formatNaira = (amount) => {
        return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
    };

    return (
        <div className="glass-card animate-fade-in" style={{ animationDelay: '0.2s', padding: '1.25rem', paddingBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.0625rem', fontWeight: '600', margin: 0 }}>Recent Transactions</h3>
                <span style={{ fontSize: '0.875rem', color: 'var(--accent-blue)', cursor: 'pointer', fontWeight: '500' }}>See all</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {transactions.map((txn) => (
                    <div key={txn.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                            <div style={{
                                width: '42px', height: '42px', borderRadius: '12px',
                                backgroundColor: txn.isCredit ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                {txn.isCredit ? <ArrowDownLeft size={20} color="var(--success)" /> : <ArrowUpRight size={20} color="var(--warning)" />}
                            </div>
                            <div>
                                <h4 style={{ fontSize: '0.9375rem', fontWeight: '600', margin: '0 0 0.125rem 0' }}>{txn.type}</h4>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>{txn.desc} • {txn.date}</p>
                            </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                            <h4 style={{ fontSize: '0.9375rem', fontWeight: '700', margin: '0 0 0.125rem 0', color: txn.isCredit ? 'var(--success)' : 'var(--text-primary)' }}>
                                {txn.isCredit ? '+' : '-'}{formatNaira(txn.amount)}
                            </h4>
                            <p style={{ fontSize: '0.75rem', color: txn.status === 'Successful' ? 'var(--success)' : 'var(--text-secondary)', margin: 0 }}>
                                {txn.status}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransactionList;
