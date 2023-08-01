<template>
  <div style="margin: 0 0 0 20px; padding-top: 20px; overflow-y: hidden; height: calc(100% - 0px);">
    <tree-view
      :tree-data="myTreeData"
      @load-children="handleLoadChildren"
      @add-child="addChild"
    ></tree-view>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from "vue";
import TreeView from "./TreeView.vue";
import PocketBase from "pocketbase";
import { useUserStore } from "src/stores/user-store";
import { useRouter } from "vue-router";
import { useNoteStore } from "src/stores/new-note-store";

export default defineComponent({
  components: {
    TreeView,
  },
  setup() {
    const pb = new PocketBase("http://127.0.0.1:8090");
    const userStore = useUserStore();
    const router = useRouter();
    const newNote = useNoteStore();
    const state = reactive({
      myTreeData: [],
    });

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

    function arrangeInHierarchy(inputArray) {
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

      return Object.values(tree);
    }


    const standByArray = ref([])

    onMounted(async () => {
      await pb
        .collection("noteTree")
        .getFullList({
          filter: `user = '${userStore.user.id}'`,
        })
        .then((result) => {
          result.forEach((node) => {
            standByArray.value.push({
              label: node.name,
              id: node.id,
              parent: node.parent, 
              children: [],
            });
          });
        }).finally(() => {
          // arrangeInHierarchy()
          let value = standByArray.value
          console.table(value);
          let order = arrangeInHierarchy(value)
          console.table(order);
          
          order.forEach(parent => {
            state.myTreeData.push(parent)
          })
        });
    });

    return { ...state, handleLoadChildren, addChild, newNote, input, saveNote };
  },
});
</script>
