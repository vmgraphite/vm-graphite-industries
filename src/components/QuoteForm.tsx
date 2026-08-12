import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface QuoteFormProps {
  initialProduct?: string;
  initialCategory?: string;
  onSuccess?: () => void;
}

export default function QuoteForm({ initialProduct = '', initialCategory = '', onSuccess }: QuoteFormProps) {
  const [formData, setFormData] = useState({
    product: initialProduct,
    category: initialCategory,
    name: '',
    company: '',
    email: '',
    phone: '',
    quantity: '',
    specifications: '',
    message: '',
    honeypot: '', // Spam protection
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      product: initialProduct,
      category: initialCategory,
    }));
  }, [initialProduct, initialCategory]);

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.honeypot) return; // Silent discard for bots

    if (!formData.name || !formData.email || !formData.phone) {
      setErrorMessage('Please fill in all required fields (Name, Email, Phone).');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
        if (onSuccess) setTimeout(onSuccess, 3000);
      } else {
        throw new Error(result.message || 'Failed to submit inquiry.');
      }
    } catch (err: any) {
      console.error('Inquiry Submission Error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again or contact us via WhatsApp.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center space-y-4">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-2xs">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900">Quote Request Received!</h3>
        <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
          Thank you for inquiring about <span className="text-industrial-copper font-semibold">{formData.product || 'our industrial solutions'}</span>. Our technical sales team will review your specifications and contact you within 24 business hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-slate-900">
      {status === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700 text-sm">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>{errorMessage}</div>
        </div>
      )}

      {/* Honeypot field (hidden from real users) */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={handleChange}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Target Product
          </label>
          <input
            type="text"
            name="product"
            value={formData.product}
            onChange={handleChange}
            placeholder="e.g. Graphite Crucibles"
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-industrial-copper focus:ring-1 focus:ring-industrial-copper transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Quantity Required
          </label>
          <input
            type="text"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="e.g. 50 Pcs / 500 Kgs / 10 Rolls"
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-industrial-copper focus:ring-1 focus:ring-industrial-copper transition-colors"
          />
        </div>
      </div>

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
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-industrial-copper focus:ring-1 focus:ring-industrial-copper transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Company Name
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Acme Industrial Corp"
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-industrial-copper focus:ring-1 focus:ring-industrial-copper transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Work Email <span className="text-industrial-copper">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="john@company.com"
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-industrial-copper focus:ring-1 focus:ring-industrial-copper transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Phone / WhatsApp <span className="text-industrial-copper">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-industrial-copper focus:ring-1 focus:ring-industrial-copper transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
          Technical Specifications / Custom Dimensions
        </label>
        <input
          type="text"
          name="specifications"
          value={formData.specifications}
          onChange={handleChange}
          placeholder="e.g. Density: 1.85 g/cm³, Size: 50mm OD x 40mm ID x 100mm L"
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-industrial-copper focus:ring-1 focus:ring-industrial-copper transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
          Additional Requirements / Message
        </label>
        <textarea
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          placeholder="Specify delivery destination, application temperature, or special packaging preferences..."
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-industrial-copper focus:ring-1 focus:ring-industrial-copper transition-colors"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full py-3.5 px-6 bg-gradient-to-r from-industrial-copper to-amber-600 hover:from-amber-600 hover:to-industrial-copper text-white font-bold rounded-xl shadow-[0_4px_16px_rgba(217,119,6,0.25)] flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 cursor-pointer text-base"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Submitting Technical Inquiry...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>Request Instant Quotation</span>
          </>
        )}
      </button>
    </form>
  );
}
