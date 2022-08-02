import { Header } from '@/components/Header';
import Layout from '@/components/Layout';
import { data } from '@/data/info';
import { ReactNode } from 'react';

interface IndexContainerProps {
  children?: ReactNode;
}

export const IndexContainer = ({ children }: IndexContainerProps) => {
  return (
    <Layout title={data.pageTitle}>
      <div className="bg-header bg-grid h-full text-white">
        <Header />
        {children ? children : null}
      </div>
    </Layout>
  );
};
