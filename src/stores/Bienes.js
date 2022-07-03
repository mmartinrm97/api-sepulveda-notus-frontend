import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useBienesStore = defineStore('bienesStore', () => {

    const bienes = ref({})
    const bien = ref({})
    const errores = ref({})

    const getBienes = async (
        pagina = 1,
        estadoBuscado = '',
        id = '',
        buscarCodigo = '',
        buscarDescripcion = '',
        ordenarColumna = 'id',
        ordenarDireccion = 'asc'
    ) => {
        try {

            const params = {
                include: 'warehouse,goodsCatalog',
                page: pagina,
                search_is_active: estadoBuscado,
                search_id: id,
                search_code: buscarCodigo,
                search_description: buscarDescripcion,
                order_column: ordenarColumna,
                order_direction: ordenarDireccion
            }
            const url = `${import.meta.env.VITE_APP_URL}/api/v1/goods`
            const res = await axios.get(url, { params })

            bienes.value = {}
            bienes.value = res.data

        } catch (error) {
            console.log(error);
        }
    };

    const showBien = async (
        id = '',
    ) => {
        try {

            const params = {
                include: 'warehouse,goodsCatalog',
            }
            const url = `${import.meta.env.VITE_APP_URL}/api/v1/goods/${id}`
            const res = await axios.get(url, { params })

            bien.value = {}
            bien.value = res.data

        } catch (error) {
            console.log(error);
        }
    };


    const postBien = async (bien) => {
        // console.log("🚀 ~ file: Bienes.js ~ line 44 ~ postBien ~ bien", bien)

        try {
            errores.value = {};
            const good = {
                code: bien.codigo,
                description: bien.descripcion,
                goods_catalog_id: bien.catalogoId,
                warehouse_id: bien.almacenId,
                is_active: bien.activo
            }
            const url = `${import.meta.env.VITE_APP_URL}/api/v1/goods`
            const res = await axios.post(url, good);

        } catch (error) {
            console.log(error);
            if (error.response.status === 422) {
                for (const key in error.response.data.errors) {
                    errores.value[key] = error.response.data.errors[key][0];
                }
            }
        }
    };

    const patchBien = async (bien) => {
        try {
            errores.value = {};
            const good = {
                code: bien.codigo,
                description: bien.descripcion,
                goods_catalog_id: bien.catalogoId,
                warehouse_id: bien.almacenId,
                is_active: bien.activo
            }
            const url = `${import.meta.env.VITE_APP_URL}/api/v1/goods/${bien.id}`
            const res = await axios.patch(url, good);
        } catch (error) {
            console.log(error);
            if (error.response.status === 422) {
                for (const key in error.response.data.errors) {
                    errores.value[key] = error.response.data.errors[key][0];
                }
            }
        }
    };

    const deleteBien = async (bien) => {
        try {
            errores.value = {};
            const url = `${import.meta.env.VITE_APP_URL}/api/v1/goods/${bien.id}`
            const res = await axios.delete(url);
        } catch (error) {
            console.log(error);
            if (error.response.status === 422) {
                for (const key in error.response.data.errors) {
                    errores.value[key] = error.response.data.errors[key][0];
                }
            }
        }
    };

    return { bienes, getBienes, showBien, postBien, patchBien, deleteBien, errores }

})