import ErrorBox from '@/components/Loading/ErrorBox/ErrorBox.component';
import LoadingBar from '@/components/Loading/LoadingBar/LoadingBar.component';
import LoadingStatus from '@/components/Loading/LoadingStatus/LoadingStatus.component';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import '@/styles/globals.css';
import NextNProgress from 'nextjs-progressbar'
import Analytics from '@vercel/analytics/react'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  const [isPageLoading, setIsPageLoading] = useState(false)

  useEffect(() => {
    router.events.on("routeChangeError", () => setIsPageLoading(true));
    router.events.on("routeChangeStart", () => setIsPageLoading(true));
    router.events.on("routeChangeComplete", () => setIsPageLoading(false));

    return () => {
      router.events.off("routeChangeError", () => setIsPageLoading(true));
      router.events.off("routeChangeStart", () => setIsPageLoading(true));
      router.events.off("routeChangeComplete", () => setIsPageLoading(false));
    };
  }, [router.events]);

  return (
    <Provider store={store}>
      <NextNProgress color="#FFCD64" showOnShallow={true} height={3} />

      <LoadingStatus />
      <ErrorBox />
      <Component {...pageProps} />
      <Analytics />
    </Provider>
  )
}

export default MyApp
