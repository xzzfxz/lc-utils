<template>
  <Teleport to="body">
    <div class="search-select-container">
      <div class="input-container">
        <input class="search-input" v-model="state.input" />
      </div>
      <div class="options-container">
        <template v-if="state.options.length">
          <div
            class="option-item"
            v-for="option in state.options"
            @click="handleSelectOption(option)"
          >
            {{ option[props.optionLabelProp.label] }}
          </div>
        </template>
        <template v-else>
          <slot name="empty">
            <div class="empty">暂无数据</div>
          </slot>
        </template>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue';

const emit = defineEmits(['select']);

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  width: {
    type: [Number, String],
    default: '100%',
  },
  options: {
    type: Array,
    default: () => [],
  },
  optionLabelProp: {
    type: Object,
    default: () => ({
      label: 'label',
      value: 'value',
    }),
  },
});

const state: any = reactive({
  // 输入框中的值
  input: '',
  options: [],
});

// 绑定值
watch(
  () => props.value,
  (val) => {
    state.input = val;
  }
);

// 监测下拉列表的变化
watch(
  () => props.options,
  (options) => {
    state.options = options;
  },
  { immediate: true }
);

// 选中选项
const handleSelectOption = (option: any) => {
  emit('select', option);
  state.input = option[props.optionLabelProp.label];
};
</script>

<style lang="scss" scoped>
$primaryColor: #1890ff;
$bgColor: #188fff3e;

.search-select-container {
  .input-container {
    display: flex;
    align-items: center;
    .search-input {
      width: 100%;
      min-height: 24px;
      padding: 0 4px;
      box-sizing: border-box;
      font-size: 12px;
      outline-color: $primaryColor;
    }
  }
  .options-container {
    padding: 4px 0;
    border-radius: 4px;
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
      0 9px 28px 8px #0000000d;
    .option-item {
      height: 24px;
      padding: 0 4px;
      display: flex;
      align-items: center;
      cursor: default;
      font-size: 14px;
      &:hover {
        background-color: $bgColor;
      }
    }
    .empty {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
    }
  }
}
</style>
