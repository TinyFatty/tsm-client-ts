<template>
  <div class="header">
    <slot name="header"></slot>
  </div>
  <el-form label-width="100px">
    <el-row>
      <template v-for="item in formItems" :key="item.label">
        <el-col v-bind="colLayout">
          <el-form-item :label="item.label" class="form-item">
            <template v-if="item.type === 'input' || item.type === 'password'">
              <el-input
                :placeholder="item.placeholder"
                :show-password="item.type === 'password'"
                v-model="formData[`${item.field}`]"
              />
            </template>
            <template v-else-if="item.type === 'readonly'">
              {{ formData[`${item.field}`] }}
            </template>
            <template v-else-if="item.type === 'select'">
              <el-select :placeholder="item.placeholder" style="width: 100%" v-model="formData[`${item.field}`]">
                <el-option
                  v-for="option in item.options"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                ></el-option>
              </el-select>
            </template>
            <template v-else-if="item.type === 'virtualized select'">
              <el-select-v2
                :placeholder="item.placeholder"
                :options="item.options"
                v-bind="item.otherOptions"
                style="width: 100%"
                v-model="formData[`${item.field}`]"
              >
              </el-select-v2>
            </template>
            <template v-else-if="item.type === 'datepicker'">
              <el-date-picker
                v-bind="item.otherOptions"
                style="width: 100%"
                v-model="formData[`${item.field}`]"
                value-format="YYYY-MM-DD"
                unlink-panels
              ></el-date-picker>
            </template>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
  <div class="footer">
    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType, defineEmits, watch, ref } from 'vue'
import { IFormItem } from '../types'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  formItems: {
    type: Array as PropType<IFormItem[]>,
    default: () => []
  },
  colLayout: {
    type: Object,
    default: () => ({
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
      xs: 24
    })
  }
})
const formData = ref({ ...props.modelValue })
watch(
  formData,
  (newValue) => {
    emit('update:modelValue', newValue)
  },
  {
    deep: true
  }
)
</script>

<style scoped lang="less">
.form-item {
  padding: 5px 30px;
}
</style>
