import '../styles/globals.css';

import ErrorBox from '@/components/Loading/ErrorBox/ErrorBox.component';
import LoadingBar from '@/components/Loading/LoadingBar/LoadingBar.component';
import LoadingStatus from '@/components/Loading/LoadingStatus/LoadingStatus.component';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

import type { AppProps } from 'next/app'

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
      {isPageLoading && <LoadingBar />}
      <LoadingStatus />
      <ErrorBox />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
