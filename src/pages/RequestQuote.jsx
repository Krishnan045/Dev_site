import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Mail, Phone, Building, MessageSquare, CheckCircle } from 'lucide-react';

const RequestQuote = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="quote-success-page">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="success-card"
          >
            <CheckCircle size={80} color="#2ecc71" />
            <h2>Request Received!</h2>
            <p>Thank you for reaching out to DevSpectra. Our strategy team will review your requirements and contact you within 24 hours with a detailed proposal.</p>
            <button className="back-home-btn" onClick={() => window.location.reload()}>SEND ANOTHER REQUEST</button>
          </motion.div>
        </div>
        <style jsx>{`
          .quote-success-page {
            padding: 160px 0;
            text-align: center;
            background: #f8fafc;
            min-height: 80vh;
            display: flex;
            align-items: center;
          }
          .success-card {
            background: white;
            padding: 80px 40px;
            border-radius: 30px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.05);
            max-width: 600px;
            margin: 0 auto;
          }
          .success-card h2 {
            font-size: 36px;
            color: #0b132b;
            margin: 25px 0 15px;
          }
          .success-card p {
            color: #64748b;
            line-height: 1.8;
            margin-bottom: 40px;
          }
          .back-home-btn {
            background: #5e5ce6;
            color: white;
            border: none;
            padding: 15px 40px;
            border-radius: 30px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          .back-home-btn:hover {
            background: #3a0ca3;
            transform: translateY(-3px);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="quote-page">
      {/* Hero */}
      <section className="quote-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="quote-hero-text"
          >
            <h1>Let's Build Something Extraordinary</h1>
            <p>Share your vision with us, and we'll provide the technical roadmap and expertise to make it a reality.</p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="quote-form-section">
        <div className="container">
          <div className="quote-grid">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5 }}
              viewport={{ once: true }}
              className="quote-info"
            >
              <h2>Why Partner with Us?</h2>
              <div className="benefit-list">
                <div className="benefit-item">
                  <div className="b-icon"><CheckCircle size={20} /></div>
                  <div>
                    <h4>Rapid Turnaround</h4>
                    <p>Get a comprehensive quote and project roadmap within 24-48 hours.</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="b-icon"><CheckCircle size={20} /></div>
                  <div>
                    <h4>Custom Solutions</h4>
                    <p>We don't do one-size-fits-all. Every proposal is tailored to your specific ROI goals.</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="b-icon"><CheckCircle size={20} /></div>
                  <div>
                    <h4>Expert Guidance</h4>
                    <p>Speak directly with senior architects during the scoping phase.</p>
                  </div>
                </div>
              </div>

              <div className="quote-contact-info">
                <h3>Direct Contact</h3>
                <p><Phone size={16} /> +91 99520 74904</p>
                <p><Mail size={16} /> sales@devspectra.com</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5 }}
              viewport={{ once: true }}
              className="form-container"
            >
              <form onSubmit={handleSubmit} className="premium-form">
                <div className="form-group-grid">
                  <div className="input-group">
                    <label><User size={14} /> Full Name</label>
                    <input type="text" placeholder="John Doe" required />
                  </div>
                  <div className="input-group">
                    <label><Mail size={14} /> Email Address</label>
                    <input type="email" placeholder="john@example.com" required />
                  </div>
                </div>

                <div className="form-group-grid">
                  <div className="input-group">
                    <label><Phone size={14} /> Phone Number</label>
                    <input type="tel" placeholder="+91 00000 00000" />
                  </div>
                  <div className="input-group">
                    <label><MessageSquare size={14} /> Why choose US</label>
                    <input type="text" placeholder="e.g. Your Interests" required />
                  </div>
                </div>

                <div className="input-group">
                  <label>Subject</label>
                  <select required>
                    <option value="">Select a Service</option>
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile App Development</option>
                    <option value="uiux">UI/UX & Branding</option>
                    <option value="marketing">Digital Marketing</option>
                    <option value="ecommerce">E-Commerce Solutions</option>
                  </select>
                </div>

                <div className="input-group">
                  <label><MessageSquare size={14} /> Project Details</label>
                  <textarea placeholder="Tell us about your project, goals, and any specific requirements..." rows="5" required></textarea>
                </div>

                <button type="submit" className="submit-quote-btn">
                  GET MY FREE QUOTE <Send size={18} />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .quote-hero {
          background-color: #0b132b;
          background-image: linear-gradient(rgba(9, 11, 19, 0.85), rgba(43, 52, 79, 0.85)), url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          padding: 80px 0 60px;
          color: white;
          text-align: center;
        }
        .quote-hero-text h1 {
          font-size: 48px;
          font-weight: 800;
          margin-bottom: 20px;
        }
        .quote-hero-text p {
          font-size: 20px;
          opacity: 0.8;
          max-width: 800px;
          margin: 0 auto;
        }
        .quote-form-section {
          padding: 100px 0;
          background: #f8fafc;
        }
        .quote-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 80px;
          align-items: start;
        }
        .quote-info h2 {
          font-size: 32px;
          color: #0b132b;
          margin-bottom: 40px;
        }
        .benefit-list {
          display: flex;
          flex-direction: column;
          gap: 30px;
          margin-bottom: 50px;
        }
        .benefit-item {
          display: flex;
          gap: 20px;
        }
        .b-icon {
          color: #2ecc71;
          margin-top: 3px;
        }
        .benefit-item h4 {
          font-size: 20px;
          color: #0b132b;
          margin-bottom: 8px;
        }
        .benefit-item p {
          color: #64748b;
          line-height: 1.6;
        }
        .quote-contact-info h3 {
          font-size: 22px;
          color: #0b132b;
          margin-bottom: 20px;
        }
        .quote-contact-info p {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #5e5ce6;
          font-weight: 600;
          margin-bottom: 15px;
        }
        .form-container {
          background: white;
          padding: 50px;
          border-radius: 30px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.05);
        }
        .form-group-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 25px;
          margin-bottom: 25px;
        }
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 25px;
        }
        .input-group label {
          font-weight: 700;
          color: #0b132b;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .input-group input, .input-group select, .input-group textarea {
          padding: 15px 20px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          font-size: 15px;
          transition: all 0.3s ease;
          background: #f8fafc;
        }
        .input-group input:focus, .input-group select:focus, .input-group textarea:focus {
          border-color: #5e5ce6;
          background: white;
          box-shadow: 0 0 0 4px rgba(94, 92, 230, 0.1);
          outline: none;
        }
        .submit-quote-btn {
          width: 100%;
          background: #5e5ce6;
          color: white;
          border: none;
          padding: 18px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: all 0.3s ease;
          margin-top: 10px;
        }
        .submit-quote-btn:hover {
          background: #3a0ca3;
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(94, 92, 230, 0.3);
        }
        @media (max-width: 992px) {
          .quote-grid { grid-template-columns: 1fr; }
          .form-container { padding: 30px; }
        }
        @media (max-width: 576px) {
          .form-group-grid { grid-template-columns: 1fr; }
          .quote-hero-text h1 { font-size: 36px; }
        }
      `}</style>
    </div>
  );
};

export default RequestQuote;
