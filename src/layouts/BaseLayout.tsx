import { Header } from '@/components/common/Header';
import Head from 'next/head';
import { DetailedHTMLProps, HTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

export interface BaseLayoutProps
  extends DetailedHTMLProps<HTMLProps<HTMLDivElement>, HTMLDivElement> {
  /**
   * The title of the page
   */
  title?: string;
  /**
   * Props passed to the main container.
   */
  mainContainerProps?: DetailedHTMLProps<
    HTMLProps<HTMLDivElement>,
    HTMLDivElement
  >;
}

export default function BaseLayout({
  title,
  children,
  mainContainerProps,
}: BaseLayoutProps) {
  return (
    <div className="min-h-screen bg-grid bg-header">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="text-white bg-header bg-grid">
        <Header />

        <main
          {...mainContainerProps}
          className={twMerge(
            'max-w-5xl p-4 mx-auto',
            mainContainerProps?.className,
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
