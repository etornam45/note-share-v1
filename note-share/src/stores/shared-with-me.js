import { defineStore } from 'pinia';
export const useSharedWithMeStore = defineStore('sharedwithme', {
  state: () => ({
    notes: []
  })
});
