import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Figma,
  Layers,
  MousePointer2,
  Palette,
  CheckCircle2,
  PenTool,
  Layout,
  Smartphone,
  Eye,
  Search,
  Users,
  Compass
} from 'lucide-react';
import uiuxImg from '../images/uiux_hero.png';

const UIUXBranding = ({ setActivePage }) => {
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
      title: "User Research",
      desc: "In-depth discovery to understand your users' needs, behaviors, and pain points.",
      icon: <Search className="w-8 h-8" />,
      animation: "pulse-scan",
      color: "#10b981"
    },
    {
      title: "UI/UX Design",
      desc: "Crafting intuitive and aesthetically pleasing interfaces for web and mobile platforms.",
      icon: <Layout className="w-8 h-8" />,
      animation: "morph-shape",
      color: "#059669"
    },
    {
      title: "Interaction Design",
      desc: "Creating engaging micro-interactions that make your product feel alive.",
      icon: <MousePointer2 className="w-8 h-8" />,
      animation: "click-ripple",
      color: "#34d399"
    },
    {
      title: "Brand Identity",
      desc: "Developing a cohesive visual language that reflects your brand's core values.",
      icon: <Palette className="w-8 h-8" />,
      animation: "shape-assembly",
      color: "#f59e0b"
    }
  ];

  const steps = [
    { name: "Discover", desc: "Understanding goals" },
    { name: "Research", desc: "User insights" },
    { name: "Ideate", desc: "Brainstorming" },
    { name: "Design", desc: "Visual creation" },
    { name: "Test", desc: "Usability check" },
    { name: "Launch", desc: "Going live" }
  ];

  return (
    <div className="uiux-page">
      {/* Professional Hero Section */}
      <section className="service-hero-v2 hero-theme-amber">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="hero-content-v2"
          >
            <span className="hero-tagline" style={{ color: '#fbbf24', borderColor: '#fbbf24' }}>Design Mastery</span>
            <h1>Where Design Meets <br /><span className="text-gradient-amber-v2">Digital Innovation</span></h1>
            <p>Transforming your brand vision into intuitive, impactful, and beautiful digital experiences that resonate with users.</p>
            <div className="hero-cta-group">
              <button className="btn-hero-primary btn-amber" onClick={() => { sessionStorage.setItem('scrollTarget', 'portfolio'); setActivePage('about'); }}>Our Portfolio</button>
              <button className="btn-hero-outline" onClick={() => setActivePage('quote')}>Request a Design Audit</button>
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
            <img src={uiuxImg} alt="UI/UX Branding" className="hero-main-img-v2" />
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="uiux-services">
        <div className="container">
          <div className="section-header reveal fade-up">
            <h2>Our Creative Expertise</h2>
            <p>We provide a full spectrum of design services to bring your digital vision to life.</p>
          </div>
          <div className="services-card-grid">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="box-animation-card reveal fade-up"
                whileHover={{ y: -15, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="card-inner-content">
                  <div className={`service-icon-wrapper ${service.animation}`} style={{ color: service.color, background: `${service.color}10` }}>
                    {service.icon}
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Branding Showcase */}
      <section className="branding-showcase">
        <div className="container showcase-flex">
          <div className="showcase-content reveal fade-left">
            <span className="subtitle">Visual Identity</span>
            <h2>Consistent & <span className="text-gradient-purple">Impactful</span> Branding</h2>
            <p>Your brand is more than just a logo. We create a comprehensive visual system that tells your story and connects with your audience across every touchpoint.</p>
            <ul className="brand-features">
              <li><CheckCircle2 size={18} /> Logo Design & Variations</li>
              <li><CheckCircle2 size={18} /> Color Theory & Palette Development</li>
              <li><CheckCircle2 size={18} /> Typography Systems</li>
              <li><CheckCircle2 size={18} /> Brand Guidelines</li>
            </ul>
          </div>
          <div className="showcase-visual reveal fade-right">
            <div className="brand-kit-preview">
              <div className="brand-logos">
                <div className="logo-box main">DS</div>
                <div className="logo-box variant">DS</div>
              </div>
              <div className="color-palette">
                <div className="color-swatch purple"></div>
                <div className="color-swatch blue"></div>
                <div className="color-swatch orange"></div>
                <div className="color-swatch dark"></div>
              </div>
              <div className="typography-preview">
                <p className="font-heading">Inter Bold</p>
                <p className="font-body">Poppins Regular</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories / Case Studies Heading */}
      <section className="design-success">
        <div className="container">
          <div className="section-header reveal fade-up">
            <span className="subtitle">Case Studies</span>
            <h2>Proven <span className="text-gradient-purple">Success</span> Across Industries</h2>
            <p>Explore how our design solutions have helped businesses achieve their digital objectives.</p>
          </div>
          <div className="success-stats-row reveal fade-up">
            <div className="success-stat">
              <h3>98%</h3>
              <p>User Satisfaction</p>
            </div>
            <div className="success-stat">
              <h3>40%</h3>
              <p>Conversion Increase</p>
            </div>
            <div className="success-stat">
              <h3>200+</h3>
              <p>App Store Reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* Design Process */}
      <section className="design-process">
        <div className="container">
          <div className="section-header reveal fade-up">
            <h2>Our Creative Process</h2>
            <p>A systematic approach to solving complex problems through elegant design.</p>
          </div>
          <div className="timeline-container reveal fade-up">
            <div className="timeline-line">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="timeline-progress"
              ></motion.div>
            </div>
            <div className="timeline-steps">
              {steps.map((step, index) => (
                <div key={index} className="timeline-step">
                  <div className="step-number">{index + 1}</div>
                  <h4>{step.name}</h4>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="design-tools">
        <div className="container">
          <h3>Tools of the Trade</h3>
          <div className="tools-grid">
            <div className="tool-item figma">
              <div className="tool-icon"><Figma /></div>
              <span>Figma</span>
            </div>
            <div className="tool-item xd">
              <div className="tool-icon">Xd</div>
              <span>Adobe XD</span>
            </div>
            <div className="tool-item ai">
              <div className="tool-icon">Ai</div>
              <span>Illustrator</span>
            </div>
            <div className="tool-item sketch">
              <div className="tool-icon"><Layers /></div>
              <span>Sketch</span>
            </div>
          </div>
        </div>
      </section>

      {/* New: Design Philosophy Section */}
      <section className="design-philosophy">
        <div className="container">
          <div className="philosophy-grid">
            <div className="philosophy-content reveal fade-left">
              <span className="subtitle">Our Philosophy</span>
              <h2>Where <span className="text-gradient-purple">Function</span> Meets Aesthetic Excellence</h2>
              <p>We believe that great design is not just about how something looks, but how it works. Our philosophy is rooted in the perfect balance between usability and visual delight.</p>
              <div className="philosophy-points">
                <div className="point">
                  <h5>Human-First Design</h5>
                  <p>Every pixel is placed with purpose, ensuring a natural and intuitive flow for the user.</p>
                </div>
                <div className="point">
                  <h5>Data-Driven Decisions</h5>
                  <p>We use analytics and user testing to validate our design choices and ensure performance.</p>
                </div>
              </div>
            </div>
            <div className="philosophy-visual reveal fade-right">
              {/* This could be a decorative element or another image */}
              <div className="abstract-design-element">
                <div className="circle c1"></div>
                <div className="circle c2"></div>
                <div className="circle c3"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Design */}
      <section className="why-choose-design">
        <div className="container">
          <div className="section-header reveal fade-up">
            <span className="subtitle">The DevSpectra Edge</span>
            <h2>Why Partner With Our <span className="text-gradient-purple">Design Studio</span>?</h2>
            <p>We bring a unique blend of creativity and technical expertise to every project, ensuring your product stands out in a crowded market.</p>
          </div>
          <div className="why-grid">
            <div className="why-card reveal fade-up">
              <Users className="why-icon" />
              <h4>User-Centric Innovation</h4>
              <p>We put your users at the heart of everything we create, focusing on empathy and accessibility.</p>
            </div>
            <div className="why-card reveal fade-up" style={{ transitionDelay: '0.1s' }}>
              <Compass className="why-icon" />
              <h4>Strategic Visual Thinking</h4>
              <p>Design that aligns perfectly with your business goals and long-term brand objectives.</p>
            </div>
            <div className="why-card reveal fade-up" style={{ transitionDelay: '0.2s' }}>
              <Smartphone className="why-icon" />
              <h4>Multi-Platform Adaptivity</h4>
              <p>Seamless experiences across all devices, from mobile screens to large desktop monitors.</p>
            </div>
            <div className="why-card reveal fade-up" style={{ transitionDelay: '0.3s' }}>
              <Eye className="why-icon" />
              <h4>Meticulous Pixel Perfection</h4>
              <p>Unwavering attention to detail ensures a polished, professional, and premium finish.</p>
            </div>
          </div>
        </div>
      </section>

      {/* New: Call to Action Section with Heading */}
      <section className="design-cta">
        <div className="container reveal zoom-in">
          <h2>Ready to <span className="text-gradient-purple">Elevate</span> Your Digital Identity?</h2>
          <p>Let's collaborate to build something truly remarkable that resonates with your audience.</p>
          <button className="btn-primary-glow" onClick={() => setActivePage('quote')}>Start Your Design Journey</button>
        </div>
      </section>
    </div>
  );
};

export default UIUXBranding;
