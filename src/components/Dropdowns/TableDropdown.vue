<template>
    <div>
        <a class="text-blueGray-500 py-1 px-3" href="#pablo" ref="btnDropdownRef" @click="toggleDropdown($event)">
            <i class="fas fa-ellipsis-v"></i>
        </a>
        <div ref="popoverDropdownRef"
            class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48" :class="{
                hidden: !dropdownPopoverShow,
                block: dropdownPopoverShow,
            }">
            <a href="javascript:void(0);"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                Action
            </a>
            <a href="javascript:void(0);"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                Another action
            </a>
            <a href="javascript:void(0);"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                Something else here
            </a>
        </div>
    </div>
</template>

<script setup>

import { createPopper } from "@popperjs/core";
import { ref } from "vue";

const dropdownPopoverShow = ref(false);

const btnDropdownRef = ref();
const popoverDropdownRef = ref('');


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

</script>

<style lang="scss" scoped>
</style>