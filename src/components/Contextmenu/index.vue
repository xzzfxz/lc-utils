<template>
  <div class="contextmenu-container">
    <div @contextmenu="handleRightClick" ref="rightItem" class="right-div">
      <slot></slot>
      <div
        class="right-container"
        ref="rightDiv"
        v-show="showRightDiv"
        :style="rightDivStyle"
      >
        <div class="right-item" @click="handleItemClick">测试</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, onMounted, onBeforeUnmount } from 'vue';

const emit = defineEmits(['itemClick']);

const rightItem = ref<HTMLDivElement>();
const rightDiv = ref<HTMLDivElement>();
const showRightDiv = ref(false);

const state = reactive({
  left: 10,
  top: 10,
});

// 右键弹窗位置
const rightDivStyle = computed(() => {
  return { left: state.left + 'px', top: state.top + 'px' };
});

// 右键显示弹窗
const handleRightClick = (e: any) => {
  e.preventDefault();
  const bound = rightItem.value?.getBoundingClientRect() as DOMRect;
  state.left = e.pageX - bound?.x + 5;
  state.top = e.pageY - bound?.y + 5;
  showRightDiv.value = true;
};

// 点击空白处关闭弹窗
const handleCloseRightDiv = (e: Event) => {
  const tDom = e.target as Node;
  if (rightDiv.value !== tDom && !rightDiv.value?.contains(tDom)) {
    // 关闭弹窗
    showRightDiv.value = false;
  }
};

// 点击右键中的选项
const handleItemClick = () => {
  emit('itemClick');
};

// 关闭弹窗
const hide = () => {
  showRightDiv.value = false;
};

defineExpose({ hide });

onMounted(() => {
  document.addEventListener('click', handleCloseRightDiv);
});
onBeforeUnmount(() => {
  document.removeEventListener('click', handleCloseRightDiv);
});
</script>

<style lang="scss" scoped>
.right-div {
  position: relative;
}
.right-container {
  min-width: 100px;
  width: fit-content;
  background-color: #ffffff;
  border: 1px solid red;
  position: absolute;
}
</style>
