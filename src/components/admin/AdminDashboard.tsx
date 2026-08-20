import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  Boxes,
  FolderTree,
  FileText,
  Settings,
  ExternalLink,
  Menu,
  X,
  Search,
  Database,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  RefreshCw,
  Eye,
  Layers,
  ShieldCheck,
  Terminal,
  Cloud,
  BookOpen,
  ChevronRight,
  Mail,
  Globe,
  SlidersHorizontal,
  FileEdit,
  Sliders,
  Copy,
  Check,
  Zap,
  Tag,
  Download,
  Info,
  Server,
  KeyRound,
  Compass
} from 'lucide-react';
import {
  MOCK_PRODUCTS,
  MOCK_CATEGORIES,
  MOCK_RESOURCES,
  type Product,
} from '../../lib/mockData';

type TabType = 'overview' | 'studio' | 'products' | 'categories' | 'resources' | 'deploy';

interface AdminDashboardProps {
  projectId?: string;
  dataset?: string;
  contactEmail?: string;
}

export default function AdminDashboard({
  projectId = 'twycammz',
  dataset = 'production',
  contactEmail = 'kanikaagrawal1997@gmail.com',
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Filtered Products for Catalog Explorer
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.specifications && product.specifications.some(s => s.value.toLowerCase().includes(searchQuery.toLowerCase())));
      const matchesCategory =
        selectedCategory === 'all' || product.categorySlug === selectedCategory;
      const matchesFeatured = !featuredOnly || product.isFeatured;
      return matchesSearch && matchesCategory && matchesFeatured;
    });
  }, [searchQuery, selectedCategory, featuredOnly]);

  const navItems = [
    {
      id: 'overview',
      label: 'Dashboard Overview',
      icon: LayoutDashboard,
      badge: 'Live',
    },
    {
      id: 'studio',
      label: 'Sanity Studio Launchpad',
      icon: Database,
      badge: 'New Tab',
    },
    {
      id: 'products',
      label: 'Products Catalog',
      icon: Boxes,
      count: MOCK_PRODUCTS.length,
    },
    {
      id: 'categories',
      label: 'Product Categories',
      icon: FolderTree,
      count: MOCK_CATEGORIES.length,
    },
    {
      id: 'resources',
      label: 'Brochures & TDS',
      icon: FileText,
      count: MOCK_RESOURCES.length,
    },
    {
      id: 'deploy',
      label: 'Cloud & Deployment',
      icon: Cloud,
      badge: 'Netlify',
    },
  ];

  const schemas = [
    {
      id: 'siteSettings',
      title: 'Site Settings & Contact Info',
      type: 'Singleton',
      typeBadge: 'bg-amber-500/15 text-[#e8a020] border-amber-500/30',
      description: 'Phones, contact emails, corporate headquarters, manufacturing plant address, WhatsApp trigger, and global metadata.',
      studioUrl: '/admin/studio/structure/siteSettings',
      previewUrl: '/contact',
      icon: Settings,
      iconColor: 'text-[#e8a020] bg-amber-500/10',
    },
    {
      id: 'homePage',
      title: 'Home Page Content',
      type: 'Singleton',
      typeBadge: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
      description: 'Hero banner headline, trust badges, animated stats, industry application highlights, and quality pillars.',
      studioUrl: '/admin/studio/structure/homePage',
      previewUrl: '/',
      icon: Globe,
      iconColor: 'text-sky-400 bg-sky-500/10',
    },
    {
      id: 'aboutPage',
      title: 'About Us & Capabilities',
      type: 'Singleton',
      typeBadge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      description: 'Manufacturing history, high-temperature testing equipment, quality control certifications, and infrastructure milestones.',
      studioUrl: '/admin/studio/structure/aboutPage',
      previewUrl: '/about',
      icon: BookOpen,
      iconColor: 'text-emerald-400 bg-emerald-500/10',
    },
    {
      id: 'product',
      title: 'Products Catalog',
      type: `${MOCK_PRODUCTS.length} Documents`,
      typeBadge: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
      description: 'Full product specs, temperature ratings, purity levels, application tags, dimensional charts, and image galleries.',
      studioUrl: '/admin/studio/structure/product',
      previewUrl: '/products',
      icon: Boxes,
      iconColor: 'text-purple-400 bg-purple-500/10',
    },
    {
      id: 'category',
      title: 'Product Categories',
      type: `${MOCK_CATEGORIES.length} Categories`,
      typeBadge: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
      description: 'Graphite Crucibles, Colloidal Suspensions, Gaskets & Tapes, Doctor Blades, and Specialized Carbon Components.',
      studioUrl: '/admin/studio/structure/category',
      previewUrl: '/products',
      icon: FolderTree,
      iconColor: 'text-blue-400 bg-blue-500/10',
    },
    {
      id: 'resource',
      title: 'Downloads & TDS',
      type: `${MOCK_RESOURCES.length} Files`,
      typeBadge: 'bg-red-500/15 text-red-400 border-red-500/30',
      description: 'Technical Data Sheets (TDS), Material Safety Data Sheets (MSDS), and comprehensive PDF product brochures.',
      studioUrl: '/admin/studio/structure/resource',
      previewUrl: '/downloads',
      icon: FileText,
      iconColor: 'text-red-400 bg-red-500/10',
    },
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-200 flex flex-col font-sans selection:bg-[#e8a020] selection:text-[#07090e]">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0d1117]/95 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-6 py-3 flex items-center justify-between shadow-lg shadow-black/20">
        <div className="flex items-center gap-3">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -ml-1 text-slate-400 hover:text-white lg:hidden rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#e8a020]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Logo & Portal Title */}
          <div className="flex items-center gap-2.5">
            <a href="/admin" className="flex items-center gap-2.5 group">
              <img
                src="/images/logo.png"
                alt="VM Graphite Logo"
                className="w-9 h-9 rounded-xl object-contain border border-white/10 shadow-md shadow-[#e8a020]/10 group-hover:scale-105 transition-transform"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-sm text-white tracking-wide uppercase font-['Outfit']">
                    VM Graphite
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold bg-[#e8a020]/15 text-[#e8a020] border border-[#e8a020]/30 rounded-full">
                    Admin Portal
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono hidden sm:block">Industrial CMS Control Center</p>
              </div>
            </a>
          </div>
        </div>

        {/* Center/Right Status & Action Shortcuts */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sanity Cloud Pill */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-900/90 border border-slate-800 rounded-full text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-400">Sanity:</span>
            <span className="text-white font-mono text-[11px] font-semibold">{projectId} ({dataset})</span>
          </div>

          {/* Studio Root New Tab Button */}
          <a
            href="/admin/studio"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#07090e] bg-[#e8a020] hover:bg-[#d4911c] rounded-lg transition-all shadow-md shadow-[#e8a020]/15 group"
          >
            <Database className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Open Studio</span>
            <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Live Site Link */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 rounded-lg transition-all shadow-sm"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar for Desktop */}
        <aside className="hidden lg:flex w-64 flex-col bg-[#0b0e14] border-r border-slate-800/80 p-4 space-y-6 flex-shrink-0">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-3 mb-2 font-mono">
              Management Modules
            </p>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as TabType)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#e8a020]/15 text-[#e8a020] border border-[#e8a020]/30 font-semibold shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#e8a020]' : 'text-slate-500'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                          isActive
                            ? 'bg-[#e8a020] text-[#07090e] font-bold'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    {item.count !== undefined && (
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-400">
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Shortcuts to Studio Schemas */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-3 mb-2 font-mono">
              Direct Studio Shortcuts
            </p>
            <div className="space-y-1">
              <a
                href="/admin/studio/structure/siteSettings"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition-colors group"
              >
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e8a020]"></span>
                  <span>Site Settings</span>
                </span>
                <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-[#e8a020]" />
              </a>
              <a
                href="/admin/studio/structure/homePage"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition-colors group"
              >
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                  <span>Home Page</span>
                </span>
                <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-sky-400" />
              </a>
              <a
                href="/admin/studio/structure/product"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition-colors group"
              >
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                  <span>Products Catalog</span>
                </span>
                <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-purple-400" />
              </a>
            </div>
          </div>

          {/* Quick System Diagnostics */}
          <div className="mt-auto pt-4 border-t border-slate-800/80 space-y-3">
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800/80 text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lead Inbox</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-mono font-semibold">Active</span>
              </div>
              <p className="text-[11px] text-slate-300 font-mono truncate" title={contactEmail}>
                {contactEmail}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-mono">
              <span>VM Graphite v1.0</span>
              <a
                href={`https://www.sanity.io/manage/project/${projectId}`}
                target="_blank"
                rel="noreferrer"
                className="text-[#e8a020] hover:underline flex items-center gap-1 font-semibold"
              >
                Sanity Manage <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </aside>

        {/* Mobile Slide-Out Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer Content */}
            <div className="relative w-4/5 max-w-xs bg-[#0b0e14] border-r border-slate-800 p-5 flex flex-col justify-between h-full shadow-2xl z-10">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <img
                      src="/images/logo.png"
                      alt="VM Graphite Logo"
                      className="w-7 h-7 rounded-lg object-contain border border-white/10"
                    />
                    <span className="font-bold text-white text-sm uppercase font-['Outfit']">
                      Admin Navigation
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id as TabType);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                          isActive
                            ? 'bg-[#e8a020]/20 text-[#e8a020] border border-[#e8a020]/40 font-semibold'
                            : 'text-slate-300 hover:bg-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-[#e8a020]' : 'text-slate-400'}`} />
                          <span>{item.label}</span>
                        </div>
                        {item.count !== undefined && (
                          <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                            {item.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-2">
                <a
                  href="/admin/studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#e8a020] hover:bg-[#d4911c] text-[#07090e] font-bold text-xs rounded-xl shadow-md transition-all"
                >
                  <Database className="w-4 h-4" />
                  <span>Launch Sanity Studio</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 transition-all"
                >
                  <span>View Public Website</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Center Workspace Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#07090e] p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Welcome Header Hero */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-[#101726] to-[#0d131f] border border-slate-800/90 p-6 sm:p-8 shadow-xl">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2.5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8a020]/15 border border-[#e8a020]/30 text-[#e8a020] text-xs font-semibold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Enterprise Industrial CMS Dashboard</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] tracking-tight">
                      VM Graphite Control Center
                    </h1>
                    <p className="text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
                      Manage high-temperature crucibles, colloidal graphite suspensions, sealing materials, and doctor blade catalogs with real-time Sanity Cloud synchronization.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href="/admin/studio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 bg-[#e8a020] hover:bg-[#d4911c] text-[#07090e] font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-[#e8a020]/20 flex items-center gap-2 group"
                    >
                      <Database className="w-4 h-4" />
                      <span>Open Sanity Studio</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                    <button
                      onClick={() => setActiveTab('products')}
                      className="px-4 py-3 bg-slate-800/90 hover:bg-slate-700 text-white font-medium text-xs sm:text-sm rounded-xl border border-slate-700 transition-all flex items-center gap-2"
                    >
                      <Boxes className="w-4 h-4 text-[#e8a020]" />
                      <span>Browse Products ({MOCK_PRODUCTS.length})</span>
                    </button>
                  </div>
                </div>
                {/* Background glow */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#e8a020]/10 rounded-full blur-3xl pointer-events-none" />
              </div>

              {/* KPI Metrics Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
                <button
                  onClick={() => setActiveTab('products')}
                  className="text-left bg-[#0d1117] border border-slate-800/80 rounded-2xl p-4 sm:p-5 hover:border-[#e8a020]/50 hover:bg-slate-900/60 transition-all shadow-md group"
                >
                  <div className="flex items-center justify-between text-slate-400 mb-3">
                    <span className="text-xs font-medium uppercase tracking-wider font-mono">Catalog Items</span>
                    <div className="p-2 rounded-lg bg-[#e8a020]/10 text-[#e8a020] group-hover:scale-110 transition-transform">
                      <Boxes className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
                    {MOCK_PRODUCTS.length}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                    <span>Active industrial items</span>
                    <ChevronRight className="w-3 h-3 text-[#e8a020]" />
                  </p>
                </button>

                <button
                  onClick={() => setActiveTab('categories')}
                  className="text-left bg-[#0d1117] border border-slate-800/80 rounded-2xl p-4 sm:p-5 hover:border-sky-500/50 hover:bg-slate-900/60 transition-all shadow-md group"
                >
                  <div className="flex items-center justify-between text-slate-400 mb-3">
                    <span className="text-xs font-medium uppercase tracking-wider font-mono">Categories</span>
                    <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 group-hover:scale-110 transition-transform">
                      <FolderTree className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
                    {MOCK_CATEGORIES.length}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                    <span>Specialized verticals</span>
                    <ChevronRight className="w-3 h-3 text-sky-400" />
                  </p>
                </button>

                <button
                  onClick={() => setActiveTab('resources')}
                  className="text-left bg-[#0d1117] border border-slate-800/80 rounded-2xl p-4 sm:p-5 hover:border-purple-500/50 hover:bg-slate-900/60 transition-all shadow-md group"
                >
                  <div className="flex items-center justify-between text-slate-400 mb-3">
                    <span className="text-xs font-medium uppercase tracking-wider font-mono">Brochures & TDS</span>
                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                      <FileText className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
                    {MOCK_RESOURCES.length}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                    <span>Datasheets & catalogs</span>
                    <ChevronRight className="w-3 h-3 text-purple-400" />
                  </p>
                </button>

                <a
                  href={`https://www.sanity.io/manage/project/${projectId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#0d1117] border border-slate-800/80 rounded-2xl p-4 sm:p-5 hover:border-emerald-500/50 hover:bg-slate-900/60 transition-all shadow-md group block"
                >
                  <div className="flex items-center justify-between text-slate-400 mb-3">
                    <span className="text-xs font-medium uppercase tracking-wider font-mono">Sanity CMS</span>
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-white font-mono truncate" title={projectId}>
                    {projectId}
                  </div>
                  <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                    <span>Dataset: {dataset}</span>
                    <ExternalLink className="w-3 h-3" />
                  </p>
                </a>
              </div>

              {/* Configured Content Schemas Grid */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white font-['Outfit'] flex items-center gap-2">
                      <Layers className="w-5 h-5 text-[#e8a020]" />
                      <span>Configured Content Schemas</span>
                    </h2>
                    <p className="text-xs text-slate-400">Directly edit structured singletons and catalogs in Sanity Studio</p>
                  </div>
                  <a
                    href="/admin/studio"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[#e8a020] hover:underline font-semibold flex items-center gap-1 font-mono"
                  >
                    <span>Open All in Studio</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {schemas.map((schema) => {
                    const Icon = schema.icon;
                    return (
                      <div
                        key={schema.id}
                        className="bg-[#0d1117] border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all space-y-3.5 flex flex-col justify-between shadow-md group"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className={`p-2.5 rounded-xl ${schema.iconColor}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className={`px-2 py-0.5 text-[10px] font-mono font-semibold rounded-full border ${schema.typeBadge}`}>
                              {schema.type}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-bold text-white text-base font-['Outfit'] group-hover:text-[#e8a020] transition-colors">
                              {schema.title}
                            </h3>
                            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                              {schema.description}
                            </p>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                          <a
                            href={schema.previewUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-slate-400 hover:text-slate-200 font-medium flex items-center gap-1"
                          >
                            <span>Preview</span>
                            <ExternalLink className="w-3 h-3 text-slate-500" />
                          </a>

                          <a
                            href={schema.studioUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#e8a020] hover:underline font-bold flex items-center gap-1.5 bg-[#e8a020]/10 hover:bg-[#e8a020]/20 px-2.5 py-1 rounded-lg transition-colors"
                          >
                            <span>Edit in Studio</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Featured Catalog Glance */}
              <div className="bg-[#0d1117] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Boxes className="w-5 h-5 text-[#e8a020]" />
                    <h2 className="text-base font-bold text-white font-['Outfit']">
                      Featured Products Quick Access
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setFeaturedOnly(true);
                      setActiveTab('products');
                    }}
                    className="text-xs text-[#e8a020] hover:underline font-semibold font-mono flex items-center gap-1"
                  >
                    <span>View All Catalog Items</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {MOCK_PRODUCTS.filter(p => p.isFeatured).slice(0, 4).map((product) => (
                    <div
                      key={product.slug}
                      className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-3.5 flex flex-col justify-between space-y-3 hover:border-slate-700 transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-lg bg-slate-950 border border-slate-800 overflow-hidden flex-shrink-0 flex items-center justify-center">
                          {product.mainImage ? (
                            <img src={product.mainImage} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          ) : (
                            <Boxes className="w-5 h-5 text-slate-600" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[9px] font-mono uppercase text-[#e8a020] font-semibold">{product.categoryName}</span>
                          <h4 className="text-xs font-bold text-white truncate mt-0.5">{product.name}</h4>
                          <p className="text-[10px] text-slate-500 font-mono truncate">/{product.slug}</p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="text-slate-400 hover:text-white font-medium flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3 text-[#e8a020]" />
                          <span>Specs</span>
                        </button>
                        <a
                          href={`/products/${product.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#e8a020] hover:underline font-semibold flex items-center gap-1"
                        >
                          <span>Live ↗</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Operational Diagnostics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#0d1117] border border-slate-800/90 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-2.5 text-white font-bold font-['Outfit']">
                    <div className="p-2 rounded-lg bg-[#e8a020]/15 text-[#e8a020]">
                      <Terminal className="w-4 h-4" />
                    </div>
                    <span>Sanity Cloud & CLI Commands</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Query documents or deploy schema definitions directly from your terminal:
                  </p>
                  <div className="space-y-2 font-mono text-xs">
                    <div className="bg-black/60 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between text-slate-300">
                      <span className="truncate mr-2">npx sanity@latest documents query '*[_type=="product"]'</span>
                      <button
                        onClick={() => copyToClipboard(`npx sanity@latest documents query '*[_type=="product"]'`, 'query')}
                        className="text-slate-400 hover:text-white flex-shrink-0"
                        title="Copy command"
                      >
                        {copiedText === 'query' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <div className="bg-black/60 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between text-slate-300">
                      <span className="truncate mr-2">npx sanity@latest deploy</span>
                      <button
                        onClick={() => copyToClipboard('npx sanity@latest deploy', 'deploy')}
                        className="text-slate-400 hover:text-white flex-shrink-0"
                        title="Copy command"
                      >
                        {copiedText === 'deploy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0d1117] border border-slate-800/90 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-2.5 text-white font-bold font-['Outfit']">
                    <div className="p-2 rounded-lg bg-emerald-500/15 text-emerald-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span>Inquiry Routing & Leads Inbox</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Customer quote requests, product technical inquiries, and brochure download leads are delivered to:
                  </p>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="text-slate-400 text-[11px]">Primary Contact Recipient</div>
                      <div className="text-white font-bold font-mono mt-0.5">{contactEmail}</div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold text-[10px]">
                      Configured in .env
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SANITY CONTENT STUDIO (LAUNCHPAD) */}
          {activeTab === 'studio' && (
            <div className="max-w-5xl mx-auto space-y-6">
              {/* Studio Banner */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-[#101726] to-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2.5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>Sanity Studio Cloud Connected</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                      Sanity Content Studio Workspace
                    </h2>
                    <p className="text-slate-400 text-xs sm:text-sm max-w-xl leading-relaxed">
                      Edit structured content, upload high-resolution product photography, configure global contact details, and publish updates with real-time preview in an isolated dedicated tab.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <a
                      href="/admin/studio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3.5 bg-[#e8a020] hover:bg-[#d4911c] text-[#07090e] font-extrabold text-sm rounded-xl transition-all shadow-lg shadow-[#e8a020]/20 flex items-center justify-center gap-2 group"
                    >
                      <Database className="w-4 h-4" />
                      <span>Launch Studio in New Tab</span>
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#e8a020]/10 rounded-full blur-3xl pointer-events-none" />
              </div>

              {/* Direct Deep-Links to Schemas */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white font-['Outfit'] flex items-center gap-2">
                  <FileEdit className="w-4 h-4 text-[#e8a020]" />
                  <span>Direct Content Document Shortcuts</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <a
                    href="/admin/studio/structure/siteSettings"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-[#0d1117] border border-slate-800 hover:border-[#e8a020]/50 rounded-xl flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-amber-500/10 text-[#e8a020]">
                        <Settings className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm group-hover:text-[#e8a020] transition-colors">
                          Site Settings
                        </div>
                        <div className="text-[11px] text-slate-400">Phones, emails & addresses</div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-[#e8a020] transition-colors" />
                  </a>

                  <a
                    href="/admin/studio/structure/homePage"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-[#0d1117] border border-slate-800 hover:border-sky-500/50 rounded-xl flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm group-hover:text-sky-400 transition-colors">
                          Home Page
                        </div>
                        <div className="text-[11px] text-slate-400">Hero banners & statistics</div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-sky-400 transition-colors" />
                  </a>

                  <a
                    href="/admin/studio/structure/aboutPage"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-[#0d1117] border border-slate-800 hover:border-emerald-500/50 rounded-xl flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm group-hover:text-emerald-400 transition-colors">
                          About Us
                        </div>
                        <div className="text-[11px] text-slate-400">Plant & quality certifications</div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                  </a>

                  <a
                    href="/admin/studio/structure/product"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-[#0d1117] border border-slate-800 hover:border-purple-500/50 rounded-xl flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                        <Boxes className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm group-hover:text-purple-400 transition-colors">
                          Products Catalog
                        </div>
                        <div className="text-[11px] text-slate-400">Specifications & galleries</div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
                  </a>

                  <a
                    href="/admin/studio/structure/category"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-[#0d1117] border border-slate-800 hover:border-blue-500/50 rounded-xl flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                        <FolderTree className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors">
                          Product Categories
                        </div>
                        <div className="text-[11px] text-slate-400">5 industrial groupings</div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                  </a>

                  <a
                    href="/admin/studio/structure/resource"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-[#0d1117] border border-slate-800 hover:border-red-500/50 rounded-xl flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm group-hover:text-red-400 transition-colors">
                          Brochures & TDS
                        </div>
                        <div className="text-[11px] text-slate-400">PDF downloads & datasheets</div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-red-400 transition-colors" />
                  </a>
                </div>
              </div>

              {/* Sanity Project Details */}
              <div className="bg-[#0d1117] border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Database className="w-4 h-4 text-[#e8a020]" />
                    <span className="font-bold text-white font-['Outfit']">Sanity Cloud Configuration</span>
                  </div>
                  <a
                    href={`https://www.sanity.io/manage/project/${projectId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#e8a020] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>Manage Cloud Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="text-slate-500 text-[10px]">PROJECT ID</div>
                    <div className="text-[#e8a020] font-bold mt-0.5">{projectId}</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="text-slate-500 text-[10px]">DATASET</div>
                    <div className="text-emerald-400 font-bold mt-0.5">{dataset}</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="text-slate-500 text-[10px]">STUDIO ROUTE</div>
                    <div className="text-white font-bold mt-0.5">/admin/studio</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PRODUCTS CATALOG EXPLORER */}
          {activeTab === 'products' && (
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Header & Controls */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-white font-['Outfit']">Products Catalog Explorer</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Search and inspect active product specifications, materials, and categories.
                  </p>
                </div>

                {/* Filters & Studio CTA */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative min-w-[220px]">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search products, specs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-8 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#e8a020]"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    aria-label="Filter by product category"
                    className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#e8a020]"
                  >
                    <option value="all">All Categories ({MOCK_PRODUCTS.length})</option>
                    {MOCK_CATEGORIES.map((cat) => (
                      <option key={cat.slug} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => setFeaturedOnly(!featuredOnly)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      featuredOnly
                        ? 'bg-amber-500/20 text-[#e8a020] border-[#e8a020]/40'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    ★ Featured
                  </button>

                  <a
                    href="/admin/studio/structure/product"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-[#e8a020] hover:bg-[#d4911c] text-[#07090e] font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <Database className="w-3.5 h-3.5" />
                    <span>Edit in Studio</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id || product.slug}
                    className="bg-[#0d1117] border border-slate-800/90 hover:border-slate-700 rounded-2xl p-4 flex flex-col justify-between transition-all shadow-md group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden flex-shrink-0 flex items-center justify-center">
                          {product.mainImage ? (
                            <img
                              src={product.mainImage}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          ) : (
                            <Boxes className="w-6 h-6 text-slate-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-semibold text-[#e8a020] uppercase tracking-wider font-mono">
                              {product.categoryName}
                            </span>
                            {product.isFeatured && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-amber-500/20 text-amber-300">
                                ★ Featured
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold text-white text-sm truncate mt-0.5">{product.name}</h3>
                          <p className="text-[11px] text-slate-500 font-mono truncate">/{product.slug}</p>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {product.shortDescription}
                      </p>

                      {/* Specs Badge Pill list */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {product.specifications?.slice(0, 2).map((spec, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] text-slate-300 font-mono"
                          >
                            {spec.name}: <span className="text-[#e8a020]">{spec.value}</span>
                          </span>
                        ))}
                        {product.specifications?.length > 2 && (
                          <span className="px-1.5 py-0.5 rounded-md bg-slate-900 text-[10px] text-slate-500 font-mono">
                            +{product.specifications.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="text-slate-300 hover:text-white font-medium flex items-center gap-1 bg-slate-900 hover:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-800 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#e8a020]" />
                        <span>View Specs</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <a
                          href={`/products/${product.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-400 hover:text-white flex items-center gap-1 font-medium text-xs"
                        >
                          <span>Live</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="p-12 text-center bg-[#0d1117] border border-slate-800 rounded-2xl space-y-3">
                  <Boxes className="w-10 h-10 text-slate-600 mx-auto" />
                  <h3 className="text-base font-bold text-white">No products found</h3>
                  <p className="text-xs text-slate-400">Try adjusting your search query, featured filter, or category selection.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setFeaturedOnly(false);
                    }}
                    className="px-4 py-2 bg-slate-800 text-white text-xs font-semibold rounded-xl hover:bg-slate-700"
                  >
                    Reset Filters
                  </button>
                </div>
              )}

              {/* Product Specifications Modal */}
              {selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
                  <div className="bg-[#0d1117] border border-slate-800 rounded-2xl max-w-xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
                    <div className="p-5 border-b border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden flex-shrink-0 flex items-center justify-center">
                          {selectedProduct.mainImage ? (
                            <img src={selectedProduct.mainImage} alt={selectedProduct.name} className="w-full h-full object-cover" />
                          ) : (
                            <Boxes className="w-6 h-6 text-[#e8a020]" />
                          )}
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-[#e8a020] uppercase tracking-wider font-semibold">
                            {selectedProduct.categoryName}
                          </span>
                          <h3 className="text-base font-bold text-white font-['Outfit'] mt-0.5">
                            {selectedProduct.name}
                          </h3>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedProduct(null)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-5 space-y-4 overflow-y-auto">
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase font-mono mb-2">Description</h4>
                        <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                          {selectedProduct.fullDescription || selectedProduct.shortDescription}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase font-mono mb-2">
                          Technical Specifications ({selectedProduct.specifications?.length || 0})
                        </h4>
                        <div className="border border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-800">
                          {selectedProduct.specifications?.map((spec, i) => (
                            <div key={i} className="flex items-center justify-between p-2.5 text-xs bg-slate-900/40">
                              <span className="text-slate-400">{spec.name}</span>
                              <span className="text-white font-semibold font-mono">{spec.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <a
                          href={`/products/${selectedProduct.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-[#e8a020] hover:underline flex items-center gap-1 font-semibold"
                        >
                          <span>Open Public Page</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href="/admin/studio/structure/product"
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-semibold"
                        >
                          <span>Edit in Sanity</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                      <button
                        onClick={() => setSelectedProduct(null)}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: CATEGORIES */}
          {activeTab === 'categories' && (
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-white font-['Outfit']">Product Categories</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Explore the 5 core industrial verticals manufactured by VM Graphite Industries.
                  </p>
                </div>
                <a
                  href="/admin/studio/structure/category"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-[#e8a020] hover:bg-[#d4911c] text-[#07090e] font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md"
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>Edit in Studio</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {MOCK_CATEGORIES.map((category) => {
                  const productCount = MOCK_PRODUCTS.filter(
                    (p) => p.categorySlug === category.slug,
                  ).length;
                  return (
                    <div
                      key={category._id || category.slug}
                      className="bg-[#0d1117] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-md hover:border-slate-700 transition-all flex flex-col justify-between group"
                    >
                      <div className="space-y-3.5">
                        <div className="flex items-start justify-between">
                          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center">
                            {category.image ? (
                              <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                            ) : (
                              <FolderTree className="w-6 h-6 text-[#e8a020]" />
                            )}
                          </div>
                          <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-[#e8a020] font-semibold">
                            {productCount} Products
                          </span>
                        </div>

                        <div>
                          <h3 className="font-bold text-white text-base font-['Outfit'] group-hover:text-[#e8a020] transition-colors">
                            {category.name}
                          </h3>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">{category.description}</p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                        <button
                          onClick={() => {
                            setSelectedCategory(category.slug);
                            setActiveTab('products');
                          }}
                          className="text-slate-400 hover:text-white font-medium flex items-center gap-1"
                        >
                          <span>Filter Products</span>
                          <ChevronRight className="w-3.5 h-3.5 text-[#e8a020]" />
                        </button>
                        <a
                          href={`/products#${category.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#e8a020] hover:underline font-semibold flex items-center gap-1"
                        >
                          <span>View Live</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: RESOURCES & TDS */}
          {activeTab === 'resources' && (
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-white font-['Outfit']">Brochures & Technical Documents</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Downloadable brochures, material safety data sheets, and company certifications.
                  </p>
                </div>
                <a
                  href="/admin/studio/structure/resource"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-[#e8a020] hover:bg-[#d4911c] text-[#07090e] font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md"
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>Upload in Studio</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOCK_RESOURCES.map((res) => (
                  <div
                    key={res._id || res.title}
                    className="bg-[#0d1117] border border-slate-800 rounded-2xl p-5 flex items-start justify-between gap-4 shadow-md hover:border-slate-700 transition-all"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 flex-shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-900 text-[#e8a020] border border-slate-800 font-semibold">
                            {res.category}
                          </span>
                          {res.isFeatured && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300">
                              Featured
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-white text-sm">{res.title}</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">{res.description}</p>
                      </div>
                    </div>

                    <a
                      href={res.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs rounded-lg border border-slate-700 flex items-center gap-1 flex-shrink-0 shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5 text-[#e8a020]" />
                      <span>Download</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CLOUD & DEPLOY */}
          {activeTab === 'deploy' && (
            <div className="max-w-7xl mx-auto space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white font-['Outfit']">Cloud & Deployment Operations</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Static site generator build triggers, Sanity webhooks, and environment status.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Netlify Deploy Trigger Card */}
                <div className="bg-[#0d1117] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400">
                      <Cloud className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">Netlify Edge CDN Deployment</h3>
                      <p className="text-xs text-slate-400">Automated builds upon Sanity document publishing</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Whenever products or technical specs are modified in Sanity, your Sanity Webhook triggers a Netlify build hook to generate instant static pages globally.
                  </p>

                  <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs font-mono space-y-1.5 text-slate-300">
                    <div className="flex items-center justify-between"><strong className="text-white">Build Command:</strong> <span>npm run build</span></div>
                    <div className="flex items-center justify-between"><strong className="text-white">Publish Directory:</strong> <span>dist</span></div>
                    <div className="flex items-center justify-between"><strong className="text-white">Hosting Engine:</strong> <span>Netlify Edge CDN</span></div>
                  </div>

                  <div className="pt-2">
                    <a
                      href="https://app.netlify.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                    >
                      <span>Open Netlify Dashboard</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Sanity Project Credentials Card */}
                <div className="bg-[#0d1117] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#e8a020]/15 text-[#e8a020]">
                      <Database className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">Sanity Cloud Project</h3>
                      <p className="text-xs text-slate-400">Connected production dataset & API</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex items-center justify-between p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="text-slate-400">Project ID</span>
                      <span className="text-[#e8a020] font-bold">{projectId}</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="text-slate-400">Dataset</span>
                      <span className="text-emerald-400 font-bold">{dataset}</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="text-slate-400">API Version</span>
                      <span className="text-white font-bold">2024-08-01</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href={`https://www.sanity.io/manage/project/${projectId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#e8a020] hover:bg-[#d4911c] text-[#07090e] font-bold text-xs rounded-xl shadow-md transition-all"
                    >
                      <span>Sanity Project Settings</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Bottom Quick-Action Bar for Small Screens */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0d1117]/95 backdrop-blur-md border-t border-slate-800 px-3 py-2 flex items-center justify-around">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-lg text-[10px] font-medium transition-all ${
            activeTab === 'overview' ? 'text-[#e8a020]' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Overview</span>
        </button>

        <a
          href="/admin/studio"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 p-1.5 rounded-lg text-[10px] font-medium text-[#e8a020] hover:text-[#d4911c] transition-all"
        >
          <Database className="w-4 h-4" />
          <span>Studio ↗</span>
        </a>

        <button
          onClick={() => setActiveTab('products')}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-lg text-[10px] font-medium transition-all ${
            activeTab === 'products' ? 'text-[#e8a020]' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Boxes className="w-4 h-4" />
          <span>Catalog</span>
        </button>

        <button
          onClick={() => setActiveTab('deploy')}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-lg text-[10px] font-medium transition-all ${
            activeTab === 'deploy' ? 'text-[#e8a020]' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Cloud className="w-4 h-4" />
          <span>Deploy</span>
        </button>
      </nav>
    </div>
  );
}
