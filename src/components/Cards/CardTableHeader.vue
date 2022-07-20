<template>
    <tr>
        <th class="px-0" v-for="element in encabezadosTabla" :key="element">
            <div class="border border-solid border-l-0 border-r-0 flex flex-row items-center justify-between cursor-pointer hover:bg-lightBlue-100 hover:text-black"
                :class="[
                    color === 'light'
                        ? 'bg-blueGray-200 text-blueGray-700 border-blueGray-100'
                        : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700',
                    ordenarColumna === element.filtro ? 'text-blue-700 font-light' : ''
                ]" @click="$emit('cambiarOrden', element.filtro)">
                <div
                    class="pl-6 pr-6 align-middle border-0 border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
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
    </tr>
</template>

<script setup>

defineProps({
  color: {
    default: "light",
    validator: function (value) {
      // The value must match one of these strings
      return ["light", "dark"].indexOf(value) !== -1;
    },
  },
  encabezadosTabla: Array,
  ordenarDireccion: String,
  ordenarColumna: String
});



</script>

<style lang="scss" scoped>
</style>