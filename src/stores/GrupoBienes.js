import axios from "axios";
import { defineStore } from "pinia";

export const useGrupoBienesStore = defineStore('GrupoBienesStore', {
    state: () => ({
        grupoBienes: null,
    }),
    actions: {
        async getGrupoBienes(){
            try {         

                const url = `${import.meta.env.VITE_APP_URL}/api/v1/goods-groups`
                const res = await axios.get(url)

                this.grupoBienes = []
                this.grupoBienes = res.data.data
                
            } catch (error) {
                console.log(error);
            }
        }
    }
})