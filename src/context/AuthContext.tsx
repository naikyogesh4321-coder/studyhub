import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, CourseType, SemesterType } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { INITIAL_USERS } from '../lib/mockData';

interface RegisterData {
  full_name: string;
  email: string;
  password?: string;
  college: string;
  course: CourseType;
  semester: SemesterType;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  switchUser: (userId: string) => void;
  allUsers: UserProfile[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY_USER = 'studyhub_current_user';
const STORAGE_KEY_ALL_USERS = 'studyhub_all_users';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [allUsers, setAllUsers] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ALL_USERS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_USERS;
      }
    }
    return INITIAL_USERS;
  });
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Auth state
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      if (isSupabaseConfigured && supabase) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (profile) {
              setUser(profile as UserProfile);
              setIsLoading(false);
              return;
            }
          }
        } catch {
          // Supabase session fetch failed, fallback to local storage
        }
      }

      // Local storage fallback
      const savedUser = localStorage.getItem(STORAGE_KEY_USER);
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          setUser(allUsers[0]);
        }
      } else {
        // Default to first user (Aarav) so the student can immediately interact
        setUser(allUsers[0]);
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(allUsers[0]));
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    if (isSupabaseConfigured && supabase && password) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          setIsLoading(false);
          return { success: false, error: 'Invalid email or password.' };
        }
        if (data.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

          if (profile) {
            setUser(profile as UserProfile);
            localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(profile));
            setIsLoading(false);
            return { success: true };
          }
        }
      } catch {
        // Continue to fallback
      }
    }

    // Local authentication check
    const matched = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (matched) {
      setUser(matched);
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(matched));
      setIsLoading(false);
      return { success: true };
    }

    setIsLoading(false);
    return { success: false, error: 'Invalid email or password.' };
  };

  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    if (isSupabaseConfigured && supabase && data.password) {
      try {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            data: {
              full_name: data.full_name,
              college: data.college,
              course: data.course,
              semester: data.semester
            }
          }
        });

        if (authError) {
          setIsLoading(false);
          return { success: false, error: authError.message };
        }

        if (authData.user) {
          const newProfile: UserProfile = {
            id: authData.user.id,
            email: data.email,
            full_name: data.full_name,
            college: data.college,
            course: data.course,
            semester: data.semester,
            role: 'student',
            created_at: new Date().toISOString()
          };

          await supabase.from('profiles').insert(newProfile);
          setUser(newProfile);
          localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newProfile));
          setIsLoading(false);
          return { success: true };
        }
      } catch {
        // Continue to fallback
      }
    }

    // Local registration
    const existing = allUsers.find(u => u.email.toLowerCase() === data.email.toLowerCase());
    if (existing) {
      setIsLoading(false);
      return { success: false, error: 'An account with this email already exists.' };
    }

    const newProfile: UserProfile = {
      id: `user-${Date.now()}`,
      email: data.email,
      full_name: data.full_name,
      college: data.college,
      course: data.course,
      semester: data.semester,
      bio: `Student at ${data.college} pursuing ${data.course}.`,
      role: 'student',
      avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.full_name)}&backgroundColor=1557a6`,
      created_at: new Date().toISOString()
    };

    const updatedUsers = [...allUsers, newProfile];
    setAllUsers(updatedUsers);
    setUser(newProfile);
    localStorage.setItem(STORAGE_KEY_ALL_USERS, JSON.stringify(updatedUsers));
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newProfile));

    setIsLoading(false);
    return { success: true };
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch {
        // Local signOut
      }
    }
    setUser(null);
    localStorage.removeItem(STORAGE_KEY_USER);
  };

  const updateProfile = async (updates: Partial<UserProfile>): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'Not authenticated' };

    const updatedUser: UserProfile = { ...user, ...updates };

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('profiles').update(updates).eq('id', user.id);
      } catch {
        // ignore
      }
    }

    setUser(updatedUser);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updatedUser));

    const updatedAll = allUsers.map(u => (u.id === user.id ? updatedUser : u));
    setAllUsers(updatedAll);
    localStorage.setItem(STORAGE_KEY_ALL_USERS, JSON.stringify(updatedAll));

    return { success: true };
  };

  const switchUser = (userId: string) => {
    const selected = allUsers.find(u => u.id === userId);
    if (selected) {
      setUser(selected);
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(selected));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        switchUser,
        allUsers
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
