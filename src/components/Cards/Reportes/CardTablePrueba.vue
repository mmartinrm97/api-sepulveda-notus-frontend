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
                    <ButtonAnadir :titulo="'Quitar selección'" @click="deselectRows" />
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

        <div class="block w-full overflow-x-auto relative" style="height: 520px">
            <AgGridVue 
            class="ag-theme-alpine w-full" 
            style="height:100%; height:100%;" 
            :columnDefs="columnDefs.value" 
            :rowData="rowData.value" 
            :defaultColDef = "defaultColDef" 
            rowSelection="multiple" 
            animateRows="true"
            @cell-clicked="cellWasClicked"
            @grid-ready="onGridReady"
            :pagination="true"
            paginationPageSize=10
            />
        </div>

        <!-- Pagination -->

    </div>

    <ModalReporte v-if="showModalReporte" :open="showModalReporte" />
</template>

<script setup>
import { onBeforeMount, onMounted, provide, reactive, ref, watch } from "vue";
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






import { AgGridVue } from 'ag-grid-vue3'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

const columnDefs = reactive({
    value: [
        { field: 'id' },
        { field: 'code' },
        { field: 'description' },
        { field: 'warehouse.description', headerName:'Área de Inventario' },
        { field: 'goods_catalog.code' },
        { field: 'is_active', cellRenderer:'adasds' },
    ]
});
const rowData = reactive({});

const gridApi = ref(null)
const columnApi = ref(null)

const onGridReady = params =>{
    gridApi.value = params.api
}

const defaultColDef= {
 sortable:true, filter: true, resizable:true
}

const cellWasClicked = (event)=>{
    console.log('cell was clicked', event);
}

const deselectRows = e =>{
    gridApi.value.sizeColumnsToFit()
}




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

const cantidadFiltros = 4;
const filtroListo = ref(false);

const showModalReporte = ref(false);

provide('showModalReporte', showModalReporte)



const generarReporte = async () => {
    showModalReporte.value = !showModalReporte.value;
    await bienesStore.generarReporte(almacenBuscadoID.value);
    showModalReporte.value = !showModalReporte.value;
}

onMounted(async () => {
    await bienesStore.getBienes();
    // console.log(bienesStore.bienes.data);
    // fetch("http://api-sepulveda.test/api/v1/goods")
    // .then((result) => {
    //     console.log(result);
    //     result.json()
    // })
    // .then((remoteRowData) => (rowData.value = remoteRowData))
    rowData.value = bienesStore.bienes.data

});

onBeforeMount(async () => {
    await almacenStore.getAllAlmacenes();
    filtroListo.value = true;
});

</script>

<style lang="scss" script>
</style>