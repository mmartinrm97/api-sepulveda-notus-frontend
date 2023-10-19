<template>
  <div>
    <div class="flex flex-wrap">
      <div class="w-full xl:w-4/12 px-4">
        <card-bar-chart/>
      </div>
      <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <card-line-chart/>
      </div>
    </div>
    <div class="flex flex-wrap mt-4">
      <div class="w-full  mb-12 xl:mb-0 px-4">
        <card-warehouses-goods-total/>
      </div>
<!--      <div class="w-full  mb-12 xl:mb-0 px-4">-->
<!--        <card-social-traffic/>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script setup>

import CardBarChart from '../../components/Cards/CardBarChart.vue';
import CardLineChart from '../../components/Cards/CardLineChart.vue';
import CardSocialTraffic from '../../components/Cards/CardSocialTraffic.vue';
import CardWarehousesGoodsTotal from "../../components/Cards/CardWarehousesGoodsTotal.vue";


</script>

<style lang="scss" scoped>

</style>
