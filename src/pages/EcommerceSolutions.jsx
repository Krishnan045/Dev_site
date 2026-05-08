import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Store,
  ShoppingCart,
  CreditCard,
  ShieldCheck,
  Zap,
  Globe,
  Truck,
  BarChart3,
  Smartphone,
  Layers,
  Search,
  Rocket,
  HeartHandshake,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Plus,
  Minus,
  MessageSquare,
  Package,
  Users,
  Settings,
  Mail,
  ExternalLink,
  Database,
  Cloud,
  Lock,
  Gauge,
  Palette,
  Terminal,
  AppWindow,
  Server,
  Star,
  Quote,
  HelpCircle
} from 'lucide-react';
import ecommerceHeroImg from '../images/image copy 2.png';

const EcommerceSolutions = ({ setActivePage }) => {
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
    { title: "Custom B2C Stores", desc: "Tailored online shopping experiences designed to convert visitors into loyal customers.", tags: ["React", "Node.js", "Payment APIs"], icon: <ShoppingCart className="icon-gradient-amber" />, color: "rgba(245, 158, 11, 0.1)" },
    { title: "B2B Marketplaces", desc: "Complex multi-vendor platforms with advanced inventory and vendor management systems.", tags: ["Multi-vendor", "Wholesale", "Bulk Orders"], icon: <Layers className="icon-gradient-purple" />, color: "rgba(5, 150, 105, 0.1)" },
    { title: "Mobile Commerce", desc: "PWA and native mobile shopping apps for a seamless on-the-go purchasing experience.", tags: ["PWA", "iOS", "Android"], icon: <Smartphone className="icon-gradient-indigo" />, color: "rgba(52, 211, 153, 0.1)" },
    { title: "Payment Integration", desc: "Secure integration of global payment gateways including Stripe, PayPal, and more.", tags: ["Stripe", "PayPal", "PCI Compliance"], icon: <CreditCard className="icon-gradient-amber" />, color: "rgba(245, 158, 11, 0.1)" },
    { title: "Inventory Systems", desc: "Real-time sync between your online store and warehouse management software.", tags: ["Stock Sync", "Order Mgmt", "Automation"], icon: <Package className="icon-gradient-rose" />, color: "rgba(245, 158, 11, 0.1)" },
    { title: "E-commerce SEO", desc: "Data-driven optimization to ensure your products rank high on search engine results.", tags: ["Product SEO", "Rich Snippets", "Speed"], icon: <Search className="icon-gradient-blue" />, color: "rgba(245, 158, 11, 0.1)" }
  ];

  const platforms = [
    { name: "Shopify", logo: "https://cdn.worldvectorlogo.com/logos/shopify.svg" },
    { name: "WooCommerce", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/woocommerce/woocommerce-original.svg" },
    { name: "Magento", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/magento/magento-original.svg" },
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" }
  ];

  const process = [
    { title: "Strategy & Planning", desc: "We define your target audience, product range, and technical requirements.", icon: <BarChart3 />, color: "#10b981" },
    { title: "UI/UX Store Design", desc: "Creating high-converting, user-friendly layouts optimized for sales.", icon: <Palette />, color: "#059669" },
    { title: "Development & Build", desc: "Building your store with scalable architecture and clean code.", icon: <Terminal />, color: "#34d399" },
    { title: "Payment & Security", desc: "Implementing secure checkout and protecting customer data.", icon: <ShieldCheck />, color: "#f59e0b" },
    { title: "Testing & Launch", desc: "Rigorous QA testing across devices before going live.", icon: <Rocket />, color: "#10b981" },
    { title: "Growth & Support", desc: "Continuous monitoring and optimization for maximum ROI.", icon: <HeartHandshake />, color: "#064e3b" }
  ];

  const features = [
    { title: "Conversion Optimized", desc: "Designs focused on reducing cart abandonment.", icon: <Zap />, color: "#10b981" },
    { title: "Multi-Currency Support", desc: "Sell globally with automated currency conversion.", icon: <Globe />, color: "#f59e0b" },
    { title: "Real-time Analytics", desc: "Track sales, customers, and traffic in real-time.", icon: <BarChart3 />, color: "#34d399" },
    { title: "Secure Checkout", desc: "PCI DSS compliant payment processing solutions.", icon: <Lock />, color: "#10b981" },
    { title: "Inventory Automation", desc: "Never oversell with automated stock management.", icon: <Package />, color: "#059669" }
  ];

  const faqs = [
    { q: "Which e-commerce platform is best for my business?", a: "It depends on your needs. Shopify is great for ease of use, WooCommerce for flexibility, and custom React/Node.js solutions for high-scale enterprise needs." },
    { q: "How do you handle payment security?", a: "We implement industry-standard encryption and use PCI-compliant gateways like Stripe and PayPal to ensure all transactions are secure." },
    { q: "Can you migrate my existing store?", a: "Yes, we specialize in migrating data, products, and customers from platforms like Magento to Shopify or custom builds without data loss." },
    { q: "Do you provide training for store management?", a: "Absolutely. We provide full training on how to manage products, orders, and customer data once the store is live." }
  ];

  return (
    <div className="ecommerce-solutions-page">
      {/* Hero Section */}
      <section className="service-hero-v2 hero-theme-blue">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="hero-content-v2"
          >
            <span className="hero-tagline" style={{ color: '#60a5fa', borderColor: '#60a5fa' }}>Digital Storefront</span>
            <h1 style={{ color: 'white' }}> <span className="text-gradient-blue-v2">E-commerce Solutions</span></h1>
            <p style={{ color: 'rgba(255,255,255,0.8)' }}>Transforming your retail vision into a high-performance digital ecosystem with seamless user journeys and robust security.</p>



            <div className="hero-cta-group">
              <button className="btn-hero-primary btn-blue-v2" onClick={() => setActivePage('quote')}>Start Building</button>
              <button className="btn-hero-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }} onClick={() => { sessionStorage.setItem('scrollTarget', 'portfolio'); setActivePage('about'); }}>View Portfolio</button>
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
            <div className="hero-shape-1" style={{ background: 'rgba(37, 99, 235, 0.2)' }}></div>
            <div className="hero-shape-2" style={{ background: 'rgba(96, 165, 251, 0.1)' }}></div>
            <div className="hero-img-container" style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden' }}>
              <img
                src={ecommerceHeroImg}
                alt="Ecommerce Innovation"
                className="hero-main-img-v2"
                style={{
                  display: 'block',
                  width: '100%',
                  filter: 'grayscale(100%) brightness(0.7) sepia(100%) hue-rotate(190deg) saturate(400%)'
                }}
              />
              <div className="image-blue-overlay" style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(30, 58, 138, 0.2)',
                mixBlendMode: 'overlay',
                pointerEvents: 'none'
              }}></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-grid-section reveal fade-up">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="section-header-centered"
          >
            <span className="premium-tag">DIGITAL COMMERCE</span>
            <h2>Our E-commerce <span className="text-gradient-indigo">Specialties</span></h2>
            <div className="title-underline"></div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="services-grid-new"
          >
            {services.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -10, boxShadow: "0 25px 50px rgba(0,0,0,0.06)" }}
                className="service-card-modern"
              >
                <div className="card-icon-wrapper" style={{ background: s.color }}>
                  {s.icon}
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="tag-list">
                  {s.tags.map((tag, idx) => <span key={idx} className="tag-item">{tag}</span>)}
                </div>
                <div className="card-arrow-link"><ArrowRight size={16} /></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
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
              <span className="box-subheading">PLATFORMS & TECH</span>
              <h3>Expertise in <span className="text-gradient-blue">Modern Platforms</span></h3>
              <div className="tech-icons-grid">
                {platforms.map((t, i) => (
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
              <div className="custom-build-cta" style={{ marginTop: '40px' }}>
                <h4>Need a Custom Solution?</h4>
                <p>We build bespoke e-commerce engines from the ground up for unique business models.</p>
                <button className="quote-btn-mini" onClick={() => setActivePage('quote')}>Request Scoping</button>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="process-box"
            >
              <span className="box-subheading">ROADMAP TO SUCCESS</span>
              <h3>Our E-commerce <span className="text-gradient-purple">Workflow</span></h3>
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

      {/* Features Section */}
      <section className="key-features-section reveal fade-up">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="section-header-centered"
          >
            <span className="premium-tag">POWERFUL FEATURES</span>
            <h3>Engineered for <span className="text-gradient-indigo">High Growth</span></h3>
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

      {/* New Content Section: Global Commerce Excellence */}
      <section className="global-excellence-section reveal fade-up">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="section-header-centered"
          >
            <span className="premium-tag">GLOBAL REACH</span>
            <h2>Scaling Your Brand <span className="text-gradient-indigo">Without Boundaries</span></h2>
            <div className="title-underline"></div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="excellence-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '60px', marginTop: '60px' }}
          >
            <motion.div variants={fadeInUp} className="excellence-card" whileHover={{ y: -10 }}>
              <div className="excellence-icon" style={{ marginBottom: '20px', color: '#10b981' }}><Globe size={40} /></div>
              <h3>International Market Entry</h3>
              <p>Launch your storefront in multiple languages and currencies with automated tax calculation and regional compliance. Our solutions make global scaling effortless.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="excellence-card" whileHover={{ y: -10 }}>
              <div className="excellence-icon" style={{ marginBottom: '20px', color: '#10b981' }}><Zap size={40} /></div>
              <h3>Extreme Performance & Speed</h3>
              <p>Experience sub-second load times even during peak traffic events like Black Friday. We optimize every layer of your stack for maximum conversion rates.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="excellence-card" whileHover={{ y: -10 }}>
              <div className="excellence-icon" style={{ marginBottom: '20px', color: '#10b981' }}><ShieldCheck size={40} /></div>
              <h3>Rock-Solid Security</h3>
              <p>Protect your customers and your reputation with enterprise-grade security protocols, PCI DSS compliance, and proactive threat monitoring.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="excellence-card" whileHover={{ y: -10 }}>
              <div className="excellence-icon" style={{ marginBottom: '20px', color: '#10b981' }}><Layers size={40} /></div>
              <h3>Omnichannel Synchronization</h3>
              <p>Connect your online store with physical POS systems, social media marketplaces, and third-party logistics for a unified business view.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section reveal fade-up">
        <div className="container">
          <div className="faq-flex">
            <div className="faq-left">
              <span className="premium-tag">FAQS</span>
              <h3>Frequently Asked <span className="text-gradient-blue">Questions</span></h3>
              <p>Everything you need to know about our e-commerce development process.</p>
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

      {/* Final CTA */}
      <section className="final-cta-premium">
        <div className="container cta-flex-row">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="cta-left"
          >
            <div className="cta-icon-box">
              <Store size={36} className="text-white" />
              <div className="cta-pulse-bg"></div>
            </div>
            <div className="cta-text">
              <h2>Launch Your Online Store</h2>
              <p>Ready to dominate the digital marketplace? Let's build your success together.</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="cta-right-btns"
          >
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-contact-premium" onClick={() => setActivePage('contact')}>Contact Us</motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-quote-premium" onClick={() => setActivePage('quote')}>Get a Quote</motion.button>
          </motion.div>
        </div>
      </section>

      <style>{`
        .ecommerce-solutions-page {
          background: #ffffff;
          overflow-x: hidden;
          font-family: 'Inter', sans-serif;
        }

        .service-hero-v2 {
          padding: 140px 0 80px;
          position: relative;
          background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
          overflow: hidden;
          color: white;
        }

        section {
          padding: 80px 0;
        }
        
        .quote-btn-mini {
          background: #10b981;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.3s;
        }
        .quote-btn-mini:hover {
          background: #059669;
          transform: translateY(-2px);
        }

        .text-gradient-rose-v2 {
          background: linear-gradient(135deg, #e11d48 0%, #fb7185 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
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
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .btn-blue-v2 {
          background: linear-gradient(90deg, #2563eb, #3b82f6);
          box-shadow: 0 10px 30px rgba(37, 99, 235, 0.3);
        }
        .btn-blue-v2:hover {
          box-shadow: 0 15px 40px rgba(37, 99, 235, 0.5);
        }

        .container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .hero-perks-list {
          list-style: none;
          padding: 0;
          margin: 0 0 35px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .hero-perks-list li {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 15px;
          font-weight: 600;
          color: #475569;
        }

        .hero-perks-list li svg {
          color: #60a5fa;
        }

        .section-header-centered {
          text-align: center;
          margin-bottom: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .services-grid-section {
          padding-top: 60px;
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
        .icon-gradient-rose { color: #10b981; }

        .service-card-modern h3 { font-size: 19px; margin-bottom: 12px; font-weight: 800; color: #1e293b; }
        .service-card-modern p { font-size: 13.5px; color: #64748b; margin-bottom: 18px; line-height: 1.6; }
        .tag-list { display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; }
        .tag-item { font-size: 10px; font-weight: 700; color: #475569; background: #f1f5f9; padding: 4px 10px; border-radius: 20px; }
        .card-arrow-link { margin-top: 20px; color: #cbd5e1; transition: 0.3s; }
        .service-card-modern:hover .card-arrow-link { color: #10b981; transform: translateX(5px); }

        .box-subheading {
          font-size: 14px;
          font-weight: 900;
          letter-spacing: 2px;
          color: #10b981;
          margin-bottom: 12px;
          display: block;
          text-transform: uppercase;
        }

        .tech-box h3, .process-box h3 {
          margin-bottom: 40px;
        }

        .grid-2-col { display: grid; grid-template-columns: 1fr 1.1fr; gap: 100px; }
        .tech-icons-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
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
        .tech-logo-img { width: 42px; height: 42px; object-fit: contain; }
        .tech-name-label { font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; }

        .process-tree-roadmap { position: relative; padding-left: 50px; display: flex; flex-direction: column; gap: 40px; }
        .tree-trunk { position: absolute; left: 17px; top: 0; bottom: 0; width: 3px; background: linear-gradient(to bottom, #10b981, #059669, #34d399); border-radius: 10px; opacity: 0.2; }
        .tree-node-item { display: flex; gap: 30px; align-items: flex-start; position: relative; }
        .node-marker-wrapper { position: relative; width: 36px; flex-shrink: 0; display: flex; flex-direction: column; align-items: center; }
        .node-circle { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; z-index: 5; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
        .node-circle svg { width: 18px; height: 18px; }
        .node-pulse { position: absolute; inset: 0; border-radius: 50%; opacity: 0.3; animation: node-pulse-anim 2s infinite; }
        @keyframes node-pulse-anim { 0% { scale: 1; opacity: 0.3; } 100% { scale: 2; opacity: 0; } }
        .node-step-tag { position: absolute; right: 45px; top: 8px; font-size: 10px; font-weight: 900; color: #94a3b8; }
        .node-content-box h4 { font-size: 19px; margin-bottom: 8px; font-weight: 800; color: #1e293b; }
        .node-content-box p { font-size: 14.5px; color: #64748b; margin: 0; line-height: 1.6; }

        .features-row { display: grid; grid-template-columns: repeat(5, 1fr); gap: 30px; }
        .feature-item-box { text-align: center; background: #ffffff; padding: 40px 20px; border-radius: 30px; transition: 0.3s; }
        .f-icon-circle { width: 80px; height: 80px; background: #ffffff; border-radius: 24px; margin: 0 auto 30px; display: flex; align-items: center; justify-content: center; position: relative; box-shadow: 0 15px 30px rgba(0,0,0,0.04); }
        .f-icon-bg-glow { position: absolute; inset: 0; opacity: 0.1; filter: blur(15px); border-radius: inherit; }
        .feature-item-box h4 { font-size: 17px; margin-bottom: 12px; font-weight: 800; color: #1e293b; }
        .feature-item-box p { font-size: 14px; color: #64748b; line-height: 1.6; }

        .excellence-card h3 {
          font-size: 24px;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 15px;
        }

        .excellence-card p {
          color: #64748b;
          line-height: 1.7;
          font-size: 15.5px;
        }

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

        .final-cta-premium { padding: 60px 0 20px; background: #020617; color: white; position: relative; overflow: hidden; margin-bottom: -15px; border: none !important; z-index: 10; }
        .cta-flex-row { display: flex; justify-content: space-between; align-items: center; position: relative; z-index: 10; }
        .cta-left { display: flex; align-items: center; gap: 35px; }
        .cta-icon-box { width: 90px; height: 90px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 30px; display: flex; align-items: center; justify-content: center; position: relative; }
        .cta-pulse-bg { position: absolute; inset: -15px; background: #10b981; border-radius: inherit; opacity: 0.2; animation: pulse-cta 2s infinite; }
        @keyframes pulse-cta { 0% { scale: 1; opacity: 0.2; } 100% { scale: 1.3; opacity: 0; } }
        .cta-text h2 { font-size: clamp(28px, 4vw, 42px); margin-bottom: 10px; font-weight: 900; letter-spacing: -1px; }
        .cta-text p { opacity: 0.7; font-size: 18px; margin: 0; font-weight: 500; }
        .cta-right-btns { display: flex; gap: 20px; }
        .btn-contact-premium { background: white; color: #020617; border: none; padding: 20px 45px; border-radius: 20px; font-weight: 800; cursor: pointer; font-size: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); }
        .btn-quote-premium { background: rgba(255,255,255,0.1); border: 2px solid rgba(255,255,255,0.2); color: white; padding: 18px 45px; border-radius: 20px; font-weight: 800; cursor: pointer; font-size: 16px; backdrop-filter: blur(10px); }

        @media (max-width: 1200px) {
          .services-grid-new { grid-template-columns: repeat(2, 1fr); }
          .features-row { grid-template-columns: repeat(3, 1fr); }
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
        }
        @media (max-width: 480px) {
          .features-row { grid-template-columns: 1fr; }
          .cta-right-btns { flex-direction: column; width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default EcommerceSolutions;
