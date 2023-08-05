<script>
import { pb } from "src/pocketbase";
import { onMounted, ref } from "vue";
import { useUserStore } from "src/stores/user-store";
import {useSharedWithMeStore} from "src/stores/shared-with-me" 
export default {
  setup() {
    const userStore = useUserStore();
    const sharedWithMe = useSharedWithMeStore();

    onMounted(async () => {
    await pb
        .collection("sharedNotes")
        .getFullList({
          expand: "sender, note",
          '$autoCancel': false,
        })
        .then((result) => {
          console.log(result);
          result.forEach(note => {
            if(note.receiver == userStore.user.id){
              // shared.notes.push(note)
              sharedWithMe.notes.push(note)
            }
          })
        });
    });

    return {
      sharedWithMe,
    };
  },
};
</script>

<template>
  <p style="font-size: 20px; padding: 10px 10px 0;">Shared With Me</p>
  <div style="padding: 10px 10px 0;" v-if="sharedWithMe.notes.length > 0" v-for="note in sharedWithMe.notes" :key="note.id">
    {{ note.expand?.note.name }} <br>
    {{ note.expand.sender.name }}
    <span>
      -{{ new Date(note.created).toLocaleDateString() }}
    </span>
    <hr>
  </div>
  <div class="center" v-else>
    No Notes shared with you
  </div>
</template>

<style scoped lang="scss">
.center{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px 0;
}
</style>
