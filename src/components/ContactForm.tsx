import React, { useState } from "react";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  User,
  Mail,
  Phone,
  Building2,
  MessageSquare,
  Sparkles,
  Zap,
  ExternalLink,
  ChevronDown,
} from "lucide-react";

// Reads the Web3Forms access key injected by Astro via import.meta.env
const WEB3FORMS_KEY = import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY as string;

export interface ContactFormProps {
  nameLabel?: string;
  namePlaceholder?: string;
  companyLabel?: string;
  companyPlaceholder?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  phoneLabel?: string;
  phonePlaceholder?: string;
  subjectLabel?: string;
  subjectPlaceholder?: string;
  subjectOptions?: string[];
  messageLabel?: string;
  messagePlaceholder?: string;
  submitButtonText?: string;
  submittingButtonText?: string;
  formDisclaimerText?: string;
  successHeading?: string;
  successMessage?: string;
  whatsappFollowupButtonText?: string;
  resetButtonText?: string;
  whatsappNumber?: string;
  recipientEmail?: string;
}

const DEFAULT_SUBJECT_OPTIONS = [
  "Graphite & Carbon Products",
  "Tapes & Sealing Solutions",
  "Industrial Blades & Materials",
  "Custom Material Synthesis / R&D Trial",
  "Bulk Commercial Export Inquiry",
  "Technical Datasheet / Sample Request",
  "Other Commercial Inquiry",
];

export default function ContactForm({
  nameLabel = "Full Name",
  namePlaceholder = "John Doe",
  companyLabel = "Company / Business Name",
  companyPlaceholder = "Acme Manufacturing Ltd",
  emailLabel = "Official Email",
  emailPlaceholder = "john@acme.com",
  phoneLabel = "Phone / Mobile Number",
  phonePlaceholder = "+91 98765 43210",
  subjectLabel = "Subject / Product Category",
  subjectPlaceholder = "-- Select Product Category / Inquiry Type --",
  subjectOptions,
  messageLabel = "Detailed Message",
  messagePlaceholder = "Please detail your industrial requirements, material grades, or annual volume estimates...",
  submitButtonText = "Send Direct Message",
  submittingButtonText = "Transmitting inquiry...",
  formDisclaimerText,
  successHeading = "Message Delivered!",
  successMessage = "Thank you for contacting VM Graphite Industries LLP. Your message has been routed to our corporate sales team.",
  whatsappFollowupButtonText = "WhatsApp Follow-up",
  resetButtonText = "Send Another Message",
  whatsappNumber = "919422102425",
  recipientEmail = "info@vmgraphiteindustries.com",
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    botcheck: "", // Web3Forms honeypot field
  });

  const [ticketId, setTicketId] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const optionsList =
    Array.isArray(subjectOptions) && subjectOptions.length > 0
      ? subjectOptions
      : DEFAULT_SUBJECT_OPTIONS;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Silently discard bots that fill the honeypot
    if (formData.botcheck) return;

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.message.trim()
    ) {
      setErrorMessage(
        `Please complete all required fields (${nameLabel}, ${emailLabel}, ${phoneLabel}, and ${messageLabel}).`,
      );
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    const generatedId = `VMG-MSG-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(generatedId);

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
        subject: `📩 [Direct Contact: ${generatedId}] ${formData.subject || "Website Inquiry"} – ${formData.company || formData.name}`,
        from_name: `${formData.name} via VM Graphite Contact Form`,
        replyto: formData.email,
        botcheck: formData.botcheck,
        "Ticket Reference": generatedId,
        "Subject / Area": formData.subject || "General Commercial Inquiry",
        "Sender Full Name": formData.name,
        "Company Name": formData.company || "Not Specified",
        "Official Email": formData.email,
        "Phone Number": formData.phone,
        "Message Body": formData.message,
        "Submission Timestamp":
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
            "Email delivery failed. Please send your inquiry directly via email or WhatsApp.",
        );
      }
    } catch (err: any) {
      console.error("Contact submission error:", err);
      setErrorMessage(
        err?.message ||
          "We could not send your message automatically. Please click the button below to email info@vmgraphiteindustries.com directly.",
      );
      setStatus("error");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      botcheck: "",
    });
  };

  const whatsappText = encodeURIComponent(
    `Hello VM Graphite Team, I would like to inquire regarding "${formData.subject || "Commercial Products"}". Name: ${formData.name || ""}, Company: ${formData.company || ""}. Message: ${formData.message || ""}`,
  );
  const cleanPhone = String(whatsappNumber).replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${whatsappText}`;

  const mailtoSubject = encodeURIComponent(
    `[Website Inquiry: ${ticketId || "Direct"}] ${formData.subject || "General Inquiry"} – ${formData.company || formData.name}`,
  );
  const mailtoBody = encodeURIComponent(
    `Hello V.M. Graphite Team,

Here are my inquiry details:

Full Name: ${formData.name}
Company: ${formData.company || "N/A"}
Official Email: ${formData.email}
Phone Number: ${formData.phone}
Subject: ${formData.subject || "General Inquiry"}

Message:
${formData.message}

Reference ID: ${ticketId || "Direct"}
`,
  );
  const mailtoUrl = `mailto:${recipientEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

  const disclaimer =
    formDisclaimerText || `All messages are dispatched to ${recipientEmail}.`;

  if (status === "success") {
    return (
      <div className="bg-[#0b0e17] border border-emerald-500/40 p-8 rounded-2xl text-center space-y-5">
        <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
        </div>
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DELIVERED TO {recipientEmail.toUpperCase()}</span>
          </div>
          <h3 className="text-2xl font-black text-white">{successHeading}</h3>
          <p className="text-slate-300 max-w-md mx-auto text-sm mt-1 leading-relaxed font-normal">
            {successMessage} (Ref:{" "}
            <span className="font-mono text-theme-bright font-bold">
              {ticketId}
            </span>
            )
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
            <span>{whatsappFollowupButtonText}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto py-3 px-5 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white font-medium rounded-xl text-xs border border-white/10 transition-colors cursor-pointer"
          >
            {resetButtonText}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white">
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
              <span>Send Pre-filled Email to {recipientEmail}</span>
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

      {/* Web3Forms honeypot — must stay hidden */}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
            {nameLabel} <span className="text-theme-bright">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder={namePlaceholder}
              className="w-full bg-[#07090f] border border-white/15 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-glow)] rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition-all outline-none"
            />
            <User className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
            {companyLabel}
          </label>
          <div className="relative">
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder={companyPlaceholder}
              className="w-full bg-[#07090f] border border-white/15 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-glow)] rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition-all outline-none"
            />
            <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
            {emailLabel} <span className="text-theme-bright">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder={emailPlaceholder}
              className="w-full bg-[#07090f] border border-white/15 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-glow)] rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition-all outline-none"
            />
            <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
            {phoneLabel} <span className="text-theme-bright">*</span>
          </label>
          <div className="relative">
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder={phonePlaceholder}
              className="w-full bg-[#07090f] border border-white/15 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-glow)] rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition-all outline-none"
            />
            <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
          {subjectLabel}
        </label>
        <div className="relative">
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full bg-[#07090f] border border-white/15 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-glow)] rounded-xl px-3.5 py-2.5 text-sm text-white transition-all outline-none appearance-none cursor-pointer pr-10 font-sans"
          >
            <option value="" className="bg-[#0d1117] text-slate-400">
              {subjectPlaceholder}
            </option>
            {optionsList.map((opt) => (
              <option key={opt} value={opt} className="bg-[#0d1117] text-white">
                {opt}
              </option>
            ))}
          </select>
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
          {messageLabel} <span className="text-theme-bright">*</span>
        </label>
        <div className="relative">
          <textarea
            name="message"
            rows={4}
            required
            value={formData.message}
            onChange={handleChange}
            placeholder={messagePlaceholder}
            className="w-full bg-[#07090f] border border-white/15 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-glow)] rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition-all outline-none resize-none"
          ></textarea>
          <MessageSquare className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full py-3.5 px-6 bg-gradient-to-r from-[var(--primary-light)] via-[var(--primary)] to-[var(--primary-dark)] hover:opacity-95 text-slate-950 font-black rounded-xl border border-white/30 shadow-[0_4px_20px_var(--primary-glow)] flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer uppercase tracking-wider font-sans"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
            <span>{submittingButtonText}</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5 text-slate-950" />
            <span>{submitButtonText}</span>
          </>
        )}
      </button>

      <p className="text-center text-[11px] text-slate-400">{disclaimer}</p>
    </form>
  );
}
