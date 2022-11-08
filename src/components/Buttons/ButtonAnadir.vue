<template>
    <button
        class="bg-lightBlue-600 text-white active:bg-lightBlue-900 font-bold uppercase text-sm px-6 py-2 pl- rounded shadow hover:shadow-lg hover:bg-lightBlue-900 outline-none focus:outline-none mx-4 ease-linear transition-all duration-150 items-center justify-center w-full sm:w-auto"
        type="button">
        {{props.titulo}}
    </button>
</template>

<script setup>

const props = defineProps({
    titulo: String
});


</script>

<style lang="scss" scoped>
</style>