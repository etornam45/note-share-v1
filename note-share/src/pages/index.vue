<template>
    <div class="q-pa-md q-gutter-sm">
      <q-editor
        v-model="qeditor"
        :dense="$q.screen.lt.md"
        :toolbar="[
          ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
          [
            {
              label: $q.lang.editor.align,
              icon: $q.iconSet.editor.align,
              fixedLabel: true,
              list: 'only-icons',
              options: ['left', 'center', 'right', 'justify'],
            },
          ],
          ['token', 'hr', 'link', 'custom_btn'],
          ['print', 'fullscreen'],
          [
            {
              label: $q.lang.editor.formatting,
              icon: $q.iconSet.editor.formatting,
              list: 'no-icons',
              options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
            },
            {
              label: $q.lang.editor.fontSize,
              icon: $q.iconSet.editor.fontSize,
              fixedLabel: true,
              fixedIcon: true,
              list: 'no-icons',
              options: [
                'size-1',
                'size-2',
                'size-3',
                'size-4',
                'size-5',
                'size-6',
                'size-7',
              ],
            },
            {
              label: $q.lang.editor.defaultFont,
              icon: $q.iconSet.editor.font,
              fixedIcon: true,
              list: 'no-icons',
              options: [
                'default_font',
                'arial',
                'arial_black',
                'comic_sans',
                'courier_new',
                'impact',
                'lucida_grande',
                'times_new_roman',
                'verdana',
              ],
            },
            'removeFormat',
          ],
          ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
  
          ['undo', 'redo'],
          ['viewsource'],
        ]"
        :fonts="{
          arial: 'Arial',
          arial_black: 'Arial Black',
          comic_sans: 'Comic Sans MS',
          courier_new: 'Courier New',
          impact: 'Impact',
          lucida_grande: 'Lucida Grande',
          times_new_roman: 'Times New Roman',
          verdana: 'Verdana',
        }"
      />
    </div>
  </template>
  
  <script>
  import { onUpdated, ref, watch } from "vue";
  import { useUserStore } from "src/stores/user-store";
  import { onMounted } from "vue";
  import { onBeforeRouteUpdate, useRoute } from "vue-router";
  import PocketBase from "pocketbase";
  export default {
    setup() {
      const pb = new PocketBase("http://127.0.0.1:8090");
      let useUser = useUserStore();
      const $route = useRoute();
      const qeditor = ref(
        "<pre>Check out the two different types of dropdowns" +
          ' in each of the "Align" buttons.</pre> '
      );
  
      onMounted(async () => {
        redirectForLogin();
      });
  
      function redirectForLogin() {
        if (useUser.user) {
          console.log("must push");
          $router.push("/signup");
        }
      }
  
      onMounted(async () => {
        await pb
          .collection("noteTree")
          .getOne($route.params.noteId, {
            expand: "content",
          })
          .then((result) => {
            console.log(result);
            qeditor.value = result.expand?.content.content;
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
              console.log(result);
              qeditor.value = result.expand?.content.content;
            });
        }
      );
  
      return {
        qeditor,
      };
    },
  };
  </script>
  