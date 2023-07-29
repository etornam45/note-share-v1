<!-- TreeView.vue -->
<template>
    <div class="tree-view">
      <TreeItem v-for="item in treeData" :key="item.id" :data="item" />
    </div>
  </template>
  
  <script>
  import TreeItem from './TreeItem.vue';
  
  export default {
    components: {
      TreeItem,
    },
    props: {
      treeData: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  