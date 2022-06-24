import axios from "axios";
import { defineStore } from "pinia";

export const useBienesStore = defineStore('BienesStore', {
    state: () => ({
        bienes: null,
    }),
    actions: {
        async getBienes(){
            try {           

                const params = {
                    include: 'goodsGroup,goodsClass,warehouse'
                }
                const url = `http://api-sepulveda.test/api/v1/goods`
                const res = await axios.get(url, {params})

                this.bienes = []
                this.bienes = res.data.data
                
            } catch (error) {
                console.log(error);
            }
        }
    }
})