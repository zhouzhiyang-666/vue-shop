<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0px" @click="showAddDialog">添加</el-button>

    <el-table :data="dataList" style="width:100%" border>
      <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>

      <el-table-column prop="tmName" label="品牌名称" align="center"></el-table-column>

      <el-table-column prop="logoUrl" label="品牌logo" align="center">
        <template slot-scope="scope">
          <el-image style="width: 100px; height: 50px" :src="scope.row.logoUrl" :fit="'contain'"></el-image>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="操作" align="center">
        <template slot-scope="{row,$index}">
          <el-button type="warning" icon="el-icon-edit" size="mini" @click="showEditDialog(row)">编辑</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="showDelDialog(row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top:20px;text-align:center"
      :current-page="currentPage"
      :page-sizes="[3, 5, 10]"
      :page-size="pageSize"
      layout="prev, pager, next, jumper, ->, total, sizes"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="tmForm" width="80%">
        <el-form-item label="品牌名称" :label-width="formLabelWidth">
          <el-input v-model="tmForm.tmName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="品牌logo" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>确定删除吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="delTradeMark">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'tradeMask',
  data() {
    return {
      dataList: [],
      currentPage: 1,
      pageSize: 3,
      total: 0,
      dialogFormVisible: false,
      dialogVisible: false,
      tmForm: {
        id: 0,
        tmName: '',
        logoUrl: ''
      },
      dialogTitle: '添加品牌',
      formLabelWidth: '120px',
      willDelTradeId: 0
    }
  },
  mounted() {
    // console.log('mounted',this.$API)
    this.getPageList()
  },
  methods: {
    async getPageList() {
      const result = await this.$API.trademark.reqTradeMarkList(this.currentPage, this.pageSize)
      console.log(result)
      if (result.code === 200) {
        this.total = result.data.total
        this.dataList = result.data.records
      }
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getPageList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getPageList()
    },

    handleAvatarSuccess(res, file) {
      // console.log(res)
      // this.tmForm.logoUrl = URL.createObjectURL(file.raw);
      this.tmForm.logoUrl = res.data
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    async addOrUpdateTradeMark() {
      const res = await this.$API.trademark.reqAddOrUpdateTradeMark(this.tmForm)
      if (res.code === 200) {
        this.$message.success(res.message)
        this.dialogFormVisible = false
        this.getPageList()
      }
    },
    showAddDialog() {
      this.tmForm = {}
      this.dialogFormVisible = true
      this.dialogTitle = '添加品牌'
    },
    showEditDialog(row) {
      this.tmForm = row
      this.dialogFormVisible = true
      this.dialogTitle = '编辑品牌'
    },
    async delTradeMark() {
      if (!this.willDelTradeId) return
      const res = await this.$API.trademark.reqDelTradeMark(this.willDelTradeId)
      if (res.code === 200) {
        this.$message.success(res.message)
        this.dialogVisible = false
        this.getPageList()
      }
    },
    showDelDialog(id) {
      this.dialogVisible = true
      this.willDelTradeId = id
    }
  }
}
</script>

<style scope>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>