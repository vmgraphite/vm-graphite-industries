import React, { useState, useEffect } from "react";
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
  MessageSquare,
  Sparkles,
  ExternalLink,
  RotateCcw,
  Check,
  Zap,
} from "lucide-react";

const WEB3FORMS_KEY = import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY as string;

interface QuoteFormProps {
  initialProduct?: string;
  initialCategory?: string;
  onSuccess?: () => void;
}

const QUANTITY_OPTIONS = [
  "Trial Sample / Prototype",
  "Small Batch (10–50 units)",
  "Medium Batch (50–200 units)",
  "Bulk Order (500+ units)",
  "Annual Supply Contract",
];

const TIMELINE_OPTIONS = [
  { id: "urgent", label: "Urgent (< 10 Days)" },
  { id: "standard", label: "Standard (2–4 Weeks)" },
  { id: "flexible", label: "Planning / Flexible" },
];

export default function QuoteForm({
  initialProduct = "",
  initialCategory = "",
  onSuccess,
}: QuoteFormProps) {
  const [formData, setFormData] = useState({
    product: initialProduct,
    category: initialCategory,
    name: "",
    company: "",
    email: "",
    phone: "",
    quantity: "Trial Sample / Prototype",
    timeline: "Standard (2–4 Weeks)",
    specifications: "",
    message: "",
    botcheck: "",
  });

  const [rfqNumber, setRfqNumber] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      product: initialProduct || prev.product,
      category: initialCategory || prev.category,
    }));
  }, [initialProduct, initialCategory]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.botcheck) return;

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim()
    ) {
      setErrorMessage(
        "Please fill in required fields: Full Name, Work Email, and Phone number.",
      );
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    const generatedRfq = `VMG-RFQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setRfqNumber(generatedRfq);

    const hasValidKey = Boolean(
      WEB3FORMS_KEY &&
      WEB3FORMS_KEY.trim() &&
      !WEB3FORMS_KEY.includes("YOUR_ACCESS_KEY") &&
      WEB3FORMS_KEY.length > 10,
    );

    try {
      if (!hasValidKey) {
        throw new Error(
          "Web3Forms Access Key is not configured on the server. Please email us directly.",
        );
      }

      const payload = {
        access_key: WEB3FORMS_KEY,
        subject: `[Commercial RFQ: ${generatedRfq}] ${formData.product || "Graphite Inquiry"} – ${formData.company || formData.name}`,
        from_name: `${formData.name} via VM Graphite RFQ`,
        replyto: formData.email,
        botcheck: formData.botcheck,
        "RFQ Reference ID": generatedRfq,
        "Target Product": formData.product || "General Industrial Graphite",
        "Product Category": formData.category || "High-Performance Graphite",
        "Required Volume": formData.quantity || "Standard Requirement",
        Timeline: formData.timeline,
        "Client Name": formData.name,
        "Company Name": formData.company || "Not Specified",
        "Work Email": formData.email,
        "Phone Number": formData.phone,
        "Custom Specs": formData.specifications || "None Provided",
        "Notes & Application": formData.message || "Standard quote inquiry",
        Timestamp:
          new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) +
          " (IST)",
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        return;
      } else {
        throw new Error(
          result.message ||
            "Automated RFQ delivery failed. Please send your quotation details via direct email.",
        );
      }
    } catch (err: any) {
      console.error("Quote form submission error:", err);
      setErrorMessage(
        err?.message ||
          "We could not send your quote request automatically. Please use the button below to email info@vmgraphiteindustries.com directly.",
      );
      setStatus("error");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setFormData({
      product: initialProduct,
      category: initialCategory,
      name: "",
      company: "",
      email: "",
      phone: "",
      quantity: "Trial Sample / Prototype",
      timeline: "Standard (2–4 Weeks)",
      specifications: "",
      message: "",
      botcheck: "",
    });
  };

  const whatsappText = encodeURIComponent(
    `Hello VM Graphite Sales Desk, I would like to request a quote for "${formData.product || "Industrial Graphite Solutions"}". Volume: ${formData.quantity}, Name: ${formData.name}, Company: ${formData.company || "N/A"}.`,
  );
  const whatsappUrl = `https://wa.me/919422102425?text=${whatsappText}`;

  const mailtoSubject = encodeURIComponent(
    `[RFQ Quotation: ${rfqNumber || "Direct"}] Quote Request: ${formData.product || "Industrial Graphite"}`,
  );
  const mailtoBody = encodeURIComponent(
    `Hello V.M. Graphite Sales Desk,

I would like to request a quotation for:

Product: ${formData.product || "Industrial Graphite"}
Category: ${formData.category || "N/A"}
Required Quantity: ${formData.quantity}
Timeline: ${formData.timeline}

Client Name: ${formData.name}
Company Name: ${formData.company || "N/A"}
Work Email: ${formData.email}
Phone Number: ${formData.phone}
Custom Specifications: ${formData.specifications || "None"}
Application / Notes: ${formData.message || "None"}

Reference: ${rfqNumber || "Direct"}
`,
  );
  const mailtoUrl = `mailto:info@vmgraphiteindustries.com?subject=${mailtoSubject}&body=${mailtoBody}`;

  // ================= SUCCESS VIEW =================
  if (status === "success") {
    return (
      <div className="py-6 sm:py-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
          <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
        </div>

        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>RFQ Submitted Successfully</span>
          </span>
          <h3
            className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Quotation Request Received!
          </h3>
          <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
            Thank you,{" "}
            <span className="text-white font-semibold">{formData.name}</span>.
            Our technical commercial desk will email your customized pricing
            &amp; datasheet proposal within{" "}
            <span className="text-emerald-400 font-semibold font-mono">
              24 hours
            </span>
            .
          </p>
        </div>

        {/* Reference summary box */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 max-w-md mx-auto text-left space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Tracking Reference
            </span>
            <span className="text-xs font-mono font-bold text-theme-bright px-2.5 py-1 rounded-md bg-theme-tint border border-theme">
              {rfqNumber || "VMG-RFQ-84291"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px] mb-0.5">
                Target Product
              </span>
              <span className="text-white font-medium truncate block">
                {formData.product || "Industrial Graphite"}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] mb-0.5">
                Volume
              </span>
              <span className="text-white font-medium truncate block">
                {formData.quantity}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] mb-0.5">
                Email
              </span>
              <span className="text-white font-medium truncate block">
                {formData.email}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] mb-0.5">
                Phone
              </span>
              <span className="text-white font-medium truncate block">
                {formData.phone}
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 py-3 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <span>Fast-Track on WhatsApp</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>

          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto py-3 px-5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-medium rounded-xl text-xs flex items-center justify-center gap-2 border border-white/10 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Submit Another</span>
          </button>
        </div>
      </div>
    );
  }

  // ================= MAIN CLEAN FORM =================
  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-white">
      {/* Error alert banner */}
      {status === "error" && (
        <div className="p-5 bg-red-950/80 border border-red-500/60 rounded-2xl space-y-3 text-xs shadow-xl">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div className="space-y-1 flex-1">
              <span className="font-bold text-white text-sm block">
                Automated Dispatch Not Available
              </span>
              <p className="text-red-200 leading-relaxed">{errorMessage}</p>
            </div>
          </div>
          <div className="pt-2 border-t border-red-500/30 flex flex-col sm:flex-row gap-2">
            <a
              href={mailtoUrl}
              className="flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>
                Send Pre-filled Email to info@vmgraphiteindustries.com
              </span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-all"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Send via WhatsApp</span>
            </a>
          </div>
        </div>
      )}

      {/* Honeypot for spam bots */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
        checked={!!formData.botcheck}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            botcheck: e.target.checked ? "on" : "",
          }))
        }
      />

      {/* SECTION 1: Product & Quantity */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-theme-bright font-mono">
          <Package className="w-4 h-4 text-[var(--primary)]" />
          <span>Product &amp; Requirements</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Target Product */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Product / Material{" "}
              <span className="text-[var(--primary)]">*</span>
            </label>
            <input
              type="text"
              name="product"
              required
              value={formData.product}
              onChange={handleChange}
              placeholder="e.g. Graphite Suspension, Crucibles, Foil Tape"
              className="w-full bg-[#080b12] border border-white/10 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition-colors outline-none"
            />
          </div>

          {/* Volume Dropdown */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Order Volume / Quantity{" "}
              <span className="text-[var(--primary)]">*</span>
            </label>
            <select
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full bg-[#080b12] border border-white/10 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] rounded-xl px-3.5 py-2.5 text-sm text-white transition-colors outline-none cursor-pointer"
            >
              {QUANTITY_OPTIONS.map((opt) => (
                <option
                  key={opt}
                  value={opt}
                  className="bg-[#0b0e15] text-white"
                >
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Procurement Timeline Pills */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-2">
            Target Delivery Timeline
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {TIMELINE_OPTIONS.map((t) => {
              const isSelected = formData.timeline === t.label;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, timeline: t.label }))
                  }
                  className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? "bg-theme-tint border-theme text-theme-bright font-semibold shadow-sm"
                      : "bg-white/[0.02] border-white/10 text-slate-400 hover:text-white hover:border-white/20"
                  }`}
                >
                  {isSelected && (
                    <Check className="w-3 h-3 text-[var(--primary)] shrink-0" />
                  )}
                  <span className="truncate">{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.08]" />

      {/* SECTION 2: Contact Information */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-theme-bright font-mono">
          <User className="w-4 h-4 text-[var(--primary)]" />
          <span>Contact Information</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Full Name <span className="text-[var(--primary)]">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Rajesh Sharma"
                className="w-full bg-[#080b12] border border-white/10 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition-colors outline-none"
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Company / Enterprise{" "}
              <span className="text-slate-500 text-[11px]">(Optional)</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. Apex Metallurgy Ltd"
                className="w-full bg-[#080b12] border border-white/10 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition-colors outline-none"
              />
              <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Work Email */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Official Email <span className="text-[var(--primary)]">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="procurement@company.com"
                className="w-full bg-[#080b12] border border-white/10 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition-colors outline-none"
              />
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Phone / WhatsApp */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Phone / WhatsApp <span className="text-[var(--primary)]">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full bg-[#080b12] border border-white/10 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition-colors outline-none"
              />
              <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.08]" />

      {/* SECTION 3: Specifications & Remarks */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-theme-bright font-mono">
          <MessageSquare className="w-4 h-4 text-[var(--primary)]" />
          <span>
            Specifications &amp; Remarks{" "}
            <span className="text-slate-500 font-normal lowercase">
              (optional)
            </span>
          </span>
        </div>

        <div>
          <textarea
            name="message"
            rows={3}
            value={formData.message}
            onChange={handleChange}
            placeholder="Share custom dimensions, density requirements, temperature limits, target application, or delivery location..."
            className="w-full bg-[#080b12] border border-white/10 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] rounded-xl p-3.5 text-sm text-white placeholder-slate-500 transition-colors outline-none resize-none leading-relaxed"
          ></textarea>
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="forge-btn-primary w-full justify-center py-3.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-[var(--primary)]/15 disabled:opacity-50 cursor-pointer"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transmitting Request...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit RFQ to Sales Desk</span>
            </>
          )}
        </button>
      </div>

      <p className="text-center text-[11px] text-slate-400 font-mono">
        Direct factory response guaranteed within 24 business hours.
      </p>
    </form>
  );
}
