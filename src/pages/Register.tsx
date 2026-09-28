import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CourseType, SemesterType } from '../types';
import { BookOpen, CheckCircle2, AlertCircle, Eye, EyeOff, ShieldCheck } from 'lucide-react';

interface RegisterProps {
  navigate: (path: string) => void;
}

const COURSES: CourseType[] = [
  'BCA',
  'BBA',
  'B.Com',
  'B.Sc',
  'B.E / B.Tech',
  'MCA',
  'MBA',
  'M.Com',
  'Other'
];

const SEMESTERS: SemesterType[] = [
  '1st Semester',
  '2nd Semester',
  '3rd Semester',
  '4th Semester',
  '5th Semester',
  '6th Semester',
  '7th Semester',
  '8th Semester'
];

export const Register: React.FC<RegisterProps> = ({ navigate }) => {
  const { register } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [college, setCollege] = useState('');
  const [course, setCourse] = useState<CourseType>('B.E / B.Tech');
  const [semester, setSemester] = useState<SemesterType>('1st Semester');
  const [agreedTerms, setAgreedTerms] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Password strength calculation
  const getPasswordStrength = (pass: string): { label: 'Weak' | 'Medium' | 'Strong'; color: string; width: string } => {
    if (!pass) return { label: 'Weak', color: 'bg-slate-200', width: '0%' };
    if (pass.length < 8) return { label: 'Weak', color: 'bg-red-500', width: '30%' };
    const hasNumbers = /\d/.test(pass);
    const hasSpecial = /[!@#$%^&*]/.test(pass);
    if (pass.length >= 10 && hasNumbers && hasSpecial) {
      return { label: 'Strong', color: 'bg-emerald-500', width: '100%' };
    }
    return { label: 'Medium', color: 'bg-amber-500', width: '65%' };
  };

  const strength = getPasswordStrength(password);

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!fullName.trim()) {
      errs.fullName = 'Please enter your name.';
    }

    if (!email.trim()) {
      errs.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please enter a valid email.';
    }

    if (!password) {
      errs.password = 'Password is required.';
    } else if (password.length < 8) {
      errs.password = 'Password must contain at least 8 characters.';
    }

    if (!confirmPassword) {
      errs.confirmPassword = 'Confirm your password.';
    } else if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    }

    if (!college.trim()) {
      errs.college = 'College/University name is required.';
    }

    if (!agreedTerms) {
      errs.terms = 'You must agree to the Terms and Conditions to join.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    const res = await register({
      full_name: fullName.trim(),
      email: email.trim(),
      password,
      college: college.trim(),
      course,
      semester
    });
    setIsLoading(false);

    if (res.success) {
      navigate('/dashboard');
    } else {
      setErrors({ form: res.error || 'Failed to create account.' });
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#F5F8FC]">
      <div className="max-w-2xl w-full bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-10 space-y-6">
        <div className="text-center space-y-1">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B2A5B] to-[#1557A6] flex items-center justify-center text-white mx-auto mb-2">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#0B2A5B]">
            Create Your StudyHub Account
          </h1>
          <p className="text-xs text-slate-600">
            Join your college learning community.
          </p>
        </div>

        {errors.form && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errors.form}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Aarav Sharma"
              className={`w-full text-xs sm:text-sm p-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:border-[#1557A6] focus:bg-white text-slate-800 ${
                errors.fullName ? 'border-red-400' : 'border-slate-200'
              }`}
            />
            {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              College or Personal Email Address *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. yourname@college.edu"
              className={`w-full text-xs sm:text-sm p-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:border-[#1557A6] focus:bg-white text-slate-800 ${
                errors.email ? 'border-red-400' : 'border-slate-200'
              }`}
            />
            {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
          </div>

          {/* College */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              College / University Name *
            </label>
            <input
              type="text"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              placeholder="e.g. National Institute of Technology"
              className={`w-full text-xs sm:text-sm p-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:border-[#1557A6] focus:bg-white text-slate-800 ${
                errors.college ? 'border-red-400' : 'border-slate-200'
              }`}
            />
            {errors.college && <p className="text-[11px] text-red-600 mt-1">{errors.college}</p>}
          </div>

          {/* Course and Semester */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Degree / Course *
              </label>
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value as CourseType)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#1557A6] focus:bg-white text-slate-800"
              >
                {COURSES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Semester *
              </label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value as SemesterType)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#1557A6] focus:bg-white text-slate-800"
              >
                {SEMESTERS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password (min 8 chars) *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create password"
                  className={`w-full text-xs sm:text-sm p-2.5 pr-8 bg-slate-50 border rounded-lg focus:outline-none focus:border-[#1557A6] focus:bg-white text-slate-800 ${
                    errors.password ? 'border-red-400' : 'border-slate-200'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
              {errors.password && <p className="text-[11px] text-red-600 mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Confirm Password *
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className={`w-full text-xs sm:text-sm p-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:border-[#1557A6] focus:bg-white text-slate-800 ${
                  errors.confirmPassword ? 'border-red-400' : 'border-slate-200'
                }`}
              />
              {errors.confirmPassword && <p className="text-[11px] text-red-600 mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          {/* Password Strength Indicator */}
          {password && (
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[10px] text-slate-500 font-medium">
                <span>Password Strength:</span>
                <span className="font-bold">{strength.label}</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${strength.color} transition-all duration-300`}
                  style={{ width: strength.width }}
                ></div>
              </div>
            </div>
          )}

          {/* Terms Agreement Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded text-[#1557A6] focus:ring-[#1557A6] border-slate-300"
              />
              <span className="text-xs text-slate-600 leading-snug">
                I agree to the <span className="text-[#1557A6] underline">Terms and Conditions</span> and honor the StudyHub Academic Integrity Code.
              </span>
            </label>
            {errors.terms && <p className="text-[11px] text-red-600 mt-1">{errors.terms}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 text-xs sm:text-sm font-bold text-white bg-[#1557A6] hover:bg-[#0B2A5B] disabled:opacity-60 rounded-xl shadow-xs transition-colors mt-2 cursor-pointer active:scale-98"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>

        </form>

        <div className="text-center pt-2 text-xs text-slate-600 border-t border-slate-100">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-[#1557A6] font-bold hover:underline"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
