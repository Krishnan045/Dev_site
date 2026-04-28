import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Award, Users, Zap, ShieldCheck } from 'lucide-react';

const AboutUs = () => {
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
          background-image: linear-gradient(rgba(11, 19, 43, 0.8), rgba(11, 19, 43, 0.8)), url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200');
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
          color: #0b132b;
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
          background: #5e5ce6;
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
          border: 2px solid #5e5ce6;
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
          border-bottom-color: #5e5ce6;
          transform: translateY(-10px);
        }
        .value-card h3 {
          font-size: 22px;
          margin-bottom: 15px;
          color: #0b132b;
        }
        .value-card p {
          font-size: 14px;
          color: #64748b;
          line-height: 1.6;
        }
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
          color: #5e5ce6;
          margin-bottom: 25px;
        }
        .vm-card h3 {
          font-size: 28px;
          color: #0b132b;
          margin-bottom: 20px;
        }
        .vm-card p {
          font-size: 16px;
          color: #64748b;
          line-height: 1.8;
        }
        @media (max-width: 992px) {
          .story-grid, .vm-grid { grid-template-columns: 1fr; }
          .stats-grid, .values-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
          .about-hero-content h1 { font-size: 40px; }
        }
        @media (max-width: 576px) {
          .stats-grid, .values-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default AboutUs;
