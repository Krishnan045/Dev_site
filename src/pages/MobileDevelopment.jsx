import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, 
  Tablet, 
  Cpu, 
  Fingerprint, 
  Cloud, 
  WifiOff, 
  Gauge,
  Share2,
  ArrowRight,
  Code2,
  SmartphoneNfc,
  Layers,
  Layout,
  Rocket,
  ShieldCheck,
  Zap,
  Plus,
  Minus,
  Globe,
  Settings,
  Monitor,
  CheckCircle2,
  ListTodo,
  FileSearch,
  Palette,
  Binary,
  TestTube2,
  UploadCloud,
  HeartHandshake
} from 'lucide-react';
import mobileDevImg from '../images/mobile_dev.png';

const MobileDevelopment = ({ setActivePage }) => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const scrollToProcess = () => {
    const element = document.getElementById('development-process');
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const appTypes = [
    { title: "Native Applications", desc: "Native apps are written for specific operating systems like Android or iOS and can hence offer superior user experience by taking advantage of system features.", icon: <Smartphone className="text-mild-blue" /> },
    { title: "Hybrid Applications", desc: "Hybrid apps are primarily developed using HTML5, CSS3 and JavaScript and the main difference is that they reside on a web server.", icon: <Layers className="text-mild-blue" /> },
    { title: "Progressive Applications", desc: "Progressive web apps combine the best of both web and app. Users don't need to install an app and the app loads lightning fast on a browser.", icon: <Globe className="text-mild-blue" /> }
  ];

  return (
    <div className="mobile-dev-premium">
      {/* Hero Section */}
      <section className="cartoon-hero-fixed">
        <div className="container-full">
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="hero-main-illustration"
          >
            <motion.img 
              src={mobileDevImg} 
              alt="Mobile Development Illustration" 
              className="cartoon-img"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </section>

      {/* App Types Section */}
      <section className="app-types-section reveal fade-up">
        <div className="container">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="section-header-centered"
          >
            <h2>Mobile App Development <span className="text-mild-blue">Types</span></h2>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="app-types-grid"
          >
            {appTypes.map((type, i) => (
              <motion.div key={i} variants={fadeInUp} className="type-card">
                <div className="type-icon-box">{type.icon}</div>
                <h3>{type.title}</h3>
                <p>{type.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Grow Your Business Section */}
      <section className="info-section-white reveal fade-up">
        <div className="container">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="info-flex"
          >
            <div className="info-visual">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" alt="Grow Your Business" />
            </div>
            <div className="info-text">
              <span className="info-tag">Increase Your Website Traffic And Sales</span>
              <h2>How Our Experts Can Help You <span className="text-mild-blue">To Grow Your Business</span></h2>
              <p>We at DevSpectra Technologies don't just design web pages, but we communicate with the customers to suggest the best suite and apt design for their business. It will enhance the business further. The easily navigable and user friendly website we design will drive traffic to your site and also to your organization.</p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cta-btn-green"
                onClick={() => setActivePage('quote')}
              >
                CREATE WEBSITE
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Top Grade Solutions Section */}
      <section className="info-section-white border-top reveal fade-up">
        <div className="container">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="info-flex"
          >
            <div className="info-text">
              <span className="info-tag">The DevSpectra edge in app development</span>
              <h2>Top-Grade Mobile <span className="text-mild-blue">Solutions</span></h2>
              <p>In the age of digitization, your online presence is what that makes you stand out of the queue. The technology which you are using must be reliable and convenient so that you can get the best out of the online world.</p>
              <ul className="info-list">
                {["Proven expertise in developing apps", "Focus on user experience design", "Dedicated team for each project", "Efficient quality assurance team", "App promotion and marketing", "Fast and efficient support service"].map((text, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle2 size={16} className="text-mild-blue" /> {text}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="info-visual">
              <img src="https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800" alt="Mobile Solutions" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Operating Systems Section */}
      <section className="info-section-white bg-soft reveal fade-up">
        <div className="container">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="info-flex reverse"
          >
            <div className="info-text">
              <span className="info-tag">App operating systems we work on</span>
              <h2>Operating system <span className="text-mild-blue">Development</span></h2>
              <p>DevSpectra Technologies works on the technology of different operating systems, where our app developers can invent unique ideas. We offer a wide range of services and have the expert team of app developers.</p>
              
              <div className="accordion-container">
                {[
                  { t: "Android Apps Development", d: "We create high-performance Android applications tailored for the vast Android ecosystem." },
                  { t: "iPhone App Development", d: "Expert iOS development using Swift and SwiftUI for premium Apple experiences." },
                  { t: "Windows Apps Development", d: "Robust Windows mobile applications for enterprise and personal use." }
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeInUp} className="accordion-item">
                    <button className="accordion-header" onClick={() => toggleAccordion(i)}>
                      {item.t} {activeAccordion === i ? <Minus size={18} /> : <Plus size={18} />}
                    </button>
                    <AnimatePresence>
                      {activeAccordion === i && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="accordion-body"
                        >
                          <p>{item.d}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="info-visual">
              <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800" alt="OS Development" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Development Process Section */}
      <section id="development-process" className="process-section-white reveal fade-up">
        <div className="container">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="section-header-centered"
          >
            <span className="info-tag">Step by Step Guide</span>
            <h2>Our Mobile Development <span className="text-mild-blue">Process</span></h2>
            <p>We follow a structured, transparent, and result-oriented development lifecycle to ensure your app's success.</p>
          </motion.div>
 
          <div className="process-vertical-timeline">
            {[
              { title: "Requirement Discovery", desc: "Deep dive into your business needs, target audience, and project goals.", icon: <FileSearch />, color: "#818cf8" },
              { title: "Strategic Design", desc: "Creating intuitive UI/UX wireframes and high-fidelity mockups for approval.", icon: <Palette />, color: "#60a5fa" },
              { title: "Agile Development", desc: "Writing robust, clean code with regular updates and feature builds.", icon: <Binary />, color: "#2dd4bf" },
              { title: "Rigorous Testing", desc: "Comprehensive QA testing across multiple devices to ensure bug-free performance.", icon: <TestTube2 />, color: "#fbbf24" },
              { title: "App Launch", desc: "Smooth deployment to App Store and Google Play with complete support.", icon: <UploadCloud />, color: "#f87171" },
              { title: "Growth & Maintenance", desc: "Post-launch support, regular updates, and optimization for scaling.", icon: <HeartHandshake />, color: "#6366f1" }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="v-process-step"
              >
                <div className="step-connector">
                  <div className="step-circle" style={{ backgroundColor: step.color }}>
                    {step.icon}
                  </div>
                  {i < 5 && <div className="step-line" style={{ background: `linear-gradient(to bottom, ${step.color}, #e2e8f0)` }}></div>}
                </div>
                <div className="step-content">
                  <span className="step-number">Phase 0{i + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-on Services Section */}
      <section className="info-section-white reveal fade-up">
        <div className="container">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="info-flex"
          >
            <div className="info-visual">
              <img src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&q=80&w=800" alt="Add-on Services" />
            </div>
            <div className="info-text">
              <span className="info-tag">The DevSpectra edge in app development</span>
              <h2>Add - on Services <span className="text-mild-blue">provided by us</span></h2>
              <p>At DevSpectra Technologies you will be provided with many of the outstanding services which include reliability and efficiency hand in hand. The segments of our commands are –</p>
              <ul className="info-bullets">
                <li>Iconic app development is what prevailing in the market these days. We know when to utilize the exact technology and for which concerned person.</li>
                <li>We offer hybrid app development which has an efficient platform for hybrid Technology. Our efforts are to lure the development using mobile platforms.</li>
              </ul>
              <p className="mt-20">So, in order to get 100% visuality & optimization amalgamated with technical expertise why not choose DevSpectra Technologies.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final Info Sections */}
      <section className="info-section-white border-top reveal fade-up">
        <div className="container">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="info-flex"
          >
            <div className="info-text">
              <h2>Technology <span className="text-mild-blue">utilization</span></h2>
              <p>All your efforts and money is in vain if proper use of technology is not done with your application. DevSpectra believes in providing reliable services which are compatible with the new emerging technologies.</p>
              <p>Mobile app development is the need of this hour and we understand this fact. DevSpectra provides easily accessible technology which is efficient & promising.</p>
            </div>
            <div className="info-visual">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" alt="Tech Utilization" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="info-section-white bg-soft reveal fade-up">
        <div className="container">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="info-flex reverse"
          >
            <div className="info-text">
              <h2>Easily accessible <span className="text-mild-blue">content</span></h2>
              <p>DevSpectra is blessed with a team of experts who know to make out the best combinations of the frames, photos & colour. Our team of app developers works on the HTML5 application high technology and fulfils the needs of market.</p>
            </div>
            <div className="info-visual">
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" alt="Accessible Content" />
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        .mobile-dev-premium {
          background: #ffffff;
          color: #334155;
          font-family: 'Inter', sans-serif;
        }

        .text-mild-blue { color: #818cf8; }

        .cartoon-hero-fixed {
          background: #ffffff;
          padding: 0;
          margin: 0;
          width: 100%;
        }

        .hero-main-illustration {
          width: 100vw;
          overflow: hidden;
        }

        .cartoon-img {
          width: 100%;
          display: block;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .section-header-centered {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-header-centered h2 {
          font-size: clamp(24px, 4vw, 36px);
          font-weight: 800;
          margin-bottom: 15px;
          color: #1e293b;
        }

        .app-types-section {
          padding: 100px 0;
          background: #ffffff;
        }

        .app-types-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .type-card {
          background: #ffffff;
          padding: 40px 30px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
          border: 1px solid #f8fafc;
          transition: all 0.4s ease;
        }

        .type-card:hover {
          transform: translateY(-10px);
          border-color: #e0e7ff;
          box-shadow: 0 20px 40px rgba(129, 140, 248, 0.08);
        }

        .type-icon-box {
          margin-bottom: 25px;
          display: flex;
          justify-content: center;
        }

        .type-card h3 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 15px;
          color: #1e293b;
        }

        .type-card p {
          font-size: 15px;
          color: #64748b;
          line-height: 1.6;
        }

        .info-section-white {
          padding: 100px 0;
          background: #ffffff;
        }

        .bg-soft { background: #fbfcfe; }
        .border-top { border-top: 1px solid #f1f5f9; }

        .info-flex {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 100px;
          align-items: center;
        }

        .info-flex.reverse {
          direction: rtl;
        }

        .info-flex.reverse .info-text {
          direction: ltr;
        }

        .info-tag {
          font-size: 13px;
          font-weight: 800;
          color: #818cf8;
          text-transform: uppercase;
          margin-bottom: 15px;
          display: block;
          letter-spacing: 1px;
        }

        .info-text h2 {
          font-size: clamp(24px, 4vw, 32px);
          font-weight: 800;
          margin-bottom: 25px;
          line-height: 1.2;
          color: #1e293b;
        }

        .info-text p {
          font-size: 16px;
          color: #64748b;
          line-height: 1.8;
          margin-bottom: 30px;
        }

        .info-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          list-style: none;
        }

        .info-list li {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          font-weight: 600;
          color: #334155;
        }

        .info-bullets {
          list-style: none;
          padding-left: 0;
        }

        .info-bullets li {
          position: relative;
          padding-left: 25px;
          margin-bottom: 20px;
          font-size: 15px;
          color: #64748b;
          line-height: 1.6;
        }

        .info-bullets li::before {
          content: '▶';
          position: absolute;
          left: 0;
          top: 4px;
          font-size: 11px;
          color: #818cf8;
        }

        .info-visual img {
          width: 100%;
          border-radius: 20px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.04);
        }

        .cta-btn-green {
          background: #10b981;
          color: white;
          border: none;
          padding: 16px 40px;
          border-radius: 16px;
          font-weight: 800;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 20px rgba(16, 185, 129, 0.2);
        }

        .cta-btn-green:hover {
          background: #059669;
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(16, 185, 129, 0.3);
        }

        /* Process Timeline Styles */
        .process-section-white {
          padding: 120px 0;
          background: #ffffff;
        }

        .process-vertical-timeline {
          max-width: 800px;
          margin: 60px auto 0;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .v-process-step {
          display: flex;
          gap: 50px;
          min-height: 150px;
        }

        .step-connector {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 60px;
          flex-shrink: 0;
        }

        .step-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          z-index: 2;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }

        .step-circle svg {
          width: 28px;
          height: 28px;
        }

        .step-line {
          width: 4px;
          flex-grow: 1;
          margin: -5px 0;
          z-index: 1;
        }

        .step-content {
          padding-bottom: 60px;
          flex-grow: 1;
        }

        .step-number {
          font-size: 13px;
          font-weight: 800;
          color: #818cf8;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 10px;
          display: block;
        }

        .step-content h3 {
          font-size: 22px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 12px;
        }

        .step-content p {
          font-size: 16px;
          color: #64748b;
          line-height: 1.6;
          margin: 0;
        }

        .accordion-container {
          margin-top: 40px;
        }

        .accordion-item {
          border: 1px solid #f1f5f9;
          border-radius: 16px;
          margin-bottom: 15px;
          background: #ffffff;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .accordion-item:hover {
          border-color: #e0e7ff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.02);
        }

        .accordion-header {
          width: 100%;
          padding: 20px 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: none;
          border: none;
          font-size: 16px;
          font-weight: 700;
          color: #1e293b;
          cursor: pointer;
        }

        .accordion-body {
          padding: 0 25px 25px;
        }

        .accordion-body p {
          margin-bottom: 0;
          font-size: 15px;
          color: #64748b;
        }

        .mt-20 { margin-top: 20px; }

        @media (max-width: 992px) {
          .info-flex { grid-template-columns: 1fr; gap: 50px; }
          .info-flex.reverse { direction: ltr; }
          .app-types-grid { grid-template-columns: 1fr; }
          .info-list { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default MobileDevelopment;
