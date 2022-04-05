<template>
  <div>
    <el-form ref="form" :model="skuInfo" label-width="80px">
      <el-form-item label="SPU名称">{{ spu.spuName }}</el-form-item>

      <el-form-item label="SKU名称">
        <el-input v-model="skuInfo.skuName" placeholder="sku名称"></el-input>
      </el-form-item>

      <el-form-item label="价格(元)">
        <el-input type="number" min="0" v-model.number="skuInfo.price" placeholder="价格(元)"></el-input>
      </el-form-item>

      <el-form-item label="重量(千克)">
        <el-input type="number" min="0" v-model.number="skuInfo.weight" placeholder="重量(千克)"></el-input>
      </el-form-item>

      <el-form-item label="规格描述">
        <el-input type="textarea" :rows="4" v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>

      <el-form-item :inline="true" label="平台属性">
        <el-form :inline="true" label-width="80px">
          <el-form-item
            v-for="attrInfo in attrInfoList"
            :key="attrInfo.id"
            :label="attrInfo.attrName"
            style="margin-top:10px"
          >
            <el-select v-model="attrInfo.attrIdAndValueId" placeholder="请选择">
              <el-option
                v-for="attrValue in attrInfo.attrValueList"
                :key="attrValue.id"
                :label="attrValue.valueName"
                :value="`${attrInfo.id}-${attrValue.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-form :inline="true" label-width="80px">
          <el-form-item
            v-for="saleAttr in spuSaleAttrList"
            :key="saleAttr.id"
            :label="saleAttr.saleAttrName"
            style="margin-top:10px"
          >
            <el-select v-model="saleAttr.attrIdAndValueId" placeholder="请选择">
              <el-option
                v-for="saleAttrValue in saleAttr.spuSaleAttrValueList"
                :key="saleAttrValue.id"
                :label="saleAttrValue.saleAttrValueName"
                :value="`${saleAttr.id}-${saleAttrValue.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="图片列表">
        <el-table
          ref="multipleTable"
          border
          :data="spuImageList"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="图片" width="120">
            <template slot-scope="{row}">
              <el-image style="width: 100px; height: 100px" :src="row.imgUrl" fit="fill"></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="120"></el-table-column>
          <el-table-column prop="address" label="操作" show-overflow-tooltip>
            <template slot-scope="{row}">
              <el-button v-if="row.isDefault == 0" type="primary" size="mini" @click="setDefaultImg(row)">设为默认</el-button>
              <el-tag v-else type="success">默认</el-tag>
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
  name: 'SkuForm',
  data() {
    return {
      spu: {},
      multipleSelection: [],
      spuImageList: [],
      spuSaleAttrList: [],
      attrInfoList: [],
      // 收集sku信息
      skuInfo: {
        category3Id: 0,
        createTime: new Date(),
        price: '',
        weight: "",
        spuId: 0,
        tmId: 0,
        skuAttrValueList: [],
        skuDefaultImg: "",
        skuDesc: "",
        skuImageList: [],
        skuName: "",
        skuSaleAttrValueList: []
      },
      // 平台属性
      skuAttrValueList: [
        // {
        //   attrId: 0,
        //   valueId: 0,
        // }
      ],
      // 收集图片
      skuImageList: [
        // {
        //   imgName: "",
        //   imgUrl: "",
        //   isDefault: "",
        //   spuImgId: 0
        // }
      ],
      // 收集销售属性列表
      skuSaleAttrValueList: [
        // {
        //   saleAttrId: 0,
        //   saleAttrValueId: 0,
        //   spuId: 0
        // }
      ]
    }
  },
  methods: {
    // 获取sku数据
    async getData(category1Id, category2Id, category3Id, spu) {
      this.spu = spu
      this.skuInfo.category3Id = category3Id
      this.skuInfo.spuId = spu.id
      this.skuInfo.tmId = spu.tmId
      console.log('获取sku信息', category1Id, category2Id, category3Id, spu)
      // 获取图片reqSkuImageList
      let res = await this.$API.spu.reqSkuImageList(spu.id)
      console.log(res)
      if (res.code === 200) {
        let list = res.data
        list.forEach(item=>{
          item.isDefault = 0
        })
        this.spuImageList = list
      }
      // 获取销售属性reqSpuSaleAttrList
      let res2 = await this.$API.spu.reqSpuSaleAttrList(spu.id)
      console.log(res2)
      if (res2.code === 200) {
        this.spuSaleAttrList = res2.data
      }
      // 获取商品基本信息列表reqAttrInfoList
      let res3 = await this.$API.spu.reqAttrInfoList(category1Id, category2Id, category3Id)
      console.log(res3)
      if (res3.code === 200) {
        this.attrInfoList = res3.data
      }
    },
    async onSubmit() {
      // 收集基本信息
      // 整理平台属性
      this.attrInfoList.forEach(item => {
        // console.log(item.attrIdAndValueId?.split('-'));
        let [attrId, valueId] = item.attrIdAndValueId?.split('-') ?? [0, 0]
        attrId && valueId && this.skuAttrValueList.push({
          attrId: parseInt(attrId),
          valueId: parseInt(valueId)
        })
      })
      this.skuInfo.skuAttrValueList = this.skuAttrValueList

      // 整理销售属性
      this.spuSaleAttrList.forEach(item => {
        // console.log(item.attrIdAndValueId?.split('-'));
        let [saleAttrId, saleAttrValueId] = item.attrIdAndValueId?.split('-') ?? [0, 0]
        saleAttrId && saleAttrValueId && this.skuSaleAttrValueList.push({
          // saleAttrId,
          // saleAttrValueId,
          saleAttrId: parseInt(saleAttrId),
          saleAttrValueId: parseInt(saleAttrValueId),
          spuid: this.spu.id
        })
      })
      this.skuInfo.skuSaleAttrValueList = this.skuSaleAttrValueList

      console.log('submit!', this.skuAttrValueList, this.skuSaleAttrValueList);
      // 提交信息reqSaveSkuInfo
      this.skuInfo.skuImageList = this.spuImageList
      let res = await this.$API.spu.reqSaveSkuInfo(this.skuInfo)
      console.log(res)
      if (res.code === 200) {
        this.$message.success('添加成功')
        this.$emit('change-scene')
      } else {
        this.$message.success('添加失败')
      }
    },
    cancel() {
      this.$emit('change-scene')
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 设置默认图片
    setDefaultImg(row) {
      console.log(row)
      this.spuImageList.forEach(item=>{
        if(item.id != row.id) item.isDefault = 0
      })
      row.isDefault = 1
      // 收集默认图片信息
      this.skuInfo.skuDefaultImg = row.imgUrl
    }
  }
}
</script>

<style>
</style>