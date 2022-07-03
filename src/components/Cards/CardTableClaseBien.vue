<template>
  <!-- Tabla -->
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
    :class="[color === 'light' ? 'bg-white' : 'bg-lightBlue-900 text-white']">
    <!-- Header -->
    <div class="rounded-t mb-0 px-4 py-3 border-0">

      <div class="flex flex-wrap py-4 items-center">

        <div class="relative flex w-1/3 px-4 py-2 flex-grow flex-1">
          <i class="fas fa-sitemap pt-2 pr-2"></i>
          <h3 class="font-semibold text-lg" :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']">
            {{ titulo }}
          </h3>
        </div>

      </div>

      <div class="flex flex-wrap items-center lg:flex-grow">
        <!-- Búsqueda por Descripción -->
        <InputSearch v-model:modelValue="descripcionBuscada" :placeholder="'Descripción'"
          :cantidad-filtros="cantidadFiltros" />
      </div>

    </div>

    <div class="block w-full overflow-x-auto">

      <!-- Projects table -->
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
          <CardTableHeader :color="'light'" :encabezados-tabla="encabezadosTabla" :ordenar-columna="ordenarColumna"
            :ordenar-direccion="ordenarDireccion" @cambiar-orden="(i) => actualizarOrden(i)" />
        </thead>

        <tbody v-if="claseBienStore.clasesBienes.data && claseBienStore.clasesBienes.data.length > 0">
          <tr v-for="claseBien in claseBienStore.clasesBienes.data" :key="claseBien.id">
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ claseBien.id }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <i class="mr-2"></i> {{ claseBien.description }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <i class="fas fa-circle mr-2" :class="[claseBien.is_active ? 'text-green-600' : 'text-red-500']">
              </i>{{
                  claseBien.is_active ? 'Activo' : 'Inactivo'
              }}
            </td>
          </tr>
        </tbody>
          <CardTableEmpty v-else />
      </table>
    </div>
    <!-- Pagination -->
    <CardTablePagination v-if="paginacionLista" :model-store="claseBienStore.clasesBienes" :last-page="lastPage"
      :campos-paginacion="[
        descripcionBuscada,
        ordenarColumna,
        ordenarDireccion
      ]" :model-store-function="claseBienStore.getClasesBienes" />

  </div>
</template>

<script setup>

import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useClaseBienesStore } from "../../stores/ClaseBienes";
import InputSearch from "../Inputs/InputSearch.vue";
import CardTableHeader from "./CardTableHeader.vue";
import CardTablePagination from "./CardTablePagination.vue";
import CardTableEmpty from "./CardTableEmpty.vue";

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

const encabezadosTabla = [
  { cabecera: 'ID', filtro: 'id' },
  { cabecera: 'Descripción', filtro: 'description' },
  { cabecera: 'Activo', filtro: 'is_active' }
]

const router = useRouter();
const titulo = router.currentRoute.value.meta.title
const claseBienStore = useClaseBienesStore()


const lastPage = ref(1);
const paginacionLista = ref(false);
const ordenarColumna = ref('id')
const ordenarDireccion = ref('asc')
const descripcionBuscada = ref('')
const cantidadFiltros = 1;

const actualizarOrden = async (columna) => {
  ordenarColumna.value = columna
  ordenarDireccion.value = ordenarDireccion.value === 'asc' ? 'desc' : 'asc'
  await claseBienStore.getClasesBienes(
    1,
    descripcionBuscada.value,
    ordenarColumna.value,
    ordenarDireccion.value
  )
}

onMounted(async () => {
  await claseBienStore.getClasesBienes();
  lastPage.value = claseBienStore.clasesBienes.meta.last_page;
  paginacionLista.value = true
});

watch([descripcionBuscada], async (
  [currdescripcionBuscada],
  [prevdescripcionBuscada]
) => {
  await claseBienStore.getClasesBienes(
    1,
    currdescripcionBuscada);
  lastPage.value = claseBienStore.clasesBienes.meta.last_page;
});

</script>

<style lang="scss" scoped>
</style>