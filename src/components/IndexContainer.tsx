import { Header } from '@/components/Header';
import { ReactNode } from 'react';

interface IndexContainerProps {
  children?: ReactNode;
}

export const IndexContainer = ({ children }: IndexContainerProps) => {
  return (
    <div className="bg-header bg-grid h-full text-white">
      <Header />

      {children ? children : null}
    </div>
  );
};
