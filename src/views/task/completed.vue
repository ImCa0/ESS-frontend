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
      <el-table-column label="订单编号" width="120px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.orderNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务编号" width="120px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.taskNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务名称" width="120px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.taskName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务描述" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.taskDescription }}</span>
        </template>
      </el-table-column>
      <el-table-column label="价格" width="120px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="交货期" width="120px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.deliveryDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合格率" width="120px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.qualifiedRate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="废品率" width="120px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.rejectRate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发货信息" width="120px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.shippingInfo }}</span>
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
import { fetchCompletedList } from '@/api/task'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'CompletedTable',
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
      fetchCompletedList(this.listQuery).then((response) => {
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
