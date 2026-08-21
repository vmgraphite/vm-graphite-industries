import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, User, Mail, Phone, Building2, MessageSquare, Sparkles, Zap, ExternalLink } from 'lucide-react';

// Reads the Web3Forms access key injected by Astro via import.meta.env
const WEB3FORMS_KEY = import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY as string;

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    botcheck: '', // Web3Forms honeypot field
  });

  const [ticketId, setTicketId] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Silently discard bots that fill the honeypot
    if (formData.botcheck) return;

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setErrorMessage('Please complete all required fields (Name, Email, Phone, and Message).');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const generatedId = `VMG-MSG-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(generatedId);

    try {
      const payload = {
        access_key: WEB3FORMS_KEY,
        subject: `📩 [Direct Contact: ${generatedId}] ${formData.subject || 'Website Inquiry'} – ${formData.company || formData.name}`,
        from_name: `${formData.name} via VM Graphite Contact Form`,
        replyto: formData.email,
        botcheck: formData.botcheck,
        'Ticket Reference': generatedId,
        'Subject / Area': formData.subject || 'General Commercial Inquiry',
        'Sender Full Name': formData.name,
        'Company Name': formData.company || 'Not Specified',
        'Official Email': formData.email,
        'Phone Number': formData.phone,
        'Message Body': formData.message,
        'Submission Timestamp': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' (IST)',
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
      } else {
        throw new Error(result.message || 'Submission failed. Please try again.');
      }
    } catch (err: any) {
      console.error('Contact Form Submission Error:', err);
      setStatus('error');
      setErrorMessage(
        err.message || 'Error submitting message. Please try again or reach out to info@vmgraphiteindustries.com.'
      );
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      botcheck: '',
    });
  };

  const whatsappText = encodeURIComponent(
    `Hello VM Graphite Team, I have sent an inquiry (Ref #${ticketId || 'Direct'}) regarding "${formData.subject || 'Commercial Products'}". Please connect with me.`
  );
  const whatsappUrl = `https://wa.me/919876543210?text=${whatsappText}`;

  if (status === 'success') {
    return (
      <div className="bg-[#0b0e17] border border-emerald-500/40 p-8 rounded-2xl text-center space-y-5">
        <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
        </div>
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DISPATCHED TO INFO@VMGRAPHITEINDUSTRIES.COM</span>
          </div>
          <h3 className="text-2xl font-black text-white">Message Delivered!</h3>
          <p className="text-slate-300 max-w-md mx-auto text-sm mt-1 leading-relaxed font-normal">
            Thank you for contacting VM Graphite Industries LLP. Your message (Ref: <span className="font-mono text-theme-bright font-bold">{ticketId}</span>) has been routed to our corporate sales team.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto py-3 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors uppercase tracking-wider shadow-md"
          >
            <Zap className="w-4 h-4 text-emerald-200 fill-current" />
            <span>WhatsApp Follow-up</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto py-3 px-5 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white font-medium rounded-xl text-xs border border-white/10 transition-colors cursor-pointer"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white">
      {status === 'error' && (
        <div className="p-4 bg-red-950/60 border border-red-500/50 rounded-xl flex items-start gap-3 text-red-200 text-xs shadow-lg">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white block">Submission Error</span>
            <p className="font-normal">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Web3Forms honeypot — must stay hidden */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
        checked={!!formData.botcheck}
        onChange={(e) => setFormData((prev) => ({ ...prev, botcheck: e.target.checked ? 'on' : '' }))}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
            Full Name <span className="text-theme-bright">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full bg-[#07090f] border border-white/15 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-glow)] rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition-all outline-none"
            />
            <User className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
            Company / Business Name
          </label>
          <div className="relative">
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Acme Manufacturing Ltd"
              className="w-full bg-[#07090f] border border-white/15 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-glow)] rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition-all outline-none"
            />
            <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
            Official Email <span className="text-theme-bright">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="john@acme.com"
              className="w-full bg-[#07090f] border border-white/15 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-glow)] rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition-all outline-none"
            />
            <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
            Phone / Mobile Number <span className="text-theme-bright">*</span>
          </label>
          <div className="relative">
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className="w-full bg-[#07090f] border border-white/15 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-glow)] rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition-all outline-none"
            />
            <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
          Subject / Area of Inquiry
        </label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Bulk Pricing / Technical Specification / Export Partnership"
          className="w-full bg-[#07090f] border border-white/15 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-glow)] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition-all outline-none"
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
          Detailed Message <span className="text-theme-bright">*</span>
        </label>
        <div className="relative">
          <textarea
            name="message"
            rows={4}
            required
            value={formData.message}
            onChange={handleChange}
            placeholder="Please detail your industrial requirements, material grades, or annual volume estimates..."
            className="w-full bg-[#07090f] border border-white/15 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-glow)] rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition-all outline-none resize-none"
          ></textarea>
          <MessageSquare className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full py-3.5 px-6 bg-gradient-to-r from-[var(--primary-light)] via-[var(--primary)] to-[var(--primary-dark)] hover:opacity-95 text-slate-950 font-black rounded-xl border border-white/30 shadow-[0_4px_20px_var(--primary-glow)] flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer uppercase tracking-wider font-sans"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
            <span>Transmitting to info@vmgraphiteindustries.com...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5 text-slate-950" />
            <span>Send Direct Message</span>
          </>
        )}
      </button>

      <p className="text-center text-[11px] text-slate-400">
        All messages are dispatched to <span className="text-theme-bright font-mono font-medium">info@vmgraphiteindustries.com</span>.
      </p>
    </form>
  );
}
