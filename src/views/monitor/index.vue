<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="filter.identifier"
        placeholder="实例标识"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="filter.name"
        placeholder="实例名称"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="filter.type"
        placeholder="所属类型"
        clearable
        style="width: 200px"
        class="filter-item"
      >
        <el-option
          v-for="item in typeOptions"
          :key="item.uuid"
          :label="item.name"
          :value="item.name"
        />
      </el-select>
      <el-select
        v-model="filter.sort"
        style="width: 140px"
        class="filter-item"
        @change="handleFilter"
      >
        <el-option
          v-for="item in sortOptions"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        />
      </el-select>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        搜索
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="序号" width="80px" align="center">
        <template slot-scope="{ $index }">
          <span>{{ $index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实例标识" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.identifier }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实例名称" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实例品牌" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.brand }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属类型" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.type.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实例描述" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="当前状态" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.status }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        width="150px"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button type="primary" size="mini" @click="handleDetail(row)">
            查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="filter.page"
      :limit.sync="filter.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { fetchList } from '@/api/resource-type'
import { fetchResourceList } from '@/api/resource'
import Pagination from '@/components/Pagination'
export default {
  name: 'MonitorList',
  components: { Pagination },
  data() {
    return {
      filter: {
        page: 1,
        limit: 20,
        identifier: undefined,
        name: undefined,
        type: undefined,
        isShared: undefined,
        sort: '+id'
      },
      typeOptions: [],
      sortOptions: [
        { label: 'ID递增', key: '+id' },
        { label: 'ID递减', key: '-id' }
      ],
      list: [],
      total: 0,
      listLoading: false
    }
  },
  created() {
    fetchList({ page: 1, limit: 999 }).then((response) => {
      this.typeOptions = response.data.list
    })
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchResourceList(this.filter).then((response) => {
        this.list = response.data.list
        this.total = response.data.total
        this.list.forEach(resource => {
          resource.hasProperties.forEach(property => {
            if (property.property.identifier === 'status') {
              resource.status = property.value
            }
          })
        })
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
      })
    },
    handleFilter() {
      this.filter.page = 1
      this.getList()
    },
    handleDetail(row) {
      this.$router.push(`/monitor/${row.uuid}`)
    }
  }
}
</script>

<style></style>
