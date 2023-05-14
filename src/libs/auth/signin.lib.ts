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

  const { status } = await httpPost('/auth/signin', payload)

  if ([401, 404].includes(status)) {
    return dispatch(setError({
      errorMessage: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
      errorCode: status
    }))
  }

  dispatch(setStatusMessage('เข้าสู่ระบบสำเร็จ!'))
  dispatch(setStatusMessage('กำลังเปลี่ยนหน้า'))

  router.push('/dashboard')

  dispatch(setLoading(false))
  dispatch(setStatusMessage(null))
}