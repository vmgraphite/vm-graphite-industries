import React, { useState } from 'react';
import { Studio } from 'sanity';
import config from '../../../sanity.config';
import {
  Globe,
  Settings,
  FileText,
  Boxes,
  FolderTree,
  ExternalLink,
  HelpCircle,
  X,
  Copy,
  Check,
  ShieldCheck,
  BookOpen,
  ArrowLeft,
  ChevronDown,
  Sparkles,
  Database
} from 'lucide-react';

const SHORTCUTS = [
  { label: 'Site Settings', path: '/admin/studio/structure/siteSettings', icon: Settings, desc: 'Contact info, phone numbers & company address' },
  { label: 'Home Page', path: '/admin/studio/structure/homePage', icon: Globe, desc: 'Hero headlines, trust badges & stat counters' },
  { label: 'About Us', path: '/admin/studio/structure/aboutPage', icon: BookOpen, desc: 'Quality certificates & company history' },
  { label: 'Products', path: '/admin/studio/structure/product', icon: Boxes, desc: 'Product catalog, specs & technical datasheets' },
  { label: 'Categories', path: '/admin/studio/structure/category', icon: FolderTree, desc: 'Product categories & industry tags' },
  { label: 'Downloads & TDS', path: '/admin/studio/structure/resource', icon: FileText, desc: 'Technical spec sheets & PDF brochures' },
];

export default function SanityStudioEmbed() {
  const [helpOpen, setHelpOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#07090e] font-sans">
      {/* Studio Header Toolbar */}
      <header className="h-14 bg-[#0b0e14] border-b border-slate-800 flex items-center justify-between px-3 sm:px-4 z-40 flex-shrink-0">
        {/* Left: Back Link & Studio Branding */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="/admin"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 text-xs font-semibold transition-all group"
            title="Return to VM Graphite Admin Portal"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform text-[#e8a020]" />
            <span className="hidden xs:inline">Admin Dashboard</span>
          </a>

          <div className="h-4 w-px bg-slate-800 hidden sm:block" />

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#e8a020] text-[#07090e] font-black text-[11px] flex items-center justify-center font-mono">
              VM
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-xs sm:text-sm font-['Outfit'] hidden sm:inline">
                Content Studio
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="hidden md:inline">twycammz • production</span>
                <span className="md:hidden">Live</span>
              </span>
            </div>
          </div>
        </div>

        {/* Center: Schema Jump Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShortcutsOpen(!shortcutsOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-200 transition-all"
          >
            <Database className="w-3.5 h-3.5 text-[#e8a020]" />
            <span className="hidden sm:inline">Jump to Document</span>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${shortcutsOpen ? 'rotate-180' : ''}`} />
          </button>

          {shortcutsOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShortcutsOpen(false)} />
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-64 sm:w-72 bg-[#0d1117] border border-slate-800 rounded-xl shadow-2xl p-2 z-50 space-y-1">
                <div className="px-2.5 py-1 text-[10px] uppercase font-mono text-slate-400 font-semibold tracking-wider">
                  Direct Schema Links
                </div>
                {SHORTCUTS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.path}
                      href={item.path}
                      onClick={() => setShortcutsOpen(false)}
                      className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-800/80 text-slate-200 hover:text-white transition-colors group"
                    >
                      <div className="p-1.5 rounded-md bg-[#e8a020]/10 text-[#e8a020] mt-0.5 group-hover:bg-[#e8a020]/20">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold text-white group-hover:text-[#e8a020]">
                          {item.label}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {item.desc}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Right: Help Modal & Quick Links */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setHelpOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium transition-all"
            title="Studio Login & Guide"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#e8a020]" />
            <span className="hidden md:inline">Help & Guide</span>
          </button>

          <a
            href="https://www.sanity.io/manage/project/twycammz"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 text-xs font-medium transition-all"
            title="Manage project members, API keys and datasets on Sanity.io"
          >
            <span>Cloud</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#e8a020] hover:bg-[#d4911c] text-[#07090e] font-bold text-xs transition-all shadow-sm"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Live Site</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </header>

      {/* Embedded Sanity Studio Canvas */}
      <div className="flex-1 w-full relative overflow-hidden bg-[#07090e]">
        <Studio config={config} />
      </div>

      {/* Help & Auth Modal */}
      {helpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setHelpOpen(false)}
          />

          <div className="relative w-full max-w-lg bg-[#0d1117] border border-slate-800 rounded-2xl p-6 shadow-2xl z-10 space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#e8a020]/15 text-[#e8a020]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-['Outfit']">
                    Sanity Studio Authentication & Info
                  </h3>
                  <p className="text-xs text-slate-400">
                    Content Management System for VM Graphite Industries
                  </p>
                </div>
              </div>
              <button
                onClick={() => setHelpOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
              <div className="p-3.5 bg-[#e8a020]/10 border border-[#e8a020]/30 rounded-xl space-y-1.5 text-amber-200">
                <div className="font-bold flex items-center gap-1.5 text-[#e8a020]">
                  <Sparkles className="w-4 h-4" />
                  <span>How to Log In & Edit Content</span>
                </div>
                <p className="text-[11px] text-amber-200/90 leading-normal">
                  If the screen displays <strong>Choose login provider</strong>, click <strong>Google</strong> or <strong>GitHub</strong> to sign in using your authorized email address (e.g., <code className="font-mono bg-black/40 px-1 py-0.5 rounded text-white">kanikaagrawal1997@gmail.com</code>).
                </p>
              </div>

              <div className="space-y-2">
                <div className="font-bold text-white uppercase font-mono text-[11px] text-slate-400">
                  Project Configuration
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-500 font-mono block">Project ID</span>
                    <span className="font-mono font-bold text-white">twycammz</span>
                  </div>
                  <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-500 font-mono block">Dataset</span>
                    <span className="font-mono font-bold text-white">production</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-bold text-white uppercase font-mono text-[11px] text-slate-400">
                  Content Types Managed in Studio
                </div>
                <ul className="space-y-1.5 list-disc pl-4 text-slate-300">
                  <li><strong>Site Settings:</strong> Corporate headquarters, plant location, phone numbers, contact email & WhatsApp.</li>
                  <li><strong>Home & About Pages:</strong> Hero headlines, dynamic statistics counters, certifications & testing infrastructure.</li>
                  <li><strong>Product Catalog:</strong> High-density graphite blocks, EDM rods, carbon brushes, continuous casting dies, crucibles & specifications.</li>
                  <li><strong>Brochures & TDS:</strong> Downloadable PDF datasheets for customers.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <div className="font-bold text-white uppercase font-mono text-[11px] text-slate-400">
                  CLI & Query Commands
                </div>
                <div className="bg-black/60 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] flex items-center justify-between text-slate-300">
                  <span className="truncate mr-2">npx sanity@latest documents query '*[_type=="product"]'</span>
                  <button
                    onClick={() => copyToClipboard(`npx sanity@latest documents query '*[_type=="product"]'`, 'query')}
                    className="text-slate-400 hover:text-white flex-shrink-0"
                    title="Copy command"
                  >
                    {copiedText === 'query' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <a
                href="/admin"
                className="text-xs text-[#e8a020] hover:underline font-semibold flex items-center gap-1"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Go to Admin Dashboard</span>
              </a>
              <button
                onClick={() => setHelpOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
