<template>
  <el-card>
    <div slot="header" class="card-header">
      <span>销售额类别占比</span>
      <div>
        <el-radio-group v-model="radio" size="mini" @change="handleChange">
          <el-radio-button label="全部渠道"></el-radio-button>
          <el-radio-button label="线上"></el-radio-button>
          <el-radio-button label="门店"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="charts" ref="charts"></div>
  </el-card>
</template>

<script>
const echarts = require('echarts')
export default {
  name: 'category',
  data() {
    return {
      radio: ''
    }
  },
  mounted() {
    this.initCharts()
  },
  methods: {
    handleChange(val) {
      console.log(val, this.radio)
    },
    initCharts() {
      let barCharts = echarts.init(this.$refs.charts)
      barCharts.setOption({
        title: {
          text: '视频',
          subtext: 101,
          left: 'center',
          top: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: true,
              position: 'outside'
            },
            labelLine: {
              show: true
            },
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ]
          }
        ]
      })

      // 绑定事件
      barCharts.on('mouseover', params => {
        // console.log(params);
        barCharts.setOption({
          title: {
          text: params.data.name,
          subtext: params.data.value,
          left: 'center',
          top: 'center'
        },
        })
      });
    }
  }

}
</script>

<style scoped>
>>> .el-card__header {
  padding-bottom: 9px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.charts {
  width: 100%;
  height: 300px;
}
</style>