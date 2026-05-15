import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Facebook,
  Linkedin,
  Mail,
  Phone,
  Menu,
  ChevronDown,
  Play,
  Instagram,
  Youtube,
  MessageCircle,
  MessageSquare,
  MapPin,
  Info
} from 'lucide-react';
import logo from './images/download.png';
import AdminPortal from './AdminPortal';
import AboutUs from './pages/AboutUs';
import HowItWorks from './pages/HowItWorks';
import RequestQuote from './pages/RequestQuote';
import WebDevelopment from './pages/WebDevelopment';
import MobileDevelopment from './pages/MobileDevelopment';
import UIUXBranding from './pages/UIUXBranding';
import DigitalMarketing from './pages/DigitalMarketing';
import EcommerceSolutions from './pages/EcommerceSolutions';
import SuccessStories from './pages/SuccessStories';
import Contact from './pages/Contact';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [solutionSlide, setSolutionSlide] = useState(0);
  const getInitialPage = () => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    const validPages = ['home', 'about', 'how', 'quote', 'web-dev', 'mobile-dev', 'uiux', 'marketing', 'ecommerce', 'stories', 'contact', 'admin'];
    
    if (validPages.includes(hash)) return hash;
    
    const saved = localStorage.getItem('devspectra_active_page');
    return validPages.includes(saved) ? saved : 'home';
  };

  const [activePage, setActivePage] = useState(getInitialPage());
  const [showInfoModal, setShowInfoModal] = useState(false);

  // Diagnostic logging
  useEffect(() => {
    console.log("App mounted. Active page:", activePage);
  }, []);

  // Save page state and update hash
  useEffect(() => {
    localStorage.setItem('devspectra_active_page', activePage);
    if (activePage === 'home') {
      window.history.replaceState(null, '', window.location.pathname);
    } else {
      window.location.hash = `/${activePage}`;
    }
  }, [activePage]);

  const [slides, setSlides] = useState([
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
  ]);
  const [homeServices, setHomeServices] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [settings, setSettings] = useState(null);

  const fetchData = useCallback(async () => {
      try {
        const [slidesRes, servicesRes, settingsRes, portfoliosRes] = await Promise.all([
          fetch('/api/public/banners').then(res => res.json()),
          fetch('/api/public/services').then(res => res.json()),
          fetch('/api/public/settings').then(res => res.json()),
          fetch('/api/public/portfolios').then(res => res.json())
        ]);

        if (Array.isArray(slidesRes) && slidesRes.length > 0) {
          setSlides(slidesRes.filter(s => s.isActive !== false).map(s => s.imageUrl));
        }
        setHomeServices(Array.isArray(servicesRes) ? servicesRes : []);
        setPortfolios(Array.isArray(portfoliosRes) ? portfoliosRes : []);
        setSettings(settingsRes);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
  }, []);

  useEffect(() => {
    fetchData();
  }, [activePage, fetchData]);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const validPages = ['home', 'about', 'how', 'quote', 'web-dev', 'mobile-dev', 'uiux', 'marketing', 'ecommerce', 'stories', 'contact', 'admin'];
      if (validPages.includes(hash)) {
        setActivePage(hash);
      } else if (!hash) {
        setActivePage('home');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Auto-slide logic (every 4 seconds)
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setSolutionSlide((prev) => (prev + 1) % 3);
    }, 5000);
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

    const observeElements = () => {
      const revealElements = document.querySelectorAll('.reveal');
      revealElements.forEach(el => observer.observe(el));
    };

    // Initial observation
    observeElements();

    // Set up MutationObserver to watch for newly added reveal elements
    const mutationObserver = new MutationObserver((mutations) => {
      let shouldObserve = false;
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) { // Element node
            if (node.classList.contains('reveal') || node.querySelector('.reveal')) {
              shouldObserve = true;
            }
          }
        });
      });
      if (shouldObserve) observeElements();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [activePage]); // activePage change should trigger a re-scan, mutation observer handles the rest

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false); 
  }, [activePage]);

  // Initial scroll to top on refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="app">
      {activePage !== 'admin' && (
        <>
          <div className="top-bar">
        <div className="top-bar-content-fluid">
          <div className="top-bar-right">
            <div className="contact-info-top">
              <div className="info-item">
                <Phone size={15} strokeWidth={2.5} />
                <span>{settings?.contactPhone || '+91 76958 90189'}</span>
              </div>
              <div className="info-item">
                <Mail size={15} strokeWidth={2.5} />
                <span>{settings?.contactEmail || 'contact@devspectra.com'}</span>
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
              <li className="has-dropdown ">
                <a href="#">COMPANY <ChevronDown size={14} /></a>
                <ul className="dropdown">
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('about'); }}>ABOUT US</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('how'); }}>HOW IT WORKS</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('stories'); }}>SUCCESS STORIES</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('quote'); }}>REQUEST A QUOTE</a></li>
                </ul>
              </li>
              <li className="has-dropdown">
                <a href="#">SERVICES <ChevronDown size={14} /></a>
                <ul className="dropdown">
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('web-dev'); }}>WEB DEVELOPMENT</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('mobile-dev'); }}>MOBILE APP DEVELOPMENT</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('uiux'); }}>UI/UX & BRANDING</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('marketing'); }}>DIGITAL MARKETING</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('ecommerce'); }}>E-COMMERCE SOLUTIONS</a></li>
                </ul>
              </li>
              <li><a href="#" className={activePage === 'contact' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActivePage('contact'); }}>CONTACT US</a></li>
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
          <section className="hero-container">
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
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2 }}
                  className="hero-image-premium-container"
                >
                  <div className="glass-effect-overlay"></div>
                  <div className="slider-wrapper">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentSlide}
                        src={slides[currentSlide]}
                        alt="DevSpectra Innovation"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="banner-slider-img"
                      />
                    </AnimatePresence>
                  </div>
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
                {(homeServices.length > 0 ? homeServices : []).filter(s => s.isActive !== false && s.showOnHome === true).map((s, i) => (
                  <div key={i} className="service-item-new reveal fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                    <div className="service-icon-box">{s.icon || '📋'}</div>
                    <div className="service-text">
                      <h3>{s.title}</h3>
                      <p>{s.description || s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Software Solutions Slider Section */}
          <section className="software-solutions">
            <div className="container">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={solutionSlide}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="solutions-container"
                >
                  {solutionSlide === 0 && (
                    <>
                      <div className="solutions-text">
                        <h2>Perfect Solution For All Your Software Development Needs</h2>
                        <p>The accumulative process which is involved in the creation of software programs, as well as incorporating all the steps throughout the systems development life cycle is termed as software development.</p>
                        <div className="solutions-list">
                          {["Software Development", "Web Application", "Mobile App Development", "UI/UX Design", "Custom Backend", "Scalable Systems"].map((item, i) => (
                            <div key={i} className="solution-item">
                              <span className="check-icon">⚙</span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                        <div className="btn-row" style={{display: 'flex', gap: '15px', marginTop: '30px'}}>
                          <button className="analyze-btn" style={{margin: 0}} onClick={() => setActivePage('web-dev')}>Get Started</button>
                          <button className="analyze-btn" style={{margin: 0, background: 'white', border: '2px solid var(--dark-blue)', color: 'var(--dark-blue)'}} onClick={() => { sessionStorage.setItem('scrollTarget', 'portfolio'); setActivePage('web-dev'); }}>View Portfolio</button>
                        </div>
                      </div>
                      <div className="solutions-image">
                        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" alt="Dashboard" />
                      </div>
                    </>
                  )}
                  {solutionSlide === 1 && (
                    <>
                      <div className="solutions-text">
                        <h2>Strategic Digital Growth & Online Visibility</h2>
                        <p>Our expert team develops tailored digital marketing strategies that combine SEO, social media, and data analytics to put your brand at the top of search results and drive quality traffic.</p>
                        <div className="solutions-list">
                          {["SEO Optimization", "Digital Marketing", "Social Media Management", "Content Strategy", "Traffic Analytics", "Growth Hacking"].map((item, i) => (
                            <div key={i} className="solution-item">
                              <span className="check-icon">⚙</span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                        <div className="btn-row" style={{display: 'flex', gap: '15px', marginTop: '30px'}}>
                          <button className="analyze-btn" style={{margin: 0}} onClick={() => setActivePage('marketing')}>Grow My Brand</button>
                          <button className="analyze-btn" style={{margin: 0, background: 'white', border: '2px solid var(--dark-blue)', color: 'var(--dark-blue)'}} onClick={() => { sessionStorage.setItem('scrollTarget', 'portfolio'); setActivePage('marketing'); }}>View Portfolio</button>
                        </div>
                      </div>
                      <div className="solutions-image">
                        <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" alt="Marketing Analytics" />
                      </div>
                    </>
                  )}
                  {solutionSlide === 2 && (
                    <>
                      <div className="solutions-text">
                        <h2>Enterprise E-Commerce & Retail Innovation</h2>
                        <p>Build scalable, secure, and user-centric online stores that convert browsers into buyers. From inventory management to seamless checkout, we cover every aspect of modern retail.</p>
                        <div className="solutions-list">
                          {["E-Commerce Stores", "Payment Integration", "Inventory Management", "B2B Wholesale Portals", "Security Audit", "User Experience"].map((item, i) => (
                            <div key={i} className="solution-item">
                              <span className="check-icon">⚙</span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                        <div className="btn-row" style={{display: 'flex', gap: '15px', marginTop: '30px'}}>
                          <button className="analyze-btn" style={{margin: 0}} onClick={() => setActivePage('ecommerce')}>Start Selling</button>
                          <button className="analyze-btn" style={{margin: 0, background: 'white', border: '2px solid var(--dark-blue)', color: 'var(--dark-blue)'}} onClick={() => { sessionStorage.setItem('scrollTarget', 'portfolio'); setActivePage('ecommerce'); }}>View Portfolio</button>
                        </div>
                      </div>
                      <div className="solutions-image">
                        <img src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=800" alt="E-commerce" />
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="slider-dots">
                {[0, 1, 2].map((i) => (
                  <button 
                    key={i} 
                    className={`dot ${solutionSlide === i ? 'active' : ''}`}
                    onClick={() => setSolutionSlide(i)}
                  />
                ))}
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

          {/* UI/UX Showcase Section */}
          <section className="seo-audit" style={{ background: 'white' }}>
            <div className="container audit-container">
              <div className="audit-text reveal fade-up">
                <span className="sub-heading-new">Crafting Digital Experiences</span>
                <h2>Strategic UI/UX Design & Rapid Prototyping</h2>
                <p>We create intuitive, user-centric designs that drive engagement and loyalty. Our rapid prototyping process allows you to visualize your product before a single line of code is written.</p>
                <p>Every pixel is placed with purpose, ensuring a seamless journey for your users across all devices and platforms.</p>
                <div className="btn-row" style={{display: 'flex', gap: '15px', marginTop: '30px'}}>
                  <button className="analyze-btn" style={{ background: '#0f172a', margin: 0 }} onClick={() => setActivePage('uiux')}>VIEW DESIGN PROCESS</button>
                  <button className="analyze-btn" style={{ margin: 0, background: 'transparent', border: '2px solid #0f172a', color: '#0f172a' }} onClick={() => { sessionStorage.setItem('scrollTarget', 'portfolio'); setActivePage('uiux'); }}>VIEW PORTFOLIO</button>
                </div>
              </div>
              <div className="audit-image reveal fade-up">
                <img src="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800" alt="UI UX Design" />
              </div>
            </div>
          </section>

          {/* Cloud Infrastructure Section */}
          <section className="seo-audit">
            <div className="container audit-container">
              <div className="audit-image reveal fade-up">
                <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800" alt="Cloud Infrastructure" />
              </div>
              <div className="audit-text reveal fade-up">
                <span className="sub-heading-new">Infrastructure for Growth</span>
                <h2>Scalable Cloud Architecture & DevOps Excellence</h2>
                <p>Ensure your application remains performant as you scale. Our cloud experts build resilient, secure, and cost-effective infrastructures tailored to your business needs.</p>
                <p>From automated deployments to 24/7 monitoring, we provide the backbone your digital product needs to succeed in a competitive landscape.</p>
                <button className="analyze-btn">EXPLORE CLOUD SOLUTIONS</button>
              </div>
            </div>
          </section>
        </>
      )}


      {activePage === 'about' && <AboutUs />}
      {/* Social Sidebars */}
      <div className="social-sidebar-left">
        <a href="https://m.facebook.com/p/Dev-Spectra-61580077143686/?name=xhp_nt__fb__action__open_user&wtsid=rdr_00sNFa5KHtj8SF1dp#" target="_blank" rel="noreferrer" className="social-icon fb"><Facebook size={18} /></a>
        <a href="https://www.linkedin.com/search/results/all/?keywords=devspectra&origin=RICH_QUERY_TYPEAHEAD_HISTORY&heroEntityKey=urn%3Ali%3Aorganization%3A108557209&position=0" target="_blank" rel="noreferrer" className="social-icon li"><Linkedin size={18} /></a>
        <a href="https://www.instagram.com/devspectra_dm/" target="_blank" rel="noreferrer" className="social-icon ig"><Instagram size={18} /></a>
      </div>

      <div className="social-sidebar-right">
        <a href="https://www.youtube.com/@Devspectratech" target="_blank" rel="noreferrer" className="social-icon yt"><Youtube size={18} /></a>
        <a href="https://wa.me/917695890189" target="_blank" rel="noreferrer" className="social-icon wa">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
        <a href={`mailto:${settings?.contactEmail || 'contact@devspectra.com'}`} className="social-icon ml"><Mail size={18} /></a>
      </div>

      {activePage === 'how' && <HowItWorks setActivePage={setActivePage} />}
      {activePage === 'quote' && <RequestQuote />}
      {activePage === 'web-dev' && <WebDevelopment setActivePage={setActivePage} />}
      {activePage === 'mobile-dev' && <MobileDevelopment setActivePage={setActivePage} />}
      {activePage === 'uiux' && <UIUXBranding setActivePage={setActivePage} />}
      {activePage === 'marketing' && <DigitalMarketing setActivePage={setActivePage} />}
      {activePage === 'ecommerce' && <EcommerceSolutions setActivePage={setActivePage} />}
      {activePage === 'stories' && <SuccessStories />}
      {activePage === 'contact' && <Contact />}


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
              <a href="https://m.facebook.com/p/Dev-Spectra-61580077143686/?name=xhp_nt__fb__action__open_user&wtsid=rdr_00sNFa5KHtj8SF1dp#" target="_blank" rel="noreferrer" className="f-social-item fb"><Facebook size={18} /></a>
              <a href="https://www.linkedin.com/search/results/all/?keywords=devspectra&origin=RICH_QUERY_TYPEAHEAD_HISTORY&heroEntityKey=urn%3Ali%3Aorganization%3A108557209&position=0" target="_blank" rel="noreferrer" className="f-social-item ln"><Linkedin size={18} /></a>
              <a href="https://www.instagram.com/devspectra_dm/" target="_blank" rel="noreferrer" className="f-social-item in"><Instagram size={18} /></a>
              <a href="https://www.youtube.com/@Devspectratech" target="_blank" rel="noreferrer" className="f-social-item yt" style={{background: '#ff0000'}}><Youtube size={18} /></a>
            </div>
          </div>

          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('home'); }}>Home</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('about'); }}>About US</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('how'); }}>How it Works</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('stories'); }}>Success Stories</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('quote'); }}>Request a Quote</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('contact'); }}>Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Our Services</h3>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('web-dev'); }}>Web Development</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('mobile-dev'); }}>Mobile App Development</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('uiux'); }}>UI/UX Branding</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('marketing'); }}>Digital Marketing</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('ecommerce'); }}>E-Commerce Solutions</a></li>
            </ul>
          </div>

          <div className="footer-col contact-col">
            <h3>Contact Us</h3>
            <div className="f-contact-item">
              <MapPin size={18} />
              <span>{settings?.address || 'No.20/9, Sardar Patel Road, Chennai - 600020'}</span>
            </div>
            <div className="f-contact-item">
              <Phone size={18} />
              <span>{settings?.contactPhone || '+91 76958 90189'}</span>
            </div>
            <div className="f-contact-item">
              <Mail size={18} />
              <span>{settings?.contactEmail || 'contact@devspectra.com'}</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container f-bottom-flex">
            <p>&copy; 2024 DevSpectra Software. All rights reserved.</p>
            <div className="f-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer" style={{ color: '#f59e0b', fontWeight: 'bold' }}>Admin Portal</a>
            </div>
          </div>
        </div>
      </footer>
        </>
      )}


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
            <h3>NAVIGATION</h3>
            <ul className="mobile-nav-list">
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('home'); }}>HOME</a></li>
              
              <li className="mobile-dropdown-item">
                <div className="mobile-dropdown-trigger" onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}>
                  COMPANY <ChevronDown size={14} style={{ transform: mobileCompanyOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.3s' }} />
                </div>
                {mobileCompanyOpen && (
                  <ul className="mobile-sub-menu">
                    <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('about'); }}>ABOUT US</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('how'); }}>HOW IT WORKS</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('stories'); }}>SUCCESS STORIES</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('quote'); }}>REQUEST A QUOTE</a></li>
                  </ul>
                )}
              </li>

              <li className="mobile-dropdown-item">
                <div className="mobile-dropdown-trigger" onClick={() => setMobileServicesOpen(!mobileServicesOpen)}>
                  SERVICES <ChevronDown size={14} style={{ transform: mobileServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.3s' }} />
                </div>
                {mobileServicesOpen && (
                  <ul className="mobile-sub-menu">
                    <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('web-dev'); }}>WEB DEVELOPMENT</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('mobile-dev'); }}>MOBILE APP DEVELOPMENT</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('uiux'); }}>UI/UX & BRANDING</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('marketing'); }}>DIGITAL MARKETING</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('ecommerce'); }}>E-COMMERCE SOLUTIONS</a></li>
                  </ul>
                )}
              </li>

              <li><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('contact'); }}>CONTACT US</a></li>
            </ul>
          </div>

          <div className="sidebar-nav-section">
            <h3>HEAD OFFICE – INDIA</h3>
            <div className="office-info">
              <p><MapPin size={16} /> No.20/9, Sardar Patel Road, Janaki Complex, 4th Floor, Adyar, Chennai – 600020</p>
              <p><Phone size={16} /> Phone: +91 76958 90189</p>
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

            <div className="sidebar-socials">
              <a href="https://m.facebook.com/p/Dev-Spectra-61580077143686/?name=xhp_nt__fb__action__open_user&wtsid=rdr_00sNFa5KHtj8SF1dp#" target="_blank" rel="noreferrer"><Facebook size={18} /></a>
              <a href="https://www.linkedin.com/search/results/all/?keywords=devspectra&origin=RICH_QUERY_TYPEAHEAD_HISTORY&heroEntityKey=urn%3Ali%3Aorganization%3A108557209&position=0" target="_blank" rel="noreferrer"><Linkedin size={18} /></a>
              <a href="https://www.instagram.com/devspectra_dm/" target="_blank" rel="noreferrer"><Instagram size={18} /></a>
            </div>


        </div>
      </div>
      {isMobileMenuOpen && <div className="sidebar-overlay" onClick={toggleMobileMenu}></div>}


      <style>{`
        :root {
          --primary-emerald: #10b981;
          --accent-orange: #f59e0b;
          --dark-obsidian: #020617;
          --text-muted: #64748b;
        }

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
          background: var(--dark-obsidian);
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
          margin-bottom: 0 !important;
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
          height: 70px;
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
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 14px;
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
          border-top: 3px solid var(--accent-orange);
        }

        .nav-menu li:hover .dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .dropdown li a {
          padding: 15px 25px !important;
          color: #444 !important;
          font-family: var(--font-heading) !important;
          font-weight: 700 !important;
          font-size: 14px !important;
          text-transform: uppercase !important;
          display: block !important;
          white-space: nowrap !important;
          transition: all 0.3s ease !important;
        }

        .dropdown li a:hover {
          background: #fff5f0;
          color: var(--accent-orange) !important;
        }

        .nav-menu li a.active, .nav-menu li a:hover {
          color: var(--accent-orange) !important;
        }

        .nav-utils {
          display: flex;
          gap: 20px;
          color: var(--dark-obsidian);
        }

        .menu-trigger {
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .menu-trigger:hover {
          color: var(--accent-orange);
        }

        .hero-banner {
          background: linear-gradient(135deg, #020617 0%, #064e3b 100%, #10b981 100%);
          position: relative;
          min-height: 550px;
          padding: 100px 0;
          overflow: hidden;
          color: white;
        }

        .hero-container {
          display: grid;
          background: linear-gradient(135deg, #020617 0%, #064e3b 100%);
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
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
          padding: 8px 16px;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 2px;
          margin-bottom: 25px;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .accent-text-glow {
          color: #10b981;
          text-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
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
          background: #10b981;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
        }

        .discover-btn-premium {
          background: linear-gradient(90deg, #10b981, #059669);
          color: white;
          border: none;
          padding: 18px 40px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 1px;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
          transition: all 0.3s ease;
        }

        .discover-btn-premium:hover {
          box-shadow: 0 15px 40px rgba(16, 185, 129, 0.5);
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
          color: #020617;
        }

        .logo-text {
          font-size: 35px;
          font-weight: 800;
          letter-spacing: -1px;
          background: linear-gradient(to right, #10b981, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }

        .footer-logo-text {
          font-size: 26px;
          font-weight: 800;
          letter-spacing: -1px;
          background: linear-gradient(to right, #10b981, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }

        .stat-num {
          font-size: 28px;
          font-weight: 800;
          color: #10b981;
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

        .services-section {
          padding: 100px 0;
          background: #f8fafc;
        }

        .section-header-centered {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 60px;
        }

        .section-header-centered h2 {
          font-size: 36px;
          color: var(--dark-obsidian);
          margin-bottom: 20px;
        }

        .services-grid-main {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .service-item-new {
          background: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
          border-bottom: 4px solid transparent;
        }

        .service-item-new:hover {
          transform: translateY(-10px);
          border-color: var(--primary-emerald);
        }

        .service-icon-box {
          font-size: 40px;
          margin-bottom: 25px;
        }

        .service-text h3 {
          font-size: 20px;
          margin-bottom: 15px;
          color: var(--dark-obsidian);
        }

        .service-text p {
          color: var(--text-muted);
          font-size: 15px;
          line-height: 1.6;
        }

        .software-solutions {
          padding: 100px 0;
          background: white;
        }

        .solutions-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .solutions-text h2 {
          font-size: 36px;
          margin-bottom: 25px;
          color: var(--dark-obsidian);
        }

        .solutions-text p {
          color: var(--text-muted);
          margin-bottom: 35px;
        }

        .solutions-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .solution-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
          color: var(--dark-obsidian);
        }

        .check-icon {
          color: var(--primary-emerald);
        }

        .solutions-image img {
          width: 100%;
          border-radius: 30px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.1);
        }

        .slider-dots {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 40px;
        }

        .slider-dots .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid #e2e8f0;
          background: white;
          cursor: pointer;
          transition: 0.3s;
          padding: 0;
        }

        .slider-dots .dot.active {
          background: #10b981;
          border-color: #10b981;
          transform: scale(1.2);
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.3);
        }

        .slider-dots .dot:hover:not(.active) {
          border-color: #10b981;
        }

        .seo-audit {
          padding: 100px 0;
          background: #f8fafc;
        }

        .audit-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .audit-image img {
          width: 100%;
          height: 350px;
          object-fit: cover;
          border-radius: 30px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .sub-heading-new {
          color: var(--primary-emerald);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 13px;
          margin-bottom: 15px;
          display: block;
        }

        .audit-text h2 {
          font-size: 36px;
          margin-bottom: 25px;
          color: var(--dark-obsidian);
        }

        .analyze-btn {
          background: var(--dark-blue);
          color: white;
          border: none;
          padding: 15px 35px;
          border-radius: 50px;
          font-weight: 700;
          margin-top: 30px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .analyze-btn:hover {
          background: var(--primary-purple);
          transform: translateY(-3px);
        }

        /* Portfolio Section Home */
        .portfolio-section-new { padding: 100px 0; background: white; }
        .portfolio-grid-home { 
          display: flex; 
          gap: 30px; 
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          padding-bottom: 20px;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .portfolio-grid-home::-webkit-scrollbar {
          display: none;
        }
        .portfolio-card-home {
          flex: 0 0 calc(33.333% - 20px);
          scroll-snap-align: start;
        }
        .portfolio-card-home { border-radius: 24px; overflow: hidden; position: relative; height: 350px; cursor: pointer; }
        .p-img-box { width: 100%; height: 100%; position: relative; }
        .p-img-box img { width: 100%; height: 100%; object-fit: cover; transition: 0.5s; }
        .p-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(2, 6, 23, 0.9) 0%, transparent 100%); padding: 30px; display: flex; flex-direction: column; justify-content: flex-end; opacity: 0; transform: translateY(20px); transition: 0.4s; }
        .portfolio-card-home:hover .p-overlay { opacity: 1; transform: translateY(0); }
        .portfolio-card-home:hover .p-img-box img { transform: scale(1.1); }
        .p-cat { color: #10b981; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; }
        .p-overlay h3 { color: white; font-size: 22px; font-weight: 800; margin-bottom: 10px; }
        .p-overlay p { color: #94a3b8; font-size: 14px; line-height: 1.5; }


        .mobile-sidebar {
          position: fixed;
          top: 0;
          right: -100%;
          width: 85%;
          max-width: 420px;
          height: 100vh;
          background: white;
          z-index: 1000;
          transition: all 0.5s cubic-bezier(0.77, 0, 0.175, 1);
          padding: 20px 25px;
          box-shadow: -10px 0 30px rgba(0,0,0,0.1);
          overflow-y: auto;
        }

        .mobile-sidebar.open {
          right: 0;
        }

        .sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }

        .close-sidebar-btn-round {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid #eee;
          background: white;
          font-size: 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .close-sidebar-btn-round:hover {
          background: #10b981;
          transform: rotate(90deg);
        }

        .welcome-tag {
          background: #f8fafc;
          padding: 15px 25px;
          border-radius: 12px;
          font-weight: 700;
          color: var(--primary-purple);
          margin-bottom: 40px;
          text-align: center;
        }

        .sidebar-nav-section {
          margin-bottom: 40px;
        }

        .sidebar-nav-section h3 {
          font-size: 14px;
          color: var(--text-muted);
          letter-spacing: 2px;
          margin-bottom: 20px;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }

        .office-info p {
          display: flex;
          gap: 15px;
          margin-bottom: 15px;
          font-size: 14px;
          color: var(--dark-obsidian);
          line-height: 1.6;
        }
        .mobile-dropdown-trigger {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 0;
          font-weight: 800;
          font-size: 16px;
          color: var(--dark-obsidian);
          cursor: pointer;
          border-bottom: 1px solid #f1f5f9;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }

        .mobile-dropdown-trigger:hover {
          color: var(--primary-emerald);
          padding-left: 5px;
        }

        .mobile-sub-menu {
          list-style: none;
          padding: 5px 20px;
          background: #f8fafc;
          border-left: 3px solid var(--accent-orange);
          margin-top: 5px;
          margin-bottom: 10px;
        }

        .mobile-sub-menu li a {
          font-size: 13.5px !important;
          font-weight: 700 !important;
          color: #1e293b !important;
          padding: 12px 0 !important;
          display: block !important;
          text-decoration: none !important;
          white-space: nowrap !important;
        }

        .mobile-sub-menu li a:hover {
          color: var(--accent-orange) !important;
          padding-left: 5px !important;
        }

        .sidebar-socials {
          display: flex;
          gap: 20px;
          color: var(--text-muted);
        }

        .sidebar-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(5px);
          z-index: 999;
        }

        .mobile-nav-list {
          list-style: none;
          padding: 0;
          margin-bottom: 20px;
        }

        .mobile-nav-list li {
          border-bottom: 1px solid #f1f5f9;
        }

        .mobile-nav-list li a {
          text-decoration: none;
          color: var(--dark-obsidian);
          font-weight: 700;
          font-size: 16px;
          display: block;
          padding: 12px 0;
          transition: all 0.3s ease;
        }

        .mobile-nav-list li a:hover {
          color: var(--primary-emerald);
          padding-left: 10px;
        }

        @media (max-width: 1200px) {
          .hero-text h1 { font-size: 48px; }
          .hero-content { grid-template-columns: 1fr; text-align: center; }
          .hero-text p { margin: 0 auto 35px; }
          .hero-features { justify-content: center; }
           .hero-image-premium-container { display: block !important; margin: 40px auto 0 !important; max-width: 90%; }
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 992px) {
          .nav-menu { display: none; }
          .services-grid-main { grid-template-columns: 1fr 1fr; }
          .solutions-container, .audit-container { grid-template-columns: 1fr; text-align: center; }
          .solutions-image, .audit-image { order: -1; }
        }

        @media (max-width: 992px) {
          .portfolio-card-home {
            flex: 0 0 calc(50% - 15px);
          }
        }
        @media (max-width: 768px) {
          .portfolio-card-home {
            flex: 0 0 100%;
          }
          .services-grid-main { grid-template-columns: 1fr; }
          .top-bar-right { display: none; }
          .hero-text h1 { font-size: 36px; }
          .container { padding: 0 20px; }
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
          .main-logo-img {
            height: 60px;
          }
        }

        @media (max-width: 480px) {
          .mobile-sidebar {
            width: 85%;
            right: -100%;
          }
          .hero-text h1 {
            font-size: 28px;
          }
          .hero-text p {
            font-size: 16px;
          }
          .discover-btn-premium {
            width: 100%;
            padding: 15px 20px;
          }
          .container {
            padding: 0 15px;
          }
          .hero-features {
            grid-template-columns: 1fr;
            gap: 10px;
          }
        }
      `}</style>

      {activePage === 'admin' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'white' }}>
          <AdminPortal onLogout={() => setActivePage('home')} refreshData={fetchData} />
        </div>
      )}
      {/* Info Modal */}
      <AnimatePresence>
        {showInfoModal && (
          <div className="modal-overlay" style={{zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={() => setShowInfoModal(false)}>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="detail-modal" 
              style={{maxWidth: '600px', width: '90%', maxHeight: '80vh', overflowY: 'auto'}}
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-top-brand">
                <img src={logo} alt="DevSpectra Logo" className="modal-logo-small" />
                <span className="modal-brand-name">DevSpectra Digital</span>
              </div>
              <button className="close-modal" onClick={() => setShowInfoModal(false)}>×</button>
              
              <div style={{padding: '40px'}}>
                <h2 style={{fontSize: '32px', fontWeight: '900', marginBottom: '15px', color: '#0f172a'}}>DevSpectra at a Glance</h2>
                <p style={{color: '#64748b', lineHeight: '1.7', marginBottom: '30px'}}>
                  DevSpectra is a premier technology agency specializing in transforming businesses through high-performance software development and data-driven digital marketing. We bridge the gap between complex technology and business growth.
                </p>

                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px'}}>
                  <div style={{background: '#f8fafc', padding: '20px', borderRadius: '15px', border: '1px solid #f1f5f9'}}>
                    <h4 style={{fontSize: '14px', color: '#10b981', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px'}}>Core Expertise</h4>
                    <ul style={{listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', color: '#475569', fontWeight: '600'}}>
                      <li style={{marginBottom: '8px'}}>• Web Architecture</li>
                      <li style={{marginBottom: '8px'}}>• Mobile Eco-systems</li>
                      <li style={{marginBottom: '8px'}}>• E-Commerce Growth</li>
                      <li>• Strategic SEO</li>
                    </ul>
                  </div>
                  <div style={{background: '#f8fafc', padding: '20px', borderRadius: '15px', border: '1px solid #f1f5f9'}}>
                    <h4 style={{fontSize: '14px', color: '#3b82f6', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px'}}>Support HQ</h4>
                    <p style={{fontSize: '13px', color: '#475569', lineHeight: '1.6'}}>
                      {settings?.address || 'No.20/9, Sardar Patel Road, Chennai - 600020'}<br/>
                      <strong>India</strong><br/>
                      Phone: +91 76958 90189
                    </p>
                  </div>
                </div>

                <div style={{textAlign: 'center'}}>
                  <button 
                    className="primary-btn" 
                    style={{width: '100%', padding: '18px', background: '#0f172a'}}
                    onClick={() => { setShowInfoModal(false); setActivePage('contact'); }}
                  >
                    Partner With Us Today
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
