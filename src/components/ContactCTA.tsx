import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Mail, Phone, Send, CheckCircle2, 
  MessageCircle, ExternalLink, Clock, MessageSquare, Instagram, AlertCircle
} from 'lucide-react';
import {
  EMAIL, MAILTO_HREF, PHONE_DISPLAY, TEL_HREF, INSTAGRAM_HANDLE, INSTAGRAM_URL, whatsappUrl
} from '../config/contact';
import { sendContactEmail } from '../lib/emailjs';

interface ContactCTAProps {
  initialMessage?: string;
}

export const ContactCTA: React.FC<ContactCTAProps> = ({ initialMessage = '' }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(initialMessage);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (initialMessage) {
      setMessage(initialMessage);
    }
  }, [initialMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setError('');
    try {
      await sendContactEmail({ name, email, phone, message });
      setSubmitted(true);
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.8 },
        colors: ['#B8620B', '#C85A17', '#E8797A', '#F5F1E8']
      });
    } catch {
      setError('Sorry, your message could not be sent. Please email us directly or try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappHref = whatsappUrl();

  return (
    <section id="contact" className="relative py-20 lg:py-28 bg-[#1A1E24] text-white overflow-hidden">
      {/* Blueprint Grid Dark Background */}
      <div className="absolute inset-0 bg-blueprint-dark opacity-50 pointer-events-none" />

      {/* Floating subtle ambient glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#B8620B]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#E8797A]/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs uppercase tracking-widest text-[#E8797A] font-semibold mb-3 border border-white/10">
            <span>Contact Us</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white mb-3">
            Get in Touch
          </h2>

          <p className="text-sm sm:text-base text-white/70 leading-relaxed font-normal">
            Have a question or a project in mind? Call us, message us on WhatsApp, send an email, or write your message below.
          </p>
        </div>

        {/* 4 Prominent Quick-Contact Cards (Phone, WhatsApp, Email, Instagram) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {/* 1. Phone Card */}
          <a
            href={TEL_HREF}
            className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#B8620B]/60 hover:bg-white/10 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#B8620B]/20 text-[#B8620B] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-xs uppercase font-mono text-white/50 tracking-wider">Phone</span>
              <p className="text-lg font-semibold text-white mt-1 font-mono">{PHONE_DISPLAY}</p>
              <p className="text-xs text-white/60 mt-1">Direct call &bull; Mon–Fri</p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs text-[#E8797A] font-medium group-hover:underline">
              <span>Call Direct</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>

          {/* 2. WhatsApp Card */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 hover:border-[#25D366] hover:bg-[#25D366]/20 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="text-xs uppercase font-mono text-[#25D366] tracking-wider">WhatsApp</span>
              <p className="text-lg font-semibold text-white mt-1">Chat on WhatsApp</p>
              <p className="text-xs text-white/60 mt-1">Quick message</p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs text-[#25D366] font-medium group-hover:underline">
              <span>Open Chat</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>

          {/* 3. Email Card */}
          <a
            href={MAILTO_HREF}
            className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#E8797A]/60 hover:bg-white/10 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#E8797A]/20 text-[#E8797A] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-xs uppercase font-mono text-white/50 tracking-wider">Email</span>
              <p className="text-sm sm:text-base font-semibold text-white mt-1 break-all">{EMAIL}</p>
              <p className="text-xs text-white/60 mt-1">Opens your mail app with a message</p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs text-[#E8797A] font-medium group-hover:underline">
              <span>Write Email</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>

          {/* 4. Instagram Card */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-2xl bg-[#E1306C]/10 border border-[#E1306C]/30 hover:border-[#E1306C] hover:bg-[#E1306C]/20 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#E1306C]/20 text-[#E1306C] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Instagram className="w-5 h-5" />
              </div>
              <span className="text-xs uppercase font-mono text-[#E1306C] tracking-wider">Instagram</span>
              <p className="text-base font-semibold text-white mt-1 break-all">@{INSTAGRAM_HANDLE}</p>
              <p className="text-xs text-white/60 mt-1">See our latest work</p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs text-[#E1306C] font-medium group-hover:underline">
              <span>Open Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>
        </div>

        {/* 2-Column Split: Brief Studio Info + Simple Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Brief Studio Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 text-white mb-2">
                <Clock className="w-4 h-4 text-[#B8620B]" />
                <h4 className="font-serif text-base font-semibold">Opening Hours</h4>
              </div>
              <p className="text-xs text-white/70 leading-relaxed pl-7">
                Monday to Friday: 9:00 AM &ndash; 6:00 PM<br />
                Saturday: By appointment
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 text-white mb-2">
                <MessageSquare className="w-4 h-4 text-[#E8797A]" />
                <h4 className="font-serif text-base font-semibold">Free Consultation</h4>
              </div>
              <p className="text-xs text-white/70 leading-relaxed pl-7">
                We can meet you on a video call, or in person at a time that suits you.
              </p>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <h3 className="font-serif text-xl text-white font-medium mb-1">
                Send a Message
              </h3>
              <p className="text-xs text-white/60 mb-6 font-normal">
                Fill in your details below. We will reply to you soon.
              </p>

              {submitted ? (
                <div className="p-8 rounded-xl bg-white/10 border border-emerald-500/40 text-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                  <h4 className="font-serif text-lg text-white font-medium">Thank You</h4>
                  <p className="text-xs text-white/70 mt-2 max-w-md mx-auto">
                    We got your message, {name}. We will reply to {email} soon.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setEmail('');
                      setPhone('');
                      setMessage('');
                    }}
                    className="mt-5 px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase font-mono tracking-wider text-white/70 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#B8620B] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase font-mono tracking-wider text-white/70 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#B8620B] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-mono tracking-wider text-white/70 mb-1.5">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter phone number"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#B8620B] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-mono tracking-wider text-white/70 mb-1.5">
                        Your Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your project..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#B8620B] transition-colors resize-none"
                    />
                  </div>

                  {error && (
                    <div className="flex items-start gap-2 p-3.5 rounded-xl bg-[#C85A17]/15 border border-[#C85A17]/40 text-xs text-[#F5C9A8]">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#E8797A]" />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#B8620B] hover:bg-[#C85A17] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-lg cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
