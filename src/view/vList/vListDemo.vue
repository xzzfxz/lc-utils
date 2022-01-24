<template>
    <div class="container-demo">
        <v-list @indexChange="handleIndexChange" :dataLength="data.length">
            <div class="v-list-item" v-for="item in lastData" :key="item">{{ item }}</div>
        </v-list>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import vList from '@/components/vList/vList.vue';

const startIndex = ref(0);
const endIndex = ref(6);
// 原始数据
const data: number[] = [];
for (let i = 0; i < 500; i++) {
    data.push(i);
}

// 索引改变
const handleIndexChange = (start: number, end: number) => {
    // console.log(start, end);
    startIndex.value = start;
    endIndex.value = end;
}


// 截取显示的数据
const lastData = computed(() => {
    return data.slice(startIndex.value, endIndex.value);
})


</script>

<style lang="scss" scoped>
.container-demo {
    width: 90vw;
    height: 90vh;
    margin-left: 5vw;
    border: 1px solid red;
    overflow: hidden;
}
.v-list-item {
    height: 160px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    padding-left: 50px;
}
</style>