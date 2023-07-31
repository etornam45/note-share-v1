<template>
  <div style="padding: 20px 10px;">
    <tree-view
      :tree-data="myTreeData"
      @load-children="handleLoadChildren"
    ></tree-view>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive } from "vue";
import TreeView from "./TreeView.vue";
import PocketBase from "pocketbase";
import { useUserStore } from "src/stores/user-store";
import { useRouter } from "vue-router";


export default defineComponent({
  components: {
    TreeView,
  },
  setup() {
    const pb = new PocketBase("http://127.0.0.1:8090");
    const userStore = useUserStore();
    const router = useRouter()
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
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            // handle routing here
            router.push('/'+ item.id)
        });
    }

    onMounted(async () => {
      await pb
        .collection("noteTree")
        .getFullList({
          filter: `user = '${userStore.user.id}' && parent = ''`,
        })
        .then((result) => {
          result.forEach((node) => {
            state.myTreeData.push({
              label: node.name,
              id: node.id,
              children: [],
            });
          });
        });
    });

    return { ...state, handleLoadChildren };
  },
});
</script>
