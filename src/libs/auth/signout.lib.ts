import { setLoading, setStatusMessage } from "@/redux/features/loading.feature";
import { getLocalUserAuth } from "@/redux/features/userAuth.feature";
import { NextRouter } from "next/router";
import { httpGet } from "../http";
import { getAccessToken, getRefreshToken, removeLocalUserCredential } from "./auth.lib";

export const signOut = async (
  dispatch: any,
  router: NextRouter
) => {
  dispatch(setLoading(true))
  dispatch(setStatusMessage('กำลังออกจากระบบ...'))

  await httpGet('/auth/signout', {
    headers: {
      'Authorization': `Bearer ${getAccessToken()}`,
      refresh_token: getRefreshToken() as string
    }
  })

  removeLocalUserCredential()
  sessionStorage.clear()

  dispatch(getLocalUserAuth())

  dispatch(setStatusMessage('ออกจากระบบแล้ว'))

  router.push('/signin')

  dispatch(setLoading(false))
  dispatch(setStatusMessage(null))
}