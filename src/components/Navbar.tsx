import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Bell,
  User,
  LogOut,
  Upload,
  HelpCircle,
  Bookmark,
  Shield,
  Menu,
  X,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import studyHubLogo from '../assets/images/studyhub_circular_logo_1790574012647.jpg';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate }) => {
  const { user, isAuthenticated, logout, allUsers, switchUser } = useAuth();
  const { unreadNotifsCount, notifications, markAllNotificationsAsRead, searchQuery, setSearchQuery } = useData();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Study Materials', path: '/materials' },
    { name: 'Doubt Board', path: '/doubts' },
    { name: 'Community', path: '/community' }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/materials?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
    setNotifDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNavClick('/')}
              className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1557A6] rounded-lg transition-transform active:scale-98"
            >
              <img
                src={studyHubLogo}
                alt="StudyHub – Empowering Education Worldwide"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-contain shrink-0 shadow-2xs group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-[#0B2A5B] leading-none">
                  Study<span className="text-[#1557A6]">Hub</span>
                </span>
                <span className="text-[10px] font-semibold text-[#6B7280] tracking-wider uppercase mt-0.5">
                  Empowering Education Worldwide
                </span>
              </div>
            </button>

            {/* Zone 2: Navigation Links (Desktop) */}

            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map(link => {
                const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
                return (
                  <button
                    key={link.path}
                    onClick={() => handleNavClick(link.path)}
                    className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? 'text-[#1557A6] bg-[#EAF4FF] border border-blue-200/60 shadow-2xs'
                        : 'text-[#6B7280] hover:text-[#0B2A5B] hover:bg-slate-100/80'
                    }`}
                  >
                    {link.name}
                  </button>
                );
              })}
            </nav>
          </div>


          {/* Zone 3: Actions & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Button / Input */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search materials, doubts..."
                    autoFocus
                    className="w-48 sm:w-64 pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#1557A6] focus:ring-1 focus:ring-[#1557A6]"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-2.5 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="ml-1.5 p-1 text-slate-400 hover:text-slate-600 rounded-md"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  aria-label="Search"
                  className="p-2 text-slate-600 hover:text-[#1557A6] hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {isAuthenticated && (
              <>
                {/* Ask Doubt CTA Button */}
                <button
                  onClick={() => handleNavClick('/ask-doubt')}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#1557A6] bg-[#EAF4FF] hover:bg-blue-100 rounded-lg transition-colors whitespace-nowrap"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Ask Doubt</span>
                </button>

                {/* Upload Material CTA Button */}
                <button
                  onClick={() => handleNavClick('/upload')}
                  className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-[#1557A6] hover:bg-[#0B2A5B] rounded-lg shadow-sm transition-colors whitespace-nowrap"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Notes</span>
                </button>

                {/* Notifications Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setNotifDropdownOpen(!notifDropdownOpen);
                      setProfileDropdownOpen(false);
                    }}
                    aria-label="Notifications"
                    className="p-2 text-slate-600 hover:text-[#1557A6] hover:bg-slate-100 rounded-lg relative transition-colors"
                  >
                    <Bell className="w-4 h-4" />
                    {unreadNotifsCount > 0 && (
                      <span className="absolute top-1 right-1 w-4 h-4 bg-[#D64545] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {unreadNotifsCount}
                      </span>
                    )}
                  </button>

                  {notifDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                        <span className="font-semibold text-sm text-slate-900">Notifications</span>
                        {unreadNotifsCount > 0 && (
                          <button
                            onClick={markAllNotificationsAsRead}
                            className="text-xs text-[#1557A6] hover:underline font-medium"
                          >
                            Mark all as read
                          </button>
                        )}
                      </div>
                      <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                        {notifications.length === 0 ? (
                          <div className="p-4 text-center text-xs text-slate-500">
                            No notifications yet
                          </div>
                        ) : (
                          notifications.slice(0, 5).map(n => (
                            <div
                              key={n.id}
                              onClick={() => {
                                handleNavClick(n.link);
                              }}
                              className={`p-3 text-xs cursor-pointer hover:bg-slate-50 transition-colors ${
                                !n.is_read ? 'bg-[#EAF4FF]/40' : ''
                              }`}
                            >
                              <p className="font-medium text-slate-900 mb-0.5">{n.title}</p>
                              <p className="text-slate-600 line-clamp-2 leading-relaxed">{n.message}</p>
                              <p className="text-[10px] text-slate-400 mt-1">
                                {new Date(n.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                      <div className="px-4 py-2 border-t border-slate-100 text-center">
                        <button
                          onClick={() => handleNavClick('/notifications')}
                          className="text-xs text-[#1557A6] font-medium hover:underline"
                        >
                          View all notifications
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Quick Demo Switcher helper */}
            <div className="relative hidden xl:block">
              <button
                onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
                className="px-2.5 py-1 text-[11px] font-medium text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                title="Switch test user account"
              >
                Switch User
              </button>

              {roleSwitcherOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 p-2 z-50">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                    Demo Accounts
                  </div>
                  {allUsers.map(u => (
                    <button
                      key={u.id}
                      onClick={() => {
                        switchUser(u.id);
                        setRoleSwitcherOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded-lg text-left transition-colors ${
                        user?.id === u.id ? 'bg-[#EAF4FF] text-[#1557A6] font-semibold' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="w-5 h-5 rounded-full overflow-hidden bg-slate-200 shrink-0">
                        {u.avatar_url && <img src={u.avatar_url} alt={u.full_name} className="w-full h-full object-cover" />}
                      </div>
                      <div className="truncate">
                        <div className="truncate">{u.full_name}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{u.role === 'admin' ? 'Admin' : u.course}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Profile Dropdown or Auth CTA */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(!profileDropdownOpen);
                    setNotifDropdownOpen(false);
                  }}
                  className="flex items-center gap-2 p-1 pl-2 text-slate-700 hover:text-[#0B2A5B] rounded-lg transition-colors border border-transparent hover:border-slate-200"
                >
                  <span className="hidden md:inline text-xs font-semibold max-w-[100px] truncate">
                    {user.full_name.split(' ')[0]}
                  </span>
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-[#1557A6] text-white flex items-center justify-center font-bold text-xs ring-2 ring-white">
                    {user.avatar_url ? (
                      <img src={user.avatar_url} alt={user.full_name} className="w-full h-full object-cover" />
                    ) : (
                      user.full_name.charAt(0)
                    )}
                  </div>
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">{user.full_name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      <p className="text-[10px] text-[#1557A6] font-medium mt-0.5">{user.college}</p>
                    </div>

                    <button
                      onClick={() => handleNavClick('/dashboard')}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-[#EAF4FF] hover:text-[#1557A6] flex items-center gap-2.5 transition-colors"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Student Dashboard</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('/profile')}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-[#EAF4FF] hover:text-[#1557A6] flex items-center gap-2.5 transition-colors"
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>My Profile</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('/saved')}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-[#EAF4FF] hover:text-[#1557A6] flex items-center gap-2.5 transition-colors"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Saved Resources</span>
                    </button>

                    {user.role === 'admin' && (
                      <button
                        onClick={() => handleNavClick('/admin')}
                        className="w-full text-left px-4 py-2 text-xs text-purple-700 hover:bg-purple-50 flex items-center gap-2.5 transition-colors font-medium"
                      >
                        <Shield className="w-3.5 h-3.5 text-purple-600" />
                        <span>Admin Console</span>
                      </button>
                    )}

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={() => {
                        logout();
                        handleNavClick('/');
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-[#D64545] hover:bg-red-50 flex items-center gap-2.5 transition-colors font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavClick('/login')}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-[#1557A6] rounded-lg transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => handleNavClick('/register')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#1557A6] hover:bg-[#0B2A5B] rounded-lg shadow-sm transition-colors whitespace-nowrap"
                >
                  Create Account
                </button>
              </div>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-100 space-y-1">
            {navLinks.map(link => (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg font-medium ${
                  currentPath === link.path
                    ? 'text-[#1557A6] bg-[#EAF4FF] font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </button>
            ))}

            {isAuthenticated ? (
              <div className="pt-2 border-t border-slate-100 space-y-1">
                <button
                  onClick={() => handleNavClick('/dashboard')}
                  className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-[#1557A6]" />
                  <span>Student Dashboard</span>
                </button>
                <button
                  onClick={() => handleNavClick('/upload')}
                  className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2"
                >
                  <Upload className="w-4 h-4 text-[#1557A6]" />
                  <span>Upload Study Material</span>
                </button>
                <button
                  onClick={() => handleNavClick('/ask-doubt')}
                  className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2"
                >
                  <HelpCircle className="w-4 h-4 text-[#1557A6]" />
                  <span>Ask a Doubt</span>
                </button>
                <button
                  onClick={() => handleNavClick('/saved')}
                  className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2"
                >
                  <Bookmark className="w-4 h-4 text-[#1557A6]" />
                  <span>Saved Items</span>
                </button>
                <button
                  onClick={() => handleNavClick('/profile')}
                  className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2"
                >
                  <User className="w-4 h-4 text-[#1557A6]" />
                  <span>My Profile</span>
                </button>
                <button
                  onClick={() => {
                    logout();
                    handleNavClick('/');
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-[#D64545] hover:bg-red-50 rounded-lg flex items-center gap-2 font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            ) : (
              <div className="pt-2 border-t border-slate-100 flex flex-col gap-2 px-2">
                <button
                  onClick={() => handleNavClick('/login')}
                  className="w-full py-2 text-center text-sm font-semibold text-[#1557A6] bg-[#EAF4FF] rounded-lg"
                >
                  Log In
                </button>
                <button
                  onClick={() => handleNavClick('/register')}
                  className="w-full py-2 text-center text-sm font-semibold text-white bg-[#1557A6] rounded-lg"
                >
                  Create Account
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
