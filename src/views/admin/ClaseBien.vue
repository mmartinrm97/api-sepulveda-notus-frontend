<template>
  <div class="flex flex-wrap ">
    <div class="w-full mb-12 px-4">

      <Suspense>
        <template #default>
          <transition>
            <card-table-clase-bien />
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
import CardTableClaseBien from '../../components/Cards/CardTableClaseBien.vue';
import CardTableSkeleton from '../../components/Cards/CardTableSkeleton.vue';

</script>

<style lang="scss" scoped>
</style>