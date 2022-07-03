<template>
    <div class="relative flex items-stretch my-3 px-4 w-full sm:w-1/2 lg:w-1/4">
        <div class="flex absolute inset-y-0 left-0 items-center pl-7 pointer-events-none ">
            <i class="fas fa-search text-blueGray-300"></i>
        </div>

        <input :value="modelValue" type="text" :placeholder="placeholder"
            @input="$emit('update:modelValue', $event.target.value)"
            class="placeholder-blueGray-400 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none shadow focus:shadow-outline w-full pl-10 px-3" />
    </div>
</template>

<script setup>

defineProps({
    placeholder: String,
    modelValue: String,
});

defineEmits(['update:modelValue']);

</script>

<style lang="scss" scoped>
</style>