<template>
  <div>
    <el-form ref="form" :model="spu" label-width="80px">
      <el-form-item label="SPU名称" prop="spuName">
        <el-input v-model.trim="spu.spuName" placeholder="SPU名称"></el-input>
      </el-form-item>

      <el-form-item label="品牌">
        <el-select v-model="spu.tmId" placeholder="请选择品牌">
          <el-option v-for="tm in tradeMarkList" :key="tm.id" :label="tm.tmName" :value="tm.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="SPU描述" prop="description">
        <el-input type="textarea" :rows="4" v-model="spu.description" placeholder="SPU描述"></el-input>
      </el-form-item>

      <el-form-item label="SPU图片" prop="spuImageList">
        <el-upload
          class="upload-demo"
          action="/dev-api/admin/product/fileUpload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="spuImageList"
          list-type="picture-card"
        >
          <!-- <el-button size="small" type="primary">点击上传</el-button> -->
          <i class="el-icon-plus"></i>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-select
          v-model="attrId"
          :placeholder="`还有${unSelectSaleAttr && unSelectSaleAttr.length}未选择`"
        >
          <el-option
            v-for="item in unSelectSaleAttr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrId"
          @click="addSpuSaleAttr"
        >添加销售属性</el-button>

        <!-- 当前商品spu属性表格 -->
        <el-table
          :data="spu.spuSaleAttrList"
          style="width: 100%;margin:20px 0;"
          :row-style="rowStyle"
          border
        >
          <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" align="center"></el-table-column>

          <el-table-column prop="spuSaleAttrValueList" label="属性值名称列表" align="center">
            <template slot-scope="{row,$index}">
              <el-tag
                :key="index"
                v-for="(tag, index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="handleClose(row, index)"
              >{{ tag.saleAttrValueName }}</el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="tagValue"
                :ref="'saveTagInput' + $index"
                size="small"
                @keyup.enter.native="handleInputConfirm(row)"
                @blur="handleInputConfirm(row)"
              ></el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput(row, $index)"
              >添加</el-button>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="{row,$index}">
              <el-popconfirm
                :title="`确定删除 ${row.saleAttrName} 吗？`"
                @onConfirm="delSaleAttr(row, $index)"
              >
                <el-button slot="reference" type="danger" size="mini" icon="el-icon-delete"></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SpuForm',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,

      spu: {
        category3Id: 0,
        description: "",  // 描述
        tmId: 0,   // 品牌id
        spuImageList: [  // 图片列表
          {
            id: 0,
            imgName: "",
            imgUrl: "",
            spuId: 0
          }
        ],
        spuName: "",
        // 平台属性值
        spuSaleAttrList: [
          {
            baseSaleAttrId: 0,
            id: 0,
            saleAttrName: "",
            spuId: 0,
            spuSaleAttrValueList: [
              {
                baseSaleAttrId: 0,
                id: 0,
                isChecked: "",
                saleAttrName: "",
                saleAttrValueName: "",
                spuId: 0
              }
            ]
          }
        ]
      },
      tradeMarkList: [],  // 存储品牌信息
      spuImageList: [],  // spu图片列表
      baseSaleAttrList: [],  // 全平台销售属性

      inputVisible: false,
      tagValue: '',
      attrId: '',
      isAdd: false  // 区分添加还是修改spu信息
    }
  },
  methods: {
    // 表格斑马纹
    rowStyle({ row, rowIndex }) {
      if (rowIndex % 2 === 1) return {
        backgroundColor: 'oldlace'
      };
      return {};
    },
    async onSubmit() {
      console.log('submit!');

      this.spuImageList.forEach(item => {
        delete item.url
        delete item.name
      })
      this.spu.spuImageList = this.spuImageList
      console.log(this.spu)
      let res = await this.$API.spu.reqSaveSpuInfo(this.spu)
      // console.log(res)

      this.$emit('change-secne', 0, this.isAdd)
    },
    handleRemove(file, fileList) {
      this.spuImageList.find((item, index) => {
        // console.log(item,index)
        if (file.imgUrl === item.imgUrl) this.spuImageList.splice(index, 1)
      })
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      console.log(file);
    },
    handleSuccess(res, file, filelist) {
      // console.log(res, file, filelist)
      this.spuImageList.push({
        imgName: file.name,
        imgUrl: res.data,
        spuId: this.spu.id,
        name: file.name,
        url: res.data,
      })
      // this.spu.spuImageList = this.spuImageList
    },
    cancel() {
      this.$emit('change-secne', 0)
    },
    // 初始化组件数据，父组件点击编辑按钮时触发
    async initSpuData(spu, category3Id, isAdd) {
      this.isAdd = isAdd ? isAdd : false
      if (isAdd) {  // 添加spu信息
        this.spu = {
          category3Id: category3Id,
          description: "",  // 描述
          tmId: '',   // 品牌id
          spuImageList: [  // 图片列表
            {
              id: 0,
              imgName: "",
              imgUrl: "",
              spuId: 0
            }
          ],
          spuName: "",
          // 平台属性值
          spuSaleAttrList: [
            {
              baseSaleAttrId: 0,
              id: 0,
              saleAttrName: "",
              spuId: 0,
              spuSaleAttrValueList: [
              ]
            }
          ]
        }
      } else {  // 修改spu信息
        // 获取spu信息
        let res = await this.$API.spu.reqSpuById(spu.id)
        console.log(res)
        if (res.code === 200) {
          let spuTemp = res.data
          spuTemp.spuSaleAttrList.forEach(item1 => {
            this.$set(item1, 'inputVisible', false)
          })
          // console.log('@@spuTemp',spuTemp)
          this.spu = spuTemp
          this.spu.category3Id = category3Id
        }

        // 获取SPU图片列表
        let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id)
        // console.log(spuImageResult)
        if (spuImageResult.code === 200) {
          let ImgList = spuImageResult.data
          this.spuImageList = ImgList.map(item => {
            item.name = item.imgName
            item.url = item.imgUrl
            return item
          })
          this.spu.spuImageList = this.spuImageList
        }
      }

      // 获取品牌信息
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList()
      // console.log(tradeMarkResult)
      if (tradeMarkResult.code === 200) {
        this.tradeMarkList = tradeMarkResult.data
      }

      // 获取全平台销售属性
      let baseSaleAttrRes = await this.$API.spu.reqBaseSaleAttrList()
      console.log(baseSaleAttrRes)
      if (baseSaleAttrRes.code === 200) {
        this.baseSaleAttrList = baseSaleAttrRes.data
      }
    },

    // 标签handle函数
    handleClose(row, index) {
      console.log(row, index)
      row.spuSaleAttrValueList.splice(index, 1);
    },

    showInput(row, index) {
      row.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs['saveTagInput' + index].focus();
      });
    },

    handleInputConfirm(row) {
      let tagValue = this.tagValue;
      if (tagValue) {
        row.spuSaleAttrValueList.push({
          baseSaleAttrId: row.baseSaleAttrId,
          id: 0,
          isChecked: null,
          saleAttrName: row.saleAttrName,
          saleAttrValueName: tagValue,
          spuId: this.spu.id
        });
      }
      row.inputVisible = false;
      this.tagValue = '';
    },
    // 添加销售属性
    addSpuSaleAttr() {
      let select = this.unSelectSaleAttr.filter(item => {
        return item.id === this.attrId
      })
      // console.log(select.id,select.name)
      this.spu.spuSaleAttrList.push({
        baseSaleAttrId: select[0].id,
        inputVisible: false,
        isChecked: null,
        saleAttrName: select[0].name,
        spuId: this.spu.id,
        spuSaleAttrValueList: []
      })
    },
    delSaleAttr(row, index) {
      this.spu.spuSaleAttrList.splice(index, 1)
    }
  },
  computed: {
    unSelectSaleAttr() {
      // 整个平台的销售属性
      // this.spu.spuSaleAttrList // 用户已选
      let res = this.baseSaleAttrList.filter(item1 => {
        return this.spu.spuSaleAttrList.every(item2 => {
          return item1.name != item2.saleAttrName
        })
      })
      return res
    }
  }
}
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>