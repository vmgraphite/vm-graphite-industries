import React, { useState, useEffect } from "react";
import {
  Lock,
  User,
  KeyRound,
  ShieldAlert,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Sparkles,
} from "lucide-react";

// Default admin credentials (fallback)
const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSCODE = "vmgraphite2025";
const AUTH_STORAGE_KEY = "vmg_admin_auth_token";
const CUSTOM_PASS_KEY = "vmg_admin_custom_pass";
const CUSTOM_USER_KEY = "vmg_admin_custom_user";

interface AdminAuthProps {
  children: (props: {
    logout: () => void;
    adminUser: string;
    onChangePassword: () => void;
  }) => React.ReactNode;
}

export default function AdminAuth({ children }: AdminAuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Check existing session on mount
  useEffect(() => {
    try {
      const sessionToken =
        sessionStorage.getItem(AUTH_STORAGE_KEY) ||
        localStorage.getItem(AUTH_STORAGE_KEY);
      if (sessionToken) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    setTimeout(() => {
      try {
        const storedUser = localStorage.getItem(CUSTOM_USER_KEY) || DEFAULT_USERNAME;
        const storedPass = localStorage.getItem(CUSTOM_PASS_KEY) || DEFAULT_PASSCODE;

        const inputUser = username.trim().toLowerCase();
        const validUsers = [
          storedUser.toLowerCase(),
          DEFAULT_USERNAME,
          "info@vmgraphiteindustries.com",
          "admin@vmgraphite.com",
        ];

        if (
          validUsers.includes(inputUser) &&
          (password === storedPass || password === DEFAULT_PASSCODE)
        ) {
          const token = `vmg_auth_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
          if (rememberMe) {
            localStorage.setItem(AUTH_STORAGE_KEY, token);
          } else {
            sessionStorage.setItem(AUTH_STORAGE_KEY, token);
          }
          setIsAuthenticated(true);
        } else {
          setErrorMessage("Invalid username or password. Please try again.");
        }
      } catch (err) {
        setErrorMessage("An error occurred during authentication.");
      } finally {
        setIsLoading(false);
      }
    }, 400);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // ignore
    }
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
  };

  // Loading check
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#07090e] flex items-center justify-center text-slate-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#f06543] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-mono">Verifying admin session...</p>
        </div>
      </div>
    );
  }

  // Not authenticated -> Show clean, modern Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#07090e] flex flex-col justify-between selection:bg-[#f06543] selection:text-[#07090e] relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-32 w-[600px] h-[350px] bg-gradient-to-b from-[#f06543]/20 via-[#c78210]/10 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[#f06543]/10 blur-3xl pointer-events-none" />

        {/* Top Header */}
        <header className="p-6 flex items-center justify-between relative z-10">
          <a
            href="/"
            className="flex items-center gap-2.5 text-slate-400 hover:text-white transition-colors group text-xs font-medium"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back to Live Website</span>
          </a>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Secure Admin Gateway</span>
          </div>
        </header>

        {/* Login Box */}
        <main className="flex-1 flex items-center justify-center p-4 relative z-10">
          <div className="w-full max-w-md bg-[#0d1117]/90 border border-slate-800 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80 space-y-6">
            {/* Brand Logo & Heading */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f06543] to-[#c78210] p-0.5 shadow-lg shadow-[#f06543]/25 mb-1">
                <div className="w-full h-full bg-[#07090e] rounded-[14px] flex items-center justify-center">
                  <span className="font-extrabold text-xl text-[#f06543] tracking-tighter">
                    VM
                  </span>
                </div>
              </div>
              <h1 className="text-2xl font-black text-white font-['Outfit'] tracking-tight">
                Admin Control Center
              </h1>
              <p className="text-xs text-slate-400">
                VM Graphite Industries LLP • Content & Catalog Management
              </p>
            </div>

            {/* Error message */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2.5 text-red-400 text-xs animate-shake">
                <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                  Username / Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin or your work email"
                    className="w-full bg-[#07090e] border border-slate-700/80 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#f06543] focus:ring-1 focus:ring-[#f06543] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                  Admin Passcode / Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin passcode"
                    className="w-full bg-[#07090e] border border-slate-700/80 rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#f06543] focus:ring-1 focus:ring-[#f06543] transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-300">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-[#f06543] focus:ring-[#f06543] focus:ring-offset-0"
                  />
                  <span>Keep me logged in</span>
                </label>

                <div className="text-[11px] text-slate-500 font-mono">
                  Default: <span className="text-[#f06543]">vmgraphite2025</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-[#f06543] to-[#d4911c] hover:from-[#e55937] hover:to-[#c78210] text-[#07090e] font-extrabold text-sm rounded-xl transition-all shadow-lg shadow-[#f06543]/20 flex items-center justify-center gap-2 disabled:opacity-70 group cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-[#07090e] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In to Admin Panel</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Non-Technical Helper Box */}
            <div className="pt-2 border-t border-slate-800/80">
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/60 text-xs text-slate-400 space-y-1.5">
                <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-[#f06543]" />
                  <span>First time logging in?</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Use username: <strong className="text-white font-mono">admin</strong> and passcode:{" "}
                  <strong className="text-white font-mono">vmgraphite2025</strong>. You can change this password anytime in settings!
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-4 text-center text-xs text-slate-500 font-mono relative z-10">
          © {new Date().getFullYear()} VM Graphite Industries LLP • Admin Portal
        </footer>
      </div>
    );
  }

  // Authenticated -> Render Dashboard & Password Modal
  return (
    <>
      {children({
        logout: handleLogout,
        adminUser: localStorage.getItem(CUSTOM_USER_KEY) || DEFAULT_USERNAME,
        onChangePassword: () => setShowPasswordModal(true),
      })}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
      )}
    </>
  );
}

function ChangePasswordModal({ onClose }: { onClose: () => void }) {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const storedPass =
      localStorage.getItem(CUSTOM_PASS_KEY) || DEFAULT_PASSCODE;

    if (currentPass !== storedPass && currentPass !== DEFAULT_PASSCODE) {
      setError("The current password you entered is incorrect.");
      return;
    }

    if (newPass.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }

    if (newPass !== confirmPass) {
      setError("New passwords do not match.");
      return;
    }

    localStorage.setItem(CUSTOM_PASS_KEY, newPass);
    setSuccess(true);

    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#0d1117] border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold font-['Outfit']">
            <KeyRound className="w-5 h-5 text-[#f06543]" />
            <span>Change Admin Password</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg text-sm"
          >
            ✕
          </button>
        </div>

        {success ? (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <p className="text-sm font-bold text-white">Password Updated Successfully!</p>
            <p className="text-xs text-slate-400">Your new password is now active.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-xs">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Current Password
              </label>
              <input
                type="password"
                required
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                placeholder="Enter current password"
                className="w-full bg-[#07090e] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#f06543]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                New Password
              </label>
              <input
                type="password"
                required
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full bg-[#07090e] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#f06543]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder="Repeat new password"
                className="w-full bg-[#07090e] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#f06543]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#f06543] hover:bg-[#d4911c] text-[#07090e] font-bold text-xs rounded-xl shadow-md"
              >
                Save New Password
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
