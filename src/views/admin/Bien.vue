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
import CardTable from  '../../components/Cards/CardTable.vue'
import CardTableSkeleton from '../../components/Cards/CardTableSkeleton.vue';
import TheTable from '../../components/Tables/TheTable.vue';

</script>

<style lang="scss" scoped>
</style>