<template>
   <footer class="block py-4">
    <div class="container mx-auto px-4">
      <hr class="mb-4 border-b-1 border-slate-200" />
      <div
        class="flex flex-wrap items-center md:justify-between justify-center"
      >
        <div class="w-full md:w-4/12 px-4">
          <div
            class="text-sm text-slate-500 font-semibold py-1 text-center md:text-left"
          >
            Copyright © {{ date }}
            <a
              href="javascript:void(0)"
              class="text-slate-500 hover:text-slate-700 text-sm font-semibold py-1"
            >
              Miguel Ramos Miller
            </a>
          </div>
        </div>
        <div class="w-full md:w-8/12 px-4">
          <ul class="flex flex-wrap list-none md:justify-end justify-center">
            <footer-admin-right-element v-for="element in footerAdminRightElements" :key="element" :name="element.name"
            :toRoute="element.toRoute"/>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>

import FooterAdminRightElement from './FooterAdminRightElement.vue';

    const date = new Date().getFullYear();

    const footerAdminRightElements = [
      {name: 'Miguel Ramos', tohref: 'javascript:void(0)'},
      {name: 'About Us', tohref: 'javascript:void(0)'},
      {name: 'Blog', tohref: 'javascript:void(0)'},
      {name: 'MIT License', tohref: 'javascript:void(0)'},
    ]
</script>

<style lang="scss" scoped>

</style>