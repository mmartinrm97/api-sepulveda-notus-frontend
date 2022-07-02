import axios from "axios";
import { defineStore } from "pinia";

export const useAlmacenStore = defineStore('AlmacenStore', {
    state: () => ({
        almacenes: null,
        allAlmacenes: null,
    }),
    actions: {
        async getAlmacenes() {
            try {
                const params = {
                    include: 'users'
                }
                const url = `${import.meta.env.VITE_APP_URL}/api/v1/warehouses`
                const res = await axios.get(url, { params })
                this.almacenes = []
                this.almacenes = res.data

            } catch (error) {
                console.log(error);
            }
        },
        async getAllAlmacenes() {
            try {
                const url = `${import.meta.env.VITE_APP_URL}/api/v1/warehouses/all`
                const res = await axios.get(url)

                this.allAlmacenes = []
                this.allAlmacenes = res.data

            } catch (error) {
                console.log(error);
            }
        }
    }
})