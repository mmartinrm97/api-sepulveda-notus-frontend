import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useClaseBienesStore = defineStore('ClaseBienesStore', ()=>{
    const clasesBienes = ref({})

    const getClasesBienes = async(pagina = 1) =>{
        try {           

            const params = {
                page: pagina
            }

            const url = `${import.meta.env.VITE_APP_URL}/api/v1/goods-classes`
            const res = await axios.get(url, {params})

            clasesBienes.value = {}
            clasesBienes.value = res.data
            
        } catch (error) {
            console.log(error);
        }
    }

    return {clasesBienes, getClasesBienes}

})
