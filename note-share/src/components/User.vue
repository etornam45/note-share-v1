<script setup>
import { useUserStore } from 'src/stores/user-store';

let userStore = useUserStore()


// hsl(291.25deg 100% 50% / 25%)


</script>

<template>
  <div class="user">
    <!-- From DiceBear -->
    <img height="60" width="60" :src="`https://api.dicebear.com/6.x/avataaars-neutral/svg?seed=${userStore.user.username}`" alt="User Avatar">
    <p>{{ userStore.user.name }}</p>
    <a>@{{ userStore.user.username }}</a>
    <a :href="`mailto:${userStore.user.email}`">{{ userStore.user.email }}</a>
  </div>
</template>

<style lang="scss" scoped>

.user{
    height: 250px;
    background: hsl(291.25deg 100% 50% / 25%);

    padding: 20px;

    display: flex;
    // align-items: flex-end;
    justify-content: flex-end;
    flex-direction: column;

    img{
        height: 70px;
        width: 70px;
        border-radius: 5px;
    }

    p{
        margin: 0;
        font-weight: bolder;
        margin-top: 20px;
    }

    a{
        font-weight: light;
        color: blueviolet;
        text-decoration: underline;
        cursor: pointer;
    }
}

</style>