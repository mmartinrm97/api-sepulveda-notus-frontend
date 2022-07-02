<template>
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
    :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']">
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap p-4 items-center">
        <div class="relative flex w-1/3 px-4 py-2 flex-grow flex-1">
          <i class="fas fa-sitemap pt-2 pr-2"></i>
          <h3 class="font-semibold text-lg" :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']">
            {{ titulo }}
          </h3>
        </div>
      </div>
    </div>
    <div class="block w-full overflow-x-auto">
      <!-- Projects table -->
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            <th v-for="element in encabezadosTabla" :key="element"
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]">
              {{ element }}
            </th>
          </tr>
        </thead>
        <tbody v-if="grupoBienStore.grupoBienes.data && grupoBienStore.grupoBienes.data.length > 0">
          <tr v-for="catalogoBien in grupoBienStore.grupoBienes.data" :key="catalogoBien.id">
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ catalogoBien.id }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <i class="mr-2"></i> {{ catalogoBien.description }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <i class="fas fa-circle mr-2" :class="[catalogoBien.is_active ? 'text-green-600' : 'text-red-500']">
              </i>{{
                  catalogoBien.is_active ? 'Activo' : 'Inactivo'
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Pagination -->
    <div v-if="paginacionLista"
      class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div class="flex-1 flex justify-between sm:hidden">
        <a href="#"
          class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Previous </a>
        <a href="#"
          class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Next </a>
      </div>
      <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Mostrando del
            {{ ' ' }}
            <span class="font-medium">{{ grupoBienStore.grupoBienes.meta !== undefined ?
                grupoBienStore.grupoBienes.meta.from : 0
            }}</span>
            {{ ' ' }}
            al
            {{ ' ' }}
            <span class="font-medium">{{ grupoBienStore.grupoBienes.meta !== undefined ?
                grupoBienStore.grupoBienes.meta.to : 0
            }}</span>
            {{ ' ' }}
            de
            {{ ' ' }}
            <span class="font-medium">{{ grupoBienStore.grupoBienes.meta !== undefined ?
                grupoBienStore.grupoBienes.meta.total : 0
            }}</span>
            {{ ' ' }}
            registros
          </p>
        </div>
        <div>
          <paginate :page-count="lastPage" :click-handler="page => grupoBienStore.getGrupoBienes(page)"
            :prev-text="'Prev'" :next-text="'Next'"
            :container-class="'relative z-0 inline-flex rounded-md shadow-sm -space-x-px cursor-pointer'"
            :page-link-class="'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50'"
            :prev-link-class="'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50'"
            :next-link-class="'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50'"
            :no-li-surround="true"
            :active-class="'z-10 bg-lightBlue-50 border-lightBlue-500 text-lightBlue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium'">
          </paginate>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>

import { onBeforeMount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useGrupoBienesStore } from "../../stores/GrupoBienes";
import Paginate from "vuejs-paginate-next";

const props = defineProps({
  titulo: String,
  color: {
    default: "light",
    validator: function (value) {
      // The value must match one of these strings
      return ["light", "dark"].indexOf(value) !== -1;
    },
  }
})

const emit = defineEmits(['tablaGrupoBienLista'])

const encabezadosTabla = ['#', 'Descripción', 'Activo', '']
const router = useRouter();
const titulo = router.currentRoute.value.meta.title
const grupoBienStore = useGrupoBienesStore()
const lastPage = ref(1)
//onMounted

const paginacionLista = ref(true);

onBeforeMount(async () => {
  await grupoBienStore.getGrupoBienes();
  lastPage.value = grupoBienStore.grupoBienes.meta.last_page;
});


</script>

<style lang="scss" scoped>
</style>