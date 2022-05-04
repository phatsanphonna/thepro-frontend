import { getLocalUserAuth, setAuthStatus } from "@/redux/features/userAuth.feature";
import { setError, setLoading, setStatusMessage } from "@/redux/features/loading.feature";
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
  { email, password }: Payload
) => {
  dispatch(setLoading(true))
  dispatch(setStatusMessage('กำลังเข้าสู่ระบบ...'))

  const { status, data } = await httpPost('/auth/signin', { email, password })

  console.log(data);

  if (data.code === 502) {
    return dispatch(setError({
      errorMessage: 'ส่งการขอล็อกอินเข้าสู่ระบบเรียบร้อย',
      errorCode: data.code
    }))
  }
  
  if (status === 400 || status === 403 || status === 404) {
    return dispatch(setError({
      errorMessage: 'อีเมล หรือ รหัสผ่านไม่ถูกต้อง',
      errorCode: data.code
    }))
  }


  dispatch(setStatusMessage('เข้าสู่ระบบสำเร็จ!'))

  setLocalUserCredential(
    data.data.accessToken,
    data.data.userAuth
  )

  dispatch(setStatusMessage('กำลังเปลี่ยนหน้า'))

  dispatch(getLocalUserAuth())

  sessionStorage.clear()

  router.push('/dashboard')

  dispatch(setLoading(false))
  dispatch(setStatusMessage(null))
}