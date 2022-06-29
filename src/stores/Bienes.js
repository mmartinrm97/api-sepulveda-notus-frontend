import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useBienesStore = defineStore('bienesStore', () => {

    const bienes = ref({})

    const getBienes = async (
        pagina = 1,
        busquedaGlobal = '',
        estadoBuscado = '',
        id = '',
        buscarCodigo = '',
        buscarDescripcion = '',
        ordenarColumna = 'created_at',
        ordenarDireccion = 'desc'
    ) => {
        try {

            const params = {
                include: 'warehouse,goodsCatalog',
                page: pagina,
                search_global: busquedaGlobal,
                search_is_active: estadoBuscado,
                search_id: id,
                search_code: buscarCodigo,
                search_description: buscarDescripcion,
                order_column: ordenarColumna,
                order_direction: ordenarDireccion
            }
            const url = `${import.meta.env.VITE_APP_URL}/api/v1/goods`
            const res = await axios.get(url, { params })

            bienes.value = []
            bienes.value = res.data

        } catch (error) {
            console.log(error);
        }
    }

    return { bienes, getBienes }

})