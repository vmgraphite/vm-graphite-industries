import React, { useState, useEffect } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Package,
  Building2,
  User,
  Mail,
  Phone,
  Sliders,
  MessageSquare,
  Clock,
  ShieldCheck,
  Zap,
  Sparkles,
  ExternalLink,
  RotateCcw
} from 'lucide-react';

// Reads the Web3Forms access key injected by Astro via import.meta.env
const WEB3FORMS_KEY = import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY as string;

interface QuoteFormProps {
  initialProduct?: string;
  initialCategory?: string;
  onSuccess?: () => void;
}

const QUANTITY_PRESETS = [
  'Trial Sample / Prototype',
  '10 - 50 Pcs',
  '50 - 200 Pcs',
  '500+ Bulk Units',
  'Annual Supply Contract',
];

const TIMELINE_OPTIONS = [
  'Urgent (< 10 Days)',
  'Standard (2 - 4 Weeks)',
  'Planning Stage / Budgetary',
];

export default function QuoteForm({ initialProduct = '', initialCategory = '', onSuccess }: QuoteFormProps) {
  const [formData, setFormData] = useState({
    product: initialProduct,
    category: initialCategory,
    name: '',
    company: '',
    email: '',
    phone: '',
    quantity: '',
    timeline: 'Standard (2 - 4 Weeks)',
    specifications: '',
    message: '',
    botcheck: '', // Web3Forms honeypot field
  });

  const [rfqNumber, setRfqNumber] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      product: initialProduct || prev.product,
      category: initialCategory || prev.category,
    }));
  }, [initialProduct, initialCategory]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectPreset = (preset: string) => {
    setFormData((prev) => ({ ...prev, quantity: preset }));
  };

  const handleSelectTimeline = (timeline: string) => {
    setFormData((prev) => ({ ...prev, timeline }));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Silently discard bots that fill the honeypot
    if (formData.botcheck) return;

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage('Please fill in all required fields: Full Name, Work Email, and Phone / WhatsApp.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const generatedRfq = `VMG-RFQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setRfqNumber(generatedRfq);

    try {
      const payload = {
        access_key: WEB3FORMS_KEY,
        subject: `🏭 [Commercial RFQ: ${generatedRfq}] ${formData.product || 'Graphite Inquiry'} – ${formData.company || formData.name}`,
        from_name: `${formData.name} via VM Graphite RFQ Form`,
        replyto: formData.email,
        botcheck: formData.botcheck,
        'RFQ Reference ID': generatedRfq,
        'Target Product': formData.product || 'General Industrial Graphite',
        'Product Category': formData.category || 'High-Performance Graphite',
        'Required Quantity / Volume': formData.quantity || 'Standard Requirement',
        'Procurement Timeline': formData.timeline,
        'Client Full Name': formData.name,
        'Company / Enterprise': formData.company || 'Not Specified',
        'Work Email': formData.email,
        'Phone / WhatsApp': formData.phone,
        'Custom Dimensions / Specs': formData.specifications || 'None Provided',
        'Application & Remarks': formData.message || 'Standard quote inquiry',
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
      console.error('Inquiry Submission Error:', err);
      setStatus('error');
      setErrorMessage(
        err.message || 'Something went wrong. Please try again or reach out to info@vmgraphiteindustries.com.'
      );
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setFormData({
      product: initialProduct,
      category: initialCategory,
      name: '',
      company: '',
      email: '',
      phone: '',
      quantity: '',
      timeline: 'Standard (2 - 4 Weeks)',
      specifications: '',
      message: '',
      botcheck: '',
    });
  };

  // WhatsApp quick follow-up link
  const whatsappText = encodeURIComponent(
    `Hello VM Graphite Sales Team, I just submitted RFQ #${rfqNumber || 'Direct'} for "${formData.product || 'Industrial Graphite Solutions'}". Looking forward to your prompt quotation.`
  );
  const whatsappUrl = `https://wa.me/919876543210?text=${whatsappText}`;

  // SUCCESS VIEW
  if (status === 'success') {
    return (
      <div className="space-y-6 text-center animate-in fade-in zoom-in-95 duration-400 py-2">
        {/* Animated Success Badge */}
        <div className="relative mx-auto w-20 h-20">
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping opacity-60"></div>
          <div className="relative w-20 h-20 bg-gradient-to-tr from-emerald-600 to-teal-400 text-slate-950 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)]">
            <CheckCircle2 className="w-11 h-11 text-slate-950 stroke-[2.5]" />
          </div>
        </div>

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>RFQ DISPATCHED DIRECTLY TO SALES DESK</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Quotation Request Transmitted!
          </h3>
          <p className="text-slate-300 text-sm max-w-lg mx-auto mt-2 leading-relaxed font-normal">
            Your commercial inquiry for <span className="text-theme-bright font-bold">{formData.product || 'Industrial Graphite Solutions'}</span> has been successfully sent to <span className="text-white font-semibold font-mono underline decoration-emerald-500">info@vmgraphiteindustries.com</span>.
          </p>
        </div>

        {/* Inquiry Summary Box */}
        <div className="bg-[#0b0e17] border border-white/10 rounded-2xl p-5 text-left space-y-3.5 shadow-xl max-w-lg mx-auto">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Tracking Reference</span>
            <span className="text-xs font-mono font-bold text-theme-bright px-2.5 py-0.5 rounded-lg bg-theme-tint border border-theme">
              {rfqNumber || 'VMG-RFQ-84291'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Product Solution</span>
              <span className="text-white font-medium truncate block">{formData.product || 'Standard Catalog Item'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Requested Volume</span>
              <span className="text-white font-medium truncate block">{formData.quantity || 'Standard Batch'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Primary Contact</span>
              <span className="text-white font-medium truncate block">{formData.name}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Confirmation Email</span>
              <span className="text-white font-medium truncate block">{formData.email}</span>
            </div>
          </div>

          {/* Next Steps Timeline */}
          <div className="pt-3 border-t border-white/[0.08] space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-theme-bright" /> Expected Fulfillment Timeline
            </span>
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-slate-300">
              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
                <span className="text-emerald-400 font-bold block">1. Received</span>
                <span>RFQ Logged</span>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
                <span className="text-theme-bright font-bold block">2. Review</span>
                <span>&lt; 4 Hours</span>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
                <span className="text-white font-bold block">3. Official Quote</span>
                <span>&lt; 24 Hours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-lg mx-auto pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 py-3 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition-all cursor-pointer font-sans uppercase tracking-wider"
          >
            <Zap className="w-4 h-4 text-emerald-200 fill-current" />
            <span>Fast-Track on WhatsApp</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>

          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto py-3 px-5 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white font-medium rounded-xl text-xs flex items-center justify-center gap-2 border border-white/10 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Submit Another Quote</span>
          </button>
        </div>
      </div>
    );
  }

  // ACTIVE FORM VIEW
  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-white">
      {/* Error alert banner */}
      {status === 'error' && (
        <div className="p-4 bg-red-950/60 border border-red-500/50 rounded-2xl flex items-start gap-3.5 text-red-200 text-xs shadow-lg animate-in fade-in duration-200">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-white block">Submission Error</span>
            <p className="leading-relaxed font-normal">{errorMessage}</p>
            <p className="text-[11px] text-red-300/80 pt-1">
              You can also email your engineering drawings directly to{' '}
              <a href="mailto:info@vmgraphiteindustries.com" className="underline font-bold text-white">
                info@vmgraphiteindustries.com
              </a>
            </p>
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

      {/* Trust & Dispatch Assurance Strip */}
      <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-[11px] text-slate-300">
        <div className="flex items-center gap-1.5 justify-center text-center">
          <ShieldCheck className="w-3.5 h-3.5 text-theme-bright shrink-0" />
          <span className="hidden sm:inline">Ex-Factory Direct</span>
          <span className="sm:hidden">Direct Rates</span>
        </div>
        <div className="flex items-center gap-1.5 justify-center text-center border-x border-white/[0.06] px-1">
          <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>&lt; 24h Response</span>
        </div>
        <div className="flex items-center gap-1.5 justify-center text-center">
          <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>NDA Protected</span>
        </div>
      </div>

      {/* SECTION 1: Product & Quantity */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold uppercase tracking-wider text-theme-bright flex items-center gap-1.5">
            <Package className="w-3.5 h-3.5 text-theme-bright" />
            <span>1. Product &amp; Volume Requirements</span>
          </label>
          <span className="text-[11px] text-slate-400 font-mono">Step 1 of 3</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* Target Product */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Target Product / Grade <span className="text-theme-bright">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="product"
                required
                value={formData.product}
                onChange={handleChange}
                placeholder="e.g. Isostatic Graphite Block / Crucible #50"
                className="w-full bg-[#07090f] border border-white/15 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-glow)] rounded-xl pl-3.5 pr-3 py-2.5 text-sm text-white placeholder-slate-500 transition-all outline-none"
              />
            </div>
          </div>

          {/* Quantity Required */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Estimated Quantity / Volume <span className="text-theme-bright">*</span>
            </label>
            <input
              type="text"
              name="quantity"
              required
              value={formData.quantity}
              onChange={handleChange}
              placeholder="e.g. 50 Pcs, 500 Kgs, 20 Rolls"
              className="w-full bg-[#07090f] border border-white/15 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-glow)] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition-all outline-none"
            />
          </div>
        </div>

        {/* Quick Quantity Presets */}
        <div>
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block mb-1.5">
            Quick Volume Selector:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {QUANTITY_PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                  formData.quantity === preset
                    ? 'bg-theme-tint border-theme text-theme-bright font-bold'
                    : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:border-white/25'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline / Urgency Selector */}
        <div>
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block mb-1.5">
            Required Delivery Timeline:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {TIMELINE_OPTIONS.map((timeOption) => (
              <button
                key={timeOption}
                type="button"
                onClick={() => handleSelectTimeline(timeOption)}
                className={`text-xs py-1.5 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                  formData.timeline === timeOption
                    ? 'bg-theme-tint border-theme text-theme-bright font-bold shadow-sm'
                    : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                {timeOption}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-px bg-white/[0.08]" />

      {/* SECTION 2: Contact & Enterprise Coordinates */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold uppercase tracking-wider text-theme-bright flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-theme-bright" />
            <span>2. Purchaser / Enterprise Details</span>
          </label>
          <span className="text-[11px] text-slate-400 font-mono">Step 2 of 3</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* Full Name */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Full Name <span className="text-theme-bright">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Rajesh Sharma / John Miller"
                className="w-full bg-[#07090f] border border-white/15 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-glow)] rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition-all outline-none"
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Company / Enterprise Name
            </label>
            <div className="relative">
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. Apex Metallurgy Ltd"
                className="w-full bg-[#07090f] border border-white/15 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-glow)] rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition-all outline-none"
              />
              <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* Work Email */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Official Work Email <span className="text-theme-bright">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="procurement@company.com"
                className="w-full bg-[#07090f] border border-white/15 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-glow)] rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition-all outline-none"
              />
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Phone / WhatsApp */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Phone / WhatsApp Number <span className="text-theme-bright">*</span>
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
      </div>

      <div className="h-px bg-white/[0.08]" />

      {/* SECTION 3: Technical Specs & Notes */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold uppercase tracking-wider text-theme-bright flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-theme-bright" />
            <span>3. Technical Specifications &amp; Instructions</span>
          </label>
          <span className="text-[11px] text-slate-400 font-mono">Step 3 of 3</span>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-300 mb-1">
            Custom Dimensions, Density, Temperature or Grain Size Specs
          </label>
          <input
            type="text"
            name="specifications"
            value={formData.specifications}
            onChange={handleChange}
            placeholder="e.g. Density: 1.85 g/cm³, Max Temp: 2800°C, OD 120mm x ID 100mm x 300mm L"
            className="w-full bg-[#07090f] border border-white/15 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-glow)] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition-all outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-300 mb-1">
            Application Details / Special Delivery Requirements
          </label>
          <div className="relative">
            <textarea
              name="message"
              rows={2}
              value={formData.message}
              onChange={handleChange}
              placeholder="Specify target application (Continuous Casting, EDM Tooling, Induction Furnace), destination port/city, or packaging preferences..."
              className="w-full bg-[#07090f] border border-white/15 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-glow)] rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition-all outline-none resize-none"
            ></textarea>
            <MessageSquare className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full py-4 px-6 bg-gradient-to-r from-[var(--primary-light)] via-[var(--primary)] to-[var(--primary-dark)] hover:opacity-95 text-slate-950 font-black rounded-2xl border border-white/30 shadow-[0_6px_25px_var(--primary-glow)] flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 cursor-pointer text-sm sm:text-base uppercase tracking-wider font-sans group"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
            <span>Encrypting &amp; Routing to Sales Desk...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5 text-slate-950 transition-transform group-hover:translate-x-1" />
            <span>Request Instant Quotation</span>
          </>
        )}
      </button>

      {/* Target Notice */}
      <p className="text-center text-[11px] text-slate-400 leading-normal">
        🔒 Inquiries are delivered directly to{' '}
        <span className="text-theme-bright font-mono font-medium">info@vmgraphiteindustries.com</span>. Commercial engineering proposal will be delivered within 24 hours.
      </p>
    </form>
  );
}
