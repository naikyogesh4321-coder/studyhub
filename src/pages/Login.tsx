import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import studyHubLogo from '../assets/images/studyhub_circular_logo_1790574012647.jpg';
import {
  Eye,
  EyeOff,
  CheckCircle2,
  FileText,
  HelpCircle,
  ArrowRight,
  AlertCircle,
  Loader2
} from 'lucide-react';


interface LoginProps {
  navigate: (path: string) => void;
}

export const Login: React.FC<LoginProps> = ({ navigate }) => {
  const { login, switchUser, allUsers } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    const res = await login(email, password);
    setIsLoading(false);

    if (res.success) {
      navigate('/dashboard');
    } else {
      setErrorMessage(res.error || 'Invalid email or password.');
    }
  };

  const handleQuickDemoLogin = (userId: string) => {
    switchUser(userId);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#F5F8FC]">
      <div className="max-w-4xl w-full bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* =========================================================================
            LEFT COLUMN: Blue Educational Visual Section
            ========================================================================= */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#0B2A5B] to-[#1557A6] p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-2.5">
              <img
                src={studyHubLogo}
                alt="StudyHub – Empowering Education Worldwide"
                className="w-10 h-10 rounded-full object-contain bg-white p-0.5 shadow-sm"
              />
              <span className="text-xl font-bold tracking-tight text-white">
                Study<span className="text-[#18B7C9]">Hub</span>
              </span>
            </div>


            <div className="space-y-3 pt-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                Learn Together.<br />
                Share Knowledge.<br />
                <span className="text-[#18B7C9]">Solve Doubts.</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                Access study materials, ask questions, and learn from your peers in one simple platform.
              </p>
            </div>

            {/* Educational Icons Checklist */}
            <div className="space-y-2.5 pt-4 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#18B7C9] shrink-0" />
                <span>Verified student lecture notes & PDFs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#18B7C9] shrink-0" />
                <span>Peer discussions with accepted solutions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#18B7C9] shrink-0" />
                <span>Free academic community exchange</span>
              </div>
            </div>
          </div>

          <div className="pt-8 relative z-10 text-[11px] text-sky-200/80">
            © 2026 StudyHub Academic Portal
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: Login Form
            ========================================================================= */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-[#0B2A5B]">
                Welcome Back
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Sign in to continue to StudyHub.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. aarav.sharma@college.edu"
                  className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#1557A6] focus:bg-white text-slate-900"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => navigate('/forgot-password')}
                    className="text-[11px] text-[#1557A6] hover:underline font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full text-xs sm:text-sm p-3 pr-10 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#1557A6] focus:bg-white text-slate-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#1557A6] focus:ring-[#1557A6] border-slate-300"
                />
                <label htmlFor="remember-me" className="ml-2 text-xs text-slate-600">
                  Remember me
                </label>
              </div>

              {/* Primary Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 text-xs sm:text-sm font-bold text-white bg-[#1557A6] hover:bg-[#0B2A5B] disabled:opacity-60 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Sign In to StudyHub</span>
                )}
              </button>

              {/* Google Sign-in Alternative */}
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('user-1')}
                className="w-full py-2.5 px-3 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google Student Account</span>
              </button>
            </form>


            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-4 text-[11px] text-slate-400 font-medium">── or ──</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* Quick Demo Student Login Helpers */}
            <div className="space-y-2">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">
                Quick 1-Click Demo Login
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('user-1')}
                  className="p-2 border border-slate-200 hover:border-[#1557A6] hover:bg-[#EAF4FF]/40 rounded-lg text-left text-xs transition-colors"
                >
                  <p className="font-bold text-slate-900 truncate">Aarav (Student)</p>
                  <p className="text-[10px] text-slate-500 truncate">B.Tech · 6th Sem</p>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('admin-1')}
                  className="p-2 border border-slate-200 hover:border-purple-600 hover:bg-purple-50/40 rounded-lg text-left text-xs transition-colors"
                >
                  <p className="font-bold text-purple-900 truncate">Prof. Sen (Admin)</p>
                  <p className="text-[10px] text-slate-500 truncate">Academic Moderator</p>
                </button>
              </div>
            </div>

            {/* Bottom Register CTA */}
            <div className="text-center pt-2 text-xs text-slate-600">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-[#1557A6] font-bold hover:underline"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
