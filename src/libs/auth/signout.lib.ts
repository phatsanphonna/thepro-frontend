import { disableError, setLoading, setStatusMessage } from "@/redux/features/loading.feature";
import { NextRouter } from "next/router";
import { httpPost } from "../http";

export const signOut = async (
  dispatch: any,
  router: NextRouter
) => {
  dispatch(disableError())
  
  dispatch(setLoading(true))
  dispatch(setStatusMessage('กำลังออกจากระบบ...'))

  await httpPost('/auth/signout')

  dispatch(setStatusMessage('ออกจากระบบแล้ว'))

  await router.push('/signin')

  dispatch(setLoading(false))
  dispatch(setStatusMessage(null))
}