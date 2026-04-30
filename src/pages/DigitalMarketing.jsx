import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Search,
  Share2,
  MousePointerClick,
  FileText,
  Mail,
  BarChart3,
  TrendingUp,
  Target,
  Zap,
  Users,
  ChevronRight,
  Check,
  Plus,
  Minus,
  MessageSquare,
  Globe,
  PieChart,
  ShieldCheck,
  BarChart,
  ChevronDown
} from 'lucide-react';
import digitalImg from 'C:/Users/KRISHNAKUMAR P/.gemini/antigravity/brain/eae43536-d91e-452e-84bb-dc649d8dfc83/marketing_hero_teal_themed_1777540496613.png';

const Counter = ({ value, suffix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value);
      if (start === end) return;

      let totalMiliseconds = duration * 1000;
      let incrementTime = Math.max(totalMiliseconds / end, 10);

      let timer = setInterval(() => {
        start += Math.ceil(end / (duration * 60));
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`faq-item ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
      <div className="faq-question">
        <span>{question}</span>
        {isOpen ? <Minus size={20} /> : <Plus size={20} />}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="faq-answer"
          >
            <p>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DigitalMarketing = ({ setActivePage }) => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      title: "Advanced SEO",
      desc: "Dominate search rankings with AI-powered keyword analysis and technical optimization.",
      icon: <Search className="w-8 h-8" />,
      color: "#10b981"
    },
    {
      title: "Social Growth",
      desc: "Viral content strategies and community management across Instagram, LinkedIn & TikTok.",
      icon: <Share2 className="w-8 h-8" />,
      color: "#34d399"
    },
    {
      title: "Performance Ads",
      desc: "High-ROI PPC campaigns on Google and Meta with precise demographic targeting.",
      icon: <MousePointerClick className="w-8 h-8" />,
      color: "#f59e0b"
    },
    {
      title: "Content Studio",
      desc: "Premium video, graphics, and copy that converts cold leads into loyal customers.",
      icon: <FileText className="w-8 h-8" />,
      color: "#10b981"
    },
    {
      title: "Email Funnels",
      desc: "Automated behavior-based email sequences that drive 24/7 revenue on autopilot.",
      icon: <Mail className="w-8 h-8" />,
      color: "#059669"
    },
    {
      title: "Growth Analytics",
      desc: "Unified dashboards tracking multi-channel attribution and customer lifetime value.",
      icon: <BarChart3 className="w-8 h-8" />,
      color: "#f59e0b"
    }
  ];

  const packages = [
    {
      name: "Starter Growth",
      price: "999",
      features: ["Social Media Management", "Basic SEO Optimization", "Monthly Report", "Email Support"],
      isPopular: false
    },
    {
      name: "Business Pro",
      price: "2499",
      features: ["All Starter Features", "PPC Ad Management", "Content Marketing (4 blogs)", "Priority Support", "Bi-weekly Strategy Calls"],
      isPopular: true
    },
    {
      name: "Enterprise",
      price: "4999",
      features: ["Custom Strategy", "Full Funnel Automation", "Influencer Marketing", "Dedicated Manager", "24/7 Monitoring"],
      isPopular: false
    }
  ];

  return (
    <div className="marketing-page">
      {/* Professional Hero Section */}
      <section className="service-hero-v2 hero-theme-teal">
        <div className="container">
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
            <img src={digitalImg} alt="Digital Marketing" className="hero-main-img-v2" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="hero-content-v2"
          >
            <span className="hero-tagline" style={{ color: '#2dd4bf', borderColor: '#2dd4bf' }}>Growth Engine</span>
            <h1>Data-Driven <br /><span className="text-gradient-teal-v2">Digital Dominance</span></h1>
            <p>Scaling your brand with precision-targeted campaigns and high-ROI marketing strategies that convert.</p>
            <div className="hero-cta-group">
              <button className="btn-hero-primary btn-teal" onClick={() => { sessionStorage.setItem('scrollTarget', 'portfolio'); setActivePage('about'); }}>View Portfolio</button>
              <button className="btn-hero-outline" onClick={() => setActivePage('quote')}>Get Started</button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="marketing-services-v2">
        <div className="container">
          <div className="section-head reveal fade-up">
            <span className="subtitle">Expertise</span>
            <h2>Full-Funnel Solutions</h2>
            <p>From awareness to advocacy, we handle every stage of your customer journey.</p>
          </div>
          <div className="services-grid-v2">
            {services.map((s, i) => (
              <div key={i} className="service-card-premium reveal fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="icon-box" style={{ background: `${s.color}15`, color: s.color }}>
                  {s.icon}
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <ul className="service-features-list">
                  <li><Check size={14} /> AI-driven targeting</li>
                  <li><Check size={14} /> Weekly optimization</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="metrics-banner">
        <div className="container metrics-grid">
          <div className="metric-box reveal fade-up">
            <div className="metric-value"><Counter value="150" suffix="M+" /></div>
            <p>Ad Spend Managed</p>
          </div>
          <div className="metric-box reveal fade-up" style={{ transitionDelay: '0.1s' }}>
            <div className="metric-value"><Counter value="85" suffix="%" /></div>
            <p>Retention Rate</p>
          </div>
          <div className="metric-box reveal fade-up" style={{ transitionDelay: '0.2s' }}>
            <div className="metric-value"><Counter value="12" suffix="X" /></div>
            <p>Average ROAS</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section">
        <div className="container">
          <div className="section-head reveal fade-up">
            <span className="subtitle">Packages</span>
            <h2>Transparent Growth Plans</h2>
            <p>Choose a plan that fits your current stage and scale as you grow.</p>
          </div>
          <div className="pricing-grid">
            {packages.map((p, i) => (
              <div key={i} className={`price-card ${p.isPopular ? 'popular' : ''} reveal fade-up`} style={{ transitionDelay: `${i * 0.1}s` }}>
                {p.isPopular && <div className="popular-badge">Most Recommended</div>}
                <h3>{p.name}</h3>
                <div className="price-amount">
                  <span className="currency">$</span>
                  <span className="amount">{p.price}</span>
                  <span className="period">/mo</span>
                </div>
                <ul className="pkg-features">
                  {p.features.map((feat, idx) => (
                    <li key={idx}><Check size={16} color="#10b981" /> {feat}</li>
                  ))}
                </ul>
                <button className="btn-pkg">Select Plan</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategy Section */}
      <section className="strategy-visual">
        <div className="container strategy-container">
          <div className="strategy-text reveal fade-left">
            <h2>Our Winning <br /> <span className="highlight">Framework</span></h2>
            <p>We use a proprietary 4-pillar methodology to ensure consistent and predictable scaling.</p>
            <div className="strategy-pillars">
              <div className="pillar">
                <div className="pillar-num">01</div>
                <div className="pillar-info">
                  <h4>Deep Research</h4>
                  <p>Competitor auditing and audience persona building.</p>
                </div>
              </div>
              <div className="pillar">
                <div className="pillar-num">02</div>
                <div className="pillar-info">
                  <h4>Creative Lab</h4>
                  <p>Designing high-converting ad sets and landing pages.</p>
                </div>
              </div>
              <div className="pillar">
                <div className="pillar-num">03</div>
                <div className="pillar-info">
                  <h4>Alpha Testing</h4>
                  <p>Small-scale testing to identify winning variables.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="strategy-graphic reveal fade-right">
            <div className="radar-viz">
              <div className="radar-circle rc1"></div>
              <div className="radar-circle rc2"></div>
              <div className="radar-circle rc3"></div>
              <div className="radar-scanner"></div>
              <div className="radar-point p1"><ShieldCheck size={16} /></div>
              <div className="radar-point p2"><Target size={16} /></div>
              <div className="radar-point p3"><Zap size={16} /></div>
            </div>
          </div>
        </div>
      </section>

      {/* New: The Blueprint for Growth Section */}
      <section className="growth-blueprint">
        <div className="container">
          <div className="blueprint-content reveal fade-up">
            <span className="subtitle">Our Methodology</span>
            <h2 className="animated-text-reveal">
              <span>Engineered</span>
              <span>for</span>
              <span>Scale,</span>
              <span>Designed</span>
              <span>for</span>
              <span>Impact</span>
            </h2>
            <p>We don't just run ads; we build revenue-generating systems that compound over time.</p>
          </div>
          <div className="blueprint-stats">
            <div className="blueprint-stat reveal fade-up" style={{ transitionDelay: '0.1s' }}>
              <div className="stat-num">01</div>
              <h4>Discovery</h4>
              <p>In-depth market and competitor analysis to find your edge.</p>
            </div>
            <div className="blueprint-stat reveal fade-up" style={{ transitionDelay: '0.2s' }}>
              <div className="stat-num">02</div>
              <h4>Execution</h4>
              <p>Precision-targeted campaigns across high-intent channels.</p>
            </div>
            <div className="blueprint-stat reveal fade-up" style={{ transitionDelay: '0.3s' }}>
              <div className="stat-num">03</div>
              <h4>Optimization</h4>
              <p>Daily performance tweaks using AI-driven attribution models.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / Final CTA */}
      <section className="marketing-final-cta">
        <div className="container cta-box-premium reveal fade-up">
          <div className="cta-content">
            <MessageSquare size={48} className="cta-icon" />
            <h2>Ready to dominate your market?</h2>
            <p>Join 200+ brands scaling their revenue with DevSpectra's marketing engine.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your business email" />
              <button>Get Started</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DigitalMarketing;
