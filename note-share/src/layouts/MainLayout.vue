<script>
import { onMounted, ref } from "vue";
import { useUserStore } from "src/stores/user-store";
import { useOpenedNote } from "src/stores/opened-note";
import SideBar from "src/components/SideBar.vue";
import RightSideBar from "src/components/RightSideBar.vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const openedNote = useOpenedNote();
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);
    const useUser = useUserStore();
    const $router = useRouter()

    function redirectForLogin() {
      if (!useUser.user) {
        console.log("must push");
        $router.push("/signup");
      }
    }

    onMounted( () => {
      redirectForLogin()
    })

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      useUser,
      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
      openedNote,
    };
  },
  components: { SideBar, RightSideBar },
};
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          v-if="rightDrawerOpen"
          dense
          flat
          round
          icon="menu"
          @click="toggleLeftDrawer"
        />
        <q-btn v-else dense flat round icon="close" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          {{ openedNote.note.name }}
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated>
      <!-- drawer content --><side-bar />
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <!-- drawer content -->
      <right-side-bar />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white"> </q-footer>
  </q-layout>
</template>
