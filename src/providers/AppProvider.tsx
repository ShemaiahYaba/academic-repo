import { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/AuthProvider';
import { UIProvider } from '@/contexts/UIContext';
import { ErrorProvider } from '@/contexts/ErrorContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { DataProvider } from '@/contexts/DataContext';

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ErrorProvider>
      <NotificationProvider>
        <UIProvider>
          <DataProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </DataProvider>
        </UIProvider>
      </NotificationProvider>
    </ErrorProvider>
  );
}; 