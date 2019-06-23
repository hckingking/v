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
          <div align="center" style="color:red;">{{userInfo.username}}</div>

          <el-dropdown-item @click.native="myselfIndex()" divided>云界首页</el-dropdown-item>

          <el-dropdown-item @click.native="myself()" divided>个人资料</el-dropdown-item>

          <el-dropdown-item @click.native="showCollapse()" divided>菜单风格</el-dropdown-item>

          <el-dropdown-item @click.native="themeTo()" divided>界面主色</el-dropdown-item>
          <el-dropdown-item @click.native="dayflase()" divided>云界评分</el-dropdown-item>
          <el-dropdown-item @click.native="handleLock()" divided>系统锁屏</el-dropdown-item>
          <el-dropdown-item @click.native="handleScreen()" divided>
            <template v-if="!isFullScren">系统全屏</template>
            <template v-else>退出全屏</template>
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout" divided>退出云端</el-dropdown-item>
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
            <el-input v-model="form.passwd" placeholder="请输入锁屏密码" @keyup.enter.native="handleSetLock()"></el-input>
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

    <el-dialog title="评分" :visible.sync="day" width="40%">
      <el-form label-width="80px">
        <el-form-item label="评分">
          <el-rate v-model="value2" :colors="colors" style="margin-top: 10px;"></el-rate>
        </el-form-item>
        <el-form-item label="是否匿名">
          <el-switch
            v-model="value"
            active-color="#13ce66"
            inactive-color="#ff4949"
            style="margin-top: 10px;"
          ></el-switch>
        </el-form-item>
        <el-form-item label="日历">
          <demo></demo>
        </el-form-item> 
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" icon="el-icon-check" @click="dayflase()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import demo from './demo'
import { validatenull } from '@/util/validate'
import { mapState, mapGetters } from 'vuex'
import { listenfullscreen } from '@/util/util'
import topTheme from './top-theme'
export default {
  components: { topTheme, demo },
  name: 'top',
  data() {
    return {
      value: true,
      value2: null,
      colors: ['#99A9BF', 'rgba(12, 178, 219, 0.384)', '#F7BA2A'],
      box: false,
      day: false,
      form: {
        passwd: ''
      }
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
    dayflase() {
      this.value = null
      this.value2 = null
      this.day = !this.day
    },
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
        name: '云界首页'
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

