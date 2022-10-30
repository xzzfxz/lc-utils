<template>
  <div v-for="(item, index) in routerList" :key="item.id">
    <router-link :to="item.link">{{ index + 1 }}. {{ item.name }}</router-link>
  </div>
</template>

<script lang="ts" setup>
const routerList = [
  { id: 1, name: '虚拟列表', link: '/vlist' },
  { id: 2, name: '右键菜单', link: '/contextmenu' },
  { id: 3, name: '获取面包屑', link: '/breadcrumb' },
];
</script>
