<template>
  <div>
    <el-dialog :visible.sync="visible" title="属性列表" width="1000px">
      <el-table
        :data="resource.hasProperties"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column label="属性名称" width="150px" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.property.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="属性值" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.value }}</span>
          </template>
        </el-table-column>
        <el-table-column label="属性值单位" width="100px" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.property.unit }}</span>
          </template>
        </el-table-column>
        <el-table-column label="属性值同步URL" width="200px" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.queryUrl }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最后更新于" width="180px" align="center">
          <template slot-scope="{ row }">
            <span>{{ parseTime(row.lastModifiedAt) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="100px"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" @click="handleUpdate(row)">
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <EditPropertyDlg ref="editPropertyDlg" />
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import { fetchById } from '@/api/resource'
import EditPropertyDlg from './editPropertyDlg.vue'
export default {
  name: 'PropertyDlg',
  components: { EditPropertyDlg },
  data() {
    return {
      visible: false,
      resource: {
        uuid: null,
        hasProperties: [
          {
            queryUrl: undefined,
            value: undefined,
            property: {
              name: undefined,
              unit: undefined
            }
          }
        ]
      }
    }
  },
  methods: {
    parseTime,
    handleUpdate(row) {
      this.$refs.editPropertyDlg.form = Object.assign({}, row)
      this.$refs.editPropertyDlg.visible = true
    },
    refresh() {
      fetchById(this.resource.uuid).then((response) => {
        this.resource = response.data
      })
      this.$parent.getList()
    }
  }
}
</script>

<style></style>
