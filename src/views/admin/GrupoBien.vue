<template>
  <div class="flex flex-wrap">
    <div class="w-full mb-12 px-4">
      <Suspense>
        <template #default>
          <transition>
            <card-table-grupo-bien />
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
import CardTableGrupoBien from '../../components/Cards/CardTableGrupoBien.vue';
import CardTableSkeleton from '../../components/Cards/CardTableSkeleton.vue';

</script>

<style lang="scss" scoped>
</style>