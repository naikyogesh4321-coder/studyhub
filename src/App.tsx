import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { Home } from './pages/Home';
import { Materials } from './pages/Materials';
import { MaterialDetails } from './pages/MaterialDetails';
import { Doubts } from './pages/Doubts';
import { DoubtDetails } from './pages/DoubtDetails';
import { AskDoubt } from './pages/AskDoubt';
import { UploadMaterial } from './pages/UploadMaterial';
import { Dashboard } from './pages/Dashboard';
import { Saved } from './pages/Saved';
import { Profile } from './pages/Profile';
import { Notifications } from './pages/Notifications';
import { Community } from './pages/Community';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { Admin } from './pages/Admin';

const MainApp: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  // Handle browser back and forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper route matcher
  const renderCurrentPage = () => {
    if (isLoading) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-3 border-[#1557A6] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs text-slate-500 font-medium">Loading StudyHub...</p>
          </div>
        </div>
      );
    }

    // Exact paths
    if (currentPath === '/' || currentPath === '') {
      return <Home navigate={navigate} />;
    }

    if (currentPath === '/login') {
      return <Login navigate={navigate} />;
    }

    if (currentPath === '/register') {
      return <Register navigate={navigate} />;
    }

    if (currentPath === '/forgot-password') {
      return <ForgotPassword navigate={navigate} />;
    }

    if (currentPath === '/community') {
      return <Community navigate={navigate} />;
    }

    if (currentPath.startsWith('/materials')) {
      const parts = currentPath.split('/');
      if (parts.length > 2 && parts[2]) {
        return <MaterialDetails materialId={parts[2]} navigate={navigate} />;
      }
      return <Materials navigate={navigate} />;
    }

    if (currentPath.startsWith('/doubts')) {
      const parts = currentPath.split('/');
      if (parts.length > 2 && parts[2]) {
        return <DoubtDetails doubtId={parts[2]} navigate={navigate} />;
      }
      return <Doubts navigate={navigate} />;
    }

    // Protected Routes
    if (!isAuthenticated) {
      if (
        currentPath === '/dashboard' ||
        currentPath === '/upload' ||
        currentPath === '/ask-doubt' ||
        currentPath === '/saved' ||
        currentPath === '/profile' ||
        currentPath === '/notifications' ||
        currentPath === '/my-materials' ||
        currentPath === '/my-doubts' ||
        currentPath === '/my-answers' ||
        currentPath === '/admin'
      ) {
        return <Login navigate={navigate} />;
      }
    }

    if (currentPath === '/dashboard') {
      return <Dashboard navigate={navigate} />;
    }

    if (currentPath === '/upload') {
      return <UploadMaterial navigate={navigate} />;
    }

    if (currentPath === '/ask-doubt') {
      return <AskDoubt navigate={navigate} />;
    }

    if (currentPath === '/saved') {
      return <Saved navigate={navigate} />;
    }

    if (currentPath === '/my-materials') {
      return <Profile navigate={navigate} initialTab="materials" />;
    }

    if (currentPath === '/my-doubts') {
      return <Profile navigate={navigate} initialTab="doubts" />;
    }

    if (currentPath === '/my-answers') {
      return <Profile navigate={navigate} initialTab="answers" />;
    }

    if (currentPath === '/profile') {
      return <Profile navigate={navigate} />;
    }

    if (currentPath === '/notifications') {
      return <Notifications navigate={navigate} />;
    }

    if (currentPath === '/admin') {
      return <Admin navigate={navigate} />;
    }

    // Fallback 404
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Page Not Found</h2>
        <p className="text-xs text-slate-500">The page you were looking for does not exist.</p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#1557A6] rounded-lg"
        >
          Go Back Home
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8FC] text-[#172033]">
      <Navbar currentPath={currentPath} navigate={navigate} />
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <ToastProvider>
          <MainApp />
        </ToastProvider>
      </DataProvider>
    </AuthProvider>
  );
}

