<template>
  <div class="page-modal">
    <el-dialog v-model="dialogVisible" width="30%" center destroy-on-close>
      <tf-form v-bind="modalConfig" v-model="formData">
        <template #header>
          <h1 class="header" style="text-align: center">{{ modalConfig.title }}</h1>
        </template></tf-form
      >
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmClick"> 确 定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, watch, PropType, defineExpose } from 'vue'
import { useStore } from 'vuex'

import TfForm, { IForm } from '@/base-ui/form'

const props = defineProps({
  modalConfig: {
    type: Object as PropType<IForm>,
    required: true
  },
  defaultInfo: {
    type: Object,
    default: () => ({})
  },
  otherInfo: {
    type: Object,
    default: () => ({})
  },
  pageName: {
    type: String,
    require: true
  },
  queryInfo: {
    type: Object,
    default: () => ({})
  }
})
const dialogVisible = ref(false)
const formData = ref<any>({})

watch(
  () => props.defaultInfo,
  (newValue) => {
    for (const item of props.modalConfig.formItems) {
      formData.value[`${item.field}`] = newValue[`${item.field}`]
    }
  }
)
const store = useStore()
const handleConfirmClick = () => {
  dialogVisible.value = false
  if (Object.keys(props.defaultInfo).length) {
    // 编辑
    store.dispatch('system/editPageDataAction', {
      pageName: props.pageName,
      editData: { ...formData.value, ...props.otherInfo },
      id: props.defaultInfo.id,
      queryInfo: { ...props.queryInfo }
    })
  } else {
    // 新建
    store.dispatch('system/createPageDataAction', {
      pageName: props.pageName,
      newData: { ...formData.value, ...props.otherInfo }
    })
  }
}
defineExpose({ dialogVisible })
</script>

<style scoped></style>
