<template>
    <footer class="pb-6" :class="[
        absolute ? 'absolute w-full bottom-0 bg-blueGray-800' : 'relative',
    ]">
        <div class="container mx-auto px-4">
            <hr class="mb-6 border-b-1 border-blueGray-600" />
            <div class="flex flex-wrap items-center md:justify-between justify-center">
                <div class="w-full md:w-4/12 px-4">
                    <div class="text-sm text-blueGray-500 font-semibold py-1 text-center md:text-left">
                        Copyright © {{ date }}
                        <a href="javascript:void(0)"
                            class="text-white hover:text-blueGray-300 text-sm font-semibold py-1">
                            Creative Tim
                        </a>
                    </div>
                </div>
                <div class="w-full md:w-8/12 px-4">
                    <ul class="flex flex-wrap list-none md:justify-end justify-center">
                        <footer-small-element v-for="element in footerSmallElements" :key="element" :name="element.name" :tohref="element.tohref"/>
                    </ul>
                </div>
            </div>
        </div>

    </footer>
</template>

<script setup>

import FooterSmallElement from './FooterSmallElement.vue';

const date = new Date().getFullYear();

const props = defineProps({
    absolute: {
        type: Boolean,
        default: false
    }
})

const { absolute } = props

const footerSmallElements = [
    { name: 'Miguel Ramos Miller', tohref: 'javascript:void(0)' },
    { name: 'About Us', tohref: 'javascript:void(0)' },
    { name: 'Blog', tohref: 'javascript:void(0)' },
    { name: 'MIT License', tohref: 'javascript:void(0)' },

]


</script>



<style lang="scss" scoped>
</style>