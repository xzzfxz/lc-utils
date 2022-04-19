<template>
  <a-table
    :columns="columns"
    :data-source="state.data"
    :rowClassName="getRowClassName"
    :pagination="false"
    :customRow="rowEvent"
    rowKey="id"
  >
    <template #bodyCell="{ column, record }">
      <div v-if="column.dataIndex === 'deal'" @click.stop>
        <a-switch
          v-model:checked="record.deal"
          @change="handleSwitchChange($event, record)"
          checked-children="开"
          un-checked-children="关"
        />
      </div>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";

const columns = reactive([
  {
    title: "交易员姓名",
    dataIndex: "name",
    width: 112,
    align: "center",
  },
  {
    title: "机构名称",
    dataIndex: "namex",
    width: 164,
    align: "center",
  },
  {
    title: "偏好逻辑",
    dataIndex: "prefer",
    align: "center",
  },
  {
    title: "推荐设置",
    dataIndex: "deal",
    width: 108,
    align: "center",
  },
]);
const state: any = {
  data: [
    { name: "张三", namex: "机构名称", prefer: "偏好设置", deal: true, id: 1 },
    {
      name: "张三1",
      namex: "机构名称1",
      prefer: "偏好设置1",
      deal: true,
      id: 2,
    },
  ],
  selectedRows: [],
};

// switch改变
const handleSwitchChange = (checked: boolean, record: any) => {
  record.deal = checked;
};

const selectedRow = ref("");
// 行类名
const getRowClassName = (record: any) => {
  return record.id === selectedRow.value ? "ant-table-row-selected" : "";
};
// 行事件
const rowEvent = (record: any, index: number) => {
  console.log(record, index);
  return {
    onClick: () => {
      state.selectedRows = [record.id];
      selectedRow.value = record.id;
    },
  };
};
</script>

<style lang="scss" scoped></style>
