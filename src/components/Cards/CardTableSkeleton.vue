<template>
    <!-- Tabla -->
    <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        <!-- Header -->
        <div class="rounded-t mb-0 px-4 py-3 border-0">
            <div class="flex flex-wrap px-4 py-4 items-center">

                <div class="relative flex w-1/3 px-4 py-2 flex-grow flex-1">
                    <h3 class="font-semibold text-lg" :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']">
                        &nbsp
                    </h3>
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

            <!-- bg-green-500 md:bg-red-500 sm:bg-sky-500 add to view rensposive design-->
            <div class="flex flex-grow items-center ">


            </div>
        </div>
        <div class="block w-full overflow-x-auto">

            <!-- Projects table -->
            <table class="items-center w-full bg-transparent border-collapse">

                <tbody class="animate-pulse">
                    <tr v-for="index in 5">
                        <td>&nbsp</td>
                    </tr>
                    <tr>
                        <td align="center" colspan="7" rowsan="5">
                            <svg role="status"
                                class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-lightBlue-600"
                                viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor" />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill" />
                            </svg>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" colspan="7" rowsan="5">
                            Cargando Registros
                        </td>
                    </tr>
                    <tr v-for="index in 5">
                        <td>&nbsp</td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>

</template>

  <script setup>
  
  </script>