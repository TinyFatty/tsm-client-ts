<template>
  <div class="tf-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table :data="listData" border style="width: 100%" v-bind="childrenProps">
      <el-table-column v-if="showSelectColumn" type="selection"></el-table-column>
      <el-table-column v-if="showIndex" type="index" label="序号" width="80" align="center" />
      <template v-for="item in propList" :key="item.prop">
        <el-table-column v-bind="item" align="center" show-overflow-tooltip>
          <template #default="scope">
            <!--            scope代表整个表格的数据，row获取某行-->
            <slot :name="item.slotName" :row="scope.row">{{ scope.row[item.prop] }}</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="[5, 10, 20, 30]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="props.dataCount"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, PropType } from 'vue'

const emit = defineEmits(['update:page'])
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  listData: {
    type: Array,
    required: true
  },
  propList: {
    type: Array as PropType<Array<any>>
  },
  showIndex: {
    type: Boolean,
    default: false
  },
  showSelectColumn: {
    type: Boolean,
    default: false
  },
  dataCount: {
    type: Number,
    required: true
  },
  page: {
    type: Object,
    default: () => ({ currentPage: 1, pageSize: 10 })
  },
  childrenProps: {
    type: Object,
    default: () => ({})
  },
  showFooter: {
    type: Boolean,
    default: true
  }
})
const handleCurrentChange = (currentPage: number) => {
  emit('update:page', { ...props.page, currentPage })
}
const handleSizeChange = (pageSize: number) => {
  emit('update:page', { ...props.page, pageSize })
}
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    justify-content: right;
  }
}
</style>
