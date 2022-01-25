<template>
    <div class="v-list-container" ref="listContainer" @scroll="handleScroll">
        <div class="list-container" :style="listStyle">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const emit = defineEmits(['indexChange']);

const props = defineProps({
    // 每行元素高度
    itemHeight: {
        type: Number,
        default: 160
    },
    // 每屏显示条数
    size: {
        type: Number,
        default: 6,
    },
    // 总数据长度
    dataLength: {
        type: Number,
        default: 0,
    },
    // 预加载n屏数据
    page: {
        type: Number,
        default: 1
    }
})
const listContainer = ref<HTMLElement | null>(null);
let startIndex = ref(0);

// 结束索引
const endIndex = computed(() => {
    let index = 0;
    if (startIndex.value > props.size * props.page) {
        index = startIndex.value;
    }
    return index + props.size + props.size * props.page;
});

// 计算样式
const listStyle = computed(() => {
    let index = 0;
    if (startIndex.value > props.size * props.page) {
        index = startIndex.value - props.size * props.page;
    }
    const bottom = props.dataLength - endIndex.value;
    return {
        paddingTop: index * props.itemHeight + 'px',
        paddingBottom: bottom * props.itemHeight + 'px'
    }
});

watch([startIndex, endIndex], (val) => {
    let index = 0;
    const startIndex = val[0];
    if (startIndex > props.size * props.page) {
        index = startIndex - props.size * props.page;
    }
    emit('indexChange', index, val[1]);
});

// 容器滚动
const handleScroll = () => {
    window.requestAnimationFrame(() => {
        const scrollTop = listContainer.value?.scrollTop || 0;
        startIndex.value = Math.floor(scrollTop / props.itemHeight);
    });
}
</script>

<style lang="scss" scoped>
.v-list-container {
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
    height: 100%;
    border: 1px solid blue;
    .list-container {
        width: 100%;
    }
}
</style>