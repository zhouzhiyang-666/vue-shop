<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12">
        <lineCharts></lineCharts>
      </el-col>

      <el-col :span="12">
        <lineCharts></lineCharts>
      </el-col>
    </el-row>
    <!-- table表格 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      :default-sort="{ prop: 'address', order: 'descending' }"
    >
      <el-table-column type="index" label="排名" width="50" align="center"></el-table-column>
      <el-table-column prop="name" label="搜索关键字" width="180"></el-table-column>
      <el-table-column prop="address" label="用户数" sortable></el-table-column>
      <el-table-column prop="up" label="周涨幅" sortable></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination 
      class="pagination" 
      layout="prev, pager, next" 
      :current-page="currentPage" 
      :total="total" 
      :page-size="3"
      @current-change="pageChange"
      >
    </el-pagination>
  </div>
</template>

<script>
import lineCharts from './lineCharts'
export default {
  name: 'search',
  components: {
    lineCharts
  },
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        up: 11
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        up: 11
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        up: 55
      }],
      currentPage: 1,
      
      total: 100
    }
  },
  methods: {
    pageChange(val) {
      this.currentPage = val
    }
  }
}
</script>

<style scoped>
.pagination{
  float: right;
}
</style>