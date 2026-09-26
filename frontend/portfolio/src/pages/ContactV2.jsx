import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ContactInfoCard from '../components/sections/ContactInfoCardV2';
import { usePortfolio } from '../hooks/usePortfolio';
import API from '../api/axios';

const Contact = () => {
  const { profile } = usePortfolio();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const formRef = useRef();
  const [submitting, setSubmitting] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const icons = {
    email: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    phone: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    globe: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    const formData = new FormData(formRef.current);
    
    // Honeypot check
    if (formData.get('botcheck')) {
      setSubmitting(false);
      return;
    }

    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      await API.post('/contact', data);

      await fetch('https://formspree.io/f/mwpywbpo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).catch(() => {});

      setShowMessage(true);
      formRef.current.reset();
      setTimeout(() => setShowMessage(false), 5000);
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.response?.data?.errors?.join(', ') ||
        'Failed to send message. Please try again.';
      setErrorMsg(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      ref={ref}
      className="min-h-[80vh] flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-bg)] transition-colors duration-[var(--duration-color)]"
      id="contact"
    >
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-4xl sm:text-5xl font-bold text-center mb-16 section-heading"
      >
        Get In Touch
      </motion.h2>

      <div className="w-full max-w-4xl mx-auto flex flex-col gap-12">
        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <ContactInfoCard
            icon={icons.email}
            title="Email"
            value={profile?.email || 'a422789255@gmail.com'}
          />
          <ContactInfoCard
            icon={icons.phone}
            title="Phone / WhatsApp"
            value={profile?.phone || '+92 315 9186062'}
          />
          <ContactInfoCard
            icon={icons.globe}
            title="Availability"
            value="Remote (GMT+5) / Open to Relocation"
          />
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full mx-auto"
        >
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="w-full bg-[var(--color-surface-1)] border border-[var(--color-border)] rounded-3xl p-6 sm:p-10 flex flex-col gap-6 shadow-[var(--glow-card,var(--elevation-2))] transition-colors duration-[var(--duration-color)]"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-[var(--color-text-2)] block mb-2 font-medium">Your Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-[var(--color-text-2)] block mb-2 font-medium">Your Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-[var(--color-text-2)] block mb-2 font-medium">Your Message</label>
              <textarea
                name="message"
                placeholder="Let's build something extraordinary together..."
                rows="5"
                className="form-input resize-y"
                required
              ></textarea>
            </div>

            {/* Honeypot field */}
            <input type="text" name="botcheck" className="hidden" style={{ display: 'none' }} />

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary mt-2 py-4 rounded-xl font-bold tracking-wider text-lg transition-all disabled:opacity-50 w-full md:w-auto md:self-end md:px-12"
            >
              {submitting ? 'Sending...' : 'Send Message'}
            </button>

            {showMessage && (
              <p className="text-[var(--color-success)] font-medium text-center bg-[var(--color-success)]/10 p-3 rounded-lg border border-[var(--color-success)]/30">
                Message sent successfully! I will get back to you soon.
              </p>
            )}
            {errorMsg && (
              <p className="text-[var(--color-danger)] font-medium text-center bg-[var(--color-danger)]/10 p-3 rounded-lg border border-[var(--color-danger)]/30">
                {errorMsg}
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
