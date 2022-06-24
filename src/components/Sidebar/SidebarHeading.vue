<template>
    <h6 class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
        {{name}}
    </h6>
</template>

<script setup>

const props = defineProps({
    name: String
});

const {name} = props
</script>

<style lang="scss" scoped>
</style>