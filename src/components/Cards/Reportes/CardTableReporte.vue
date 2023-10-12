<template>
    <!-- Tabla -->
    <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
        :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']">
        <!-- Header -->
        <div class="rounded-t mb-0 px-4 py-3 border-0">
            <div class="flex flex-wrap py-4 items-center">

                <div class="relative flex flex-grow w-full sm:w-1/2 px-4 py-2 ">
                    <i class="fas fa-file-alt py-2 pr-2"></i>
                    <h3 class="font-semibold text-lg pl-2"
                        :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']">
                        {{ titulo }}
                    </h3>
                </div>
                <div class="relative flex-wrap w-full sm:w-1/2 sm:grow flex justify-end">
                    <ButtonAnadir :titulo="'Generar Reporte'" @click="generarReporte" />
                </div>

            </div>

            <!-- Filtros -->

            <!-- bg-green-500 md:bg-red-500 sm:bg-sky-500 add to view rensposive design-->
            <div class="flex flex-wrap items-center lg:flex-grow  ">

                <!-- Filtrar por Área(Almacen) -->
                <InputFilter v-if="filtroListo" v-model:modelValue="almacenBuscadoID" :default-label="'Área'"
                    :cantidad-filtros="cantidadFiltros" :data-options="almacenStore.allAlmacenes" />
            </div>
        </div>

        <div class="block w-full overflow-x-auto relative">

            <!-- Projects table -->
            <div class="overflow-x-auto relative shadow-md mx-0 rounded-none sm:mx-8 sm:mb-6 sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-800 dark:text-gray-400">

                    <!-- Encabezado -->
                    <card-table-header :color="'light'" :encabezados-tabla="encabezadosTabla"
                        :ordenar-columna="ordenarColumna" :ordenar-direccion="ordenarDireccion"
                        @cambiar-orden="(i) => actualizarOrden(i)" />

                    <tbody v-if="bienesStore.bienes.data && bienesStore.bienes.data.length > 0">
                        <tr v-for="(bien,i) in bienesStore.bienes.data" :key="bien.id" class="border-b"
              :class="[color === 'light' ? 'hover:bg-lightBlue-100' : 'hover:bg-lightBlue-100 hover:text-black', i % 2 === 0 ? 'bg-white' : 'bg-warmGray-50']">
                            <td
                                class="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap px-6  p-4 ">
                                {{ bien.id }}
                            </td>
                            <td
                                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {{ bien.code }}
                            </td>
                            <td
                                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {{ bien.goods_catalog.denomination }}
                            </td>
                            <td
                                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {{ bien.warehouse.description }}
                            </td>
                            <td
                                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {{ bien.goods_catalog.denomination }}
                            </td>
                            <td
                                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <i class="fas fa-circle mr-2"
                                    :class="[bien.is_active ? 'text-green-600' : 'text-red-500']">
                                </i>{{
                                        bien.is_active ? 'Activado' : 'Desactivado'
                                }}
                            </td>
                        </tr>
                    </tbody>
                    <CardTableEmpty v-else />
                </table>
            </div>
        </div>

        <!-- Pagination -->

        <CardTablePagination v-if="paginacionLista" :model-store="bienesStore.bienes" :last-page="lastPage"
            :campos-paginacion="[
                estadoBuscado,
                idBuscado,
                codigoBuscado,
                descripcionBuscada,
                ordenarColumna,
                ordenarDireccion,
                almacenBuscadoID
            ]" :model-store-function="bienesStore.getBienes" />

    </div>

    <ModalReporte v-if="showModalReporte"  />
</template>

<script setup>

import { onBeforeMount, onMounted, provide, ref, watch } from "vue";
import { useBienesStore } from '../../../stores/Bienes';
import { useRouter } from 'vue-router';
import ButtonAnadir from "../../Buttons/ButtonAnadir.vue";
import InputFilter from "../../Inputs/InputFilter.vue";
import CardTableHeader from "../CardTableHeader.vue";
import CardTableEmpty from "../CardTableEmpty.vue";
import CardTablePagination from "../CardTablePagination.vue";
import { useAlmacenStore } from "../../../stores/Almacenes";
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';
import ModalFormPrueba from "../../Modals/ModalFormPrueba.vue";
import ModalEliminarUser from "../../Modals/User/ModalEliminarUser.vue";
import ModalReporte from "../../Modals/Reporte/ModalReporte.vue";


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
const almacenStore = useAlmacenStore()

const encabezadosTabla = [
    { cabecera: 'ID', filtro: 'id' },
    { cabecera: 'Código Inv', filtro: 'code' },
    { cabecera: 'Descripción Bien', filtro: 'description' },
    { cabecera: 'Área de Inventario', filtro: 'warehouse_id' },
    { cabecera: 'Catálogo de Bien', filtro: 'goods_catalog_id' },
    { cabecera: 'Estado', filtro: 'is_active' },
]

const almacenBuscadoID = ref('')
const idBuscado = ref('')
const estadoBuscado = ref('')
const codigoBuscado = ref('')
const descripcionBuscada = ref('')
const ordenarColumna = ref('id')
const ordenarDireccion = ref('asc')

const lastPage = ref(1);

const paginacionLista = ref(false);
const cantidadFiltros = 4;
const filtroListo = ref(false);

const showModalReporte = ref(false);

provide('showModalReporte', showModalReporte)

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

const generarReporte = async () => {
    showModalReporte.value = !showModalReporte.value;
    await bienesStore.generarReporte(almacenBuscadoID.value);
    showModalReporte.value = !showModalReporte.value;
}

onMounted(async () => {
    await bienesStore.getBienes();
    lastPage.value = bienesStore.bienes.meta.last_page;
    paginacionLista.value = true;
});

onBeforeMount(async () => {
    await almacenStore.getAllAlmacenes();
    filtroListo.value = true;
})



watch([almacenBuscadoID], async (
    [currAlmacenBuscadoID],
    [prevAlmacenBuscadoID]
) => {
    await bienesStore.getBienes(
        1,
        '',
        '',
        '',
        '',
        'id',
        'asc',
        currAlmacenBuscadoID);

    lastPage.value = bienesStore.bienes.meta.last_page;
});

</script>

<style lang="scss" script>
</style>
