<template>
  <!-- Tabla -->
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
    :class="[color === 'light' ? 'bg-white' : 'bg-lightBlue-900 text-white']">
    <!-- Header -->
    <div class="rounded-t mb-0 px-4 py-3 border-0">

      <div class="flex flex-wrap py-4 items-center">

        <div class="relative flex flex-grow w-full sm:w-1/3 px-4 py-2 ">
          <i class="fas fa-box-open py-2 pr-2"></i>
          <h3 class="font-semibold text-lg" :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']">
            {{ titulo }}
          </h3>
        </div>
      </div>

      <div class="flex flex-wrap items-center lg:flex-grow">
        <!-- Búsqueda por Codigo -->
        <InputSearch v-model:modelValue="codigoBuscado" :placeholder="'Código'" :cantidad-filtros="cantidadFiltros" />
        <!-- Búsqueda por Denominación -->
        <InputSearch v-model:modelValue="denominacionBuscada" :placeholder="'Denominación'"
          :cantidad-filtros="cantidadFiltros" />
      </div>

    </div>


    <div class="block w-full overflow-x-auto">

      <!-- Projects table -->
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
          <!-- Encabezado -->
          <CardTableHeader :color="'light'" :encabezados-tabla="encabezadosTabla" :ordenar-columna="ordenarColumna"
            :ordenar-direccion="ordenarDireccion" @cambiar-orden="(i) => actualizarOrden(i)" />
        </thead>

        <tbody v-if="catalogoBienStore.catalogoBienes.data && catalogoBienStore.catalogoBienes.data.length > 0">
          <tr v-for="catalogoBien in catalogoBienStore.catalogoBienes.data" class="hover:bg-lightBlue-100">
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ catalogoBien.id }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <i class="mr-2"></i> {{ catalogoBien.item }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ catalogoBien.code }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ catalogoBien.denomination }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ catalogoBien.goods_class.description }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ catalogoBien.goods_group.description }}
            </td>
          </tr>
        </tbody>
          <CardTableEmpty v-else />
      </table>
    </div>

    <!-- Pagination -->

    <CardTablePagination v-if="paginacionLista" :model-store="catalogoBienStore.catalogoBienes" :last-page="lastPage"
      :campos-paginacion="[
        codigoBuscado,
        denominacionBuscada,
        ordenarColumna,
        ordenarDireccion
      ]" :model-store-function="catalogoBienStore.getCatalogoBienes" />
  </div>
</template>

<script setup>

import { onMounted, ref, watch } from "vue";
import { useCatalogoBienStore } from "../../../stores/CatalogoBienes";
import { useRouter } from "vue-router";
import CardTableHeader from "../CardTableHeader.vue";
import CardTablePagination from "../CardTablePagination.vue";
import InputSearch from "../../Inputs/InputSearch.vue";
import CardTableEmpty from "../CardTableEmpty.vue";

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

const router = useRouter();
const titulo = router.currentRoute.value.meta.title
const catalogoBienStore = useCatalogoBienStore()

const encabezadosTabla = [
  { cabecera: 'ID', filtro: 'id' },
  { cabecera: 'Item', filtro: 'item' },
  { cabecera: 'Código', filtro: 'code' },
  { cabecera: 'Denominación', filtro: 'denomination' },
  { cabecera: 'Clase', filtro: 'goods_class_id' },
  { cabecera: 'Grupo', filtro: 'goods_group_id' },
]

const lastPage = ref(1);
const paginacionLista = ref(false);
const ordenarColumna = ref('id')
const ordenarDireccion = ref('asc')
const codigoBuscado = ref('')
const denominacionBuscada = ref('')
const cantidadFiltros = 2;


const actualizarOrden = async (columna) => {
  ordenarColumna.value = columna
  ordenarDireccion.value = ordenarDireccion.value === 'asc' ? 'desc' : 'asc'
  await catalogoBienStore.getCatalogoBienes(
    1,
    codigoBuscado.value,
    denominacionBuscada.value,
    ordenarColumna.value,
    ordenarDireccion.value
  )
}

onMounted(async () => {
  await catalogoBienStore.getCatalogoBienes();
  lastPage.value = catalogoBienStore.catalogoBienes.meta.last_page;
  paginacionLista.value = true
});

watch([codigoBuscado, denominacionBuscada], async (
  [currcodigoBuscado, currdenominacionBuscada],
  [prevcodigoBuscado, prevdenominacionBuscada]
) => {
  await catalogoBienStore.getCatalogoBienes(
    1,
    currcodigoBuscado,
    currdenominacionBuscada);

  lastPage.value = catalogoBienStore.catalogoBienes.meta.last_page;
});



</script>

<style lang="scss" scoped>
</style>