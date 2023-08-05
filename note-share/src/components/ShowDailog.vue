<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn label="Share" color="primary" @click="prompt = true" />
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Email address</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="address"
            autofocus
            @keyup.enter="share"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add address" v-close-popup @click="share" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import { useNoteToShare } from "src/stores/note-to-share";
import { pb } from "src/pocketbase";
import { useRoute } from "vue-router";



export default {



  setup() {
    async function share() {
          await pb
            .collection("users").getFullList({
              filter: `email = '${address.value}'`
            }).then(async result => {
              await pb.collection("sharedNotes").create({
                sender: noteToShare.sender,
                receiver: result.id,
                note: $route.params.noteId,
              });
              this.prompt = false
            })
      }
    const noteToShare = useNoteToShare();
    const $route = useRoute();
    const address = ref("")
    return {
      prompt: ref(false),

      address,
      share,
    };
  },
};
</script>