import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useClaseBienesStore = defineStore('ClaseBienesStore', () => {

    const clasesBienes = ref({})
    const token = localStorage.getItem('authToken');

    const getClasesBienes = async (
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

            const url = `${import.meta.env.VITE_APP_URL}/api/v1/goods-classes`
            const res = await axios.get(url, { params,
                headers: {
                    Authorization: `Bearer ${token}`
                } })

            clasesBienes.value = {}
            clasesBienes.value = res.data

        } catch (error) {
            console.log(error);
        }
    }

    return { clasesBienes, getClasesBienes }

})
