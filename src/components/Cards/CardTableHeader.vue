<template>
    <thead class="text-xs text-white uppercase bg-lightBlue-800 dark:bg-gray-700 dark:text-gray-400">
        <!-- <tr>
        <th class="px-0" v-for="element in encabezadosTabla" :key="element">
            <div class="border border-solid border-l-0 border-r-0 flex flex-row items-center justify-between cursor-pointer hover:bg-lightBlue-100 hover:text-black"
                :class="[
                    color === 'light'
                        ? 'bg-blueGray-200 text-blueGray-700 border-blueGray-100'
                        : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700',
                    ordenarColumna === element.filtro ? 'text-blue-700 font-light' : ''
                ]" @click="$emit('cambiarOrden', element.filtro)">
                <div class="pl-6 pr-6 align-middle border-0 border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                    :class="[ordenarColumna === element.filtro ? 'text-blue-700 font-black' : ''
                    ]">
                    {{ element.cabecera }}
                </div>
                <div
                    class="px-2 align-middle py-1 text-xl uppercase whitespace-nowrap font-black text-left border-0 border-l-0 border-r-0 select-none">
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
        <th class="px-0">
            <div class="border border-solid border-l-0 border-r-0 flex flex-row items-center justify-between cursor-pointer"
                :class="[
                    color === 'light'
                        ? 'bg-blueGray-200 text-blueGray-700 border-blueGray-100'
                        : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700',
                ]">
                <div
                    class="px-6 align-middle border-0 border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    &nbsp
                </div>

            </div>
        </th>
    </tr> -->

        <tr>
            <th scope="col" class="py-3 px-6" v-for="element in encabezadosTabla" :key="element">
                <div class="flex items-center cursor-pointer" @click="$emit('cambiarOrden', element.filtro)">
                    {{ element.cabecera }}
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="ml-1 w-3 h-3" aria-hidden="true"
                            fill="currentColor" viewBox="0 0 320 512">
                            <path
                                d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z">
                            </path>

                        </svg>
                    </div>
                </div>
            </th>
            <th  v-if="props.accion" scope="col" class="py-3 px-6">
                Acción
            </th>
        </tr>
    </thead>
</template>

<script setup>

const props = defineProps({
    color: {
        default: "light",
        validator: function (value) {
            // The value must match one of these strings
            return ["light", "dark"].indexOf(value) !== -1;
        },
    },
    encabezadosTabla: Array,
    ordenarDireccion: String,
    ordenarColumna: String,
    accion:{
        default: false
    }
});




</script>

<style lang="scss" scoped>
</style>