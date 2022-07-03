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
          <ButtonAnadir :titulo="'Añadir Almacén'"/>
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
                  : 'bg-sky-800 text-sky-300 border-sky-700',
              ]">
              {{ element }}
            </th>
          </tr>
        </thead>
        <tbody v-if="almacenStore.almacenes.data && almacenStore.almacenes.data.length > 0">
          <tr v-for="almacen in almacenStore.almacenes.data" :key="almacen.id">
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
                      @click="close();">
                      <i class="fas fa-pen w-4 h-4 mr-2 -ml-1 text-amber-500"></i>
                      Editar
                    </button>
                    <button
                      class="text-sm text-left py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                      @click="close();">
                      <i class="fas fa-exclamation w-4 h-4 mr-2 -ml-1 text-red-500"></i>
                      Eliminar
                    </button>
                  </div>
                </template>
              </Popper>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div class="flex-1 flex justify-between sm:hidden md:flex-1 md:flex md:justify-between lg:hidden">
        <a href="#"
          class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Previous </a>
        <a href="#"
          class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Next </a>
      </div>
      <div
        class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between md:hidden lg:flex-1 lg:flex lg:items-center lg:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Mostrando del
            {{ ' ' }}
            <span class="font-medium">{{ almacenStore.almacenes.meta !== undefined ? almacenStore.almacenes.meta.from :
                0
            }}</span>
            {{ ' ' }}
            al
            {{ ' ' }}
            <span class="font-medium">{{ almacenStore.almacenes.meta !== undefined ? almacenStore.almacenes.meta.to : 0
            }}</span>
            {{ ' ' }}
            de
            {{ ' ' }}
            <span class="font-medium">{{ almacenStore.almacenes.meta !== undefined ? almacenStore.almacenes.meta.total :
                0
            }}</span>
            {{ ' ' }}
            registros
          </p>
        </div>
        <div>
          <paginate :page-count="lastPage" :click-handler="page => almacenStore.getAlmacenes(
          page,
          estadoBuscado,
          idBuscado,
          nombreBuscado,
          apellidoBuscado,
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

  </div>
</template>

<script setup>

import { useRouter } from "vue-router";
import { useAlmacenStore } from "../../stores/Almacenes";
import Paginate from "vuejs-paginate-next";
import Popper from "vue3-popper";
import { onMounted, ref } from "vue";
import ButtonAnadir from "../Buttons/ButtonAnadir.vue";

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
const encabezadosTabla = ['#', 'Descripción', 'Usuario Asignado', 'Activo', '']
const almacenStore = useAlmacenStore()

const lastPage = ref(1);
const showModalCrearAlmacen = ref(false);
const showModalEditarAlmacen = ref(false);
const showModalEliminarAlmacen = ref(false);

const isReady = ref(true);

onMounted(async () => {

  await almacenStore.getAlmacenes();
  lastPage.value = almacenStore.almacenes.meta.last_page;

});

</script>

<style lang="scss" scoped>
</style>