<template>
<!-- users -->
  <div class="flex flex-wrap">
    <div class="w-full mb-12 px-4">
      <Suspense>
        <template #default>
          <transition>
            <card-table-user />
          </transition>
        </template>
        <template #fallback>
          <card-table-skeleton />
        </template>
      </Suspense>
    </div>

    <!-- <div class="w-full mb-12 px-4">
      Espacio
    </div> -->
  </div>
</template>

<script setup>
import CardTableUser from '../../components/Cards/Users/CardTableUser.vue';
import CardTableSkeleton from '../../components/Cards/CardTableSkeleton.vue';


</script>

<style lang="scss" scoped>
</style>