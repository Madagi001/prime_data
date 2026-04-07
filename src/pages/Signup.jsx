import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';

const Signup = () => {
    const [searchParams] = useSearchParams();
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', transferPin: '', invitedByRef: searchParams.get('ref') || '' });
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        const res = signup(formData);
        if (res.success) {
            navigate('/login');
        } else {
            setError(res.message);
        }
    };

    const inputStyle = { width: '100%', padding: '0.875rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', fontSize: '1rem', fontFamily: 'inherit' };
    const labelStyle = { display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', width: '100%', maxWidth: '480px', margin: '0 auto' }}>
            <div className="glass-card animate-fade-in" style={{ width: '100%', padding: '2.5rem 2rem' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem', textAlign: 'center' }}>Create Account</h2>
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '1.5rem', fontSize: '0.875rem' }}>Join to access PrimeData VTU</p>

                {error && <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.875rem', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.2)' }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={labelStyle}>Full Name</label>
                        <input name="name" type="text" required onChange={handleChange} style={inputStyle} placeholder="John Doe" />
                    </div>
                    <div>
                        <label style={labelStyle}>Email Address</label>
                        <input name="email" type="email" required onChange={handleChange} style={inputStyle} placeholder="john@example.com" />
                    </div>
                    <div>
                        <label style={labelStyle}>Phone Number</label>
                        <input name="phone" type="tel" required onChange={handleChange} style={inputStyle} placeholder="08012345678" />
                    </div>
                    <div>
                        <label style={labelStyle}>Password</label>
                        <input name="password" type="password" required minLength="6" onChange={handleChange} style={inputStyle} placeholder="Create password" />
                    </div>
                    <div>
                        <label style={labelStyle}>Transfer PIN (4 Digits)</label>
                        <input name="transferPin" type="password" required minLength="4" maxLength="4" onChange={(e) => setFormData({...formData, transferPin: e.target.value.replace(/[^0-9]/g, '')})} value={formData.transferPin} style={{ ...inputStyle, letterSpacing: '4px' }} placeholder="* * * *" />
                    </div>
                    <div>
                        <label style={labelStyle}>Referral Code (Optional)</label>
                        <input name="invitedByRef" type="text" value={formData.invitedByRef} onChange={handleChange} style={{ ...inputStyle, textTransform: 'uppercase' }} placeholder="Enter code if you have one" />
                    </div>
                    <button type="submit" style={{ width: '100%', background: 'var(--accent-green)', color: 'white', padding: '1rem', borderRadius: '12px', border: 'none', fontSize: '1rem', fontWeight: '600', marginTop: '0.5rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)', fontFamily: 'inherit' }}>
                        Sign Up
                    </button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--accent-green)', textDecoration: 'none', fontWeight: '600' }}>Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
