import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.honeypot) return;

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setErrorMessage('Please complete all required fields.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          product: 'General Contact Inquiry',
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
      } else {
        throw new Error(result.message || 'Failed to submit message.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Error submitting message. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-emerald-950/30 border border-emerald-500/40 p-8 rounded-xl text-center space-y-4">
        <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900">Message Delivered!</h3>
        <p className="text-slate-600 max-w-md mx-auto text-sm">
          Thank you for contacting VM Graphite Industries LLP. Your inquiry has been routed to our corporate sales team. We will respond promptly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-700 text-sm">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>{errorMessage}</div>
        </div>
      )}

      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={handleChange}
        className="hidden"
        tabIndex={-1}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Full Name <span className="text-industrial-copper">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-industrial-copper focus:ring-1 focus:ring-industrial-copper"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Company / Business Name
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Acme Manufacturing Ltd"
            className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-industrial-copper focus:ring-1 focus:ring-industrial-copper"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Official Email <span className="text-industrial-copper">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="john@acme.com"
            className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-industrial-copper focus:ring-1 focus:ring-industrial-copper"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Phone / Mobile Number <span className="text-industrial-copper">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-industrial-copper focus:ring-1 focus:ring-industrial-copper"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
          Subject / Area of Inquiry
        </label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Bulk Pricing / Technical Specification / Export Partnership"
          className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-industrial-copper focus:ring-1 focus:ring-industrial-copper"
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
          Detailed Message <span className="text-industrial-copper">*</span>
        </label>
        <textarea
          name="message"
          rows={4}
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="Please detail your industrial requirements, material grades, or annual volume estimates..."
          className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-industrial-copper focus:ring-1 focus:ring-industrial-copper"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full py-3.5 px-6 bg-slate-900 hover:bg-industrial-copper text-white font-bold rounded-lg shadow-md flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Sending Message...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>Send Direct Message</span>
          </>
        )}
      </button>
    </form>
  );
}
