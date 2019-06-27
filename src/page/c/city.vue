<template>
  <div>
    <el-row>
      <el-badge :value="active" class="item" type="danger">
        <el-button
          size="mini"
          plain
          title="隐藏与显示"
          type="info"
          icon="el-icon-share"
          @click="collapse()"
          circle
        ></el-button>
      </el-badge>

      <el-button size="mini" title="验证" icon="god god-dingding" @click="isGodRole()" circle></el-button>

      <el-button
        size="mini"
        plain
        title="报表"
        type="text"
        icon="el-icon-loading"
        @click="themeTo()"
        circle
      ></el-button>
      <el-button
        size="mini"
        plain
        title="maps"
        icon="god god-iconfontxingxing"
        @click="mapsTo()"
        circle
      ></el-button>
      <el-button size="mini" plain title="china" icon="god god-china" @click="chinaTo()" circle></el-button>
      <el-button size="mini" plain title="world" icon="god god-shijie" @click="worldTo()" circle></el-button>
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
              <el-input
                clearable
                size="mini"
                v-model="query.name"
                placeholder="请输入"
                @keyup.enter.native="getData()"
              ></el-input>
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
                type="primary"
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
                type="warning"
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
            :page-sizes="[5,10,20,50,100, 200, 300, 400,500,1000]"
            :page-size="query.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            style="color:gray"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>

    <el-dialog :label-position="labelPosition" width="55%" title="城市" :visible.sync="dialogForm">
      <el-form ref="putform" :model="putform" label-width="100px" size="mini" :rules="cityRules">
        <el-form-item label="名称" prop="name">
          <el-input
            size="mini"
            :readonly="putform.red"
            :clearable="!putform.red"
            v-model="putform.name"
            placeholder="请输入"
          ></el-input>
        </el-form-item>

        <el-form-item label="日期" prop="day">
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
            action="/ad/R/load"
            name="file"
            :limit="1"
            :before-upload="beforeLoad"
            :on-success="uploadSuccess"
            :file-list="enclosureList"
          >
            <el-button size="mini" type="success" plain>选取</el-button>
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
              action="/ad/R/load"
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
        <el-button size="mini" type="success" plain @click="closeDialog()">取 消</el-button>
        <template v-if="!putform.red">
          <el-button v-if="!putform.adds" size="mini" type="primary" plain @click="goPutObj()">确 定</el-button>
          <el-button v-else size="mini" type="primary" plain @click="postCity()">确 定</el-button>
        </template>
      </div>
    </el-dialog>

    <el-dialog title="报表" :visible.sync="themes" width="70%">
      <div>
        <el-row>
          <el-col :span="10" :offset="0">
            <charts></charts>
          </el-col>
          <el-col :span="10" :offset="4">
            <tab></tab>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <el-dialog title="china" :visible.sync="chinaDiv" width="60%">
      <china></china>
    </el-dialog>

    <el-dialog title="world" :visible.sync="worldDiv" width="60%">
      <world></world>
    </el-dialog>

    <el-dialog title="maps" :visible.sync="mapsDiv" width="50%">
      <maps></maps>
    </el-dialog>
  </div>
</template>
<script>
import maps from './tabss/maps'
import tab from './tabss/tab'
import charts from './tabss/charts'
import china from './tabss/china'
import world from './tabss/world'
import {
  getCityList,
  putCityObj,
  getCitys,
  postCityObj,
  getCityObj,
  delCityObj,
  isGod
} from '@/api/ip/city'
import { quillEditor } from 'vue-quill-editor'
import { getToken } from '@/util/auth'
export default {
  name: 'tree',
  components: {
    quillEditor,
    charts,
    china,
    world,
    tab,
    maps
  },
  data() {
    return {
      mapsDiv: false,
      themes: false,
      worldDiv: false,
      chinaDiv: false,
      cityRules: {
        name: [
          {
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }
        ],
        day: [
          {
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ]
      },
      quillUpdateImg: false,
      enclosureList: [],
      active: 0,
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
        this.cityList = response.data.data.records
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
      this.$refs['putform'].validate(valid => {
        if (valid) {
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
        } else {
          return false
        }
      })
    },
    beforeUpload(file) {
      console.log(file)
      if (file.type !== '') {
        if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
          this.$message.error('上传图片只能是 png/jpeg 格式!')
          return false
        }
        const isLt2M = file.size / 1024 / 1024 < 10
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 10MB!')
          return false
        }
        this.quillUpdateImg = true
      }
      this.$message.error('上传图片只能是 png/jpeg 格式!')
      return false
    },
    beforeLoad(file) {
      console.log(file)
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 10MB!')
      }
      return isLt2M
    },
    cropUploadSuccess(res, file) {
      const quill = this.$refs.myQuillEditor.quill
      const length = quill.getSelection().index
      quill.insertEmbed(length, 'image', res.data.name)
      quill.setSelection(length + 1)
      this.quillUpdateImg = false
    },
    uploadError() {
      this.quillUpdateImg = false
      this.$message.error('图片插入失败!')
    },
    collapse() {
      this.activeName = !this.activeName
      this.active += 1
    },
    handleSizeChange(val) {
      this.query.limit = val
      this.getData()
    },
    uploadSuccess(jsonData, field) {
      this.putform.photo = jsonData.data.name
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
    themeTo() {
      this.themes = !this.themes
    },
    chinaTo() {
      this.chinaDiv = !this.chinaDiv
    },
    worldTo() {
      this.worldDiv = !this.worldDiv
    },
    mapsTo() {
      this.mapsDiv = !this.mapsDiv
    },
    isGodRole() {
      isGod({ id: 1 }).then(response => {
        this.$message({
          title: '验证',
          message: response.data.msg,
          type: 'success',
          duration: 2000
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
<style lang="scss">
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
