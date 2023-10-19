<template>
  <div class="flex flex-wrap">
    <div class="w-full mb-12 px-4">
      <Suspense>
        <template #default>
          <CardTableReporte @send-batch-id="setBatchId"/>
        </template>
        <template #fallback>
          <card-table-skeleton/>
        </template>
      </Suspense>
    </div>
    <div class="w-full mb-12 px-4">
      <card-social-traffic :batch-id="batchId"  />
    </div>
  </div>
</template>

<script setup>
import CardTableSkeleton from '../../components/Cards/CardTableSkeleton.vue';
import CardTableReporte from '../../components/Cards/Reportes/CardTableReporte.vue'
import CardSocialTraffic from "../../components/Cards/CardSocialTraffic.vue";
import {ref} from "vue";

const batchId = ref('');

const setBatchId = (id) => {
  batchId.value = id;
}

</script>

<style lang="scss" scoped>
</style>
