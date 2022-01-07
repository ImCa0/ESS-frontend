<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.identification"
        placeholder="实例标识"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.name"
        placeholder="实例名称"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.type"
        placeholder="所属类型"
        clearable
        style="width: 200px"
        class="filter-item"
      >
        <el-option
          v-for="item in typeOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <!-- <el-select v-model="listQuery.productionLine" placeholder="所属生产线" clearable style="width: 200px" class="filter-item">
        <el-option v-for="item in lineOptions" :key="item" :label="item" :value="item" />
      </el-select> -->
      <el-select
        v-model="listQuery.shared"
        placeholder="是否共享"
        clearable
        class="filter-item"
        style="width: 150px"
      >
        <el-option
          v-for="item in isShared"
          :key="item.key"
          :label="item.display_name"
          :value="item.key"
        />
      </el-select>
      <el-select
        v-model="listQuery.sort"
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
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        {{ $t('table.search') }}
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        {{ $t('table.add') }}
      </el-button>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        {{ $t('table.export') }}
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @sort-change="sortChange"
    >
      <el-table-column label="序号" width="70px" align="center">
        <template slot-scope="{ $index }">
          <span>{{ $index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实例标识" width="100px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.riNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实例名称" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.riName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实例品牌" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.brand }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属类型" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.resourceType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实例描述" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.riDescription }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属车间" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.workshop }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否共享" width="80px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.isShared }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务价格" width="90px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.servicePrice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" width="90px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.createPerson }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('table.actions')"
        align="center"
        width="250"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button
            size="mini"
            type="success"
            @click="handleFetchProp(row.riNumber, row.eid)"
          >
            属性
          </el-button>
          <!-- <el-button v-if="row.status!='draft'" size="mini" @click="handleModifyStatus(row,'draft')">
            {{ $t('table.draft') }}
          </el-button> -->
          <el-button
            v-if="row.status != 'deleted'"
            size="mini"
            type="danger"
            @click="handleDelete(row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
