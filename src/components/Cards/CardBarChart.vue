<template>
  <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
    <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full max-w-full flex-grow flex-1">
          <h6 class="uppercase text-slate-400 mb-1 text-xs font-semibold">
            Clasificación
          </h6>
          <h2 class="text-slate-700 text-xl font-semibold">
            Bienes por estado de conservación
          </h2>
        </div>
      </div>
    </div>
    <div class="p-4 flex-auto">
      <div class="relative h-350-px">
        <canvas id="bar-chart"></canvas>
      </div>
    </div>
  </div>

</template>

<script setup>

import Chart from "chart.js";
import {onMounted, ref} from "vue";
import cardBarChart from "../../assets/js/CardBarChart";
import axios from "axios";


  onMounted(async () => {

    const token = localStorage.getItem('authToken');
    const urlGraphBar = `${import.meta.env.VITE_APP_URL}/api/v1/graphic-reports/goods-by-conservation-status`;

    const resGraphBar = await axios.get(urlGraphBar, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    const ctx = document.getElementById("bar-chart").getContext("2d");
    //modify the chart according to the data
    cardBarChart.data.labels = resGraphBar.data.data.map((item) => item.state_of_conservation);

    cardBarChart.data.datasets[0].data = resGraphBar.data.data.map((item) => item.total);
    cardBarChart.data.datasets[0].label = 'Total bienes'

    window.myBar = new Chart(ctx, cardBarChart);
  })

</script>

<style lang="scss" scoped>
</style>
