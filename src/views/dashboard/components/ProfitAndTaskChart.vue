<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { profitAndTask } from '@/api/dashboard'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      chart: null,
      chartData: {}
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons', { renderer: 'svg' })
      profitAndTask().then(response => {
        this.chartData = response.data
        this.setOptions(this.chartData)
      })
    },
    setOptions({ profit, taskCompleted, taskUncompleted } = {}) {
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          data: ['收益', '已完成任务', '未完成任务']
        },
        xAxis: [
          {
            type: 'category',
            data: ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周', '第7周', '第8周', '第9周', '第10周'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '金额',
            min: 0,
            axisLabel: {
              formatter: '{value} 元'
            }
          },
          {
            type: 'value',
            name: '数量',
            min: 0,
            axisLabel: {
              formatter: '{value} 单'
            }
          }
        ],
        series: [
          {
            name: '收益',
            type: 'line',
            smooth: false,
            itemStyle: {
              color: '#5470c6'
            },
            lineStyle: {
              color: '#5470c6'
            },
            data: profit
          },
          {
            name: '已完成任务',
            type: 'bar',
            stack: 'task',
            itemStyle: {
              color: '#91cc75'
            },
            yAxisIndex: 1,
            data: taskCompleted
          },
          {
            name: '未完成任务',
            type: 'bar',
            stack: 'task',
            itemStyle: {
              color: '#fac858'
            },
            barWidth: '50%',
            yAxisIndex: 1,
            data: taskUncompleted
          }
        ]
      })
    }
  }
}
</script>
