import { NextRouter } from "next/router";
import { getAccessToken, refreshAccessToken, setLocalUserCredential } from "../auth";
import { httpGet, httpPost } from "../http";

type User = {
  firstname: string
  lastname: string
  nickname: string
  email: string
}

export const fetchUser = async () => {
  const localUser = sessionStorage.getItem('localUser')

  if (localUser !== null) {
    return JSON.parse(localUser!)
  }

  const response = await httpGet('/user', {
    headers: { 'Authorization': `Bearer ${getAccessToken()}` }
  })

  if (response.data.code === 508 || response.data.code === 509) {
    const newResponse = await httpGet('/user', {
      headers: { 'Authorization': `Bearer ${getAccessToken()}` }
    })

    sessionStorage.setItem('localUser', JSON.stringify(newResponse.data.data))

    return newResponse.data.data
  } else {
    sessionStorage.setItem('localUser', JSON.stringify(response.data.data))

    return response.data.data
  }

}



export async function addOrUpdateUser(user: User) {
  const response = await httpPost('/user', user, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`
    }
  })

  if (response.data.code === 508 || response.data.code === 509) {
    const newResponse = await httpPost('/user', user, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })

    sessionStorage.clear()

    return newResponse.data.data
  } else {
    sessionStorage.clear()

    return response.data.data
  }
}