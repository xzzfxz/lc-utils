<template>
  <input
    v-model="value"
    class="self-input-number"
    :maxlength="props.maxLength"
    @input="handleInput"
    @keydown.enter="handleEnter"
    @blur="handleBlur"
  />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const emit = defineEmits(['update:value', 'change', 'pressEnter', 'blur']);

const props = defineProps({
  value: {
    type: [String, Number],
    default: '',
  },
  // 小数
  precision: {
    type: Number,
  },
  maxLength: {
    type: Number,
  },
  min: {
    type: Number,
    default: -Infinity,
  },
  max: {
    type: Number,
    default: Infinity,
  },
});

// 获取value值
const getVal = () => {
  const val = value.value;
  if (val === '-') {
    return val;
  } else if (!val && val !== '0') {
    return val;
  } else if (val[val.length - 1] === '.') {
    return val;
  } else {
    return Number(val);
  }
};

// 触发改变
const emitChange = () => {
  const val = getVal();
  emit('update:value', val);
  emit('change', val);
};

const value = ref('');
watch(
  () => props.value,
  (val) => {
    value.value = val + '';
  },
  {
    immediate: true,
  }
);

// 获取正则
const getReg = () => {
  if (props.precision) {
    // 有限制小数个数
    return new RegExp(`^-?\\d*\\.?\\d{0,${props.precision}}$`);
    // return new RegExp(
    //   `^((-|[1-9]*)\\.?\\d{0, ${props.precision}}$)|(-|0\\.\\d*[1-9]$)`
    // );
  } else if (props.precision === 0) {
    // 整数
    return new RegExp(`^-?\\d*$`);
  } else {
    // 小数，不限位数
    return new RegExp(`^-?\\d*\\.?\\d{0,}$`);
  }
};

// 删除不符合要求的字符
const deleteCharLast = (val: string) => {
  if (!val?.length) {
    value.value = '';
    emitChange();
    return;
  }
  const reg = getReg();
  if (!reg.test(val)) {
    // 不符合正则
    val = val.substring(0, val.length - 1);
    deleteCharLast(val);
    return;
  }
  const nVal = Number(val);
  if (!isNaN(nVal)) {
    // 是数字时判断大小
    if (nVal > props.max) {
      // 超过最大值
      value.value = props.max + '';
      emitChange();
      return;
    }
    if (nVal < props.min) {
      // 小于最小值
      value.value = props.min + '';
      emitChange();
      return;
    }
  }
  value.value = val;
  if (val[val.length - 1] === '.') {
    // return;
  }
  emitChange();
};

// 输入改变
const handleInput = (e: any) => {
  const val = e.target?.value;
  if (!val) {
    //
    emitChange();
    return;
  }
  deleteCharLast(val);
};

// 最终判断是否输入符合规范
const judgeCorrect = () => {
  const val = getVal();
  if (val === '-' || isNaN(Number(val))) {
    value.value = '';
    emitChange();
    return false;
  }
  return true;
};

// enter事件
const handleEnter = () => {
  if (!judgeCorrect()) {
    return false;
  }
  const val = getVal();
  emit('pressEnter', val);
};
const handleBlur = () => {
  if (!judgeCorrect()) {
    return false;
  }
  const val = getVal();
  emit('blur', val);
};
</script>

<style scoped lang="scss">
.self-input-number {
  height: 24px;
  width: 100%;
  padding: 0 4px;
  box-sizing: border-box;
  border: 1px solid #dcdcdc;
  border-radius: 2px;
  outline: none;
  font-size: 12px;
  color: #646464;
}
</style>
