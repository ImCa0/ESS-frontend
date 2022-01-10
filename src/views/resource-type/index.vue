<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="filter.name"
        placeholder="类型名称"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="filter.tag"
        placeholder="功能标签"
        clearable
        style="width: 200px"
        class="filter-item"
      >
        <el-option
          v-for="item in tagOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-select
        v-model="filter.type"
        placeholder="所属根类型"
        clearable
        class="filter-item"
        style="width: 150px"
      >
        <el-option
          v-for="item in typeOptions"
          :key="item"
          :label="item"
          :value="item"
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
      <el-table-column label="序号" width="100px" align="center">
        <template slot-scope="{ $index }">
          <span>{{ $index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型名称" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="功能标签" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.tag }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属根类型" width="100px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型描述" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="180px" align="center">
        <template slot-scope="{ row }">
          <span>{{ parseTime(row.createAt) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" width="100px" align="center">
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
          <el-button size="mini" type="primary" @click="handleUpdate(row)">
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

    <EditResourceDlg ref="createAndUpdateDlg" :status="createOrUpdate" />

    <PropertyDlg ref="propertyDlg" />
  </div>
</template>

<script>
import { fetchList, deleteResourceType } from '@/api/resource-type'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
import EditResourceDlg from './components/editResourceDlg.vue'
import PropertyDlg from './components/propertyDlg.vue'
export default {
  name: 'ResourceTypeList',
  components: { Pagination, EditResourceDlg, PropertyDlg },
  data() {
    return {
      list: [],
      total: 0,
      filter: {
        page: 1,
        limit: 20,
        tag: undefined,
        name: undefined,
        type: undefined,
        sort: '+id'
      },
      tagOptions: [
        '机加工',
        '运输传送',
        '3D打印',
        '仓储',
        '抓取工件',
        '计算机辅助制造',
        '其他'
      ],
      typeOptions: ['硬资源', '软资源'],
      sortOptions: [
        { label: 'ID递增', key: '+id' },
        { label: 'ID递减', key: '-id' }
      ],
      listLoading: true,
      createOrUpdate: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.filter).then((response) => {
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
    parseTime,
    handleCreate() {
      this.createOrUpdate = 'create'
      this.$refs.createAndUpdateDlg.visible = true
      this.$refs.createAndUpdateDlg.form = {
        name: '',
        type: '',
        tag: '',
        description: ''
      }
    },
    handleUpdate(row) {
      this.createOrUpdate = 'update'
      this.$refs.createAndUpdateDlg.visible = true
      this.$refs.createAndUpdateDlg.form = Object.assign({}, row)
    },
    handleProperty(row) {
      this.$refs.propertyDlg.visible = true
      this.$refs.propertyDlg.resourceType = Object.assign({}, row)
    },
    handleDelete(row) {
      deleteResourceType(row).then((response) => {
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
    }
  }
}
</script>

<style></style>
