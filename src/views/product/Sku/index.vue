<template>
  <div>
    <el-table
      :data="skuList"
      style="width: 100%"
      :row-style="rowStyle"
      v-loading="tableLoading"
      border
    >
      <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
      <el-table-column prop="skuName" label="名称" width="150" align="center"></el-table-column>
      <el-table-column prop="skuDesc" label="描述" align="center"></el-table-column>
      <el-table-column prop="skuDefaultImg" label="默认图片" align="center" width="110">
        <template slot-scope="{row}">
          <el-image style="width: 100px; height: 100px" :src="row.skuDefaultImg" fit="fill"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(KG)" align="center" width="80"></el-table-column>
      <el-table-column prop="price" label="价格(元)" align="center" width="80"></el-table-column>

      <el-table-column label="操作" width="250" align="center">
        <template slot-scope="{row, $index}">
          <hint-button
            v-if="row.isSale !== 1"
            title="上架"
            type="success"
            size="mini"
            icon="el-icon-top"
            @click="onSale(row)"
          ></hint-button>
          <hint-button
            v-else
            title="下架"
            type="info"
            size="mini"
            icon="el-icon-bottom"
            @click="cancelSale(row)"
          ></hint-button>
          <hint-button
            title="编辑"
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="editSpu(row)"
          ></hint-button>
          <hint-button
            title="查看sku信息"
            type="info"
            size="mini"
            icon="el-icon-info"
            @click="getSkuInfo(row)"
          ></hint-button>

          <el-popconfirm :title="`确定删除 ${row.spuName} 吗？`" @onConfirm="delSpu(row)">
            <hint-button
              title="删除spu"
              slot="reference"
              type="danger"
              size="mini"
              icon="el-icon-delete"
            ></hint-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      style="margin-top:20px;text-align:center"
      :current-page="currentPage"
      :page-sizes="[3, 5, 10]"
      :page-size="pageSize"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>

    <!-- 抽屉效果 -->
    <el-drawer
      title="我是标题"
      size="50%"
      :visible.sync="drawer"
      :show-close="false"
      :direction="direction"
      :before-close="handleClose"
    >
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}元</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <template>
            <el-tag
              type="success"
              v-for="item in skuInfo.skuAttrValueList"
              :key="item.id"
              style="margin-right: 10px"
            >{{ item.attrId }}-{{ item.valueId }}</el-tag>
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="150px">
            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
              <img :src="item.imgUrl" alt />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'Sku',
  data() {
    return {
      skuList: [],
      currentPage: 1,
      pageSize: 3,
      total: 0,
      tableLoading: true,
      skuInfo: {},
      drawer: false,
      direction: 'rtl',
    }
  },
  mounted() {
    this.getSkuList()
  },
  methods: {
    // 表格斑马纹
    rowStyle({ row, rowIndex }) {
      if (rowIndex % 2 === 1)
        return {
          backgroundColor: "oldlace"
        };
      return {};
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getSkuList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getSkuList();
    },
    async getSkuList() {
      this.tableLoading = true
      let res = await this.$API.sku.reqSkuList(this.currentPage, this.pageSize)
      console.log(res)
      this.tableLoading = false
      if (res.code === 200) {
        this.total = res.data.total
        this.skuList = res.data.records
      }
    },
    // 商品上架
    async onSale(row) {
      let res = await this.$API.sku.reqOnSale(row.id)
      console.log(res)
      if (res.code === 200) {
        this.$message.success('上架成功')
        this.getSkuList()
      }
    },
    // 商品下架
    async cancelSale(row) {
      let res = await this.$API.sku.reqCancelSale(row.id)
      console.log(res)
      if (res.code === 200) {
        this.$message.success('下架成功')
        this.getSkuList()
      }
    },
    // 获取sku信息
    async getSkuInfo(row) {
      this.drawer = true
      let res = await this.$API.sku.reqSkuInfo(row.id)
      console.log(res)
      if (res.code === 200) {
        this.skuInfo = res.data
      }
    },
    // 关闭抽屉
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    }
  }
}
</script>

<style scoped>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
}
.el-col {
  margin: 10px 10px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
::v-deep .el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

 ::v-deep .el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
 ::v-deep .el-carousel__button{
  width: 10px;
  height: 10px;
  background: red;
  border-radius: 50%;
}
</style>