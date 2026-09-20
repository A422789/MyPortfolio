import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ContactInfoCard from '../components/sections/ContactInfoCard';
import { usePortfolio } from '../hooks/usePortfolio';
import API from '../api/axios';
import { optimizeCloudinaryUrl } from '../utils/cloudinaryOptimizer';

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
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    phone: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    location: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    const formData = new FormData(formRef.current);
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
      className="min-h-screen flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-black"
      id="contact"
    >
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-4xl sm:text-5xl font-bold text-center mb-16 logo"
      >
        <span
          className="text-white"
          style={{ textShadow: '0 0 20px rgba(180, 145, 6, 0.6)' }}
        >
          Contact Me
        </span>
      </motion.h2>

      <div className="w-full max-w-7xl mx-auto flex flex-col gap-16">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-3/5 order-1"
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="w-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 flex flex-col gap-6 shadow-2xl"
            >
              <div>
                <label className="text-sm text-gray-400 block mb-2 font-medium">Your Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="contact-input w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#cea605]"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-2 font-medium">Your Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  className="contact-input w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#cea605]"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-2 font-medium">Your Message</label>
                <textarea
                  name="message"
                  placeholder="Let's build something extraordinary together..."
                  rows="5"
                  className="contact-input w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#cea605]"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="contact-send-button mt-2 py-4 px-8 rounded-xl font-bold tracking-wider text-lg cursor-pointer transition-all disabled:opacity-50"
              >
                {submitting ? 'Sending Message...' : 'Send Message 🚀'}
              </button>

              {showMessage && (
                <p className="text-emerald-400 font-medium text-center bg-emerald-950/40 p-3 rounded-lg border border-emerald-500/30">
                  Message sent successfully! I will get back to you soon. 🚀
                </p>
              )}
              {errorMsg && (
                <p className="text-red-400 font-medium text-center bg-red-950/40 p-3 rounded-lg border border-red-500/30">
                  {errorMsg}
                </p>
              )}
            </form>
          </motion.div>

          {/* Contact Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 order-2 relative group shrink-0"
          >
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#cea605]/30 shadow-[0_0_60px_10px_rgba(206,166,5,0.25)]">
              <img
                src={optimizeCloudinaryUrl(profile?.contactImage?.url, { width: 800 })}
                alt={profile?.name || 'Contact'}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </motion.div>
        </div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full lg:w-[85%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <ContactInfoCard
            icon={icons.email}
            title="Email"
            value={profile?.email || 'a422789255@gmail.com'}
          />
          <ContactInfoCard
            icon={icons.phone}
            title="Phone"
            value={profile?.phone || '+92 315 9186062'}
          />
          <ContactInfoCard
            icon={icons.location}
            title="Location"
            value={profile?.location || 'Islamabad, Pakistan'}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
