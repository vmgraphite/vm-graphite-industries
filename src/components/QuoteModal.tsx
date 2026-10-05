import { useState, useEffect, useCallback } from "react";
import { X, FileSpreadsheet, Sparkles } from "lucide-react";
import QuoteForm from "./QuoteForm";

interface QuoteModalProps {
  whatsappNumber?: string;
  recipientEmail?: string;
}

export default function QuoteModal({
  whatsappNumber,
  recipientEmail,
}: QuoteModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleOpen = (
      e: CustomEvent<{ productName?: string; categoryName?: string }>,
    ) => {
      setProductName(e.detail?.productName || "");
      setCategoryName(e.detail?.categoryName || "");
      setIsOpen(true);
    };

    window.addEventListener("open-quote-modal", handleOpen as EventListener);
    return () =>
      window.removeEventListener(
        "open-quote-modal",
        handleOpen as EventListener,
      );
  }, []);

  // Handle ESC key and scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#030509]/85 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#0a0d15] border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 my-6 text-white">

        {/* Header */}
        <div className="px-6 py-5 bg-[#080b12] border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 bg-theme-tint text-theme-bright border border-theme rounded-xl flex items-center justify-center shadow-md shrink-0">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-bold text-white leading-tight tracking-tight truncate" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Request Quotation
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5 truncate">
                {productName ? `Inquiry for: ${productName}` : "VM Graphite Technical Sales Desk"}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
            aria-label="Close quote modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-8 max-h-[82vh] overflow-y-auto">
          <QuoteForm
            initialProduct={productName}
            initialCategory={categoryName}
            whatsappNumber={whatsappNumber}
            recipientEmail={recipientEmail}
            onSuccess={handleClose}
          />
        </div>
      </div>
    </div>
  );
}
