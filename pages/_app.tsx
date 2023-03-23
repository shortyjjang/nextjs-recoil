import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from "recoil";
import React from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </QueryClientProvider>
  )
}

export default MyApp
