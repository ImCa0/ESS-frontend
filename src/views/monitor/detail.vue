<template>
  <div class="container">
    <div class="header">
      {{ resource.name }}
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
        hasProperties: []
      }
    }
  },
  computed: {
    properties: function() {
      return this.resource.hasProperties.filter((property) => {
        return property.queryUrl !== null && property.queryUrl.length > 0
      })
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
</style>
