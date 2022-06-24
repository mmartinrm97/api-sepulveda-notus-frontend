<template>
    <li class="inline-flex">
        <a :href="tohref" target="_blank"
            class="text-slate-700 hover:text-slate-500 text-sm block mb-4 no-underline font-semibold">
            <i  :class="iconClass" class="mr-2 text-slate-300 text-base"></i>
            {{name}}
        </a>
    </li>
</template>

<script setup>

const props = defineProps({
    name: String,
    tohref: String,
    iconClass: String
})

const {name, tohref, iconClass} = props
</script>

<style lang="scss" scoped>
</style>