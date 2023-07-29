<template>
  <div>
    <TreeView :treeData="treeData" />
  </div>
</template>

<script>
import TreeView from "./TreeView.vue";

export default {
  components: {
    TreeView,
  },
  data() {
    return {
      treeData: [
        {
          id: 1,
          label: "Node 1",
          children: [
            {
              id: 2,
              label: "Child 1",
              children: [
                {
                  id: 4,
                  label: "Grandchild 1",
                  children: [],
                },
              ],
            },
            {
              id: 3,
              label: "Child 2",
              children: [
                {
                  id: 4,
                  label: "Grandchild 1",
                  children: [
                  {
              id: 2,
              label: "Child 1",
              children: [
                {
                  id: 4,
                  label: "Grandchild 1",
                  children: [],
                },
              ],
            },
            {
              id: 3,
              label: "Child 2",
              children: [
                {
                  id: 4,
                  label: "Grandchild 1",
                  children: [
                  {
              id: 2,
              label: "Child 1",
              children: [
                {
                  id: 4,
                  label: "Grandchild 1",
                  children: [ {
              id: 2,
              label: "Child 1",
              children: [
                {
                  id: 4,
                  label: "Grandchild 1",
                  children: [],
                },
              ],
            },
            {
              id: 3,
              label: "Child 2",
              children: [
                {
                  id: 4,
                  label: "Grandchild 1",
                  children: [],
                },
              ],
            },],
                },
              ],
            },
            {
              id: 3,
              label: "Child 2",
              children: [
                {
                  id: 4,
                  label: "Grandchild 1",
                  children: [],
                },
              ],
            },
                  ],
                },
              ],
            },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
  },
};
</script>
