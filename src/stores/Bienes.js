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
        ordenarDireccion = 'asc',
        buscarAlmacenID = ''
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
                order_direction: ordenarDireccion,
                search_warehouse: buscarAlmacenID
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

    const generarReporte = async(almacen = '') =>  {
        try {

            const params = {
                search_warehouse_id: almacen
            }
            // console.log("🚀 ~ file: Bienes.js ~ line 133 ~ generarReporte ~ almacen", almacen)
            
            const url = `${import.meta.env.VITE_APP_URL}/api/v1/reports/generate-reports`
            const response = await axios.get(url, { params, responseType: 'arraybuffer' })
            let blob = new Blob([response.data], { type: 'application/pdf' })
            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = 'test.pdf'
            link.click()
        } catch (error) {
            console.log(error);
        }
    };

    // const downloadfile = (response, filename) => {
    //     // It is necessary to create a new blob object with mime-type explicitly set
    //     // otherwise only Chrome works like it should
    //     var newBlob = new Blob([response.body], {type: 'application/pdf'})
      
    //     // IE doesn't allow using a blob object directly as link href
    //     // instead it is necessary to use msSaveOrOpenBlob
    //     if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    //       window.navigator.msSaveOrOpenBlob(newBlob)
    //       return
    //     }
      
    //     // For other browsers:
    //     // Create a link pointing to the ObjectURL containing the blob.
    //     const data = window.URL.createObjectURL(newBlob)
    //     var link = document.createElement('a')
    //     link.href = data
    //     link.download = filename + '.pdf'
    //     link.click()
    //     setTimeout(function () {
    //       // For Firefox it is necessary to delay revoking the ObjectURL
    //       window.URL.revokeObjectURL(data)
    //     }, 100)
    //   }

    return { bienes, getBienes, showBien, postBien, patchBien, deleteBien, generarReporte, errores }

})