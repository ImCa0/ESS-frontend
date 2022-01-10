<template>
  <el-dialog :title="title[status]" :visible.sync="visible" width="550px">
    <el-form
      ref="dataForm"
      :rules="rules"
      :model="form"
      label-position="left"
      label-width="120px"
      style="width: 400px; margin-left: 50px"
    >
      <el-form-item label="实例标识" prop="identifier">
        <el-input v-model="form.identifier" />
      </el-form-item>
      <el-form-item label="实例名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="所属资源类型" prop="type">
        <el-select
          v-model="form.type"
          class="filter-item"
          placeholder="请选择"
          value-key="uuid"
        >
          <el-option
            v-for="item in typeOptions"
            :key="item.uuid"
            :label="item.name"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否共享" prop="isShared">
        <el-radio v-model="form.isShared" :label="true">是</el-radio>
        <el-radio v-model="form.isShared" :label="false">否</el-radio>
      </el-form-item>
      <el-form-item label="服务价格" prop="price">
        <el-input v-model="form.price" />
      </el-form-item>
      <el-form-item label="实例品牌" prop="brand">
        <el-input v-model="form.brand" />
      </el-form-item>
      <el-form-item label="实例描述">
        <el-input
          v-model="form.description"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          placeholder=""
        />
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false"> 取消 </el-button>
      <el-button
        type="primary"
        @click="status === 'create' ? handleCreate() : handleUpdate()"
      >
        确认
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { createResource, updateResource } from '@/api/resource'
export default {
  name: 'EditResourceDlg',
  data() {
    return {
      status: '添加制造资源实例',
      title: {
        create: '添加制造资源实例',
        update: '编辑制造资源实例'
      },
      rules: {
        identifier: [
          { required: true, message: '请输入实例标识', trigger: 'blur' }
        ],
        name: [{ required: true, message: '请输入实例名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择实例类型', trigger: 'blur' }],
        isShared: [
          { required: true, message: '请选择是否共享', trigger: 'blur' }
        ],
        price: [{ required: true, message: '请输入实例价格', trigger: 'blur' }]
      },
      form: {
        identifier: null,
        name: undefined,
        brand: undefined,
        type: undefined,
        isShared: undefined,
        description: undefined,
        price: undefined
      },
      typeOptions: [],
      visible: false
    }
  },
  methods: {
    handleCreate() {
      createResource(this.form).then((response) => {
        if (response.code === 20000) {
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })
        }
        this.visible = false
        this.$parent.getList()
      })
    },
    handleUpdate() {
      updateResource(this.form).then((response) => {
        if (response.code === 20000) {
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
        }
        this.visible = false
        this.$parent.getList()
      })
    }
  }
}
</script>

<style></style>
