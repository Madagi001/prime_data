import React, { useState } from 'react';
import { X, Loader2, Copy, Check, Fingerprint, ScanFace } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import BiometricPrompt from './BiometricPrompt';

const ServiceFormModal = ({ isOpen, onClose, serviceName }) => {
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const [phone, setPhone] = useState('');
    const [amount, setAmount] = useState('');
    const [network, setNetwork] = useState('');
    const [plan, setPlan] = useState('');
    const [iucNumber, setIucNumber] = useState('');
    const [denomination, setDenomination] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [generatedPins, setGeneratedPins] = useState([]);
    const [examYear, setExamYear] = useState('');
    const [pin, setPin] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [refId, setRefId] = useState('');
    const [showBiometricPrompt, setShowBiometricPrompt] = useState(false);

    if (!isOpen) return null;

    const resetAndClose = () => {
        onClose();
        setTimeout(() => {
            setStep(1); setPhone(''); setAmount(''); setNetwork(''); setPlan(''); setExamYear(''); setPin(''); setRefId(''); setIucNumber(''); setDenomination(''); setQuantity(1); setGeneratedPins([]);
        }, 300);
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        toast.success('Account number copied!');
        setTimeout(() => setCopied(false), 2000);
    };

    const processPayment = () => {
        setLoading(true);
        setTimeout(() => {
            const newRef = `TRX-${Math.floor(Math.random() * 10000000)}`;
            setRefId(newRef);

            // Generate mock pins for recharge card
            if (isPrintCard) {
                const pins = Array.from({ length: Number(quantity) }, () => ({
                    pin: Array.from({ length: 4 }, () => Math.floor(1000 + Math.random() * 9000)).join('-'),
                    serial: `SN${Math.floor(100000000 + Math.random() * 900000000)}`
                }));
                setGeneratedPins(pins);
            }

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
    };

    const handleBiometricSuccess = () => {
        setShowBiometricPrompt(false);
        processPayment();
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
            processPayment();
        }
    };

    const isData = serviceName === 'Buy Data' || serviceName === 'Data Pins' || serviceName === 'SME Data' || serviceName === 'Corporate Data';
    const isAirtime = serviceName === 'Buy Airtime' || serviceName === 'Airtime to Cash' || serviceName === 'Airtime Transfer';
    const isWallet = serviceName === 'Fund Wallet';
    const isElectricity = serviceName === 'Electricity';
    const isExam = serviceName === 'Exam Pins';
    const isCableTV = serviceName === 'Cable TV';
    const isPrintCard = serviceName === 'Print Recharge Card';

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

    const cableTVProviders = [
        { label: 'GoTV', value: 'GoTV', color: '#F59E0B' },
        { label: 'DSTV', value: 'DSTV', color: '#3B82F6' },
        { label: 'StarTimes', value: 'StarTimes', color: '#EF4444' }
    ];

    const cableTVPackages = {
        'GoTV': [
            { label: 'GoTV Smallie - 1 Month - ₦1,575', value: '1575', plan: 'GoTV Smallie' },
            { label: 'GoTV Jinja - 1 Month - ₦2,700', value: '2700', plan: 'GoTV Jinja' },
            { label: 'GoTV Jolli - 1 Month - ₦4,150', value: '4150', plan: 'GoTV Jolli' },
            { label: 'GoTV Max - 1 Month - ₦5,500', value: '5500', plan: 'GoTV Max' },
            { label: 'GoTV Supa - 1 Month - ₦6,400', value: '6400', plan: 'GoTV Supa' },
            { label: 'GoTV Supa Plus - 1 Month - ₦7,200', value: '7200', plan: 'GoTV Supa Plus' },
        ],
        'DSTV': [
            { label: 'DStv Padi - 1 Month - ₦3,000', value: '3000', plan: 'DStv Padi' },
            { label: 'DStv Yanga - 1 Month - ₦4,615', value: '4615', plan: 'DStv Yanga' },
            { label: 'DStv Confam - 1 Month - ₦7,900', value: '7900', plan: 'DStv Confam' },
            { label: 'DStv Compact - 1 Month - ₦15,700', value: '15700', plan: 'DStv Compact' },
            { label: 'DStv Compact Plus - 1 Month - ₦24,900', value: '24900', plan: 'DStv Compact Plus' },
            { label: 'DStv Premium - 1 Month - ₦37,000', value: '37000', plan: 'DStv Premium' },
        ],
        'StarTimes': [
            { label: 'Nova - 1 Month - ₦1,200', value: '1200', plan: 'Nova' },
            { label: 'Basic - 1 Month - ₦2,200', value: '2200', plan: 'Basic' },
            { label: 'Smart - 1 Month - ₦2,800', value: '2800', plan: 'Smart' },
            { label: 'Classic - 1 Month - ₦3,600', value: '3600', plan: 'Classic' },
            { label: 'Super - 1 Month - ₦5,600', value: '5600', plan: 'Super' },
            { label: 'Korean - 1 Month - ₦8,500', value: '8500', plan: 'Korean' },
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

    const handleCableTVProviderChange = (providerValue) => {
        setNetwork(providerValue);
        setPlan('');
        setAmount('');
    };

    const handleCableTVPackageChange = (e) => {
        const selected = cableTVPackages[network]?.find(p => p.value === e.target.value);
        if (selected) {
            setPlan(selected.plan);
            setAmount(selected.value);
        }
    };

    const renderCableTVForm = () => (
        <form onSubmit={submitTransaction} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Provider Selector */}
            <div>
                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Select Provider</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                    {cableTVProviders.map((provider) => (
                        <button
                            key={provider.value}
                            type="button"
                            onClick={() => handleCableTVProviderChange(provider.value)}
                            style={{
                                padding: '0.875rem 0.5rem',
                                borderRadius: '14px',
                                background: network === provider.value
                                    ? `linear-gradient(135deg, ${provider.color}22, ${provider.color}44)`
                                    : 'rgba(255,255,255,0.04)',
                                border: `2px solid ${network === provider.value ? provider.color : 'rgba(255,255,255,0.08)'}`,
                                color: network === provider.value ? 'white' : 'var(--text-secondary)',
                                fontSize: '0.875rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                transition: 'all 0.25s ease',
                                textAlign: 'center',
                                fontFamily: 'inherit',
                                boxShadow: network === provider.value ? `0 4px 14px ${provider.color}33` : 'none',
                                transform: network === provider.value ? 'scale(1.04)' : 'scale(1)'
                            }}
                        >
                            {provider.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Package Selector */}
            {network && (
                <div className="animate-fade-in">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Select Package</label>
                    <select
                        required
                        value={plan ? cableTVPackages[network]?.find(p => p.plan === plan)?.value || '' : ''}
                        onChange={handleCableTVPackageChange}
                        style={{ width: '100%', padding: '0.875rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', fontSize: '1rem', fontFamily: 'inherit', appearance: 'none', cursor: 'pointer' }}
                    >
                        <option value="" disabled style={{ background: '#000', color: '#fff' }}>Select Package</option>
                        {cableTVPackages[network]?.map((item, idx) => (
                            <option key={idx} value={item.value} style={{ background: '#111', color: '#fff' }}>{item.label}</option>
                        ))}
                    </select>
                </div>
            )}

            {/* IUC Number */}
            {network && plan && (
                <div className="animate-fade-in">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>IUC/Smart Card Number</label>
                    <input
                        type="text"
                        required
                        value={iucNumber}
                        onChange={e => setIucNumber(e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder="Enter your IUC/Smart Card Number"
                        maxLength={12}
                        style={{ width: '100%', padding: '0.875rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', fontSize: '1rem', fontFamily: 'inherit', letterSpacing: '1px' }}
                    />
                    <p style={{ margin: '0.375rem 0 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Enter the number on your decoder or smart card</p>
                </div>
            )}

            {/* Summary */}
            {network && plan && amount && (
                <div className="animate-fade-in" style={{ background: 'rgba(139, 92, 246, 0.08)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '14px', padding: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Provider</span>
                        <strong style={{ fontSize: '0.875rem' }}>{network}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Package</span>
                        <strong style={{ fontSize: '0.875rem' }}>{plan}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Amount</span>
                        <strong style={{ fontSize: '0.875rem', color: 'var(--accent-green)' }}>₦{Number(amount).toLocaleString()}</strong>
                    </div>
                </div>
            )}

            <button
                type="submit"
                disabled={!network || !plan || !iucNumber || iucNumber.length < 6}
                style={{
                    width: '100%', background: 'var(--accent-green)', color: 'white', padding: '1rem', borderRadius: '12px',
                    border: 'none', fontSize: '1rem', fontWeight: '600', marginTop: '0.5rem',
                    cursor: (!network || !plan || !iucNumber || iucNumber.length < 6) ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)', fontFamily: 'inherit',
                    opacity: (!network || !plan || !iucNumber || iucNumber.length < 6) ? 0.5 : 1,
                    transition: 'opacity 0.2s'
                }}
            >
                Proceed
            </button>
        </form>
    );

    // ── RECHARGE CARD DENOMINATONS ─────────────────────────────────
    const cardDenominations = [100, 200, 500, 1000, 2000, 5000];
    const cardTotal = denomination && quantity ? Number(denomination) * Number(quantity) : 0;

    const renderPrintCardForm = () => (
        <form onSubmit={submitTransaction} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* Network */}
            <div>
                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Select Network</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                    {['MTN', 'Airtel', 'Glo', '9Mobile'].map((net) => {
                        const netColor = getNetworkColor(net);
                        return (
                            <button
                                key={net}
                                type="button"
                                onClick={() => { setNetwork(net); setDenomination(''); setAmount(''); }}
                                style={{
                                    padding: '0.75rem 0.25rem',
                                    borderRadius: '12px',
                                    background: network === net
                                        ? netColor
                                        : 'rgba(255,255,255,0.04)',
                                    border: `2px solid ${network === net ? netColor : 'rgba(255,255,255,0.08)'}`,
                                    color: network === net ? 'white' : 'var(--text-secondary)',
                                    fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer',
                                    transition: 'all 0.2s ease', textAlign: 'center', fontFamily: 'inherit',
                                    opacity: network === '' ? 0.9 : network === net ? 1 : 0.35,
                                    transform: network === net ? 'scale(1.05)' : 'scale(1)'
                                }}
                            >
                                {net}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Denomination */}
            {network && (
                <div className="animate-fade-in">
                    <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Select Denomination</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                        {cardDenominations.map((den) => (
                            <button
                                key={den}
                                type="button"
                                onClick={() => { setDenomination(String(den)); setAmount(String(den * Number(quantity))); }}
                                style={{
                                    padding: '0.75rem 0.5rem',
                                    borderRadius: '12px',
                                    background: denomination === String(den)
                                        ? 'linear-gradient(135deg, rgba(244,63,94,0.3), rgba(244,63,94,0.15))'
                                        : 'rgba(255,255,255,0.04)',
                                    border: `2px solid ${denomination === String(den) ? '#F43F5E' : 'rgba(255,255,255,0.08)'}`,
                                    color: denomination === String(den) ? 'white' : 'var(--text-secondary)',
                                    fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer',
                                    transition: 'all 0.2s ease', fontFamily: 'inherit',
                                    boxShadow: denomination === String(den) ? '0 4px 12px rgba(244,63,94,0.3)' : 'none',
                                    transform: denomination === String(den) ? 'scale(1.04)' : 'scale(1)'
                                }}
                            >
                                ₦{den.toLocaleString()}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Quantity */}
            {network && denomination && (
                <div className="animate-fade-in">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Quantity <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(1 – 50)</span></label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <button type="button" onClick={() => setQuantity(q => Math.max(1, Number(q) - 1))}
                            style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '1.25rem', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                        <input
                            type="number" min="1" max="50" required
                            value={quantity}
                            onChange={e => setQuantity(Math.min(50, Math.max(1, Number(e.target.value))))}
                            style={{ flex: 1, textAlign: 'center', padding: '0.75rem', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', fontSize: '1.125rem', fontWeight: '700', fontFamily: 'inherit' }}
                        />
                        <button type="button" onClick={() => setQuantity(q => Math.min(50, Number(q) + 1))}
                            style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '1.25rem', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                    </div>
                </div>
            )}

            {/* Summary */}
            {network && denomination && (
                <div className="animate-fade-in" style={{ background: 'rgba(244,63,94,0.07)', border: '1px solid rgba(244,63,94,0.2)', borderRadius: '14px', padding: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Network</span>
                        <strong style={{ fontSize: '0.875rem' }}>{network}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Denomination</span>
                        <strong style={{ fontSize: '0.875rem' }}>₦{Number(denomination).toLocaleString()} each</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Quantity</span>
                        <strong style={{ fontSize: '0.875rem' }}>{quantity} card{quantity > 1 ? 's' : ''}</strong>
                    </div>
                    <div style={{ height: '1px', background: 'rgba(244,63,94,0.15)', margin: '0.5rem 0' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '600' }}>Total Cost</span>
                        <strong style={{ fontSize: '1rem', color: '#F43F5E' }}>₦{cardTotal.toLocaleString()}</strong>
                    </div>
                </div>
            )}

            <button
                type="submit"
                disabled={!network || !denomination || !quantity}
                style={{
                    width: '100%', background: '#F43F5E', color: 'white', padding: '1rem', borderRadius: '12px',
                    border: 'none', fontSize: '1rem', fontWeight: '600', marginTop: '0.25rem',
                    cursor: (!network || !denomination || !quantity) ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 15px rgba(244,63,94,0.35)', fontFamily: 'inherit',
                    opacity: (!network || !denomination || !quantity) ? 0.45 : 1,
                    transition: 'opacity 0.2s'
                }}
                onClick={() => setAmount(String(cardTotal))}
            >
                Proceed to Pay ₦{cardTotal > 0 ? cardTotal.toLocaleString() : '—'}
            </button>
        </form>
    );

    const renderPrintCardSuccess = () => (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--success)', boxShadow: '0 0 20px rgba(16,185,129,0.2)' }}>
                    <Check size={28} color="var(--success)" />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '700', margin: '0 0 0.25rem 0' }}>Cards Generated!</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem', margin: 0 }}>{quantity} × ₦{Number(denomination).toLocaleString()} {network} recharge card{quantity > 1 ? 's' : ''}</p>
                </div>
            </div>

            <div style={{ maxHeight: '220px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingRight: '2px' }}>
                {generatedPins.map((item, idx) => (
                    <div key={idx} style={{ background: 'rgba(255,255,255,0.04)', border: '1px dashed rgba(255,255,255,0.12)', borderRadius: '10px', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <p style={{ margin: '0 0 0.2rem 0', fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Serial No.</p>
                            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{item.serial}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ margin: '0 0 0.2rem 0', fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>PIN</p>
                            <p style={{ margin: 0, fontSize: '1rem', fontWeight: '800', letterSpacing: '2px', color: 'var(--accent-green)', fontFamily: 'monospace' }}>{item.pin}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                    onClick={() => window.print()}
                    style={{ flex: 1, background: 'rgba(244,63,94,0.15)', color: '#F43F5E', border: '1px solid rgba(244,63,94,0.3)', padding: '0.875rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' }}
                >
                    🖨 Print Cards
                </button>
                <button
                    onClick={resetAndClose}
                    style={{ flex: 1, background: 'var(--text-primary)', color: 'var(--bg-primary)', border: 'none', padding: '0.875rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' }}
                >
                    Done
                </button>
            </div>
        </div>
    );

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

            {(!isWallet && !isCableTV && ((isAirtime && network) || (isData && plan) || (isElectricity && plan) || (!isData && !isAirtime && !isElectricity && !isExam))) && (
                <div className="animate-fade-in">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{isData || isAirtime ? 'Phone Number' : isElectricity ? 'Meter Number' : 'Account/Meter Identifier'}</label>
                    <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} placeholder="Enter details..." style={{ width: '100%', padding: '0.875rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', fontSize: '1rem', fontFamily: 'inherit' }} />
                </div>
            )}

            {(!isData && !isWallet && !isExam && !isCableTV && ((isAirtime && network) || (isElectricity && plan) || (!isData && !isAirtime && !isElectricity))) && (
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
                opacity: (!network && (isData || isAirtime || isElectricity || isExam)) ? 0.5 : 1,
                display: isCableTV ? 'none' : undefined
            }}>
                Proceed
            </button>
        </form>
    );

    const renderPinStep = () => (
        <form onSubmit={submitTransaction} className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center' }}>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9375rem', margin: '0 0 1rem 0' }}>
                You are about to process {isCableTV ? `${network} ${plan}` : isData ? 'Data' : serviceName} for <br />
                <strong style={{ color: 'white', fontSize: '1.125rem' }}>{isCableTV ? `IUC: ${iucNumber}` : phone}</strong> at ₦{Number(amount).toLocaleString()}.<br /><br />
                Enter your transaction PIN to confirm.
            </p>

            {user?.biometricEnabled ? (
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <button type="button" onClick={() => setShowBiometricPrompt(true)} style={{
                        width: '100%', background: 'transparent', border: '1px solid var(--accent-green)', color: 'var(--accent-green)', padding: '1rem', borderRadius: '12px', fontSize: '1rem', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', fontFamily: 'inherit'
                    }}>
                        {user.biometricType === 'fingerprint' ? <Fingerprint size={20} /> : <ScanFace size={20} />}
                        Pay with {user.biometricType === 'fingerprint' ? 'Touch ID' : 'Face ID'}
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '0.5rem 0' }}>
                        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>OR ENTER PIN</span>
                        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                    </div>
                </div>
            ) : null}

            <div>
                <input
                    type="password"
                    maxLength="4"
                    required={!user?.biometricEnabled}
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
                    : isCableTV
                        ? (step === 1 ? renderCableTVForm() : step === 2 ? renderPinStep() : renderSuccessStep())
                        : isPrintCard
                            ? (step === 1 ? renderPrintCardForm() : step === 2 ? renderPinStep() : renderPrintCardSuccess())
                            : (step === 1 ? renderServiceForm() : step === 2 ? renderPinStep() : renderSuccessStep())
                }

                <BiometricPrompt 
                    isOpen={showBiometricPrompt} 
                    onClose={() => setShowBiometricPrompt(false)} 
                    onSuccess={handleBiometricSuccess} 
                    type={user?.biometricType || 'fingerprint'} 
                />

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
