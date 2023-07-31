<template>
  <ElementTiptap :content="content" :extensions="extensions" ref="editor"/>
</template>

<script setup>
import ElementPlus from "element-plus";
import ElementTiptapPlugin from "element-tiptap-vue3-fixed";
import { ElementTiptap } from "element-tiptap-vue3-fixed";
import en from "element-tiptap-vue3-fixed/lib/locales/en";
// import ElementTiptap's styles
import "element-tiptap-vue3-fixed/lib/style.css";
import { ref } from "vue";
import { onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import PocketBase from "pocketbase";
import { useUserStore } from "src/stores/user-store";
import { getCurrentInstance } from "vue";


import * as Y from 'yjs'
import {WebrtcProvider} from 'y-webrtc'

const pb = new PocketBase("http://127.0.0.1:8090");
const useUser = useUserStore()
const $route = useRoute()
const $router = useRouter()

const ydoc = new Y.Doc(); 
const provider = new WebrtcProvider($route.params.noteId, ydoc)

import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'

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
    user:{
      name: useUser.user.name,
      color: "#DDFD9B",
    }
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

function redirectForLogin() {
  if (!useUser.user) {
    console.log("must push");
    $router.push("/signup");
  }
}

const that = getCurrentInstance();

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
      that.refs.editor.setContent(result.expand?.content.content) 
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
        that.refs.editor.setContent(result.expand?.content.content) 
      });
  }
);
</script>
