<template>
  <div class="relative flex items-stretch my-3 px-4 w-full sm:w-1/2"
         :class="divisorFiltros()">
    <div class="flex absolute inset-y-0 left-0 items-center pl-7 pointer-events-none ">
      <i class="fas fa-filter text-blueGray-300"></i>
    </div>
    <select :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
      class="placeholder-blueGray-400 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none shadow focus:shadow-outline w-full pl-10 px-3">
      <option value="" selected>{{ defaultLabel }}</option>
      <option v-for="option in options" :value="option.value">{{ option.text }}</option>
    </select>
  </div>
</template>

<script setup>

const props = defineProps({
  defaultLabel: String,
  modelValue: String,
  cantidadFiltros: Number,
});

defineEmits(['update:modelValue']);

const options = [
  { text: 'Activado', value: 1 },
  { text: 'Desactivado', value: 0 },
]

const divisorFiltros = () => {
    return {
        'lg:w-1/4': props.cantidadFiltros === 4,
        'lg:w-1/2': props.cantidadFiltros === 2
    }
}


</script>

<style lang="scss" scoped>
</style>