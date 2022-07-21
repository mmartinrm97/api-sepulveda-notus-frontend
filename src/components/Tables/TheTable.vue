<template>

  <div class="block w-full overflow-x-auto relative">

    <!-- Projects table -->

    <div class="overflow-x-auto relative shadow-md mx-8 rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">

        <thead class="text-xs text-white uppercase bg-lightBlue-800 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="py-3 px-6">
              Product name
            </th>
            <th scope="col" class="py-3 px-6">
              <div class="flex items-center">
                Color
                <a href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" class="ml-1 w-3 h-3" aria-hidden="true" fill="currentColor"
                    viewBox="0 0 320 512">
                    <path
                      d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z">
                    </path>

                  </svg>
                </a>
              </div>
            </th>
            <th scope="col" class="py-3 px-6">
              <div class="flex items-center">
                Category
                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" class="ml-1 w-3 h-3" aria-hidden="true"
                    fill="currentColor" viewBox="0 0 320 512">
                    <path
                      d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z">
                    </path>
                  </svg></a>
              </div>
            </th>
            <th scope="col" class="py-3 px-6">
              <div class="flex items-center">
                Accesories
                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" class="ml-1 w-3 h-3" aria-hidden="true"
                    fill="currentColor" viewBox="0 0 320 512">
                    <path
                      d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z">
                    </path>
                  </svg></a>
              </div>
            </th>
            <th scope="col" class="py-3 px-6">
              <div class="flex items-center">
                Available
                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" class="ml-1 w-3 h-3" aria-hidden="true"
                    fill="currentColor" viewBox="0 0 320 512">
                    <path
                      d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z">
                    </path>
                  </svg></a>
              </div>
            </th>
            <th scope="col" class="py-3 px-6">
              <div class="flex items-center">
                Price
                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" class="ml-1 w-3 h-3" aria-hidden="true"
                    fill="currentColor" viewBox="0 0 320 512">
                    <path
                      d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z">
                    </path>
                  </svg></a>
              </div>
            </th>
            <th scope="col" class="py-3 px-6">
              <div class="flex items-center">
                Weight
                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" class="ml-1 w-3 h-3" aria-hidden="true"
                    fill="currentColor" viewBox="0 0 320 512">
                    <path
                      d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z">
                    </path>
                  </svg></a>
              </div>
            </th>
            <th scope="col" class="py-3 px-6">
              <div class="flex items-center">
                Status
                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" class="ml-1 w-3 h-3" aria-hidden="true"
                    fill="currentColor" viewBox="0 0 320 512">
                    <path
                      d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z">
                    </path>
                  </svg></a>
              </div>
            </th>

            <th scope="col" class="py-3 px-6">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="index in 10" :key="index"
            class="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            :class="[index % 2 === 0 ? 'bg-warmGray-50' : 'bg-white']">
            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Apple MacBook Pro 17"
            </th>
            <td class="py-4 px-6">
              Silver
            </td>
            <td class="py-4 px-6">
              Laptop
            </td>
            <td class="py-4 px-6">
              Yes
            </td>
            <td class="py-4 px-6">
              Yes
            </td>
            <td class="py-4 px-6">
              $2999
            </td>
            <td class="py-4 px-6">
              3.0 lb.
            </td>
            <td class="py-4 px-6">
              <div class="flex items-center">
                <div class="h-2.5 w-2.5 rounded-full bg-green-600 mr-2"></div> Online
              </div>
            </td>
            <td class="flex items-center py-4 px-6 space-x-3">
              <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</a>
              <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline">Eliminar</a>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
    <div>
      <nav class="flex justify-between items-center m-8" aria-label="Table navigation">
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Mostrando
          <span class="font-semibold text-gray-900 dark:text-white">1-10</span> de
          <span class="font-semibold text-gray-900 dark:text-white">1000</span>
        </span>

        <ul class="inline-flex items-center -space-x-px">
          <li>
            <a href="#"
              class="py-2 px-3 leading-tight rounded-l-lg text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"><i
                class="fas fa-angle-left"></i></a>
          </li>
          <li>
            <a href="#"
              class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
          </li>
          <li>
            <a href="#"
              class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
          </li>
          <li>
            <a href="#" aria-current="page"
              class="z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
          </li>
          <li>
            <a href="#"
              class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
          </li>
          <li>
            <a href="#"
              class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
          </li>
          <li>
            <a href="#"
              class="py-2 px-3 leading-tight rounded-r-lg text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"><i
                class="fas fa-angle-right"></i></a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  <modal-crear-bien v-if="showModalCrearBien" :open="showModalCrearBien" @refrescar-users="refrescarTabla" />

  <modal-editar-bien v-if="showModalEditarBien" :open="showModalEditarBien" @refrescar-users="refrescarTabla" />

  <modal-eliminar-bien v-if="showModalEliminarBien" :open="showModalEliminarBien" @refrescar-users="refrescarTabla" />

</template>

<script setup>
import { useBienesStore } from '../../stores/Bienes';

const props = defineProps({
  color: {
    default: "light",
    validator: function (value) {
      // The value must match one of these strings
      return ["light", "dark"].indexOf(value) !== -1;
    },
  }
});



</script>

<style lang="scss" script>
</style>