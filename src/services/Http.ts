import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'

export default class Http {
  private baseURL: string
  private instance: AxiosInstance

  constructor () {
    this.baseURL = 'http://localhost:5000'
    this.instance = axios.create()
  }

  public post<T, B, R = AxiosResponse<T>> (endpoint: string, data?: B, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.post(`${this.baseURL}${endpoint}`, data, config)
  }

  public get<T, R = AxiosResponse<T>> (endpoint: string, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.get(`${this.baseURL}${endpoint}`, config)
  }

  public patch<T, B = {}, R = AxiosResponse<T>> (endpoint: string, data?: B, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.patch(`${this.baseURL}${endpoint}`, data, config)
  }

  public put<T, B, R = AxiosResponse<T>> (endpoint: string, data?: B, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.put(`${this.baseURL}${endpoint}`, data, config)
  }
}
