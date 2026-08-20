import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import QuoteForm from './QuoteForm';

export default function QuoteModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [productName, setProductName] = useState('');
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const handleOpen = (e: CustomEvent<{ productName?: string; categoryName?: string }>) => {
      setProductName(e.detail?.productName || '');
      setCategoryName(e.detail?.categoryName || '');
      setIsOpen(true);
    };

    window.addEventListener('open-quote-modal', handleOpen as EventListener);
    return () => window.removeEventListener('open-quote-modal', handleOpen as EventListener);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#040508]/80 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-[#0c101a] border border-gold-500/30 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 transition-all transform animate-in fade-in zoom-in-95 duration-300 text-white">
        {/* Header */}
        <div className="px-6 py-5 bg-[#080a10] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <img
              src="/images/logo.png"
              alt="VM Graphite Logo"
              className="w-10 h-10 rounded-xl object-contain border border-gold-500/30 shadow-md"
            />
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">Request Commercial Quotation</h3>
              <p className="text-xs text-gold-400 font-mono mt-0.5">
                {productName ? `Inquiring for: ${productName}` : 'Direct Commercial Inquiry | VM Graphite Industries'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
            aria-label="Close quote modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          <QuoteForm
            initialProduct={productName}
            initialCategory={categoryName}
            onSuccess={() => setIsOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}
