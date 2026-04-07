import { Code2, Cpu, Globe, Zap, BarChart3, ShieldCheck } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Code2 size={32} />,
      title: 'Software Development',
      desc: 'Building scalable, high-performance applications with modern tech stacks and best practices.'
    },
    {
      icon: <BarChart3 size={32} />,
      title: 'Data Analysis',
      desc: 'Leveraging data to uncover insights, detect patterns, and drive informed business decisions.'
    },
    {
      icon: <Globe size={32} />,
      title: 'Design',
      desc: 'Creating intuitive, beautiful, and user-centric interfaces that deliver exceptional experiences.'
    },
    {
      icon: <Cpu size={32} />,
      title: 'Machine Learning',
      desc: 'Developing intelligent systems and predictive models to solve complex real-world problems.'
    },
    {
      icon: <ShieldCheck size={32} />,
      title: 'Cybersecurity',
      desc: 'Implementing robust security measures to protect data, networks, and digital infrastructure.'
    }
  ];

  return (
    <section id="services" className="services">
      <div className="section-header">
        <h2 className="gradient-text">Our Expertise</h2>
        <p>We leverage the latest technologies to solve complex problems and deliver exceptional value.</p>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className={`service-card glass reveal delay-${(index % 3) + 1}`}>
            <div className="icon-box">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .services {
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
          max-width: 600px;
          margin: 0 auto;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }
        .service-card {
          padding: 40px;
          transition: var(--transition-smooth);
        }
        .service-card:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.05);
          border-color: var(--primary-accent);
        }
        .icon-box {
          color: var(--primary-accent);
          margin-bottom: 24px;
        }
        h3 {
          font-size: 1.5rem;
          margin-bottom: 16px;
          font-weight: 700;
        }
        .service-card p {
          color: var(--text-secondary);
          font-size: 1rem;
        }
      `}</style>
    </section>
  );
};

export default Services;
