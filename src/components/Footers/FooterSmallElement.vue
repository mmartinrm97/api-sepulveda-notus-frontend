<template>
    <li>
        <a :href="tohref"
            class="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3">
            {{name}}
        </a>
    </li>
</template>

<script setup>

const props = defineProps({
    name: String,
    tohref: String
});

const {name, tohref} = props;

</script>

<style lang="scss" scoped>
</style>