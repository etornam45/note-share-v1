import { defineStore } from 'pinia';

export const useNoteStore = defineStore('note', {
  state: () => ({
    opened: false,
    parent: null
  }),
  getters: {
    doubleCount: (state) => state,
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
