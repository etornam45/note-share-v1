import { defineStore } from 'pinia';
import { useUserStore } from './user-store';
const userStore = useUserStore()
export const useNoteToShare = defineStore('notetoshare', {
  state: () => ({
    receiver: '',
    note_id: "",
    sender: userStore.user.id
  })
});
