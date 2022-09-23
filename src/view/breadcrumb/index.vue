<template>
  <!-- 渲染面包屑 -->
  <div v-for="item in state.breadList">{{ item.bread }}</div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

// 路由列表
const routeList = [
  {
    path: '/vList',
    // 路由名称，根据路由名称跳转
    name: 'vList',
    meta: {
      // 面包屑名称
      name: '首页',
    },
    children: [
      {
        path: 'a',
        name: 'a',
        meta: {
          name: '我的测试a',
        },
        children: [
          {
            path: 'about',
            name: 'about',
            meta: {
              name: '关于我们',
            },
          },
        ],
      },
      {
        path: 'b',
        name: 'b',
        meta: {
          name: '我的测试b',
        },
        children: [
          {
            path: 'contact',
            name: 'contact',
            meta: {
              name: '联系我们',
            },
          },
        ],
      },
    ],
  },
];
// 当前路由name
const currentRouteName = 'contact';

// 获取面包屑List
const getBreadList = (list: any): any => {
  for (const route of list) {
    if (route.name === currentRouteName) {
      return [{ name: route.name, bread: route.meta.name }];
    } else {
      if (route.children?.length) {
        const result = getBreadList(route.children);
        // 有选中
        if (result?.length) {
          return [{ name: route.name, bread: route.meta.name }, ...result];
        }
      }
    }
  }
  return [];
};
const list = getBreadList(routeList);

const state = reactive({
  breadList: list,
});
console.log(list);
</script>
