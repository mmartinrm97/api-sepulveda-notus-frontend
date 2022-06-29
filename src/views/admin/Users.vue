<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <!-- <transition>
        <card-table-user v-if="isVisible" />
      </transition> -->

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
import { onMounted, ref } from 'vue';
import { useUserStore } from '../../stores/Users';
import CardTableUser from '../../components/Cards/Users/CardTableUser.vue';
import CardTableSkeleton from '../../components/Cards/CardTableSkeleton.vue';

const isVisible = ref(false)

// const alerta = (async ({ columna, direccion }) => {

//   console.log('columna', columna);
//   console.log('direccion', direccion);
//   await userStore.getUsers(1, '', '', '', '', columna, direccion)
//   formData.value = userStore.users;

// })

const alerta = (() => {
  //  alert('tabla lista');
  isVisible.value = true
})


onMounted(async () => {
  alerta();
  // formData.value = userStore.users;
  // console.log('formData',formData.value);
  isVisible.value = true;
});

// watch(formData, (curr, prev) => {
//   console.log("🚀 ~ file: Users.vue ~ line 60 ~ watch ~ prev", prev)
//   console.log("🚀 ~ file: Users.vue ~ line 60 ~ watch ~ curr", curr)
// });


</script>

<style lang="scss" scoped>
</style>