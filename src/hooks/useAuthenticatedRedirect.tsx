import { useAuthenticationStatus } from '@nhost/nextjs';
import router from 'next/router';
import { useEffect } from 'react';

export const useAuthenticatedRedirect = () => {
  const { isAuthenticated, isLoading } = useAuthenticationStatus();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading]);
};
