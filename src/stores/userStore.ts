import axios from "axios";
import { defineStore } from "pinia";
import router from '@/router';
import type { tokenContentType } from "@/types";

const parseJwt = (token: string): tokenContentType => {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch (e) {
    return null
  }
}

export const useUserStore = defineStore('userStore', {
  state: () => ({
    accessToken: '' as String | null,
    loading: false,
    error: '' as String,
    tokenContent: {} as tokenContentType
  }),

  actions: {
    async loginUser(email: string, password: string) {
      this.loading = true
      await axios.post(`api/auth/login`, {
        "email": email,
        "password": password
      }, { withCredentials: true }).then((res) => {
        if (res.status == 201) {
          this.setAccessToken(res.data.token)
          router.push({ name: 'home' })
        }
        this.loading = false
      }
      ).catch((res) => {
        this.error = res.response.data.message
      })

      this.loading = false
    },
    async registerUser(name: string, email: string, password: string) {
      this.loading = true
      await axios.post(`api/auth/register`, {
        "name": name,
        "email": email,
        "password": password
      }).then((res) => {
        if (res.status == 201) {
          router.push({ name: 'login' })
        }
        this.loading = false
      }
      ).catch((res) => {

        this.error = res.response.data.message
      })

      this.loading = false
    },

    async setAccessToken(token: string) {
      this.accessToken = token
      this.tokenContent = parseJwt(token)
    },

    async refreshToken() {
      this.loading = true
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`).then((res) => {

        if (res.status == 201) {
          this.setAccessToken(res.data.accessToken)
        }
        this.loading = false
      }
      ).catch((res) => {
        console.log(res.response.data.message);

      })

      this.loading = false
    }

  }

})