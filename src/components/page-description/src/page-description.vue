<template>
  <div class="page-description">
    <el-dialog v-model="dialogVisible" width="50%" center destroy-on-close>
      <tf-description v-bind="detailConfig" :detailInfo="props.detailInfo">
        <template #header>
          <h1 class="header" style="text-align: center">{{ detailConfig.title }}</h1>
        </template>
      </tf-description>
      <slot></slot>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, PropType, defineExpose } from 'vue'

import TfDescription, { IDescription } from '@/base-ui/description'

const props = defineProps({
  detailConfig: {
    type: Object as PropType<IDescription>,
    required: true
  },
  detailInfo: {
    type: Object,
    required: true
  }
})

const dialogVisible = ref(false)
defineExpose({ dialogVisible })
</script>

<style scoped lang="less"></style>
