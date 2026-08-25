import React, { Component, type ReactNode } from "react";
import { Studio } from "sanity";
import config from "../../../sanity.config";
import AdminAuth from "./AdminAuth";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class StudioErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Sanity Studio Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#07090e] text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-[#0d1117] border border-white/10 rounded-2xl p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-white">Studio Session Refresh Needed</h2>
            <p className="text-xs text-slate-400">
              {this.state.error?.message || "A chunk or session synchronization error occurred."}
            </p>
            <button
              onClick={() => {
                sessionStorage.clear();
                window.location.reload();
              }}
              className="px-5 py-2.5 bg-[#f06543] hover:bg-[#d4911c] text-[#07090e] font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
            >
              Reload Sanity Studio
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function SanityStudioEmbed() {
  return (
    <StudioErrorBoundary>
      <AdminAuth>
        {() => (
          <div
            style={{
              height: "100vh",
              width: "100vw",
              margin: 0,
              padding: 0,
              overflow: "hidden",
            }}
          >
            <Studio config={config} />
          </div>
        )}
      </AdminAuth>
    </StudioErrorBoundary>
  );
}
