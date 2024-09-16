import { defineStore } from "pinia";

export const useAuthentification = defineStore("authentification", {
  state: () => ({
    token: null as string | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    login(token: string) {
      this.token = token;
    },
    logout() {
      this.token = null;
    },
  },
});
