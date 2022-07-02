<template>
    <div>
        <Popover class="absolute z-50">
            <PopoverButton>
                <a class="text-blueGray-500 py-1 px-3">
                    <i class="fas fa-ellipsis-v"></i>
                </a>
            </PopoverButton>

            <PopoverPanel
                class="bg-white text-base absolute z-40 top-6 right-0 float-left py-2 list-none text-left rounded shadow-lg min-w-48 transform">
                <button
                    class="text-sm text-left py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                    Editar
                </button>
                <a href="javascript:void(0);"
                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                    Activar
                </a>
                <a href="javascript:void(0);"
                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                    Eliminar
                </a>


            </PopoverPanel>
        </Popover>
    </div>
</template>

<script setup>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
</script>