<template>
  <div
    class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-base text-slate-700">
            Almacenes
          </h3>
        </div>
<!--        <div-->
<!--          class="relative w-full px-4 max-w-full flex-grow flex-1 text-right"-->
<!--        >-->
<!--          <button-->
<!--            class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"-->
<!--            type="button"-->
<!--          >-->
<!--            Ver todos-->
<!--          </button>-->
<!--        </div>-->
      </div>
    </div>
    <div class="block w-full overflow-x-auto">
      <!-- Projects table -->
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            <th
              class="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              Nombre de Almacen
            </th>
            <th
              class="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              Total Valor (S/).
            </th>
            <th
              class="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              Total Bienes
            </th>
          </tr>
        </thead>
        <tbody v-if="!isLoading">
          <tr v-for="warehouse in data" :key="warehouse.id">
            <th
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
            >
              {{warehouse.description}}
            </th>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{ warehouse.total_value.toLocaleString('es-PE', { style: 'currency', currency: 'PEN' }) }}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
<!--              <i class="fas fa-arrow-up text-emerald-500 mr-4"></i>-->
              {{ warehouse.total_goods }}
            </td>
          </tr>
<!--          <tr>-->
<!--            <th-->
<!--              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"-->
<!--            >-->
<!--              Ceballos de Chacón-->
<!--            </th>-->
<!--            <td-->
<!--              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"-->
<!--            >-->
<!--              202-->
<!--            </td>-->
<!--            <td-->
<!--              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"-->
<!--            >-->
<!--              <i class="fas fa-arrow-down text-orange-500 mr-4"></i>-->
<!--              46,53%-->
<!--            </td>-->
<!--          </tr>-->
<!--          <tr>-->
<!--            <th-->
<!--              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"-->
<!--            >-->
<!--              Lira-Bermúdez-->
<!--            </th>-->
<!--            <td-->
<!--              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"-->
<!--            >-->
<!--             193-->
<!--            </td>-->
<!--            <td-->
<!--              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"-->
<!--            >-->
<!--              <i class="fas fa-arrow-down text-orange-500 mr-4"></i>-->
<!--              36,49%-->
<!--            </td>-->
<!--          </tr>-->
<!--          <tr>-->
<!--            <th-->
<!--              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"-->
<!--            >-->
<!--              Valencia de Mejía-->
<!--            </th>-->
<!--            <td-->
<!--              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"-->
<!--            >-->
<!--              197-->
<!--            </td>-->
<!--            <td-->
<!--              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"-->
<!--            >-->
<!--              <i class="fas fa-arrow-up text-emerald-500 mr-4"></i>-->
<!--              50,87%-->
<!--            </td>-->
<!--          </tr>-->
<!--          <tr>-->
<!--            <th-->
<!--              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"-->
<!--            >-->
<!--              Villapando-Reyes-->
<!--            </th>-->
<!--            <td-->
<!--              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"-->
<!--            >-->
<!--              205-->
<!--            </td>-->
<!--            <td-->
<!--              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"-->
<!--            >-->
<!--              <i class="fas fa-arrow-down text-red-500 mr-4"></i>-->
<!--              46,53%-->
<!--            </td>-->
<!--          </tr>-->
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";

const isLoading = ref(true);

const data = ref();

onMounted(async ()=>{
  const token = localStorage.getItem('authToken');
  const urlGraphBar = `${import.meta.env.VITE_APP_URL}/api/v1/graphic-reports/warehouses-with-highest-total-value-goods`;

  const resGraphBar = await axios.get(urlGraphBar, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  data.value = resGraphBar.data.data;
  isLoading.value = false;
})

</script>

<style lang="scss" scoped>

</style>
