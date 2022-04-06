import axios from 'axios'

import { useEffect } from 'react'
import type { NextRouter } from 'next/router'

import { useDispatch } from 'react-redux'
import { setLoading } from '@/redux/features/loading.feature'

import { useStorage } from '../storage/storage.lib'

export const useAuth = (router: NextRouter) => {
  const dispatch = useDispatch()

  const {
    getStorageItem,
    setStorageItem,
    removeStorageItem
  } = useStorage()

  return useEffect(() => {
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

    //   router.push('/signin')
    // }



    setTimeout(() => dispatch(setLoading(false)), 5000)

    return () => {
      dispatch(setLoading(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}