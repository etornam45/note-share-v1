<template>
  <div class="top-bar">
    <div class="new-input" style="display: flex; align-items: center">
      <form @submit.prevent="saveNote">
        <input v-model="input" type="text" placeholder="Add a new Note" />
        <button
          @click.prevent="addParentNote"
          style="display: inline-flex; align-items: center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="#888888"
              d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"
            />
            <path
              fill="#888888"
              fill-opacity=".15"
              d="M184 840h656V184H184v656zm136-352c0-4.4 3.6-8 8-8h152V328c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v152h152c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8H544v152c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V544H328c-4.4 0-8-3.6-8-8v-48z"
            />
            <path
              fill="#888888"
              d="M328 544h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z"
            />
          </svg>
        </button>
        <button
          @click="clearInput"
          style="display: inline-flex; align-items: center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="#888888"
              d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"
            />
            <path
              fill="#888888"
              fill-opacity=".15"
              d="M184 840h656V184H184v656zm163.9-473.9A7.95 7.95 0 0 1 354 353h58.9c4.7 0 9.2 2.1 12.3 5.7L512 462.2l86.8-103.5c3-3.6 7.5-5.7 12.3-5.7H670c6.8 0 10.5 7.9 6.1 13.1L553.8 512l122.3 145.9c4.4 5.2.7 13.1-6.1 13.1h-58.9c-4.7 0-9.2-2.1-12.3-5.7L512 561.8l-86.8 103.5c-3 3.6-7.5 5.7-12.3 5.7H354c-6.8 0-10.5-7.9-6.1-13.1L470.2 512L347.9 366.1z"
            />
            <path
              fill="#888888"
              d="M354 671h58.9c4.8 0 9.3-2.1 12.3-5.7L512 561.8l86.8 103.5c3.1 3.6 7.6 5.7 12.3 5.7H670c6.8 0 10.5-7.9 6.1-13.1L553.8 512l122.3-145.9c4.4-5.2.7-13.1-6.1-13.1h-58.9c-4.8 0-9.3 2.1-12.3 5.7L512 462.2l-86.8-103.5c-3.1-3.6-7.6-5.7-12.3-5.7H354c-6.8 0-10.5 7.9-6.1 13.1L470.2 512L347.9 657.9A7.95 7.95 0 0 0 354 671z"
            />
          </svg>
        </button>
      </form>
    </div>
  </div>
  <div style="height: calc(100% - 50px)">
    <tree-view
      :tree-data="noteTree.arrangeInHierarchy"
      @load-children="handleLoadChildren"
      @add-child="addChild"
      @delete-note="deleteNote"
    ></tree-view>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, watch } from "vue";
import TreeView from "./TreeView.vue";
import PocketBase from "pocketbase";
import { useUserStore } from "src/stores/user-store";
import { useRouter } from "vue-router";
import { useNoteStore } from "src/stores/new-note-store";
import { useNoteTreeStore } from "src/stores/note-tree-store";

export default defineComponent({
  components: {
    TreeView,
  },
  setup() {
    const pb = new PocketBase("http://127.0.0.1:8090");
    const userStore = useUserStore();
    const router = useRouter();
    const newNote = useNoteStore();
    const noteTree = useNoteTreeStore();
    // const notes = [];

    const myTreeData = ref(noteTree.notes)
     

    async function handleLoadChildren(item) {
      await pb
        .collection("noteTree")
        .getFullList({
          filter: `parent = '${item.id}'`,
        })
        .then((result) => {
          result.forEach((node) => {
            if (!item.children.some((child) => child.id == node.id)) {
              item.children.push({
                label: node.name,
                id: node.id,
                children: [],
              });
            }
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          // handle routing here
          router.push("/" + item.id);
        });
    }
    async function deleteNote(item) {
      noteTree.notes = noteTree.notes.filter(note => note.id != item.id)
    }

    async function addChild(item) {
      console.log(item);
      newNote.opened = true;
      newNote.parent = item.id;
    }

    const input = ref("");

    async function saveNote() {
      await pb
        .collection("noteContent")
        .create({
          content: "",
        })
        .then(async (result) => {
          console.log(result);
          await pb.collection("noteTree").create({
            name: input.value,
            parent: newNote.parent,
            content: result.id,
            user: userStore.user.id,
            sharedUsers: [],
          });
        });
    }

    async function addParentNote() {
      await pb
        .collection("noteContent")
        .create({
          // Content for a new Note
          content: "<p>Type your note here</p>",
        })
        .then(async (result) => {
          console.log(result);
          // Create new Note in in database
          await pb
            .collection("noteTree")
            .create({
              name: input.value,
              parent: "",
              content: result.id,
              user: userStore.user.id,
              sharedUsers: [],
            })
            .then((result) => {
              // Clear input values
              input.value = ''
              // Add a new note to treeView data
              noteTree.addNote({
                label: result.name,
                parent: result.parent,
                id: result.id,
                children: []
              })
            });
        });
    }

    const standByArray = ref([]);

    onMounted(async () => {
      await pb
        .collection("noteTree")
        .getFullList({
          filter: `user = '${userStore.user.id}'`,
        })
        .then((result) => {
          noteTree.notes = [];
          result.forEach((node) => {
            noteTree.notes.push({
              label: node.name,
              id: node.id,
              parent: node.parent,
              children: [],
            });
          });
        })
    });

    function clearInput() {
      input.value = ''
    }

    return {
      clearInput,
      myTreeData,
      deleteNote,
      handleLoadChildren,
      addChild,
      newNote,
      input,
      saveNote,
      noteTree,
      input,
      addParentNote,
    };
  },
});
</script>

<style scoped lang="scss">
.new-input {
  height: 50px;
  // background: brown;
  padding: 10px;

  form {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
