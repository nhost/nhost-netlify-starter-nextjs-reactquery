import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import '@fontsource/inter';
import { NhostNextProvider } from '@nhost/nextjs';
import { nhost } from '@/utils/nhost';
import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/utils/react-query-client';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NhostNextProvider nhost={nhost}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </NhostNextProvider>
  );
}
