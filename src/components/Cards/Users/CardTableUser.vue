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
          <button
            class="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 items-center justify-center w-full sm:w-auto"
            type="button" @click="toggleModal()">
            Botón Prueba
          </button>
        </div>
        <!-- Búsqueda Global -->
        <!-- <div class="relative flex w-1/3 flex-wrap items-stretch m-3">
          <span
            class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 pt-2 pl-3">
            <i class="fas fa-search"></i>
          </span>
          <input v-model="busquedaGlobal" type="text" placeholder="Buscar ..."
            class="px-3 placeholder-blueGray-400 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none shadow focus:shadow-outline w-full pl-10" />
        </div> -->
      </div>

      <!-- Filtros -->

      <!-- bg-green-500 sm:bg-sky-500 md:bg-red-500 lg:bg-yellow-500  add to view rensposive design-->
      <div
        class="flex flex-wrap items-center lg:flex-grow  ">
        <!-- Búsqueda de Id -->
        <div class="relative flex items-stretch my-3 w-full sm:w-1/2 lg:w-1/4">
          <div class="flex absolute inset-y-0 left-0 items-center pl-7 pointer-events-none ">
            <i class="fas fa-search text-blueGray-300"></i>
          </div>

          <input v-model="idBuscado" type="text" placeholder="Id"
            class="placeholder-blueGray-400 text-blueGray-600 bg-white text-sm border border-blueGray-300 rounded outline-none focus:outline-none shadow focus:shadow-outline w-full pl-10 px-3 mx-4" />
        </div>
        <!-- Búsqueda de Nombre -->
        <div class="relative flex items-stretch my-3 px-4 w-full sm:w-1/2 lg:w-1/4">

          <div class="flex absolute inset-y-0 left-0 items-center pl-7 pointer-events-none ">
            <i class="fas fa-search text-blueGray-300"></i>
          </div>

          <input v-model="nombreBuscado" type="text" placeholder="Nombres"
            class="placeholder-blueGray-400 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none shadow focus:shadow-outline w-full pl-10 px-3" />
        </div>

        <!-- Búsqueda de Apellido -->
        <div class="relative flex items-stretch my-3 px-4 w-full sm:w-1/2 lg:w-1/4">
          <div class="flex absolute inset-y-0 left-0 items-center pl-7 pointer-events-none ">
            <i class="fas fa-search text-blueGray-300"></i>
          </div>
          <input v-model="apellidoBuscado" type="text" placeholder="Apellidos"
            class="placeholder-blueGray-400 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none shadow focus:shadow-outline w-full pl-10 px-3" />
        </div>

        <!-- Filtrar por Estado -->
        <div class="relative flex items-stretch my-3 px-4 w-full sm:w-1/2 lg:w-1/4">
          <div class="flex absolute inset-y-0 left-0 items-center pl-7 pointer-events-none ">
            <i class="fas fa-filter text-blueGray-300"></i>
          </div>
          <select v-model="estadoBuscado"
            class=" shadow px-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pl-10 pr-10">
            <option value="">Estado</option>
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
            <th class="px-0" v-for="element in encabezadosTabla" :key="element">
              <div
                class="border border-solid border-l-0 border-r-0 flex flex-row items-center justify-between cursor-pointer"
                :class="[
                  color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                  ordenarColumna === element.filtro ? 'font-bold text-blue-700' : ''
                ]" @click="actualizarOrden(element.filtro)">
                <div
                  class="pl-6 pr-6 align-middle border-0 border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  {{ element.cabecera }}
                </div>
                <div
                  class="px-2 align-middle py-1 text-xl uppercase whitespace-nowrap font-semibold text-left border-0 border-l-0 border-r-0 select-none">
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
            <!-- Plantilla -->

            <th class="px-0">
              <div
                class="border border-solid border-l-0 border-r-0 flex flex-row items-center justify-between cursor-pointer"
                :class="[
                  color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                ]">
                <div
                  class="px-6 align-middle border-0 border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  &nbsp
                </div>

              </div>
            </th>
          </tr>
        </thead>
        <tbody v-if="userStore.users.data && userStore.users.data.length > 0">
          <tr v-for="user in userStore.users.data" :key="user.id">
            <td class="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap px-6  p-4 ">
              {{ user.id }}
            </td>
            <td class="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap px-6 p-4">
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
              <table-dropdown @click="openModal = !openModal" />
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td>&nbsp</td>
          </tr>
          <tr>
            <td align="center" colspan="7" rowsan="5">No hay registros encontrados</td>
          </tr>
          <tr>
            <td>&nbsp</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div class="flex-1 flex justify-between sm:hidden md:flex-1 md:flex md:justify-between lg:hidden">
        <a href="#"
          class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Previous </a>
        <a href="#"
          class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Next </a>
      </div>
      <div
        class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between md:hidden lg:flex-1 lg:flex lg:items-center lg:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Mostrando del
            {{ ' ' }}
            <span class="font-medium">{{ userStore.users.meta !== undefined ? userStore.users.meta.from : 0 }}</span>
            {{ ' ' }}
            al
            {{ ' ' }}
            <span class="font-medium">{{ userStore.users.meta !== undefined ? userStore.users.meta.to : 0 }}</span>
            {{ ' ' }}
            de
            {{ ' ' }}
            <span class="font-medium">{{ userStore.users.meta !== undefined ? userStore.users.meta.total : 0 }}</span>
            {{ ' ' }}
            registros
          </p>
        </div>
        <div>
          <paginate :page-count="lastPage" :click-handler="page => userStore.getUsers(
          page,
          estadoBuscado,
          idBuscado,
          nombreBuscado,
          apellidoBuscado,
          ordenarColumna,
          ordenarDireccion)" :prev-text="'Prev'" :next-text="'Next'"
            :container-class="'relative z-0 inline-flex rounded-md shadow-sm -space-x-px cursor-pointer'"
            :page-link-class="'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50'"
            :prev-link-class="'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50'"
            :next-link-class="'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50'"
            :no-li-surround="true"
            :active-class="'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium'">
          </paginate>
        </div>
      </div>
    </div>

    <editar-user :open="openModal" />

  </div>
</template>

<script setup>

import TableDropdown from "../../Dropdowns/TableDropdown.vue";
import { onMounted, provide, ref, watch } from "vue";
import Paginate from "vuejs-paginate-next";
import EditarUser from '../../../components/Modals/EditarUser.vue';
import { useUserStore } from '../../../stores/Users';
import { useRouter } from 'vue-router';

const props = defineProps({
  color: {
    default: "light",
    validator: function (value) {
      // The value must match one of these strings
      return ["light", "dark"].indexOf(value) !== -1;
    },
  }
})

const emit = defineEmits(['tablaUsersLista'])

const openModal = ref(true);

const router = useRouter();
const titulo = router.currentRoute.value.meta.title
const userStore = useUserStore()


const encabezadosTabla = [
  { cabecera: 'ID', filtro: 'id' },
  { cabecera: 'Rol', filtro: 'role_id' },
  { cabecera: 'Nombres', filtro: 'first_name' },
  { cabecera: 'Apellidos', filtro: 'last_name' },
  { cabecera: 'Área Encargada', filtro: 'warehouses' },
  { cabecera: 'Estado', filtro: 'is_active' },
]

// await userStore.getUsers(); 

const estadoBuscado = ref('')
const idBuscado = ref('')
const nombreBuscado = ref('')
const apellidoBuscado = ref('')
const ordenarColumna = ref('created_at')
const ordenarDireccion = ref('asc')

// const from = ref(0);
// const to = ref(0);
// const total = ref(0);
const lastPage = ref(0);
const showModal = ref(false);

onMounted(async () => {

  // await getUsers();
  await userStore.getUsers();

  // from.value = userStore.users.meta.from;
  // to.value = userStore.users.meta.to;
  // total.value = userStore.users.meta.total;
  lastPage.value = userStore.users.meta.last_page;

});

// const usersDataInject = inject('formData');
// const usersData = usersDataInject.value;
// console.log("🚀 ~ file: CardTableUser.vue ~ line 157 ~ usersData", usersData)

// const userStore = useUserStore()

// const usersDataTable = ref([])
// const links = ref({})
// const meta = ref({})

provide('showModal', showModal)

const toggleModal = (() => {
  showModal.value = !showModal.value;
  console.log("🚀 ~ file: CardTableUser.vue ~ line 308 ~ toggleModal ~ showModal", showModal.value)

})

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
    idBuscado.value,
    nombreBuscado.value,
    apellidoBuscado.value,
    ordenarColumna.value,
    ordenarDireccion.value
  )
}

watch(lastPage, (curr, prev) => {
  console.log("🚀 ~ file: CardTableUser.vue ~ line 363 ~ watch ~ lastPageprev", prev)
  console.log("🚀 ~ file: CardTableUser.vue ~ line 363 ~ watch ~ lastPagecurr", curr)

})


watch([estadoBuscado, idBuscado, nombreBuscado, apellidoBuscado], async (
  [currEstadoBuscado, currIdBuscado, currNombreBuscado, currApellidoBuscado],
  [prevEstadoBuscado, prevIdBuscado, prevNombreBuscado, prevApellidoBuscado]
) => {

  console.log('currNombreBuscado', currNombreBuscado);
  console.log('prevNombreBuscado', prevNombreBuscado);

  await userStore.getUsers(
    1,
    currEstadoBuscado,
    currIdBuscado,
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