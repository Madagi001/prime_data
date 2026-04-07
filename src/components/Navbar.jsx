import { useState, useEffect } from 'react';
import { Menu, X, Cpu, Code2, Rocket, Mail, Github, ExternalLink, ChevronRight } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#" className="logo">
          <Cpu className="logo-icon" />
          <span>CodeCrafters <span className="gradient-text">Hub</span></span>
        </a>

        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)}>
              {link.name}
            </a>
          ))}
          <a href="#contact" className="cta-btn small">Let's Talk</a>
        </div>

        <button className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 20px 0;
          transition: var(--transition-smooth);
        }
        .navbar.scrolled {
          padding: 12px 0;
          background: rgba(3, 3, 11, 0.8);
          backdrop-filter: var(--glass-blur);
          border-bottom: 1px solid var(--border-color);
        }
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
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
        .nav-links {
          display: flex;
          align-items: center;
          gap: 40px;
        }
        .nav-links a {
          color: var(--text-secondary);
          font-weight: 500;
          position: relative;
        }
        .nav-links a:hover {
          color: var(--text-primary);
        }
        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--primary-accent);
          transition: var(--transition-smooth);
        }
        .nav-links a:hover::after {
          width: 100%;
        }
        .cta-btn.small {
          background: linear-gradient(135deg, var(--primary-accent), var(--secondary-accent));
          padding: 8px 20px;
          border-radius: 30px;
          color: white;
          font-weight: 600;
        }
        .cta-btn.small:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
        }
        .mobile-toggle {
          display: none;
          background: none;
          color: var(--text-primary);
        }
        @media (max-width: 768px) {
          .nav-links {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: var(--bg-color);
            flex-direction: column;
            padding: 40px 20px;
            gap: 25px;
            border-bottom: 1px solid var(--border-color);
          }
          .nav-links.open {
            display: flex;
          }
          .mobile-toggle {
            display: block;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
