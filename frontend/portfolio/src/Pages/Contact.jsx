import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import API from '../api/axios.js';
import { useProfile } from '../context/ProfileContext';

const Contact = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { profile } = useProfile();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('submitting');
    setErrorMsg('');

    try {
      // 1. Save to backend
      await API.post('/contact', formData).catch(() => {});

      // 2. Send via Formspree
      await fetch('https://formspree.io/f/mwpywbpo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to send message. Please try again or email directly.');
      setStatus('error');
    }
  };

  const cleanPhone = (profile?.phone || '+20 1225044423').replace(/[^0-9]/g, '');

  return (
    <section ref={ref} className="min-h-screen bg-black text-white flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8" id="contact">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#cea605]">
            COMMUNICATION & INQUIRIES
          </span>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-3xl sm:text-5xl font-light tracking-tight text-white mt-1"
          >
            Let's Build Something <span className="text-[#cea605] font-normal">Exceptional</span>
          </motion.h2>
          <p className="text-sm sm:text-base text-[#a3a3a3] font-light mt-3 leading-relaxed">
            Open to full-stack developer opportunities, software engineering internships in Islamabad, Pakistan, and remote positions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Communication Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-8 rounded-3xl bg-white/[0.03] border border-[#725c02]/40 hover:border-[#cea605]/60 transition-colors shadow-xl space-y-6">
              <h3 className="text-xl font-normal text-white">Direct Communication</h3>

              <div className="space-y-5 text-sm">
                <div>
                  <span className="text-xs text-[#808080] block font-mono tracking-wider">EMAIL ADDRESS</span>
                  <a
                    href={`mailto:${profile?.email || 'a422789255@gmail.com'}`}
                    className="font-light text-white hover:text-[#f2de8c] transition-colors text-base"
                  >
                    {profile?.email || 'a422789255@gmail.com'}
                  </a>
                </div>

                <div>
                  <span className="text-xs text-[#808080] block font-mono tracking-wider">WHATSAPP / PHONE</span>
                  <a
                    href={`https://wa.me/${cleanPhone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-light text-white hover:text-[#f2de8c] transition-colors text-base"
                  >
                    {profile?.phone || '+20 1225044423'}
                  </a>
                </div>

                <div>
                  <span className="text-xs text-[#808080] block font-mono tracking-wider">LOCATION</span>
                  <span className="font-light text-white text-base">
                    {profile?.location && profile.location !== 'Cairo ,Egypt' ? profile.location : 'Islamabad, Pakistan'}
                  </span>
                </div>

                <div>
                  <span className="text-xs text-[#808080] block font-mono tracking-wider">CURRENT STATUS</span>
                  <span className="font-light text-[#f2de8c] text-sm">
                    Open to hybrid internship (Islamabad) and remote entry-level roles
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center gap-6 text-sm">
                <a
                  href={profile?.github || 'https://github.com/A422789'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#b3b3b3] hover:text-[#f2de8c] transition-colors font-light"
                >
                  GitHub ↗
                </a>
                <a
                  href={profile?.linkedin || 'https://www.linkedin.com/in/ahmad-ayyad-608293304/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#b3b3b3] hover:text-[#f2de8c] transition-colors font-light"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-7"
          >
            <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.03] border border-[#725c02]/40 shadow-xl">
              <h3 className="text-2xl font-light text-white mb-6">Send an Inquiry</h3>

              {status === 'success' ? (
                <div className="p-8 rounded-2xl bg-[#cea605]/10 border border-[#cea605]/40 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#cea605] text-black font-bold flex items-center justify-center mx-auto text-2xl shadow-[0_0_20px_#cea605]">
                    ✓
                  </div>
                  <h4 className="text-xl font-normal text-white">Message Received!</h4>
                  <p className="text-sm text-[#b3b3b3] font-light max-w-sm mx-auto">
                    Thank you for reaching out. You can also reach me directly at{' '}
                    <a href={`mailto:${profile?.email || 'a422789255@gmail.com'}`} className="text-[#f2de8c] underline">
                      {profile?.email || 'a422789255@gmail.com'}
                    </a>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="contact-send-button mt-4"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-xs font-mono text-[#b3b3b3] uppercase tracking-wider mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="contact-input w-full"
                        placeholder="Ahmed Ayyad"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-mono text-[#b3b3b3] uppercase tracking-wider mb-2">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="contact-input w-full"
                        placeholder="name@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs font-mono text-[#b3b3b3] uppercase tracking-wider mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="contact-input w-full"
                      placeholder="Opportunity / Collaboration"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-mono text-[#b3b3b3] uppercase tracking-wider mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="contact-input w-full resize-y"
                      placeholder="Tell me about your team, role, or project..."
                    />
                  </div>

                  {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="contact-send-button w-full sm:w-auto"
                  >
                    {status === 'submitting' ? 'Transmitting...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
