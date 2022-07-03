import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCatalogoBienStore = defineStore('CatalogoBienStore', () =>{
    const catalogoBienes = ref({})
    const allCatalogoBienes = ref({})
    const catalogoBien = ref({})
    const errores = ref({})

    const getCatalogoBienes = async(
        pagina = 1,
        buscarCodigo = '',
        buscarDenomination = '',
        ordenarColumna = 'id',
        ordenarDireccion = 'asc'
    ) => {
        try {
            const params = {
                include: 'goodsGroup,goodsClass',
                page: pagina,
                search_code: buscarCodigo,
                search_denomination: buscarDenomination,
                order_column: ordenarColumna,
                order_direction: ordenarDireccion
            }
            
            const url = `${import.meta.env.VITE_APP_URL}/api/v1/goods-catalogs`
            const res = await axios.get(url, { params })
            
            catalogoBienes.value = {}
            catalogoBienes.value = res.data

        } catch (error) {
            console.log(error);
        }
    }

    const getAllCatalogoBienes = async()=>{
        try {
            const url = `${import.meta.env.VITE_APP_URL}/api/v1/goods-catalogs/all`
            const res = await axios.get(url)

            allCatalogoBienes.value = {}
            allCatalogoBienes.value = res.data

        } catch (error) {
            console.log(error);
        }
    }

    return {catalogoBien, catalogoBienes, allCatalogoBienes, getCatalogoBienes, getAllCatalogoBienes, errores}
})
