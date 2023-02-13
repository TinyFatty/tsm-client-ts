<template>
  <div class="page-content">
    <tf-table
      :listData="dataList"
      :dataCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
      v-loading="isLoading"
      ref="dataTable"
    >
      <template #headerHandler>
        <el-button v-if="isCreate" @click="handleNewClick">新增</el-button>
      </template>
      <template #handler="scope">
        <el-button @click="handleDetailClick(scope.row)" type="success">详情</el-button>
        <el-button v-if="isUpdate" @click="handleEditClick(scope.row)" type="warning">修改</el-button>
        <el-button v-if="isDelete" @click="handleDeleteClick(scope.row)" type="danger">{{
          contentTableConfig.deleteBtnText ?? '删除'
        }}</el-button>
        <el-button v-if="isDelete && pageName === 'Knowledge'" @click="handleDeleteClick(scope.row, 3)" type="warning"
          >私有</el-button
        >
      </template>
      <!-- 在page-content中动态插入剩余的插槽 -->
      <template v-for="item in otherPropSlots" :key="item.prop" #[item.slotName]="scope">
        <template v-if="item.slotType == 'date'"
          >{{ $filters.formattime(scope.row[item.prop], 'YYYY-MM-DD') }}
        </template>
        <template v-else-if="item.slotType == 'timestamp'">{{ $filters.formattime(scope.row[item.prop]) }} </template>
        <template v-else-if="item.slotType == 'status'">
          <el-button size="small" :type="scope.row.enable ? 'success' : 'danger'"
            >{{ scope.row.enable ? '启用' : '禁用' }}
          </el-button>
        </template>
        <template v-else>
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </tf-table>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, defineExpose, ref, watch, defineEmits } from 'vue'
import TfTable from '@/base-ui/table'
import { useStore } from '@/store'
import { usePermission } from '@/hooks/use-permission'
const props = defineProps({
  contentTableConfig: {
    type: Object,
    required: true
  },
  queryInfo: {
    type: Object,
    required: true
  },
  pageName: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['newBtnClick', 'editBtnClick', 'detailBtnClick'])
const store = useStore()
const isCreate = usePermission(props.pageName, 'create')
const isUpdate = usePermission(props.pageName, 'update')
const isDelete = usePermission(props.pageName, 'delete')
// const isQuery = usePermission(props.pageName, 'query')
const pageInfo = ref({ currentPage: 1, pageSize: 10 })
const dataTable = ref()
let dataHeight = 626
const isLoading = ref(false)
watch(pageInfo, () => {
  getPageData(props.queryInfo)
  dataHeight = dataTable.value?.$el.clientHeight
})
const getPageData = (queryData: any = {}) => {
  isLoading.value = true
  store.dispatch('system/getPageListAction', {
    pageName: props.pageName,
    queryInfo: {
      offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
      size: pageInfo.value.pageSize,
      ...queryData
    }
  })
}
getPageData()
const dataList = computed(() => {
  return store.getters['system/pageListData'](props.pageName)
})

const dataCount = computed(() => {
  return store.getters['system/listDataCount'](props.pageName)
})
watch(dataList, () => {
  isLoading.value = false
})
//常见特殊栏目，简单的格式变化在otherPropSlots中进行
const commonSlotNames = ['handler']
const otherPropSlots = props.contentTableConfig?.propList.filter((item: any) => {
  return !commonSlotNames.includes(item.slotName)
})
//增删改逻辑
const handleDeleteClick = (item: any, status = 2) => {
  store.dispatch('system/deletePageDataAction', {
    pageName: props.pageName,
    id: item.id,
    status: status,
    queryInfo: {
      offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
      size: pageInfo.value.pageSize,
      ...props.queryInfo
    }
  })
}
const handleNewClick = () => {
  emit('newBtnClick')
}
const handleEditClick = (item: any) => {
  emit('editBtnClick', item)
}
const handleDetailClick = (item: any) => {
  emit('detailBtnClick', item)
}
defineExpose({ getPageData })
</script>

<style scoped lang="less">
.page-content {
  padding: 22px;
  border-top: 20px solid #f5f5f5;
  height: v-bind(dataHeight);
  background-color: white;
}
</style>
