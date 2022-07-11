import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAlmacenStore = defineStore('almacenStore', () => {
    const almacenes = ref({})
    const allAlmacenes = ref({})
    const errores = ref({})
    const token = localStorage.getItem('authToken');

    const getAlmacenes = async (
        pagina = 1,
        estadoBuscado = '',
        id = '',
        buscarDescripcion = '',
        buscarUsuario = '',
        ordenarColumna = 'id',
        ordenarDireccion = 'asc'
    ) => {
        try {
            const params = {
                include: 'users',
                page: pagina,
                search_is_active: estadoBuscado,
                search_id: id,
                search_description: buscarDescripcion,
                search_user: buscarUsuario,
                order_column: ordenarColumna,
                order_direction: ordenarDireccion
            }
            const url = `${import.meta.env.VITE_APP_URL}/api/v1/warehouses`
            const res = await axios.get(url, {
                params,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            almacenes.value = {}
            almacenes.value = res.data

        } catch (error) {
            console.log(error);
        }
    }

    const getAllAlmacenes = async () => {
        try {
            const url = `${import.meta.env.VITE_APP_URL}/api/v1/warehouses/list`
            const res = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            allAlmacenes.value = {}
            allAlmacenes.value = res.data

        } catch (error) {
            console.log(error);
        }
    }

    const postAlmacen = async (almacen) => {
        try {
            errores.value = {};
            const warehouse = {
                description: almacen.descripcion,
                user_id: almacen.userID,
                is_active: almacen.activo
            }
            const url = `${import.meta.env.VITE_APP_URL}/api/v1/warehouses`
            const res = await axios.post(url, warehouse, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        } catch (error) {
            console.log(error);
            if (error.response.status === 422) {
                for (const key in error.response.data.errors) {
                    errores.value[key] = error.response.data.errors[key][0];
                }
            }
        }
    }

    const patchAlmacen = async (almacen) => {
        try {
            errores.value = {};
            const warehouse = {
                description: almacen.descripcion,
                user_id: almacen.userID,
                is_active: almacen.activo
            }
            const url = `${import.meta.env.VITE_APP_URL}/api/v1/warehouses/${almacen.id}`
            const res = await axios.patch(url, warehouse, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        } catch (error) {
            console.log(error);
            if (error.response.status === 422) {
                for (const key in error.response.data.errors) {
                    errores.value[key] = error.response.data.errors[key][0];
                }
            }
        }
    }

    const deleteAlmacen = async (almacen) => {
        try {
            errores.value = {};
            const url = `${import.meta.env.VITE_APP_URL}/api/v1/warehouses/${almacen.id}`
            const res = await axios.delete(url,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.log(error);
            if (error.response.status === 422) {
                for (const key in error.response.data.errors) {
                    errores.value[key] = error.response.data.errors[key][0];
                }
            }
        }
    };

    return { almacenes, allAlmacenes, getAlmacenes, getAllAlmacenes, postAlmacen, patchAlmacen, deleteAlmacen, errores }
})
