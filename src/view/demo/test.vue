<template>
  <div>
    <Input v-model="name" />
    <Tooltip>测试</Tooltip>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Input, Tooltip } from "ant-design-vue";

const name = ref("");
</script>

<style lang="scss" scoped>
.container {
  width: 200px;
  height: 200px;
  position: absolute;
  border: 1px solid red;
}
.child {
  position: absolute;
  border: 1px solid blue;
}
</style>
