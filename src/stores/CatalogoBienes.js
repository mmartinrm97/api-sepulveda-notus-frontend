import axios from "axios";
import { defineStore } from "pinia";

export const useCatalogoBienStore = defineStore('CatalogoBienStore', {
    state: () => ({
        catalogoBienes: null,
        allCatalogoBienes: null
    }),
    actions: {
        async getCatalogoBienes() {
            try {
                const params = {
                    include: 'goodsGroup,goodsClass'
                }
                const url = `${import.meta.env.VITE_APP_URL}/api/v1/goods-catalogs`
                const res = await axios.get(url, { params })

                this.catalogoBienes = []
                this.catalogoBienes = res.data

            } catch (error) {
                console.log(error);
            }
        },
        async getAllCatalogoBienes() {
            try {
                const url = `${import.meta.env.VITE_APP_URL}/api/v1/goods-catalogs/all`
                const res = await axios.get(url)

                this.allCatalogoBienes = []
                this.allCatalogoBienes = res.data

            } catch (error) {
                console.log(error);
            }
        },
    }
})