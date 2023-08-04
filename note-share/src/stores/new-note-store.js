import { defineStore } from 'pinia';

export const useNoteStore = defineStore('note', {
  state: () => ({
    opened: false,
    parent: null
  }),
});
