<template>
    <!-- Navbar -->
    <nav
        class="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-8">
        <div class="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
            <!-- Brand -->
            <a class="text-white text-xl font-bold uppercase hidden lg:inline-block " href="javascript:void(0)">
                {{ nombreRuta }}
            </a>
            <!-- User -->
            <ul class="flex-col md:flex-row list-none items-center hidden md:flex">
                <user-dropdown />
            </ul>
        </div>
    </nav>
    <!-- End Navbar -->
</template>

<script setup>

import { computed } from 'vue';
import { useRoute } from 'vue-router';
import UserDropdown from '../Dropdowns/UserDropdown.vue';

const route = useRoute();
const nombreRuta = computed(() => route.meta.title);

</script>

<style lang="scss" scoped>
</style>