import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Award, Users, Zap, ShieldCheck, ChevronRight } from 'lucide-react';

const AboutUs = () => {
  const [dynamicPortfolios, setDynamicPortfolios] = useState([]);
  const [dynamicStories, setDynamicStories] = useState([]);

  const defaultStories = [
    { client: "GlobalLogistics", result: "300% Growth", story: "We optimized their entire supply chain with a custom-built ERP system, resulting in a 40% reduction in operational overhead within 6 months and a massive increase in delivery throughput." },
    { client: "EcoRetail", result: "2.4M Users", story: "DevSpectra architected a high-traffic e-commerce ecosystem that maintained 99.99% uptime during their largest global sale event, handling 50k concurrent transactions per second." },
    { client: "HealthTech Inc", result: "90% Efficiency", story: "Implemented an AI-driven patient management system that reduced appointment scheduling friction by 90% and improved data security compliance to global standards." },
    { client: "FinBank Global", result: "Zero Security Breaches", story: "Secured their mobile banking infrastructure with multi-layered encryption and biometric authentication, protecting over $500M in daily transaction volume." }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, sRes] = await Promise.all([
          fetch('/api/public/portfolios').then(res => res.json()),
          fetch('/api/public/stories').then(res => res.json())
        ]);
        setDynamicPortfolios(Array.isArray(pRes) ? pRes : []);
        setDynamicStories(Array.isArray(sRes) ? sRes : []);
      } catch (err) {
        console.error("Failed to fetch page data", err);
      }
    };
    fetchData();

    const scrollTarget = sessionStorage.getItem('scrollTarget');
    if (scrollTarget === 'portfolio') {
      sessionStorage.removeItem('scrollTarget');
      setTimeout(() => {
        const el = document.getElementById('portfolio-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500); // Wait for page transition
    }
  }, []);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="about-hero-content"
          >
            <h1>Defining the Future of Digital Innovation</h1>
            <p>DevSpectra is more than a software house; we are your strategic partners in the digital age, dedicated to turning complex challenges into elegant solutions.</p>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section reveal fade-up">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="stats-grid"
          >
            {[
              { val: "10+", label: "Years of Excellence" },
              { val: "250+", label: "Projects Delivered" },
              { val: "150+", label: "Global Clients" },
              { val: "50+", label: "Expert Developers" }
            ].map((stat, i) => (
              <motion.div key={i} variants={itemVariants} className="stat-item">
                <h2 className="stat-value">{stat.val}</h2>
                <p className="stat-label">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Detailed Story Section */}
      <section className="story-section reveal fade-up">
        <div className="container">
          <div className="story-grid">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="story-text"
            >
              <h2 className="section-title">A Legacy of Innovation & Trust</h2>
              <div className="story-paragraphs">
                <p>
                  Founded on the principles of transparency and technical excellence, <strong>DevSpectra</strong> has evolved from a small tech hub into a premier global software solution provider. We believe that technology should empower, not complicate. This philosophy drives every line of code we write and every strategy we design.
                </p>
                <p>
                  Our expertise spans across multiple industries including FinTech, Healthcare, E-commerce, and Logistics. We don't just build apps; we build ecosystems that allow businesses to scale effortlessly and engage their customers more deeply than ever before.
                </p>

              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
              viewport={{ once: true }}
              className="story-image-wrapper"
            >
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" alt="DevSpectra Team Innovation" className="premium-story-img" />
              <div className="img-accent-border"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="values-section reveal fade-up">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="section-header-centered"
          >
            <h2>Our Core Values</h2>
            <p>The pillars that support our culture and guide our work every day.</p>
          </motion.div>
          <div className="values-grid">
            {[
              { title: "Innovation", desc: "Constantly pushing the boundaries of what's possible in technology." },
              { title: "Integrity", desc: "Honest communication and ethical practices in every partnership." },
              { title: "Quality", desc: "A relentless pursuit of perfection in every pixel and function." },
              { title: "Collaboration", desc: "Working as an extension of your team to achieve shared goals." }
            ].map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="value-card"
              >
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="about-process reveal fade-up">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="section-header-centered"
          >
            <span className="premium-tag">THE BLUEPRINT</span>
            <h2>Our Development <span className="text-gradient-emerald">Process</span></h2>
            <p>A rigorous, transparent methodology engineered for consistent excellence.</p>
          </motion.div>
          <div className="about-process-grid">
            {[
              { num: "01", title: "Strategic Discovery", desc: "We deep-dive into your business architecture to identify core opportunities, audit existing systems, and define technical roadmaps for scalable growth." },
              { num: "02", title: "Precision Design", desc: "Architecting intuitive user journeys through wireframing and high-fidelity 3D interfaces that resonate with your target audience and elevate brand authority." },
              { num: "03", title: "Agile Engineering", desc: "Developing robust, secure codebases using modern frameworks. We implement CI/CD pipelines and automated testing to ensure zero-downtime deployments." },
              { num: "04", title: "Seamless Delivery", desc: "Rigorous final-stage QA testing across all devices followed by a frictionless launch and proactive 24/7 post-launch monitoring and optimization." }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="about-process-card"
              >
                <div className="process-number">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="vision-mission reveal fade-up">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="vm-grid"
          >
            <motion.div variants={itemVariants} className="vm-card">
              <div className="vm-icon"><Target size={40} /></div>
              <h3>Our Mission</h3>
              <p>To architect world-class digital experiences that empower businesses to disrupt markets and create lasting impact through technological superiority.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="vm-card">
              <div className="vm-icon"><Eye size={40} /></div>
              <h3>Our Vision</h3>
              <p>To lead the global digital frontier, setting the standard for how technology and human creativity intersect to solve the world's most complex challenges.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        .about-hero {
          background-image: linear-gradient(rgba(2, 6, 23, 0.8), rgba(2, 6, 23, 0.8)), url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed;
          padding: 160px 0 100px;
          min-height: 450px;
          display: flex;
          align-items: center;
          color: white;
          text-align: center;
        }
        .about-hero-content h1 {
          font-size: 56px;
          margin-bottom: 25px;
          font-weight: 800;
          letter-spacing: -1px;
        }
        .about-hero-content p {
          font-size: 22px;
          opacity: 0.9;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.6;
        }
        .stats-section {
          padding: 60px 0;
          background: #d0dcdcff;
          color: black;
          margin-top: -50px;
          position: relative;
          z-index: 5;
          border-radius: 20px;
          width: 90%;
          margin-left: auto;
          margin-right: auto;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          text-align: center;
        }
        .stat-value {
          font-size: 42px;
          font-weight: 800;
          margin-bottom: 5px;
        }
        .stat-label {
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 1px;
          opacity: 0.8;
        }
        .story-section {
          padding: 120px 0;
          background: white;
          overflow: hidden;
        }
        .story-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 100px;
          align-items: center;
        }
        .section-title {
          font-size: 48px;
          color: #020617;
          margin-bottom: 35px;
          line-height: 1.2;
          font-weight: 800;
          position: relative;
        }
        .section-title::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -10px;
          width: 80px;
          height: 4px;
          background: #10b981;
          border-radius: 2px;
        }
        .story-paragraphs p {
          font-size: 18px;
          color: #475569;
          line-height: 1.9;
          margin-bottom: 25px;
          text-align: justify;
        }
        .story-image-wrapper {
          position: relative;
          z-index: 1;
        }
        .premium-story-img {
          width: 100%;
          border-radius: 40px;
          box-shadow: 0 40px 80px rgba(0,0,0,0.12);
          position: relative;
          z-index: 2;
        }
        .img-accent-border {
          position: absolute;
          top: -20px;
          right: -20px;
          width: 100%;
          height: 100%;
          border: 2px solid #10b981;
          border-radius: 40px;
          z-index: 0;
          opacity: 0.3;
        }
        .values-section {
          padding: 100px 0;
          background: #f1f5f9;
        }
        .values-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 25px;
        }
        .value-card {
          background: white;
          padding: 40px 30px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
          border-bottom: 4px solid transparent;
          transition: all 0.5s ease;
        }
        .value-card:hover {
          border-bottom-color: #10b981;
          transform: translateY(-10px);
        }
        .value-card h3 {
          font-size: 22px;
          margin-bottom: 15px;
          color: #020617;
        }
        .value-card p {
          font-size: 14px;
          color: #64748b;
          line-height: 1.6;
        }

        /* Our Process Styling */
        .about-process { padding: 120px 0; background: #f8fafc; color: #334155; text-align: center; }
        .about-process h2 { font-size: 42px; font-weight: 800; margin: 15px 0 25px; color: #020617; }
        .about-process-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px; margin-top: 60px; align-items: stretch; }
        .about-process-card { background: white; padding: 50px 35px; border-radius: 30px; border: 1px solid #e2e8f0; position: relative; overflow: hidden; display: flex; flex-direction: column; height: 100%; text-align: left; box-shadow: 0 10px 30px rgba(0,0,0,0.03); }
        .process-number { font-size: 50px; font-weight: 900; opacity: 0.1; position: absolute; top: 10px; right: 20px; color: #10b981; }
        .about-process-card h3 { font-size: 20px; margin-bottom: 15px; font-weight: 800; color: #020617; }
        .about-process-card p { font-size: 14px; color: #64748b; line-height: 1.7; margin: 0; }

        /* Portfolio Styling */
        .about-portfolio { padding: 120px 0; background: #f8fafc; text-align: center; }
        .about-portfolio h2 { font-size: 42px; font-weight: 800; margin: 15px 0 25px; color: #020617; }
        .about-portfolio-grid { 
          display: flex;
          gap: 25px; 
          margin-top: 60px; 
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          padding-bottom: 20px;
        }
        .about-portfolio-card {
          flex: 0 0 calc(25% - 18.75px);
          scroll-snap-align: start;
        }
        .about-portfolio-card { background: white; border-radius: 40px; overflow: hidden; box-shadow: 0 15px 40px rgba(0,0,0,0.05); text-align: left; transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); position: relative; }
        .about-portfolio-card:hover { transform: translateY(-15px); box-shadow: 0 30px 60px rgba(16, 185, 129, 0.15); }
        .portfolio-img-box { position: relative; width: 100%; aspect-ratio: 16/11; overflow: hidden; }
        .portfolio-img-box img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1); }
        .about-portfolio-card:hover .portfolio-img-box img { transform: scale(1.15); }
        .portfolio-badge { position: absolute; bottom: 20px; left: 20px; background: white; color: #020617; padding: 10px 25px; border-radius: 50px; font-size: 13px; font-weight: 700; box-shadow: 0 5px 15px rgba(0,0,0,0.1); z-index: 2; transition: all 0.3s ease; }
        .about-portfolio-card:hover .portfolio-badge { background: #10b981; color: white; transform: scale(1.05); }
        .portfolio-content { padding: 35px; }
        .portfolio-content h3 { font-size: 22px; font-weight: 800; color: #020617; margin-bottom: 15px; transition: color 0.3s; }
        .about-portfolio-card:hover .portfolio-content h3 { color: #10b981; }
        .portfolio-content p { font-size: 15px; color: #64748b; line-height: 1.6; margin-bottom: 25px; height: 48px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
        .view-project-link { display: flex; align-items: center; gap: 8px; color: #10b981; font-weight: 800; font-size: 15px; cursor: pointer; transition: all 0.3s ease; }
        .about-portfolio-card:hover .view-project-link { gap: 15px; color: #059669; }

        /* Success Stories Styling */
        .about-success { padding: 120px 0; background: white; text-align: center; }
        .about-success h2 { font-size: 42px; font-weight: 800; margin: 15px 0 25px; color: #020617; }
        .success-stories-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 60px; align-items: stretch; }
        .success-story-card { background: #f8fafc; padding: 60px; border-radius: 35px; position: relative; display: flex; flex-direction: column; height: 100%; text-align: left; transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); border: 1px solid transparent; }
        .success-story-card:hover { transform: translateY(-10px) scale(1.02); background: white; box-shadow: 0 20px 50px rgba(0,0,0,0.08); border-color: rgba(16, 185, 129, 0.1); }
        .success-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .success-header h3 { font-size: 24px; font-weight: 800; color: #020617; transition: color 0.3s; }
        .success-story-card:hover .success-header h3 { color: #10b981; }
        .success-stat { background: #10b981; color: white; padding: 8px 20px; border-radius: 50px; font-weight: 800; font-size: 14px; transition: all 0.3s; }
        .success-story-card:hover .success-stat { transform: scale(1.1); box-shadow: 0 5px 15px rgba(16, 185, 129, 0.3); }
        .success-story-card p { font-size: 16px; color: #475569; line-height: 1.8; font-style: italic; }
        .success-accent { position: absolute; bottom: 0; left: 60px; width: 60px; height: 5px; background: #e2e8f0; border-radius: 5px 5px 0 0; transition: all 0.5s ease; }
        .success-story-card:hover .success-accent { width: 150px; background: #10b981; }
        .vision-mission {
          padding: 120px 0;
          background: white;
        }
        .vm-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
        }
        .vm-card {
          background: #f8fafc;
          padding: 60px;
          border-radius: 25px;
          text-align: center;
        }
        .vm-icon {
          color: #10b981;
          margin-bottom: 25px;
        }
        .vm-card h3 {
          font-size: 28px;
          color: #020617;
          margin-bottom: 20px;
        }
        .vm-card p {
          font-size: 16px;
          color: #64748b;
          line-height: 1.8;
        }
        @media (max-width: 992px) {
          .about-portfolio-card {
            flex: 0 0 calc(50% - 12.5px);
          }
          .story-grid, .vm-grid, .about-process-grid, .success-stories-grid { grid-template-columns: 1fr; }
          .stats-grid, .values-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
          .about-hero-content h1 { font-size: 40px; }
        }
        @media (max-width: 768px) {
          .about-portfolio-card {
            flex: 0 0 100%;
          }
        }
        @media (max-width: 576px) {
          .stats-grid, .values-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default AboutUs;
