import React, { useState } from 'react';
import { X, Loader2, Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const ServiceFormModal = ({ isOpen, onClose, serviceName }) => {
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const [phone, setPhone] = useState('');
    const [amount, setAmount] = useState('');
    const [network, setNetwork] = useState('');
    const [plan, setPlan] = useState('');
    const [examYear, setExamYear] = useState('');
    const [pin, setPin] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [refId, setRefId] = useState('');

    if (!isOpen) return null;

    const resetAndClose = () => {
        onClose();
        setTimeout(() => {
            setStep(1); setPhone(''); setAmount(''); setNetwork(''); setPlan(''); setExamYear(''); setPin(''); setRefId('');
        }, 300);
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        toast.success('Account number copied!');
        setTimeout(() => setCopied(false), 2000);
    };

    const submitTransaction = (e) => {
        e.preventDefault();
        if (step === 1) {
            setStep(2); // Go to PIN step
            return;
        }

        if (step === 2) {
            const validPin = user?.transferPin || '1234';
            if (pin !== validPin) {
                toast.error('Invalid Transaction PIN');
                return;
            }
            setLoading(true);
            setTimeout(() => {
                const newRef = `TRX-${Math.floor(Math.random() * 10000000)}`;
                setRefId(newRef);
                
                const newTx = {
                    id: newRef,
                    userEmail: user?.email || 'guest@example.com',
                    service: serviceName,
                    amount: amount,
                    network: network,
                    phone: phone,
                    date: new Date().toISOString(),
                    status: 'Successful'
                };
                const txs = JSON.parse(localStorage.getItem('vtu_transactions') || '[]');
                txs.unshift(newTx);
                localStorage.setItem('vtu_transactions', JSON.stringify(txs));

                setLoading(false);
                setStep(3); // Success Step
            }, 1500);
        }
    };

    const isData = serviceName === 'Buy Data' || serviceName === 'Data Pins' || serviceName === 'SME Data' || serviceName === 'Corporate Data';
    const isAirtime = serviceName === 'Buy Airtime' || serviceName === 'Airtime to Cash' || serviceName === 'Airtime Transfer';
    const isWallet = serviceName === 'Fund Wallet';
    const isElectricity = serviceName === 'Electricity';
    const isExam = serviceName === 'Exam Pins';

    const examTypes = [
        { label: 'WAEC Result Checker - ₦3,500', value: '3500', type: 'WAEC' },
        { label: 'NECO Result Token - ₦1,200', value: '1200', type: 'NECO' },
        { label: 'JAMB E-Pin - ₦4,700', value: '4700', type: 'JAMB' }
    ];

    const dataPlans = {
        'MTN': [
            { label: '500MB (SME) - 30 Days - ₦140', value: '140' },
            { label: '1GB (SME) - 30 Days - ₦260', value: '260' },
            { label: '2GB (SME) - 30 Days - ₦520', value: '520' },
            { label: '3GB (SME) - 30 Days - ₦780', value: '780' },
            { label: '5GB (SME) - 30 Days - ₦1300', value: '1300' },
            { label: '10GB (SME) - 30 Days - ₦2600', value: '2600' },
            { label: '500MB (CG) - 30 Days - ₦150', value: '150' },
            { label: '1GB (CG) - 30 Days - ₦280', value: '280' },
            { label: '2GB (CG) - 30 Days - ₦560', value: '560' },
            { label: '3GB (CG) - 30 Days - ₦840', value: '840' },
            { label: '5GB (CG) - 30 Days - ₦1400', value: '1400' },
            { label: '10GB (CG) - 30 Days - ₦2800', value: '2800' }
        ],
        'Airtel': [
            { label: '500MB (CG) - 30 Days - ₦150', value: '150' },
            { label: '1GB (CG) - 30 Days - ₦280', value: '280' },
            { label: '2GB (CG) - 30 Days - ₦560', value: '560' },
            { label: '5GB (CG) - 30 Days - ₦1400', value: '1400' },
            { label: '10GB (CG) - 30 Days - ₦2800', value: '2800' },
            { label: '15GB (CG) - 30 Days - ₦4200', value: '4200' },
            { label: '20GB (CG) - 30 Days - ₦5600', value: '5600' }
        ],
        'Glo': [
            { label: '500MB (CG) - 30 Days - ₦145', value: '145' },
            { label: '1GB (CG) - 30 Days - ₦250', value: '250' },
            { label: '2GB (CG) - 30 Days - ₦500', value: '500' },
            { label: '3GB (CG) - 30 Days - ₦750', value: '750' },
            { label: '5GB (CG) - 30 Days - ₦1250', value: '1250' },
            { label: '10GB (CG) - 30 Days - ₦2500', value: '2500' },
            { label: '1.05GB (Direct) - 14 Days - ₦500', value: '500' },
            { label: '2.9GB (Direct) - 30 Days - ₦1000', value: '1000' }
        ],
        '9Mobile': [
            { label: '500MB (SME) - 30 Days - ₦120', value: '120' },
            { label: '1GB (SME) - 30 Days - ₦240', value: '240' },
            { label: '2GB (SME) - 30 Days - ₦480', value: '480' },
            { label: '3GB (SME) - 30 Days - ₦720', value: '720' },
            { label: '4GB (SME) - 30 Days - ₦960', value: '960' },
            { label: '5GB (SME) - 30 Days - ₦1200', value: '1200' },
            { label: '10GB (SME) - 30 Days - ₦2400', value: '2400' }
        ]
    };

    const electricityProviders = [
        { label: 'Abuja Electricity (AEDC)', value: 'AEDC' },
        { label: 'Ikeja Electric (IE)', value: 'IE' },
        { label: 'Eko Electricity (EKEDC)', value: 'EKEDC' },
        { label: 'Ibadan Electricity (IBEDC)', value: 'IBEDC' },
        { label: 'Benin Electricity (BEDC)', value: 'BEDC' },
        { label: 'Port Harcourt Electricity (PHED)', value: 'PHED' },
        { label: 'Enugu Electricity (EEDC)', value: 'EEDC' },
        { label: 'Kano Electricity (KEDCO)', value: 'KEDCO' },
        { label: 'Kaduna Electricity (KAEDCO)', value: 'KAEDCO' },
        { label: 'Jos Electricity (JED)', value: 'JED' },
        { label: 'Yola Electricity (YEDC)', value: 'YEDC' }
    ];

    const handleNetworkChange = (e) => {
        setNetwork(e.target.value);
        setPlan('');
        if (isData) setAmount('');
    };

    const handlePlanChange = (e) => {
        setPlan(e.target.value);
        if (isData) setAmount(e.target.value); // amount is equal to the plan value for data
    };

    const handleExamChange = (e) => {
        const type = e.target.value;
        setNetwork(type);
        const selected = examTypes.find(x => x.type === type);
        if (selected) setAmount(selected.value);
    };

    const renderFundWallet = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.5' }}>
                Transfer to the account number below to automatically fund your wallet. Funding is instant.
            </p>

            <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '16px', padding: '1.25rem', position: 'relative' }}>
                <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Bank Name</p>
                <p style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '600' }}>OPay</p>

                <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Account Number</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <p style={{ margin: 0, fontSize: '1.75rem', fontWeight: '700', letterSpacing: '1px', color: 'var(--accent-green)' }}>9131278572</p>
                    <button onClick={() => handleCopy('9131278572')} style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        {copied ? <Check size={18} color="var(--success)" /> : <Copy size={18} />}
                    </button>
                </div>

                <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Account Name</p>
                <p style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '600' }}>PrimeData VTU</p>

                <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email</p>
                <p style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}>Musa@gmail.com</p>
            </div>

            <div style={{ background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.1)', borderRadius: '12px', padding: '1rem' }}>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--warning)', lineHeight: '1.4' }}>
                    ⚠️ Note: A stamp duty charge of ₦50 applies to transfers above ₦10,000.
                </p>
            </div>
        </div>
    );

    const getNetworkColor = (net) => {
        switch(net) {
            case 'MTN': return '#F59E0B'; // Yellow/Orange
            case 'Airtel': return '#EF4444'; // Red
            case 'Glo': return '#10B981'; // Green
            case '9Mobile': return '#059669'; // Dark green
            default: return 'var(--accent-green)';
        }
    };

    const renderServiceForm = () => (
        <form onSubmit={submitTransaction} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {(isData || isAirtime) && (
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Network Provider</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                        {['MTN', 'Airtel', 'Glo', '9Mobile'].map((net) => {
                            const netColor = getNetworkColor(net);
                            return (
                                <button 
                                    key={net}
                                    type="button"
                                    onClick={() => handleNetworkChange({ target: { value: net }})}
                                    style={{
                                        padding: '0.75rem 0.25rem',
                                        borderRadius: '12px',
                                        background: netColor,
                                        border: `1px solid ${netColor}`,
                                        color: 'white',
                                        fontSize: '0.75rem',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        textAlign: 'center',
                                        opacity: network === '' ? 0.85 : network === net ? 1 : 0.35,
                                        transform: network === net ? 'scale(1.05)' : 'scale(1)'
                                    }}
                                >
                                    {net}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {isElectricity && (
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Electricity Provider</label>
                    <select required value={network} onChange={handleNetworkChange} style={{ width: '100%', padding: '0.875rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', fontSize: '1rem', fontFamily: 'inherit', appearance: 'none', cursor: 'pointer' }}>
                        <option value="" disabled style={{ background: '#000', color: '#fff' }}>Select Provider</option>
                        {electricityProviders.map((item, idx) => (
                            <option key={idx} value={item.value} style={{ background: '#000', color: '#fff' }}>{item.label}</option>
                        ))}
                    </select>
                </div>
            )}

            {isElectricity && network && (
                <div className="animate-fade-in">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Meter Type</label>
                    <select required value={plan} onChange={handlePlanChange} style={{ width: '100%', padding: '0.875rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', fontSize: '1rem', fontFamily: 'inherit', appearance: 'none', cursor: 'pointer' }}>
                        <option value="" disabled style={{ background: '#000', color: '#fff' }}>Select Meter Type</option>
                        <option value="Prepaid" style={{ background: '#000', color: '#fff' }}>Prepaid</option>
                        <option value="Postpaid" style={{ background: '#000', color: '#fff' }}>Postpaid</option>
                    </select>
                </div>
            )}

            {isData && network && (
                <div className="animate-fade-in">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Data Plan</label>
                    <select required value={plan} onChange={handlePlanChange} style={{ width: '100%', padding: '0.875rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', fontSize: '1rem', fontFamily: 'inherit', appearance: 'none', cursor: 'pointer' }}>
                        <option value="" disabled style={{ background: '#000', color: '#fff' }}>Select Plan</option>
                        {dataPlans[network]?.map((item, idx) => <option key={idx} value={item.value} style={{ background: '#000', color: '#fff', padding: '10px' }}>{item.label}</option>)}
                    </select>
                </div>
            )}

            {isExam && (
                <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Exam Type</label>
                        <select required value={network} onChange={handleExamChange} style={{ width: '100%', padding: '0.875rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', fontSize: '1rem', fontFamily: 'inherit', appearance: 'none', cursor: 'pointer' }}>
                            <option value="" disabled style={{ background: '#000', color: '#fff' }}>Select Exam Type</option>
                            {examTypes.map((item, idx) => (
                                <option key={idx} value={item.type} style={{ background: '#000', color: '#fff' }}>{item.label}</option>
                            ))}
                        </select>
                    </div>
                    {network && (
                        <>
                            <div className="animate-fade-in">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Exam Number</label>
                                <input type="text" required value={phone} onChange={e => setPhone(e.target.value.toUpperCase())} placeholder="e.g. 12345678AB" style={{ width: '100%', padding: '0.875rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', fontSize: '1rem', fontFamily: 'inherit' }} />
                            </div>
                            <div className="animate-fade-in">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Exam Year (Optional)</label>
                                <input type="number" value={examYear} onChange={e => setExamYear(e.target.value)} placeholder="e.g. 2025" style={{ width: '100%', padding: '0.875rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', fontSize: '1rem', fontFamily: 'inherit' }} />
                            </div>
                            <div style={{ padding: '0.5rem 0' }}>
                                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}><span>Processing Fee:</span> <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>₦{amount}</span></p>
                            </div>
                        </>
                    )}
                </div>
            )}

            {(!isWallet && ((isAirtime && network) || (isData && plan) || (isElectricity && plan) || (!isData && !isAirtime && !isElectricity && !isExam))) && (
                <div className="animate-fade-in">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{isData || isAirtime ? 'Phone Number' : isElectricity ? 'Meter Number' : 'Account/Meter Identifier'}</label>
                    <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} placeholder="Enter details..." style={{ width: '100%', padding: '0.875rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', fontSize: '1rem', fontFamily: 'inherit' }} />
                </div>
            )}

            {(!isData && !isWallet && !isExam && ((isAirtime && network) || (isElectricity && plan) || (!isData && !isAirtime && !isElectricity))) && (
                <div className="animate-fade-in">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Amount (₦)</label>
                    <input type="number" required value={amount} onChange={e => setAmount(e.target.value)} placeholder="Min ₦50" style={{ width: '100%', padding: '0.875rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', fontSize: '1rem', fontFamily: 'inherit' }} />
                </div>
            )}

            {(isData && amount) && (
                <div style={{ padding: '0.5rem 0' }}>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}><span>Amount to pay:</span> <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>₦{amount}</span></p>
                </div>
            )}

            <button type="submit" disabled={!network && (isData || isAirtime || isElectricity || isExam)} style={{
                width: '100%', background: 'var(--accent-green)', color: 'white', padding: '1rem', borderRadius: '12px',
                border: 'none', fontSize: '1rem', fontWeight: '600', marginTop: '0.5rem', cursor: (!network && (isData || isAirtime || isElectricity || isExam)) ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)', fontFamily: 'inherit',
                opacity: (!network && (isData || isAirtime || isElectricity || isExam)) ? 0.5 : 1
            }}>
                Proceed
            </button>
        </form>
    );

    const renderPinStep = () => (
        <form onSubmit={submitTransaction} className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center' }}>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9375rem', margin: '0 0 1rem 0' }}>
                You are about to process {isData ? 'Data' : serviceName} for <br /><strong style={{ color: 'white', fontSize: '1.125rem' }}>{phone}</strong> at ₦{amount}.<br /><br />Enter your transaction PIN to confirm.
            </p>

            <div>
                <input
                    type="password"
                    maxLength="4"
                    required
                    value={pin}
                    onChange={e => setPin(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="* * * *"
                    style={{ width: '120px', textAlign: 'center', letterSpacing: '8px', padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '2px solid var(--accent-green)', color: 'white', outline: 'none', fontSize: '1.5rem', fontFamily: 'inherit' }}
                />
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '-0.5rem 0 0 0' }}>Enter your 4-digit PIN</p>

            <button type="submit" disabled={loading || pin.length < 4} style={{
                width: '100%', background: 'var(--accent-green)', color: 'white', padding: '1rem', borderRadius: '12px',
                border: 'none', fontSize: '1rem', fontWeight: '600', marginTop: '1rem', cursor: (loading || pin.length < 4) ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)', fontFamily: 'inherit', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem',
                opacity: (loading || pin.length < 4) ? 0.8 : 1
            }}>
                {loading ? <span style={{ display: 'flex', alignItems: 'center', animation: 'spin 1s linear infinite' }}><Loader2 size={20} /></span> : 'Confirm & Pay'}
            </button>
            <button type="button" onClick={() => setStep(1)} style={{ width: '100%', background: 'transparent', color: 'var(--text-secondary)', border: 'none', padding: '0.75rem', fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: '500' }}>
                Back
            </button>
        </form>
    );

    const renderSuccessStep = () => (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', padding: '1rem 0' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--success)', boxShadow: '0 0 20px rgba(16, 185, 129, 0.2)' }}>
                <Check size={32} color="var(--success)" />
            </div>
            <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', margin: '0 0 0.5rem 0' }}>Transaction Successful</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.5', margin: 0 }}>
                    Your {serviceName} purchase for {phone} was successful.
                </p>
            </div>

            <div style={{ width: '100%', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px dashed var(--glass-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}><span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Amount</span><strong style={{ fontSize: '0.875rem' }}>₦{amount}</strong></div>
                {network && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}><span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Network</span><strong style={{ fontSize: '0.875rem' }}>{network}</strong></div>}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}><span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Receiver</span><strong style={{ fontSize: '0.875rem' }}>{phone}</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Ref ID</span><strong style={{ fontSize: '0.875rem', fontFamily: 'monospace' }}>{refId}</strong></div>
            </div>

            <button onClick={resetAndClose} style={{
                width: '100%', background: 'var(--text-primary)', color: 'var(--bg-primary)', padding: '1rem', borderRadius: '12px',
                border: 'none', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit'
            }}>
                Done
            </button>
        </div>
    );

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
                animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700', margin: 0 }}>{serviceName}</h2>
                    <button onClick={resetAndClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                        <X size={24} />
                    </button>
                </div>

                {isWallet
                    ? renderFundWallet()
                    : (step === 1 ? renderServiceForm() : step === 2 ? renderPinStep() : renderSuccessStep())
                }

            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
        </div>
    );
};
export default ServiceFormModal;
