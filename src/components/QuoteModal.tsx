import { useState, useEffect } from 'react';
import { X, FileText } from 'lucide-react';
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
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 transition-all transform animate-in fade-in zoom-in-95 duration-300 text-slate-900">
        {/* Header */}
        <div className="px-6 py-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 bg-amber-500/10 text-industrial-copper border border-amber-500/20 rounded-xl flex items-center justify-center shadow-2xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 leading-tight">Request Commercial Quotation</h3>
              <p className="text-xs text-industrial-copper font-mono mt-0.5">
                {productName ? `Inquiring for: ${productName}` : 'Direct Commercial Inquiry | VM Graphite Industries'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-500 hover:text-slate-900 p-2 rounded-xl hover:bg-slate-200/80 transition-colors"
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


