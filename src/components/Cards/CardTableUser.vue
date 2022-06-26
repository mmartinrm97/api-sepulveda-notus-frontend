<template>
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
    :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']">
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative flex w-10/12 px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-lg" :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']">
            {{ titulo }}
          </h3>
        </div>
        <!-- Búsqueda de Id -->
        <div class="relative flex w-1/10 flex-wrap items-stretch m-3">
          <span
            class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
            <i class="fas fa-lock"></i>
          </span>
          <input v-model="idBuscado" type="text" placeholder="Filtrar por id"
            class="px-3 py-3 placeholder-blueGray-400 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none shadow focus:shadow-outline w-full pl-10" />
        </div>

        <!-- Búsqueda de Nombre -->
        <div class="relative flex w-1/10 flex-wrap items-stretch m-3">
          <span
            class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
            <i class="fas fa-lock"></i>
          </span>
          <input v-model="nombreBuscado" type="text" placeholder="Filtrar por nombres"
            class="px-3 py-3 placeholder-blueGray-400 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none shadow focus:shadow-outline w-full pl-10" />
        </div>

        <!-- Búsqueda de Apellido -->
        <div class="relative flex w-1/10 flex-wrap items-stretch m-3">
          <span
            class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
            <i class="fas fa-lock"></i>
          </span>
          <input v-model="apellidoBuscado" type="text" placeholder="Filtrar por apellidos"
            class="px-3 py-3 placeholder-blueGray-400 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none shadow focus:shadow-outline w-full pl-10"/>
        </div>

        <!-- Filtrar por Estado -->
        <div class="relative flex w-1/10 flex-wrap items-stretch m-3">
          <span
            class="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
            <i class="fas fa-lock"></i>
          </span>
          <select v-model="estadoBuscado"
            class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pl-10">
            <option value="">--Filtrar por Activo--</option>
            <option :value='1'>Activado</option>
            <option :value='0'>Desactivado</option>
          </select>
        </div>
      </div>
    </div>
    <div class="block w-full overflow-x-auto">

      <!-- Projects table -->
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            <!-- head table -->

            <th v-for="element in encabezadosTabla" :key="element">
              <div
                class="border border-solid border-l-0 border-r-0 flex flex-row items-center justify-between cursor-pointer"
                :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                ordenarColumna === element.filtro ? 'font-bold text-blue-700' : '']"
                @click="actualizarOrden(element.filtro)">
                <div class="px-6 align-middle py-3 text-xs uppercase whitespace-nowrap font-semibold text-left">
                  {{ element.cabecera }}
                </div>
                <div class="select-none">
                  <span :class="{
                    'text-blue-600': ordenarDireccion === 'asc' && ordenarColumna === element.filtro,
                    'hidden': ordenarDireccion !== '' && ordenarDireccion !== 'asc' && ordenarColumna === element.filtro
                  }">&uarr;</span>
                  <span :class="{
                    'text-blue-600': ordenarDireccion === 'desc' && ordenarColumna === element.filtro,
                    'hidden': ordenarDireccion !== '' && ordenarDireccion !== 'desc' && ordenarColumna === element.filtro
                  }">&darr;</span>
                </div>
              </div>
            </th>

            <!-- <th v-for="element in encabezadosTabla" :key="element"
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]">
              {{ element }}
            </th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users.data" :key="user.id">
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ user.id }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <i class="mr-2"
                :class="[user.role.description === 'Administrador' ? 'fas fa-crown text-yellow-500 ' : 'fas far fa-user text-slate-900 ']"></i>
              {{ user.role.description }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ user.first_name }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ user.last_name }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ user.warehouses[0] == null ? 'Sin área asignada' : mostrarNombreAlmacenes(user.warehouses).join(', ')
              }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <i class="fas fa-circle mr-2" :class="[user.is_active ? 'text-green-600' : 'text-red-500']"> </i>{{
                  user.is_active ? 'Activado' : 'Desactivado'
              }}
            </td>

            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
              <table-dropdown />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Pagination -->
    <laravel-vue-pagination :data="users" @pagination-change-page="page => getUsers(page, estadoBuscado)" />
    <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div class="flex-1 flex justify-between sm:hidden">
        <a href="#"
          class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Previous </a>
        <a href="#"
          class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Next </a>
      </div>
      <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Showing
            {{ ' ' }}
            <span class="font-medium">1</span>
            {{ ' ' }}
            to
            {{ ' ' }}
            <span class="font-medium">10</span>
            {{ ' ' }}
            of
            {{ ' ' }}
            <span class="font-medium">97</span>
            {{ ' ' }}
            results
          </p>
        </div>
        <div>
          <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <a href="#"
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span class="sr-only">Previous</span>
              <i class="fas fa-angle-left" aria-hidden="true" />
            </a>
            <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->

            <!-- <div v-for="page in meta.last_page" :key="page">
              <router-link :to="{name: 'Usuarios', query:{page:page}}"
              class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
              {{page}} </router-link>
            </div> -->

            <button
              class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span class="sr-only">Next</span>
              <i class="fas fa-angle-right" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import useUsers from '../../hooks/users'
import TableDropdown from "../Dropdowns/TableDropdown.vue";
import { inject, onMounted, ref, watch } from "vue";
import laravelVuePagination from 'laravel-vue-pagination';
// import { useUserStore } from '../../stores/Users';


const encabezadosTabla = [
  { cabecera: 'ID', filtro: 'id' },
  { cabecera: 'Rol', filtro: 'role_id' },
  { cabecera: 'Nombres', filtro: 'first_name' },
  { cabecera: 'Apellidos', filtro: 'last_name' },
  { cabecera: 'Área Encargada', filtro: 'warehouses' },
  { cabecera: 'Activo', filtro: 'is_active' },
]

const props = defineProps({
  titulo: String,
  color: {
    default: "light",
    validator: function (value) {
      // The value must match one of these strings
      return ["light", "dark"].indexOf(value) !== -1;
    },
  }
})

// const usersDataInject = inject('formData');
// const usersData = usersDataInject.value;
// console.log("🚀 ~ file: CardTableUser.vue ~ line 157 ~ usersData", usersData)

// const userStore = useUserStore()

// const usersDataTable = ref([])
// const links = ref({})
// const meta = ref({})

const { users, getUsers } = useUsers()
const estadoBuscado = ref('')
const idBuscado = ref('')
const nombreBuscado = ref('')
const apellidoBuscado = ref('')
const ordenarColumna = ref('created_at')
const ordenarDireccion = ref('asc')


const mostrarNombreAlmacenes = ((arrayAlmacen) => {
  return arrayAlmacen.map((almacen) => {
    return almacen.description
  })
})

onMounted(() => {
  // await userStore.getUsers();
  // usersDataTable.value = userStore.users
  // links.value = userStore.users.links
  // meta.value = userStore.users.meta
  getUsers();
});

const actualizarOrden = (columna) => {
  ordenarColumna.value = columna
  ordenarDireccion.value = ordenarDireccion.value === 'asc' ? 'desc' : 'asc'
  getUsers(
    1,
    estadoBuscado.value,
    idBuscado.value,
    nombreBuscado.value,
    apellidoBuscado.value,
    ordenarColumna.value,
    ordenarDireccion.value
  )
}

watch([estadoBuscado, idBuscado, nombreBuscado, apellidoBuscado], (
  [currEstadoBuscado, currIdBuscado, currNombreBuscado, currApellidoBuscado],
  [prevEstadoBuscado, prevIdBuscado, prevNombreBuscado, prevApellidoBuscado]
  ) => {
  getUsers(
    1,
    currEstadoBuscado,
    currIdBuscado,
    currNombreBuscado,
    currApellidoBuscado);
});

// watch([estadoBuscado], 
// ([currEstadoBuscado],[prevEstadoBuscado]) => {
//   getUsers(
//     1,
//     currEstadoBuscado,
//     idBuscado.value,
//     nombreBuscado.value,
//     apellidoBuscado.value);
// });


</script>

<style lang="scss" scoped>
</style>