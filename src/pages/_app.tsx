import type { AppProps } from 'next/app';

import ErrorBoundary from '@/components/ErrorBoundary';

import '@/styles/index.css';

export default function App({ Component, pageProps }: AppProps) {
  const fallback = <p className="error">Error has occured, reload the page</p>;

  return (
    <ErrorBoundary fallback={fallback}>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
