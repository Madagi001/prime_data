import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        const res = login(email, password);
        if (res.success) {
            navigate('/');
        } else {
            setError(res.message);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', width: '100%', maxWidth: '480px', margin: '0 auto' }}>
            <div className="glass-card animate-fade-in" style={{ width: '100%', padding: '2.5rem 2rem' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem', textAlign: 'center' }}>Welcome Back</h2>
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2rem', fontSize: '0.875rem' }}>Log in to access PrimeData VTU</p>

                {error && <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.25rem', fontSize: '0.875rem', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.2)' }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            style={{ width: '100%', padding: '0.875rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', fontSize: '1rem', fontFamily: 'inherit' }}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '0.875rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', fontSize: '1rem', fontFamily: 'inherit' }}
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit" style={{ width: '100%', background: 'var(--accent-green)', color: 'white', padding: '1rem', borderRadius: '12px', border: 'none', fontSize: '1rem', fontWeight: '600', marginTop: '0.5rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)', fontFamily: 'inherit' }}>
                        Log In
                    </button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Don't have an account? <Link to="/signup" style={{ color: 'var(--accent-green)', textDecoration: 'none', fontWeight: '600' }}>Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
