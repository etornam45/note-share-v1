<template>
  <div class="q-tree">
    <div>
      <div
        class="q-tree__node relative-position q-tree__node--parent"
        v-for="item in treeData"
        :key="item.id"
      >
        <div class="node q-tree__node-header relative-position row " @click="loadChildren(item)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              fill="#888888"
              d="M12 14.195c-.176 0-.348-.046-.5-.133l-9-5.198a1 1 0 0 1 0-1.732l9-5.194c.31-.177.69-.177 1 0l9 5.194a1 1 0 0 1 0 1.732l-9 5.198a1.002 1.002 0 0 1-.5.133z"
              opacity=".25"
            />
            <path
              fill="#888888"
              d="m21.5 11.132l-1.964-1.134l-7.036 4.064c-.31.178-.69.178-1 0L4.464 9.998L2.5 11.132a1 1 0 0 0 0 1.732l9 5.198c.31.178.69.178 1 0l9-5.198a1 1 0 0 0 0-1.732z"
              opacity=".5"
            />
            <path
              fill="#888888"
              d="m21.5 15.132l-1.964-1.134l-7.036 4.064c-.31.178-.69.178-1 0l-7.036-4.064L2.5 15.132a1 1 0 0 0 0 1.732l9 5.198c.31.178.69.178 1 0l9-5.198a1 1 0 0 0 0-1.732z"
            />
          </svg>
          {{ item.label }}

          <div class="floating">
            <div class="add" @click="addChild(item)">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none"><path fill="#888888" d="M7 21a2 2 0 0 1-2-2V3h8v6h6v10a2 2 0 0 1-2 2H7Z" opacity=".16"/><path stroke="#888888" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a2 2 0 0 1-2-2V3h9l5 5v11a2 2 0 0 1-2 2H7Zm5-8v4m-2-2h4"/><path stroke="#888888" stroke-linejoin="round" stroke-width="2" d="M13 3v6h6"/></g></svg>
            </div>
            <div class="remove">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none"><path fill="#888888" d="M8 21h8a2 2 0 0 0 2-2V7H6v12a2 2 0 0 0 2 2Z" opacity=".16"/><path stroke="#888888" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 7v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7M4 7h16M7 7l2-4h6l2 4"/></g></svg>
            </div>
          </div>
        </div>
        <div v-if="newNote.opened && item.id == newNote.parent" style="display: flex; align-items: center;">
          <input v-model="input" type="text" placeholder="name" />
          <button @click="saveNote" style="display: inline-flex; align-items: center;">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none"><path fill="#888888" d="M7 21a2 2 0 0 1-2-2V3h8v6h6v10a2 2 0 0 1-2 2H7Z" opacity=".16"/><path stroke="#888888" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a2 2 0 0 1-2-2V3h9l5 5v11a2 2 0 0 1-2 2H7Zm5-8v4m-2-2h4"/><path stroke="#888888" stroke-linejoin="round" stroke-width="2" d="M13 3v6h6"/></g></svg>
          </button>
        </div>

        <div class="q-tree__node-collapsible">
          <div class="q-tree__children">
            <tree-view
              v-if="item.children"
              :tree-data="item.children"
              @load-children="loadChildren"
              @add-child="addChild"
            ></tree-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useNoteStore } from "src/stores/new-note-store";
import PocketBase from "pocketbase";
import { useUserStore } from "src/stores/user-store";
const pb = new PocketBase("http://127.0.0.1:8090");
export default {
  name: "TreeView",
  props: {
    treeData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      newNote: useNoteStore(),
      input: "",
      userStore: useUserStore(),
    };
  },
  methods: {
    loadChildren(item) {
      this.$emit("load-children", item);
    },
    addChild(item) {
      this.$emit("add-child", item);
    },
    async saveNote() {
      await pb
        .collection("noteContent")
        .create({
          content: "<p>Type your note here</p>",
        })
        .then(async (result) => {
          console.log(result);
          await pb
            .collection("noteTree")
            .create({
              name: this.input,
              parent: this.newNote.parent,
              content: result.id,
              user: this.userStore.user.id,
              sharedUsers: [],
            })
            .then((result) => {
              this.newNote.opened = false;
            });
        });
    },
  },
};
</script>

<style scoped>
.node {
  /* background: rgb(221, 216, 210); */
  padding: 2px 18px 2px 7px;
  border-radius: 0px;
  /* box-shadow: 0px 0px 2px 0px rgb(109, 108, 107); */
  margin-bottom: 5px;

  width: max-content;

  display: flex;
  align-items: center;

  gap: 10px;
  cursor: pointer;
  position: relative;
}

.node:hover {
  background: rgb(243, 238, 238);
  box-shadow: 0 1px 1px black;
}

.node svg {
  width: 18px;
}

.floating {
  display: none;
  position: absolute;
  bottom: 0%;
  right: 0;
  z-index: 20;
  /* align-items: center;
  justify-content: center; */
  gap: 5px;
  /* background: black; */
  padding: 5px;
  height: 20px;
}

.node:hover > .floating {
  display: flex;
}
</style>
src/stores/new-note-store.js
