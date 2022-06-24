<template>
    <div>
        <h1>Bienes</h1>

        {{bienStore.bienes}}
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useBienesStore } from '../stores/Bienes';

const bienStore = useBienesStore()

onMounted(async () => {
    await bienStore.getBienes()
});
</script>

<style lang="scss" scoped>

</style>