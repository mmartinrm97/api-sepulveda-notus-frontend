import axios from "axios";
import { defineStore } from "pinia";

export const useClaseBienesStore = defineStore('ClaseBienesStore', {
    state: () => ({
        claseBienes: null,
    }),
    actions: {
        async getClaseBienes(){
            try {           

                const url = `http://api-sepulveda.test/api/v1/goods-classes`
                const res = await axios.get(url)

                this.claseBienes = []
                this.claseBienes = res.data.data
                
            } catch (error) {
                console.log(error);
            }
        }
    }
})