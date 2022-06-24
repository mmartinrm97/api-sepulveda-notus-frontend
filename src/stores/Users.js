import axios from "axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore('UserStore', {
    state: () => ({
        users: null,
    }),
    actions: {
        async getUsers() {
            try {
                const params = {
                    include: 'role,warehouses'
                }
                const url = `http://api-sepulveda.test/api/v1/users`
                const res = await axios.get(url, { params })

                this.users = []
                this.users = res.data.data

            } catch (error) {
                console.log(error);
            }
        }
    }
})