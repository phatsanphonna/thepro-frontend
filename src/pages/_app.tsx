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
import Script from 'next/script';

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
    <>
      <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />

      <Script strategy="lazyOnload" id="google-analytics">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
        page_path: window.location.pathname,
        });
    `}
      </Script>
      
      <Provider store={store}>
        <NextNProgress color="#FFCD64" showOnShallow={true} height={3} />

        <LoadingStatus />
        <ErrorBox />
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
