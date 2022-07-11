<template>
<!-- Login -->
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-4/12">
        <div
          class="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-blueGray-200 border-0 p-4 px-4">
          <div class="rounded-t mb-0 px-6 my-6">
            <div class="flex items-center justify-center ">
              <img src="../../assets/img/sepulveda.png" alt="logo sepulveda" srcset="">
            </div>
            <div class="text-center my-3">

              <h3 class="text-blueGray-500 text-5xl font-bold">
                 App Sepúlveda
              </h3>
            </div>
            <div class="btn-wrapper text-center">
              <!-- <button
                class="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                type="button"
              >
                <img alt="..." class="w-5 mr-1" :src="github" />
                Github
              </button>
              <button
                class="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                type="button"
              >
                <img alt="..." class="w-5 mr-1" :src="google" />
                Google
              </button> -->
            </div>
            <hr class="mt-6 border-b-1 border-blueGray-300" />
          </div>

          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div class="text-blueGray-500 text-center mb-3 font-bold">
              <div class="text-xl mt-6">Bienvenido (a)</div>
            </div>
            <form @submit.prevent="submitLogin">
              <div class="relative w-full mb-3">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                  Email
                </label>
                <input type="email"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Email"
                  v-model="state.user.email" required/>
                  <span v-if="erroresLogin.email" class="text-red-700">{{ erroresLogin.email
                            }}</span>
              </div>

              <div class="relative w-full mb-3">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                  Password
                </label>
                <input type="password"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Password" 
                  v-model="state.user.password" required/>
                  <span v-if="erroresLogin.password" class="text-red-700">{{ erroresLogin.password
                            }}</span>
              </div>
              <div>
                <label class="inline-flex items-center cursor-pointer">
                  <input id="customCheckLogin" type="checkbox"
                    class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150" />
                  <span class="ml-2 text-sm font-semibold text-blueGray-600">
                    Remember me
                  </span>
                </label>
              </div>

              <div class="text-center mt-6">
                <button
                  class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  tag="button" @click="authStore.submitLogin(state.user)">
                  Iniciar sesión
                </button>
              </div>
            </form>
          </div>
        </div>
        <!-- <div class="flex flex-wrap mt-6 relative">
          <div class="w-1/2">
            <a href="javascript:void(0)" class="text-blueGray-200">
              <small>Forgot password?</small>
            </a>
          </div>
          <div class="w-1/2 text-right">
            <router-link to="" class="text-blueGray-200">
              <small>Create new account</small>
            </router-link>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>

// import github from '../../assets/img/github.svg'
// import google from '../../assets/img/google.svg'

import { ref } from 'vue';
import {useAuthStore} from '../../stores/Auth'

const state = ref({
  user: {
    email:'',
    password: ''
  }
});

const authStore = useAuthStore();
const erroresLogin = ref(authStore.errores);


</script>

<style lang="scss" scoped>
</style>