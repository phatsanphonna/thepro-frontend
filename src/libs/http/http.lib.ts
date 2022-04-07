import axios, { AxiosRequestConfig } from 'axios'

export const useGetHttp = async (
    url: string,
    config?: AxiosRequestConfig<any> | undefined
) => {
    const response = axios.get(url, config)
    return response
}

export const usePostHttp = async (
    url: string, body?: {} | undefined,
    config?: AxiosRequestConfig<any> | undefined
) => {
    const response = axios.post(url, body, config)
    return response
}