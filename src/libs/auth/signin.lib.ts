import { getLocalUserAuth } from "@/redux/features/userAuth.feature";
import { setError, setLoading, setStatusMessage, setSuccess } from "@/redux/features/loading.feature";
import { NextRouter } from "next/router";
import { httpPost } from "../http";
import { setLocalUserCredential } from "./auth.lib";

type Payload = {
  email: string
  password: string
}

export const signIn = async (
  dispatch: any,
  router: NextRouter,
  payload: Payload
) => {
  dispatch(setLoading(true))
  dispatch(setStatusMessage('กำลังเข้าสู่ระบบ...'))

  const { status, data } = await httpPost('/auth/signin', payload)

  if (data.status === 7) {
    return dispatch(
      setSuccess({
        errorMessage: 'ส่งการขอเข้าสู่ระบบเรียบร้อย',
      })
    )
  }

  if (status === 400 || status === 403 || status === 404) {
    return dispatch(setError({
      errorMessage: 'อีเมล หรือ รหัสผ่านไม่ถูกต้อง',
      errorCode: data.code
    }))
  }


  dispatch(setStatusMessage('เข้าสู่ระบบสำเร็จ!'))

  setLocalUserCredential(
    data.accessToken,
    data.userAuth
  )

  dispatch(setStatusMessage('กำลังเปลี่ยนหน้า'))

  dispatch(getLocalUserAuth())

  sessionStorage.clear()

  router.push('/dashboard')

  dispatch(setLoading(false))
  dispatch(setStatusMessage(null))
}