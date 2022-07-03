import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAlmacenStore = defineStore('AlmacenStore', ()=>{
    const almacenes = ref({})
    const allAlmacenes = ref({})

    const getAlmacenes = async (
        pagina = 1,
        busquedaGlobal = '',
        estadoBuscado = '',
        id = '',
        buscarCodigo = '',
        buscarDescripcion = '',
        ordenarColumna = 'id',
        ordenarDireccion = 'asc')=>{
        try {
            const params = {
                include: 'users',
                page: pagina,
                search_global: busquedaGlobal,
                search_is_active: estadoBuscado,
                search_id: id,
                search_code: buscarCodigo,
                search_description: buscarDescripcion,
                order_column: ordenarColumna,
                order_direction: ordenarDireccion
            }
            const url = `${import.meta.env.VITE_APP_URL}/api/v1/warehouses`
            const res = await axios.get(url, { params })
            almacenes.value = {}
            almacenes.value = res.data

        } catch (error) {
            console.log(error);
        }
    }

    const getAllAlmacenes = async () =>{
        try {
            const url = `${import.meta.env.VITE_APP_URL}/api/v1/warehouses/all`
            const res = await axios.get(url)

            allAlmacenes.value = {}
            allAlmacenes.value = res.data

        } catch (error) {
            console.log(error);
        }
    }

    return {almacenes, allAlmacenes, getAlmacenes, getAllAlmacenes}
})
