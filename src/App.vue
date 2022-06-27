<template>
  <div>
    <router-view />
  </div>

</template>

<script setup>
console.log('env',import.meta.env.VITE_APP_URL);
</script>
<style>
</style>