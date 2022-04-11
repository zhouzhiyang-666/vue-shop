<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
export default {
  name: 'progressCharts',
  data() {
    return {
       
    }
  },
  mounted() {
    const echarts = require("echarts");
    // 初始化echarts实例
    let progressCharts = echarts.init(this.$refs.charts);
    // 配置数据
    progressCharts.setOption({
      xAxis: {
        show: false,
        max: 100,
        min: 0
      },
      yAxis: {
        show: false,
        type: 'category'
      },
      // 系列
      series: [
        {
          type: 'bar',
          data: [68],
          // 柱状条宽度
          barWidth: 10,
          color: 'yellowgreen',
          // 背景颜色设置
          showBackground: true,
          backgroundStyle:{
            color: '#EFEFEF'
          },
          label: {
            show: true,
            formatter: '|',
            position: 'right'
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