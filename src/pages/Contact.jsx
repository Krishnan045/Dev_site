import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Clock, 
  Globe,
  CheckCircle2,
  User,
  MessageSquare,
  Building,
  Monitor
} from 'lucide-react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="contact-success-page">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="success-card"
          >
            <CheckCircle2 size={80} color="#10b981" />
            <h2>Message Sent!</h2>
            <p>Thank you for reaching out to DevSpectra. Our team will get back to you within 24 hours.</p>
            <button className="back-btn" onClick={() => setSubmitted(false)}>SEND ANOTHER MESSAGE</button>
          </motion.div>
        </div>
        <style>{`
          .contact-success-page { padding: 160px 0; text-align: center; background: #f8fafc; min-height: 80vh; display: flex; align-items: center; }
          .success-card { background: white; padding: 80px 40px; border-radius: 30px; box-shadow: 0 20px 50px rgba(0,0,0,0.05); max-width: 600px; margin: 0 auto; }
          .success-card h2 { font-size: 36px; color: #020617; margin: 25px 0 15px; }
          .success-card p { color: #64748b; line-height: 1.8; margin-bottom: 40px; }
          .back-btn { background: #10b981; color: white; border: none; padding: 15px 40px; border-radius: 30px; font-weight: 700; cursor: pointer; transition: 0.3s; }
          .back-btn:hover { background: #059669; transform: translateY(-3px); }
        `}</style>
      </div>
    );
  }

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="contact-hero-text"
          >
            <h1>Get In Touch</h1>
            <p>Have a question or a project in mind? We'd love to hear from you. Let's start a conversation about your digital future.</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Info Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="contact-info-cards"
            >
              <div className="info-card reveal fade-up">
                <div className="info-icon-box" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                  <MapPin size={24} />
                </div>
                <div className="info-text">
                  <h3>Head Office – INDIA</h3>
                  <p>No.20/9, Sardar Patel Road, Janaki Complex, 4th Floor, Adyar, Chennai – 600020</p>
                </div>
              </div>

              <div className="info-card reveal fade-up" style={{ transitionDelay: '0.1s' }}>
                <div className="info-icon-box" style={{ background: 'rgba(5, 150, 105, 0.1)', color: '#059669' }}>
                  <MapPin size={24} />
                </div>
                <div className="info-text">
                  <h3>Branch Office – USA</h3>
                  <p>6838 Exeter St, Queens, NY 11375, United States</p>
                </div>
              </div>

              <div className="info-card reveal fade-up" style={{ transitionDelay: '0.2s' }}>
                <div className="info-icon-box" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                  <Phone size={24} />
                </div>
                <div className="info-text">
                  <h3>Call Us</h3>
                  <p>IN: +91 99520 74904</p>
                  <p>US: +1 (718) 395-9499</p>
                </div>
              </div>

              <div className="info-card reveal fade-up" style={{ transitionDelay: '0.3s' }}>
                <div className="info-icon-box" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                  <Mail size={24} />
                </div>
                <div className="info-text">
                  <h3>Email Us</h3>
                  <p>contact@devspectra.com</p>
                  <p>sales@devspectra.com</p>
                </div>
              </div>

              <div className="social-connect">
                <h3>Follow Our Journey</h3>
                <div className="social-icons-group">
                  <div className="s-icon"><Facebook size={20} /></div>
                  <div className="s-icon"><Twitter size={20} /></div>
                  <div className="s-icon"><Linkedin size={20} /></div>
                  <div className="s-icon"><Instagram size={20} /></div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="contact-form-container"
            >
              <form onSubmit={handleSubmit} className="premium-contact-form">
                <div className="form-title">
                  <h2>Send Us a Message</h2>
                  <p>Fields marked with * are required.</p>
                </div>

                <div className="form-row">
                  <div className="input-group">
                    <label><User size={14} /> Full Name *</label>
                    <input type="text" placeholder="John Doe" required />
                  </div>
                  <div className="input-group">
                    <label><Mail size={14} /> Email Address *</label>
                    <input type="email" placeholder="john@example.com" required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="input-group">
                    <label><Phone size={14} /> Phone Number</label>
                    <input type="tel" placeholder="+91 00000 00000" />
                  </div>
                  <div className="input-group">
                    <label><Building size={14} /> Company Name</label>
                    <input type="text" placeholder="Your Company" />
                  </div>
                </div>

                <div className="input-group">
                  <label><Monitor size={14} /> Website Type *</label>
                  <select required>
                    <option value="">Select Website Type</option>
                    <option value="business">Business Website</option>
                    <option value="ecommerce">E-commerce Store</option>
                    <option value="portfolio">Portfolio Website</option>
                    <option value="blog">Blog / News Portal</option>
                    <option value="landing">Landing Page</option>
                    <option value="custom">Custom Web Application</option>
                    <option value="saas">SaaS Platform</option>
                  </select>
                </div>

                <div className="input-group">
                  <label><MessageSquare size={14} /> Your Message *</label>
                  <textarea placeholder="Tell us about your project or inquiry..." rows="5" required></textarea>
                </div>

                <button type="submit" className="submit-contact-btn">
                  SEND MESSAGE <Send size={18} />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="map-section reveal fade-up">
        <div className="container">
          <div className="map-placeholder">
            <div className="map-overlay">
              <Globe size={48} className="map-icon" />
              <h3>Our Global Presence</h3>
              <p>Serving clients across India, USA, and beyond.</p>
            </div>
            <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200" alt="World Map" />
          </div>
        </div>
      </section>

      <style>{`
        .contact-page { background: #ffffff; padding-bottom: 100px; }
        
        .contact-hero {
          background: #020617;
          background-image: linear-gradient(rgba(2, 6, 23, 0.9), rgba(6, 78, 59, 0.8)), url('https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80&w=1200');
          background-size: cover;
          background-position: center;
          padding: 120px 0 100px;
          color: white;
          text-align: center;
        }
        .contact-hero-text h1 { font-size: 56px; font-weight: 900; margin-bottom: 20px; letter-spacing: -1px; }
        .contact-hero-text p { font-size: 20px; opacity: 0.8; max-width: 700px; margin: 0 auto; line-height: 1.6; }

        .contact-content { padding: 100px 0; background: #f8fafc; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 80px; align-items: start; }
        
        .contact-info-cards { display: flex; flex-direction: column; gap: 25px; }
        .info-card { background: white; padding: 30px; border-radius: 24px; display: flex; gap: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.03); transition: 0.3s; }
        .info-card:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(0,0,0,0.06); }
        .info-icon-box { width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .info-text h3 { font-size: 18px; font-weight: 800; color: #1e293b; margin-bottom: 8px; }
        .info-text p { color: #64748b; line-height: 1.6; font-size: 15px; margin-bottom: 4px; }

        .social-connect { margin-top: 20px; padding: 30px; }
        .social-connect h3 { font-size: 20px; font-weight: 800; color: #1e293b; margin-bottom: 20px; }
        .social-icons-group { display: flex; gap: 15px; }
        .s-icon { width: 44px; height: 44px; background: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #10b981; box-shadow: 0 5px 15px rgba(0,0,0,0.05); cursor: pointer; transition: 0.3s; }
        .s-icon:hover { background: #10b981; color: white; transform: translateY(-3px); }

        .contact-form-container { background: white; padding: 50px; border-radius: 32px; box-shadow: 0 20px 50px rgba(0,0,0,0.05); }
        .form-title { margin-bottom: 40px; }
        .form-title h2 { font-size: 32px; font-weight: 800; color: #1e293b; margin-bottom: 10px; }
        .form-title p { color: #64748b; font-size: 15px; }

        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-bottom: 25px; }
        .input-group { display: flex; flex-direction: column; gap: 10px; margin-bottom: 25px; }
        .input-group label { font-weight: 700; color: #1e293b; font-size: 14px; display: flex; align-items: center; gap: 8px; }
        .input-group input, .input-group select, .input-group textarea { padding: 15px 20px; border: 1px solid #e2e8f0; border-radius: 12px; font-size: 15px; transition: all 0.3s ease; background: #f8fafc; font-family: inherit; }
        .input-group input:focus, .input-group select:focus, .input-group textarea:focus { border-color: #10b981; background: white; box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1); outline: none; }
        
        .submit-contact-btn { width: 100%; background: #10b981; color: white; border: none; padding: 18px; border-radius: 12px; font-weight: 800; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 12px; transition: all 0.3s ease; margin-top: 10px; }
        .submit-contact-btn:hover { background: #059669; transform: translateY(-3px); box-shadow: 0 15px 30px rgba(16, 185, 129, 0.3); }

        .map-section { padding: 100px 0; }
        .map-placeholder { position: relative; height: 450px; border-radius: 32px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.1); }
        .map-placeholder img { width: 100%; height: 100%; object-fit: cover; opacity: 0.6; }
        .map-overlay { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; background: rgba(2, 6, 23, 0.4); color: white; z-index: 5; }
        .map-icon { margin-bottom: 20px; color: #10b981; }
        .map-overlay h3 { font-size: 28px; font-weight: 800; margin-bottom: 10px; }
        .map-overlay p { font-size: 18px; opacity: 0.9; }

        @media (max-width: 992px) {
          .contact-grid { grid-template-columns: 1fr; gap: 60px; }
          .contact-hero-text h1 { font-size: 42px; }
          .contact-form-container { padding: 30px; }
        }
        @media (max-width: 576px) {
          .form-row { grid-template-columns: 1fr; }
          .contact-hero-text h1 { font-size: 32px; }
        }
      `}</style>
    </div>
  );
};

export default Contact;
