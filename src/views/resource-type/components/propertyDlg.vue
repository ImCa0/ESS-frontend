<template>
  <div>
    <el-dialog :visible.sync="visible" title="属性列表" width="1200px">
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        添加
      </el-button>
      <el-table
        :data="resourceType.properties"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column label="属性名称" width="150px" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="属性标识符" width="150px" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.identifier }}</span>
          </template>
        </el-table-column>
        <el-table-column label="属性描述" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="属性值单位" width="100px" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.unit }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="handleUpdate(row)">
              编辑
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <EditPropertyDlg ref="editPropertyDlg" />
  </div>
</template>

<script>
import { fetchPresetProperty, fetchById, deleteProperty } from '@/api/resource-type'
import EditPropertyDlg from './editPropertyDlg.vue'
export default {
  name: 'PropertyDlg',
  components: { EditPropertyDlg },
  data() {
    return {
      visible: false,
      resourceType: {
        uuid: null,
        properties: []
      }
    }
  },
  methods: {
    handleCreate() {
      fetchPresetProperty().then((response) => {
        this.$refs.editPropertyDlg.presetProperty = response.data
      })
      this.$refs.editPropertyDlg.status = 'create'
      this.$refs.editPropertyDlg.visible = true
      this.$refs.editPropertyDlg.resourceTypeId = this.resourceType.uuid
    },
    refresh() {
      fetchById(this.resourceType.uuid).then((response) => {
        this.resourceType = response.data
      })
      this.$parent.getList()
    },
    handleUpdate(row) {
      this.$refs.editPropertyDlg.status = 'update'
      this.$refs.editPropertyDlg.visible = true
      this.$refs.editPropertyDlg.form = Object.assign({}, row)
    },
    handleDelete(row) {
      deleteProperty(row).then((response) => {
        if (response.code === 20000) {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        }
        this.refresh()
      })
    }
  }
}
</script>

<style></style>
