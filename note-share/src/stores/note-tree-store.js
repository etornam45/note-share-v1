import { defineStore } from "pinia";

export const useNoteTreeStore = defineStore("notetreestore", {
  state: () => ({
    notes: [],
    tree: []
  }),
  getters: {
    arrangeInHierarchy(store) {
      let inputArray = store.notes;
      const tree = {};

      // Create a map to quickly find nodes by their ID
      const nodeMap = inputArray.reduce((acc, node) => {
        acc[node.id] = node;
        return acc;
      }, {});

      // Function to recursively build the tree
      const buildTree = (node) => {
        const children = inputArray.filter(
          (childNode) => childNode.parent === node.id
        );

        if (children.length > 0) {
          node.children = children.map((child) => buildTree(child));
        }

        return node;
      };

      // Find and build root nodes
      const rootNodes = inputArray.filter((node) => !node.parent);
      rootNodes.forEach((root) => {
        tree[root.id] = buildTree(root);
      });

      console.log(Object.values(tree))
      return Object.values(tree);
    },
  },
  actions: {
    addNote(note) {
        this.notes.push(note)
    },
  },
});
