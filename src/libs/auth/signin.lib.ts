import { setError, setLoading, setStatusMessage } from "@/redux/features/loading.feature";
import { NextRouter } from "next/router";
import { httpPost } from "../http";

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
  
  if (status === 400 || status === 403 || status === 404) {
    return dispatch(setError({
      errorMessage: 'อีเมล หรือ รหัสผ่านไม่ถูกต้อง',
      errorCode: data.code
    }))
  }

  dispatch(setStatusMessage('เข้าสู่ระบบสำเร็จ!'))
  dispatch(setStatusMessage('กำลังเปลี่ยนหน้า'))

  router.push('/dashboard')

  dispatch(setLoading(false))
  dispatch(setStatusMessage(null))
}