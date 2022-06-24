<template>
    <div>
        <h1>Usuarios</h1>

        {{userStore.users}}
    </div>
</template>

<script setup>

import { onMounted } from 'vue';
import { useUserStore } from '../stores/Users';

const userStore = useUserStore()

onMounted(async () => {
    await userStore.getUsuarios()
});

</script>

<style lang="scss" scoped>
</style>