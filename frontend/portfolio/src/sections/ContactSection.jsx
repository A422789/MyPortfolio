import Reveal from '../components/ui/Reveal';
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { useProfile } from '../context/ProfileContext';
import ActionButton from '../components/ui/ActionButton';
import { profileData } from '../content/profileData';

const CONTACT_LINK_CLASS = 'font-light text-white hover:text-[#f2de8c] transition-colors text-base focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f2de8c] motion-reduce:transition-none';

let resolverModule;
const resolveContact = async (values, context, options) => {
  resolverModule ??= import('../utils/contactValidation');
  const { contactResolver } = await resolverModule;
  return contactResolver(values, context, options);
};


const ContactSection = () => {
  const reducedMotion = useReducedMotion();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { profile } = useProfile();
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const requestRef = useRef(null);
  const formFocusRef = useRef(null);
  const previousStatusRef = useRef('idle');
  const isSubmitting = status === 'submitting';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: resolveContact,
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  useEffect(() => () => requestRef.current?.abort(), []);

  useEffect(() => {
    if (status === 'success' || (status === 'idle' && previousStatusRef.current === 'success')) {
      formFocusRef.current?.focus();
    }
    previousStatusRef.current = status;
  }, [status]);

  const onValidSubmit = async (data) => {
    if (requestRef.current) return;

    const controller = new AbortController();
    requestRef.current = controller;
    setStatus('submitting');
    setErrorMsg('');

    try {
      const response = await fetch('https://formspree.io/f/mwpywbpo', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      if (controller.signal.aborted) return;
      if (!response.ok) throw new Error('Message submission failed');

      setStatus('success');
      reset();
    } catch {
      if (controller.signal.aborted) return;
      setErrorMsg('Your message could not be sent. Please try again or email me directly.');
      setStatus('error');
    } finally {
      requestRef.current = null;
    }
  };

  const contactEmail = profile?.email || profileData.email;
  const whatsappPhone = profile?.phone || profileData.phone;
  const pakistanPhone = profile?.pakistanPhone || profileData.pakistanPhone;
  const cleanPhone = whatsappPhone.replace(/\D/g, '');
  const pakistanPhoneHref = pakistanPhone.replace(/[^+\d]/g, '');

  return (
    <section ref={ref} className="min-h-screen bg-black text-white flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8" id="contact" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto w-full">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#cea605]">
            COMMUNICATION & INQUIRIES
          </span>
          <Reveal as="h2"
            id="contact-heading"
            initial={reducedMotion ? false : { opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reducedMotion ? 0 : 0.6, ease: 'easeOut' }}
            className="text-3xl sm:text-5xl font-light tracking-tight text-white mt-1"
          >
            Let's <span className="text-[#cea605] font-normal">Talk</span>
          </Reveal>
          <p className="text-sm sm:text-base text-[#a3a3a3] font-light mt-3 leading-relaxed">
            Open to hybrid internships in Islamabad and remote entry-level opportunities worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <Reveal as="div"
            initial={reducedMotion ? false : { opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-8 rounded-3xl bg-white/[0.03] border border-[#725c02]/40 hover:border-[#cea605]/60 transition-[border-color,box-shadow] hover:shadow-[0_0_24px_rgba(206,166,5,0.12)] motion-reduce:transition-none shadow-xl space-y-6">
              <h3 className="text-xl font-normal text-white">Direct Communication</h3>

              <div className="space-y-5 text-sm">
                <div>
                  <span className="text-xs text-[#808080] block font-mono tracking-wider">EMAIL ADDRESS</span>
                  <a
                    href={`mailto:${contactEmail}`}
                    className={`${CONTACT_LINK_CLASS} break-all`}
                  >
                    {contactEmail}
                  </a>
                </div>

                <div>
                  <span className="text-xs text-[#808080] block font-mono tracking-wider">WHATSAPP</span>
                  <a
                    href={`https://wa.me/${cleanPhone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={CONTACT_LINK_CLASS}
                  >
                    {whatsappPhone}
                  </a>
                </div>

                <div>
                  <span className="text-xs text-[#808080] block font-mono tracking-wider">CALL / SMS (PAKISTAN)</span>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <a href={`tel:${pakistanPhoneHref}`} className={CONTACT_LINK_CLASS} aria-label={`Call ${pakistanPhone} in Pakistan`}>
                      {pakistanPhone}
                    </a>
                    <a href={`sms:${pakistanPhoneHref}`} className={`${CONTACT_LINK_CLASS} underline underline-offset-4`} aria-label={`Send an SMS to ${pakistanPhone} in Pakistan`}>
                      SMS
                    </a>
                  </div>
                </div>

                <div>
                  <span className="text-xs text-[#808080] block font-mono tracking-wider">LOCATION</span>
                  <span className="font-light text-white text-base">
                    {profile?.location || profileData.location}
                  </span>
                </div>

                <div>
                  <span className="text-xs text-[#808080] block font-mono tracking-wider">CURRENT STATUS</span>
                  <span className="font-light text-[#f2de8c] text-sm">
                    Hybrid internships in Islamabad · Remote entry-level roles worldwide
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center gap-6 text-sm">
                <a
                  href={profile?.github || profileData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#b3b3b3] hover:text-[#f2de8c] transition-colors font-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f2de8c] motion-reduce:transition-none"
                >
                  GitHub ↗
                </a>
                <a
                  href={profile?.linkedin || profileData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#b3b3b3] hover:text-[#f2de8c] transition-colors font-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f2de8c] motion-reduce:transition-none"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal as="div"
            initial={reducedMotion ? false : { opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : 0.3 }}
            className="lg:col-span-7"
          >
            <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.03] border border-[#725c02]/40 hover:border-[#cea605]/60 transition-[border-color,box-shadow] hover:shadow-[0_0_24px_rgba(206,166,5,0.12)] motion-reduce:transition-none shadow-xl">
              <h3 id="contact-form-heading" className="text-2xl font-light text-white mb-6">Send an Inquiry</h3>
              <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
                {isSubmitting ? 'Sending your message.' : status === 'success' ? 'Your message was sent successfully.' : ''}
              </p>

              {status === 'success' ? (
                <div className="p-8 rounded-2xl bg-black border border-[#725c02]/40 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-black border border-[#725c02]/50 text-[#c4b27c] font-bold flex items-center justify-center mx-auto text-2xl">
                    ✓
                  </div>
                  <h4 ref={formFocusRef} tabIndex={-1} className="text-xl font-normal text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f2de8c]">Message sent</h4>
                  <p className="text-sm text-[#b3b3b3] font-light max-w-sm mx-auto">
                    Thank you for reaching out. You can also reach me directly at{' '}
                    <a href={`mailto:${contactEmail}`} className="text-[#f2de8c] underline break-all focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f2de8c]">
                      {contactEmail}
                    </a>.
                  </p>
                  <ActionButton
                    variant="outline-muted"
                    onClick={() => setStatus('idle')}
                    className="mt-4 min-h-11 font-semibold text-xl tracking-wider focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f2de8c] motion-reduce:transition-none"
                  >
                    Send Another Message
                  </ActionButton>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onValidSubmit)}
                  noValidate
                  className="space-y-6"
                  aria-labelledby="contact-form-heading"
                  aria-busy={isSubmitting}
                  aria-describedby={errorMsg ? 'contact-error' : undefined}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label htmlFor="name" className="block text-xs font-mono text-[#b3b3b3] uppercase tracking-wider">
                          Your Name <span className="text-[#cea605]">*</span>
                        </label>
                        {touchedFields.name && !errors.name && (
                          <span className="text-[11px] font-mono text-[#cea605] flex items-center gap-1">
                            ✓ valid
                          </span>
                        )}
                      </div>
                      <input
                        {...register('name')}
                        type="text"
                        id="name"
                        autoComplete="name"
                        disabled={isSubmitting}
                        aria-invalid={errors.name ? 'true' : 'false'}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        className={`contact-input w-full disabled:opacity-60 motion-reduce:transition-none ${
                          errors.name ? 'input-error' : ''
                        }`}
                        placeholder="Your name"
                      />
                      <AnimatePresence>
                        {errors.name && (
                          <Reveal as="p"
                            id="name-error"
                            role="alert"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                            className="text-red-400 text-xs font-mono mt-1.5 flex items-center gap-1.5"
                          >
                            <span className="inline-block w-1 h-1 rounded-full bg-red-400" />
                            {errors.name.message}
                          </Reveal>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Email Field */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label htmlFor="email" className="block text-xs font-mono text-[#b3b3b3] uppercase tracking-wider">
                          Your Email <span className="text-[#cea605]">*</span>
                        </label>
                        {touchedFields.email && !errors.email && (
                          <span className="text-[11px] font-mono text-[#cea605] flex items-center gap-1">
                            ✓ valid
                          </span>
                        )}
                      </div>
                      <input
                        {...register('email')}
                        type="email"
                        id="email"
                        autoComplete="email"
                        disabled={isSubmitting}
                        aria-invalid={errors.email ? 'true' : 'false'}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        className={`contact-input w-full disabled:opacity-60 motion-reduce:transition-none ${
                          errors.email ? 'input-error' : ''
                        }`}
                        placeholder="name@company.com"
                      />
                      <AnimatePresence>
                        {errors.email && (
                          <Reveal as="p"
                            id="email-error"
                            role="alert"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                            className="text-red-400 text-xs font-mono mt-1.5 flex items-center gap-1.5"
                          >
                            <span className="inline-block w-1 h-1 rounded-full bg-red-400" />
                            {errors.email.message}
                          </Reveal>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Subject Field (Optional) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="subject" className="block text-xs font-mono text-[#b3b3b3] uppercase tracking-wider">
                        Subject <span className="text-[#808080] font-light lowercase">(optional)</span>
                      </label>
                      {touchedFields.subject && !errors.subject && (
                        <span className="text-[11px] font-mono text-[#cea605] flex items-center gap-1">
                          ✓
                        </span>
                      )}
                    </div>
                    <input
                      {...register('subject')}
                      type="text"
                      id="subject"
                      disabled={isSubmitting}
                      aria-invalid={errors.subject ? 'true' : 'false'}
                      aria-describedby={errors.subject ? 'subject-error' : undefined}
                      className={`contact-input w-full disabled:opacity-60 motion-reduce:transition-none ${
                        errors.subject ? 'input-error' : ''
                      }`}
                      placeholder="Opportunity / Collaboration"
                    />
                    <AnimatePresence>
                      {errors.subject && (
                        <Reveal as="p"
                          id="subject-error"
                          role="alert"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                          className="text-red-400 text-xs font-mono mt-1.5 flex items-center gap-1.5"
                        >
                          <span className="inline-block w-1 h-1 rounded-full bg-red-400" />
                          {errors.subject.message}
                        </Reveal>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Message Field */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="message" className="block text-xs font-mono text-[#b3b3b3] uppercase tracking-wider">
                        Message <span className="text-[#cea605]">*</span>
                      </label>
                      {touchedFields.message && !errors.message && (
                        <span className="text-[11px] font-mono text-[#cea605] flex items-center gap-1">
                          ✓ valid
                        </span>
                      )}
                    </div>
                    <textarea
                      {...register('message')}
                      id="message"
                      rows="6"
                      disabled={isSubmitting}
                      aria-invalid={errors.message ? 'true' : 'false'}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      className={`contact-input w-full resize-y disabled:opacity-60 motion-reduce:transition-none ${
                        errors.message ? 'input-error' : ''
                      }`}
                      placeholder="Tell me about your team, role, or project..."
                    />
                    <AnimatePresence>
                      {errors.message && (
                        <Reveal as="p"
                          id="message-error"
                          role="alert"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                          className="text-red-400 text-xs font-mono mt-1.5 flex items-center gap-1.5"
                        >
                          <span className="inline-block w-1 h-1 rounded-full bg-red-400" />
                          {errors.message.message}
                        </Reveal>
                      )}
                    </AnimatePresence>
                  </div>

                  {errorMsg && (
                    <Reveal as="div"
                      id="contact-error"
                      role="alert"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-center gap-2"
                    >
                      <span className="text-red-400 font-bold">!</span>
                      <span>{errorMsg}</span>
                    </Reveal>
                  )}

                  <ActionButton
                    type="submit"
                    variant="outline-muted"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto min-h-11 font-semibold text-xl tracking-wider focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f2de8c] motion-reduce:transition-none"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </ActionButton>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
