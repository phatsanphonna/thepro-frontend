import { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import '../styles/globals.css'

import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import { store } from '../redux/store'

import LoadingBar from '@/components/Loading/LoadingBar/LoadingBar.component'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const [isPageLoading, setIsPageLoading] = useState(false)

  useEffect(() => {
    router.events.on("routeChangeError", (e) => {
      console.log(1);
      
      setIsPageLoading(true)});
    router.events.on("routeChangeStart", (e) => {
      console.log(2);
      setIsPageLoading(true)});
    router.events.on("routeChangeComplete", (e) => {
      console.log(3);
      setIsPageLoading(false)});

    return () => {
      router.events.off("routeChangeError", (e) => setIsPageLoading(true));
      router.events.off("routeChangeStart", (e) => setIsPageLoading(true));
      router.events.off("routeChangeComplete", (e) => setIsPageLoading(false));
    };
  }, [router.events]);

  return (
    <Provider store={store}>
      {isPageLoading && <LoadingBar />}
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
