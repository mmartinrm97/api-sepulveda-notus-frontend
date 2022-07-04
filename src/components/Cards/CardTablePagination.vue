<template>
    <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <!-- <div class="flex-1 flex justify-between sm:hidden">
            <a href="#"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous </a>
            <a href="#"
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next </a>
        </div> -->

        <!-- <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"> -->
        <div class="sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
                <p class="text-sm text-gray-700">
                    Mostrando del
                    {{ ' ' }}
                    <span class="font-medium">{{ modelStore.meta !== undefined ? modelStore.meta.from : 0
                    }}</span>
                    {{ ' ' }}
                    al
                    {{ ' ' }}
                    <span class="font-medium">{{ modelStore.meta !== undefined ? modelStore.meta.to : 0
                    }}</span>
                    {{ ' ' }}
                    de
                    {{ ' ' }}
                    <span class="font-medium">{{ modelStore.meta !== undefined ? modelStore.meta.total : 0
                    }}</span>
                    {{ ' ' }}
                    registros
                </p>
            </div>
            <div>
                <paginate :page-count="lastPage" :click-handler="page => props.modelStoreFunction(
                page, ...camposPaginacion)" :prev-text="'Prev'" :next-text="'Next'"
                    :container-class="'relative z-0 inline-flex rounded-md shadow-sm -space-x-px cursor-pointer'"
                    :page-link-class="'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50'"
                    :prev-link-class="'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50'"
                    :next-link-class="'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50'"
                    :no-li-surround="true"
                    :active-class="'z-10 bg-lightBlue-50 border-lightBlue-500 text-lightBlue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium'"
                    :hide-prev-next="true">
                </paginate>
            </div>
        </div>
    </div>
</template>

<script setup>
import { watch } from "vue";
import Paginate from "vuejs-paginate-next";

const props = defineProps({
    modelStore: Object,
    lastPage: Number,
    modelStoreFunction: Function,
    camposPaginacion: Array
});

// watch(() => props.lastPage, async (curr, prev) => {
//     await props.modelStoreFunction(1, ...props.camposPaginacion)
//     console.log(props.modelStore.meta);
// });


</script>

<style lang="scss" scoped>
</style>