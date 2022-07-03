<template>
  <nav
    class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
    <div
      class="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
      <!-- Toggler -->
      <button
        class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
        type="button" v-on:click="toggleCollapseShow('bg-white m-2 py-3 px-6 md:hidden')">
        <i class="fas fa-bars"></i>
      </button>
      <!-- Brand -->
      <router-link
        class="md:block text-left md:pb-2 text-slate-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
        :to="{ name: 'dashboard' }">
        Sepulveda App
      </router-link>
      <!-- User -->
      <ul class="md:hidden items-center flex flex-wrap list-none">
        <li class="inline-block relative">
          <notification-dropdown />
        </li>
        <li class="inline-block relative">
          <user-dropdown />
        </li>
      </ul>
      <!-- Collapse -->
      <div
        class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded"
        v-bind:class="collapseShow">
        <!-- Collapse header -->
        <div class="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-slate-200 z-30">
          <div class="flex flex-wrap">
            <div class="w-6/12">
              <router-link
                class="md:block text-left md:pb-2 text-slate-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                :to="{ name: 'dashboard' }">
                Sepulveda App
              </router-link>
            </div>
            <div class="w-6/12 flex justify-end">
              <button type="button"
                class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                v-on:click="toggleCollapseShow('hidden')">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
        <!-- Form -->
        <form class="mt-6 mb-4 md:hidden">
          <div class="mb-3 pt-0">
            <input type="text" placeholder="Search"
              class="px-3 py-2 h-12 border border-solid border-slate-500 placeholder-slate-300 text-slate-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal" />
          </div>
        </form>

        <!-- Divider -->
        <hr class="my-4 md:min-w-full" />
        <!-- Heading -->
        <sidebar-heading name="Inicio" />
        <!-- Navigation -->

        <ul class="md:flex-col md:min-w-full flex flex-col list-none">

          <sidebar-admin-element name="Dashboard" :toRoute="{ name: 'dashboard' }" iconClass="fas fa-tv" />

        </ul>

        <!-- Divider -->
        <hr class="my-4 md:min-w-full" />
        <!-- Heading -->
        <sidebar-heading name="Bienes" />
        <!-- Navigation -->

        <ul class="md:flex-col md:min-w-full flex flex-col list-none">

          <sidebar-admin-element v-for="element in sidebarBienesElements" :key="element" :name="element.name"
            :toRoute="element.toRoute" :iconClass="element.iconClass" />
        </ul>



        <!-- Divider -->
        <hr class="my-4 md:min-w-full" />
        <!-- Heading -->
        <sidebar-heading name="Administración" />
        <!-- Navigation -->

        <ul class="md:flex-col md:min-w-full flex flex-col list-none">

          <sidebar-admin-element v-for="element in sidebarAdminElements" :key="element" :name="element.name"
            :toRoute="element.toRoute" :iconClass="element.iconClass" />

        </ul>

        <!-- Divider -->
        <!-- <hr class="my-4 md:min-w-full" /> -->
        <!-- Heading -->
        <!-- <sidebar-heading name="Autenticación" /> -->
        <!-- Navigation -->

        <!-- <ul class="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
          <sidebar-auth-element name="Login" toRoute="" iconClass="fas fa-fingerprint" />

          <sidebar-auth-element name="Register" toRoute="" iconClass="fas fa-clipboard-list" />

        </ul> -->


        <!-- Divider -->
        <!-- <hr class="my-4 md:min-w-full" /> -->
        <!-- Heading -->
        <!-- <sidebar-heading name="No Layout Pages" /> -->
        <!-- Navigation -->

        <!-- <ul class="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
          <sidebar-no-layout-element name="Landing Page" toRoute="" iconClass="fas fa-newspaper" />

          <sidebar-no-layout-element name="Profile Page" toRoute="" iconClass="fas fa-user-circle" />
        </ul> -->

        <!-- Divider -->
        <!-- <hr class="my-4 md:min-w-full" /> -->
        <!-- Heading -->
        <!-- <sidebar-heading name="Documentation" /> -->
        <!-- Navigation -->
        <!-- <ul class="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
          <sidebar-documentation-element v-for="element in sidebarDocumentElements" :key="element" :name="element.name"
            :tohref="element.tohref" :iconClass="element.iconClass" />

          <sidebar-documentation-element name="Styles"
            tohref="https://www.creative-tim.com/learning-lab/tailwind/vue/colors/notus"
            iconClass="fas fa-paint-brush" />
        </ul> -->


      </div>
    </div>
  </nav>
</template>

<script setup>

import NotificationDropdown from '../Dropdowns/NotificationDropdown.vue';
import UserDropdown from '../Dropdowns/UserDropdown.vue';
import SidebarAdminElement from './SidebarAdminElement.vue';
import SidebarHeading from './SidebarHeading.vue';
import SidebarAuthElement from './SidebarAuthElement.vue';
import SidebarNoLayoutElement from './SidebarNoLayoutElement.vue';
import SidebarDocumentationElement from './SidebarDocumentationElement.vue';
import { ref } from 'vue';

const sidebarAdminElements = [
  { name: 'Usuarios', toRoute: { name: 'users' }, iconClass: 'fas fa-users' },
  { name: 'Almacenes', toRoute: { name: 'almacenes' }, iconClass: 'fas fa-warehouse' },
  { name: 'Settings', toRoute: { name: 'settings' }, iconClass: 'fas fa-tools' },
  { name: 'Tables', toRoute: { name: 'tables' }, iconClass: 'fas fa-table' },
  { name: 'Maps', toRoute: { name: 'maps' }, iconClass: 'fas fa-map-marked' },
]

const sidebarBienesElements = [
  { name: 'Lista de Bienes', toRoute: { name: 'bienes' }, iconClass: 'fas fa-box-open' },
  { name: 'Catálogo de Bienes', toRoute: { name: 'catalogosDeBienes' }, iconClass: 'fas fa-book' },
  { name: 'Clases de Bienes', toRoute: { name: 'clasesDeBienes' }, iconClass: 'fas fa-boxes' },
  { name: 'Grupo de Bienes', toRoute: { name: 'gruposdeBienes' }, iconClass: 'fas fa-sitemap' },
]

const sidebarDocumentElements = [
  { name: 'Styles', tohref: "", iconClass: 'fas fa-paint-brush' },
  { name: 'CSS Components', tohref: "", iconClass: 'fab fa-css3-alt' },
  { name: 'Angular', tohref: "", iconClass: 'fab fa-angular' },
  { name: 'Javascript', tohref: "", iconClass: 'fab fa-js-square' },
  { name: 'NextJS', tohref: "", iconClass: 'fab fa-react' },
  { name: 'React', tohref: "", iconClass: 'fab fa-react' },
  { name: 'Svelte', tohref: "", iconClass: 'fas fa-link' },
  { name: 'VueJS', tohref: "", iconClass: 'fa-vuejs' },
]
const collapseShow = ref('hidden')
const toggleCollapseShow = (classes) => {
  // console.log('collapseShow', collapseShow.value);
  collapseShow.value = classes
}

</script>

<style lang="scss" scoped>
</style>
