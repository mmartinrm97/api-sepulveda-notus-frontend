<template>
  <div class="flex flex-wrap">
    <div class="w-full mb-12 px-4">
      <Suspense>
        <template #default>
            <CardTablePrueba />
        </template>
        <template #fallback>
          <card-table-skeleton />
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script setup>
import CardTableSkeleton from '../../components/Cards/CardTableSkeleton.vue';
import CardTablePrueba from '../../components/Cards/Reportes/CardTablePrueba.vue';


</script>

<style lang="scss" scoped>
</style>