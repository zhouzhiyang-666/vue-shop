<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
// import {echarts} from 'echarts'
export default {
  name: 'lineCharts',
  data() {
    return {

    }
  },
  mounted() {
    const echarts = require("echarts");
    // 初始化echarts实例
    let lineCharts = echarts.init(this.$refs.charts);
    // 配置数据
    lineCharts.setOption({
      xAxis: {
        show: false,
        type: 'category'
      },
      yAxis: {
        show: false
      },
      // 系列
      series: [
        {
          type: 'line',
          data: [10, 7, 33, 12, 88, 9],
          // 拐点样式
          itemStyle: {
            opacity: 0
          },
          lineStyle: {
            color: 'purple'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'purple' // 0% 处的颜色
              }, {
                offset: 1, color: '#FFF' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          }
        }
      ],
      tooltip: {
        show: true
      },
      //布局调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      }
    })
  }
}
</script>

<style scoped>
.charts {
  height: 100%;
  width: 100%;
}
</style>