import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import jwtDecode from "jwt-decode";

export const useUserStore = defineStore('userStore', () => {

    const users = ref({})
    const allUsers = ref({})
    const user = ref({})
    const errores = ref({})
    const token = localStorage.getItem('authToken');


    const getUsers = async (
        pagina = 1,
        estadoBuscado = '',
        roleID = '',
        buscarNombre = '',
        buscarApellido = '',
        ordenarColumna = 'id',
        ordenarDireccion = 'asc'
    ) => {
        try {
            const params = {
                include: 'role,warehouses',
                page: pagina,
                search_is_active: estadoBuscado,
                search_role_id: roleID,
                search_first_name: buscarNombre,
                search_last_name: buscarApellido,
                order_column: ordenarColumna,
                order_direction: ordenarDireccion
            }
            const url = `${import.meta.env.VITE_APP_URL}/api/v1/users`
            const res = await axios.get(url, {
                params,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            users.value = []
            users.value = res.data

            // const decoded = jwtDecode(token);
            // console.log("🚀 ~ file: Users.js ~ line 47 ~ useUserStore ~ decoded", decoded.email)
            

        } catch (error) {
            console.log(error);
        }
    }

    const getAllUsers = async (userWarehouse = false) => {
        try {

            const params = {
                users_without_warehouses: userWarehouse
            }

            const url = `${import.meta.env.VITE_APP_URL}/api/v1/users/list`
            const res = await axios.get(url, {
                params,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            allUsers.value = {}
            allUsers.value = res.data

        } catch (error) {
            console.log(error);
        }
    }

    const postUser = async (usuario) => {
        // console.log("🚀 ~ file: Bienes.js ~ line 44 ~ postusuario ~ usuario", usuario)

        try {
            errores.value = {};
            const user = {
                role_id: usuario.rolID,
                first_name: usuario.nombres,
                last_name: usuario.apellidos,
                dni: usuario.dni,
                email: usuario.email,
                password: usuario.password,
                password_confirmation: usuario.passwordConfirmado,
                is_active: usuario.activo
            }
            const url = `${import.meta.env.VITE_APP_URL}/api/v1/users`
            const res = await axios.post(url, user, {
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

    const patchUser = async (usuario) => {
        try {

            errores.value = {};
            const user = {
                role_id: usuario.rolID,
                first_name: usuario.nombres,
                last_name: usuario.apellidos,
                dni: usuario.dni,
                email: usuario.email,
                is_active: usuario.activo
            }

            if (usuario.password !== undefined) {
                user.password = usuario.password
                user.password_confirmation = usuario.passwordConfirmado
            }

            const url = `${import.meta.env.VITE_APP_URL}/api/v1/users/${usuario.id}`
            const res = await axios.patch(url, user,{
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

    const deleteUser = async (usuario) => {
        try {
            errores.value = {};
            const url = `${import.meta.env.VITE_APP_URL}/api/v1/users/${usuario.id}`
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

    return { users, user, allUsers, getUsers, getAllUsers, postUser, patchUser, deleteUser, errores }
})
