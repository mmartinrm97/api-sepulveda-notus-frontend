<template>
  <div class="flex flex-wrap">
    <div class="w-full mb-12 px-4">
        <card-table-grupo-bien v-if="isVisible" titulo="Grupos de Bienes"/>
    </div>
    <div class="w-full mb-12 px-4">
    </div>
  </div>
</template>

<script setup>
import CardTableGrupoBien from '../../components/Cards/CardTableGrupoBien.vue';
import { onMounted, provide, ref } from 'vue';
import {useGrupoBienesStore} from '../../stores/GrupoBienes'

const grupoBienStore = useGrupoBienesStore()
const isVisible = ref(false)

const formData = ref([]);
provide('formDataGrupoBien', formData);

onMounted(async () => {
  await grupoBienStore.getGrupoBienes();
  formData.value = grupoBienStore.grupoBienes;
  // console.log('formData',formData.value);
  isVisible.value = true;
});

</script>

<style lang="scss" scoped>

</style>