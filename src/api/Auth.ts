import { BaseApi } from './base'
import router from '@/router'
import type { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { useUserStore } from '@/stores/userStore'
import type { List, createListPayload, listContent, createListItem } from '@/types'

class AuthApi extends BaseApi {
  public constructor() {
    super(import.meta.env.VITE_API_URL)
    this.instance.interceptors.response.use(this._handleResponse, this._handleError)
    this.instance.interceptors.request.use(this._handleRequest)
  }

  public getList = (): List | any => this.instance.get<List>('List')
  public getListContent = (id: number): any => this.instance.get<listContent>(`List/${id}`)
  public createList = (payload: createListPayload): any => this.instance.post<listContent>('List', payload)
  public deleteListItem = (listId: number, listItemId: number): any => this.instance.delete<listContent>(`List/${listId}/list-item/${listItemId}`)
  public addListItem = (id: number, payload: createListItem): any => this.instance.post<listContent>(`List/${id}/list-item`, payload)
  public deleteList = (listId: number): any => this.instance.delete<listContent>(`List/${listId}`)

  protected _handleError = async (error: AxiosError) => {
    const config = error.config
    console.log(config)
    if (error.response) {
      const { status } = error.response
      switch (status) {
        // 500/404/403
        case 401:
          return Promise.reject(error)
        default:
          router.push({ name: 'ErrorPage' })
          return Promise.reject(error)
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      return Promise.reject(error)
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject(error)
    }
  }
  protected _handleRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const userStore = useUserStore()
    if (config.headers) {
      config.headers.set('Authorization', `Bearer ${userStore.accessToken}`)
    }
    return config
  }
}


const authApi: AuthApi = new AuthApi()

export default authApi
