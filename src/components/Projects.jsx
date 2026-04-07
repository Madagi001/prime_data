import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Nexus Core Engine',
      category: 'Systems / Performance',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
      github: '#',
      demo: '#'
    },
    {
      title: 'Sentinel AI',
      category: 'Cybersecurity / ML',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
      github: '#',
      demo: '#'
    },
    {
      title: 'Aura Design System',
      category: 'Design / UX',
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800',
      github: '#',
      demo: '#'
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="section-header">
        <h2 className="gradient-text">Featured Projects</h2>
        <p>A glimpse into the complex systems we've engineered.</p>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className={`project-card glass overflow-hidden reveal delay-${(index % 3) + 1}`}>
            <div className="project-image">
              <img src={project.image} alt={project.title} />
              <div className="project-overlay">
                <div className="overlay-links">
                  <a href={project.github} className="icon-link"><Github /></a>
                  <a href={project.demo} className="icon-link"><ExternalLink /></a>
                </div>
              </div>
            </div>
            <div className="project-info">
              <span className="category">{project.category}</span>
              <h3>{project.title}</h3>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .projects {
          padding-top: 100px;
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
        .section-header p {
          color: var(--text-secondary);
          font-size: 1.1rem;
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
        }
        .project-card {
          padding: 0;
          overflow: hidden;
          transition: var(--transition-smooth);
        }
        .project-card:hover {
          transform: translateY(-10px);
          border-color: var(--primary-accent);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }
        .project-image {
          position: relative;
          height: 240px;
          overflow: hidden;
        }
        .project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-smooth);
        }
        .project-card:hover .project-image img {
          transform: scale(1.1);
        }
        .project-overlay {
          position: absolute;
          inset: 0;
          background: rgba(3, 3, 11, 0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: var(--transition-smooth);
        }
        .project-card:hover .project-overlay {
          opacity: 1;
        }
        .overlay-links {
          display: flex;
          gap: 20px;
        }
        .icon-link {
          width: 50px;
          height: 50px;
          background: var(--primary-accent);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          transform: translateY(20px);
          transition: var(--transition-smooth);
        }
        .project-card:hover .icon-link {
          transform: translateY(0);
        }
        .project-info {
          padding: 24px;
        }
        .category {
          font-size: 0.8rem;
          color: var(--primary-accent);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        h3 {
          font-size: 1.5rem;
          margin-top: 8px;
          font-weight: 700;
        }
      `}</style>
    </section>
  );
};

export default Projects;
