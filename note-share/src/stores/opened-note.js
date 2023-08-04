import { defineStore } from 'pinia';

export const useOpenedNote = defineStore('openednote', {
  state: () => ({
    note: {}
  })
});
