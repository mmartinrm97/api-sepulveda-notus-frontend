<template>
    <div class="flex flex-wrap">
        <div class="w-full mb-12 px-4">
            <Suspense>
                <template #default>
                    <transition>
                       <card-table-bien/>
                    </transition>
                </template>
                <template #fallback>
                    <card-table-skeleton />
                </template>
            </Suspense>
        </div>
    </div>
</template>

<script setup>
import CardTableBien from  '../../components/Cards/Bienes/CardTableBien.vue'
import CardTableSkeleton from '../../components/Cards/CardTableSkeleton.vue';

</script>

<style lang="scss" scoped>
</style>