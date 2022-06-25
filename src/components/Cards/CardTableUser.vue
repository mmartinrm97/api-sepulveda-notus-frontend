<template>
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
    :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']">
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
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
        <tbody>
          <tr v-for="user in usersData.data" :key="user.id">
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ user.id }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <i class="mr-2"
                :class="[user.role.description === 'Administrador' ? 'fas fa-crown text-yellow-500 ' : 'fas far fa-user text-slate-900 ']"></i>
              {{ user.role.description }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ user.first_name }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ user.last_name }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ user.dni }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ user.warehouses[0] !== undefined ? user.warehouses[0].description : 'Sin Almacén' }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <i class="fas fa-circle mr-2" :class="[user.is_active ? 'text-green-600' : 'text-red-500']"> </i>{{
                  user.is_active ? 'Activo' : 'Inactivo'
              }}
            </td>

            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
              <table-dropdown />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Pagination -->
    <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div class="flex-1 flex justify-between sm:hidden">
        <a href="javascript:void(0)"
          class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Previous </a>
        <a href="javascript:void(0)"
          class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Next </a>
      </div>
      <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Mostrando
            {{ ' ' }}
            <span class="font-medium">1</span>
            {{ ' ' }}
            para
            {{ ' ' }}
            <span class="font-medium">10</span>
            {{ ' ' }}
            de
            {{ ' ' }}
            <span class="font-medium">97</span>
            {{ ' ' }}
            resultados
          </p>
        </div>
        <div>
          <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <a href="javascript:void(0)"
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span class="sr-only">First</span>
              <i class="fas fa-angle-double-left" aria-hidden="true"></i>
            </a>
            <a href="javascript:void(0)"
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span class="sr-only">Previous</span>
              <i class="fas fa-angle-left" aria-hidden="true"></i>
            </a>
            <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
            <a href="javascript:void(0)" aria-current="page"
              class="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
              1 </a>
            <a href="javascript:void(0)"
              class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
              2 </a>
            <a href="javascript:void(0)"
              class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium">
              3 </a>
            <span
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
              4 </span>
            <a href="javascript:void(0)"
              class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium">
              5 </a>
            <a href="javascript:void(0)"
              class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span class="sr-only">Next</span>
              <i class="fas fa-angle-right" aria-hidden="true"></i>
            </a>
            <a href="javascript:void(0)"
              class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span class="sr-only">Last</span>
              <i class="fas fa-angle-double-right"></i>
            </a>
          </nav>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>

import TableDropdown from "../Dropdowns/TableDropdown.vue";
import { inject } from "vue";

const encabezadosTabla = ['#', 'Rol', 'Nombres', 'Apellidos', 'DNI', 'Área Encargada', 'Activo', '']

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

const { color, titulo } = props

const usersDataInject = inject('formData');
const usersData = usersDataInject.value;

</script>

<style lang="scss" scoped>
</style>