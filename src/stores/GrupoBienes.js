import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useGrupoBienesStore = defineStore('GrupoBienesStore', () => {
    const grupoBienes = ref({})

    const getGrupoBienes = async (
        pagina = 1,
        buscarDescripcion = '',
        ordenarColumna = 'id',
        ordenarDireccion = 'asc') => {
        try {

            const params = {
                page: pagina,
                search_description: buscarDescripcion,
                order_column: ordenarColumna,
                order_direction: ordenarDireccion
            }

            const url = `${import.meta.env.VITE_APP_URL}/api/v1/goods-groups`
            const res = await axios.get(url, { params })

            grupoBienes.value = {}
            grupoBienes.value = res.data

        } catch (error) {
            console.log(error);
        }
    }

    return { grupoBienes, getGrupoBienes }
})
