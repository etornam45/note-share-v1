<script>
import { pb } from "src/pocketbase";
import { onMounted, ref } from "vue";
import { useUserStore } from "src/stores/user-store";
// import {usesharedStore} from "src/stores/shared-with-me" 
import { useSharedStore } from "src/stores/sharedStore";
export default {
  setup() {
    const userStore = useUserStore();
    const shared = useSharedStore();

    onMounted(async () => {
      const record = await pb
        .collection("sharedNotes")
        .getFullList({
          expand: "sender, note",
          "$autoCancel": false
        })
        .then((result) => {
          console.log(result);
          result.forEach(note => {
            if(note.sender == userStore.user.id){
                shared.notes.push(note);
            }
          })
        });
    });

    return {
      shared,
    };
  },
};
</script>

<template>
  <p style="font-size: 20px; padding: 10px 10px 0;">Shared With Me</p>
  <div style="padding: 10px 10px 0;" v-if="shared.notes.length > 0" v-for="note in shared.notes" :key="note.id">
    {{ note.expand?.note.name }} <br>
    {{ note.expand.sender.name }}
    <span>
      -{{ new Date(note.created).toLocaleDateString() }}
    </span>
    <hr>
  </div>
  <div v-else class="center">
    No Notes shared with you
  </div>
</template>

<style scoped lang="scss">
.center{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
