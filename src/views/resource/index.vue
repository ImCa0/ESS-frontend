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
        v-model="filter.shared"
        placeholder="是否共享"
        clearable
        class="filter-item"
        style="width: 150px"
      >
        <el-option label="是" value="是" />
        <el-option label="否" value="否" />
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
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        添加
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
      <el-table-column label="序号" width="70px" align="center">
        <template slot-scope="{ $index }">
          <span>{{ $index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实例标识" width="100px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.identifier }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实例名称" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实例品牌" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.brand }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属类型" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.type.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实例描述" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否共享" width="80px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.isShared === true ? '是' : '否' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务价格" width="80px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="160px" align="center">
        <template slot-scope="{ row }">
          <span>{{ parseTime(row.createAt) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" width="90px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.createBy }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        width="250"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button size="mini" type="success" @click="handleProperty(row)">
            属性
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">
            删除
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

    <EditResourceDlg ref="editResourceDlg" />

    <PropertyDlg ref="propertyDlg" />
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import { fetchList } from '@/api/resource-type'
import { fetchResourceList, deleteResource } from '@/api/resource'
import Pagination from '@/components/Pagination'
import EditResourceDlg from './components/editResourceDlg.vue'
import PropertyDlg from './components/propertyDlg.vue'
export default {
  name: 'ResourceList',
  components: { Pagination, EditResourceDlg, PropertyDlg },
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
    parseTime,
    getList() {
      this.listLoading = true
      fetchResourceList(this.filter).then((response) => {
        this.list = response.data.list
        this.total = response.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
      })
    },
    handleFilter() {
      this.filter.page = 1
      this.getList()
    },
    handleCreate() {
      this.$refs.editResourceDlg.typeOptions = this.typeOptions
      this.$refs.editResourceDlg.status = 'create'
      this.$refs.editResourceDlg.visible = true
    },
    handleUpdate(row) {
      this.$refs.editResourceDlg.typeOptions = this.typeOptions
      this.$refs.editResourceDlg.status = 'update'
      this.$refs.editResourceDlg.visible = true
      this.$refs.editResourceDlg.form = Object.assign({}, row)
    },
    handleDelete(row) {
      deleteResource(row).then((response) => {
        if (response.code === 20000) {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        }
        this.getList()
      })
    },
    handleProperty(row) {
      this.$refs.propertyDlg.visible = true
      this.$refs.propertyDlg.resource = Object.assign({}, row)
    }
  }
}
</script>

<style></style>
