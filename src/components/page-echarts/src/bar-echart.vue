<template>
  <div class="bar-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, withDefaults } from 'vue'
// import * as echarts from 'echarts'
import BaseEchart from '@/base-ui/echart'

const props = withDefaults(
  defineProps<{
    title?: string
    xLabels: string[]
    values: Record<string, { name: ''; data: number[] }>
  }>(),
  {
    title: ''
  }
)

const series = computed(() => {
  const values = [] as any[]
  for (let item in props.values) {
    const data = {
      type: 'bar',
      name: props.values[item].name,
      showBackground: false,
      data: props.values[item].data,
      stack: 'x',
      label: {
        show: true,
        formatter: (params: Record<'value', unknown>) => {
          return params.value !== 0 ? params.value : ''
        }
      }
    }
    values.push(data)
  }
  return values
})
const options: any = computed(() => {
  return {
    legend: {
      show: true,
      left: 'right'
    },
    tooltip: {
      show: true,
      formatter: '{b} {a}:{c}'
    },
    xAxis: {
      data: props.xLabels,
      axisLabel: {
        inside: false,
        color: '#000000',
        formatter: (value: string) => {
          //x轴的文字改为竖版显示
          var str = value.split('')
          return str.join('\n')
        }
        // rotate: props.xLabels.length >= 15 ? -20 : 0,
        // margin: props.xLabels.length >= 15 ? 24 : 8
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#999'
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    // series: [
    //   {
    //     type: 'bar',
    //     showBackground: false,
    //     itemStyle: {
    //       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    //         { offset: 0, color: '#83bff6' },
    //         { offset: 0.5, color: '#188df0' },
    //         { offset: 1, color: '#188df0' }
    //       ])
    //     },
    //     emphasis: {
    //       itemStyle: {
    //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    //           { offset: 0, color: '#2378f7' },
    //           { offset: 0.7, color: '#2378f7' },
    //           { offset: 1, color: '#83bff6' }
    //         ])
    //       }
    //     },
    //     data: props.values
    //   }
    // ]
    series: series.value
  }
})
</script>

<style scoped></style>
