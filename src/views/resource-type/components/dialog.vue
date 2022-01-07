<template>
  <el-dialog
    :title="title[status]"
    :visible.sync="visible"
    width="550px"
  >
    <el-form
      ref="dataForm"
      :rules="rules"
      :model="form"
      label-position="left"
      label-width="100px"
      style="width: 400px; margin-left: 50px"
    >
      <el-form-item label="类型名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="所属根类型" prop="type">
        <el-radio v-model="form.type" label="硬资源">硬资源</el-radio>
        <el-radio v-model="form.type" label="软资源">软资源</el-radio>
      </el-form-item>
      <el-form-item label="功能标签">
        <el-select v-model="form.tag" class="filter-item" placeholder="请选择">
          <el-option
            v-for="item in tagOptions"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="类型描述">
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
      <el-button type="primary" @click="status === 'create' ? handleCreate() : handleUpdate()"> 确认 </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { updateResourceType, createResourceType } from '@/api/resource-type'
export default {
  name: 'Dialog',
  props: {
    status: {
      type: String,
      default: 'create'
    }
  },
  data() {
    return {
      title: {
        create: '添加制造资源类型',
        update: '编辑制造资源类型'
      },
      rules: {
        name: [{ required: true, message: '请输入类型名称', trigger: 'change' }],
        type: [{ required: true, message: '请选择所属根类型', trigger: 'change' }]
      },
      form: {
        name: '',
        type: '',
        tag: '',
        description: ''
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
      visible: false
    }
  },
  methods: {
    handleCreate() {
      createResourceType(this.form).then((response) => {
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
      updateResourceType(this.form).then((response) => {
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
