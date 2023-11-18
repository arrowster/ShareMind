// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    token: localStorage.getItem('token'),
    id: localStorage.getItem('id'),
  }),
  actions: {
    setToken(token) {
      this.token = token
      localStorage.setItem('token', token)
    },
    setId(id) {
      this.id = id
      localStorage.setItem('id', id)
    },
  },
})
