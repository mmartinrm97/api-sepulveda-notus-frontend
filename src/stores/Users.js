import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('userStore', () => {
    // state: () => ({
    //     users: [],
    // }),
    // actions: {
    //     async getUsers(
    //         pagina = 1,
    //         estadoBuscado = '',
    //         id = '',
    //         buscarNombre = '',
    //         buscarApellido = '',
    //         ordenarColumna = 'created_at',
    //         ordenarDireccion = 'desc'
    //     ) {
    //         try {
    //             const params = {
    //                 include: 'role,warehouses',
    //                 page: pagina,
    //                 search_is_active: estadoBuscado,
    //                 search_id: id,
    //                 search_first_name: buscarNombre,
    //                 search_last_name: buscarApellido,
    //                 order_column: ordenarColumna,
    //                 order_direction: ordenarDireccion
    //             }
    //             const url = `${import.meta.env.VITE_APP_URL}/api/v1/users`
    //             const res = await axios.get(url, { params })
    //             // console.log("🚀 ~ file: Users.js ~ line 17 ~ getUsers ~ res", res.data.data[0])

    //             this.users = res.data

    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // }

    const users = ref({})  

    const getUsers = async (
        pagina = 1,
        currBusquedaGlobal = '',
        estadoBuscado = '',
        id = '',
        buscarNombre = '',
        buscarApellido = '',
        ordenarColumna = 'created_at',
        ordenarDireccion = 'desc'
    ) => {
        try {
            const params = {
                include: 'role,warehouses',
                page: pagina,
                search_global: currBusquedaGlobal,
                search_is_active: estadoBuscado,
                search_id: id,
                search_first_name: buscarNombre,
                search_last_name: buscarApellido,
                order_column: ordenarColumna,
                order_direction: ordenarDireccion
            }
            const url = `${import.meta.env.VITE_APP_URL}/api/v1/users`
            const res = await axios.get(url, { params })

            // console.log("🚀 ~ file: users.js ~ line 23 ~ useUsers ~ res", 
            // res.data)

            users.value = []
            users.value = res.data

        } catch (error) {
            console.log(error);
        }
    }

    return { users, getUsers }
})