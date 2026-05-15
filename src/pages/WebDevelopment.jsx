import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Layout,
  Smartphone,
  Zap,
  ShieldCheck,
  Cpu,
  Code2,
  Layers,
  Monitor,
  Search,
  Rocket,
  HeartHandshake,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Plus,
  Minus,
  MessageSquare,
  FileCode,
  MousePointer2,
  Settings,
  Mail,
  ExternalLink,
  Database,
  Cloud,
  Lock,
  Gauge,
  Palette,
  Terminal,
  Store,
  AppWindow,
  Server,
  Star,
  Quote,
  HelpCircle
} from 'lucide-react';
import webDevImg from '../images/web_hero.png';

const WebDevelopment = ({ setActivePage }) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
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

  const [activeFaq, setActiveFaq] = useState(null);

  const services = [
    { title: "Frontend Development", desc: "We build responsive and innovative user interfaces using modern technologies.", tags: ["HTML", "CSS", "JavaScript", "React", "Vue.js"], icon: <Terminal className="icon-gradient-blue" />, color: "rgba(16, 185, 129, 0.1)" },
    { title: "Backend Development", desc: "We develop secure and scalable server-side applications and APIs.", tags: ["Node.js", "Python", "PHP", "Express"], icon: <Server className="icon-gradient-purple" />, color: "rgba(5, 150, 105, 0.1)" },
    { title: "Full Stack Development", desc: "End-to-end development of complete web solutions from start to finish.", tags: ["MERN Stack", "LAMP", "MEAN Stack"], icon: <Layers className="icon-gradient-indigo" />, color: "rgba(52, 211, 153, 0.1)" },
    { title: "E-commerce Development", desc: "We create powerful online stores to grow your business online.", tags: ["Shopify", "WooCommerce", "Custom Stores"], icon: <Store className="icon-gradient-emerald" />, color: "rgba(16, 185, 129, 0.1)" },
    { title: "CMS Development", desc: "We build and customize CMS websites that are easy to manage.", tags: ["WordPress", "Headless CMS", "Strapi"], icon: <AppWindow className="icon-gradient-amber" />, color: "rgba(245, 158, 11, 0.1)" },
    { title: "Web App Development", desc: "We build fast, secure and feature-rich web applications.", tags: ["SaaS", "Dashboards", "Custom Apps"], icon: <Monitor className="icon-gradient-rose" />, color: "rgba(16, 185, 129, 0.1)" }
  ];

  const technologies = [
    { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Angular", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
    { name: "Vue.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
    { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Express.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
    { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
    { name: "Tailwind", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" }
  ];

  const process = [
    { title: "Requirement Analysis", desc: "We understand your business goals and gather requirements.", icon: <Search />, color: "#10b981" },
    { title: "UI/UX Design", desc: "We create wireframes and stunning designs for best experience.", icon: <Palette />, color: "#059669" },
    { title: "Development", desc: "We write clean and efficient code to build your solution.", icon: <Code2 />, color: "#34d399" },
    { title: "Testing", desc: "We test thoroughly to ensure a bug-free performance.", icon: <ShieldCheck />, color: "#f59e0b" },
    { title: "Deployment", desc: "We deploy your website to the live environment.", icon: <Rocket />, color: "#10b981" },
    { title: "Maintenance", desc: "We provide ongoing support and regular updates.", icon: <HeartHandshake />, color: "#064e3b" }
  ];

  useEffect(() => {
    const target = sessionStorage.getItem('scrollTarget');
    if (target === 'portfolio') {
      setTimeout(() => {
        const el = document.getElementById('portfolio');
        if (el) {
          const offset = 100;
          const pos = el.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: pos, behavior: 'smooth' });
        }
        sessionStorage.removeItem('scrollTarget');
      }, 500);
    }
  }, []);

  const features = [
    { title: "Mobile Responsive", desc: "Looks perfect on all devices and screen sizes.", icon: <Smartphone />, color: "#10b981" },
    { title: "Fast Loading Speed", desc: "Optimized code and performance for speed.", icon: <Zap />, color: "#f59e0b" },
    { title: "SEO Optimized", desc: "Built with SEO best practices in mind.", icon: <Search />, color: "#34d399" },
    { title: "Secure & Reliable", desc: "Security and data protection is our priority.", icon: <Lock />, color: "#10b981" },
    { title: "Scalable Solutions", desc: "Solutions that grow with your business.", icon: <Layers />, color: "#059669" }
  ];


  const testimonials = [
    { name: "John Doe", role: "CEO, TechFlow", comment: "DevSpectra delivered our SaaS platform ahead of schedule with exceptional quality. Their technical depth is unmatched.", stars: 5 },
    { name: "Sarah Smith", role: "Marketing Director, LuxeHome", comment: "The e-commerce store they built for us saw a 40% increase in conversion within the first month. Highly recommended!", stars: 5 },
    { name: "Michael Chen", role: "Founder, GreenGrid", comment: "A truly professional team that understands both business goals and technical constraints perfectly.", stars: 5 }
  ];

  const [dynamicServices, setDynamicServices] = useState([]);
  const [dynamicProjects, setDynamicProjects] = useState([]);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const [sRes, pRes] = await Promise.all([
          fetch('/api/public/services').then(res => res.json()),
          fetch('/api/public/portfolios').then(res => res.json())
        ]);
        setDynamicServices(Array.isArray(sRes) ? sRes.filter(s => s.category === 'Web Development') : []);
        setDynamicProjects(Array.isArray(pRes) ? pRes.filter(p => 
          p.category?.toLowerCase() === 'web development' || 
          p.category?.toLowerCase().includes('web') || 
          p.category?.toLowerCase().includes('development')
        ) : []);
      } catch (err) {
        console.error("Failed to fetch page data", err);
      }
    };
    fetchPageData();
  }, []);

  const faqs = [
    { q: "How long does a typical web project take?", a: "Most projects take between 4-12 weeks depending on complexity. A simple business site is faster, while a full SaaS platform takes longer." },
    { q: "Will my website be mobile-friendly?", a: "Absolutely! Every site we build is mobile-first and fully responsive across all devices and screen sizes." },
    { q: "Do you offer post-launch support?", a: "Yes, we provide ongoing maintenance, security updates, and performance optimization to keep your site running smoothly." },
    { q: "Can you help with SEO and visibility?", a: "Our development process includes technical SEO best practices from the ground up to ensure high visibility on search engines." }
  ];

  return (
    <div className="web-dev-premium">
      {/* Professional Hero Section */}
      <section className="service-hero-v2 hero-theme-emerald">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="hero-content-v2"
          >
            <span className="hero-tagline" style={{ color: '#10b981', borderColor: '#10b981' }}>Web Excellence</span>
            <h1> High-Performance <br /><span className="text-gradient-emerald">Web Ecosystems</span></h1>
            <p>Scalable, secure, and stunning web solutions tailored for enterprise growth and user engagement.</p>
            <div className="hero-cta-group">
              <button className="btn-hero-primary" onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}>View Portfolio</button>
              <button className="btn-hero-outline" onClick={() => setActivePage('quote')}>Get a Quote</button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{
              opacity: 1,
              scale: [1, 1.02, 1],
              y: [0, -15, 0]
            }}
            transition={{
              opacity: { duration: 1.2 },
              scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            className="hero-visual-v2"
          >
            <div className="hero-shape-1"></div>
            <div className="hero-shape-2"></div>
            <img src={webDevImg} alt="Web Development" className="hero-main-img-v2" />
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-grid-section reveal fade-up">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="section-header-centered"
          >
            <span className="premium-tag">PREMIUM SOLUTIONS</span>
            <h2>Our Web Development <span className="text-gradient-indigo">Services</span></h2>
            <div className="title-underline"></div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="services-grid-new"
          >
            {(dynamicServices.length > 0 ? dynamicServices : []).filter(s => s.isActive !== false).map((s, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -10, boxShadow: "0 25px 50px rgba(0,0,0,0.06)" }}
                className="service-card-modern"
              >
                <div className="card-icon-wrapper" style={{ background: s.color || 'rgba(16, 185, 129, 0.1)' }}>
                  {typeof s.icon === 'string' ? <span style={{fontSize: '24px'}}>{s.icon}</span> : s.icon}
                </div>
                <h3>{s.title}</h3>
                <p>{s.description || s.desc}</p>
                <div className="tag-list">
                  {(Array.isArray(s.tags) ? s.tags : (s.tags ? s.tags.split(',') : (s.tags_list || ['Web Design', 'Development']))).map((tag, idx) => <span key={idx} className="tag-item">{tag.trim()}</span>)}
                </div>
                <div className="card-arrow-link"><ArrowRight size={16} /></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tech & Process Section */}
      <section className="tech-process-section reveal fade-up">
        <div className="container">
          <div className="grid-2-col">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="tech-box"
            >
              <span className="box-subheading">TOOLS & STACK</span>
              <h3>Technologies <span className="text-gradient-blue">We Use</span></h3>
              <div className="tech-icons-grid">
                {technologies.map((t, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.1, backgroundColor: "#ffffff", boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }}
                    className="tech-item-card"
                  >
                    <img src={t.logo} alt={t.name} className="tech-logo-img" />
                    <span className="tech-name-label">{t.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="process-box"
            >
              <span className="box-subheading">OUR METHODOLOGY</span>
              <h3>Our Development <span className="text-gradient-purple">Process</span></h3>
              <div className="process-tree-roadmap">
                <div className="tree-trunk"></div>
                {process.map((p, i) => (
                  <motion.div key={i} variants={fadeInUp} className="tree-node-item">
                    <div className="node-marker-wrapper">
                      <div className="node-pulse" style={{ background: p.color }}></div>
                      <div className="node-circle" style={{ background: p.color }}>
                        {p.icon}
                      </div>
                      <span className="node-step-tag">0{i + 1}</span>
                    </div>
                    <div className="node-content-box">
                      <h4>{p.title}</h4>
                      <p>{p.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="key-features-section reveal fade-up">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="section-header-centered"
          >
            <span className="premium-tag">WHY CHOOSE US</span>
            <h3>Key <span className="text-gradient-indigo">Features</span></h3>
            <div className="title-underline"></div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="features-row"
          >
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="feature-item-box"
              >
                <div className="f-icon-circle" style={{ color: f.color }}>
                  {f.icon}
                  <div className="f-icon-bg-glow" style={{ background: f.color }}></div>
                </div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section reveal fade-up">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="section-header-centered"
          >
            <span className="premium-tag">CLIENT FEEDBACK</span>
            <h3>What Our <span className="text-gradient-purple">Clients Say</span></h3>
            <div className="title-underline"></div>
          </motion.div>

          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <motion.div key={i} className="test-card" whileHover={{ y: -10 }}>
                <Quote className="quote-icon" />
                <p className="test-comment">"{t.comment}"</p>
                <div className="test-stars">
                  {[...Array(t.stars)].map((_, idx) => <Star key={idx} size={14} fill="#fbbf24" stroke="#fbbf24" />)}
                </div>
                <div className="test-author">
                  <h4>{t.name}</h4>
                  <span>{t.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Projects Section */}
      <section id="portfolio" className="recent-projects-section reveal fade-up">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="section-header-centered"
          >
            <span className="premium-tag">PORTFOLIO</span>
            <h3>Our Recent <span className="text-gradient-indigo">Projects</span></h3>
            <div className="title-underline"></div>
          </motion.div>

          <div className="infinite-carousel-container">
            <div className={`infinite-carousel-slider ${dynamicProjects.length <= 3 ? 'static-grid' : ''}`}>
              {(dynamicProjects.length > 3 ? [...dynamicProjects, ...dynamicProjects] : dynamicProjects).filter(p => p.isActive !== false).map((proj, i) => (
                <div
                  key={i}
                  className="project-card-new"
                >
                  <div className="proj-img-box">
                    <img src={proj.imageUrl || proj.img} alt={proj.title} />
                    <div className="proj-overlay-gradient"></div>
                    <span className="proj-cat" style={{ borderLeft: `4px solid ${proj.color || '#10b981'}` }}>{proj.category}</span>
                  </div>
                  <div className="proj-content">
                    <h4>{proj.title}</h4>
                    <p>{proj.description || proj.desc}</p>
                    <a
                      href={proj.link || "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="view-proj-link"
                      style={{ color: proj.color || '#10b981' }}
                    >
                      View Project <ChevronRight size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section reveal fade-up">
        <div className="container">
          <div className="faq-flex">
            <div className="faq-left">
              <span className="premium-tag">FAQS</span>
              <h3>Common <span className="text-gradient-blue">Questions</span></h3>
              <p>Everything you need to know about our web development process and services.</p>
              <div className="faq-illustration-small">
                <HelpCircle size={100} strokeWidth={0.5} opacity={0.1} />
              </div>
            </div>
            <div className="faq-right">
              {faqs.map((faq, i) => (
                <div key={i} className={`faq-item-modern ${activeFaq === i ? 'active' : ''}`} onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                  <div className="faq-q">
                    <span>{faq.q}</span>
                    <Plus className={`faq-plus ${activeFaq === i ? 'rotate-45' : ''}`} />
                  </div>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="faq-a">
                        <p>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      <style>{`
        .web-dev-premium {
          background: #ffffff;
          font-family: 'Inter', sans-serif;
        }

        .text-gradient-indigo {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .text-gradient-blue {
          background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .text-gradient-purple {
          background: linear-gradient(135deg, #10b981 0%, #f59e0b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .section-header-centered {
          text-align: center;
          margin-bottom: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .premium-tag {
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 2px;
          color: #10b981;
          margin-bottom: 15px;
          display: block;
          text-transform: uppercase;
        }

        .section-header-centered h2, .section-header-centered h3 {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 900;
          color: #1e293b;
          letter-spacing: -1px;
          line-height: 1.1;
        }

        .title-underline {
          width: 80px;
          height: 6px;
          background: linear-gradient(90deg, #10b981, #059669);
          border-radius: 10px;
          margin-top: 25px;
        }

        /* Hero */
        .cartoon-hero-fixed {
          background: #f8fafc;
          width: 100%;
          padding-top: 20px;
        }
        .hero-main-illustration {
          width: 100%;
          display: flex;
          justify-content: center;
        }
        .cartoon-img {
          width: 100%;
          max-height: 85vh;
          object-fit: cover;
          display: block;
        }

        /* Services Grid */
        .services-grid-section { padding: 120px 0; background: #ffffff; }
        .services-grid-new {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 35px;
        }
        .service-card-modern {
          padding: 30px 25px;
          background: #ffffff;
          border-radius: 24px;
          border: 1px solid #f1f5f9;
          position: relative;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: center;
        }
        .card-icon-wrapper {
          width: 54px;
          height: 54px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }
        .card-icon-wrapper svg { width: 24px; height: 24px; }
        .icon-gradient-blue { color: #10b981; }
        .icon-gradient-purple { color: #059669; }
        .icon-gradient-indigo { color: #34d399; }
        .icon-gradient-emerald { color: #059669; }
        .icon-gradient-amber { color: #f59e0b; }
        .icon-gradient-rose { color: #10b981; }

        .service-card-modern h3 { font-size: 19px; margin-bottom: 12px; font-weight: 800; color: #1e293b; }
        .service-card-modern p { font-size: 13.5px; color: #64748b; margin-bottom: 18px; line-height: 1.6; }
        .tag-list { display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; }
        .tag-item { font-size: 10px; font-weight: 700; color: #475569; background: #f1f5f9; padding: 4px 10px; border-radius: 20px; }
        .card-arrow-link { margin-top: 20px; color: #cbd5e1; transition: 0.3s; }
        .service-card-modern:hover .card-arrow-link { color: #10b981; transform: translateX(5px); }

        /* Tech & Process */
        .tech-process-section { padding: 120px 0; background: #fbfcfe; border-radius: 60px; margin: 0 20px; }
        .grid-2-col { display: grid; grid-template-columns: 1fr 1.1fr; gap: 100px; }
        .box-subheading { font-size: 12px; font-weight: 800; color: #94a3b8; display: block; margin-bottom: 10px; letter-spacing: 1px; }
        .tech-box h3, .process-box h3 { margin-bottom: 45px; font-size: 32px; font-weight: 900; }
        
        .tech-icons-grid { 
          display: grid; 
          grid-template-columns: repeat(5, 1fr); 
          gap: 15px; 
        }
        .tech-item-card { 
          min-height: 110px;
          background: white; 
          padding: 15px 10px; 
          border-radius: 20px; 
          border: 1px solid #f1f5f9; 
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.02);
          transition: 0.3s;
        }
        .tech-logo-img {
          width: 42px;
          height: 42px;
          object-fit: contain;
        }
        .tech-name-label {
          font-size: 11px;
          font-weight: 800;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .process-tree-roadmap { 
          position: relative;
          padding-left: 50px;
          display: flex; 
          flex-direction: column; 
          gap: 40px; 
        }
        .tree-trunk {
          position: absolute;
          left: 17px;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(to bottom, #10b981, #059669, #f59e0b);
          border-radius: 10px;
          opacity: 0.2;
        }
        .tree-node-item { 
          display: flex; 
          gap: 30px; 
          align-items: flex-start; 
          position: relative;
        }
        .node-marker-wrapper { 
          position: relative; 
          width: 36px; 
          flex-shrink: 0; 
          display: flex; 
          flex-direction: column; 
          align-items: center; 
        }
        .node-circle { 
          width: 36px; 
          height: 36px; 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          color: white;
          z-index: 5;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .node-circle svg { width: 18px; height: 18px; }
        .node-pulse {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          opacity: 0.3;
          animation: node-pulse-anim 2s infinite;
        }
        @keyframes node-pulse-anim {
          0% { scale: 1; opacity: 0.3; }
          100% { scale: 2; opacity: 0; }
        }
        .node-step-tag {
          position: absolute;
          right: 45px;
          top: 8px;
          font-size: 10px;
          font-weight: 900;
          color: #94a3b8;
          letter-spacing: 1px;
        }
        .node-content-box h4 { font-size: 19px; margin-bottom: 8px; font-weight: 800; color: #1e293b; }
        .node-content-box p { font-size: 14.5px; color: #64748b; margin: 0; line-height: 1.6; }

        /* Testimonials */
        .testimonials-section { padding: 120px 0; background: #ffffff; }
        .testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 35px; }
        .test-card { background: #f8fafc; padding: 50px 40px; border-radius: 32px; position: relative; }
        .quote-icon { position: absolute; top: 40px; right: 40px; opacity: 0.05; width: 60px; height: 60px; }
        .test-comment { font-size: 16px; font-style: italic; color: #334155; line-height: 1.8; margin-bottom: 25px; position: relative; z-index: 2; }
        .test-stars { display: flex; gap: 5px; margin-bottom: 20px; }
        .test-author h4 { font-size: 18px; font-weight: 800; color: #1e293b; margin: 0; }
        .test-author span { font-size: 14px; color: #64748b; }

        /* Features */
        .key-features-section { padding: 140px 0; }
        .features-row { display: grid; grid-template-columns: repeat(5, 1fr); gap: 30px; }
        .feature-item-box { text-align: center; background: #ffffff; padding: 40px 20px; border-radius: 30px; transition: 0.3s; }
        .feature-item-box:hover { background: #f8fafc; }
        .f-icon-circle { width: 80px; height: 80px; background: #ffffff; border-radius: 24px; margin: 0 auto 30px; display: flex; align-items: center; justify-content: center; position: relative; box-shadow: 0 15px 30px rgba(0,0,0,0.04); }
        .f-icon-bg-glow { position: absolute; inset: 0; opacity: 0.1; filter: blur(15px); border-radius: inherit; }
        .feature-item-box h4 { font-size: 17px; margin-bottom: 12px; font-weight: 800; color: #1e293b; }
        .feature-item-box p { font-size: 14px; color: #64748b; line-height: 1.6; }

        /* Projects */
        .recent-projects-section { padding: 140px 0; background: #f1f5f9; border-radius: 60px 60px 0 0; }
        .projects-grid-modern { display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px; }
        .project-card-new { background: white; border-radius: 32px; overflow: hidden; box-shadow: 0 15px 45px rgba(0,0,0,0.04); transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
        .proj-img-box { position: relative; height: 240px; overflow: hidden; }
        .proj-img-box img { width: 100%; height: 100%; object-fit: cover; transition: 0.7s; }
        .project-card-new:hover .proj-img-box img { scale: 1.1; }
        .proj-overlay-gradient { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6) 100%); opacity: 0; transition: 0.5s; }
        .project-card-new:hover .proj-overlay-gradient { opacity: 1; }
        .proj-cat { position: absolute; bottom: 20px; left: 20px; background: white; padding: 6px 16px; border-radius: 12px; font-size: 11px; font-weight: 800; color: #1e293b; box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
        .proj-content { padding: 35px; }
        .proj-content h4 { font-size: 20px; margin-bottom: 12px; font-weight: 800; color: #1e293b; }
        .proj-content p { font-size: 14px; color: #64748b; line-height: 1.7; margin-bottom: 25px; min-height: 48px; }
        .view-proj-link { font-size: 14px; font-weight: 800; text-decoration: none; display: flex; align-items: center; gap: 8px; transition: 0.3s; }

        /* FAQ */
        .faq-section { padding: 120px 0; background: #ffffff; }
        .faq-flex { display: grid; grid-template-columns: 1fr 1.5fr; gap: 80px; }
        .faq-left h3 { font-size: 36px; font-weight: 900; margin: 15px 0 25px; }
        .faq-left p { color: #64748b; font-size: 18px; line-height: 1.7; }
        .faq-right { display: flex; flex-direction: column; gap: 15px; }
        .faq-item-modern { background: #f8fafc; border-radius: 20px; padding: 25px 30px; cursor: pointer; transition: 0.3s; }
        .faq-item-modern.active { background: #ffffff; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid #f1f5f9; }
        .faq-q { display: flex; justify-content: space-between; align-items: center; }
        .faq-q span { font-size: 17px; font-weight: 800; color: #1e293b; }
        .faq-plus { color: #10b981; transition: 0.4s; }
        .rotate-45 { transform: rotate(45deg); }
        .faq-a { padding-top: 20px; overflow: hidden; }
        .faq-a p { color: #64748b; font-size: 15px; line-height: 1.8; margin: 0; }

        /* Final CTA */
        .final-cta-premium { padding: 100px 0; background: #020617; color: white; position: relative; overflow: hidden; }
        .cta-flex-row { display: flex; justify-content: space-between; align-items: center; position: relative; z-index: 10; }
        .cta-left { display: flex; align-items: center; gap: 35px; }
        .cta-icon-box { display: flex; align-items: center; justify-content: center; position: relative; color: #10b981; }
        .cta-pulse-bg { display: none; }
        @keyframes pulse-cta { 0% { scale: 1; opacity: 0.2; } 100% { scale: 1.3; opacity: 0; } }
        .cta-text h2 { font-size: clamp(28px, 4vw, 42px); margin-bottom: 10px; font-weight: 900; letter-spacing: -1px; }
        .cta-text p { opacity: 0.7; font-size: 18px; margin: 0; font-weight: 500; }
        .cta-right-btns { display: flex; gap: 20px; }
        .btn-contact-premium { background: white; color: #020617; border: none; padding: 20px 45px; border-radius: 20px; font-weight: 800; cursor: pointer; font-size: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); }
        .btn-quote-premium { background: rgba(255,255,255,0.1); border: 2px solid rgba(255,255,255,0.2); color: white; padding: 18px 45px; border-radius: 20px; font-weight: 800; cursor: pointer; font-size: 16px; backdrop-filter: blur(10px); }

        @media (max-width: 1200px) {
          .services-grid-new { grid-template-columns: repeat(2, 1fr); }
          .projects-grid-modern { grid-template-columns: repeat(2, 1fr); }
          .features-row { grid-template-columns: repeat(3, 1fr); }
          .testimonials-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 992px) {
          .grid-2-col { grid-template-columns: 1fr; gap: 60px; }
          .faq-flex { grid-template-columns: 1fr; gap: 50px; }
          .cta-flex-row { flex-direction: column; gap: 60px; text-align: center; }
          .cta-left { flex-direction: column; }
          .container { padding: 0 25px; }
        }
        @media (max-width: 768px) {
          .services-grid-new { grid-template-columns: 1fr; }
          .features-row { grid-template-columns: repeat(2, 1fr); }
          .testimonials-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .projects-grid-modern { grid-template-columns: 1fr; }
          .features-row { grid-template-columns: 1fr; }
          .cta-right-btns { flex-direction: column; width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default WebDevelopment;
