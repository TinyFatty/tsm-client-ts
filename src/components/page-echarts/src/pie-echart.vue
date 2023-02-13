<template>
  <div class="pie-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import BaseEchart from '@/base-ui/echart'

const props = defineProps({
  pieData: {
    type: Array,
    required: true
  }
})
const options: any = computed(() => {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{b}<br/>{c} {d}%'
    },
    legend: {
      orient: 'horizontal',
      left: 'left',
      show: false
    },
    series: [
      {
        name: '统计数据',
        type: 'pie',
        radius: '90%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>

<style scoped></style>
