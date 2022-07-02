<template>
    <div>
    <!-- <auth-navbar /> -->
    <main>
      <section class="relative w-full h-full pt-28 min-h-screen">
        <div
          class="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat"
          :style="`background-image: url('${registerBg2}');`"
        ></div>
        <router-view />
        <!-- <footer-small absolute /> -->
      </section>
    </main>
  </div>
</template>

<script setup>
import AuthNavbar from '../components/Navbars/AuthNavbar.vue';
import FooterSmall from '../components/Footers/FooterSmall.vue';

import registerBg2 from '../assets/img/register_bg_2.png'
</script>

<style lang="scss" scoped>

</style>