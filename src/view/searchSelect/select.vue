<template>
  <SearchSelect :options="state.options"></SearchSelect>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import SearchSelect from '@/components/SearchSelect/index.vue';

const state = reactive({
  options: [
    { label: '张三', value: 1 },
    { label: '李四', value: 1 },
    { label: '不可预测', value: 1 },
    { label: '无人生还', value: 1 },
  ],
});
</script>

<style lang="scss" scoped></style>
