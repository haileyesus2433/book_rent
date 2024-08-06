// app/contexts/UserContext.tsx
'use client'

import defineAbility, { AppAbility, } from '@/utils/defineAbility';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  ability: AppAbility | null;
  setAbility: (ability: AppAbility | null) => void;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [ability, setAbility] = useState<AppAbility | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initializeUser = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        try {
          // Fetch user data using the token
          const response = await fetch('/api/user', {
            headers: {
              'Authorization': `Bearer ${storedToken}`
            }
          });
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            const newAbility = defineAbility(userData);
            setAbility(newAbility);
          } else {
            // Token is invalid, clear it
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Failed to fetch user data', error);
        }
      }
      setLoading(false);
    };

    initializeUser();
  }, []);

  const logout = () => {
    setUser(null);
    setToken(null);
    setAbility(null);
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken, ability, setAbility, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
