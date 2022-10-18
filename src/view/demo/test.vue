<template>
  <button @click="test('valuation')">估值</button>
  <button @click="test('type')">类型</button>
  <button @click="test('location')">地方</button>
  <div v-for="item in state.columns">{{ item }}</div>
  <VxeTable
    height="800"
    style="width: 90%"
    ref="remindTable"
    id="code_market"
    :bordered="false"
    :data="state.list"
    :row-config="{ isCurrent: true, isHover: true }"
    :sort-config="{
      remote: true,
    }"
    :rowClassName="setRowClassName"
    :header-cell-class-name="headerCellClassName"
  >
    <VxeColumn
      width="64"
      type="seq"
      title="序列号"
      fixed="left"
      :align="'center'"
    >
    </VxeColumn>
    <VxeColumn
      min-width="100"
      field="time_to_maturity"
      title="剩余期限"
      sortable
    >
      <template #default="{ row }">
        <div class="left-time col ellipsis">{{ row.time_to_maturity }}</div>
      </template>
    </VxeColumn>
    <VxeColumn min-width="100" field="code" title="债券代码">
      <template #default="{ row }">
        <div class="left-time col ellipsis">{{ row.code_market }}</div>
      </template>
    </VxeColumn>
    <VxeColumn min-width="120" field="short_name" title="债券简称">
      <template #default="{ row }">
        <div class="name col ellipsis">{{ row.short_name }}</div>
      </template>
    </VxeColumn>
    <VxeColumn
      min-width="140"
      field="ofr_price"
      title="Bid/Ofr"
      :align="'right'"
    >
      <template #default="{ row }">
        <div class="direction col ellipsis">
          <span class="bid" :class="{ dark: row.bid_internal }">{{
            row.bid_price
          }}</span>
          <span class="split">|</span>
          <span class="ofr" :class="{ dark: row.ofr_internal }">{{
            row.ofr_price
          }}</span>
        </div>
      </template>
    </VxeColumn>
    <VxeColumn min-width="100" field="ofr_vol" title="Vol" :align="'right'">
      <template #default="{ row }">
        <div class="volume col flex">
          <div class="vol ellipsis">{{ row.bid_vol || '--' }}</div>
          <div class="split">/</div>
          <div class="vol ellipsis">{{ row.ofr_vol || '--' }}</div>
        </div>
      </template>
    </VxeColumn>
    <VxeColumn min-width="108" field="px_price" title="Px" :align="'right'">
      <template #default="{ row }">
        <div class="px-con col">
          <span
            class="px-type"
            :class="{ [row.latest_deal_side]: true }"
            v-if="row.latest_deal_side"
            >{{ row.latest_deal_side?.toUpperCase() }}</span
          >
          <span class="text">{{ row.latest_deal_price || '--' }}</span>
        </div>
      </template>
    </VxeColumn>
    <VxeColumn
      min-width="80"
      field="coupon_rate"
      title="票面利率"
      sortable
      :align="'right'"
    >
      <template #default="{ row }">
        <div class="face col ellipsis">{{ row.coupon_rate }}</div>
      </template>
    </VxeColumn>
    <VxeColumn
      min-width="72"
      field="val_yield"
      title="估值"
      sortable
      :align="'right'"
      :visible="state.columns.includes('valuation')"
    >
      <template #default="{ row }">
        <div class="valuation col ellipsis">
          {{ row.val_yield }}
        </div>
      </template>
    </VxeColumn>
    <VxeColumn
      min-width="100"
      field="bond_category"
      title="类型"
      :align="'center'"
      :visible="state.columns.includes('type')"
    >
      <template #default="{ row }">
        <div class="type col flex">
          <div class="type-con flex" v-if="row.fund_objective_category">
            {{ row.fund_objective_category }}
          </div>
        </div>
      </template>
    </VxeColumn>
    <VxeColumn
      min-width="100"
      field="bond_category_type"
      title="一般/专项"
      :align="'center'"
    >
      <template #default="{ row }">
        <div class="usual col flex">
          <div class="usual-con flex">test</div>
        </div>
      </template>
    </VxeColumn>
    <VxeColumn
      min-width="72"
      field="province"
      title="地方"
      :visible="state.columns.includes('location')"
    >
      <template #default="{ row }">
        <div class="location col ellipsis">{{ row.province }}</div>
      </template>
    </VxeColumn>
    <VxeColumn
      min-width="92"
      field="recommend_count"
      title="可推荐人数"
      sortable
      :align="'right'"
    >
      <template #default="{ row }">
        <div class="wait col ellipsis">{{ row.recommend_count || 0 }}</div>
      </template>
    </VxeColumn>
    <VxeColumn
      min-width="92"
      field="send_count"
      title="已推荐人数"
      sortable
      :align="'right'"
    >
      <template #default="{ row }">
        <div class="wait col ellipsis">{{ row.send_count || 0 }}</div>
      </template>
    </VxeColumn>
  </VxeTable>
</template>

<script lang="ts" setup>
import { reactive, ref, watch, nextTick } from 'vue';
import { VxeTable, VxeColumn, VxeTableInstance } from 'vxe-table';

const state: any = reactive({
  list: [
    {
      time_to_maturity: '3D+5Y',
      code_market: '2271708.IB',
      short_name: '22内蒙古债30',
      ofr_price: '2.6811',
      ofr_vol: '1000',
      bid_price: '-1',
      bid_vol: '',
      coupon_rate: 2.76,
      val_yield: -1,
      fund_objective_category: '',
      bond_sub_category: 2,
      recommend_count: 2,
      send_count: 0,
      latest_deal_side: 'TRD',
      latest_deal_price: 0,
      province: '内蒙古',
      internal_bid: true,
      internal_ofr: false,
    },
    {
      time_to_maturity: '3.47Y',
      code_market: '1606054.IB',
      short_name: '16山东定向04',
      ofr_price: '2.84',
      ofr_vol: '1000',
      bid_price: '3.4556',
      bid_vol: '1000+12000',
      coupon_rate: 3.25,
      val_yield: -1,
      fund_objective_category: '',
      bond_sub_category: 2,
      recommend_count: 2,
      send_count: 0,
      latest_deal_side: 'TRD',
      latest_deal_price: 0,
      province: '山东',
      internal_bid: true,
      internal_ofr: true,
    },
    {
      time_to_maturity: '1.92Y',
      code_market: '107984.SZ',
      short_name: '贵州1715',
      ofr_price: '8.3',
      ofr_vol: '1000',
      bid_price: '-1',
      bid_vol: '',
      coupon_rate: 4.01,
      val_yield: -1,
      fund_objective_category: '',
      bond_sub_category: 2,
      recommend_count: 2,
      send_count: 0,
      latest_deal_side: 'TRD',
      latest_deal_price: 0,
      province: '贵州',
      internal_bid: true,
      internal_ofr: true,
    },
    {
      time_to_maturity: '1.92Y',
      code_market: '1705375.IB',
      short_name: '17贵州债15',
      ofr_price: '2.21',
      ofr_vol: '1000',
      bid_price: '-1',
      bid_vol: '',
      coupon_rate: 4.01,
      val_yield: -1,
      fund_objective_category: '',
      bond_sub_category: 2,
      recommend_count: 2,
      send_count: 0,
      latest_deal_side: 'TRD',
      latest_deal_price: 0,
      province: '贵州',
      internal_bid: true,
      internal_ofr: true,
    },
    {
      time_to_maturity: '231D',
      code_market: '147291.SH',
      short_name: '18河北08',
      ofr_price: '1.81',
      ofr_vol: '1000',
      bid_price: '-1',
      bid_vol: '',
      coupon_rate: 3.64,
      val_yield: -1,
      fund_objective_category: '',
      bond_sub_category: 2,
      recommend_count: 2,
      send_count: 0,
      latest_deal_side: 'TRD',
      latest_deal_price: 0,
      province: '河北',
      internal_bid: true,
      internal_ofr: true,
    },
    {
      time_to_maturity: '231D',
      code_market: '106466.SZ',
      short_name: '河北1808',
      ofr_price: '1.81',
      ofr_vol: '1000',
      bid_price: '-1',
      bid_vol: '',
      coupon_rate: 3.64,
      val_yield: -1,
      fund_objective_category: '',
      bond_sub_category: 2,
      recommend_count: 2,
      send_count: 0,
      latest_deal_side: 'TRD',
      latest_deal_price: 0,
      province: '河北',
      internal_bid: true,
      internal_ofr: true,
    },
    {
      time_to_maturity: '231D',
      code_market: '1805065.IB',
      short_name: '18河北债08',
      ofr_price: '2',
      ofr_vol: '1000',
      bid_price: '-1',
      bid_vol: '',
      coupon_rate: 3.64,
      val_yield: -1,
      fund_objective_category: '',
      bond_sub_category: 2,
      recommend_count: 2,
      send_count: 0,
      latest_deal_side: 'TRD',
      latest_deal_price: 0,
      province: '河北',
      internal_bid: true,
      internal_ofr: true,
    },
    {
      time_to_maturity: '186D',
      code_market: '1606074.IB',
      short_name: '16黑龙江定向06',
      ofr_price: '4.2',
      ofr_vol: '1000',
      bid_price: '-1',
      bid_vol: '',
      coupon_rate: 3.21,
      val_yield: -1,
      fund_objective_category: '普通',
      bond_sub_category: 3,
      recommend_count: 2,
      send_count: 0,
      latest_deal_side: 'TRD',
      latest_deal_price: 0,
      province: '黑龙江',
      internal_bid: true,
      internal_ofr: true,
    },
    {
      time_to_maturity: '4.99Y',
      code_market: '198038.SH',
      short_name: '22内蒙30',
      ofr_price: '2.68',
      ofr_vol: '1000',
      bid_price: '-1',
      bid_vol: '',
      coupon_rate: 2.76,
      val_yield: -1,
      fund_objective_category: '',
      bond_sub_category: 2,
      recommend_count: 2,
      send_count: 0,
      latest_deal_side: 'TRD',
      latest_deal_price: 0,
      province: '内蒙古',
      internal_bid: true,
      internal_ofr: true,
    },
  ],
  columns: [],
});

// 显示或隐藏
const test = (name: string) => {
  console.log(name);
  const index = state.columns.indexOf(name);
  if (index !== -1) {
    // 隐藏
    state.columns.splice(index, 1);
  } else {
    // 显示
    state.columns.push(name);
  }
  nextTick(() => {
    remindTable.value!.refreshColumn();
    console.log('==============');
  });
};

const remindTable = ref<VxeTableInstance>();

// 设置行类名
const setRowClassName = ({ rowIndex }: { rowIndex: number }) => {
  return rowIndex % 2 === 0 ? 'row-bg' : null;
};
// 表头类名
const headerCellClassName = ({ column }: { column: any }) => {
  const right: string[] = [
    'direction',
    'vol',
    'px',
    'face',
    'valuation',
    'waitCount',
    'counted',
  ];
  const center: string[] = ['number', 'type', 'usual'];
  if (right.includes(column.field)) {
    return 'header-right';
  }
  if (center.includes(column.field)) {
    return 'header-center';
  }
  return null;
};
</script>

<style lang="scss" scoped>
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.flex {
  display: flex;
}

.flex-center {
  justify-content: center;
  align-items: center;
}

.btn {
  @extend .flex;
  @extend .flex-center;
  height: 24px;
  padding: 0 12px;
  background: #039e86;
  border-radius: 2px;
  font-weight: 400;
  font-size: 12px;
  color: #ffffff;
  cursor: pointer;
  &:active {
    opacity: 0.8;
  }
}

.vxe-table--header {
  .vxe-header--column {
    height: 24px;
    padding: 0 !important;
    .vxe-cell {
      padding: 0 4px;
      background-color: #ffffff;
      font-weight: 400;
      font-size: 12px;
      color: #646464;
    }
    &.header-center {
      text-align: center;
    }
    &.header-right {
      text-align: right;
    }
  }
}
.vxe-table--body {
  .vxe-body--column {
    height: 32px;
    padding: 0 !important;
    .vxe-cell {
      padding: 0 4px;
      font-weight: 400;
      font-size: 12px;
      color: #000000;
    }
  }
}

:deep(.vxe-body--row) {
  &.row-bg {
    background-color: #f5f5f5;
  }
}
.col {
  height: 32px;
  line-height: 32px;
  font-weight: 400;
  font-size: 12px;
  color: #000000;
}
.number {
  // width: 64px;
  text-align: center;
}
.left-time {
  text-align: left;
}
// .name {
//   // width: 120px;
// }
.direction {
  // width: 140px;
  font-size: 16px;
  font-weight: 700;
  text-align: right;
  .bid {
    color: #ff7d00;
    &.dark {
      color: #969696;
    }
  }
  .ofr {
    color: #4ca3fb;
    &.dark {
      color: #969696;
    }
  }
  .split {
    margin: 0 4px;
    font-weight: 1;
    color: #d4d4d4;
  }
}
.volume {
  min-width: 100px;
  align-items: center;
  justify-content: flex-end;
  .vol {
    max-width: 49%;
  }
}
.px-con {
  // width: 108px;
  font-weight: 700;
  font-size: 12px;
  text-align: right;
  .px-type {
    display: inline-block;
    height: 16px;
    margin-right: 12px;
    padding: 0 4px;
    line-height: 16px;
    color: #ffffff;
    &.gvn {
      background-color: #ff7d00;
    }
    &.tkn {
      background-color: #4ca3fb;
    }
    &.trd {
      background-color: #875aff;
    }
  }
  .text {
    color: #000000;
  }
}
.face {
  // width: 80px;
  text-align: right;
}
.valuation {
  // width: 72px;
  text-align: right;
}
.type {
  // width: 100px;
  align-items: center;
  justify-content: center;
  .type-con {
    height: 20px;
    padding: 0 8px;
    align-items: center;
    justify-content: center;
    background: rgba(234, 67, 53, 0.1);
    border-radius: 12px;
  }
}
.usual {
  // width: 100px;
  align-items: center;
  justify-content: center;
  .usual-con {
    width: 64px;
    height: 20px;
    justify-content: center;
    align-items: center;
    background: rgba(50, 160, 222, 0.1);
    border-radius: 12px;
  }
}
// .location {
//   // width: 72px;
// }
.wait {
  // width: 92px;
  text-align: right;
}
</style>
