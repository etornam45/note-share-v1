<script setup>
import Shared from "./Shared.vue";
import SharedWithMe from "components/SharedWithMe.vue";
import User from "./User.vue";
</script>

<template>
  <div class="container">
    <User />
  </div>
  <div class="shared-with-me">
    <SharedWithMe />
  </div>
  <div class="shared">
    <Shared />
  </div>
</template>

<style lang="scss" scoped></style>
