import React, { useState } from 'react';
import { BookOpen, ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';

interface ForgotPasswordProps {
  navigate: (path: string) => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid registered email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#F5F8FC]">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-md p-8 space-y-6">
        <div>
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#1557A6] mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Login</span>
          </button>

          <div className="w-10 h-10 rounded-xl bg-[#EAF4FF] text-[#1557A6] flex items-center justify-center mb-3">
            <Mail className="w-5 h-5" />
          </div>

          <h1 className="text-xl font-extrabold text-[#0B2A5B]">
            Reset Your Password
          </h1>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Enter your registered email address and we'll send you a password reset link.
          </p>
        </div>

        {submitted ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-center">
            <CheckCircle2 className="w-8 h-8 text-[#1E9E62] mx-auto" />
            <h4 className="text-xs font-bold text-slate-900">
              Reset Link Dispatched
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Password reset instructions have been sent to <strong>{email}</strong>. Please check your inbox or college email portal.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="mt-3 px-4 py-2 text-xs font-bold text-white bg-[#1557A6] rounded-lg"
            >
              Return to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Registered Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. student@college.edu"
                className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#1557A6] text-slate-800"
              />
              {error && <p className="text-[11px] text-red-600 mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 text-xs sm:text-sm font-bold text-white bg-[#1557A6] hover:bg-[#0B2A5B] rounded-xl shadow-xs transition-colors"
            >
              Send Reset Link
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
