import axios from "axios";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2'

export const useAuthStore = defineStore('authStore', () => {

    const errores = ref({})
    const router = useRouter();
    const loginForm = reactive({
        email: '',
        password: '',
        remember: false
    })

    const submitLogin = async (usuario) => {

        try {

            errores.value = {}

            if(usuario.email === '' || usuario.password === '') return;


            const user = {
                email: usuario.email,
                password: usuario.password
            }
            

            const url = `${import.meta.env.VITE_APP_URL}/api/v1/login`

            const res = await axios.post(url, user,{
                withCredentials: true
            })
            // console.log("🚀 ~ file: Auth.js ~ line 37 ~ submitLogin ~ res", res)
            localStorage.setItem('authToken', res.data.authorization.token)
            await router.push({ name: 'dashboard' })


        } catch (error) {
             console.log(error);
            Swal.fire({
                title: 'Error',
                text: 'Datos incorrectos. Intenta de nuevo',
                icon: 'error',
                confirmButtonText: 'Cerrar'
              })
            if (error.response.status === 422) {
                for (const key in error.response.data.errors) {
                    errores.value[key] = error.response.data.errors[key][0];
                }
            }
        }
    };

    const submitLogout = async () => {

        try {

            errores.value = {}

            const token = localStorage.getItem('authToken');

            const url = `${import.meta.env.VITE_APP_URL}/api/v1/logout`

            const res = await axios.post(url, {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

            localStorage.removeItem('authToken')
            await router.push({ name: 'Login' })


        } catch (error) {

            console.log(error);

            if (error.response.status === 422) {
                for (const key in error.response.data.errors) {
                    errores.value[key] = error.response.data.errors[key][0];
                }
            }
        }
    };

    return { loginForm, submitLogin, submitLogout, errores }
})
