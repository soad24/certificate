import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student' | 'event_supervisor' | 'hall_supervisor' | 'activity_head' | 'external';
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    // Demo login logic
    if (email === 'admin@example.com' && password === 'admin123') {
      const adminUser: User = {
        id: '1',
        name: 'Admin User',
        email: email,
        role: 'admin'
      };
      setUser(adminUser);
      setIsAuthenticated(true);
      navigate('/dashboard');
    } else if (email === 'student@example.com' && password === 'student123') {
      const studentUser: User = {
        id: '2',
        name: 'سعاد الخاطري',
        email: email,
        role: 'student'
      };
      setUser(studentUser);
      setIsAuthenticated(true);
      navigate('/student');
    } else if (email === 'visitor@example.com' && password === 'visitor123') {
      const visitorUser: User = {
        id: '3',
        name: 'سعود الصبحي',
        email: email,
        role: 'external'
      };
      setUser(visitorUser);
      setIsAuthenticated(true);
      navigate('/visitor');
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    navigate('/index');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}