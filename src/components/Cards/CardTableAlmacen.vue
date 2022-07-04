<template>
  <!-- Tabla -->
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
    :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']">
    <!-- Header -->
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap py-4 items-center">

        <div class="relative flex flex-grow w-full sm:w-1/2 px-4 py-2 ">
          <i class="fas fa-warehouse py-2 pr-2"></i>
          <h3 class="font-semibold text-lg  pl-2" :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']">
            {{ titulo }}
          </h3>
        </div>

        <div class="relative flex-wrap w-full sm:w-1/2 sm:grow flex justify-end">
          <ButtonAnadir :titulo="'Añadir Almacén'" @click="toggleModalCrearAlmacen()"/>
        </div>
      </div>

      <!-- Filtros -->

      <!-- bg-green-500 md:bg-red-500 sm:bg-sky-500 add to view rensposive design-->
      <div class="flex flex-wrap items-center lg:flex-grow">

        <!-- Búsqueda por Id -->
        <InputSearch v-model:modelValue="idBuscado" :placeholder="'Id'" :cantidad-filtros="cantidadFiltros" />

        <!-- Búsqueda por Descripción -->
        <InputSearch v-model:modelValue="descripcionBuscada" :placeholder="'Descripción'" :cantidad-filtros="cantidadFiltros" />

        <!-- Búsqueda por Usuario -->
        <InputSearch v-model:modelValue="usuarioBuscado" :placeholder="'Usuario Asignado'"
          :cantidad-filtros="cantidadFiltros" />

        <!-- Filtrar por Estado -->
        <InputFilter v-model:modelValue="estadoBuscado" :default-label="'Estado'" :cantidad-filtros="cantidadFiltros" />
      </div>

    </div>
    <div class="block w-full overflow-x-auto">
      <!-- Projects table -->
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
          <CardTableHeader :color="'light'" :encabezados-tabla="encabezadosTabla" :ordenar-columna="ordenarColumna"
            :ordenar-direccion="ordenarDireccion" @cambiar-orden="(i) => actualizarOrden(i)" />
        </thead>
        <tbody v-if="almacenStore.almacenes.data && almacenStore.almacenes.data.length > 0">
          <tr v-for="almacen in almacenStore.almacenes.data" :key="almacen.id" class="hover:bg-lightBlue-100">
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ almacen.id }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <i class="mr-2"></i> {{ almacen.description }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <i class="mr-2"></i>
              {{ almacen.users[0] !== undefined ?
                  `${almacen.users[0].first_name} ${almacen.users[0].last_name}` : 'No tiene usuario asignado'
              }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <i class="fas fa-circle mr-2" :class="[almacen.is_active ? 'text-green-600' : 'text-red-500']"> </i>{{
                  almacen.is_active ? 'Activo' : 'Inactivo'
              }}
            </td>

            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
              <Popper :placement="'left-start'" arrow>
                <button class="text-blueGray-500 py-1 px-3"><i class="fas fa-ellipsis-v"></i></button>
                <template #content="{ close }">
                  <div class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-xl min-w-48">
                    <button
                      class="text-sm text-left py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                      @click="close(); toggleModalEditarAlmacen(almacen)">
                      <i class="fas fa-pen w-4 h-4 mr-2 -ml-1 text-amber-500"></i>
                      Editar
                    </button>
                    <button
                      class="text-sm text-left py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                      @click="close(); toggleModalEliminarAlmacen(almacen)">
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
    <CardTablePagination v-if="paginacionLista" :model-store="almacenStore.almacenes" :last-page="lastPage"
      :campos-paginacion="[
        estadoBuscado,
        idBuscado,
        descripcionBuscada,
        usuarioBuscado,
        ordenarColumna,
        ordenarDireccion
      ]" :model-store-function="almacenStore.getAlmacenes" />

      <ModalCrearAlmacen v-if="showModalCrearAlmacen" :open="showModalCrearAlmacen" @refrescar-users="refrescarTabla" />

      <ModalEditarAlmacen v-if="showModalEditarAlmacen" :open="showModalEditarAlmacen" @refrescar-users="refrescarTabla" />

      <ModalEliminarAlmacen v-if="showModalEliminarAlmacen" :open="showModalEliminarAlmacen" @refrescar-users="refrescarTabla" />

  </div>
</template>

<script setup>

import { useRouter } from "vue-router";
import { useAlmacenStore } from "../../stores/Almacenes";
import Popper from "vue3-popper";
import { onMounted, provide, ref, watch } from "vue";
import ButtonAnadir from "../Buttons/ButtonAnadir.vue";
import InputFilter from "../Inputs/InputFilter.vue";
import InputSearch from "../Inputs/InputSearch.vue";
import CardTableHeader from "./CardTableHeader.vue";
import CardTableEmpty from "./CardTableEmpty.vue";
import CardTablePagination from "./CardTablePagination.vue";
import ModalCrearAlmacen from "../Modals/Almacen/ModalCrearAlmacen.vue";
import ModalEditarAlmacen from "../Modals/Almacen/ModalEditarAlmacen.vue";
import ModalEliminarAlmacen from "../Modals/Almacen/ModalEliminarAlmacen.vue";

const props = defineProps({
  color: {
    default: "light",
    validator: function (value) {
      // The value must match one of these strings
      return ["light", "dark"].indexOf(value) !== -1;
    },
  }
})

const titulo = useRouter().currentRoute.value.meta.title
const almacenStore = useAlmacenStore()
const encabezadosTabla = [
  { cabecera: 'ID', filtro: 'id' },
  { cabecera: 'Descripción', filtro: 'description' },
  { cabecera: 'Usuario Asignado', filtro: 'user_id' },
  { cabecera: 'Estado', filtro: 'is_active' },
]

const idBuscado = ref('')
const descripcionBuscada = ref('')
const usuarioBuscado = ref('')
const estadoBuscado = ref('')
const ordenarColumna = ref('id')
const ordenarDireccion = ref('asc')

const cantidadFiltros = 4;
const paginacionLista = ref(false);

const lastPage = ref(1);

const almacenAEditar = ref({});
const almacenAEliminar = ref({});

const showModalCrearAlmacen = ref(false);
const showModalEditarAlmacen = ref(false);
const showModalEliminarAlmacen = ref(false);

const toggleModalCrearAlmacen = (() => {
  showModalCrearAlmacen.value = !showModalCrearAlmacen.value;
  console.log('cardtable');
})

const toggleModalEditarAlmacen = ((almacen) => {
  almacenAEditar.value = almacen;
  showModalEditarAlmacen.value = !showModalEditarAlmacen.value;

})

const toggleModalEliminarAlmacen = ((almacen) => {
  almacenAEliminar.value = almacen;
  showModalEliminarAlmacen.value = !showModalEliminarAlmacen.value;
})

provide('showModalEditarAlmacen', showModalEditarAlmacen)
provide('showModalCrearAlmacen', showModalCrearAlmacen)
provide('showModalEliminarAlmacen', showModalEliminarAlmacen)
provide('almacenAEditar', almacenAEditar)
provide('almacenAEliminar', almacenAEliminar)

const actualizarOrden = async (columna) => {
  ordenarColumna.value = columna
  ordenarDireccion.value = ordenarDireccion.value === 'asc' ? 'desc' : 'asc'
  await almacenStore.getAlmacenes(
    1,
    estadoBuscado.value,
    idBuscado.value,
    descripcionBuscada.value,
    usuarioBuscado.value,
    ordenarColumna.value,
    ordenarDireccion.value
  )
}

onMounted(async () => {

  await almacenStore.getAlmacenes();
  lastPage.value = almacenStore.almacenes.meta.last_page;
  paginacionLista.value = true;

});

const refrescarTabla = (async () => {
  paginacionLista.value = false;
  await almacenStore.getAlmacenes();
  lastPage.value = almacenStore.almacenes.meta.last_page;
  paginacionLista.value = true;
})

watch([estadoBuscado, idBuscado, descripcionBuscada, usuarioBuscado], async (
  [ currEstadoBuscado, currIdBuscado, currDescripcionBuscada, currUsuarioBuscado],
  [ prevEstadoBuscado, prevIdBuscado, prevDescripcionBuscada, prevUsuarioBuscado]
) => {
  await almacenStore.getAlmacenes(
    1,
    currEstadoBuscado,
    currIdBuscado,
    currDescripcionBuscada,
    currUsuarioBuscado);  
    lastPage.value = almacenStore.almacenes.meta.last_page;
});


</script>

<style lang="scss" scoped>
</style>