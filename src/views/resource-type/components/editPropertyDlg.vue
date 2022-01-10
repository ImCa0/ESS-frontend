<template>
  <el-dialog :title="title[status]" :visible.sync="visible" width="550px">
    <el-form
      ref="dataForm"
      :rules="rules"
      :model="form"
      label-position="left"
      label-width="100px"
      style="width: 400px; margin-left: 50px"
    >
      <el-form-item label="预设属性" :hidden="status === 'update'">
        <el-select
          v-model="selectedProperty"
          clearable
          placeholder="请选择"
          value-key="uuid"
          @change="usePresetProperty"
        >
          <el-option
            v-for="item in presetProperty"
            :key="item.uuid"
            :label="item.name"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="属性名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="属性标识符" prop="identifier">
        <el-input v-model="form.identifier" />
      </el-form-item>
      <el-form-item label="属性值单位">
        <el-input v-model="form.unit" />
      </el-form-item>
      <el-form-item label="属性描述">
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
        @click="
          status === 'create' ? handleCreate() : handleUpdate()
        "
      >
        确认
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { createProperty, updateProperty } from '@/api/resource-type'
export default {
  data() {
    return {
      status: 'create',
      title: {
        create: '添加属性',
        update: '编辑属性'
      },
      rules: {
        name: [
          { required: true, message: '请输入类型名称', trigger: 'change' }
        ],
        identifier: [
          { required: true, message: '请选择所属根类型', trigger: 'change' }
        ]
      },
      visible: false,
      resourceTypeId: '',
      form: {
        name: '',
        identifier: '',
        unit: '',
        description: ''
      },
      presetProperty: null,
      selectedProperty: null
    }
  },
  methods: {
    handleCreate() {
      delete this.form.uuid
      createProperty(this.resourceTypeId, this.form).then((response) => {
        if (response.code === 20000) {
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })
        }
        this.visible = false
        this.$parent.refresh()
      })
    },
    usePresetProperty(value) {
      this.form = Object.assign({}, value)
    },
    handleUpdate() {
      updateProperty(this.form).then((response) => {
        if (response.code === 20000) {
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
        }
        this.visible = false
        this.$parent.refresh()
      })
    }
  }
}
</script>

<style></style>
