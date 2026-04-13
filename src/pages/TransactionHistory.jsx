import React, { useState } from 'react';
import { mockData } from '../mockData';
import { ArrowDownLeft, ArrowUpRight, Search, Filter } from 'lucide-react';

const statusColor = { Successful: '#10B981', Pending: '#F59E0B', Failed: '#EF4444' };

const TransactionHistory = () => {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');

    // Merge mock data with any localStorage transactions
    const stored = JSON.parse(localStorage.getItem('vtu_transactions') || '[]');
    const staticTx = mockData.transactions.map(t => ({
        id: t.id,
        service: t.type,
        desc: t.desc,
        amount: t.amount,
        status: t.status,
        date: t.date,
        isCredit: t.isCredit,
        userEmail: ''
    }));

    const all = [
        ...stored,
        ...staticTx.filter(s => !stored.some(st => st.id === s.id))
    ];

    const filters = ['All', 'Successful', 'Pending', 'Failed'];

    const filtered = all.filter(tx => {
        const matchFilter = filter === 'All' || tx.status === filter;
        const matchSearch = !search ||
            (tx.service || '').toLowerCase().includes(search.toLowerCase()) ||
            (tx.desc || '').toLowerCase().includes(search.toLowerCase()) ||
            (tx.network || '').toLowerCase().includes(search.toLowerCase());
        return matchFilter && matchSearch;
    });

    const formatDate = (dateStr) => {
        try {
            if (dateStr.includes('Today') || dateStr.includes('Yesterday') || dateStr.includes('Mar')) return dateStr;
            return new Date(dateStr).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
        } catch { return dateStr; }
    };

    return (
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>
            <h1 className="animate-fade-in" style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0, color: 'var(--text-primary)' }}>
                Transaction History
            </h1>

            {/* Search */}
            <div className="animate-fade-in" style={{ position: 'relative', animationDelay: '0.05s' }}>
                <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                    type="text"
                    placeholder="Search transactions..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{
                        width: '100%', padding: '0.875rem 1rem 0.875rem 2.75rem',
                        borderRadius: '12px', background: 'var(--glass-bg)',
                        border: '1px solid var(--glass-border)', color: 'var(--text-primary)',
                        outline: 'none', fontSize: '0.9rem', fontFamily: 'inherit',
                        boxSizing: 'border-box'
                    }}
                />
            </div>

            {/* Filter Pills */}
            <div className="animate-fade-in" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', animationDelay: '0.1s' }}>
                {filters.map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        style={{
                            padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600',
                            fontFamily: 'inherit', cursor: 'pointer', transition: 'all 0.2s',
                            background: filter === f ? 'var(--accent-green)' : 'var(--glass-bg)',
                            border: `1px solid ${filter === f ? 'var(--accent-green)' : 'var(--glass-border)'}`,
                            color: filter === f ? 'white' : 'var(--text-secondary)',
                            boxShadow: filter === f ? '0 2px 10px rgba(16,185,129,0.3)' : 'none'
                        }}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Transaction List */}
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', animationDelay: '0.15s' }}>
                {filtered.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-secondary)' }}>
                        <p style={{ fontSize: '2.5rem', margin: '0 0 0.75rem' }}>📭</p>
                        <p style={{ margin: 0, fontSize: '0.9375rem', fontWeight: '500' }}>No transactions found</p>
                        <p style={{ margin: '0.25rem 0 0', fontSize: '0.8125rem' }}>Try adjusting your search or filter</p>
                    </div>
                ) : filtered.map((tx, idx) => {
                    const isCredit = tx.isCredit === true;
                    const sColor = statusColor[tx.status] || '#9CA3AF';
                    return (
                        <div key={tx.id || idx} className="glass-card" style={{
                            padding: '1rem 1.125rem', display: 'flex', alignItems: 'center',
                            gap: '0.875rem', borderRadius: '14px'
                        }}>
                            {/* Icon */}
                            <div style={{
                                width: '42px', height: '42px', borderRadius: '12px', flexShrink: 0,
                                background: isCredit ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.1)',
                                border: `1px solid ${isCredit ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.15)'}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                {isCredit
                                    ? <ArrowDownLeft size={20} color="#10B981" />
                                    : <ArrowUpRight size={20} color="#EF4444" />}
                            </div>

                            {/* Info */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ margin: '0 0 0.2rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {tx.service || tx.type || 'Transaction'}
                                </p>
                                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {tx.desc || tx.network || tx.phone || '—'} · {formatDate(tx.date)}
                                </p>
                            </div>

                            {/* Amount + Status */}
                            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                <p style={{ margin: '0 0 0.2rem', fontSize: '0.9375rem', fontWeight: '700', color: isCredit ? '#10B981' : 'var(--text-primary)' }}>
                                    {isCredit ? '+' : '-'}₦{Number(tx.amount).toLocaleString()}
                                </p>
                                <span style={{
                                    fontSize: '0.6875rem', fontWeight: '600', padding: '2px 8px',
                                    borderRadius: '6px', background: `${sColor}18`, color: sColor
                                }}>
                                    {tx.status}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {filtered.length > 0 && (
                <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.5rem 0 1rem' }}>
                    Showing {filtered.length} transaction{filtered.length !== 1 ? 's' : ''}
                </p>
            )}
        </div>
    );
};

export default TransactionHistory;
