import type { AppProps } from 'next/app'
import '../styles/globals.css'

import { Provider, useDispatch } from 'react-redux'
import { store } from '../redux/store'

import LoadingStatus from '@/components/LoadingStatus/LoadingStatus.component'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      {/* <LoadingStatus /> */}
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
