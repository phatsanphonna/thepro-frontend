import axios from 'axios'

import { useEffect, useLayoutEffect } from 'react'
import type { NextRouter } from 'next/router'

import { useDispatch } from 'react-redux'
import { setLoading } from '@/redux/features/loading.feature'

import { useLocalStorage } from '../storage'
import { clearTimeout } from 'timers'

export const useAuth = (router: NextRouter) => {
  const dispatch = useDispatch()

  const {
    getLocalStorageItem,
    setLocalStorageItem,
    removeLocalStorageItem
  } = useLocalStorage()

  return useLayoutEffect(() => {
    let isSuccess = false

    const fetchOnlineUserData = async () => {

    }

    const fetchOnlineUserDataWithRefreshToken = async () => {

    }

    const blacklistRefreshToken = async () => {

    }

    dispatch(setLoading(true))

    // const accessToken = getStorageItem('accessToken')

    // if (!accessToken) {
    //   const refreshToken = getStorageItem('refreshToken')

    //   if (refreshToken) {

    //   }

    //   removeStorageItem('accessToken')
    //   removeStorageItem('refreshToken')

    // }



    const timeout = setTimeout(() => {
      dispatch(setLoading(false))
      isSuccess = true
    }, 5000)



    return () => {
      if (!isSuccess) {
        window.clearTimeout(timeout)
      }
      dispatch(setLoading(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}