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
import digitalImg from '../images/marketing_hero.png';

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

  const defaultProjects = [
    { title: "SaaS Growth Campaign", description: "Comprehensive SEO and PPC campaign increasing ARR by 150%.", imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600", link: "#" },
    { title: "Social Viral Strategy", description: "Organic social media campaign reaching 5M+ targeted users.", imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600", link: "#" },
    { title: "Local SEO Dominance", description: "Hyper-local SEO strategy dominating local map packs and search.", imageUrl: "https://images.unsplash.com/photo-1432888117247-f82ad31dddb2?auto=format&fit=crop&q=80&w=600", link: "#" }
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
        setDynamicServices(Array.isArray(sRes) ? sRes.filter(s => s.category === 'Digital Marketing') : []);
        setDynamicProjects(Array.isArray(pRes) ? pRes.filter(p => 
          p.category?.toLowerCase() === 'digital marketing' || 
          p.category?.toLowerCase().includes('marketing') || 
          p.category?.toLowerCase().includes('seo')
        ) : []);
      } catch (err) {
        console.error("Failed to fetch page data", err);
      }
    };
    fetchPageData();
  }, []);

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
              <button className="btn-hero-primary btn-teal" onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}>View Portfolio</button>
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
            {(dynamicServices.length > 0 ? dynamicServices : []).map((s, i) => (
              <div key={i} className="service-card-premium reveal fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="icon-box" style={{ background: `${s.color || '#10b981'}15`, color: s.color || '#10b981' }}>
                  {typeof s.icon === 'string' ? <span style={{fontSize: '32px'}}>{s.icon}</span> : s.icon}
                </div>
                <h3>{s.title}</h3>
                <p>{s.description || s.desc}</p>
                <div className="tag-list" style={{display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '15px'}}>
                  {(Array.isArray(s.tags) ? s.tags : (s.tags ? s.tags.split(',') : ['Marketing', 'Strategy'])).map((tag, idx) => <span key={idx} className="tag-item" style={{background: '#f1f5f9', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '700'}}>{tag.trim()}</span>)}
                </div>
              </div>
            ))}
          </div>

          {/* Dynamic Marketing Portfolio */}
          <div id="portfolio" className="marketing-portfolio-dynamic" style={{marginTop: '80px'}}>
            <div className="section-head reveal fade-up">
              <h2>Marketing Portfolio</h2>
            </div>
            <div className="infinite-carousel-container">
              <div className={`infinite-carousel-slider ${dynamicProjects.length <= 3 ? 'static-grid' : ''}`}>
                {(dynamicProjects.length > 3 ? [...dynamicProjects, ...dynamicProjects] : dynamicProjects).filter(p => p.isActive !== false).map((p, i) => (
                  <div key={i} className="project-card-new" style={{background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)'}}>
                    <div className="proj-img-box">
                      <img src={p.imageUrl || p.img} alt={p.title} />
                    </div>
                    <div style={{padding: '25px'}}>
                      <h4 style={{fontSize: '20px', fontWeight: '800', margin: '0 0 10px'}}>{p.title}</h4>
                      <p style={{color: '#64748b', fontSize: '14px', margin: '0 0 15px'}}>{p.description || p.desc}</p>
                      <a href={p.link || "#"} target="_blank" rel="noreferrer" style={{color: '#10b981', fontWeight: '800', textDecoration: 'none'}}>View Case Study →</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
