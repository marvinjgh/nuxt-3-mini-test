// stores/auth.js
import { defineStore } from "pinia";
import type { User } from "~/models/user.model";

export interface AuthState {
  user: User | null;
  token: string | null;
}

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      user: null,
      token: null,
    } as AuthState;
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    logIn(user: User, token: string) {
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
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
