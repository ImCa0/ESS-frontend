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
      <el-table-column label="价格" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="交货期" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.deliveryDate }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        width="200px"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button type="primary" size="mini" @click="accept(row)">
            接受
          </el-button>
          <el-button type="danger" size="mini" @click="decline(row)">
            拒绝
          </el-button>
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
import { fetchToBeAcceptedList, acceptTask, declineTask } from '@/api/task'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ToBeAcceptedTable',
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
      fetchToBeAcceptedList(this.listQuery).then((response) => {
        this.list = response.data.list
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
      })
    },
    accept(row) {
      acceptTask(row).then(() => {
        this.$notify({
          title: '成功',
          message: '接受成功',
          type: 'success',
          duration: 2000
        })
        fetchToBeAcceptedList(this.listQuery).then((response) => {
          this.list = response.data.list
          this.total = response.data.total
        })
      })
    },
    decline(row) {
      declineTask(row).then(() => {
        this.$notify({
          title: '成功',
          message: '拒绝成功',
          type: 'success',
          duration: 2000
        })
        fetchToBeAcceptedList(this.listQuery).then((response) => {
          this.list = response.data.list
          this.total = response.data.total
        })
      })
    }
  }
}
</script>
