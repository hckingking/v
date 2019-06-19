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
  <div>
    <div class="top" align="center">
      <el-dropdown>
        <img class="top-userImg" :src="userInfo.avatar">

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            {{userInfo.username}}
          </el-dropdown-item>

          <el-dropdown-item @click.native="myselfIndex()" divided>云端首页</el-dropdown-item>

          <el-dropdown-item @click.native="myself()" divided>个人资料</el-dropdown-item>

          <el-dropdown-item @click.native="showCollapse()" divided>菜单风格</el-dropdown-item>

          <el-dropdown-item @click.native="themeTo()" divided>界面主色</el-dropdown-item>

          <el-dropdown-item @click.native="handleLock()" divided>系统锁屏</el-dropdown-item>
          <el-dropdown-item @click.native="handleScreen()" divided>
            <template v-if="!isFullScren">系统全屏</template>
            <template v-else>退出全屏</template>
          </el-dropdown-item>

          <el-dropdown-item @click.native="logout" divided>退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-dialog title="主题" :visible.sync="theme" width="30%">
        <top-theme></top-theme>
      </el-dialog>

      <el-dialog title="设置锁屏密码" :visible.sync="box" width="30%">
        <el-form :model="form" ref="form" label-width="80px">
          <el-form-item
            label="锁屏密码"
            prop="passwd"
            :rules="[{ required: true, message: '锁屏密码不能为空'}]"
          >
            <el-input v-model="form.passwd" placeholder="请输入锁屏密码"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button
            size="mini"
            type="primary"
            icon="icon-bofangqi-suoping"
            @click="handleSetLock"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { validatenull } from '@/util/validate'
import { mapState, mapGetters } from 'vuex'
import { listenfullscreen } from '@/util/util'
import topTheme from './top-theme'
export default {
  components: { topTheme },
  name: 'top',
  data() {
    return {
      box: false,
      form: {
        passwd: ''
      },
      theme: false
    }
  },
  filters: {},
  created() {},
  mounted() {
    listenfullscreen(this.setScreen)
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    }),
    ...mapGetters(['isFullScren', 'isCollapse', 'lockPasswd'])
  },
  methods: {
    showCollapse() {
      this.$store.commit('SET_COLLAPSE')
    },
    handleScreen() {
      if (!this.isFullScren) {
        this.reqFullScreen()
      } else {
        this.exitFullScreen()
      }
    },
    reqFullScreen() {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen()
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen()
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen()
      }
    },
    exitFullScreen() {
      if (document.documentElement.requestFullScreen) {
        document.exitFullScreen()
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.webkitCancelFullScreen()
      } else if (document.documentElement.mozRequestFullScreen) {
        document.mozCancelFullScreen()
      }
    },

    setScreen() {
      this.$store.commit('SET_FULLSCREN')
    },
    myself() {
      this.$router.push({
        name: '修改信息'
      })
    },
    myselfIndex() {
      this.$router.push({
        name: '首页'
      })
    },
    themeTo() {
      this.theme = true
    },
    handleSetLock() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$store.commit('SET_LOCK_PASSWD', this.form.passwd)
          this.handleLock()
        }
      })
    },
    handleLock() {
      if (validatenull(this.lockPasswd)) {
        this.box = true
        return
      }
      this.$store.commit('SET_LOCK')
      setTimeout(() => {
        this.$router.push({ path: '/lock' })
      }, 100)
    },
    logout() {
      this.$confirm('是否退出系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          this.$router.push({ path: '/login' })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

