<template>
  <div class="app-container">
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="序号" width="100px" align="center">
        <template slot-scope="{ $index }">
          <span>{{ $index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单编号" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.orderNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务编号" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.taskNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务名称" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.taskName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务描述" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.taskDescription }}</span>
        </template>
      </el-table-column>
      <el-table-column label="价格" width="100px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="交货期" width="100px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.deliveryDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="加工进度" width="200px" align="center">
        <template slot-scope="{ row }">
          <el-progress
            :text-inside="true"
            :stroke-width="26"
            :percentage="row.progress"
          />
        </template>
      </el-table-column>
      <el-table-column label="预计剩余时间（h）" width="100px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.estimatedTime }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { fetchProcessingList } from '@/api/task'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ProcessingTable',
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        sort: '+id'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchProcessingList(this.listQuery).then((response) => {
        this.list = response.data.list
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
      })
    }
  }
}
</script>
