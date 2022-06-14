import { defineStore } from "pinia";

export const countrieStore = defineStore("countries", {
  state: () => ({
    countries: [],
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    loadCountries(val) {
      this.countries = val;
    },
  },
  persist: true,
});
