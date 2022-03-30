<template>
  <div>
    <el-card style="margin-bottom:20px">
      <CategorySelect :selectDisable="!isTableShow" @valueSubmit="submit" @select-change="categoryChange"/>
    </el-card>

    <el-card>
      <div v-show="!isTableShow">
        <el-form
          :inline="true"
          :model="attrInfo"
          :rules="rules"
          ref="ruleForm"
          class="demo-form-inline"
        >
          <el-form-item label="属性名" prop="attrName">
            <el-input v-model.trim="attrInfo.attrName" placeholder="请输入属性名"></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          :disabled="canAdd"
          icon="el-icon-plus"
          @click="addAttrValue('ruleForm')"
        >添加属性值</el-button>
        <el-button>取消</el-button>

        <el-table
          :data="attrInfo.attrValueList"
          style="width: 100%;margin:20px 0;"
          :row-style="rowStyle"
          border
        >
          <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>

          <el-table-column prop="attrName" label="属性值名称" align="center">
            <template slot-scope="{row,$index}">
              <el-input 
                v-if="row.flag" 
                :ref="'input'+$index"
                v-model.trim="row.valueName" 
                placeholder="请输入属性值名称" 
                size="mini"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
              ></el-input>
              <span v-else style="display: block;" @click="toEdit(row,$index)">{{row.valueName}}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="{row,$index}">
              <el-popconfirm :title="`确定删除 ${row.valueName} 吗？`" @onConfirm="delAttrValue(row,$index)">
                <el-button slot="reference" type="danger" size="mini" icon="el-icon-delete" ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        

        <el-button type="primary" :disabled="attrInfo.attrValueList.length <= 0" @click="saveAttrInfo">保存</el-button>
        <el-button @click="isTableShow = true">取消</el-button>
      </div>

      <!-- 表格 -->
      <div v-show="isTableShow">
        <el-button type="primary" :disabled="addBtnDisable" icon="el-icon-plus" @click="addAttr">添加</el-button>
        <el-table :data="attrInfoList" style="width: 100%" :row-style="rowStyle" border>
          <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150" align="center"></el-table-column>
          <el-table-column prop="name" label="属性值列表" align="center">
            <template slot-scope="{row}">
              <el-tag
                v-for="item in row.attrValueList"
                :key="item.id"
                style="margin-right:5px"
                size="mini"
                type="success"
              >{{ item.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="{row, $index}">
              <el-button
                type="warning"
                size="mini"
                icon="el-icon-edit"
                style="margin-right: 5px"
                @click="showEditDialog(row)"
              ></el-button>
              
              <el-popconfirm :title="`确定删除 ${row.attrName} 吗？`" @onConfirm="delAttr(row)">
                <el-button
                  slot="reference"
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入lodash的深拷贝
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'Attr',
  data() {
    return {
      isTableShow: true, // 展示表格或者是属性添加页面
      addBtnDisable: true,
      attrInfoList: [],

      rules: {
        attrName: [
          { required: true, message: '请输入属性名', trigger: 'submit' }
        ]
      },
      // 收集新增或修改的属性
      attrInfo: {
        attrName: '',  // 属性名
        attrValueList: [ // 属性值 列表
          // {
          //   attrId: 0,
          //   id: 0,
          //   valueName: "string"
          // }
        ],
        categoryId: 0,  // 3级分类id
        categoryLevel: 3
      },
      category3Id: 0,  // 正在查询的3级分类id
      category2Id: 0,  // 正在查询的2级分类id
      category1Id: 0  // 正在查询的1级分类id
    }
  },
  computed: {
    canAdd() {
      return this.category3Id <= 0 || this.attrInfo.attrName <=0
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
    categoryChange(val,level) {
      // console.log(val,level)
      this.category3Id = 0
    },
    submit(val) {
      this.addBtnDisable = false
      const { category1, category2, category3 } = val
      this.category3Id = category3
      this.category2Id = category2
      this.category1Id = category1
      this.isTableShow = true
      this.getAttrInfo()
    },
    addAttr() {
      this.isTableShow = false
      this.attrInfo = {
        attrName: '',  // 属性名
        attrValueList: [], // 属性值 列表
        categoryId: this.category3Id,  // 3级分类id
        categoryLevel: 3
      }
    },
    async getAttrInfo() {
      const res = await this.$API.attr.reqAttrInfoList(this.category1Id, this.category2Id, this.category3Id)
      console.log(res)
      this.attrInfoList = res.data
    },
    
    showEditDialog(row) {
      this.isTableShow = false
      this.attrInfo = cloneDeep(row)
      this.attrInfo.attrValueList.forEach(item=>{
        this.$set(item,'flag', false)
      })
      console.log(row)
    },
    async delAttr(row) {
      const res = await this.$API.attr.reqDelAttr(row.id)
      console.log(row)
      if (res.code === 200) {
        this.$message.success(res.message)
        this.getAttrInfo()
      }
    },
    // 添加属性回调
    addAttrValue(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.attrInfo.attrValueList.push({
            attrId: this.attrInfo.id,
            valueName: '',
            flag: true
          })
          this.$nextTick(()=>{
            this.$refs['input'+ (this.attrInfo.attrValueList.length-1 )].focus()
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    // 添加属性
    async saveAttrInfo() {
      // 过滤掉为空的属性值
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item=>{
        if (item.valueName != '') {
          delete item.flag
          return true
        }
      })
      const res = await this.$API.attr.reqAddAttr(this.attrInfo)
      console.log(res)
      if (res.code === 200) {
        this.$message.success(res.message)
        this.isTableShow = true
        this.getAttrInfo()
      }
    },
    // 输入模式转变查阅模式
    toLook(row) {
      if (row.valueName.trim() === '') {
        this.$message.warning('请输入属性值')
        return
      }
      let isRepat = this.attrInfo.attrValueList.some(item=>{
        if (row !== item) {
          return row.valueName == item.valueName
        }
      })
      if (isRepat) {
        this.$message.warning('属性值相同')
        return
      }
      row.flag = false
    },
    // 查阅模式转变输入模式
    toEdit(row,index) {
      row.flag = true
      // 切换input，input节点还没生成，导致无法获取到对应节点的ref
      // 使用$nextTick ， 当节点渲染完毕，会执行一次
      this.$nextTick(()=>{
        this.$refs['input'+index].focus()
      })
    },
    delAttrValue(row,index) {
      console.log(row,index)
      this.attrInfo.attrValueList.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>