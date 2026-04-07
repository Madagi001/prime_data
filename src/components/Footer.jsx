import { Cpu, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <a href="#" className="logo">
                        <Cpu className="logo-icon" size={24} />
                        <span>CodeCrafters <span className="gradient-text">Hub</span></span>
                    </a>
                    <p>Innovating at the intersection of design and technology.</p>
                </div>

                <div className="footer-links">
                    <h4>Company</h4>
                    <a href="#services">Services</a>
                    <a href="#projects">Projects</a>
                    <a href="#contact">Contact</a>
                </div>

                <div className="footer-social">
                    <h4>Social</h4>
                    <div className="social-icons">
                        <a href="#"><Twitter size={20} /></a>
                        <a href="#"><Github size={20} /></a>
                        <a href="#"><Linkedin size={20} /></a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} CodeCrafters Hub. All rights reserved.</p>
            </div>

            <style jsx>{`
        .footer {
          border-top: 1px solid var(--border-color);
          padding: 80px 20px 40px;
          background: rgba(3, 3, 11, 0.5);
        }
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 60px;
          margin-bottom: 60px;
        }
        .footer-brand p {
          color: var(--text-secondary);
          margin-top: 20px;
          max-width: 300px;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
        }
        .logo-icon {
          color: var(--primary-accent);
        }
        h4 {
          margin-bottom: 24px;
          color: var(--text-primary);
        }
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .footer-links a {
          color: var(--text-secondary);
        }
        .footer-links a:hover {
          color: var(--primary-accent);
        }
        .social-icons {
          display: flex;
          gap: 15px;
        }
        .social-icons a {
          width: 40px;
          height: 40px;
          background: var(--surface-color);
          border: 1px solid var(--border-color);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: var(--transition-smooth);
        }
        .social-icons a:hover {
          color: var(--primary-accent);
          border-color: var(--primary-accent);
          transform: translateY(-3px);
        }
        .footer-bottom {
          text-align: center;
          padding-top: 40px;
          border-top: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>
        </footer>
    );
};

export default Footer;
