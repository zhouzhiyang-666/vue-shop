<template>
  <div>
    <el-card style="margin-bottom:20px">
      <CategorySelect :selectDisable="!isTableShow" @valueSubmit="submit" @select-change="categoryChange"/>
    </el-card>

    <el-card>
      <!-- 三个内容切换 -->
      <div v-show="scene === 0">
        <!-- 展示SPU列表结构 -->
        <el-button type="primary" icon="el-icon-plus" :disabled="category3Id < 1" @click="addSpu">添加SPU</el-button>
        <el-table :data="productList" style="width: 100%" :row-style="rowStyle" border>
          <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="150" align="center"></el-table-column>
          <el-table-column prop="description" label="SPU描述" align="center">
            <!-- <template slot-scope="{row}">
              <el-tag
                v-for="item in row.attrValueList"
                :key="item.id"
                style="margin-right:5px"
                size="mini"
                type="success"
              >{{ item.valueName }}</el-tag>
            </template>-->
          </el-table-column>
          <el-table-column label="操作" width="250" align="center">
            <template slot-scope="{row, $index}">
              <hint-button title="添加sku" type="success" size="mini" icon="el-icon-plus" @click="addSku(row)"></hint-button>
              <hint-button title="修改spu" type="warning" size="mini" icon="el-icon-edit" @click="editSpu(row)"></hint-button>
              <hint-button title="查看当前spu全部sku列表" type="info" size="mini" icon="el-icon-info" @click="seeSku(row)"></hint-button>

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
      </div>

      <spu-form ref="spu" v-show="scene === 1" @change-secne="changeSceneSpu">
        <!-- 添加|修改SPU -->
      </spu-form>

      <sku-form ref="sku" v-show="scene === 2" @change-scene="changeSceneSku">
        <!-- 添加sku -->
      </sku-form>
    </el-card>
  </div>
</template>

<script>
import HintButton from '@/components/HintButton'
import SpuForm from './SpuForm/index.vue'
import SkuForm from './SkuForm/index.vue'
export default {
  name: "Spu",
  components: { HintButton,SpuForm,SkuForm },
  data() {
    return {
      isTableShow: true,
      productList: [],
      category3Id: 0,
      category2Id: 0,
      category1Id: 0,
      currentPage: 1,
      pageSize: 3,
      total: 0,
      scene: 0, // 0代表展示spu列表数据  1添加SPU|修改SPU 2 添加SKU
    };
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
    categoryChange(val,level) {
      // console.log(val,level)
      this.category3Id = 0
    },
    submit(val) {
      // this.addBtnDisable = false
      const { category1, category2, category3 } = val;
      this.category3Id = category3;
      this.category2Id = category2;
      this.category1Id = category1;
      this.isTableShow = true;
      this.getSpuList();
    },
    async getSpuList() {
      const res = await this.$API.spu.reqProductList(this.currentPage, this.pageSize, this.category3Id);
      console.log(res);
      if (res.code === 200) {
        this.total = res.data.total;
        this.productList = res.data.records;
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getSpuList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getSpuList();
    },

    // 添加spu
    addSpu() {
      this.scene = 1
      this.$refs.spu.initSpuData(1,this.category3Id, true)
    },
    // 添加Sku
    addSku(row) {
      this.scene = 2
      console.log(this.$refs.sku)
      this.$refs.sku.getData(this.category1Id,this.category2Id,this.category3Id,row);
    },
    // 修改spu
    editSpu(row) {
      this.scene = 1
      this.$refs.spu.initSpuData(row,this.category3Id)
      console.log(row)
    },
    // 删除spu
    async delSpu(row) {
      let res = await this.$API.spu.reqDelSpu(row.id)
      console.log(res)
      if (res.code === 200) {
        this.$message.success('删除成功')
        this.getSpuList()
      }
    },
    // 查看sku
    seeSku(row) {
      console.log(row)

    },
    changeSceneSpu(scene, isAdd) { // 0 取消 1保存
      console.log(scene,isAdd)
      if (scene == 0) {
        this.scene = 0
        this.getSpuList();
      } else if (isAdd) {
        this.scene = 0
        this.currentPage = 1
        this.getSpuList();
      }
    },
    changeSceneSku() {
      this.scene = 0
    }
  }
}
</script>

<style scoped>
</style>