import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Shield, CreditCard, Activity, Settings, Users, Database, DollarSign, RefreshCw, BarChart2, X, Loader2, Gift, Copy, Check, Palette } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ModalOverlay = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="animate-fade-in" style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 1000
        }}>
            <div style={{
                backgroundColor: 'var(--bg-secondary)', width: '100%', maxWidth: '480px',
                borderTopLeftRadius: '24px', borderTopRightRadius: '24px', padding: '2rem 1.5rem',
                borderTop: '1px solid var(--glass-border)', boxShadow: '0 -10px 40px rgba(0,0,0,0.8)',
                animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)', maxHeight: '90vh', overflowY: 'auto'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700', margin: 0 }}>{title}</h2>
                    <button type="button" onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                        <X size={24} />
                    </button>
                </div>
                {children}
            </div>
            <style dangerouslySetInnerHTML={{ __html: `@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } } @keyframes spin { 100% { transform: rotate(360deg); } }` }} />
        </div>
    );
};

const UserProfile = ({ handleAction, navigate, theme, toggleTheme }) => (
    <>
        <div className="glass-card animate-fade-in" style={{ padding: '1.25rem', marginBottom: '1.5rem', animationDelay: '0.1s' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>Account Profile</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                <div onClick={() => handleAction('Edit Personal Info')} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ background: 'var(--glass-bg)', padding: '0.5rem', borderRadius: '8px' }}><User size={20} color="var(--accent-green)" /></div>
                    <div>
                        <p style={{ margin: '0 0 0.25rem 0', fontWeight: '500', fontSize: '0.9375rem' }}>Edit Personal Information</p>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Update name, phone, email & avatar</p>
                    </div>
                </div>
                <div onClick={() => handleAction('Data Usage & Balance')} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ background: 'var(--glass-bg)', padding: '0.5rem', borderRadius: '8px' }}><Activity size={20} color="var(--warning)" /></div>
                    <div>
                        <p style={{ margin: '0 0 0.25rem 0', fontWeight: '500', fontSize: '0.9375rem' }}>Data Usage & Balance</p>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Check active plans & expiry dates</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="glass-card animate-fade-in" style={{ padding: '1.25rem', marginBottom: '1.5rem', animationDelay: '0.15s' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>Preferences</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: 'var(--glass-bg)', padding: '0.5rem', borderRadius: '8px' }}><Palette size={20} color="var(--accent-purple)" /></div>
                        <div>
                            <p style={{ margin: '0 0 0.25rem 0', fontWeight: '500', fontSize: '0.9375rem' }}>Light Mode</p>
                            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Toggle app brightness</p>
                        </div>
                    </div>
                    <div onClick={toggleTheme} style={{ width: '48px', height: '24px', background: theme === 'light' ? 'var(--accent-green)' : 'rgba(255,255,255,0.2)', borderRadius: '24px', position: 'relative', cursor: 'pointer', transition: 'background 0.3s' }}>
                        <div style={{ width: '20px', height: '20px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: theme === 'light' ? '26px' : '2px', transition: 'left 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
                    </div>
                </div>
            </div>
        </div>

        <div className="glass-card animate-fade-in" style={{ padding: '1.25rem', marginBottom: '1.5rem', animationDelay: '0.2s' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>Services & Billing</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                <div onClick={() => navigate('/services')} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ background: 'var(--glass-bg)', padding: '0.5rem', borderRadius: '8px' }}><RefreshCw size={20} color="var(--accent-blue)" /></div>
                    <div>
                        <p style={{ margin: '0 0 0.25rem 0', fontWeight: '500', fontSize: '0.9375rem' }}>Manage Subscription</p>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Renew or purchase new data plans</p>
                    </div>
                </div>
                <div onClick={() => handleAction('Payment History')} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ background: 'var(--glass-bg)', padding: '0.5rem', borderRadius: '8px' }}><CreditCard size={20} color="var(--accent-purple)" /></div>
                    <div>
                        <p style={{ margin: '0 0 0.25rem 0', fontWeight: '500', fontSize: '0.9375rem' }}>Payment History</p>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>View past transactions and receipts</p>
                    </div>
                </div>
                <div onClick={() => handleAction('Refer & Earn')} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ background: 'var(--glass-bg)', padding: '0.5rem', borderRadius: '8px' }}><Gift size={20} color="var(--accent-green)" /></div>
                    <div>
                        <p style={{ margin: '0 0 0.25rem 0', fontWeight: '500', fontSize: '0.9375rem' }}>Refer & Earn</p>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Invite friends and earn ₦500 each</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="glass-card animate-fade-in" style={{ padding: '1.25rem', marginBottom: '1.5rem', animationDelay: '0.3s' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>Security</h3>
            <div onClick={() => handleAction('Security Settings')} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ background: 'var(--glass-bg)', padding: '0.5rem', borderRadius: '8px' }}><Shield size={20} color="var(--success)" /></div>
                <div>
                    <p style={{ margin: '0 0 0.25rem 0', fontWeight: '500', fontSize: '0.9375rem' }}>Security Settings</p>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Change password, enable OTP/2FA</p>
                </div>
            </div>
        </div>
    </>
);

const AdminProfile = ({ handleAction, theme, toggleTheme }) => (
    <>
        <div style={{ marginBottom: '1rem', padding: '0.75rem', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: '12px', color: 'var(--warning)', fontSize: '0.875rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Shield size={18} /> Admin Privileges Enabled
        </div>

        <div className="glass-card animate-fade-in" style={{ padding: '1.25rem', marginBottom: '1.5rem', animationDelay: '0.15s' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>Preferences</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: 'var(--glass-bg)', padding: '0.5rem', borderRadius: '8px' }}><Palette size={20} color="var(--accent-purple)" /></div>
                        <div>
                            <p style={{ margin: '0 0 0.25rem 0', fontWeight: '500', fontSize: '0.9375rem' }}>Light Mode</p>
                            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Toggle app brightness</p>
                        </div>
                    </div>
                    <div onClick={toggleTheme} style={{ width: '48px', height: '24px', background: theme === 'light' ? 'var(--accent-green)' : 'rgba(255,255,255,0.2)', borderRadius: '24px', position: 'relative', cursor: 'pointer', transition: 'background 0.3s' }}>
                        <div style={{ width: '20px', height: '20px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: theme === 'light' ? '26px' : '2px', transition: 'left 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
                    </div>
                </div>
            </div>
        </div>

        <div className="glass-card animate-fade-in" style={{ padding: '1.25rem', marginBottom: '1.5rem', animationDelay: '0.1s' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>Operations & System</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                <div onClick={() => handleAction('Admin Account')} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ background: 'var(--glass-bg)', padding: '0.5rem', borderRadius: '8px' }}><User size={20} color="var(--accent-green)" /></div>
                    <div>
                        <p style={{ margin: '0 0 0.25rem 0', fontWeight: '500', fontSize: '0.9375rem' }}>Admin Account Management</p>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Update admin details & credentials</p>
                    </div>
                </div>
                <div onClick={() => handleAction('System Settings')} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ background: 'var(--glass-bg)', padding: '0.5rem', borderRadius: '8px' }}><Settings size={20} color="var(--text-secondary)" /></div>
                    <div>
                        <p style={{ margin: '0 0 0.25rem 0', fontWeight: '500', fontSize: '0.9375rem' }}>System Settings Control</p>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Configure app settings & permissions</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="glass-card animate-fade-in" style={{ padding: '1.25rem', marginBottom: '1.5rem', animationDelay: '0.2s' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>User & Data Management</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                <div onClick={() => handleAction('User Management')} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ background: 'var(--glass-bg)', padding: '0.5rem', borderRadius: '8px' }}><Users size={20} color="var(--accent-blue)" /></div>
                    <div>
                        <p style={{ margin: '0 0 0.25rem 0', fontWeight: '500', fontSize: '0.9375rem' }}>User Management</p>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>View, edit, suspend or delete users</p>
                    </div>
                </div>
                <div onClick={() => handleAction('User Activities')} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ background: 'var(--glass-bg)', padding: '0.5rem', borderRadius: '8px' }}><BarChart2 size={20} color="var(--accent-purple)" /></div>
                    <div>
                        <p style={{ margin: '0 0 0.25rem 0', fontWeight: '500', fontSize: '0.9375rem' }}>Monitor User Activities</p>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Track purchases, usage & logins</p>
                    </div>
                </div>
                <div onClick={() => handleAction('Manage Data Plans')} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ background: 'var(--glass-bg)', padding: '0.5rem', borderRadius: '8px' }}><Database size={20} color="var(--accent-green)" /></div>
                    <div>
                        <p style={{ margin: '0 0 0.25rem 0', fontWeight: '500', fontSize: '0.9375rem' }}>Manage Data Plans</p>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Create, update, or delete plans</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="glass-card animate-fade-in" style={{ padding: '1.25rem', marginBottom: '1.5rem', animationDelay: '0.3s' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>Financials</h3>
            <div onClick={() => handleAction('Transactions & Revenue')} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ background: 'var(--glass-bg)', padding: '0.5rem', borderRadius: '8px' }}><DollarSign size={20} color="var(--success)" /></div>
                <div>
                    <p style={{ margin: '0 0 0.25rem 0', fontWeight: '500', fontSize: '0.9375rem' }}>View Transactions & Revenue</p>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Monitor payments & financial reports</p>
                </div>
            </div>
        </div>
    </>
);

const Profile = () => {
    const { user, logout, updateUser, updateSecurity } = useAuth();
    const navigate = useNavigate();

    const isAdmin = user?.role === 'admin';

    const [editProfileOpen, setEditProfileOpen] = useState(false);
    const [securityOpen, setSecurityOpen] = useState(false);
    const [historyOpen, setHistoryOpen] = useState(false);
    const [referralOpen, setReferralOpen] = useState(false);
    const [copiedUrl, setCopiedUrl] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [theme, setTheme] = useState(localStorage.getItem('vtu_theme') || 'dark');

    const toggleTheme = () => {
        const next = theme === 'dark' ? 'light' : 'dark';
        setTheme(next);
        localStorage.setItem('vtu_theme', next);
        document.documentElement.setAttribute('data-theme', next);
        window.dispatchEvent(new Event('theme-changed'));
    };

    const [editData, setEditData] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' });
    const [securityData, setSecurityData] = useState({ 
        currentPassword: '', newPassword: '', 
        enable2FA: user?.twoFactorEnabled || false,
        biometricEnabled: user?.biometricEnabled || false,
        biometricType: user?.biometricType || 'fingerprint'
    });
    const [loading, setLoading] = useState(false);

    const handleAction = (feature) => {
        if (feature === 'Edit Personal Info') {
            setEditData({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' });
            setEditProfileOpen(true);
            return;
        }
        if (feature === 'Payment History' || feature === 'Transactions & Revenue') {
            const txs = JSON.parse(localStorage.getItem('vtu_transactions') || '[]');
            const myTxs = isAdmin && feature === 'Transactions & Revenue'
                ? txs
                : txs.filter(tx => tx.userEmail === (user?.email || 'guest@example.com'));
            setTransactions(myTxs);
            setHistoryOpen(true);
            return;
        }
        if (feature === 'Security Settings') {
            setSecurityData({ 
                currentPassword: '', newPassword: '', 
                enable2FA: user?.twoFactorEnabled || false,
                biometricEnabled: user?.biometricEnabled || false,
                biometricType: user?.biometricType || 'fingerprint'
            });
            setSecurityOpen(true);
            return;
        }
        if (feature === 'Refer & Earn') {
            setReferralOpen(true);
            return;
        }
        toast.success(`${feature} panel coming soon!`);
    };

    const copyReferral = () => {
        const url = `${window.location.origin}/signup?ref=${user?.referralCode}`;
        navigator.clipboard.writeText(url);
        setCopiedUrl(true);
        toast.success('Referral link copied!');
        setTimeout(() => setCopiedUrl(false), 2000);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // simulate API call
        setTimeout(() => {
            const res = updateUser(editData);
            setLoading(false);
            if (res.success) {
                toast.success(res.message || 'Profile updated successfully!');
                setEditProfileOpen(false);
            } else {
                toast.error(res.message || 'Failed to update profile.');
            }
        }, 1000);
    };

    const handleSecuritySubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            const res = updateSecurity(securityData.currentPassword, securityData.newPassword, securityData.enable2FA, securityData.biometricEnabled, securityData.biometricType);
            setLoading(false);
            if (res.success) {
                toast.success(res.message || 'Security settings updated!');
                setSecurityOpen(false);
            } else {
                toast.error(res.message || 'Failed to update security.');
            }
        }, 1000);
    };

    return (
        <div style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', width: '100%' }}>
            <h1 className="animate-fade-in" style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {isAdmin ? 'Admin Dashboard' : 'My Profile'}
            </h1>

            <div className="glass-card animate-fade-in" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem', animationDelay: '0.1s' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: isAdmin ? 'rgba(245, 158, 11, 0.1)' : 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid' + (isAdmin ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.2)') }}>
                    <User size={30} color={isAdmin ? 'var(--warning)' : 'var(--accent-green)'} />
                </div>
                <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '600', margin: '0 0 0.25rem 0' }}>{user?.name || 'Guest User'}</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0 }}>{user?.email || 'guest@example.com'}</p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>{user?.phone || '08000000000'} • <span style={{ color: isAdmin ? 'var(--warning)' : 'var(--text-primary)', textTransform: 'capitalize', fontWeight: '500' }}>{user?.role || 'User'}</span></p>
                </div>
            </div>

            {isAdmin ? <AdminProfile handleAction={handleAction} theme={theme} toggleTheme={toggleTheme} /> : <UserProfile handleAction={handleAction} navigate={navigate} theme={theme} toggleTheme={toggleTheme} />}

            <button className="animate-fade-in" onClick={logout} style={{ width: '100%', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '1rem', borderRadius: '12px', fontSize: '1rem', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', animationDelay: '0.4s', fontFamily: 'inherit', marginTop: '1rem' }}>
                <LogOut size={20} /> Log Out
            </button>

            <ModalOverlay isOpen={editProfileOpen} onClose={() => setEditProfileOpen(false)} title="Edit Personal Info">
                <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Full Name</label>
                        <input type="text" required value={editData.name} onChange={e => setEditData({ ...editData, name: e.target.value })} style={{ width: '100%', padding: '0.875rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', fontSize: '1rem', fontFamily: 'inherit' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Email Address</label>
                        <input type="email" required value={editData.email} onChange={e => setEditData({ ...editData, email: e.target.value })} style={{ width: '100%', padding: '0.875rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', fontSize: '1rem', fontFamily: 'inherit' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Phone Number</label>
                        <input type="tel" required value={editData.phone} onChange={e => setEditData({ ...editData, phone: e.target.value })} style={{ width: '100%', padding: '0.875rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', fontSize: '1rem', fontFamily: 'inherit' }} />
                    </div>
                    <button type="submit" disabled={loading} style={{ width: '100%', background: 'var(--accent-green)', color: 'white', padding: '1rem', borderRadius: '12px', border: 'none', fontSize: '1rem', fontWeight: '600', marginTop: '0.5rem', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {loading ? <span style={{ display: 'flex', alignItems: 'center', animation: 'spin 1s linear infinite' }}><Loader2 size={20} /></span> : 'Save Changes'}
                    </button>
                </form>
            </ModalOverlay>

            <ModalOverlay isOpen={securityOpen} onClose={() => setSecurityOpen(false)} title="Security Settings">
                <form onSubmit={handleSecuritySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Current Password (optional, for changing password)</label>
                        <input type="password" value={securityData.currentPassword} onChange={e => setSecurityData({ ...securityData, currentPassword: e.target.value })} style={{ width: '100%', padding: '0.875rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', fontSize: '1rem', fontFamily: 'inherit' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>New Password</label>
                        <input type="password" value={securityData.newPassword} onChange={e => setSecurityData({ ...securityData, newPassword: e.target.value })} style={{ width: '100%', padding: '0.875rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', fontSize: '1rem', fontFamily: 'inherit' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0' }}>
                        <input type="checkbox" id="enable2FA" checked={securityData.enable2FA} onChange={e => setSecurityData({ ...securityData, enable2FA: e.target.checked })} style={{ width: '20px', height: '20px', accentColor: 'var(--accent-green)' }} />
                        <label htmlFor="enable2FA" style={{ fontSize: '0.9375rem', color: 'var(--text-primary)', cursor: 'pointer' }}>Enable 2FA Authentication</label>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0', marginTop: '-0.5rem' }}>
                        <input type="checkbox" id="enableBiometric" checked={securityData.biometricEnabled} onChange={e => setSecurityData({ ...securityData, biometricEnabled: e.target.checked })} style={{ width: '20px', height: '20px', accentColor: 'var(--accent-green)' }} />
                        <label htmlFor="enableBiometric" style={{ fontSize: '0.9375rem', color: 'var(--text-primary)', cursor: 'pointer' }}>Enable Biometric Login & Payments</label>
                    </div>
                    {securityData.biometricEnabled && (
                        <div className="animate-fade-in" style={{ display: 'flex', gap: '1.5rem', marginTop: '-1rem', paddingLeft: '2rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                                <input type="radio" value="fingerprint" checked={securityData.biometricType === 'fingerprint'} onChange={e => setSecurityData({ ...securityData, biometricType: e.target.value })} style={{ accentColor: 'var(--accent-green)' }} />
                                Fingerprint
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                                <input type="radio" value="face" checked={securityData.biometricType === 'face'} onChange={e => setSecurityData({ ...securityData, biometricType: e.target.value })} style={{ accentColor: 'var(--accent-green)' }} />
                                Face ID
                            </label>
                        </div>
                    )}
                    <button type="submit" disabled={loading} style={{ width: '100%', background: 'var(--accent-green)', color: 'white', padding: '1rem', borderRadius: '12px', border: 'none', fontSize: '1rem', fontWeight: '600', marginTop: '0.5rem', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {loading ? <span style={{ display: 'flex', alignItems: 'center', animation: 'spin 1s linear infinite' }}><Loader2 size={20} /></span> : 'Update Security Settings'}
                    </button>
                </form>
            </ModalOverlay>

            <ModalOverlay isOpen={historyOpen} onClose={() => setHistoryOpen(false)} title={isAdmin ? "All Transactions" : "Payment History"}>
                {transactions.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-secondary)' }}>
                        <Activity size={48} style={{ opacity: 0.2, margin: '0 auto 1rem auto' }} />
                        <p style={{ margin: 0, fontSize: '1rem' }}>No transactions found yet.</p>
                        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Perform a top-up to see history here.</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {transactions.map(tx => (
                            <div key={tx.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ background: 'var(--glass-bg)', padding: '0.75rem', borderRadius: '50%' }}>
                                        {tx.service.includes('Data') ? <Database size={20} color="var(--accent-green)" /> : tx.service.includes('Electricity') ? <Activity size={20} color="var(--warning)" /> : <CreditCard size={20} color="var(--accent-purple)" />}
                                    </div>
                                    <div>
                                        <p style={{ margin: '0 0 0.25rem 0', fontWeight: '600', fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{tx.service}</p>
                                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                            {tx.network && `${tx.network} •`} {tx.phone}
                                        </p>
                                        <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                                            {new Date(tx.date).toLocaleString([], { hour12: true, month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })} • {tx.id}
                                        </p>
                                        {isAdmin && <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.7rem', color: 'var(--text-primary)' }}>{tx.userEmail}</p>}
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ margin: '0 0 0.25rem 0', fontWeight: '700', fontSize: '1rem', color: 'white' }}>₦{tx.amount}</p>
                                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--success)', fontWeight: '600' }}>{tx.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </ModalOverlay>

            <ModalOverlay isOpen={referralOpen} onClose={() => setReferralOpen(false)} title="Refer & Earn">
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                    <div style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(16,185,129,0) 100%)', width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(16,185,129,0.3)' }}>
                        <Gift size={40} color="var(--accent-green)" />
                    </div>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', color: 'white', fontWeight: '700' }}>Invite Friends & Earn</h3>
                    <p style={{ margin: '0 0 2rem 0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Get ₦500 bonus for every friend that signs up using your unique referral code.</p>

                    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '16px', border: '1px dashed var(--glass-border)', marginBottom: '2rem' }}>
                        <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Your Referral Code</p>
                        <h4 style={{ margin: 0, fontSize: '2rem', letterSpacing: '4px', color: 'var(--accent-green)' }}>{user?.referralCode || 'N/A'}</h4>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Total Referrals</p>
                            <h4 style={{ margin: 0, fontSize: '1.5rem', color: 'white' }}>{user?.referralsCount || 0}</h4>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Total Earned</p>
                            <h4 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--success)' }}>₦{user?.referralsEarned || 0}</h4>
                        </div>
                    </div>

                    <button type="button" onClick={copyReferral} style={{ width: '100%', background: 'white', color: '#111', padding: '1rem', borderRadius: '12px', border: 'none', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                        {copiedUrl ? <Check size={20} color="var(--success)" /> : <Copy size={20} />}
                        {copiedUrl ? 'Link Copied!' : 'Copy Referral Link'}
                    </button>
                </div>
            </ModalOverlay>

        </div>
    );
};

export default Profile;
