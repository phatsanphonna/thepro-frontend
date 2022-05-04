import { setAuthStatus } from '@/redux/features/userAuth.feature';
import { useRouter } from 'next/router';
import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { httpGet } from '../http';

import { useLocalStorage } from '../storage';


const RouteGuard: React.FC = ({ children }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { getLocalStorageItem } = useLocalStorage()

  const userAuth = useSelector((state: any) => state.userAuth)

  const hideContent = () => dispatch(setAuthStatus(false))

  const authCheck = (url: string) => {
    const routeGuardPath = ['/dashboard', '/me', '/course/watch']

    const path = url.split('?')[0]

    const accessToken = getLocalStorageItem('accessToken')

    if (accessToken) {
      if (path === '/signin') {
        return router.push('/dashboard')
      }

      if (routeGuardPath.includes(path)) {
        dispatch(setAuthStatus(true))
      }
    } else {
      hideContent()
      router.push('/signin')
    }
  }

  useLayoutEffect(() => {
    // run auth check on initital load
    authCheck(router.asPath)

    // on route change start, hide content first
    router.events.on('routeChangeStart', hideContent)

    // on route change complete, run auth check
    router.events.on('routeChangeComplete', authCheck)

    return () => {
      router.events.off('routeChangeStart', hideContent)
      router.events.off('routeChangeComplete', authCheck)
    }
  }, [])

  return (userAuth.isAuthenticated && children)
}

export const SignInRouteGuard: React.FC = ({ children }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { getLocalStorageItem } = useLocalStorage()

  const userAuth = useSelector((state: any) => state.userAuth)

  const hideContent = () => dispatch(setAuthStatus(true))
  const showContent = () => dispatch(setAuthStatus(false))

  const authCheck = () => {
    const accessToken = getLocalStorageItem('accessToken')

    if (accessToken) {
      hideContent()
      router.push('/dashboard')
    } else {
      showContent()
      router.push('/signin')
    }
  }

  useLayoutEffect(() => {
    hideContent()

    // run auth check on initital load
    authCheck()
  }, [])

  return (
    <>
      {!userAuth.isAuthenticated && children}
    </>
  )
}


export const refreshAccessToken = async () => {
  const accessToken = getAccessToken()
  const refreshToken = getRefreshToken()

  const response = await httpGet('/auth/token', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'refresh_token': refreshToken as string
    }
  })

  console.log(response.data.code);

  if (response.data.code === 511 || response.data.code === 508) {
    removeLocalUserCredential()
    return document.location.reload()
  }

  setLocalUserCredential(
    response.data.data.accessToken,
    response.data.data.userAuth
  )

  document.location.reload()
}

export const setLocalUserCredential = (
  accessToken: string,
  localUserAuth: { id: string, email: string }
) => {
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('localUserAuth', JSON.stringify(localUserAuth))
}

export const removeLocalUserCredential = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('localUserAuth')
}

export const getAccessToken = () => (
  localStorage.getItem('accessToken')
)

export const getRefreshToken = () => (
  localStorage.getItem('refreshToken')
)

export default RouteGuard