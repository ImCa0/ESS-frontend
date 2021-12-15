<template>
  <router-link to="/task/processing">
    <el-table :data="list" border style="width: 100%;padding-top: 15px;">
      <el-table-column label="订单编号" width="150" align="center">
        <template slot-scope="{row}">
          {{ row.orderNumber }}
        </template>
      </el-table-column>
      <el-table-column label="任务编号" width="150" align="center">
        <template slot-scope="{row}">
          {{ row.taskNumber }}
        </template>
      </el-table-column>
      <el-table-column label="任务名称" width="" align="center">
        <template slot-scope="{row}">
          {{ row.taskName }}
        </template>
      </el-table-column>
      <el-table-column label="价格" width="150" align="center">
        <template slot-scope="{row}">
          ¥{{ row.price }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="150" align="center">
        <template slot-scope="{row}">
          {{ row.state }}
        </template>
      </el-table-column>
    </el-table>
  </router-link>
</template>

<script>
import { taskTable } from '@/api/dashboard'

export default {
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      taskTable().then(response => {
        this.list = response.data
      })
    }
  }
}
</script>
