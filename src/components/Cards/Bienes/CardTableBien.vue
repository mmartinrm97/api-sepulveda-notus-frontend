<template>
  <!-- Tabla -->
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
    :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']">
    <!-- Header -->
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap px-4 py-4 items-center">

        <div class="relative flex w-1/3 px-4 py-2 flex-grow flex-1">
          <h3 class="font-semibold text-lg" :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']">
            {{ titulo }}
          </h3>
        </div>
        <div>
          <button
            class="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mx-3 ease-linear transition-all duration-150"
            type="button" @click="toggleModal()">
            Botón Prueba
          </button>
        </div>

      </div>

      <!-- Filtros -->

      <!-- bg-green-500 md:bg-red-500 sm:bg-sky-500 add to view rensposive design-->
      <div class="flex flex-grow items-center ">
        <!-- Búsqueda de Id -->
        <div class="relative flex w-1/5 flex-grow items-stretch m-3 sm:w-full px-4">
          <span
            class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-2">
            <i class="fas fa-search"></i>
          </span>
          <input v-model="idBuscado" type="text" placeholder="Id"
            class="placeholder-blueGray-400 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none shadow focus:shadow-outline w-full pl-10 px-3" />
        </div>
        <!-- Búsqueda de Nombre -->
        <div class="relative flex w-1/5 flex-grow items-stretch m-3 sm:w-full px-4">
          <span
            class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-2">
            <i class="fas fa-search"></i>
          </span>
          <input v-model="codigoBuscado" type="text" placeholder="Código"
            class="placeholder-blueGray-400 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none shadow focus:shadow-outline w-full pl-10 px-3" />
        </div>

        <!-- Búsqueda de Apellido -->
        <div class="relative flex w-1/5 flex-grow items-stretch m-3 sm:w-full px-4">
          <span
            class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-2">
            <i class="fas fa-search"></i>
          </span>
          <input v-model="descripcionBuscada" type="text" placeholder="Descripción"
            class="placeholder-blueGray-400 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none shadow focus:shadow-outline w-full pl-10 px-3" />
        </div>

        <!-- Filtrar por Estado -->
        <div class="relative flex flex-grow w-1/5 items-stretch m-3 sm:w-full px-4">
          <span
            class="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-2">
            <i class="fas fa-filter"></i>
          </span>
          <select v-model="estadoBuscado"
            class=" shadow px-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pl-10 pr-10">
            <option value="">Estado</option>
            <option :value='1'>Activado</option>
            <option :value='0'>Desactivado</option>
          </select>
        </div>

      </div>
    </div>
    <div class="block w-full overflow-x-auto">

      <!-- Projects table -->
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>

            <th class="px-0" v-for="element in encabezadosTabla" :key="element">
              <div
                class="border border-solid border-l-0 border-r-0 flex flex-row items-center justify-between cursor-pointer"
                :class="[
                  color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                  ordenarColumna === element.filtro ? 'font-bold text-blue-700' : ''
                ]" @click="actualizarOrden(element.filtro)">
                <div
                  class="pl-6 pr-6 align-middle border-0 border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {{ element.cabecera }}
                </div>
                <div
                  class="px-2 align-middle py-1 text-xl uppercase whitespace-nowrap font-semibold text-left border-0 border-l-0 border-r-0 select-none">
                  <span :class="{
                    'text-blue-600': ordenarDireccion === 'asc' && ordenarColumna === element.filtro,
                    'hidden': ordenarDireccion !== '' && ordenarDireccion !== 'asc' && ordenarColumna === element.filtro
                  }">&uarr;</span>
                  <span :class="{
                    'text-blue-600': ordenarDireccion === 'desc' && ordenarColumna === element.filtro,
                    'hidden': ordenarDireccion !== '' && ordenarDireccion !== 'desc' && ordenarColumna === element.filtro
                  }">&darr;</span>
                </div>
              </div>
            </th>
            <!-- Plantilla -->

            <th class="px-0">
              <div
                class="border border-solid border-l-0 border-r-0 flex flex-row items-center justify-between cursor-pointer"
                :class="[
                  color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                ]">
                <div
                  class="px-6 align-middle border-0 border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  &nbsp
                </div>

              </div>
            </th>
          </tr>
        </thead>
        <tbody v-if="bienesStore.bienes.data && bienesStore.bienes.data.length > 0">
          <tr v-for="bien in bienesStore.bienes.data" :key="bien.id">
            <td class="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap px-6  p-4 ">
              {{ bien.id }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ bien.code }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ bien.description }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ bien.warehouse.description }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ bien.goods_catalog.denomination }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <i class="fas fa-circle mr-2" :class="[bien.is_active ? 'text-green-600' : 'text-red-500']"> </i>{{
                  bien.is_active ? 'Activado' : 'Desactivado'
              }}
            </td>

            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
              <table-dropdown @click="openModal = !openModal" />
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td>&nbsp</td>
          </tr>
          <tr>
            <td align="center" colspan="7" rowsan="5">No hay registros encontrados</td>
          </tr>
          <tr>
            <td>&nbsp</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
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
          currBusquedaGlobal,
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
            :active-class="'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium'">
          </paginate>
        </div>
      </div>
    </div>

    <editar-bien :open="openModal" />

  </div>
</template>

<script setup>

import TableDropdown from "../../Dropdowns/TableDropdown.vue";
import { onMounted, provide, ref, watch } from "vue";
import Paginate from "vuejs-paginate-next";
import EditarBien from '../../../components/Modals/EditarBien.vue';
import { useBienesStore } from '../../../stores/Bienes';
import { useRouter } from 'vue-router';

const props = defineProps({
  color: {
    default: "light",
    validator: function (value) {
      // The value must match one of these strings
      return ["light", "dark"].indexOf(value) !== -1;
    },
  }
})

const emit = defineEmits(['tablaUsersLista'])

const openModal = ref(true);

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


const busquedaGlobal = ref('')
const estadoBuscado = ref('')
const idBuscado = ref('')
const codigoBuscado = ref('')
const descripcionBuscada = ref('')
const ordenarColumna = ref('created_at')
const ordenarDireccion = ref('asc')


const lastPage = ref(1);

const showModal = ref(false);
provide('showModal', showModal)

const toggleModal = (() => {
  showModal.value = !showModal.value;
  console.log("🚀 ~ file: CardTableUser.vue ~ line 308 ~ toggleModal ~ showModal", showModal.value)

})


const actualizarOrden = async (columna) => {
  ordenarColumna.value = columna
  ordenarDireccion.value = ordenarDireccion.value === 'asc' ? 'desc' : 'asc'
  await bienesStore.getBienes(
    1,
    busquedaGlobal.value,
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

});


watch([busquedaGlobal, estadoBuscado, idBuscado, codigoBuscado, descripcionBuscada], (
  [currBusquedaGlobal, currEstadoBuscado, currIdBuscado, currcodigoBuscado, currdescripcionBuscada],
  [prevBusquedaGlobal, prevEstadoBuscado, prevIdBuscado, prevcodigoBuscado, prevdescripcionBuscada]
) => {
  bienesStore.getBienes(
    1,
    currBusquedaGlobal,
    currEstadoBuscado,
    currIdBuscado,
    currcodigoBuscado,
    currdescripcionBuscada);
});

</script>

<style lang="scss" script>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>