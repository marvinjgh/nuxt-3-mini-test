// stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return { 
      user: null,
      token: null,
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    logIn(user, token) {
      this.user = user;
      this.token = token;
    },
    logOut() {
      this.user = null;
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}