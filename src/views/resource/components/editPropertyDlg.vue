<template>
  <el-dialog :title="form.property.name" :visible.sync="visible" width="550px">
    <el-form
      :rules="rules"
      :model="form"
      label-position="left"
      label-width="100px"
      style="width: 400px; margin-left: 30px"
    >
      <el-form-item label="属性值" prop="value">
        <el-input v-model="form.value" />
      </el-form-item>
      <el-form-item label="同步URL" prop="queryUrl">
        <el-input v-model="form.queryUrl" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false"> 取消 </el-button>
      <el-button type="primary" @click="handleUpdate()"> 确认 </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { updateProperty } from '@/api/resource'
export default {
  name: 'EditPropertyDlg',
  data() {
    return {
      rules: {
        value: [{ required: true, message: '请输入属性值', trigger: 'blur' }],
        queryUrl: [
          { required: true, message: '请输入属性值同步URL', trigger: 'blur' }
        ]
      },
      visible: false,
      form: {
        property: {
          name: undefined
        },
        value: undefined,
        queryUrl: undefined
      }
    }
  },
  methods: {
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
