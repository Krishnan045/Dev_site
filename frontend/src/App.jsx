import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  Menu,
  ChevronDown,
  Play,
  Instagram,
  Youtube,
  MessageCircle,
  MapPin
} from 'lucide-react';
import logo from './images/download.png';
import AboutUs from './pages/AboutUs';
import HowItWorks from './pages/HowItWorks';
import RequestQuote from './pages/RequestQuote';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activePage, setActivePage] = useState(() => {
    return localStorage.getItem('devspectra_active_page') || 'home';
  });

  // Save page state to local storage
  useEffect(() => {
    localStorage.setItem('devspectra_active_page', activePage);
  }, [activePage]);

  const slides = [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Auto-slide logic (every 4 seconds)
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(slideInterval);
  }, [slides.length]);

  // Scroll Reveal Animation Logic
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
  }, [activePage]); // Re-run when activePage changes to observe new elements

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false); // Close mobile menu on navigate
  }, [activePage]);

  return (
    <div className="app">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="social-icons-top">
            <Facebook size={16} />
            <Twitter size={16} />
            <Linkedin size={16} />
          </div>
          <div className="top-bar-right">
            <div className="contact-info-top">
              <div className="info-item">
                <Phone size={14} />
                <span>+91 99620 74904</span>
              </div>
              <div className="info-item">
                <Mail size={14} />
                <span>contact@devspectra.com</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="main-nav">
        <div className="container nav-container">
          <div className="logo-section" style={{ cursor: 'pointer' }} onClick={() => setActivePage('home')}>
            <img src={logo} alt="DevSpectra Logo" className="main-logo-img" />
          </div>

          <div className="nav-right-section">
            <ul className="nav-menu">
              <li><a href="#" className={activePage === 'home' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActivePage('home'); }}>HOME</a></li>
              <li className="has-dropdown">
                <a href="#">COMPANY <ChevronDown size={14} /></a>
                <ul className="dropdown">
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('about'); }}>ABOUT US</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('how'); }}>HOW IT WORKS</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('quote'); }}>REQUEST A QUOTE</a></li>
                </ul>
              </li>
              <li className="has-dropdown">
                <a href="#">SERVICES <ChevronDown size={14} /></a>
                <ul className="dropdown">
                  <li><a href="#">WEB DEVELOPMENT</a></li>
                  <li><a href="#">MOBILE APP DEVELOPMENT</a></li>
                  <li><a href="#">UI/UX & BRANDING</a></li>
                  <li><a href="#">DIGITAL MARKETING</a></li>
                  <li><a href="#">E-COMMERCE SOLUTIONS</a></li>
                </ul>
              </li>
              <li><a href="#">CONTACT US</a></li>
            </ul>

            <div className="nav-utils">
              <Menu size={20} className="menu-trigger" onClick={toggleMobileMenu} />
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content Rendering */}
      {activePage === 'home' && (
        <>
          {/* Hero Banner */}
          <section className="hero-banner">
            <div className="container">
              <div className="hero-content">
                <div className="hero-text">

                  <motion.h1
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                  >
                    Future of <br />
                    <span className="accent-text-glow">Digital Innovation.</span>
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  >
                    Transforming complex ideas into high-performance web and mobile ecosystems with cutting-edge technology and human-centric design.
                  </motion.p>
                  <ul className="hero-features">
                    <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}><div className="dot"></div> Bespoke Enterprise Solutions</motion.li>
                    <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }}><div className="dot"></div> Immersive UI/UX Experiences</motion.li>
                    <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }}><div className="dot"></div> Scalable Mobile Ecosystems</motion.li>
                    <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.4 }}><div className="dot"></div> Strategic Digital Growth</motion.li>
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="discover-btn-premium"
                    onClick={() => setActivePage('about')}
                  >
                    DISCOVER OUR STORY
                  </motion.button>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 1.8, ease: "easeOut" }}
                  className="hero-image-premium"
                >
                  <div className="glass-overlay"></div>
                  <img src={slides[currentSlide]} alt="Dashboard Preview" />

                </motion.div>
              </div>
            </div>

            {/* Geometric Background Element */}
            <div className="hero-bg-accent"></div>
          </section>

          {/* Services Section */}
          <section className="services-section">
            <div className="container">
              <div className="section-header-centered reveal fade-up">
                <h2>Be One Top & Drive More Sales to Your Site</h2>
                <p>In a world where everyone's life has gone digital, marketing has to follow. Designed by our experts DevSpectra Digital Marketing solutions and strategies have been producing productive results for thousands of our global clients.</p>
              </div>

              <div className="services-grid-main">
                {[
                  { title: "Online Reputation management", desc: "It is also known as corporate reputation Management. We understand the value of online reputation.", icon: "📋" },
                  { title: "Social Media Marketing Services", desc: "DevSpectra Social media marketing services are designed to integrate the existing campaign with your social media campaign.", icon: "📱" },
                  { title: "Search Engine Optimization", desc: "Our strategies can help you to dominate search results. We make sure that your website ranks at the top and leads come in.", icon: "🔍" },
                  { title: "Web and Traffic Analytics", desc: "Looking for Web Analysis for better business? Rely on us. In DevSpectra Web Analytics services we cover on web,social and mobile analytics.", icon: "📊" },
                  { title: "Conversion Optimization Process", desc: "We have mastered the art of creating an essential set of principles that help your company to increase the sale.", icon: "📈" },
                  { title: "Pay Per Click Management", desc: "DevSpectra Has Unmatched Portfolio of Clients & a long history of successful Pay Per Click Marketing Campaigns.", icon: "💰" }
                ].map((s, i) => (
                  <div key={i} className="service-item-new reveal fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                    <div className="service-icon-box">{s.icon}</div>
                    <div className="service-text">
                      <h3>{s.title}</h3>
                      <p>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Software Solutions Section */}
          <section className="software-solutions">
            <div className="container solutions-container">
              <div className="solutions-text reveal fade-up">
                <h2>Perfect Solution For All Your Software Development Needs</h2>
                <p>The accumulative process which is involved in the creation of software programs, as well as incorporating all the steps throughout the systems development life cycle is termed as software development. There are a lot of companies all over the world offering software development services.</p>
                <div className="solutions-list">
                  {[
                    "Software Development", "Digital Marketing",
                    "Mobile App Development", "E-Commerce",
                    "Web Development", "Strategic Plans"
                  ].map((item, i) => (
                    <div key={i} className="solution-item reveal fade-up" style={{ transitionDelay: `${i * 0.05}s` }}>
                      <span className="check-icon">⚙</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="solutions-image reveal slide-right">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" alt="Dashboard" />
              </div>
            </div>
          </section>

          {/* SEO Audit Section */}
          <section className="seo-audit">
            <div className="container audit-container">
              <div className="audit-image reveal fade-up">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" alt="SEO Report" />
              </div>
              <div className="audit-text reveal fade-up">
                <span className="sub-heading-new">Dominate Search Results</span>
                <h2>SEO Audit, Performance And SEO Score Report</h2>
                <p>For startups and growing businesses, an online specialist can develop a digital marketing plan to help you grow and retain a happy client base.</p>
                <p>Your digital consultant will also be able to kick-start campaigns and maximize your marketing budget.</p>
                <button className="analyze-btn">ANALYZE YOUR WEBSITE</button>
              </div>
            </div>
          </section>
        </>
      )}

      {activePage === 'about' && <AboutUs />}
      {activePage === 'how' && <HowItWorks setActivePage={setActivePage} />}
      {activePage === 'quote' && <RequestQuote />}


      {/* Footer */}
      <footer className="main-footer">
        <div className="container footer-grid">
          <div className="footer-col brand-col">
            <div className="logo-section">
              <img src={logo} alt="DevSpectra Logo" className="footer-logo-img" />
            </div>
            <p className="footer-tagline">
              Empowering businesses through cutting-edge software solutions and innovative digital strategies. We turn your vision into reality.
            </p>
            <div className="footer-socials">
              <div className="f-social-item fb"><Facebook size={18} /></div>
              <div className="f-social-item tw"><Twitter size={18} /></div>
              <div className="f-social-item ln"><Linkedin size={18} /></div>
              <div className="f-social-item in"><Instagram size={18} /></div>
            </div>
          </div>

          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('home'); }}>Home</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('about'); }}>About US</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('how'); }}>How it Works</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('quote'); }}>Request a Quote</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Our Services</h3>
            <ul>
              <li><a href="#">Web Development</a></li>
              <li><a href="#">Mobile App Development</a></li>
              <li><a href="#">UI/UX Branding</a></li>
              <li><a href="#">Digital Marketing</a></li>
              <li><a href="#">E-Commerce Solutions</a></li>
            </ul>
          </div>

          <div className="footer-col contact-col">
            <h3>Contact Us</h3>
            <div className="f-contact-item">
              <MapPin size={18} />
              <span>No.20/9, Sardar Patel Road, Chennai - 600020</span>
            </div>
            <div className="f-contact-item">
              <Phone size={18} />
              <span>+91 99520 74904</span>
            </div>
            <div className="f-contact-item">
              <Mail size={18} />
              <span>contact@devspectra.com</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container f-bottom-flex">
            <p>&copy; 2024 DevSpectra Software. All rights reserved.</p>
            <div className="f-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Left Social Sidebar */}
      <div className="social-sidebar left">
        <div className="sidebar-item facebook"><Facebook size={20} /></div>
        <div className="sidebar-item twitter"><Twitter size={20} /></div>
        <div className="sidebar-item linkedin"><Linkedin size={20} /></div>
      </div>

      {/* Right Social Sidebar */}
      <div className="social-sidebar right">
        <div className="sidebar-item whatsapp"><MessageCircle size={20} /></div>
        <div className="sidebar-item instagram"><Instagram size={20} /></div>
        <div className="sidebar-item youtube"><Youtube size={20} /></div>
        <div className="sidebar-item contact-btn"><Mail size={20} /></div>
      </div>

      {/* Mobile Sidebar Menu */}
      <div className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-section">
            <img src={logo} alt="DevSpectra Logo" className="main-logo-img" />
          </div>
          <button className="close-sidebar-btn-round" onClick={toggleMobileMenu}>×</button>
        </div>
        <div className="welcome-tag">
          Welcome to DevSpectra
        </div>

        <div className="sidebar-body">
          <div className="sidebar-nav-section">
            <h3>HEAD OFFICE – INDIA</h3>
            <div className="office-info">
              <p><MapPin size={16} /> No.20/9, Sardar Patel Road, Janaki Complex, 4th Floor, Adyar, Chennai – 600020</p>
              <p><Phone size={16} /> Phone: +91 99520 74904</p>
              <p><Mail size={16} /> Email: contact@devspectra.com</p>
            </div>
          </div>

          <div className="sidebar-nav-section">
            <h3>BRANCH OFFICE – UNITED STATES</h3>
            <div className="office-info">
              <p><MapPin size={16} /> 6838 Exeter St, Queens, NY 11375, United States</p>
              <p><Phone size={16} /> Phone: +1 (718) 395-9499</p>
              <p><Mail size={16} /> Email: sales@devspectra.com</p>
            </div>
          </div>

          <div className="sidebar-nav-section">
            <h3>FOLLOW US</h3>
            <div className="sidebar-socials">
              <Facebook size={18} />
              <Twitter size={18} />
              <Linkedin size={18} />
            </div>
          </div>


        </div>
      </div>
      {isMobileMenuOpen && <div className="sidebar-overlay" onClick={toggleMobileMenu}></div>}


      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          scroll-behavior: smooth;
        }

        /* Animation Reveal System */
        .reveal {
          opacity: 0;
          transition: all 1.5s cubic-bezier(0.215, 0.61, 0.355, 1);
          pointer-events: none;
        }

        .reveal-visible {
          opacity: 1 !important;
          transform: translate(0, 0) scale(1) !important;
          pointer-events: auto;
        }

        .fade-up {
          transform: translateY(50px);
        }

        .slide-left {
          transform: translateX(-100px);
        }

        .slide-right {
          transform: translateX(100px);
        }

        .zoom-in {
          transform: scale(0.8);
        }

        .hero-bg-accent {
          position: absolute;
          top: 0;
          right: -10%;
          width: 60%;
          height: 100%;
          background: rgba(255,255,255,0.05);
          transform: skewX(-20deg);
          z-index: 1;
        }

        .top-bar {
          background: #15304bff;
          color: white;
          padding: 0;
          font-size: 13px;
        }

        .top-bar-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 35px;
        }

        .social-icons-top {
          display: flex;
          gap: 15px;
        }

        .contact-info-top {
          display: flex;
          gap: 30px;
          margin-right: 30px;
        }

        .top-bar-right {
          display: flex;
          align-items: center;
          height: 100%;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .quote-btn {
          background: var(--accent-orange);
          color: white;
          border: none;
          height: 100%;
          padding: 0 25px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .quote-btn:hover {
          background: #d4491a;
        }

        .main-nav {
          background:  #dae4e5ff;

          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-right-section {
          display: flex;
          align-items: center;
          gap: 40px;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .main-logo-img {
          height: 100px;
          width: auto;
          object-fit: contain;
        }

        .nav-menu {
          display: flex;
          list-style: none;
          gap: 30px;
        }

        .nav-menu li {
          position: relative;
        }

        .nav-menu li a {
          text-decoration: none;
          color: #333;
          font-weight: 600;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 12px 0;
          transition: color 0.3s ease;
        }

        .dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          background: white;
          min-width: 250px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          list-style: none;
          padding: 15px 0;
          border-radius: 8px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(10px);
          transition: all 0.3s ease;
          z-index: 1000;
          border-top: 3px solid var(--primary-purple);
        }

        .nav-menu li:hover .dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .dropdown li a {
          padding: 15px 25px !important;
          color: #444 !important;
          font-weight: 700 !important;
          font-size: 12px !important;
          text-transform: uppercase !important;
          display: block !important;
          white-space: nowrap !important;
          transition: all 0.3s ease !important;
        }

        .dropdown li a:hover {
          background: #f8f9fa;
          color: var(--primary-purple) !important;
        }

        .nav-menu li a.active, .nav-menu li a:hover {
          color: var(--accent-orange);
        }

        .nav-utils {
          display: flex;
          gap: 20px;
          color: var(--dark-blue);
        }

        .hero-banner {
          background: linear-gradient(135deg, #0b132b 0%, #3a0ca3 100%, #5e5ce6 100%);
          position: relative;
          min-height: 550px;
          padding: 100px 0;
          overflow: hidden;
          color: white;
        }

        .hero-container {
          display: grid;
          background: linear-gradient(135deg, #0b132b 0%, #1c2541 100%);
          height: calc(100vh - 120px);
          min-height: 750px;
          display: flex;
          align-items: center;
          color: white;
          overflow: hidden;
          position: relative;
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .hero-badge {
          display: inline-block;
          background: rgba(94, 92, 230, 0.15);
          color: #5e5ce6;
          padding: 8px 16px;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 2px;
          margin-bottom: 25px;
          border: 1px solid rgba(94, 92, 230, 0.3);
        }

        .accent-text-glow {
          color: #5e5ce6;
          text-shadow: 0 0 20px rgba(94, 92, 230, 0.4);
        }

        .hero-text h1 {
          font-size: 64px;
          line-height: 1.1;
          margin-bottom: 25px;
          font-weight: 800;
          letter-spacing: -2px;
        }

        .hero-text p {
          font-size: 18px;
          opacity: 0.8;
          max-width: 550px;
          line-height: 1.8;
          margin-bottom: 35px;
        }

        .hero-features {
          list-style: none;
          margin-bottom: 45px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .hero-features li {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 15px;
          font-weight: 600;
          color: #cbd5e1;
        }

        .hero-features li .dot {
          width: 8px;
          height: 8px;
          background: #5e5ce6;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(94, 92, 230, 0.5);
        }

        .discover-btn-premium {
          background: linear-gradient(90deg, #5e5ce6, #7c3aed);
          color: white;
          border: none;
          padding: 18px 40px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 1px;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(94, 92, 230, 0.3);
          transition: all 0.3s ease;
        }

        .discover-btn-premium:hover {
          box-shadow: 0 15px 40px rgba(94, 92, 230, 0.5);
          transform: translateY(-3px);
        }

        .hero-image-premium {
          position: relative;
          z-index: 2;
        }

        .hero-image-premium img {
          width: 100%;
          border-radius: 24px;
          box-shadow: 0 50px 100px rgba(0,0,0,0.5);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .glass-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(225deg, rgba(255,255,255,0.1) 0%, transparent 100%);
          border-radius: 24px;
          pointer-events: none;
        }

        .floating-stat-card {
          position: absolute;
          bottom: 40px;
          left: -40px;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(10px);
          padding: 20px 30px;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          color: #0b132b;
        }

        .logo-text {
          font-size: 35px;
          font-weight: 800;
          letter-spacing: -1px;
          background: linear-gradient(to right, #5e5ce6, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }

        .footer-logo-text {
          font-size: 26px;
          font-weight: 800;
          letter-spacing: -1px;
          background: linear-gradient(to right, #5e5ce6, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }

        .stat-num {
          font-size: 28px;
          font-weight: 800;
          color: #5e5ce6;
        }

        .stat-desc {
          font-size: 12px;
          font-weight: 600;
          opacity: 0.7;
        }

        .slider-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transform: scale(1.1);
          transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .slider-img.active {
          opacity: 1;
          transform: scale(1);
        }

        .slider-dots {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
          z-index: 5;
        }

        .dot {
          width: 10px;
          height: 10px;
          background: rgba(255,255,255,0.3);
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot.active {
          background: var(--accent-orange);
          width: 30px;
          border-radius: 10px;
        }

        @keyframes pulse-ring {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(94, 92, 230, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 20px rgba(94, 92, 230, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(94, 92, 230, 0); }
        }

        .video-trigger {
          animation: float 4s ease-in-out infinite;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }

        .video-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          animation: fadeIn 0.3s ease;
        }

        .video-modal-content {
          width: 90%;
          max-width: 1000px;
          position: relative;
        }

        .video-wrapper {
          position: relative;
          padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
          height: 0;
        }

        .video-wrapper iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 20px;
        }

        .close-modal-btn {
          position: absolute;
          top: -40px;
          right: 0;
          background: none;
          border: none;
          color: white;
          font-size: 40px;
          cursor: pointer;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .services-section {
          padding: 80px 0;
          background: white;
        }

        .section-header-centered {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 60px;
        }

        .section-header-centered h2 {
          font-size: 32px;
          color: var(--dark-blue);
          margin-bottom: 20px;
        }

        .section-header-centered p {
          color: var(--text-muted);
          font-size: 15px;
        }

        .services-grid-main {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        .service-item-new {
          display: flex;
          gap: 20px;
          padding: 30px;
          background: #fff;
          border-radius: 15px;
          border: 1px solid #f0f0f0;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
          animation: fadeInUp 0.8s ease backwards;
        }

        .service-item-new:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(94, 92, 230, 0.1);
          border-color: var(--primary-purple);
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Staggered entrance for items */
        .service-item-new:nth-child(1) { animation-delay: 0.1s; }
        .service-item-new:nth-child(2) { animation-delay: 0.2s; }
        .service-item-new:nth-child(3) { animation-delay: 0.3s; }
        .service-item-new:nth-child(4) { animation-delay: 0.4s; }
        .service-item-new:nth-child(5) { animation-delay: 0.5s; }
        .service-item-new:nth-child(6) { animation-delay: 0.6s; }

        .service-icon-box {
          font-size: 35px;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }

        .service-item-new:hover .service-icon-box {
          transform: scale(1.2) rotate(5deg);
        }

        .service-text h3 {
          font-size: 18px;
          color: var(--dark-blue);
          margin-bottom: 10px;
        }

        .service-text p {
          color: var(--text-muted);
          font-size: 14px;
          line-height: 1.5;
        }

        .software-solutions {
          padding: 80px 0;
          background: #fdfdfd;
        }

        .solutions-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .solutions-text h2 {
          font-size: 32px;
          color: var(--dark-blue);
          margin-bottom: 25px;
        }

        .solutions-text p {
          color: var(--text-muted);
          font-size: 15px;
          margin-bottom: 30px;
        }

        .solutions-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .solution-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: #333;
          font-weight: 500;
        }

        .check-icon {
          color: var(--accent-orange);
        }

        .solutions-image img {
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .seo-audit {
          padding: 80px 0;
          background: white;
        }

        .audit-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .sub-heading-new {
          color: var(--text-muted);
          font-size: 14px;
          text-transform: uppercase;
          font-weight: 700;
          display: block;
          margin-bottom: 15px;
        }

        .audit-text h2 {
          font-size: 32px;
          color: var(--dark-blue);
          margin-bottom: 25px;
        }

        .audit-text p {
          color: var(--text-muted);
          font-size: 15px;
          margin-bottom: 20px;
        }

        .analyze-btn {
          background: #2ecc71;
          color: white;
          border: none;
          padding: 15px 35px;
          font-weight: 700;
          border-radius: 30px;
          cursor: pointer;
          margin-top: 20px;
          transition: background 0.3s ease;
        }

        .analyze-btn:hover {
          background: #27ae60;
        }

        .audit-image img {
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .social-sidebar {
          position: fixed;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          z-index: 1000;
        }

        .social-sidebar.left {
          left: 0;
        }

        .social-sidebar.right {
          right: 0;
        }

        .sidebar-item {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          transition: width 0.3s ease, padding 0.3s ease;
        }

        .facebook { background: #3b5998; }
        .twitter { background: #1da1f2; }
        .linkedin { background: #0077b5; }
        .instagram { background: #e1306c; }
        .youtube { background: #ff0000; }
        .whatsapp { background: #25d366; }
        .contact-btn { background: var(--accent-orange); }

        .social-sidebar.left .sidebar-item:hover {
          width: 50px;
          padding-left: 10px;
        }

        .social-sidebar.right .sidebar-item:hover {
          width: 50px;
          padding-right: 10px;
          margin-left: -10px;
        }

        .menu-trigger {
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .menu-trigger:hover {
          color: var(--accent-orange);
        }

        .mobile-sidebar {
          position: fixed;
          top: 0;
          right: -400px;
          width: 400px;
          height: 100%;
          background: #ffffff;
          z-index: 3000;
          box-shadow: -15px 0 40px rgba(0,0,0,0.1);
          transition: right 0.4s cubic-bezier(0.77, 0.2, 0.05, 1.0);
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }

        .mobile-sidebar.open {
          right: 0;
        }

        .sidebar-header {
          padding: 25px 35px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #f0f0f0;
          position: sticky;
          top: 0;
          background: white;
          z-index: 10;
        }

        .close-sidebar-btn-round {
          background: #f8f9fa;
          border: 1px solid #eee;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          font-size: 26px;
          color: #111;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .close-sidebar-btn-round:hover {
          background: var(--accent-orange);
          color: white;
          border-color: var(--accent-orange);
          transform: rotate(90deg);
        }

        .sidebar-body {
          padding: 40px 35px;
        }

        .sidebar-nav-section {
          margin-bottom: 45px;
        }

        .sidebar-nav-section h3 {
          font-size: 16px;
          color: var(--dark-blue);
          letter-spacing: 0.8px;
          margin-bottom: 25px;
          font-weight: 800;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sidebar-nav-section h3::after {
          content: '';
          flex: 1;
          height: 2px;
          background: #f0f0f0;
        }

        .office-info p {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          color: #555;
          font-size: 14px;
          line-height: 1.7;
          margin-bottom: 20px;
        }

        .office-info svg {
          color: var(--primary-purple);
          margin-top: 3px;
          flex-shrink: 0;
        }

        .sidebar-socials {
          display: flex;
          gap: 15px;
          margin-top: 10px;
        }

        .sidebar-socials svg {
          width: 40px;
          height: 40px;
          padding: 10px;
          background: #f8f9fa;
          border-radius: 10px;
          color: #555;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .sidebar-socials svg:hover {
          background: var(--primary-purple);
          color: white;
          transform: translateY(-5px);
        }

        .welcome-tag {
          margin: 10px auto 0;
          width: fit-content;
          background: #fdfdfd;
          border: 1px solid #f0f0f0;
          padding: 10px 25px;
          border-radius: 50px;
          font-size: 18px;
          color: #15304bff;
          font-weight: 700;
          text-align: center;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          border-left: 4px solid #5e5ce6;
        }

        .sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(11, 19, 43, 0.7);
          z-index: 2500;
          backdrop-filter: blur(8px);
          animation: fadeIn 0.3s ease;
        }

        .main-footer {
          background: #0a1128;
          color: white;
          padding: 60px 0 0;
          font-family: 'Inter', sans-serif;
          margin-top: 80px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
          gap: 50px;
          margin-bottom: 60px;
        }

        .footer-logo-img {
          height: 100px;
          width: auto;
          object-fit: contain;
        }

        .footer-tagline {
          color: #a0aec0;
          line-height: 1.8;
          margin: 25px 0;
          font-size: 15px;
        }

        .footer-socials {
          display: flex;
          gap: 15px;
        }

        .f-social-item {
          width: 38px;
          height: 38px;
          background: rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
        }

        .f-social-item.fb { background: #1877F2; border-color: #1877F2; }
        .f-social-item.tw { background: #1DA1F2; border-color: #1DA1F2; }
        .f-social-item.ln { background: #0077B5; border-color: #0077B5; }
        .f-social-item.in { 
          background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); 
          border-color: transparent; 
        }

        .f-social-item:hover {
          transform: translateY(-5px);
          filter: brightness(1.1);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        .footer-col h3 {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 30px;
          position: relative;
          padding-bottom: 12px;
          color: white;
        }

        .footer-col h3::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 40px;
          height: 3px;
          background: var(--accent-orange);
        }

        .footer-col ul {
          list-style: none;
        }

        .footer-col ul li {
          margin-bottom: 15px;
        }

        .footer-col ul li a {
          color: #a0aec0;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 15px;
        }

        .footer-col ul li a:hover {
          color: white;
          padding-left: 8px;
        }

        .f-contact-item {
          display: flex;
          gap: 15px;
          align-items: flex-start;
          margin-bottom: 20px;
          color: #a0aec0;
          font-size: 15px;
        }

        .f-contact-item svg {
          color: var(--accent-orange);
          flex-shrink: 0;
        }

        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 30px 0;
          background: rgba(0,0,0,0.2);
        }

        .f-bottom-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #718096;
          font-size: 14px;
        }

        .f-bottom-links {
          display: flex;
          gap: 30px;
        }

        .f-bottom-links a {
          color: #718096;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .f-bottom-links a:hover {
          color: white;
        }

        .mobile-nav-list {
          list-style: none;
          margin-top: 15px;
        }

        .mobile-nav-list li {
          margin-bottom: 12px;
        }

        .mobile-nav-list li a {
          text-decoration: none;
          color: #333;
          font-weight: 700;
          font-size: 14px;
          display: block;
          transition: color 0.3s ease;
        }

        .mobile-nav-list li a:hover {
          color: var(--primary-purple);
        }

        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 576px) {
          .footer-grid {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .footer-col h3::after {
            left: 50%;
            transform: translateX(-50%);
          }
          .footer-socials, .f-contact-item {
            justify-content: center;
          }
          .f-bottom-flex {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .mobile-sidebar {
            width: 100%;
            right: -100%;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
