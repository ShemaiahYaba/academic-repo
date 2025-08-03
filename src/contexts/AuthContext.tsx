import { createContext, useContext } from 'react';
// import type { User, Session } from '@supabase/supabase-js';
// import { supabase } from '@/lib/supabase';
import type { AuthContextType } from '@/types/global';
// import { parseSupabaseError, logError } from '@/utils/errorHandler';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext };
