<template>
  <div>
    <div>
      <div 
        style="margin-left: 10px"
        v-for="item in treeData"
        :key="item.id"
      >
        <div class="node" @click="loadChildren(item)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#888888" d="M12 14.195c-.176 0-.348-.046-.5-.133l-9-5.198a1 1 0 0 1 0-1.732l9-5.194c.31-.177.69-.177 1 0l9 5.194a1 1 0 0 1 0 1.732l-9 5.198a1.002 1.002 0 0 1-.5.133z" opacity=".25"/><path fill="#888888" d="m21.5 11.132l-1.964-1.134l-7.036 4.064c-.31.178-.69.178-1 0L4.464 9.998L2.5 11.132a1 1 0 0 0 0 1.732l9 5.198c.31.178.69.178 1 0l9-5.198a1 1 0 0 0 0-1.732z" opacity=".5"/><path fill="#888888" d="m21.5 15.132l-1.964-1.134l-7.036 4.064c-.31.178-.69.178-1 0l-7.036-4.064L2.5 15.132a1 1 0 0 0 0 1.732l9 5.198c.31.178.69.178 1 0l9-5.198a1 1 0 0 0 0-1.732z"/></svg>
          {{ item.label }}

          <div class="floating">
            <div class="add">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#888888" d="M17 11h-4V7a1 1 0 0 0-2 0v4H7a1 1 0 0 0 0 2h4v4a1 1 0 0 0 2 0v-4h4a1 1 0 0 0 0-2Z"/><path fill="#888888" d="M21 2H3a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Zm-4 11h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4a1 1 0 0 1 0 2Z" opacity=".5"/></svg>
            </div>
            <div class="remove">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#888888" d="m13.414 12l3.293-3.293a1 1 0 0 0-1.414-1.414L12 10.586L8.707 7.293a1 1 0 0 0-1.414 1.414L10.586 12l-3.293 3.293a1 1 0 0 0 1.414 1.414L12 13.414l3.293 3.293a1 1 0 0 0 1.414-1.414Z"/><path fill="#888888" d="M19.07 4.93A10 10 0 1 0 4.93 19.07A10 10 0 1 0 19.07 4.93Zm-2.363 10.363a1 1 0 1 1-1.414 1.414L12 13.414l-3.293 3.293a1 1 0 0 1-1.414-1.414L10.586 12L7.293 8.707a1 1 0 0 1 1.414-1.414L12 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414L13.414 12Z" opacity=".5"/></svg>
            </div>
          </div>
        </div>
        <tree-view
          v-if="item.children"
          :tree-data="item.children"
          @load-children="loadChildren"
        ></tree-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TreeView",
  props: {
    treeData: {
      type: Array,
      required: true,
    },
  },
  methods: {
    loadChildren(item) {
      this.$emit("load-children", item);
    },
  },
};
</script>

<style scoped>
.node {
  background: rgb(221, 216, 210);
  padding: 2px 18px 2px 7px;
  border-radius: 0px;
  box-shadow: 0px 0px 2px 0px rgb(109, 108, 107);
  margin-bottom: 5px;

  width: max-content;

  display: flex;
  align-items: center;

  gap: 10px;
  cursor: pointer;
  position: relative;
}

.node:hover{
    background: rgb(243, 238, 238);
    box-shadow: 0 1px 1px black;
}

.node svg{
    width: 18px;
}

.floating{
    display: none;
    position: absolute;
    bottom: -100%;
    right: 0;
    z-index: 20;
    align-items: center;
    gap: 5px;
}

.node:hover > .floating{
    display: flex;
}
</style>
