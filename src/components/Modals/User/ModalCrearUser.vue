<template>
  <TransitionRoot as="template" :show="open" v-if="modalListo">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end sm:items-center justify-center min-h-full min-w-full p-4 text-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-11/12 sm:my-8 sm:max-w-lg sm:w-full">

              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div
                    class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-lightBlue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <i class="fas fa-plus text-lightBlue-600" aria-hidden="true" />
                  </div>
                  <div class="mx-auto align-middle text-center sm:mt-0 sm:ml-6 sm:text-left">
                    <DialogTitle as="h3" class="text-2xl font-medium text-gray-900"> Añadir nuevo usuario
                    </DialogTitle>
                    <!-- <div class="mt-2">
                      <p class="text-sm text-gray-500">Are you sure you want to deactivate your account? All of your
                        data will be permanently removed. This action cannot be undone.</p>
                    </div> -->
                  </div>
                </div>
              </div>

              <div class="mt-3 sm:mt-0">
                <div class="mt-3 md:mt-0 md:col-span-2">
                  <form action="#" method="POST">
                    <div class="shadow overflow-hidden sm:rounded-md">
                      <div class="px-4 py-5 bg-white sm:p-6">
                        <div class="grid grid-cols-6 gap-6">

                          <div class="col-span-6 sm:col-span-3">
                            <label for="first-name" class="block text-sm font-medium text-gray-700">Nombres</label>
                            <input type="text" name="first-name" id="first-name" autocomplete="given-name"
                              class="mt-1 focus:ring-lightBlue-500 focus:border-lightBlue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              v-model.trim="state.user.nombres" />
                            <span v-if="erroresPost.first_name" class="text-red-700">{{ erroresPost.first_name }}
                            </span>
                          </div>

                          <div class="col-span-6 sm:col-span-3">
                            <label for="last-name" class="block text-sm font-medium text-gray-700">Apellidos</label>
                            <input type="text" name="last-name" id="last-name" autocomplete="family-name"
                              class="mt-1 focus:ring-lightBlue-500 focus:border-lightBlue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              v-model.trim="state.user.apellidos" />
                            <span v-if="erroresPost.last_name" class="text-red-700">{{ erroresPost.last_name }} </span>
                          </div>

                          <div class="col-span-3 sm:col-span-3">
                            <label for="dni" class="block text-sm font-medium text-gray-700">DNI</label>
                            <input type="text" name="dni" id="dni" autocomplete="family-name"
                              class="mt-1 focus:ring-lightBlue-500 focus:border-lightBlue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              v-model.trim="state.user.dni" />
                            <span v-if="erroresPost.dni" class="text-red-700">{{ erroresPost.dni }} </span>
                          </div>

                          <div class="col-span-3 sm:col-span-3">
                            <label for="role" class="block text-sm font-medium text-gray-700">Rol</label>
                            <select id="role" name="role" autocomplete="role-name"
                              class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-lightBlue-500 focus:border-lightBlue-500 sm:text-sm"
                              v-model="state.user.rolID">
                              <option :value="1">Administrador</option>
                              <option :value="2">Encargado</option>
                            </select>
                            <span v-if="erroresPost.role_id" class="text-red-700">{{ erroresPost.role_id
                            }}</span>
                          </div>

                          <div class="col-span-6 ">
                            <label for="email-address" class="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" name="email-address" id="email-address" autocomplete="email"
                              class="mt-1 focus:ring-lightBlue-500 focus:border-lightBlue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              v-model.trim="state.user.email" />
                            <span v-if="erroresPost.email" class="text-red-700">{{ erroresPost.email }} </span>
                          </div>

                          <div class="col-span-6 sm:col-span-3 lg:col-span-3">
                            <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
                            <input type="password" name="password" id="password" autocomplete="address-level1"
                              class="mt-1 focus:ring-lightBlue-500 focus:border-lightBlue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              v-model.trim="state.user.password" />
                            <span v-if="erroresPost.password" class="text-red-700">{{ erroresPost.password }} </span>
                          </div>

                          <div class="col-span-6 sm:col-span-3 lg:col-span-3">
                            <label for="password-confirmation" class="block text-sm font-medium text-gray-700">Repita la
                              contraseña
                            </label>
                            <input type="password" name="password-confirmation" id="password-confirmation"
                              autocomplete="postal-code"
                              class="mt-1 focus:ring-lightBlue-500 focus:border-lightBlue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              v-model.trim="state.user.passwordConfirmado" />
                            <span v-if="erroresPost.password_confirmation" class="text-red-700">{{
                                erroresPost.password_confirmation
                            }} </span>
                          </div>

                          <div class="col-span-6 sm:col-span-3">
                            <label for="default-toggle" class="inline-flex relative items-center cursor-pointer">
                              <input type="checkbox" v-model="state.user.activo" :value="state.user.activo"
                                @click="toggleActivo" id="default-toggle" class="sr-only peer">
                              <div
                                class="w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-lightBlue-300  rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-lightBlue-600">
                              </div>
                              <span class="ml-3 text-sm font-medium text-gray-700">¿Activar usuario?</span>
                            </label>
                          </div>

                        </div>
                      </div>
                    </div>
                  </form>
                </div>

              </div>

              <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" name="anadirUser"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-lightBlue-600 text-base font-medium text-white hover:bg-lightBlue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lightBlue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="anadirUser" :disabled="btnBloqueado" :class="btnBloqueado ? 'cursor-not-allowed' : ''">Añadir
                </button>
                <button type="button" name="cancelar"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lightBlue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="cancelarUsuario" ref="cancelButtonRef" :disabled="btnBloqueado"
                  :class="btnBloqueado ? 'cursor-not-allowed' : ''">Cancelar
                </button>

              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { inject, onMounted, reactive, ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

import Swal from 'sweetalert2'
import { useUserStore } from '../../../stores/Users';

const userStore = useUserStore()
const erroresPost = ref(userStore.errores)

const open = inject('showModalCrearUser');

const emit = defineEmits(['refrescarUsers']);
const modalListo = ref(false)

//Validación
const state = reactive({
  user: {
    rolID: '',
    nombres: '',
    apellidos: '',
    dni: '',
    email: '',
    password: '',
    passwordConfirmado: '',
    activo: false
  }
})

const anadirUser = (async () => {
  try {
    erroresPost.value = {}
    btnBloqueado.value = true
    await userStore.postUser(state.user)
    // console.log('despues del post',userStore.errores);
    if (Object.keys(userStore.errores).length !== 0) {

      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al añadir el usuario',
        icon: 'error',
        confirmButtonText: 'Cerrar'
      })
      btnBloqueado.value = false
      erroresPost.value = userStore.errores
      return;
    }
    Swal.fire({
      title: 'Éxito',
      text: 'Usuario añadido satisfactoriamente',
      icon: 'success',
      confirmButtonText: 'Cerrar'
    })

    limpiarFomulario()
    open.value = false
    btnBloqueado.value = false
    emit('refrescarUsers')
    // console.log('llego al final');

  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: 'Hubo un problema al añadir el user',
      icon: 'error',
      confirmButtonText: 'Cerrar'
    })
    btnBloqueado.value = false
  }
})

const cancelarUsuario = (() => {
  limpiarFomulario()
  open.value = false
  erroresPost.value = {}
})


const limpiarFomulario = (() => {
  state.user.rolID = ''
  state.user.nombres = ''
  state.user.apellidos = ''
  state.user.dni = ''
  state.user.email = ''
  state.user.password = ''
  state.user.passwordConfirmado = ''
  state.user.activo = false
})

const btnBloqueado = ref(false)

onMounted(async () => {
  modalListo.value = true
});

</script>