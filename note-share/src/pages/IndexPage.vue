<script setup>
import { ElementTiptap } from "element-tiptap-vue3-fixed";
// import en from "element-tiptap-vue3-fixed/lib/locales/en";
// import ElementTiptap's styles
import "element-tiptap-vue3-fixed/lib/style.css";
import { ref } from "vue";
import { onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import PocketBase from "pocketbase";
import { useUserStore } from "src/stores/user-store";
import { getCurrentInstance } from "vue";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import ShowDailog from "src/components/ShowDailog.vue";

const pb = new PocketBase("http://127.0.0.1:8090");
const useUser = useUserStore();
const $route = useRoute();
const $router = useRouter();

const ydoc = new Y.Doc();
const provider = new WebrtcProvider($route.params.noteId, ydoc);

import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import {useOpenedNote} from "src/stores/opened-note"

import {
  // necessary extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  BulletList,
  OrderedList,
  TextAlign,
  FontSize,
  // codeView,
  Image,
  Table,
  Link,
  Iframe,
  CodeBlock,
  Blockquote,
  TaskList,
  Indent,
  LineHeight,
  HorizontalRule,
  HardBreak,
  History,
  FormatClear,
  Color,
  Highlight,
  Fullscreen,
  SelectAll,
  FontFamily,
  Gapcursor,
} from "element-tiptap-vue3-fixed";

const randomColor = `hsl(${Math.floor(Math.random() * 350)}deg 89.62% 58.43%)`;

const openedNote = useOpenedNote()
// editor extensions
// they will be added to menubar and bubble menu by the order you declare.
const extensions = [
  Doc,
  Text,
  Paragraph,
  Heading.configure({ level: 5 }),
  Bold.configure({ bubble: true }), // render command-button in bubble menu.
  Underline.configure({ bubble: true, menubar: false }), // render command-button in bubble menu but not in menubar.
  Italic.configure({ bubble: true }),
  Strike.configure({ bubble: true }),
  BulletList,
  OrderedList,
  TextAlign,
  FontSize,
  // codeView,
  Image,
  Table,
  Collaboration.configure({
    document: ydoc,
  }),
  CollaborationCursor.configure({
    provider: provider,
    user: {
      name: useUser.user.name,
      color: "#f44336",
    },
  }),
  Link.configure({ bubble: true }),
  Iframe,
  CodeBlock,
  Blockquote,
  TaskList,
  Indent,
  LineHeight,
  HorizontalRule,
  HardBreak,
  History,
  FormatClear,
  Color.configure({ bubble: true }),
  Highlight.configure({ bubble: true }),
  Fullscreen,
  SelectAll,
  FontFamily,
  Gapcursor,
];

// editor's content
let content = ref(`
  <p>Heading</p>
  <p>This Editor is awesome!</p>
`);

let contentId = ref("")

function redirectForLogin() {
  if (!useUser.user) {
    console.log("must push");
    $router.push("/signup");
  }
}

const that = getCurrentInstance();

const saveNote = async () => {
  await pb.collection('noteContent').update(contentId.value, {
    content: that.refs.editor.editor.view.docView.contentDOM.innerHTML
  });
  console.log(that.refs.editor.editor.view.docView.contentDOM.innerHTML)
}

onMounted(async () => {
  redirectForLogin();

  await pb
    .collection("noteTree")
    .getOne($route.params.noteId, {
      expand: "content",
    })
    .then((result) => {
      console.log(result);
      // content.value = result.expand?.content.content
      openedNote.note = result
      that.refs.editor.setContent(result.expand?.content.content);
      contentId.value = result.expand?.content.id
    });
  });
  
  watch(
    () => $route.fullPath,
    async () => {
      await pb
      .collection("noteTree")
      .getOne($route.params.noteId, {
        expand: "content",
      })
      .then((result) => {
        openedNote.note = result
        that.refs.editor.setContent(result.expand?.content.content);
      });
  }
);
</script>

<template>
  <div class="content">
    <ElementTiptap v-model:content="content" :extensions="extensions" ref="editor" />
  </div>
  <div style="z-index: 10000">
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <ShowDailog />
      <div class="fab" @click="saveNote">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 1024 1024"
        >
          <path
            fill="#fff"
            fill-opacity=".15"
            d="M704 320c0 17.7-14.3 32-32 32H352c-17.7 0-32-14.3-32-32V184H184v656h656V341.8l-136-136V320zM512 730c-79.5 0-144-64.5-144-144s64.5-144 144-144s144 64.5 144 144s-64.5 144-144 144z"
          />
          <path
            fill="#fff"
            d="M512 442c-79.5 0-144 64.5-144 144s64.5 144 144 144s144-64.5 144-144s-64.5-144-144-144zm0 224c-44.2 0-80-35.8-80-80s35.8-80 80-80s80 35.8 80 80s-35.8 80-80 80z"
          />
          <path
            fill="#fff"
            d="M893.3 293.3L730.7 130.7c-.7-.7-1.4-1.3-2.1-2c-.1-.1-.3-.2-.4-.3c-.7-.7-1.5-1.3-2.2-1.9a64 64 0 0 0-22-11.7V112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V338.5c0-17-6.7-33.2-18.7-45.2zM384 184h256v104H384V184zm456 656H184V184h136v136c0 17.7 14.3 32 32 32h320c17.7 0 32-14.3 32-32V205.8l136 136V840z"
          />
        </svg>
      </div>
    </q-page-sticky>
  </div>
</template>

<style scoped lang="scss">
.content {
  padding: 15px;
  max-width: 1000px;
  margin: 0 auto;
  height: calc(100vh - 50px);

  .el-tiptap-editor {
    height: 100%;
  }
}

.q-page-sticky {
  z-index: 200;
}

.fab {
  // padding: 20px;
  border-radius: 30px;
  height: 50px;
  width: 50px;
  background: cornflowerblue;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 8px 2px #ddd;
  cursor: pointer;
}

svg {
  width: 20px;
}
</style>
