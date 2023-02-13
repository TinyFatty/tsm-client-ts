<template>
  <div class="page-search">
    <tf-form v-bind="formConfig" v-model="formData">
      <template #header>
        <h1 class="header">{{ formConfig.title }}</h1>
      </template>
      <template #footer>
        <div class="footer">
          <el-button @click="handleQueryClick">搜索</el-button>
          <el-button @click="handleResetClick">重置</el-button>
        </div>
      </template>
    </tf-form>
  </div>
</template>

<script lang="ts" setup>
import TfForm, { IForm } from '@/base-ui/form'
import { ref, defineProps, defineEmits, defineExpose, PropType } from 'vue'
import { useStore } from '@/store'

const emit = defineEmits(['resetBtnClick', 'queryBtnClick'])
const props = defineProps({
  formConfig: {
    type: Object as PropType<IForm>,
    required: true
  }
})
const store = useStore()
const getDictAction = async (dictName: string) => {
  await store.dispatch('constant/getDictListAction', dictName)
}
//通过config动态决定formdata属性
const formItems = props.formConfig.formItems ?? []
const formOriginData: any = {}
const setform = async () => {
  for (const item of formItems) {
    formOriginData[item.field] = ''
    //对于动态加载的选择框数据从后端请求加载
    if (item.isDynamic) {
      let dictData = store.getters['constant/dictData'](item.dictName)
      if (!dictData.value) {
        await getDictAction(item.dictName ?? '')
        dictData = store.getters['constant/dictData'](item.dictName)
      }
      item.options = dictData.map((dictItem: any) => {
        return {
          label: dictItem[`${item.dictName?.toLowerCase()}`],
          value: dictItem[`${item.dictName?.toLowerCase()}`]
        }
      })
    }
  }
}
setform()
const formData = ref(formOriginData)
const handleResetClick = () => {
  for (const key in formOriginData) {
    formData.value[`${key}`] = formOriginData[key]
  }
  emit('resetBtnClick')
}
const handleQueryClick = () => {
  emit('queryBtnClick', formData.value)
}
defineExpose({ formData })
</script>

<style scoped lang="less">
.page-search {
  padding: 22px 20px 0 0;

  .footer {
    text-align: right;
    padding: 0 50px 20px 0;
  }
}
</style>
