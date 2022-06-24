<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
        <card-table-catalogo-bien v-if="isVisible" titulo="Catálogo de Bienes"/>
    </div>
    <div class="w-full mb-12 px-4">
    </div>
  </div>
</template>

<script setup>
import CardTableCatalogoBien from '../../components/Cards/CardTableCatalogoBien.vue';
import { onMounted, provide, ref } from 'vue';
import {useCatalogoBienStore} from '../../stores/CatalogoBien'

const catalogoBienStore = useCatalogoBienStore()
const isVisible = ref(false)

const formData = ref([]);
provide('formDataCatalogo', formData);

onMounted(async () => {
  await catalogoBienStore.getCatalogoBienes();
  formData.value = catalogoBienStore.catalogoBienes;
  // console.log('formData',formData.value);
  isVisible.value = true;
});

</script>

<style lang="scss" scoped>

</style>