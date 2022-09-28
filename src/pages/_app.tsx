import '@/styles/globals.css';
import { nhost } from '@/utils/nhost';
import { queryClient } from '@/utils/react-query-client';
import '@fontsource/inter';
import { NhostNextProvider } from '@nhost/nextjs';
import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement } from 'react';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactElement;
};
export interface MyAppProps extends AppProps {
  /**
   * Page component
   */
  Component: NextPageWithLayout;
}

export default function MyApp({ Component, pageProps }: MyAppProps) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

  return (
    <NhostNextProvider nhost={nhost}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          {getLayout(<Component {...pageProps} />)}
        </Hydrate>
      </QueryClientProvider>
    </NhostNextProvider>
  );
}
