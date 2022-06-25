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
          <tr v-for="catalogoBien in grupoBienDataTable" :key="catalogoBien.id">
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
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
              <table-dropdown />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>

import TableDropdown from "../Dropdowns/TableDropdown.vue";
import { inject } from "vue";

const encabezadosTabla = ['#', 'Descripción', 'Activo', '']

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

const grupoBienDataTable = inject('formDataGrupoBien');

</script>

<style lang="scss" scoped>
</style>