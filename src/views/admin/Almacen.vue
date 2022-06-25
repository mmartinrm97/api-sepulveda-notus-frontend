<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
        <card-table-almacen v-if="isVisible" titulo="Catálogo de Bienes" color="dark"/>
    </div>
    <div class="w-full mb-12 px-4">
    </div>
  </div>
</template>

<script setup>
import CardTableAlmacen from '../../components/Cards/CardTableAlmacen.vue';
import { onMounted, provide, ref } from 'vue';
import {useAlmacenStore} from '../../stores/Almacenes'

const almacenStore = useAlmacenStore()
const isVisible = ref(false)

const formData = ref([]);
provide('formDataAlmacen', formData);

onMounted(async () => {
  await almacenStore.getAlmacenes();
  formData.value = almacenStore.almacenes;
  // console.log('formData',formData.value);
  isVisible.value = true;
});

</script>

<style lang="scss" scoped>

</style>