<template>
  <div class="flex flex-wrap">
    <div class="w-full mb-12 px-4">
      <Suspense>
        <template #default>
          <transition>
            <card-table-almacen />
          </transition>
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
import CardTableAlmacen from '../../components/Cards/CardTableAlmacen.vue';
import CardTableSkeleton from '../../components/Cards/CardTableSkeleton.vue';
</script>

<style lang="scss" scoped>
</style>