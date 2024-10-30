import type { AxiosInstance, AxiosResponse } from "axios";
import axios from 'axios'

declare module 'axios' { interface AxiosInstance<T = any> extends Promise<T> { } }

export abstract class BaseApi {
  protected readonly instance: AxiosInstance

  public constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,

    })
  }

  protected _handleResponse = ({ data }: AxiosResponse) => data
}