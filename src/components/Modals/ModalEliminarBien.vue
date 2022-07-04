<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform  w-5/6 transition-all sm:my-8 sm:max-w-lg sm:w-full">
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div
                    class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <i class="fas fa-exclamation text-red-600" aria-hidden="true" />
                  </div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900"> Eliminar bien:
                      {{ bienAEliminar.description }}</DialogTitle>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">¿Estás seguro de eliminar este bien? </p>
                      <p class="text-sm text-gray-500"> Los datos serán eliminados permanentemente. </p>
                      <p class="text-sm text-gray-500"> Esta acción no se puede deshacer </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="eliminarBien" :disabled="btnBloqueado"
                  :class="btnBloqueado ? 'cursor-not-allowed' : ''">Eliminar</button>
                <button type="button"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="cancelarBien" :disabled="btnBloqueado"
                  :class="btnBloqueado ? 'cursor-not-allowed' : ''">Cancelar</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { inject, reactive, ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useBienesStore } from '../../stores/Bienes';
import Swal from 'sweetalert2'

const bienStore = useBienesStore()

const open = inject('showModalEliminarBien');
const bienAEliminar = inject('bienAEliminar')
const emit = defineEmits(['refrescarUsers']);

const erroresDelete = ref(bienStore.errores)
const btnBloqueado = ref(false)

//Validación
const state = reactive({
  id: bienAEliminar
})

const cancelarBien = (() => {
  open.value = false
});

const eliminarBien = (async () => {
  try {
  
    erroresDelete.value = {}
    btnBloqueado.value = true
    // console.log('state id', state.id);
    await bienStore.deleteBien(state.id)
    // console.log('despues del delete', bienStore.errores);

    if (Object.keys(bienStore.errores).length !== 0) {
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al eliminar el bien',
        icon: 'error',
        confirmButtonText: 'Cerrar'
      })
      btnBloqueado.value = false
      erroresDelete.value = bienStore.errores
      return;
    }

    Swal.fire({
      title: 'Éxito',
      text: 'Bien eliminado satisfactoriamente',
      icon: 'success',
      confirmButtonText: 'Cerrar'
    })

    open.value = false
    btnBloqueado.value = false
    emit('refrescarUsers')

  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: 'Hubo un problema al eliminar el bien',
      icon: 'error',
      confirmButtonText: 'Cerrar'
    })
    btnBloqueado.value = false
  }
})

</script>