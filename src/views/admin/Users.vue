<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <card-table-user titulo="Usuarios"/>
    </div>
    <div class="w-full mb-12 px-4">
    </div>
  </div>
</template>

<script setup>
import CardTableUser from '../../components/Cards/CardTableUser.vue';

// import { onMounted, provide, ref } from 'vue';
// import { useUserStore } from '../../stores/Users';

// const userStore = useUserStore()
// const isVisible = ref(true)

// const formData = ref([]);
// provide('formData', formData)

// onMounted(async () => {
//   await userStore.getUsers(1);
//   formData.value = userStore.users;
//   // console.log('formData',formData.value);
//   isVisible.value = true;
// });


</script>

<style lang="scss" scoped>
</style>