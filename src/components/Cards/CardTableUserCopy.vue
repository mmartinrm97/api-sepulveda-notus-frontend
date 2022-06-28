<template>

  <!-- Tabla -->
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
    :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']">
    <!-- Header -->
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap px-4 py-4 items-center">

        <div class="relative flex w-1/3 px-4 flex-grow flex-1">
          <h3 class="font-semibold text-lg" :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']">
            {{ titulo }}
          </h3>
        </div>

        <div>
          <button
            class="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mx-3 ease-linear transition-all duration-150"
            type="button" @click="toggleModal()">
            Open small modal
          </button>
        </div>

        <!-- Búsqueda Global -->
        <div class="relative flex w-1/3 flex-wrap items-stretch mx-3">
          <span
            class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 pt-2 pl-3 ">
            <i class="fas fa-search"></i>
          </span>
          <input v-model="nombreBuscado" type="text" placeholder="Buscar ..."
            class="px-3  placeholder-blueGray-400 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none shadow focus:shadow-outline w-full pl-10" />
        </div>
      </div>


      <!-- Filtros -->

      <div class="flex flex-grow items-center ">
        <!-- Búsqueda de Id -->
        <div class="relative flex w-1/5 flex-grow items-stretch m-3 sm:w-full px-4">
          <span
            class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-2">
            <i class="fas fa-search"></i>
          </span>
          <input v-model="idBuscado" type="text" placeholder="Buscar por id"
            class="placeholder-blueGray-400 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none shadow focus:shadow-outline w-full pl-10 px-3  " />
        </div>
        <!-- Búsqueda de Nombre -->
        <div class="relative flex w-1/5 flex-grow items-stretch m-3 sm:w-full px-4">
          <span
            class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-2">
            <i class="fas fa-search"></i>
          </span>
          <input v-model="nombreBuscado" type="text" placeholder="Buscar por nombres"
            class="px-3 placeholder-blueGray-400 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none shadow focus:shadow-outline w-full pl-10" />
        </div>

        <!-- Búsqueda de Apellido -->
        <div class="relative flex w-1/5 flex-grow items-stretch m-3 sm:w-full px-4">
          <span
            class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-2">
            <i class="fas fa-search"></i>
          </span>
          <input v-model="apellidoBuscado" type="text" placeholder="Buscar por apellidos"
            class="px-3 placeholder-blueGray-400 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none shadow focus:shadow-outline w-full pl-10" />
        </div>

        <!-- Filtrar por Estado -->
        <div class="relative flex flex-grow w-1/5 items-stretch m-3 sm:w-full px-4">
          <span
            class="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-2">
            <i class="fas fa-search"></i>
          </span>
          <select v-model="estadoBuscado"
            class=" shadow px-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pl-10 pr-10">
            <option value="">--Filtrar por Activo--</option>
            <option :value='1'>Activado</option>
            <option :value='0'>Desactivado</option>
          </select>
        </div>

      </div>

    </div>
    <div class="block w-full overflow-x-auto">

      <!-- Table -->
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
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
                  class="pl-3 pr-4 align-middle border-0 border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
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
        <tbody v-if="userFormData.data && userFormData.data.length > 0">
          <tr v-for="user in userFormData.data" :key="user.id">
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
  </div>
</template>

<script setup>

import useUsers from '../../hooks/users'
import TableDropdown from "../Dropdowns/TableDropdown.vue";
import { inject, onMounted, provide, ref, watch } from "vue";
import Paginate from "vuejs-paginate-next";
import EditarUser from '../../views/admin/EditarUser.vue';

// import { useUserStore } from '../../stores/Users';

const props = defineProps({
  titulo: String,
  formData: Object,
  encabezadosTabla: Array,
  color: {
    default: "light",
    validator: function (value) {
      // The value must match one of these strings
      return ["light", "dark"].indexOf(value) !== -1;
    },
  },
})

const { encabezadosTabla } = props

const emit = defineEmits(['customChange']);

const userFormData = ref(props.formData);
console.log("🚀 ~ file: CardTableUserCopy.vue ~ line 211 ~ userFormData", userFormData)

// const { users, getUsers } = useUsers()
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



watch(userFormData, (curr, prev) => {
  console.log('curr', curr);
  console.log('prev', prev);
})

// const from = ref(0);
// const to = ref(0);
// const total = ref(0);
// const lastPage = ref(1);

// const showModal = ref(false);

// const userStore = useUserStore()

// const usersDataTable = ref([])
// const links = ref({})
// const meta = ref({})

// provide('showModal', showModal)

// const toggleModal = (() => {
//   showModal.value = !showModal.value;
//   console.log("🚀 ~ file: CardTableUser.vue ~ line 308 ~ toggleModal ~ showModal", showModal.value)

// })



const actualizarOrden = (columna) => {
  ordenarColumna.value = columna
  ordenarDireccion.value = ordenarDireccion.value === 'asc' ? 'desc' : 'asc'
  // getUsers(
  //   1,
  //   estadoBuscado.value,
  //   idBuscado.value,
  //   nombreBuscado.value,
  //   apellidoBuscado.value,
  //   ordenarColumna.value,
  //   ordenarDireccion.value
  // )
  emit('customChange',
    {
      columna: ordenarColumna.value,
      direccion: ordenarDireccion.value
    });
};

// onMounted(async () => {
//   await getUsers();
//   from.value = users.value.meta.from;
//   to.value = users.value.meta.to;
//   total.value = users.value.meta.total;
//   lastPage.value = users.value.meta.last_page;

// });


// watch([estadoBuscado, idBuscado, nombreBuscado, apellidoBuscado], (
//   [currEstadoBuscado, currIdBuscado, currNombreBuscado, currApellidoBuscado],
//   [prevEstadoBuscado, prevIdBuscado, prevNombreBuscado, prevApellidoBuscado]
// ) => {
//   getUsers(
//     1,
//     currEstadoBuscado,
//     currIdBuscado,
//     currNombreBuscado,
//     currApellidoBuscado);
// });

// watch([users],
//   (curr, prev) => {
//     from.value = curr[0].meta.from;
//     to.value = curr[0].meta.to;
//     total.value = curr[0].meta.total;
//     lastPage.value = curr[0].meta.last_page;
//   });


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