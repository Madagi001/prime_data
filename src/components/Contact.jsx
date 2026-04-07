import { Mail, Send } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="contact">
            <div className="contact-card glass">
                <div className="contact-info">
                    <h2 className="gradient-text">Let's Build Something Great</h2>
                    <p>
                        Have a project in mind? Looking for advanced technical consulting?
                        Reach out and let's discuss how we can help you scale.
                    </p>
                    <div className="contact-methods">
                        <div className="method">
                            <Mail className="icon" />
                            <span>abubakaradamumadagi@gmail.column</span>
                        </div>
                    </div>
                </div>

                <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <input type="text" placeholder="Your Name" required />
                    </div>
                    <div className="form-group">
                        <input type="email" placeholder="Your Email" required />
                    </div>
                    <div className="form-group">
                        <textarea placeholder="Tell us about your project" rows="4" required></textarea>
                    </div>
                    <button type="submit" className="cta-btn primary full">
                        Send Message <Send size={20} />
                    </button>
                </form>
            </div>

            <style jsx>{`
        .contact {
          padding-top: 100px;
          padding-bottom: 120px;
        }
        .contact-card {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
          padding: 60px;
        }
        h2 {
          font-size: 2.5rem;
          margin-bottom: 24px;
          font-weight: 800;
        }
        .contact-info p {
          color: var(--text-secondary);
          font-size: 1.1rem;
          margin-bottom: 40px;
        }
        .contact-methods {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .method {
          display: flex;
          align-items: center;
          gap: 15px;
          color: var(--text-primary);
        }
        .method .icon {
          color: var(--primary-accent);
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .form-group input, .form-group textarea {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 16px;
          color: white;
          font-family: inherit;
          font-size: 1rem;
          outline: none;
          transition: var(--transition-smooth);
        }
        .form-group input:focus, .form-group textarea:focus {
          border-color: var(--primary-accent);
          background: rgba(255, 255, 255, 0.08);
        }
        .cta-btn.full {
          width: 100%;
          justify-content: center;
        }
        @media (max-width: 868px) {
          .contact-card {
            grid-template-columns: 1fr;
            padding: 40px 20px;
          }
        }
      `}</style>
        </section>
    );
};

export default Contact;
