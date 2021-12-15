<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <router-link to="/">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-profit">
            <svg-icon icon-class="profit" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              本周收益
            </div>
            <count-to :start-val="0" :end-val="profit" :duration="1000" class="card-panel-num" />
          </div>
        </div>
      </router-link>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <router-link to="/resource/instance">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-machine">
            <svg-icon icon-class="machine" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              设备数量
            </div>
            <count-to :start-val="0" :end-val="machineCount" :duration="1000" class="card-panel-num" />
          </div>
        </div>
      </router-link>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <router-link to="/task/processing">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-task">
            <svg-icon icon-class="task" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              任务数量
            </div>
            <count-to :start-val="0" :end-val="taskCount" :duration="1000" class="card-panel-num" />
          </div>
        </div>
      </router-link>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-reputation">
          <svg-icon icon-class="star" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            信誉分
          </div>
          <count-to :start-val="0" :end-val="reputation" :duration="1000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import { overview } from '@/api/dashboard'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      profit: 0,
      machineCount: 0,
      taskCount: 0,
      reputation: 0
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      overview().then(response => {
        this.profit = response.data.profit
        this.machineCount = response.data.machineCount
        this.taskCount = response.data.taskCount
        this.reputation = response.data.reputation
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-machine {
        background: #40c9c6;
      }

      .icon-task {
        background: #36a3f7;
      }

      .icon-profit {
        background: #f4516c;
      }

      .icon-reputation {
        background: rgb(255, 220, 21)
      }
    }

    .icon-machine {
      color: #40c9c6;
    }

    .icon-task {
      color: #36a3f7;
    }

    .icon-profit {
      color: #f4516c;
    }

    .icon-reputation {
      color: rgb(255, 220, 21)
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
