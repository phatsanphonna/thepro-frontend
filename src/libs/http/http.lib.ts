import axios, { AxiosRequestConfig } from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

const service = axios.create({
  baseURL: API_URL,
  responseType: 'json'
})

export const httpGet = async (
  url: string,
  config?: AxiosRequestConfig<any> | undefined
) => {
  try {
    const response = await service.get(url, config)
    return response
  } catch (e: any) {
    console.error(e);
    return e.response
  }
}

export const httpPost = async (
  url: string, body?: {} | undefined,
  config?: AxiosRequestConfig<any> | undefined
) => {
  try {
    const response = await service.post(url, body, config)
    return response
  } catch (e: any) {
    console.error(e);
    return e.response
  }
}