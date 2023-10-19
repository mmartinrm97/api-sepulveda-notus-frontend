<template>
  <div
      class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-base text-slate-700">
            Reportes
          </h3>
        </div>
      </div>
    </div>
    <div class="block w-full overflow-x-auto">
      <!-- Projects table -->
      <table class="items-center w-full bg-transparent border-collapse">
        <thead class="thead-light">
        <tr>
          <th
              class="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
          >
            Nombre
          </th>
          <th
              class="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
          >
            Creado en
          </th>
          <th
              class="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px"
          >Progress
          </th>
          <th
              class="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px"
          >Descarga
          </th>
        </tr>
        </thead>
        <tbody>
        <!--        create a div with "no data "-->
        <tr v-if="props.batchId.length <= 0">
          <td class="text-center" colspan="4">
            <div class="flex justify-center">
              <div class="inline-flex rounded-md py-4">
                <span>No data</span>
              </div>
            </div>
          </td>
        </tr>
        <tr v-else>
          <th
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
          >
            {{ data?.name }}
          </th>
          <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
          >
            {{ new Date(data?.createdAt).toLocaleString('es-PE') }}
          </td>
          <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
          >
            <div class="flex items-center">
              <span class="mr-2">{{ data?.progress }}%</span>
              <div class="relative w-full">
                <div
                    class="overflow-hidden h-2 text-xs flex rounded bg-red-200"
                >
                  <div
                      :style="{ width: data ? data.progress + '%' : '0%' }"
                      class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                  ></div>
                </div>
              </div>
            </div>
          </td>
          <!--          add a button with pdf icon to download the pdf-->
          <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
          >
            <button :class="[data && data.progress < 100 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 ']"
                    :disabled="data && data.progress < 100"
                    class="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                    @click="downloadPDF">
              <i class="fas fa-file-pdf"></i> Descargar PDF
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import {onBeforeUnmount, onMounted, ref, watch} from "vue";
import axios from "axios";

const props = defineProps({
  batchId: {
    type: String,
  }
})

const isLoading = ref(true);
const data = ref();
const pollInterval = 1000;


// Definir una función para hacer una consulta a la API
const fetchData = async () => {
  isLoading.value = true;
  const token = localStorage.getItem('authToken');
  const urlBatch = `${import.meta.env.VITE_APP_URL}/api/v1/batch?batch_id=${props.batchId}`;

  const resBatchData = await axios.get(urlBatch, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  data.value = resBatchData.data.data;
  isLoading.value = false;

  if (data.value.progress === 100) {
    stopPolling();
  }
};

// Ejecutar la función de fetchData inicialmente y luego establecer un intervalo de polling
const pollingTimer = ref(null);

const startPolling = () => {
  fetchData(); // Ejecutar inmediatamente
  pollingTimer.value = setInterval(fetchData, pollInterval);
};

// Detener el polling cuando el progreso llegue al 100%
const stopPolling = () => {
  clearInterval(pollingTimer.value);
  pollingTimer.value = null;
};

// Iniciar el polling cuando se proporciona un ID de lote
watch(
    () => props.batchId,
    (newVal, oldVal) => {
      console.log(newVal, oldVal)
      if (newVal) {
        startPolling();
      } else {
        stopPolling();
      }
    }
);

//download pdf
const downloadPDF = () => {
  if (data && data?.value?.progress < 100) {
    // El botón está deshabilitado, no hagas nada
    return;
  }
  const token = localStorage.getItem('authToken');
  // Genera la URL para descargar el PDF
  const numbersInName = data.value.name.match(/\d+/);
  let number = 0;
  if (numbersInName) {
    number = numbersInName[0];
  }

  const url = `${import.meta.env.VITE_APP_URL}/api/v1/reports/download-pdf-report?report_id=${number}`;

  // Realiza una solicitud GET con el token de autorización
  axios
      .get(url,
          {
            responseType: "blob", // Importante: solicitar una respuesta en formato blob
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
      .then((response) => {
        // Crea una URL para el blob y abre una nueva ventana o pestaña para descargar el PDF
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "report.pdf";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error al descargar el PDF:", error);
      });

};

// Ejecutar la función de fetchData al inicio
onMounted(async () => {
  if (props.batchId) {
    await fetchData();
  }
});

// Detener el polling cuando se desmonta el componente para evitar fugas de memoria
onBeforeUnmount(() => {
  stopPolling();
});

</script>
<style lang="scss" scoped>

</style>
