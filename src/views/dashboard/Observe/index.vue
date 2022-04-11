<template>
  <div class="observe">
    <el-row :gutter="10">
      <el-col :span="12">
        <el-card>
          <div slot="header" class="clearfix">
            <div class="search-header">
              <span>线上热门搜索</span>
              
              <el-dropdown @command="handleCommand">
                <span class="search-more"><i class="el-icon-more"></i></span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a">黄金糕</el-dropdown-item>
                  <el-dropdown-item command="1">狮子头</el-dropdown-item>
                  <el-dropdown-item command="3">螺蛳粉</el-dropdown-item>
                  <el-dropdown-item command="56">双皮奶</el-dropdown-item>
                  <el-dropdown-item command="45">蚵仔煎</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <Search></Search>
        </el-card>
      </el-col>

      <el-col :span="12">

        <Category></Category>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import Category from './Category'
import Search from './Search'
export default {
  name: 'observe',
  components: {
    Category, Search
  },
  data() {
    return {

    }
  },
  methods: {
    handleCommand(command) {
      console.log(command)
    }
  }
}
</script>

<style scoped>
.search-header {
  display: flex;
  justify-content: space-between;
}
>>> .el-card__header {
  /* padding-bottom: 5px; */
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .search-more:hover{
    cursor: pointer;
  }
</style>