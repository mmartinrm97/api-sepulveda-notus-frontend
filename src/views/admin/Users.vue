<template>

  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
        <card-table-user titulo="Usuarios"/>
    </div>
    <div class="w-full mb-12 px-4">

    </div>
  </div>
    <div>
        <h1>Usuarios</h1>

        {{userStore.users}}
    </div>
</template>

<script setup>
import CardTableUser from '../../components/Cards/CardTableUser.vue';

import { onMounted, provide } from 'vue';
import { useUserStore } from '../../stores/Users';

const userStore = useUserStore()

onMounted(async () => {
    await userStore.getUsuarios()
});

provide('message','hola')

</script>

<style lang="scss" scoped>
</style>