<template>
  <div>
    <el-form
      :inline="true"
      :model="formInline"
      :rules="rules"
      ref="ruleForm"
      class="demo-form-inline"
    >
      <el-form-item label="一级分类" prop="category1">
        <el-select v-model="formInline.category1" placeholder="请选择" :disabled="selectDisable" @change="handle1">
          <el-option
            v-for="item in categoryList1"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类" prop="category2">
        <el-select v-model="formInline.category2" placeholder="请选择" :disabled="selectDisable" @change="handle2">
          <el-option
            v-for="item in categoryList2"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="三级分类" prop="category3">
        <el-select v-model="formInline.category3" placeholder="请选择" :disabled="selectDisable" @change="handle3">
          <el-option
            v-for="item in categoryList3"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit('ruleForm')">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'CategorySelect',
  props: {
    selectDisable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      categoryList1: [],
      categoryList2: [],
      categoryList3: [],
      formInline: {
        category1: '',
        category2: '',
        category3: ''
      },
      rules: {
        category1: [
          { required: true, message: '请选择一级分类', trigger: 'submit' }
        ],
        category2: [
          { required: true, message: '请选择二级分类', trigger: 'submit' }
        ],
        category3: [
          { required: true, message: '请选择三级分类', trigger: 'submit' }
        ]
      }
    }
  },
  mounted() {
    this.getCategory1()
  },
  methods: {
    onSubmit(formName) {
      // console.log('submit!',this.formInline.region);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('valueSubmit', this.formInline)
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    // 获取一级分类
    async getCategory1() {
      const res = await this.$API.attr.reqAttrCategory1()
      this.categoryList1 = res.data
    },
    // 获取二级分类
    async getCategory2() {
      const res = await this.$API.attr.reqAttrCategory2(this.formInline.category1)
      this.categoryList2 = res.data
    },
    // 获取三级分类
    async getCategory3() {
      const res = await this.$API.attr.reqAttrCategory3(this.formInline.category2)
      this.categoryList3 = res.data
    },
    // 各级分类值变化
    handle1(val) {
      this.categoryList2 = []
      this.categoryList3 = []
      this.formInline.category2 = ''
      this.formInline.category3 = ''

      this.formInline.category1 = val
      this.getCategory2()
      this.$emit('select-change',val,1)
    },
    handle2(val) {
      this.categoryList3 = []
      this.formInline.category3 = ''
      this.formInline.category2 = val
      this.getCategory3()
      this.$emit('select-change',val,2)
    },
    handle3(val) {
      this.formInline.category3 = val
      this.$emit('select-change',val,3)
    }

  }
}
</script>

<style>
</style>