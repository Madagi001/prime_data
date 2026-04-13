import React, { useEffect, useState } from 'react';
import { Fingerprint, ScanFace, CheckCircle2, X } from 'lucide-react';

const BiometricPrompt = ({ isOpen, onClose, onSuccess, type = 'fingerprint', userName = 'User' }) => {
    const [status, setStatus] = useState('idle'); // idle, scanning, success

    useEffect(() => {
        if (isOpen) {
            setStatus('idle');
        } else {
            setStatus('idle');
        }
    }, [isOpen]);

    const handleScan = () => {
        if (status !== 'idle') return;
        setStatus('scanning');
        setTimeout(() => {
            setStatus('success');
            setTimeout(() => {
                onSuccess();
            }, 1000);
        }, 1500);
    };

    if (!isOpen) return null;

    return (
        <div className="animate-fade-in" style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
        }}>
            <div style={{
                backgroundColor: 'var(--bg-secondary)', width: '90%', maxWidth: '320px',
                borderRadius: '24px', padding: '2.5rem 1.5rem',
                border: '1px solid var(--glass-border)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative'
            }}>
                <button onClick={onClose} style={{
                    position: 'absolute', top: '1rem', right: '1rem',
                    background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer'
                }}>
                    <X size={20} />
                </button>

                <h3 style={{ margin: '0 0 2rem 0', fontSize: '1.25rem', fontWeight: '600' }}>
                    {type === 'fingerprint' ? 'Touch ID' : 'Face ID'}
                </h3>

                <div style={{ position: 'relative', width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    {/* Ripple effects */}
                    {status === 'scanning' && (
                        <>
                            <div className="ripple-1" style={{ position: 'absolute', width: '100%', height: '100%', border: '2px solid var(--accent-green)', borderRadius: '50%', opacity: 0 }} />
                            <div className="ripple-2" style={{ position: 'absolute', width: '100%', height: '100%', border: '2px solid var(--accent-green)', borderRadius: '50%', opacity: 0 }} />
                        </>
                    )}

                    {status === 'success' ? (
                        <div className="animate-pop-in">
                            <CheckCircle2 size={70} color="var(--success)" />
                        </div>
                    ) : (
                        <div 
                            onClick={handleScan}
                            style={{ 
                                position: 'relative', overflow: 'hidden', padding: '15px', 
                                borderRadius: '50%', cursor: status === 'idle' ? 'pointer' : 'default',
                                background: status === 'idle' ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                                border: status === 'idle' ? '2px dashed var(--accent-green)' : 'none',
                                transition: 'all 0.3s ease',
                                transform: status === 'idle' ? 'scale(1)' : 'scale(1.1)'
                            }}
                            onMouseOver={e => {
                                if (status === 'idle') {
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                    e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
                                }
                            }}
                            onMouseOut={e => {
                                if (status === 'idle') {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
                                }
                            }}
                        >
                            {type === 'fingerprint' ? (
                                <Fingerprint size={60} color="var(--accent-green)" />
                            ) : (
                                <ScanFace size={60} color="var(--accent-green)" />
                            )}
                            
                            {/* Scanning laser line */}
                            {status === 'scanning' && (
                                <div className="scanner-line" style={{
                                    position: 'absolute', top: 0, left: 0, width: '100%', height: '4px',
                                    background: 'var(--accent-green)', boxShadow: '0 0 10px var(--accent-green), 0 0 20px var(--accent-green)'
                                }} />
                            )}
                        </div>
                    )}
                </div>

                <p style={{
                    color: status === 'success' ? 'var(--success)' : 'var(--text-secondary)',
                    fontSize: '0.9375rem', fontWeight: '500', transition: 'color 0.3s',
                    marginTop: '0.5rem', textAlign: 'center'
                }}>
                    {status === 'idle' 
                        ? `Tap sensor to authenticate as ${userName}` 
                        : status === 'scanning' 
                            ? `Identifying ${userName}...` 
                            : `Welcome back, ${userName}!`}
                </p>
                
                <style dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes scan {
                        0% { top: 0; opacity: 0; }
                        10% { opacity: 1; }
                        90% { opacity: 1; }
                        100% { top: 100%; opacity: 0; }
                    }
                    .scanner-line {
                        animation: scan 1.5s infinite linear;
                    }
                    @keyframes rippleAnim {
                        0% { transform: scale(0.8); opacity: 1; }
                        100% { transform: scale(1.8); opacity: 0; }
                    }
                    .ripple-1 { animation: rippleAnim 2s infinite; }
                    .ripple-2 { animation: rippleAnim 2s infinite; animation-delay: 1s; }
                    @keyframes popIn {
                        0% { transform: scale(0); opacity: 0; }
                        60% { transform: scale(1.2); opacity: 1; }
                        100% { transform: scale(1); opacity: 1; }
                    }
                    .animate-pop-in { animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
                `}} />
            </div>
        </div>
    );
};

export default BiometricPrompt;
