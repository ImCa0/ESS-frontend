<template>
  <div class="dashboard-editor-container">
    <Overview />

    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px">
      <ProfitAndTaskChart />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <UsageChart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <FaultChart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <LoadAndQuality />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="32">
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 24 }"
        :md="{ span: 24 }"
        :lg="{ span: 16 }"
        :xl="{ span: 16 }"
        style="margin-bottom: 30px"
      >
        <TaskTable />
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <DeliveryAndReputation />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Overview from './components/Overview'
import ProfitAndTaskChart from './components/ProfitAndTaskChart'
import UsageChart from './components/UsageChart'
import FaultChart from './components/FaultChart'
import LoadAndQuality from './components/LoadAndQuality'
import DeliveryAndReputation from './components/DeliveryAndReputation'
import TaskTable from './components/TaskTable'

export default {
  name: 'DashboardAdmin',
  components: {
    Overview,
    ProfitAndTaskChart,
    UsageChart,
    FaultChart,
    LoadAndQuality,
    DeliveryAndReputation,
    TaskTable
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
