<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
export default {
  name: 'barCharts',
  data() {
    return {
       
    }
  },
  mounted() {
    const echarts = require("echarts");
    // 初始化echarts实例
    let barCharts = echarts.init(this.$refs.charts);
    // 配置数据
    barCharts.setOption({
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
          type: 'bar',
          data: [10, 7, 33, 12, 88, 9, 5, 66]
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