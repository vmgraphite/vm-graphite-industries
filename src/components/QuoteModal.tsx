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
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-industrial-lg overflow-hidden z-10 my-8">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-industrial-copper/20 text-industrial-copper rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">Request Commercial Quotation</h3>
              <p className="text-xs text-slate-400">
                {productName ? `Inquiring for: ${productName}` : 'Direct Commercial Inquiry | VM Graphite Industries'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close quote modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
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
