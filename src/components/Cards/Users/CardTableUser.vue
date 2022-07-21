<template>
  <!-- Tabla -->
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
    :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']">
    <!-- Header -->
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap py-4 items-center">

        <div class="relative flex flex-grow w-full sm:w-1/2 px-4 py-2 ">
          <i class="fas fa-users py-2 pr-2"></i>
          <h3 class="font-semibold text-lg pl-2" :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']">
            {{ titulo }}
          </h3>
        </div>

        <div class="relative flex-wrap w-full sm:w-1/2 sm:grow flex justify-end">
          <button-anadir :titulo="'Añadir Usuario'" @click="toggleModalCrearUser()" />
        </div>
      </div>

      <!-- Filtros -->

      <!-- bg-green-500 sm:bg-sky-500 md:bg-red-500 lg:bg-yellow-500  add to view rensposive design-->
      <div class="flex flex-wrap items-center lg:flex-grow  ">

        <!-- Filtrar por Rol -->
        <input-filter v-model:modelValue="rolBuscado" :default-label="'Rol'" :cantidad-filtros="cantidadFiltros"
          :dataFiltros="'rol'" />

        <!-- Búsqueda de Nombre -->
        <input-search v-model:modelValue="nombreBuscado" :placeholder="'Nombres'" :cantidad-filtros="cantidadFiltros" />

        <!-- Búsqueda de Apellido -->
        <input-search v-model:modelValue="apellidoBuscado" :placeholder="'Apellidos'"
          :cantidad-filtros="cantidadFiltros" />

        <!-- Filtrar por Estado -->
        <input-filter v-model:modelValue="estadoBuscado" :default-label="'Estado'"
          :cantidad-filtros="cantidadFiltros" />

      </div>
    </div>
    <div class="block w-full overflow-x-auto relative">

      <!-- Projects table -->
      <div class="overflow-x-auto relative shadow-md mx-0 rounded-none sm:mx-8 sm:mb-6 sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-800 dark:text-gray-400">

          <card-table-header :color="'light'" :encabezados-tabla="encabezadosTabla" :ordenar-columna="ordenarColumna"
            :ordenar-direccion="ordenarDireccion" @cambiar-orden="(i) => actualizarOrden(i)"  :accion="true"/>

          <tbody v-if="userStore.users.data && userStore.users.data.length > 0">
            <tr v-for="(user, i) in userStore.users.data" :key="user.id" class="border-b"
              :class="[color === 'light' ? 'hover:bg-lightBlue-100' : 'hover:bg-lightBlue-100 hover:text-black', i % 2 === 0 ? 'bg-white' : 'bg-warmGray-50']">
              <td class="border-t-0 align-middle border-l-0 border-r-0  whitespace-nowrap px-6  p-4 ">
                {{ user.id }}
              </td>
              <td class="border-t-0 align-middle border-l-0 border-r-0  whitespace-nowrap px-6 p-4">
                <i class="mr-2"
                  :class="[user.role.description === 'Administrador' ? 'fas fa-crown text-yellow-500 ' : 'fas far fa-user text-slate-900 ']"></i>
                {{ user.role.description }}
              </td>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4">
                {{ user.first_name }}
              </td>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4">
                {{ user.last_name }}
              </td>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4">
                {{ user.warehouses[0] == null ? 'Sin área asignada' : mostrarNombreAlmacenes(user.warehouses).join(', ')
                }}
              </td>
              <td class="py-4 px-6">
                <div class="flex items-center">
                  <div class="h-2.5 w-2.5 rounded-full mr-2" :class="[user.is_active ? 'bg-green-600' : 'bg-red-600']">
                  </div> {{ user.is_active ? 'Activado' : 'Desactivado' }}
                </div>
              </td>

              <!-- Acciones -->
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                <Popper :placement="'left-start'" arrow>
                  <button class="text-blueGray-500 py-1 px-3"><i class="fas fa-ellipsis-v"></i></button>
                  <template #content="{ close }">
                    <div class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-xl min-w-48">
                      <button
                        class="text-sm text-left py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                        @click="close(); toggleModalEditarUser(user);">
                        <i class="fas fa-pen w-4 h-4 mr-2 -ml-1 text-amber-500"></i>
                        Editar
                      </button>
                      <button
                        class="text-sm text-left py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                        @click="close(); toggleModalEliminarUser(user)">
                        <i class="fas fa-exclamation w-4 h-4 mr-2 -ml-1 text-red-500"></i>
                        Eliminar
                      </button>
                    </div>
                  </template>
                </Popper>
              </td>

            </tr>
          </tbody>
          <card-table-empty v-else />
        </table>
      </div>


      <div class="block w-full overflow-x-auto relative">
      </div>
    </div>

    <!-- Pagination -->
    <card-table-pagination v-if="paginacionLista" :model-store="userStore.users" :last-page="lastPage"
      :campos-paginacion="[
        estadoBuscado,
        rolBuscado,
        nombreBuscado,
        apellidoBuscado,
        ordenarColumna,
        ordenarDireccion
      ]" :model-store-function="userStore.getUsers" />

    <modal-crear-user v-if="showModalCrearUser" :open="showModalCrearUser" @refrescar-users="refrescarTabla" />

    <modal-editar-user v-if="showModalEditarUser" :open="showModalEditarUser" @refrescar-users="refrescarTabla" />

    <modal-eliminar-user v-if="showModalEliminarUser" :open="showModalEliminarUser" @refrescar-users="refrescarTabla" />

  </div>
</template>

<script setup>

import { onMounted, provide, ref, watch } from "vue";
import { useUserStore } from '../../../stores/Users';
import { useRouter } from 'vue-router';
import ButtonAnadir from "../../Buttons/ButtonAnadir.vue";
import Popper from "vue3-popper";
import InputSearch from "../../Inputs/InputSearch.vue";
import InputFilter from "../../Inputs/InputFilter.vue";
import CardTableHeader from "../CardTableHeader.vue";
import CardTableEmpty from "../CardTableEmpty.vue";
import CardTablePagination from "../CardTablePagination.vue";
import ModalEditarUser from "../../Modals/User/ModalEditarUser.vue";
import ModalCrearUser from "../../Modals/User/ModalCrearUser.vue";
import ModalEliminarUser from "../../Modals/User/ModalEliminarUser.vue";

const props = defineProps({
  color: {
    default: "light",
    validator: function (value) {
      // The value must match one of these strings
      return ["light", "dark"].indexOf(value) !== -1;
    },
  }
})

const router = useRouter();
const titulo = router.currentRoute.value.meta.title
const userStore = useUserStore()


const encabezadosTabla = [
  { cabecera: 'ID', filtro: 'id' },
  { cabecera: 'Rol', filtro: 'role_id' },
  { cabecera: 'Nombres', filtro: 'first_name' },
  { cabecera: 'Apellidos', filtro: 'last_name' },
  { cabecera: 'Área', filtro: 'warehouses' },
  { cabecera: 'Estado', filtro: 'is_active' },
]

const estadoBuscado = ref('')
const rolBuscado = ref('')
const nombreBuscado = ref('')
const apellidoBuscado = ref('')
const ordenarColumna = ref('id')
const ordenarDireccion = ref('asc')


const lastPage = ref(0);
const showModal = ref(false);
const cantidadFiltros = 4;
const paginacionLista = ref(false);

const userAEditar = ref({});
const userAEliminar = ref({});

const showModalCrearUser = ref(false);
const showModalEditarUser = ref(false);
const showModalEliminarUser = ref(false);


const toggleModalCrearUser = (() => {
  showModalCrearUser.value = !showModalCrearUser.value;
})

const toggleModalEditarUser = ((user) => {
  userAEditar.value = user;
  showModalEditarUser.value = !showModalEditarUser.value;

})

const toggleModalEliminarUser = ((user) => {
  userAEliminar.value = user;
  showModalEliminarUser.value = !showModalEliminarUser.value;
})

provide('showModalEditarUser', showModalEditarUser)
provide('showModalCrearUser', showModalCrearUser)
provide('showModalEliminarUser', showModalEliminarUser)
provide('userAEditar', userAEditar)
provide('userAEliminar', userAEliminar)



onMounted(async () => {
  await userStore.getUsers();
  lastPage.value = userStore.users.meta.last_page;
  paginacionLista.value = true;
});

provide('showModal', showModal)

const mostrarNombreAlmacenes = ((arrayAlmacen) => {
  return arrayAlmacen.map((almacen) => {
    return almacen.description
  })
})

const actualizarOrden = async (columna) => {
  ordenarColumna.value = columna
  ordenarDireccion.value = ordenarDireccion.value === 'asc' ? 'desc' : 'asc'
  await userStore.getUsers(
    1,
    estadoBuscado.value,
    rolBuscado.value,
    nombreBuscado.value,
    apellidoBuscado.value,
    ordenarColumna.value,
    ordenarDireccion.value
  )
}

const refrescarTabla = (async () => {
  paginacionLista.value = false;
  await userStore.getUsers();
  lastPage.value = userStore.users.meta.last_page;
  paginacionLista.value = true;
})


watch([estadoBuscado, rolBuscado, nombreBuscado, apellidoBuscado], async (
  [currEstadoBuscado, currRolBuscado, currNombreBuscado, currApellidoBuscado],
  [prevEstadoBuscado, prevRolBuscado, prevNombreBuscado, prevApellidoBuscado]
) => {
  await userStore.getUsers(
    1,
    currEstadoBuscado,
    currRolBuscado,
    currNombreBuscado,
    currApellidoBuscado);
  lastPage.value = userStore.users.meta.last_page;
});

</script>

<style lang="scss" script>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>