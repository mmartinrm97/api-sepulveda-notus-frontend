import axios from "axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore('UserStore', {
    state: () => ({
        users: null,
    }),
    actions: {
        async getUsers(pagina = 1, activo = '') {
            try {
                const params = {
                    include: 'role,warehouses',
                    page: pagina,
                    is_active: activo
                }
                const url = `${import.meta.env.VITE_APP_URL}/api/v1/users`
                const res = await axios.get(url, { params })
                // console.log("🚀 ~ file: Users.js ~ line 17 ~ getUsers ~ res", res.data.data[0])
                
                this.users = []     
                this.users = res.data

            } catch (error) {
                console.log(error);
            }
        }
    }
})