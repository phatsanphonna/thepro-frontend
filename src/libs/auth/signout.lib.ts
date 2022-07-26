import { disableError, setLoading, setStatusMessage } from "@/redux/features/loading.feature";
import { clearLocalUser, getLocalUserAuth } from "@/redux/features/userAuth.feature";
import { NextRouter } from "next/router";
import { httpGet } from "../http";
import { getAccessToken, removeLocalUserCredential } from "./auth.lib";

export const signOut = async (
  dispatch: any,
  router: NextRouter
) => {
  dispatch(disableError())
  
  dispatch(setLoading(true))
  dispatch(setStatusMessage('กำลังออกจากระบบ...'))

  await httpGet('/auth/signout', {
    headers: {
      'Authorization': `Bearer ${getAccessToken()}`,
    }
  })

  removeLocalUserCredential()
  sessionStorage.clear()

  dispatch(getLocalUserAuth())
  dispatch(clearLocalUser())

  dispatch(setStatusMessage('ออกจากระบบแล้ว'))

  await router.push('/signin')

  dispatch(setLoading(false))
  dispatch(setStatusMessage(null))
}