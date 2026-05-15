import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, CheckCircle, TrendingUp, Users, ArrowRight, Upload } from 'lucide-react';

const SuccessStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ client: '', result: '', story: '', clientImage: '' });
  const [submitStatus, setSubmitStatus] = useState({ type: '', msg: '' });
  const [activeView, setActiveView] = useState('stories'); // 'stories' or 'form'

  useEffect(() => {
    fetch('/api/public/stories')
      .then(res => res.json())
      .then(data => {
        setStories(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching stories:", err);
        setLoading(false);
      });
  }, []);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setSubmitStatus({ type: 'error', msg: 'File too large. Max 5MB allowed.' });
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFormData({ ...formData, clientImage: reader.result });
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/public/stories/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSubmitStatus({ type: 'success', msg: 'Thank you! Your story has been published to our feedback wall.' });
        setFormData({ client: '', result: '', story: '', clientImage: '' });
      } else {
        setSubmitStatus({ type: 'error', msg: 'Failed to submit. Please try again.' });
      }
    } catch (err) {
      setSubmitStatus({ type: 'error', msg: 'Network error. Please try again later.' });
    }
    setSubmitting(false);
    setTimeout(() => setSubmitStatus({ type: '', msg: '' }), 5000);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="success-stories-page">
      {/* Hero Banner */}
      <section className="stories-hero">
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="hero-content-centered"
          >
            <span className="premium-tag">CASE STUDIES</span>
            <h1>Success <span className="text-gradient-emerald">Stories</span></h1>
            <p>Real results for real businesses. Explore how our strategic solutions have delivered measurable impact and growth for our clients across various industries.</p>
          </motion.div>
        </div>
        <div className="hero-bg-shapes">
          <div className="shape-1"></div>
          <div className="shape-2"></div>
        </div>
      </section>

      {/* View Toggle Bar */}
      <section className="view-toggle-bar">
        <div className="container">
          <div className="toggle-container-premium">
            <button
              className={`toggle-btn-new ${activeView === 'stories' ? 'active' : ''}`}
              onClick={() => setActiveView('stories')}
            >
              <CheckCircle size={20} />
              <span>Client Feedback</span>
            </button>
            <button
              className={`toggle-btn-new ${activeView === 'form' ? 'active' : ''}`}
              onClick={() => setActiveView('form')}
            >
              <Trophy size={20} />
              <span>Success Form</span>
            </button>
          </div>
        </div>
      </section>

      {/* Conditional Content */}
      {activeView === 'stories' ? (
        <section className="stories-grid-section">
          <div className="container">
            {loading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading achievements...</p>
              </div>
            ) : stories.length === 0 ? (
              <div className="empty-state">
                <Trophy size={48} opacity={0.2} />
                <h3>No success stories found.</h3>
                <p>Stay tuned! We're busy creating more success for our clients.</p>
              </div>
            ) : (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
                className="stories-list-premium"
              >
                {stories.filter(s => s.isActive !== false).map((story, i) => (
                  <motion.div key={story.id} variants={fadeInUp} className="story-card-horizontal">
                    <div className="story-image-side">
                      {story.clientImage ? (
                        <img src={story.clientImage} alt={story.client} className="main-client-img" />
                      ) : (
                        <div className="client-placeholder-large">
                          <span>{story.client?.charAt(0).toUpperCase()}</span>
                        </div>
                      )}
                      <div className="client-info-overlay-bottom">
                        <div className="overlay-client-name">{story.client}</div>
                        <div className="overlay-impact">{story.result}</div>
                      </div>
                    </div>

                    <div className="story-content-side">
                      <div className="story-content-inner">
                        <div className="story-header-premium">
                          <span className="case-study-label">CASE STUDY</span>
                          <h3>{story.client}'s Strategic Growth</h3>
                        </div>

                        <div className="story-main-paragraph">
                          {story.story.split('⚙')[0]}
                        </div>

                        <div className="story-points-container">
                          {story.story.includes('⚙') && (
                            <ul className="story-points-list">
                              {story.story.split('⚙').slice(1).map((point, idx) => (
                                <li key={idx} className="story-point-item">
                                  <div className="point-dot"></div>
                                  <span>{point.trim()}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        <div className="story-footer-new">
                          <div className="verified-status">
                            <div className="pulse-dot"></div>
                            <span>Success Verified</span>
                          </div>
                          <div className="footer-action">
                            <span>View Impact</span>
                            <ArrowRight size={18} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      ) : (
        <section className="share-story-section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="share-story-card"
            >
              <div className="share-story-header">
                <Trophy size={40} className="text-gradient-emerald" />
                <h2>Share Your <span className="text-gradient-emerald">Success Story</span></h2>
                <p>We value our partnerships. Share your experience and the impact we've made together on your business growth.</p>
              </div>

              <form onSubmit={handleSubmit} className="submission-form-premium">
                <div className="form-grid-premium">
                  <div className="form-group-premium">
                    <label>Your Name / Company</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acme Corp"
                      value={formData.client}
                      onChange={e => setFormData({ ...formData, client: e.target.value })}
                    />
                  </div>
                  <div className="form-group-premium">
                    <label>Key Achievement</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 300% Growth in Sales"
                      value={formData.result}
                      onChange={e => setFormData({ ...formData, result: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group-premium">
                  <label>Tell Your Story</label>
                  <textarea
                    required
                    placeholder="Describe the project and the positive impact it had..."
                    value={formData.story}
                    onChange={e => setFormData({ ...formData, story: e.target.value })}
                  ></textarea>
                </div>

                <div className="form-group-premium">
                  <label>Client Photo / Logo</label>
                  <div className="upload-input-group">
                    <input 
                      type="text" 
                      placeholder="Paste image URL or upload file →" 
                      value={formData.clientImage.startsWith('data:image') ? 'File selected (Image data)' : formData.clientImage}
                      onChange={e => setFormData({...formData, clientImage: e.target.value})}
                      className="upload-text-input"
                    />
                    <button type="button" className="upload-trigger-btn" onClick={() => document.getElementById('public-file').click()}>
                      <Upload size={18} />
                      Choose File
                    </button>
                    <input 
                      type="file" 
                      id="public-file" 
                      hidden 
                      accept="image/*" 
                      onChange={handleFileChange}
                    />
                  </div>
                  <p className="input-hint">Select a photo from your device or paste a web link.</p>
                </div>

                <button type="submit" className="submit-story-btn" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Send My Story'}
                  <ArrowRight size={20} />
                </button>

                {submitStatus.msg && (
                  <div className={`form-status-msg ${submitStatus.type}`}>
                    {submitStatus.msg}
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </section>
      )}

      <style>{`
        .success-stories-page {
          background: #ffffff;
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
        }

        .stories-hero {
          background-image: linear-gradient(rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.6)), url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed;
          padding: 100px 0 60px;
          min-height: 250px;
          display: flex;
          align-items: center;
          color: white;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .hero-content-centered {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }

        .hero-content-centered h1 {
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 900;
          line-height: 1.1;
          margin: 20px 0 25px;
          color: white;
          letter-spacing: -2px;
        }

        .hero-content-centered p {
          font-size: 20px;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.8;
          max-width: 700px;
          margin: 0 auto;
        }

        .premium-tag {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          padding: 8px 20px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .text-gradient-emerald {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-bg-shapes .shape-1 {
          position: absolute;
          top: -100px;
          right: -100px;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%);
          border-radius: 50%;
        }

        .hero-bg-shapes .shape-2 {
          position: absolute;
          bottom: -150px;
          left: -100px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(5, 150, 105, 0.03) 0%, transparent 70%);
          border-radius: 50%;
        }

        .view-toggle-bar {
          background: white;
          padding: 25px 0;
          border-bottom: 1px solid #f1f5f9;
        }

        .toggle-container-premium {
          display: flex;
          justify-content: center;
          gap: 20px;
        }

        .toggle-btn-new {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 15px 40px;
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 800;
          font-size: 15px;
          color: #64748b;
          cursor: pointer;
          transition: 0.3s;
        }

        .toggle-btn-new:hover {
          border-color: #10b981;
          color: #10b981;
          transform: translateY(-2px);
        }

        .toggle-btn-new.active {
          background: #10b981;
          border-color: #10b981;
          color: white;
          box-shadow: 0 10px 20px rgba(16, 185, 129, 0.2);
        }

        .stories-grid-section {
          padding: 80px 0 120px;
             .stories-list-premium {
          display: flex;
          flex-direction: column;
          gap: 30px;
          align-items: center;
        }

        .story-card-horizontal {
          display: flex;
          background: #ffffff;
          border-radius: 30px;
          overflow: hidden;
          height: 300px;
          width: 80%;
          border: 1px solid #f1f5f9;
          box-shadow: 0 15px 40px rgba(0,0,0,0.04);
          transition: all 0.5s ease;
          position: relative;
        }

        .story-card-horizontal:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 60px rgba(16, 185, 129, 0.1);
        }

        .story-image-side {
          flex: 0.8;
          position: relative;
          overflow: hidden;
        }

        .main-client-img {
          width: 100%;
          height: 300px;
          object-fit: cover;
        }

        .client-placeholder-large {
          width: 100%;
          height: 300px;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .client-placeholder-large::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 70%);
        }

        .client-placeholder-large span {
          font-size: 140px;
          font-weight: 900;
          color: white;
          opacity: 0.15;
          z-index: 1;
          text-shadow: 0 0 40px rgba(16, 185, 129, 0.5);
        }

        .client-info-overlay-bottom {
          position: absolute;
          bottom: 20px;
          left: 20px;
          right: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 5;
        }

        .overlay-client-name {
          background: rgba(255, 255, 255, 0.98);
          padding: 8px 18px;
          border-radius: 50px;
          font-weight: 800;
          color: #0f172a;
          font-size: 12px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }

        .overlay-impact {
          background: #10b981;
          color: white;
          padding: 8px 18px;
          border-radius: 50px;
          font-weight: 900;
          font-size: 12px;
          box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3);
        }

        .story-content-side {
          flex: 1.2;
          display: flex;
          align-items: center;
          padding: 30px 40px;
          background: #ffffff;
        }
    }

        .story-header-premium {
          margin-bottom: 20px;
        }

        .case-study-label {
          color: #10b981;
          font-weight: 900;
          font-size: 10px;
          letter-spacing: 2px;
          display: block;
          margin-bottom: 8px;
          opacity: 0.8;
        }

        .story-content-inner h3 {
          font-size: 24px;
          font-weight: 900;
          color: #0f172a;
          line-height: 1.1;
          letter-spacing: -0.5px;
        }

        .story-main-paragraph {
          font-size: 14px;
          color: #475569;
          line-height: 1.6;
          margin-bottom: 20px;
          font-weight: 400;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .story-points-list {
          list-style: none;
          padding: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 20px;
          margin-bottom: 25px;
        }

        .story-point-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: #0f172a;
          font-weight: 700;
          padding: 5px 0;
        }

        .point-dot {
          width: 6px;
          height: 6px;
          background: #10b981;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .story-footer-new {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 15px;
          border-top: 1px solid #f1f5f9;
        }

        .verified-status {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #10b981;
          font-weight: 800;
          font-size: 11px;
          text-transform: uppercase;
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
        }

        .pulse-dot::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: inherit;
          border-radius: inherit;
          animation: pulse 2s infinite;
          opacity: 0.5;
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(3); opacity: 0; }
        }

        .footer-action {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #94a3b8;
          font-weight: 700;
          font-size: 14px;
          transition: 0.3s;
          cursor: pointer;
        }

        .story-card-horizontal:hover .footer-action {
          color: #10b981;
          gap: 15px;
        }

        .loading-state, .empty-state {
          text-align: center;
          padding: 100px 0;
          color: #64748b;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #f1f5f9;
          border-top: 3px solid #10b981;
          border-radius: 50%;
          margin: 0 auto 20px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin { 100% { transform: rotate(360deg); } }

        @media (max-width: 1200px) {
          .story-content-side { padding: 50px; }
          .story-content-inner h3 { font-size: 32px; }
        }

        @media (max-width: 992px) {
          .story-card-horizontal {
            flex-direction: column;
            min-height: auto;
          }
          .story-image-side {
            height: 400px;
          }
          .story-content-side {
            padding: 40px;
          }
          .story-points-list {
            grid-template-columns: 1fr;
            gap: 10px;
          }
        }

        .share-story-section {
          padding: 100px 0;
          background: #f8fafc;
        }

        .share-story-card {
          max-width: 700px;
          margin: 0 auto;
          background: white;
          padding: 40px;
          border-radius: 30px;
          box-shadow: 0 40px 100px rgba(15, 23, 42, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.1);
          text-align: center;
        }

        .share-story-header h2 {
          font-size: 36px;
          font-weight: 900;
          margin: 20px 0 15px;
          letter-spacing: -1px;
        }

        .share-story-header p {
          color: #64748b;
          font-size: 18px;
          margin-bottom: 40px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .submission-form-premium {
          text-align: left;
        }

        .form-grid-premium {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 25px;
          margin-bottom: 25px;
        }

        .form-group-premium {
          margin-bottom: 25px;
        }

        .form-group-premium label {
          display: block;
          font-size: 13px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .form-group-premium input, 
        .form-group-premium textarea {
          width: 100%;
          padding: 18px 25px;
          background: #f1f5f9;
          border: 2px solid transparent;
          border-radius: 16px;
          font-size: 15px;
          font-weight: 500;
          transition: 0.3s;
          font-family: inherit;
        }

        .form-group-premium input:focus, 
        .form-group-premium textarea:focus {
          outline: none;
          background: white;
          border-color: #10b981;
          box-shadow: 0 10px 20px rgba(16, 185, 129, 0.05);
        }

        .form-group-premium textarea {
          height: 150px;
          resize: none;
        }

        .submit-story-btn {
          width: 100%;
          background: #10b981;
          color: white;
          padding: 20px;
          border-radius: 16px;
          font-weight: 800;
          font-size: 16px;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: 0.3s;
        }

        .submit-story-btn:hover {
          background: #059669;
          transform: translateY(-3px);
          box-shadow: 0 20px 40px rgba(16, 185, 129, 0.2);
        }

        .form-status-msg {
          margin-top: 20px;
          padding: 15px;
          border-radius: 12px;
          text-align: center;
          font-weight: 700;
          font-size: 14px;
        }

        .form-status-msg.success {
          background: #dcfce7;
          color: #166534;
        }

        .form-status-msg.error {
          background: #fee2e2;
          color: #991b1b;
        }

        .upload-input-group {
          display: flex;
          gap: 12px;
          margin-bottom: 8px;
        }

        .upload-text-input {
          flex: 1;
        }

        .upload-trigger-btn {
          background: #f1f5f9;
          border: 2px solid #e2e8f0;
          padding: 0 25px;
          border-radius: 16px;
          font-weight: 700;
          color: #475569;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: 0.3s;
          white-space: nowrap;
        }

        .upload-trigger-btn:hover {
          background: #e2e8f0;
          border-color: #cbd5e1;
          color: #0f172a;
        }

        .input-hint {
          font-size: 12px;
          color: #94a3b8;
          font-weight: 600;
          margin-top: -5px;
        }

        @media (max-width: 768px) {
          .share-story-card { padding: 30px; }
          .form-grid-premium { grid-template-columns: 1fr; gap: 0; }
          .upload-input-group { flex-direction: column; }
          .upload-trigger-btn { padding: 15px; justify-content: center; }
        }
      `}</style>
    </div>
  );
};

export default SuccessStories;
