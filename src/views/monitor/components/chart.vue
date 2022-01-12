<template>
  <div
    class="show"
    :class="className"
    :style="{ height: height, width: width }"
  />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons')
import resize from './mixins/resize'
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '47.5%'
    },
    height: {
      type: String,
      default: '300px'
    },
    property: {
      type: Object,
      default: function() {
        return {
          queryUrl: undefined,
          property: {
            name: undefined,
            unit: undefined
          }
        }
      }
    }
  },
  data() {
    return {
      baseUrl: 'http://localhost:5000/query/MQTT',
      queryParam: '?start=-5m&stop=0m',
      chart: null,
      timer: null,
      options: {
        xAxis: {
          data: [],
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: [this.property.property.name]
        },
        series: [
          {
            name: this.property.property.name,
            itemStyle: {
              normal: {
                color: '#FF005A',
                lineStyle: {
                  color: '#FF005A',
                  width: 2
                }
              }
            },
            smooth: true,
            type: 'line',
            data: [],
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          }
        ]
      }
    }
  },
  computed: {
    fullUrl: function() {
      return this.baseUrl + this.property.queryUrl + this.queryParam
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
      this.update()
      this.timer = setInterval(this.update, 3000)
    })
  },
  beforeDestroy() {
    clearInterval(this.timer)
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
    },
    update() {
      fetch(this.fullUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.error !== undefined) {
            return {
              length: 0
            }
          }
          return data[0].records
        })
        .then((records) => {
          this.options.xAxis.data = []
          this.options.series[0].data = []
          for (let i = 0; i < records.length; i++) {
            this.options.xAxis.data.push(records[i].time.substring(12, 19))
            this.options.series[0].data.push(records[i].value % 1000000000 / 10000000)
          }
          this.setOptions()
        })
        .catch(() => {
          return
        })
    },
    setOptions() {
      this.chart.setOption(this.options)
    }
  }
}
</script>

<style>
.show {
  border-color: red;
  border-width: 5px;
}
</style>
