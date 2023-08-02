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
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024"><path fill="#888888" fill-opacity=".15" d="M372.5 256H184v512h656V370.4H492.1L372.5 256zM540 443.1V528h84.5c4.1 0 7.5 3.1 7.5 7v42c0 3.8-3.4 7-7.5 7H540v84.9c0 3.9-3.1 7.1-7 7.1h-42c-3.8 0-7-3.2-7-7.1V584h-84.5c-4.1 0-7.5-3.2-7.5-7v-42c0-3.9 3.4-7 7.5-7H484v-84.9c0-3.9 3.2-7.1 7-7.1h42c3.9 0 7 3.2 7 7.1z"/><path fill="#888888" d="M880 298.4H521L403.7 186.2a8.15 8.15 0 0 0-5.5-2.2H144c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V330.4c0-17.7-14.3-32-32-32zM840 768H184V256h188.5l119.6 114.4H840V768z"/><path fill="#888888" d="M484 443.1V528h-84.5c-4.1 0-7.5 3.1-7.5 7v42c0 3.8 3.4 7 7.5 7H484v84.9c0 3.9 3.2 7.1 7 7.1h42c3.9 0 7-3.2 7-7.1V584h84.5c4.1 0 7.5-3.2 7.5-7v-42c0-3.9-3.4-7-7.5-7H540v-84.9c0-3.9-3.1-7.1-7-7.1h-42c-3.8 0-7 3.2-7 7.1z"/></svg>
            </div>
            <div class="remove" @click="deleteNote(item)">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024"><path fill="#888888" fill-opacity=".15" d="M292.7 840h438.6l24.2-512h-487z"/><path fill="#888888" d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-504-72h304v72H360v-72zm371.3 656H292.7l-24.2-512h487l-24.2 512z"/></svg>
            </div>
          </div>
        </div>
        

        <div class="q-tree__node-collapsible">
          <div class="q-tree__children">
            <tree-view
              v-if="item.children"
              :tree-data="item.children"
              @load-children="loadChildren"
              @add-child="addChild"
              @delete-note="deleteNote"
            ></tree-view>
          </div>
          <div class="new-input q-tree__children q-tree__node-collapsible" v-if="newNote.opened && item.id == newNote.parent" style="display: flex; align-items: center; margin-left: 10px;">
            <form action="#" @submit="saveNote" @blur="saveNote">
              <input v-model="input" type="text" placeholder="name" />
              <button @click="saveNote" style="display: inline-flex; align-items: center;">
                <svg xmlns="http://www.w3.org/2000/svg" width="20"  viewBox="0 0 1024 1024"><path fill="#888888" d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"/><path fill="#888888" fill-opacity=".15" d="M184 840h656V184H184v656zm136-352c0-4.4 3.6-8 8-8h152V328c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v152h152c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8H544v152c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V544H328c-4.4 0-8-3.6-8-8v-48z"/><path fill="#888888" d="M328 544h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z"/></svg>
              </button>
              <button @click="() => newNote.opened = false" style="display: inline-flex; align-items: center;">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 1024 1024"><path fill="#888888" d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"/><path fill="#888888" fill-opacity=".15" d="M184 840h656V184H184v656zm163.9-473.9A7.95 7.95 0 0 1 354 353h58.9c4.7 0 9.2 2.1 12.3 5.7L512 462.2l86.8-103.5c3-3.6 7.5-5.7 12.3-5.7H670c6.8 0 10.5 7.9 6.1 13.1L553.8 512l122.3 145.9c4.4 5.2.7 13.1-6.1 13.1h-58.9c-4.7 0-9.2-2.1-12.3-5.7L512 561.8l-86.8 103.5c-3 3.6-7.5 5.7-12.3 5.7H354c-6.8 0-10.5-7.9-6.1-13.1L470.2 512L347.9 366.1z"/><path fill="#888888" d="M354 671h58.9c4.8 0 9.3-2.1 12.3-5.7L512 561.8l86.8 103.5c3.1 3.6 7.6 5.7 12.3 5.7H670c6.8 0 10.5-7.9 6.1-13.1L553.8 512l122.3-145.9c4.4-5.2.7-13.1-6.1-13.1h-58.9c-4.8 0-9.3 2.1-12.3 5.7L512 462.2l-86.8-103.5c-3.1-3.6-7.6-5.7-12.3-5.7H354c-6.8 0-10.5 7.9-6.1 13.1L470.2 512L347.9 657.9A7.95 7.95 0 0 0 354 671z"/></svg>
              </button>
            </form>
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
    deleteNote(item) {
      this.$emit("delete-note", item);
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

<style lang="scss" scoped>
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
  color: #000;
  font-weight: bolder;
}

.node svg {
  width: 18px;
}

.floating {
  display: none;
  position: absolute;
  top: -20px;
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

.new-input{
  // margin-left: 25px !important;


  form{
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #bbb;
  }
  
  input{
    border-radius: 0;
    width: 150px;
    border: 0;
  }
  
  button{
    // background: ;
    border: 2px solid transparent;
    border-left: 1px solid #bbb;
    // height: 100%;
    cursor: pointer;
    margin: 0;
    padding: 0;
  }
}
</style>