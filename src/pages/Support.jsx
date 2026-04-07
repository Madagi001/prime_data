import React, { useState } from 'react';
import { Search, MessageCircle, Phone, Mail, HelpCircle, ChevronDown, ChevronRight, FileText, UploadCloud, AlertCircle, CheckCircle2, Star, Shield } from 'lucide-react';

const Support = () => {
  const [activeTab, setActiveTab] = useState('hub'); // hub, faqs, tickets
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState(null);

  // Form State
  const [ticketIssue, setTicketIssue] = useState('data');
  const [ticketDesc, setTicketDesc] = useState('');

  const faqs = [
    { id: 1, category: 'Data Purchase', q: 'How to buy data?', a: 'Go to the Services tab, select Data, choose your network, and enter the phone number.' },
    { id: 2, category: 'Data Purchase', q: 'Why is my data delayed?', a: 'Network providers sometimes experience slight delays. Please wait up to 15 minutes or check your transaction status.' },
    { id: 3, category: 'Payments', q: 'Failed payment but debited?', a: 'If your wallet wasn\'t credited, the bank will automatically reverse the transaction within 24 hours. Contact support otherwise.' },
    { id: 4, category: 'Account', q: 'How to reset password?', a: 'Log out and click "Forgot Password" on the login screen, then follow the prompts sent to your email.' }
  ];

  const filteredFaqs = faqs.filter(f => f.q.toLowerCase().includes(searchQuery.toLowerCase()));

  // Mock Tickets
  const myTickets = [
    { id: 'TKT-9021', title: 'Data not received on MTN', status: 'In Progress', date: 'Oct 24, 2023' },
    { id: 'TKT-8834', title: 'Wallet Funding Failed', status: 'Resolved', date: 'Oct 15, 2023' }
  ];

  const handleWhatsApp = () => {
    // Open whatsapp with a generic pre-filled text
    window.open('https://wa.me/2349131278572?text=Hi%20PrimeData%20Support,%20I%20need%20help.', '_blank');
  };

  const submitTicket = (e) => {
    e.preventDefault();
    alert('Ticket submitted successfully! ID: TKT-NEW123');
    setTicketDesc('');
  };

  return (
    <div style={{ padding: '0 0 6rem 0' }}>
      {/* Header Profile-ish Section */}
      <div style={{
        padding: '2rem 1.75rem 1.5rem 1.75rem',
        background: 'linear-gradient(180deg, rgba(62, 174, 255, 0.1) 0%, transparent 100%)',
        borderBottom: '1px solid var(--glass-border)'
      }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem' }}>Support Center</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', margin: 0 }}>How can we help you today?</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', padding: '1rem 1.75rem', gap: '0.5rem', overflowX: 'auto' }} className="scrollbar-hide">
        {['hub', 'faqs', 'tickets'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '0.625rem 1.25rem',
              borderRadius: '20px',
              border: '1px solid',
              borderColor: activeTab === tab ? 'var(--accent-blue)' : 'var(--glass-border)',
              background: activeTab === tab ? 'rgba(62, 174, 255, 0.1)' : 'var(--glass-bg)',
              color: activeTab === tab ? 'var(--accent-blue)' : 'var(--text-secondary)',
              fontWeight: activeTab === tab ? '600' : '500',
              textTransform: 'capitalize',
              whiteSpace: 'nowrap',
              cursor: 'pointer'
            }}
          >
            {tab === 'hub' ? 'Help Hub' : tab === 'faqs' ? 'FAQs' : 'My Tickets'}
          </button>
        ))}
      </div>

      <div style={{ padding: '0 1.75rem' }}>
        
        {/* =============== HUB TAB =============== */}
        {activeTab === 'hub' && (
          <div className="animate-fade-in">
            {/* Quick Contact Cards */}
            <h3 style={{ fontSize: '1.0625rem', fontWeight: '600', marginBottom: '1rem', marginTop: '0.5rem' }}>Live Support</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              <div 
                onClick={handleWhatsApp}
                className="glass-card" 
                style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageCircle color="var(--success)" size={24} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <h4 style={{ fontWeight: '600', fontSize: '0.9375rem', margin: '0 0 0.25rem 0' }}>WhatsApp</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Avg reply: 2 mins</p>
                </div>
              </div>

              <div 
                onClick={() => window.open('tel:+2349131278572')}
                className="glass-card" 
                style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(62, 174, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone color="var(--accent-blue)" size={24} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <h4 style={{ fontWeight: '600', fontSize: '0.9375rem', margin: '0 0 0.25rem 0' }}>Phone Call</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>8am - 10pm</p>
                </div>
              </div>
            </div>

             {/* Help Center Guides */}
             <h3 style={{ fontSize: '1.0625rem', fontWeight: '600', marginBottom: '1rem' }}>Help Guides</h3>
             <div className="glass-card" style={{ padding: '0.5rem 1rem', marginBottom: '2rem' }}>
                {[
                  { icon: FileText, title: 'How to fund wallet' },
                  { icon: FileText, title: 'How to check transaction status' },
                  { icon: AlertCircle, title: 'Network delays explained' }
                ].map((item, idx, arr) => (
                  <div key={idx} style={{ 
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                    padding: '1rem 0', borderBottom: idx !== arr.length - 1 ? '1px solid var(--glass-border)' : 'none',
                    cursor: 'pointer'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                       <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <item.icon size={18} color="var(--text-secondary)" />
                       </div>
                       <span style={{ fontSize: '0.9375rem', fontWeight: '500' }}>{item.title}</span>
                    </div>
                    <ChevronRight size={18} color="var(--text-secondary)" />
                  </div>
                ))}
             </div>

             {/* Trust & Security */}
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1.25rem', background: 'rgba(245, 158, 11, 0.05)', borderRadius: '16px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                <Shield color="var(--warning)" size={24} />
                <div>
                   <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--warning)', margin: '0 0 0.25rem 0' }}>Stay Safe!</h4>
                   <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>We will never ask for your password or OTP. Do not share it with anyone.</p>
                </div>
             </div>
          </div>
        )}

        {/* =============== FAQs TAB =============== */}
        {activeTab === 'faqs' && (
          <div className="animate-fade-in">
             <div className="glass-card" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <Search size={20} color="var(--text-secondary)" />
                <input 
                  type="text" 
                  placeholder="Search your problem..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', width: '100%', fontSize: '0.9375rem' }} 
                />
             </div>

             <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredFaqs.length > 0 ? filteredFaqs.map(faq => (
                  <div key={faq.id} className="glass-card" style={{ padding: '1.25rem', cursor: 'pointer' }} onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                       <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                         <span style={{ fontSize: '0.6875rem', color: 'var(--accent-blue)', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.5px' }}>{faq.category}</span>
                         <h4 style={{ fontSize: '0.9375rem', fontWeight: '600', margin: 0, paddingRight: '1rem' }}>{faq.q}</h4>
                       </div>
                       <ChevronDown size={20} color="var(--text-secondary)" style={{ transform: activeFaq === faq.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                    </div>
                    
                    {activeFaq === faq.id && (
                       <div className="animate-fade-in" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
                          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>{faq.a}</p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                             <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Was this helpful?</span>
                             <div style={{ display: 'flex', gap: '0.5rem' }}>
                               <button style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '0.25rem 0.75rem', color: 'var(--text-primary)' }}>👍</button>
                               <button style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '0.25rem 0.75rem', color: 'var(--text-primary)' }}>👎</button>
                             </div>
                          </div>
                       </div>
                    )}
                  </div>
                )) : (
                  <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '2rem' }}>No FAQs found.</p>
                )}
             </div>
          </div>
        )}

        {/* =============== TICKETS TAB =============== */}
        {activeTab === 'tickets' && (
          <div className="animate-fade-in">
             
             {/* Ticket History */}
             {myTickets.length > 0 && (
               <div style={{ marginBottom: '2.5rem' }}>
                 <h3 style={{ fontSize: '1.0625rem', fontWeight: '600', marginBottom: '1rem' }}>My Tickets</h3>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {myTickets.map(ticket => (
                       <div key={ticket.id} className="glass-card" style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                             <h4 style={{ fontSize: '0.9375rem', fontWeight: '600', margin: '0 0 0.25rem 0' }}>{ticket.title}</h4>
                             <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>{ticket.id} • {ticket.date}</p>
                          </div>
                          <div style={{ 
                            padding: '0.375rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600',
                            background: ticket.status === 'Resolved' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                            color: ticket.status === 'Resolved' ? 'var(--success)' : 'var(--warning)'
                          }}>
                            {ticket.status}
                          </div>
                       </div>
                    ))}
                 </div>
               </div>
             )}

             {/* Report Issue Form */}
             <div>
                <h3 style={{ fontSize: '1.0625rem', fontWeight: '600', marginBottom: '1rem' }}>Report an Issue</h3>
                <form onSubmit={submitTicket} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                   
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                     <label style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Issue Category</label>
                     <div className="glass-card" style={{ padding: '0.875rem 1rem', display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.2)' }}>
                        <select 
                          value={ticketIssue} 
                          onChange={(e) => setTicketIssue(e.target.value)}
                          style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', width: '100%', fontSize: '0.9375rem', appearance: 'none' }}
                        >
                           <option value="data" style={{ color: '#000' }}>Data Purchase Issue</option>
                           <option value="payment" style={{ color: '#000' }}>Payment / Wallet Funding</option>
                           <option value="account" style={{ color: '#000' }}>Account Settings / Login</option>
                           <option value="other" style={{ color: '#000' }}>Other Problem</option>
                        </select>
                     </div>
                   </div>

                   <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                     <label style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Description</label>
                     <div className="glass-card" style={{ padding: '0.875rem 1rem', background: 'rgba(0,0,0,0.2)' }}>
                        <textarea 
                          placeholder="Please describe the issue in detail..." 
                          value={ticketDesc}
                          onChange={(e) => setTicketDesc(e.target.value)}
                          style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', width: '100%', minHeight: '100px', fontSize: '0.9375rem', resize: 'none' }} 
                          required
                        />
                     </div>
                   </div>

                   <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                     <label style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Attachment (Optional)</label>
                     <div style={{ 
                        border: '2px dashed var(--glass-border)', borderRadius: '16px', padding: '1.5rem', 
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer',
                        background: 'rgba(255,255,255,0.02)'
                     }}>
                        <UploadCloud size={24} color="var(--text-secondary)" />
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Upload Screenshot</span>
                     </div>
                   </div>

                   <button 
                      type="submit"
                      style={{ 
                         marginTop: '0.5rem', background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
                         color: '#fff', border: 'none', borderRadius: '16px', padding: '1rem',
                         fontSize: '1rem', fontWeight: '600', cursor: 'pointer', transition: 'opacity 0.2s',
                         boxShadow: '0 4px 20px rgba(62, 174, 255, 0.3)'
                      }}
                   >
                     Submit Ticket
                   </button>
                </form>
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Support;
