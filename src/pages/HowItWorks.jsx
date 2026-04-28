import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, PenTool, Code2, Rocket, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const HowItWorks = ({ setActivePage }) => {
  const [activeFaq, setActiveFaq] = useState(null);

  const steps = [
    {
      title: "Discovery & Analysis",
      desc: "We perform a deep dive into your business ecosystem. This includes competitor benchmarking, user persona mapping, and technical feasibility studies to ensure a solid foundation.",
      icon: <Search />,
      color: "#5e5ce6"
    },
    {
      title: "Design & UX Strategy",
      desc: "Our design process is human-centric. We create wireframes and high-fidelity prototypes that are tested for usability and aesthetic appeal before a single line of code is written.",
      icon: <PenTool />,
      color: "#f15a24"
    },
    {
      title: "Agile Development",
      desc: "Using industry-best practices, our developers build your solution in sprints. We maintain high code quality with automated testing and continuous integration.",
      icon: <Code2 />,
      color: "#2ecc71"
    },
    {
      title: "Launch & Optimization",
      desc: "Beyond deployment, we monitor performance and user feedback. We provide continuous updates and digital marketing integration to scale your product effectively.",
      icon: <Rocket />,
      color: "#3498db"
    }
  ];

  const faqs = [
    {
      q: "How long does a typical project take?",
      a: "Project timelines vary based on complexity. A simple website might take 4-6 weeks, while complex custom software or mobile apps can take 3-6 months. We provide detailed milestones and weekly progress updates to ensure we stay on track for your deadline."
    },
    {
      q: "Which technologies do you specialize in?",
      a: "We are experts in modern stacks including React, Node.js, Python, Flutter, and AWS. We choose the best technology based on your project's specific needs for scalability, security, and long-term maintainability."
    },
    {
      q: "Do you provide ongoing maintenance?",
      a: "Yes! We offer comprehensive maintenance and support packages to ensure your software stays updated, secure, and continues to perform optimally. This includes bug fixes, security patches, and periodic feature enhancements."
    },
    {
      q: "Can you help with digital marketing after launch?",
      a: "Absolutely. Our digital marketing team specializes in SEO, PPC, and social media strategies designed to drive traffic and maximize your ROI. We ensure your technical platform is fully optimized for marketing success."
    },
    {
      q: "Is my data and IP secure with DevSpectra?",
      a: "Security is our top priority. We sign NDAs before any discussion and implement enterprise-grade security protocols during development. All IP rights are transferred to you upon project completion."
    },
    {
      q: "What is your pricing model?",
      a: "We offer both fixed-price contracts for well-defined projects and time-and-materials models for more flexible, evolving requirements. We provide a transparent breakdown of all costs upfront."
    }
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="how-page">
      {/* Hero Section */}
      <section className="how-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="how-hero-content"
          >
            <h1>Engineering Excellence: Our Process</h1>
            <p>From the first spark of an idea to a fully-scaled digital ecosystem, we follow a rigorous, transparent process that guarantees results.</p>
          </motion.div>
        </div>
      </section>

      {/* Consultation Section */}
      <section className="consultation-section reveal fade-up">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="consultation-card"
          >
            <div className="consult-text">
              <h2>Free Project Consultation</h2>
              <p>Every great partnership starts with a conversation. We offer a complimentary strategy session to discuss your vision, audit your current tech, and provide an initial roadmap for success.</p>
              <button className="consult-btn" onClick={() => setActivePage('quote')}>BOOK A SESSION</button>
            </div>
            <div className="consult-image">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600" alt="Consultation" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section reveal fade-up">
        <div className="container">
          <div className="timeline">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, delay: index * 0.3 }}
                viewport={{ once: true }}
                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              >
                <div className="timeline-content">
                  <div className="step-icon" style={{ backgroundColor: step.color }}>{step.icon}</div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                  <span className="step-number">0{index + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section reveal fade-up">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="section-header-centered"
          >
            <HelpCircle size={40} color="#5e5ce6" style={{ marginBottom: '20px' }} />
            <h2>Frequently Asked Questions</h2>
            <p>Transparency is one of our core values. Here are answers to some of the most common questions our clients ask.</p>
          </motion.div>

          <div className="faq-container">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className={`faq-item ${activeFaq === index ? 'active' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question">
                  <h4>{faq.q}</h4>
                  {activeFaq === index ? <ChevronUp /> : <ChevronDown />}
                </div>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="faq-answer"
                    >
                      <p>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .how-hero {
          background-image: linear-gradient(rgba(11, 19, 43, 0.8), rgba(11, 19, 43, 0.8)), url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed;
          padding: 160px 0 100px;
          min-height: 450px;
          display: flex;
          align-items: center;
          color: white;
          text-align: center;
        }
        .how-hero-content h1 {
          font-size: 56px;
          margin-bottom: 25px;
          font-weight: 800;
        }
        .how-hero-content p {
          font-size: 22px;
          opacity: 0.8;
          max-width: 900px;
          margin: 0 auto;
          line-height: 1.6;
        }
        .consultation-section {
          padding: 100px 0;
          background: white;
        }
        .consultation-card {
          background: #f1f5f9;
          border-radius: 30px;
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          align-items: center;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0,0,0,0.08);
        }
        .consult-text {
          padding: 40px 60px;
        }
        .consult-text h2 {
          font-size: 36px;
          color: #0b132b;
          margin-bottom: 20px;
        }
        .consult-text p {
          font-size: 18px;
          color: #64748b;
          margin-bottom: 30px;
          line-height: 1.7;
        }
        .consult-btn {
          background: #5e5ce6;
          color: white;
          border: none;
          padding: 15px 40px;
          font-weight: 700;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .consult-btn:hover {
          background: #3a0ca3;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(94, 92, 230, 0.3);
        }
        .consult-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .timeline-section {
          padding: 120px 0;
          background: #f8fafc;
          position: relative;
        }
        .timeline {
          position: relative;
          max-width: 1100px;
          margin: 0 auto;
        }
        .timeline::after {
          content: '';
          position: absolute;
          width: 4px;
          background-color: #5e5ce6;
          opacity: 0.2;
          top: 0;
          bottom: 0;
          left: 50%;
          margin-left: -2px;
        }
        .timeline-item {
          padding: 20px 60px;
          position: relative;
          width: 50%;
          box-sizing: border-box;
        }
        .timeline-item.left { left: 0; }
        .timeline-item.right { left: 50%; }
        .timeline-item::after {
          content: '';
          position: absolute;
          width: 24px;
          height: 24px;
          right: -12px;
          background-color: white;
          border: 5px solid #5e5ce6;
          top: 40px;
          border-radius: 50%;
          z-index: 1;
          box-shadow: 0 0 15px rgba(94, 92, 230, 0.4);
        }
        .timeline-item.right::after { left: -12px; }
        .timeline-content {
          padding: 30px;
          background-color: white;
          position: relative;
          border-radius: 25px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.06);
          transition: transform 0.5s ease;
        }
        .timeline-content:hover {
          transform: translateY(-5px);
        }
        .step-icon {
          width: 60px;
          height: 60px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin-bottom: 25px;
          font-size: 24px;
        }
        .step-number {
          position: absolute;
          top: 30px;
          right: 30px;
          font-size: 60px;
          font-weight: 900;
          opacity: 0.03;
          color: #0b132b;
        }
        .timeline-content h3 {
          font-size: 28px;
          color: #0b132b;
          margin-bottom: 20px;
        }
        .timeline-content p {
          color: #64748b;
          line-height: 1.8;
          font-size: 15px;
        }
        .faq-section {
          padding: 120px 0;
          background: white;
        }
        .faq-container {
          max-width: 900px;
          margin: 0 auto;
        }
        .faq-item {
          margin-bottom: 20px;
          border-radius: 15px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.5s ease;
        }
        .faq-item:hover {
          background: #fff;
          border-color: #5e5ce6;
          box-shadow: 0 10px 20px rgba(0,0,0,0.03);
        }
        .faq-item.active {
          background: #fff;
          border-color: #5e5ce6;
          box-shadow: 0 15px 30px rgba(94, 92, 230, 0.08);
        }
        .faq-question {
          padding: 18px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .faq-question h4 {
          font-size: 20px;
          color: #0b132b;
          font-weight: 700;
        }
        .faq-answer {
          padding: 0 30px 20px;
          color: #64748b;
          line-height: 1.8;
          font-size: 16px;
        }
        @media (max-width: 992px) {
          .consultation-card { grid-template-columns: 1fr; }
          .consult-image { display: none; }
          .how-hero-content h1 { font-size: 40px; }
        }
        @media (max-width: 768px) {
          .timeline::after { left: 31px; }
          .timeline-item { width: 100%; padding-left: 70px; padding-right: 25px; }
          .timeline-item.right { left: 0; }
          .timeline-item::after { left: 21px; }
          .timeline-item.left::after { left: 21px; }
        }
      `}</style>
    </div>
  );
};

export default HowItWorks;
