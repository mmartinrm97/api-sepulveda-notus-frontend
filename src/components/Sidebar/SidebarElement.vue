<template>
    <li class="items-center">
        <router-link :to="toRoute" v-slot="{ href, navigate, isActive }">
            <a :href="href" @click="navigate" class="text-xs uppercase py-3 font-bold block" :class="[
                isActive
                    ? 'text-lightBlue-500 hover:text-lightBlue-600'
                    : 'text-slate-700 hover:text-slate-500',
            ]">
                <i class="mr-2 text-sm" :class="[iconClass, isActive ? 'opacity-75' : 'text-slate-300']"></i>
                {{name}}
            </a>
        </router-link>
    </li>
</template>

<script setup>

const props = defineProps({
    name: String,
    toRoute: String,
    iconClass: String
})

const {name, toRoute, iconClass} = props

</script>

<style lang="scss" scoped>
</style>