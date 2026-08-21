import { useState, useEffect, useCallback } from "react";
import { X, FileSpreadsheet, Sparkles } from "lucide-react";
import QuoteForm from "./QuoteForm";

export default function QuoteModal() {
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
      {/* Backdrop with dark blur */}
      <div
        className="fixed inset-0 bg-[#030509]/85 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
        onClick={handleClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#0a0d15] border border-white/15 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_var(--primary-glow-subtle)] overflow-hidden z-10 my-6 transition-all transform animate-in fade-in zoom-in-95 duration-300 text-white">
        {/* Top glowing gradient accent strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent" />

        {/* Header */}
        <div className="px-6 py-4 sm:py-5 bg-[#07090f] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 bg-theme-tint text-theme-bright border border-theme rounded-2xl flex items-center justify-center shadow-md shrink-0">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white leading-tight tracking-tight truncate" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Request Commercial Quotation
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono">
                  <Sparkles className="w-3 h-3" /> Live Sales Desk
                </span>
              </div>
              <p className="text-xs text-theme-bright font-mono mt-0.5 truncate">
                {productName
                  ? `RFQ Target: ${productName}`
                  : "Direct Factory RFQ | VM Graphite Industries"}
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
            onSuccess={handleClose}
          />
        </div>
      </div>
    </div>
  );
}
