<template>
  <div class="tf-description">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-descriptions border column="1">
      <template v-for="item in formItems" :key="item.label">
        <el-descriptions-item :label="item.label" label-class-name="itemLabel">
          <template v-if="item.type === 'normal'">{{ formData[`${item.field}`] }}</template>
          <template v-if="item.type === 'multilines'">
            <template v-for="(txt, index) in formData[`${item.field}`].split('\r')" :key="index">
              <p>{{ txt }}</p>
            </template>
          </template>
          <template v-else-if="item.type === 'date'">
            {{ $filters.formattime(formData[`${item.field}`], 'YYYY-MM-DD') }}
          </template>
          <template v-else-if="item.type === 'href'">
            <template v-for="(href, index) in formData[`${item.field}`]" :key="index">
              <el-link :href="href" type="primary" target="_blank" style="margin-left: 8px">{{
                `${item.label}${index + 1}`
              }}</el-link>
            </template>
          </template>
        </el-descriptions-item>
      </template>
    </el-descriptions>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from 'vue'
import { IDescriptionItem } from '../types'

const props = defineProps({
  detailInfo: {
    type: Object,
    required: true
  },
  formItems: {
    type: Array as PropType<IDescriptionItem[]>,
    default: () => []
  }
})
const formData = { ...props.detailInfo }
const specificSlot = ['file_urls', 'files', 'href']
specificSlot.forEach((value) => {
  if (Object.prototype.hasOwnProperty.call(formData, value)) {
    try {
      formData[value] = eval(formData[value])
    } catch {
      formData[value] = [formData[value]]
    }
  }
})
</script>

<style lang="less">
.header {
  display: center;
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
.itemLabel {
  width: 110px;
  justify-content: center;
}
</style>
