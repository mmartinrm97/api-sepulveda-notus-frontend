<template>
  <!-- Tabla -->
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
    :class="[color === 'light' ? 'bg-white' : 'bg-lightBlue-900 text-white']">
    <!-- Header -->
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap py-4 items-center">

        <div class="relative flex flex-grow w-full sm:w-1/2 px-4 py-2 ">
          <i class="fas fa-users py-2 pr-2"></i>
          <h3 class="font-semibold text-lg pl-2" :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']">
            {{ titulo }}
          </h3>
        </div>
        <div class="relative flex-wrap w-full sm:w-1/2 sm:grow flex justify-end">
          <ButtonAnadir :titulo="'Añadir Bien'" @click="toggleModalCrearBien()" />
        </div>

      </div>

      <!-- Filtros -->

      <!-- lg:flex-grow bg-green-500 sm:bg-sky-500 md:bg-red-500 lg:bg-yellow-500 add to view rensposive design-->
      <div class="flex flex-wrap items-center ">

        <!-- Búsqueda por Id -->
        <InputSearch v-model:modelValue="idBuscado" :placeholder="'Id'" :cantidad-filtros="cantidadFiltros" />

        <!-- Búsqueda por Codigo -->
        <InputSearch v-model:modelValue="codigoBuscado" :placeholder="'Código'" :cantidad-filtros="cantidadFiltros" />

        <!-- Búsqueda por Descripción -->
        <InputSearch v-model:modelValue="descripcionBuscada" :placeholder="'Descripción'"
          :cantidad-filtros="cantidadFiltros" />

        <!-- Filtrar por Estado -->
        <InputFilter v-model:modelValue="estadoBuscado" :default-label="'Estado'" :cantidad-filtros="cantidadFiltros" />
      </div>
    </div>

    <div class="block w-full overflow-x-auto relative">

      <!-- Projects table -->

      <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">

          <thead class="text-xs text-white uppercase bg-slate-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="py-3 px-6">
                Product name
              </th>
              <th scope="col" class="py-3 px-6">
                <div class="flex items-center">
                  Color
                  <a href="#"><svg xmlns="http://www.w3.org/2000/svg" class="ml-1 w-3 h-3" aria-hidden="true"
                      fill="currentColor" viewBox="0 0 320 512">
                      <path
                        d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z">
                      </path>
                    </svg></a>
                </div>
              </th>
              <th scope="col" class="py-3 px-6">
                <div class="flex items-center">
                  Category
                  <a href="#"><svg xmlns="http://www.w3.org/2000/svg" class="ml-1 w-3 h-3" aria-hidden="true"
                      fill="currentColor" viewBox="0 0 320 512">
                      <path
                        d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z">
                      </path>
                    </svg></a>
                </div>
              </th>
              <th scope="col" class="py-3 px-6">
                <div class="flex items-center">
                  Accesories
                  <a href="#"><svg xmlns="http://www.w3.org/2000/svg" class="ml-1 w-3 h-3" aria-hidden="true"
                      fill="currentColor" viewBox="0 0 320 512">
                      <path
                        d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z">
                      </path>
                    </svg></a>
                </div>
              </th>
              <th scope="col" class="py-3 px-6">
                <div class="flex items-center">
                  Available
                  <a href="#"><svg xmlns="http://www.w3.org/2000/svg" class="ml-1 w-3 h-3" aria-hidden="true"
                      fill="currentColor" viewBox="0 0 320 512">
                      <path
                        d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z">
                      </path>
                    </svg></a>
                </div>
              </th>
              <th scope="col" class="py-3 px-6">
                <div class="flex items-center">
                  Price
                  <a href="#"><svg xmlns="http://www.w3.org/2000/svg" class="ml-1 w-3 h-3" aria-hidden="true"
                      fill="currentColor" viewBox="0 0 320 512">
                      <path
                        d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z">
                      </path>
                    </svg></a>
                </div>
              </th>
              <th scope="col" class="py-3 px-6">
                <div class="flex items-center">
                  Weight
                  <a href="#"><svg xmlns="http://www.w3.org/2000/svg" class="ml-1 w-3 h-3" aria-hidden="true"
                      fill="currentColor" viewBox="0 0 320 512">
                      <path
                        d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z">
                      </path>
                    </svg></a>
                </div>
              </th>
              <th scope="col" class="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="index in 10" :key="index"
              class="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              :class="[index % 2 === 0 ? 'bg-warmGray-50' : 'bg-white']">
              <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Apple MacBook Pro 17"
              </th>
              <td class="py-4 px-6">
                Sliver
              </td>
              <td class="py-4 px-6">
                Laptop
              </td>
              <td class="py-4 px-6">
                Yes
              </td>
              <td class="py-4 px-6">
                Yes
              </td>
              <td class="py-4 px-6">
                $2999
              </td>
              <td class="py-4 px-6">
                3.0 lb.
              </td>
              <td class="flex items-center py-4 px-6 space-x-3">
                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
      <nav class="flex justify-between items-center p-4" aria-label="Table navigation">
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span
            class="font-semibold text-gray-900 dark:text-white">1-10</span> of <span
            class="font-semibold text-gray-900 dark:text-white">1000</span></span>
        <ul class="inline-flex items-center -space-x-px">
          <li>
            <a href="#"
              class="py-2 px-3 leading-tight rounded-l-lg text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"><i
                class="fas fa-angle-left"></i></a>
          </li>
          <li>
            <a href="#"
              class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
          </li>
          <li>
            <a href="#"
              class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
          </li>
          <li>
            <a href="#" aria-current="page"
              class="z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
          </li>
          <li>
            <a href="#"
              class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
          </li>
          <li>
            <a href="#"
              class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
          </li>
          <li>
            <a href="#"
              class="py-2 px-3 leading-tight rounded-r-lg text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"><i
                class="fas fa-angle-right"></i></a>
          </li>
        </ul>
      </nav>





    </div>

    <!-- Pagination -->
    <!-- <div v-if="paginacionLista" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
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
            <span class="font-medium">{{ bienesStore.bienes.meta !== undefined ? bienesStore.bienes.meta.from : 0
            }}</span>
            {{ ' ' }}
            al
            {{ ' ' }}
            <span class="font-medium">{{ bienesStore.bienes.meta !== undefined ? bienesStore.bienes.meta.to : 0
            }}</span>
            {{ ' ' }}
            de
            {{ ' ' }}
            <span class="font-medium">{{ bienesStore.bienes.meta !== undefined ? bienesStore.bienes.meta.total : 0
            }}</span>
            {{ ' ' }}
            registros
          </p>
        </div>
        <div>
          <paginate :page-count="lastPage" :click-handler="page => bienesStore.getBienes(
          page,
          
          estadoBuscado,
          idBuscado,
          codigoBuscado,
          descripcionBuscada,
          ordenarColumna,
          ordenarDireccion)" :prev-text="'Prev'" :next-text="'Next'"
            :container-class="'relative z-0 inline-flex rounded-md shadow-sm -space-x-px cursor-pointer'"
            :page-link-class="'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50'"
            :prev-link-class="'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50'"
            :next-link-class="'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50'"
            :no-li-surround="true"
            :active-class="'z-10 bg-lightBlue-50 border-lightBlue-500 text-lightBlue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium'">
          </paginate>
        </div>
      </div>
    </div> -->

    <!-- <CardTablePagination v-if="paginacionLista" :model-store="bienesStore.bienes" :last-page="lastPage"
      :campos-paginacion="[
        estadoBuscado,
        idBuscado,
        codigoBuscado,
        descripcionBuscada,
        ordenarColumna,
        ordenarDireccion
      ]" :model-store-function="bienesStore.getBienes" /> -->

    <modal-crear-bien v-if="showModalCrearBien" :open="showModalCrearBien" @refrescar-users="refrescarTabla" />

    <modal-editar-bien v-if="showModalEditarBien" :open="showModalEditarBien" @refrescar-users="refrescarTabla" />

    <modal-eliminar-bien v-if="showModalEliminarBien" :open="showModalEliminarBien" @refrescar-users="refrescarTabla" />


  </div>
</template>

<script setup>

import { onMounted, provide, ref, watch } from "vue";
import { useBienesStore } from '../../../stores/Bienes';
import { useRouter } from 'vue-router';
import ModalEditarBien from '../../../components/Modals/Bien/ModalEditarBien.vue';
import ModalCrearBien from '../../../components/Modals/Bien/ModalCrearBien.vue';
import ModalEliminarBien from '../../../components/Modals/Bien/ModalEliminarBien.vue';
import Popper from "vue3-popper";
import ButtonAnadir from "../../Buttons/ButtonAnadir.vue";
import InputSearch from "../../Inputs/InputSearch.vue";
import InputFilter from "../../Inputs/InputFilter.vue";
import CardTableHeader from "../CardTableHeader.vue";
import CardTableEmpty from "../CardTableEmpty.vue";
import CardTablePagination from "../CardTablePagination.vue";

const props = defineProps({
  color: {
    default: "light",
    validator: function (value) {
      // The value must match one of these strings
      return ["light", "dark"].indexOf(value) !== -1;
    },
  }
})

const router = useRouter();
const titulo = router.currentRoute.value.meta.title
const bienesStore = useBienesStore()

const encabezadosTabla = [
  { cabecera: 'ID', filtro: 'id' },
  { cabecera: 'Código', filtro: 'code' },
  { cabecera: 'Descripción', filtro: 'description' },
  { cabecera: 'Área de Inventario', filtro: 'warehouse_id' },
  { cabecera: 'Catálogo de Bien', filtro: 'goods_catalog_id' },
  { cabecera: 'Estado', filtro: 'is_active' },
]

const estadoBuscado = ref('')
const idBuscado = ref('')
const codigoBuscado = ref('')
const descripcionBuscada = ref('')
const ordenarColumna = ref('id')
const ordenarDireccion = ref('asc')

const lastPage = ref(1);

const bienAEditar = ref({});
const bienAEliminar = ref({});

const paginacionLista = ref(false);
const cantidadFiltros = 4;

const showModalCrearBien = ref(false);
const showModalEditarBien = ref(false);
const showModalEliminarBien = ref(false);


const toggleModalCrearBien = (() => {
  showModalCrearBien.value = !showModalCrearBien.value;
})

const toggleModalEditarBien = ((bien) => {
  bienAEditar.value = bien;
  showModalEditarBien.value = !showModalEditarBien.value;

})

const toggleModalEliminarBien = ((bien) => {
  bienAEliminar.value = bien;
  showModalEliminarBien.value = !showModalEliminarBien.value;
})

provide('showModalEditarBien', showModalEditarBien)
provide('showModalCrearBien', showModalCrearBien)
provide('showModalEliminarBien', showModalEliminarBien)
provide('bienAEditar', bienAEditar)
provide('bienAEliminar', bienAEliminar)


const actualizarOrden = async (columna) => {
  ordenarColumna.value = columna
  ordenarDireccion.value = ordenarDireccion.value === 'asc' ? 'desc' : 'asc'
  await bienesStore.getBienes(
    1,
    estadoBuscado.value,
    idBuscado.value,
    codigoBuscado.value,
    descripcionBuscada.value,
    ordenarColumna.value,
    ordenarDireccion.value
  )
}

onMounted(async () => {
  await bienesStore.getBienes();
  lastPage.value = bienesStore.bienes.meta.last_page;
  paginacionLista.value = true;
});


const refrescarTabla = (async () => {
  paginacionLista.value = false;
  await bienesStore.getBienes();
  lastPage.value = bienesStore.bienes.meta.last_page;
  paginacionLista.value = true;
})


watch([estadoBuscado, idBuscado, codigoBuscado, descripcionBuscada], async (
  [currEstadoBuscado, currIdBuscado, currcodigoBuscado, currdescripcionBuscada],
  [prevBusquedaGlobal, prevEstadoBuscado, prevIdBuscado, prevcodigoBuscado, prevdescripcionBuscada]
) => {
  await bienesStore.getBienes(
    1,

    currEstadoBuscado,
    currIdBuscado,
    currcodigoBuscado,
    currdescripcionBuscada);

  lastPage.value = bienesStore.bienes.meta.last_page;
});

</script>

<style lang="scss" script>
</style>