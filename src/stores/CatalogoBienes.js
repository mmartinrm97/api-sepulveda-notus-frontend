import axios from "axios";
import { defineStore } from "pinia";

export const useCatalogoBienStore = defineStore('CatalogoBienStore', {
    state: () => ({
        catalogoBienes: null,
    }),
    actions: {
        async getCatalogoBienes() {
            try {
                const params = {
                    include: 'goodsGroup,goodsClass'
                }
                const url = `http://api-sepulveda.test/api/v1/goods-catalogs`
                const res = await axios.get(url, { params })

                this.catalogoBienes = []
                this.catalogoBienes = res.data.data

            } catch (error) {
                console.log(error);
            }
        }
    }
})