<template>
  <el-card class="box-card" style="margin: 10px 0px">
    <div slot="header" class="clearfix">
      <!-- 头部左侧内容 -->
      <el-tabs class="tab" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="销售额" name="sale"></el-tab-pane>
        <el-tab-pane label="访问量" name="visit"></el-tab-pane>
      </el-tabs>

      <!-- 头部右侧内容 -->
      <div class="right">
        <span class="datePick" @click="setDay">今日</span>
        <span class="datePick" @click="setWeek">本周</span>
        <span class="datePick" @click="setMonth">本月</span>
        <span class="datePick" @click="setYear">本年</span>
        <el-date-picker
          class="date"
          size="mini"
          v-model="searchDateRange"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div>
    </div>
    <!-- 内容区域 -->
    <div>
      <el-row :gutter="10">
        <el-col :span="18">
          <div class="charts" ref="charts"></div>
        </el-col>
        <el-col :span="6" class="card-right">
          <h3>{{`门店${contentTitle}排名`}}</h3>
          <ul>
            <li>
              <span class="rank">0</span>
              <span>肯德基</span>
              <span class="rright">13156</span>
            </li>
            <li>
              <span class="rank">0</span>
              <span>肯德基</span>
              <span class="rright">13156</span>
            </li>
            <li>
              <span class="rank">0</span>
              <span>肯德基</span>
              <span class="rright">13156</span>
            </li>
            <li>
              <span class="rank">0</span>
              <span>肯德基</span>
              <span class="rright">13156</span>
            </li>
            <li>
              <span class="rank">0</span>
              <span>肯德基</span>
              <span class="rright">13156</span>
            </li>
            <li>
              <span class="rank">0</span>
              <span>肯德基</span>
              <span class="rright">13156</span>
            </li>
            <li>
              <span class="rank">0</span>
              <span>肯德基</span>
              <span class="rright">13156</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import dayjs from 'dayjs'
const echarts = require("echarts")
export default {
  name: 'Sale',
  data() {
    return {
      activeName: 'sale',
      searchDateRange: '',
      mycharts: null
    }
  },
  mounted() {
    this.initCharts()
  },
  computed: {
    // 内容标题
    contentTitle() {
      return this.activeName == 'sale' ? '销售额' : '访问量'
    }
  },
  methods: {
    // 初始化echarts
    initCharts(flag) { // flag 控制是否进行echarts.init操作
      if (!flag) {
        this.mycharts = echarts.init(this.$refs.charts)
      }
      this.mycharts.setOption({
        title: {
          text: `${this.contentTitle}趋势`,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '销售额',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220, 52, 200, 334, 390, 330]
          }
        ]
      })
    },
    handleClick(tab, event) {
      this.initCharts(true)
      this.mycharts.setOption({
        title: {
          text: `${this.contentTitle}趋势`
        }
      })
    },
    // 设置为当天
    setDay() {
      const nowDate = dayjs().format('YYYY-MM-DD')
      this.searchDateRange = [nowDate, nowDate]
    },
    // 设置本周
    setWeek() {
      const start = dayjs().day(1).format('YYYY-MM-DD')
      const end = dayjs().day(7).format('YYYY-MM-DD')
      this.searchDateRange = [start, end]
    },
    // 设置本月
    setMonth() {
      const start = dayjs().startOf('month').format('YYYY-MM-DD')
      const end = dayjs().endOf('month').format('YYYY-MM-DD')
      this.searchDateRange = [start, end]
    },
    // 设置今年
    setYear() {
      const start = dayjs().startOf('year').format('YYYY-MM-DD')
      const end = dayjs().endOf('year').format('YYYY-MM-DD')
      this.searchDateRange = [start, end]
    }
  }
}
</script>

<style scoped>
>>> .el-card__header {
  border: 0;
  padding-bottom: 0px;
}
>>> .el-card__body {
  padding-top: 0px;
}

.clearfix {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0;
}
.date {
  width: 230px;
  margin: 0px 20px;
}
.right span {
  margin: 0 10px;
}
.charts {
  width: 100%;
  height: 300px;
}
.card-right{
  padding: 0;
}
ul{
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0;
}
ul li{
  height: 8%;
  margin: 10px 0px;
}
.rank{
  float: left;
  width: 20px;
  height: 20px;
  line-height: 20px;
  border-radius: 50%;
  background-color: black;
  color: white;
  text-align: center;
}
.rright{
  float: right;
}
.datePick:hover{
  color: orange;
  cursor: pointer;
}
</style>

