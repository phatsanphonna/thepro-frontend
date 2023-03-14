import axios, { AxiosRequestConfig } from 'axios';

export const ClientAxios = axios.create({
  baseURL: '/api',
  responseType: 'json',
})

export const ServerAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL + '/api',
  responseType: 'json',
})

export const httpGet = async (
  url: string,
  config?: AxiosRequestConfig<any> | undefined
) => {
  try {
    const response = await ClientAxios.get(url, config)
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
    const response = await ClientAxios.post(url, body, config)
    return response
  } catch (e: any) {
    console.error(e);
    return e.response
  }
}