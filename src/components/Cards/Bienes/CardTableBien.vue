<template>
  <!-- Tabla -->
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
    :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']">
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
        <InputSearch v-model:modelValue="codigoBuscado" :placeholder="'Código'" :cantidad-filtros="cantidadFiltros"/>

        <!-- Búsqueda por Descripción -->
        <InputSearch v-model:modelValue="descripcionBuscada" :placeholder="'Descripción'" :cantidad-filtros="cantidadFiltros"/>

        <!-- Filtrar por Estado -->
        <InputFilter v-model:modelValue="estadoBuscado" :default-label="'Estado'" :cantidad-filtros="cantidadFiltros"/>
      </div>
    </div>

    <div class="block w-full overflow-x-auto relative">

      <!-- Projects table -->
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
          <!-- Encabezado -->
          <!-- <tr>
            <th class="px-0" v-for="element in encabezadosTabla" :key="element">
              <div
                class="border border-solid border-l-0 border-r-0 flex flex-row items-center justify-between cursor-pointer"
                :class="[
                  color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700',
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
            <th class="px-0">
              <div
                class="border border-solid border-l-0 border-r-0 flex flex-row items-center justify-between cursor-pointer"
                :class="[
                  color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700',
                ]">
                <div
                  class="px-6 align-middle border-0 border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  &nbsp
                </div>

              </div>
            </th>
          </tr> -->

          <card-table-header :color="'light'" :encabezados-tabla="encabezadosTabla" :ordenar-columna="ordenarColumna"
            :ordenar-direccion="ordenarDireccion" @cambiar-orden="(i) => actualizarOrden(i)" />

        </thead>
        <tbody v-if="bienesStore.bienes.data && bienesStore.bienes.data.length > 0">
          <tr v-for="bien in bienesStore.bienes.data" :key="bien.id" class="hover:bg-lightBlue-100">
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

            <!-- Acciones -->
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
              <Popper :placement="'left-start'" arrow>
                <button class="text-blueGray-500 py-1 px-3"><i class="fas fa-ellipsis-v"></i></button>
                <template #content="{ close }">
                  <div class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-xl min-w-48">
                    <button
                      class="text-sm text-left py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                      @click="close(); toggleModalEditarBien(bien);">
                      <i class="fas fa-pen w-4 h-4 mr-2 -ml-1 text-amber-500"></i>
                      Editar
                    </button>
                    <button
                      class="text-sm text-left py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                      @click="close(); toggleModalEliminarBien(bien)">
                      <i class="fas fa-exclamation w-4 h-4 mr-2 -ml-1 text-red-500"></i>
                      Eliminar
                    </button>
                  </div>
                </template>
              </Popper>
            </td>

          </tr>
        </tbody>
        <CardTableEmpty v-else />
      </table>
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

    <CardTablePagination v-if="paginacionLista" :model-store="bienesStore.bienes" :last-page="lastPage" :campos-paginacion="[
      estadoBuscado,
      idBuscado,
      codigoBuscado,
      descripcionBuscada,
      ordenarColumna,
      ordenarDireccion
    ]" :model-store-function="bienesStore.getBienes" />

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
  [ currEstadoBuscado, currIdBuscado, currcodigoBuscado, currdescripcionBuscada],
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