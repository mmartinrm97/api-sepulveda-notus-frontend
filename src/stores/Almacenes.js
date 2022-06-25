import axios from "axios";
import { defineStore } from "pinia";

export const useAlmacenStore = defineStore('AlmacenStore', {
    state: () => ({
        almacenes: null,
    }),
    actions: {
        async getAlmacenes() {
            try {
                const params = {
                    include: 'users'
                }
                const url = `http://api-sepulveda.test/api/v1/warehouses`
                const res = await axios.get(url, { params })
                this.almacenes = []
                this.almacenes = res.data.data

            } catch (error) {
                console.log(error);
            }
        }
    }
})