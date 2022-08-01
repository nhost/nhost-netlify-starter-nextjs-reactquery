import { Header } from '@/components/Header';
import Layout from '@/components/Layout';
import { ReactNode } from 'react';

interface IndexContainerProps {
  children?: ReactNode;
}

export const IndexContainer = ({ children }: IndexContainerProps) => {
  return (
    <Layout title="Nhost NextJS React Query Starter Example">
      <div className="bg-header bg-grid h-full text-white">
        <Header />
        {children ? children : null}
      </div>
    </Layout>
  );
};
