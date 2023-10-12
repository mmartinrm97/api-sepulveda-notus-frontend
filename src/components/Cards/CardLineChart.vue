<template>
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
  >
    <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full max-w-full flex-grow flex-1">
          <h6 class="uppercase text-slate-400 mb-1 text-xs font-semibold">
            Overview
          </h6>
          <h2 class="text-slate-700 text-xl font-semibold">
            Bienes por mes
          </h2>
        </div>
      </div>
    </div>
    <div class="p-4 flex-auto">
      <!-- Chart -->
      <div class="relative h-350-px">
        <canvas id="line-chart"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import Chart from "chart.js";
import { onMounted } from "vue";
import cardLineChart from "../../assets/js/CardLineChart";
import axios from "axios";
import cardBarChart from "../../assets/js/CardBarChart";

const datasetColors = [
      {
        backgroundColor: "#4c51bf",
        borderColor: "#4c51bf",
        data: [65, 78, 66, 44, 56, 67, 75],
        fill: false,
      },
      {
        backgroundColor: "#b00e0e",
        borderColor: "#b00e0e",
        fill: false,
      },
      {
        backgroundColor: "#ffd600",
        borderColor: "#ffd600",
        fill: false,
      },
      {
        backgroundColor: "#00d6b4",
        borderColor: "#00d6b4",
        fill: false,
      },
      {
        backgroundColor: "#054d1e",
        borderColor: "#054d1e",
        fill: false,
      }
    ];

onMounted(async ()=>{

  const token = localStorage.getItem('authToken');
  const urlGraphBar = `${import.meta.env.VITE_APP_URL}/api/v1/graphic-reports/goods-by-date-acquired`;

  const resGraphBar = await axios.get(urlGraphBar, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })


  const ctx = document.getElementById("line-chart").getContext("2d");

  const selectedColors = [];

  cardLineChart.data.datasets = resGraphBar.data.data.map((item) => {

    // Selecciona un color aleatorio del array datasetColors que no se haya utilizado
    let randomColorIndex;
    do {
      randomColorIndex = Math.floor(Math.random() * datasetColors.length);
    } while (selectedColors.includes(randomColorIndex));

    // Registra el color seleccionado
    selectedColors.push(randomColorIndex);

    const randomColor = datasetColors[randomColorIndex];
    const backgroundColor = randomColor.backgroundColor;
    const borderColor = randomColor.borderColor;

    return {
      label: item.year,
      fill: false,
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      data: item.totals_by_month.map((month) => month.total),
    }
  })

  window.myLine = new Chart(ctx, cardLineChart);
});

</script>

<style lang="scss" scoped>

</style>
