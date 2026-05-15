import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Facebook, 
  Linkedin, 
  Instagram, 
  Youtube,
  Clock, 
  Globe,
  CheckCircle2,
  User,
  MessageSquare,
  Building,
  Monitor
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    type: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/public/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          subject: `Website Inquiry: ${formData.type}`,
          details: { company: formData.company }
        })
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please check your connection.");
    } finally {
      setLoading(false);
    }
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
                  <p>IN: +91 76958 90189</p>
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
                  <a href="https://m.facebook.com/p/Dev-Spectra-61580077143686/?name=xhp_nt__fb__action__open_user&wtsid=rdr_00sNFa5KHtj8SF1dp#" target="_blank" rel="noreferrer" className="s-icon" style={{background: '#1877F2', color: '#fff'}}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/search/results/all/?keywords=devspectra&origin=RICH_QUERY_TYPEAHEAD_HISTORY&heroEntityKey=urn%3Ali%3Aorganization%3A108557209&position=0" target="_blank" rel="noreferrer" className="s-icon" style={{background: '#0A66C2', color: '#fff'}}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/devspectra_dm/" target="_blank" rel="noreferrer" className="s-icon" style={{background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', color: '#fff'}}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.558.217.957.477 1.377.896.419.42.679.819.896 1.377.163.422.358 1.057.412 2.227.059 1.265.071 1.645.071 4.85s-.012 3.584-.071 4.85c-.054 1.17-.249 1.805-.412 2.227-.217.558-.477.957-.896 1.377-.42.419-.819.679-1.377.896-.422.163-1.057.358-2.227.412-1.265.059-1.645.071-4.85.071s-3.584-.012-4.85-.071c-1.17-.054-1.805-.249-2.227-.412-.558-.217-.957-.477-1.377-.896-.419-.42-.679-.819-.896-1.377-.163-.422-.358-1.057-.412-2.227-.059-1.265-.071-1.645-.071-4.85s.012-3.584.071-4.85c.054-1.17.249-1.805.412-2.227.217-.558.477-.957.896-1.377.42-.419.819-.679 1.377-.896.422-.163 1.057-.358 2.227-.412 1.265-.059 1.645-.071 4.85-.071zM12 0C8.741 0 8.333.014 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.741 0 12s.012 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126s1.384 1.078 2.126 1.384c.766.296 1.636.499 2.913.558C8.333 23.988 8.741 24 12 24s3.667-.012 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384s1.078-1.384 1.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.012-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126s-1.384-1.078-2.126-1.384c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </a>
                  <a href="https://www.youtube.com/@Devspectratech" target="_blank" rel="noreferrer" className="s-icon" style={{background: '#FF0000', color: '#fff'}}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
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
                    <input 
                      type="text" 
                      name="name"
                      placeholder="John Doe" 
                      value={formData.name}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className="input-group">
                    <label><Mail size={14} /> Email Address *</label>
                    <input 
                      type="email" 
                      name="email"
                      placeholder="john@example.com" 
                      value={formData.email}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="input-group">
                    <label><Phone size={14} /> Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      placeholder="+91 00000 00000" 
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group">
                    <label><Building size={14} /> Company Name</label>
                    <input 
                      type="text" 
                      name="company"
                      placeholder="Your Company" 
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label><Monitor size={14} /> Website Type *</label>
                  <select 
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  >
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
                  <textarea 
                    name="message"
                    placeholder="Tell us about your project or inquiry..." 
                    rows="5" 
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-contact-btn" disabled={loading}>
                  {loading ? 'SENDING...' : 'SEND MESSAGE'} <Send size={18} />
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
        .s-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; box-shadow: 0 5px 15px rgba(0,0,0,0.1); cursor: pointer; transition: 0.3s; }
        .s-icon:hover { transform: translateY(-3px); filter: brightness(1.1); box-shadow: 0 10px 20px rgba(0,0,0,0.15); }

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
