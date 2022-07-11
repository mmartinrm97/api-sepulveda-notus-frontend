<template>
    <div class="flex flex-wrap">
        <div class="w-full mb-12 px-4">
            <Suspense>
                <template #default>
                        <CardTableReporte />
                </template>
                <template #fallback>
                    <card-table-skeleton />
                </template>
            </Suspense>
        </div>
        <div class="w-full mb-12 px-4">
        </div>
    </div>
</template>

<script setup>
import CardTableSkeleton from '../../components/Cards/CardTableSkeleton.vue';
import CardTableReporte from '../../components/Cards/Reportes/CardTableReporte.vue'


</script>

<style lang="scss" scoped>
</style>