<!-- TreeItem.vue -->
<template>
  <div class="tree-item">
    <q-icon name="note" />
    <span @click="toggleChildren">{{ data.label }}</span>
    <ul v-if="showChildren">
      <TreeItem v-for="child in data.children" :key="child.id" :data="child" />
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showChildren: false,
    };
  },
  methods: {
    toggleChildren() {
      this.showChildren = !this.showChildren;
    },
  },
};
</script>

<style scoped>
.tree-item {
  cursor: pointer;
}
</style>
