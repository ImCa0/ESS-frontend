<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { deliveryAndReputation } from '@/api/dashboard'

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
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
      option: null
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
      this.chart = echarts.init(this.$el, 'macarons')
      deliveryAndReputation().then(response => {
        this.option = response.data
        this.setOption(this.option)
      })
    },
    setOption(option) {
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          left: '15%'
        },
        legend: {
          data: ['按期交货率', '信誉分']
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周', '第7周', '第8周', '第9周']
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '按期交货率',
            min: 0,
            max: 1,
            position: 'left',
            axisLine: {
              show: true
            },
            axisLabel: {
              formatter: function(value) {
                return value * 100 + ' %'
              }
            }
          },
          {
            type: 'value',
            name: '信誉分',
            min: 0,
            max: 100,
            position: 'right',
            axisLine: {
              show: true
            }
          }
        ],
        series: [
          {
            name: '按期交货率',
            type: 'line',
            smooth: false,
            itemStyle: {
              color: '#5470c6'
            },
            lineStyle: {
              color: '#5470c6'
            },
            data: option.delivery
          },
          {
            name: '信誉分',
            type: 'line',
            smooth: false,
            itemStyle: {
              color: '#91cc75'
            },
            lineStyle: {
              color: '#91cc75'
            },
            yAxisIndex: 1,
            data: option.reputation
          }
        ]
      })
    }
  }
}
</script>
