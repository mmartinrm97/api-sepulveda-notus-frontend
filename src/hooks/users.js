import { ref } from "vue";
import axios from "axios";

export default function useUsers() {
    const users = ref({})

    const getUsers = async (
        pagina = 1,
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
}