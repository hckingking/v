<!--
  -    Copyright (c) 2018-2025, god All rights reserved.
  -
  - Redistribution and use in source and binary forms, with or without
  - modification, are permitted provided that the following conditions are met:
  -
  - Redistributions of source code must retain the above copyright notice,
  - this list of conditions and the following disclaimer.
  - Redistributions in binary form must reproduce the above copyright
  - notice, this list of conditions and the following disclaimer in the
  - documentation and/or other materials provided with the distribution.
  - Neither the name of the pig4cloud.com developer nor the names of its
  - contributors may be used to endorse or promote products derived from
  - this software without specific prior written permission.
  - Author: god (1830278686@qq.com)
  -->

<template>
  <div class="app-container pull-auto">
    <el-button type="primary" size="mini" plain @click="handleAdd"  v-if="permissions.sys_route_add">新 增</el-button>
    <el-button type="success" @click="handleApply" size="mini" plain v-if="permissions.sys_route_add">同 步</el-button>
    <br /><br />
    <avue-crud ref="crud" :page="page" :data="tableData" :table-loading="tableLoading" :option="tableOption" @current-change="currentChange" @size-change="sizeChange" @row-update="handleUpdate" @row-save="handleSave" @row-del="rowDel">
      <template slot-scope="scope" slot="menu">
        <el-button type="primary" v-if="permissions.sys_route_upd" icon="el-icon-check" size="mini" plain @click="handleEdit(scope.row,scope.index)">编辑</el-button>
        <el-button type="danger" v-if="permissions.sys_route_del" icon="el-icon-delete" size="mini" plain @click="handleDel(scope.row,scope.index)">删除</el-button>
      </template>
    </avue-crud>
  </div>
</template>

<script>
import {
  fetchList,
  getObj,
  addObj,
  putObj,
  delObj,
  applyObj
} from '@/api/route'
import { tableOption } from '@/const/crud/route'
import { mapGetters } from 'vuex'

export default {
  name: 'route',
  data() {
    return {
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20 // 每页显示多少条
      },
      tableLoading: false,
      tableOption: tableOption
    }
  },
  created() {
    this.getList()
  },
  mounted: function() {},
  computed: {
    ...mapGetters(['permissions'])
  },
  methods: {
    getList() {
      this.tableLoading = true
      fetchList({
        page: this.page.currentPage,
        limit: this.page.pageSize
      }).then(response => {
        this.tableData = response.data.records
        this.page.total = response.data.total
        this.tableLoading = false
      })
    },
    currentChange(val) {
      this.page.currentPage = val
      this.getList()
    },
    sizeChange(val) {
      this.page.pageSize = val
      this.getList()
    },
    /**
     * @title 打开新增窗口
     * @detail 调用crud的handleadd方法即可
     *
     **/
    handleAdd: function() {
      this.$refs.crud.rowAdd()
    },
    handleApply: function() {
      var _this = this
      this.$confirm('是否确认同步至网关路由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function() {
          return applyObj()
        })
        .then(data => {
          _this.$message({
            showClose: true,
            message: '同步成功',
            type: 'success'
          })
        })
        .catch(function(err) {})
    },
    handleEdit(row, index) {
      this.$refs.crud.rowEdit(row, index)
    },
    handleDel(row, index) {
      this.$refs.crud.rowDel(row, index)
    },
    rowDel: function(row, index) {
      var _this = this
      this.$confirm('是否确认删除ID为' + row.id, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function() {
          return delObj(row.id)
        })
        .then(data => {
          _this.tableData.splice(index, 1)
          _this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
          this.getList()
        })
        .catch(function(err) {})
    },
    /**
     * @title 数据更新
     * @param row 为当前的数据
     * @param index 为当前更新数据的行数
     * @param done 为表单关闭函数
     *
     **/
    handleUpdate: function(row, index, done) {
      putObj(row).then(data => {
        this.tableData.splice(index, 1, Object.assign({}, row))
        this.$message({
          showClose: true,
          message: '修改成功',
          type: 'success'
        })
        done()
        this.getList()
      })
    },
    /**
     * @title 数据添加
     * @param row 为当前的数据
     * @param done 为表单关闭函数
     *
     **/
    handleSave: function(row, done) {
      addObj(row).then(data => {
        this.tableData.push(Object.assign({}, row))
        this.$message({
          showClose: true,
          message: '添加成功',
          type: 'success'
        })
        done()
        this.getList()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

