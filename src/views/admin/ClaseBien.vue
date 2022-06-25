<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
        <card-table-clase-bien v-if="isVisible" titulo="Clases de Bienes" />
    </div>
    <div class="w-full mb-12 px-4">
    </div>
  </div>
</template>

<script setup>
import CardTableClaseBien from '../../components/Cards/CardTableClaseBien.vue';
import { onMounted, provide, ref } from 'vue';
import {useClaseBienesStore} from '../../stores/ClaseBienes'

const claseBienStore = useClaseBienesStore()
const isVisible = ref(false)

const formData = ref([]);
provide('formDataClaseBien', formData);

onMounted(async () => {
  await claseBienStore.getClaseBienes();
  formData.value = claseBienStore.claseBienes;
  console.log('formData',formData.value);
  isVisible.value = true;
});

</script>

<style lang="scss" scoped>

</style>