import { defineStore } from 'pinia';
export const useSharedStore = defineStore('shared', {
  state: () => ({
    notes: []
  })
});
