<template>
  <div>
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton
          class="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <div class="items-center flex">
            <span
              class="w-12 h-12 text-sm text-white inline-flex items-center justify-center rounded-none">
              <img alt="..." class="w-full rounded-none align-middle border-none shadow-lg" :src="image" />
            </span>
          </div>
        </MenuButton>
      </div>

      <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
        <MenuItems
          class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
            <button :class="[
              active ? 'bg-lightBlue-500 text-white' : 'text-gray-900',
              'group flex w-full items-center rounded-md px-2 py-2 text-sm',
            ]">

              Edit
            </button>
            </MenuItem>
            <MenuItem v-slot="{ active }">
            <button :class="[
              active ? 'bg-lightBlue-500 text-white' : 'text-gray-900',
              'group flex w-full items-center rounded-md px-2 py-2 text-sm',
            ]">

              Duplicate
            </button>
            </MenuItem>
          </div>
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
            <button :class="[
              active ? 'bg-lightBlue-500 text-white' : 'text-gray-900',
              'group flex w-full items-center rounded-md px-2 py-2 text-sm',
            ]">

              Archive
            </button>
            </MenuItem>
            <MenuItem v-slot="{ active }">
            <button :class="[
              active ? 'bg-lightBlue-500 text-white' : 'text-gray-900',
              'group flex w-full items-center rounded-md px-2 py-2 text-sm',
            ]">

              Move
            </button>
            </MenuItem>
          </div>

          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
            <button :class="[
              active ? 'bg-lightBlue-500 text-white' : 'text-gray-900',
              'group flex w-full items-center rounded-md px-2 py-2 text-sm',
            ]">

              Delete
            </button>
            </MenuItem>
            <MenuItem v-slot="{ active }">
            <button @click="authStore.submitLogout()" :class="[
              active ? 'bg-lightBlue-500 text-white' : 'text-gray-900',
              'group flex w-full items-center rounded-md px-2 py-2 text-sm',
            ]">

              Cerrar Sesión
            </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script setup>

// import { createPopper } from "@popperjs/core";
import image from '../../assets/img/sepulveda.png'
import { createPopper } from "@popperjs/core";
import { ref } from "vue";
import { useAuthStore } from '../../stores/Auth';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

const dropdownPopoverShow = ref(false)

const btnDropdownRef = ref();
const popoverDropdownRef = ref();

const toggleDropdown = (event) => {
  event.preventDefault();
  if (dropdownPopoverShow.value) {
    dropdownPopoverShow.value = false;
  } else {
    dropdownPopoverShow.value = true;
    createPopper(btnDropdownRef.value, popoverDropdownRef.value, {
      placement: "bottom-start"
    })
  }
}

const authStore = useAuthStore();


</script>

<style lang="scss" scoped>
</style>