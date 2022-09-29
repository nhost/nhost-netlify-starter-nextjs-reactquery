import { Loader } from '@/components/common/Loader';
import { useAuthenticationStatus } from '@nhost/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import BaseLayout, { BaseLayoutProps } from './BaseLayout';

export type UnauthenticatedLayoutProps = BaseLayoutProps;

export default function UnauthenticatedLayout({
  children,
  ...props
}: UnauthenticatedLayoutProps) {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuthenticationStatus();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || isAuthenticated) {
    return (
      <BaseLayout {...props}>
        <p className="grid justify-start grid-flow-col gap-1">
          <Loader /> Loading user...
        </p>
      </BaseLayout>
    );
  }

  return <BaseLayout {...props}>{children}</BaseLayout>;
}
