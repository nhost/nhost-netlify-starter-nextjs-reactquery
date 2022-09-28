import { useAuthenticationStatus } from '@nhost/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import BaseLayout, { BaseLayoutProps } from './BaseLayout';

export type AuthenticatedLayoutProps = BaseLayoutProps;

export default function AuthenticatedLayout({
  children,
  ...props
}: AuthenticatedLayoutProps) {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuthenticationStatus();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/sign-in');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    return <BaseLayout {...props}>Loading user...</BaseLayout>;
  }

  return <BaseLayout {...props}>{children}</BaseLayout>;
}
