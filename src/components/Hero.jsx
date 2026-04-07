import { Rocket, ChevronRight, Github } from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="profile-container">
        <img src="/src/assets/profile.jpg" alt="Owner" className="profile-img" onError={(e) => e.target.style.display = 'none'} />
      </div>
      <div className="hero-content">
        <div className="badge">
          <Rocket size={16} />
          <span>Next-Gen Software Development</span>
        </div>
        <h1 className="reveal delay-1">
          Crafting the <span className="gradient-text">Future</span> <br />
          of Digital Solutions
        </h1>
        <p className="reveal delay-2">
          Specializing in software development, data analysis, design, machine learning, and cybersecurity to build secure, data-driven digital solutions.
        </p>
        <div className="hero-actions reveal delay-3">
          <a href="#projects" className="cta-btn primary">
            Explore Our Work <ChevronRight size={20} />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="cta-btn secondary">
            <Github size={20} /> View Github
          </a>
        </div>
      </div>

      <div className="hero-visual">
        <div className="glow-sphere"></div>
        <div className="glass-card main">
          <div className="code-header">
            <div className="dot red"></div>
            <div className="dot yellow"></div>
            <div className="dot green"></div>
          </div>
          <pre><code>{`function optimize(system) {
  return system.refine()
    .scale({ auto: true })
    .powerUp();
}`}</code></pre>
        </div>
        <div className="glass-card secondary">
          <div className="stat">1.2ms</div>
          <div className="label">Response Time</div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          align-items: center;
          gap: 60px;
          min-height: 90vh;
          padding-top: 120px;
          position: relative;
        }
        .profile-container {
          position: absolute;
          top: 0;
          right: 0;
          padding: 20px;
          margin: 20px;
          z-index: 10;
        }
        .profile-img {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          transition: transform 0.3s ease;
        }
        .profile-img:hover {
          transform: scale(1.05);
          border-color: var(--primary-accent);
        }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 30px;
          color: var(--primary-accent);
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 24px;
        }
        h1 {
          font-size: clamp(3rem, 8vw, 4.5rem);
          line-height: 1.1;
          margin-bottom: 24px;
          font-weight: 800;
        }
        p {
          font-size: 1.25rem;
          color: var(--text-secondary);
          margin-bottom: 40px;
          max-width: 540px;
        }
        .hero-actions {
          display: flex;
          gap: 20px;
        }
        .cta-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1.1rem;
        }
        .cta-btn.primary {
          background: var(--primary-accent);
          color: white;
        }
        .cta-btn.primary:hover {
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);
          transform: translateY(-3px);
        }
        .cta-btn.secondary {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
        }
        .cta-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        
        .hero-visual {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .glow-sphere {
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, var(--primary-accent) 0%, transparent 70%);
          opacity: 0.2;
          filter: blur(40px);
          animation: pulse 4s infinite alternate;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 24px;
          position: relative;
          z-index: 1;
        }
        .glass-card.main {
          width: 320px;
          transform: rotate(-5deg);
        }
        .glass-card.secondary {
          position: absolute;
          bottom: -20px;
          right: 20px;
          width: 160px;
          transform: rotate(10deg);
          text-align: center;
        }
        .code-header {
          display: flex;
          gap: 6px;
          margin-bottom: 15px;
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .red { background: #ff5f56; }
        .yellow { background: #ffbd2e; }
        .green { background: #27c93f; }
        pre {
          color: #94a3b8;
          font-family: 'Courier New', monospace;
          font-size: 0.9rem;
        }
        .stat {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--primary-accent);
        }
        .label {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.1; }
          100% { transform: scale(1.2); opacity: 0.3; }
        }

        @media (max-width: 968px) {
          .hero {
            grid-template-columns: 1fr;
            text-align: center;
            padding-top: 100px;
          }
          .badge, .hero-actions {
            justify-content: center;
          }
          p {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-visual {
            margin-top: 60px;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
