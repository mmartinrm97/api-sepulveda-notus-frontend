<template>
   <li class="items-center">
            <router-link class="text-slate-700 hover:text-slate-500 text-xs uppercase py-3 font-bold block"
              :to="toRoute">
              <i :class="iconClass" class="text-slate-300 mr-2 text-sm"></i>
              {{name}}
            </router-link>
          </li>
</template>

<script setup>

const props = defineProps({
    name: String,
    toRoute: Object,
    iconClass: String
})

const {name, toRoute, iconClass} = props

</script>

<style lang="scss" scoped>

</style>