import { getAccessToken } from "../auth";
import { httpGet, httpPost } from "../http";

type User = {
  firstname: string
  lastname: string
  nickname: string
  email: string
}
export const fetchUser = async () => {
  const { status, data } = await httpGet('/user', {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`
    }
  })

  if (status === 403) return undefined

  return data
}

export async function addOrUpdateUser(user: User) {
  const { status, data } = await httpPost('/user', user, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`
    }
  })

  if (status === 403) return undefined

  return data
}