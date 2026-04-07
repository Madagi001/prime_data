import { User, Award, Briefcase, GraduationCap, Code2 } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="section-header">
        <h2 className="gradient-text">About Me</h2>
        <p>Bringing technical excellence and creative vision to every digital challenge.</p>
      </div>

      <div className="about-container">
        <div className="about-visual reveal delay-1">
          <div className="photo-frame">
            <img src="/src/assets/founder_profile_1772720687261.png" alt="Founder" className="owner-photo" />
            <div className="frame-glow"></div>
          </div>
          <div className="experience-badge glass">
            <span className="years">5+</span>
            <span className="label">Years of Experience</span>
          </div>
        </div>

        <div className="about-content">
          <div className="bio-card glass">
            <h3>The Story Behind CodeCrafters Hub</h3>
            <p>
              I am a dedicated technology professional with a passion for building robust and scalable digital ecosystems.
              My journey started with a fascination for how systems interact, which led me to specialize in
              <strong> software development</strong>, <strong>data analysis</strong>, and <strong>machine learning</strong>.
            </p>
            <p>
              By combining technical rigors with a keen eye for <strong>design</strong> and a commitment to
              <strong> cybersecurity</strong>, I ensure that every solution I deliver is not only functional
              but also secure and user-centric.
            </p>
          </div>

          <div className="highlights-grid">
            <div className="highlight glass">
              <Code2 size={24} className="accent-icon" />
              <h4>Software Dev</h4>
              <p>Expertise in modern JavaScript frameworks and scalable backend architectures.</p>
            </div>
            <div className="highlight glass">
              <Award size={24} className="accent-icon" />
              <h4>Cybersecurity</h4>
              <p>Implementing enterprise-grade security protocols across all digital assets.</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about {
          padding-top: 100px;
          min-height: 80vh;
        }
        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }
        h2 {
          font-size: 3rem;
          margin-bottom: 16px;
          font-weight: 800;
        }
        .about-container {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 80px;
          align-items: center;
        }
        .about-visual {
          position: relative;
        }
        .photo-frame {
          position: relative;
          width: 100%;
          max-width: 450px;
          aspect-ratio: 4/5;
          border-radius: 24px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 1;
        }
        .owner-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .photo-frame:hover .owner-photo {
          transform: scale(1.05);
        }
        .frame-glow {
          position: absolute;
          inset: 0;
          box-shadow: inset 0 0 100px rgba(59, 130, 246, 0.2);
          pointer-events: none;
        }
        .experience-badge {
          position: absolute;
          bottom: -30px;
          right: -30px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 2;
          min-width: 140px;
        }
        .years {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--primary-accent);
          line-height: 1;
        }
        .label {
          font-size: 0.8rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 4px;
        }
        .about-content {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
        .bio-card {
          padding: 40px;
        }
        h3 {
          font-size: 1.8rem;
          margin-bottom: 20px;
          font-weight: 700;
        }
        .bio-card p {
          color: var(--text-secondary);
          font-size: 1.1rem;
          line-height: 1.8;
          margin-bottom: 20px;
        }
        strong {
          color: var(--text-primary);
          font-weight: 600;
        }
        .highlights-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .highlight {
          padding: 24px;
          text-align: left;
        }
        .accent-icon {
          color: var(--primary-accent);
          margin-bottom: 12px;
        }
        h4 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .highlight p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        @media (max-width: 968px) {
          .about-container {
            grid-template-columns: 1fr;
            gap: 60px;
          }
          .about-visual {
            max-width: 400px;
            margin: 0 auto;
          }
          .experience-badge {
            bottom: -20px;
            right: -20px;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
