<template>
  <div>
    <el-row>
      <el-button size="mini" plain title="隐藏与显示" icon="el-icon-share" @click="collapse()" circle></el-button>
      <el-button
        size="mini"
        type="success"
        plain
        title="添加"
        icon="el-icon-circle-plus-outline"
        @click="openPostDialog()"
        circle
      ></el-button>
      <el-button size="mini" plain title="查询" icon="el-icon-refresh" circle @click="getData()"></el-button>
    </el-row>

    <div v-if="activeName">
      <el-form ref="query" size="mini" label-width="80px">
        <el-row>
          <el-col :span="3" :offset="0">
            <el-form-item label="名称">
              <el-input clearable size="mini" v-model="query.name" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="3" :offset="0">
            <el-form-item label="日期">
              <el-date-picker
                clearable
                v-model="query.daySA"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="3" :offset="0">
            <el-form-item label="区域">
              <el-select
                v-model="query.id"
                filterable
                clearable
                placeholder="请选择"
                size="mini"
                @change="getCitysList()"
              >
                <el-option
                  v-for="item in provinceList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <el-row>
      <el-col>
        <el-table v-loading="loading" :data="cityList" size="mini" :key="tableKey" border>
          <el-table-column align="center" label="序号" type="index" width="80"></el-table-column>

          <el-table-column align="center" prop="id" label="代号" width="80"></el-table-column>

          <el-table-column prop="name" align="center" label="名称"></el-table-column>

          <el-table-column prop="photo" align="center" label="文件"></el-table-column>

          <el-table-column prop="texts" align="center" label="文本"></el-table-column>
          <el-table-column prop="note" align="center" label="备注"></el-table-column>

          <el-table-column prop="daySA" align="center" label="时间"></el-table-column>

          <el-table-column align="center" label="操作" width="170">
            <template slot-scope="scope">
              <el-button
                size="mini"
                plain
                title="查看"
                icon="el-icon-search"
                circle
                @click="openSeleDialog(scope.row)"
              ></el-button>

              <el-button
                size="mini"
                plain
                title="删除"
                type="danger"
                icon="el-icon-delete"
                circle
                @click="delCity(scope.row)"
              ></el-button>

              <el-button
                size="mini"
                plain
                title="编辑"
                type="primary"
                icon="el-icon-edit"
                circle
                @click="openPutDialog(scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div v-show="!loading" class="pagination-container">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="query.page"
            :page-sizes="[10,20,50,100, 200, 300, 400,500,1000]"
            :page-size="query.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            style="color:gray"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>

    <el-dialog :label-position="labelPosition" width="55%" title="城市" :visible.sync="dialogForm">
      <el-form ref="putform" :model="putform" label-width="100px" size="mini">
        <el-form-item label="名称">
          <el-input
            size="mini"
            :readonly="putform.red"
            :clearable="!putform.red"
            v-model="putform.name"
            placeholder="请输入"
          ></el-input>
        </el-form-item>

        <el-form-item label="日期">
          <el-date-picker
            clearable
            :readonly="putform.red"
            v-model="putform.day"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="下载" v-if="putform.sel">
          <a target="_blank" download :href="putform.photo">
            <el-button size="mini" plain type="success">下载</el-button>
          </a>
        </el-form-item>

        <el-form-item label="文件" v-if="!putform.red">
          <el-upload
            class="upload-demo"
            :headers="headers"
            action="/admin/user/load"
            name="file"
            :limit="1"
            :on-success="uploadSuccess"
            :file-list="enclosureList"
          >
            <el-button size="mini">选取</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item label="备注">
          <el-input
            type="textarea"
            :readonly="putform.red"
            :autosize="{ minRows: 2, maxRows: 5}"
            placeholder="请输入内容"
            v-model="putform.note"
          ></el-input>
        </el-form-item>
        <el-form-item label="文本">
          <div>
            <el-upload
              class="avatar-uploader"
              action="/admin/user/load"
              name="file"
              :headers="headers"
              :show-file-list="false"
              :on-success="cropUploadSuccess"
              :on-error="uploadError"
              :before-upload="beforeUpload"
            ></el-upload>
            <el-row v-loading="quillUpdateImg">
              <quill-editor
                v-model="putform.texts"
                :readonly="putform.red"
                ref="myQuillEditor"
                :options="editorOption"
              ></quill-editor>
            </el-row>
          </div>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" align="right" style="margin-top:30px">
        <el-button size="mini" plain @click="closeDialog()">取 消</el-button>
        <template v-if="!putform.red">
          <el-button v-if="!putform.adds" size="mini" type="primary" plain @click="goPutObj()">确 定</el-button>
          <el-button v-else size="mini" type="primary" plain @click="postCity()">确 定</el-button>
        </template>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getCityList,
  putCityObj,
  getCitys,
  postCityObj,
  getCityObj,
  delCityObj
} from '@/api/ip/city'
import { quillEditor } from 'vue-quill-editor'
import { getToken } from '@/util/auth'
export default {
  name: 'tree',
  components: {
    quillEditor
  },
  data() {
    return {
      quillUpdateImg: false,
      enclosureList: [],
      activeName: false,
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      putform: {},
      dialogForm: false,
      labelPosition: 'right',
      tableKey: 0,
      cityList: [],
      loading: true,
      total: 0,
      editorOption: {
        placeholder: '请输入内容',
        theme: 'snow',
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline'],
              [{ indent: '-1' }, { indent: '+1' }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ color: [] }],
              [{ align: [] }],
              ['image', 'link']
            ],
            handlers: {
              image: function(value) {
                if (value) {
                  document.querySelector('.avatar-uploader input').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        }
      },
      provinceList: [],
      query: {
        page: 1,
        limit: 10
      }
    }
  },
  created() {
    this.getData()
    this.selList()
  },
  methods: {
    getData() {
      getCityList(this.query).then(response => {
        this.cityList = response.data.records
        this.total = response.data.total
        this.loading = false
      })
    },
    selList() {
      getCitys().then(response => {
        this.provinceList = response.data.data
      })
    },
    openPostDialog() {
      this.clearDialog()
      this.putform.sel = false
      this.putform.red = false
      this.putform.adds = true
      this.dialogForm = true
    },
    openSeleDialog(r) {
      this.clearDialog()
      getCityObj({ id: r.id }).then(response => {
        this.putform = response.data.data
        this.putform.sel = true
        this.putform.red = true
        this.putform.adds = false
        this.dialogForm = true
      })
    },
    openPutDialog(r) {
      this.clearDialog()
      getCityObj({ id: r.id }).then(response => {
        this.putform = response.data.data
        this.putform.sel = true
        this.putform.red = false
        this.putform.adds = false
        this.dialogForm = true
      })
    },
    clearDialog() {
      this.putform = {}
      this.enclosureList = []
      this.dialogForm = false
    },
    closeDialog() {
      this.putform = {}
      this.enclosureList = []
      this.dialogForm = false
      this.getData()
    },
    goPutObj() {
      putCityObj(this.putform).then(response => {
        if (response.data.data) {
          this.$message({
            title: '成功',
            message: '成功',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$message({
            title: '失败',
            message: '失败',
            type: 'error',
            duration: 2000
          })
        }
        this.closeDialog()
      })
    },
    postCity() {
      postCityObj(this.putform).then(response => {
        if (response.data.data) {
          this.$message({
            title: '成功',
            message: '成功',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$message({
            title: '失败',
            message: '失败',
            type: 'error',
            duration: 2000
          })
        }
        this.closeDialog()
      })
    },
    beforeUpload() {
      this.quillUpdateImg = true
    },
    cropUploadSuccess(res, file) {
      const quill = this.$refs.myQuillEditor.quill
      const length = quill.getSelection().index
      quill.insertEmbed(length, 'image', res.name)
      quill.setSelection(length + 1)
      this.quillUpdateImg = false
    },
    uploadError() {
      this.quillUpdateImg = false
      this.$message.error('图片插入失败!')
    },
    collapse() {
      this.activeName = !this.activeName
    },
    handleSizeChange(val) {
      this.query.limit = val
      this.getData()
    },
    uploadSuccess(jsonData, field) {
      this.putform.photo = jsonData.name
    },
    delCity(i) {
      this.$confirm('此操作将执行, 请确认!', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delCityObj({ id: i.id }).then(response => {
          if (response.data.data) {
            this.$message({
              title: '成功',
              message: '成功',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$message({
              title: '失败',
              message: '失败',
              type: 'error',
              duration: 2000
            })
          }
          this.closeDialog()
        })
      })
    },
    handleCurrentChange(val) {
      this.query.page = val
      this.getData()
    }
  }
}
</script>
