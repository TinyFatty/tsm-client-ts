<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{ title }}</span>
        <span class="supplement">{{ titleSupplement }}</span>
      </div>
    </template>
    <div class="item">
      <slot></slot>
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  components: {},

  props: {
    title: {
      type: String,
      default: 'Title'
    },
    titleSupplement: {
      type: String,
      default: ''
    }
  },

  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.box-card {
  padding: 0;
  height: 100%;
  &:deep(.el-card__header) {
    padding: 10px 20px !important;
  }
}

.card-header {
  // display: flex;
  justify-content: space-between;
  align-items: flex-end;
  vertical-align: bottom;
  height: 20px;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  font-family: 'Microsoft YaHei';
  .supplement {
    padding-left: 5px;
    font-size: 14px;
    font-weight: normal;
  }
}

.item {
  margin-bottom: 10px;
  // border: 1px solid red;
}
</style>
