<template>
  <div class="container">
    <div class="header">
      <el-row>
        <el-col :span="12">
          <div class="imgBox" align="center">
            <img
              align="center"
              width="50%"
              src="https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00128-2140.jpg"
            >
          </div>
        </el-col>
        <el-col :span="12">
          <div class="infoBox" align="center">
            <h3>设备名称：{{ resource.name }}</h3>
            <h3>设备 ID：{{ resource.identifier }}</h3>
            <h3>当前状态：{{ status }}</h3>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="charts-container">
      <Chart
        v-for="item in properties"
        :key="item.id"
        :property="item"
        class="chart"
      />
    </div>
  </div>
</template>

<script>
import { fetchById } from '@/api/resource'
import Chart from './components/chart.vue'
export default {
  name: 'PropertyDetail',
  components: { Chart },
  data() {
    return {
      uuid: undefined,
      resource: {
        hasProperties: [
          {
            property: {
              name: ''
            },
            value: '',
            queryUrl: ''
          }
        ]
      }
    }
  },
  computed: {
    properties: function() {
      return this.resource.hasProperties.filter((property) => {
        return property.queryUrl !== null && property.queryUrl.length > 0
      })
    },
    status: function() {
      let s = ''
      this.resource.hasProperties.forEach((item) => {
        if (item.property.name === '当前状态') {
          s = item.value
        }
      })
      return s
    }
  },
  created() {
    this.uuid = this.$route.params.uuid
    fetchById(this.uuid).then((response) => {
      this.resource = response.data
    })
  }
}
</script>

<style scoped>
.charts-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 5%;
}
.chart {
  margin-bottom: 2.5rem;
}
.header {
  margin: 50px 100px 0 100px;
}
</style>
