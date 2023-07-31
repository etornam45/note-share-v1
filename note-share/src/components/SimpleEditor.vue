<template>
    <div>
      <div>
        <button @click="formatText('bold')">Bold</button>
        <button @click="formatText('italic')">Italic</button>
        <button @click="formatText('underline')">Underline</button>
        <button @click="formatText('strikeThrough')">Strike-through</button>
        <button @click="formatText('justifyLeft')">Align left</button>
        <button @click="formatText('justifyCenter')">Align center</button>
        <button @click="formatText('justifyRight')">Align right</button>
        <button @click="formatText('insertOrderedList')">Ordered list</button>
        <button @click="formatText('insertUnorderedList')">Unordered list</button>
        <button @click="createLink">Link</button>
        <button @click="insertImage">Image</button>
        <button @click="insertTable">Table</button>
      </div>
      <div ref="editor" contenteditable></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SimpleEditor',
    props: {
      value: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        content: this.value,
      };
    },
    mounted() {
      this.$refs.editor.innerHTML = this.content;
    },
    methods: {
      formatText(command) {
        document.execCommand(command, false, null);
      },
      createLink() {
        const url = prompt('Enter the URL');
        document.execCommand('createLink', false, url);
      },
      insertImage() {
        const url = prompt('Enter the image URL');
        document.execCommand('insertImage', false, url);
      },
      insertTable() {
        const rows = prompt('Enter the number of rows');
        const cols = prompt('Enter the number of columns');
        let html = '<table>';
        for (let i = 0; i < rows; i++) {
          html += '<tr>';
          for (let j = 0; j < cols; j++) {
            html += '<td></td>';
          }
          html += '</tr>';
        }
        html += '</table>';
        document.execCommand('insertHTML', false, html);
      },
    },
  };
  </script>
  