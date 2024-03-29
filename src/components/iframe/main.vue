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
  <iframe v-if="$route.query.src" :src="$route.query.src" class="iframe" ref="iframe"></iframe>
  <iframe v-else :src="urlPath" class="iframe" ref="iframe"></iframe>
</template>

<script>
import { mapGetters } from 'vuex'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
export default {
  name: 'AvueIframe',
  data() {
    return {
      urlPath: this.getUrlPath() // iframe src 路径
    }
  },
  created() {
    NProgress.configure({ showSpinner: false })
  },
  mounted() {
    this.load()
  },
  props: ['routerPath'],
  watch: {
    $route: function() {
      this.load()
    },
    routerPath: function(val) {
      // 监听routerPath变化，改变src路径
      this.urlPath = this.getUrlPath()
    }
  },
  components: {
    ...mapGetters(['tagList']),
    tagListNum: function() {
      return this.tagList.length !== 0
    }
  },
  methods: {
    // 显示等待框
    show() {
      NProgress.start()
    },
    // 隐藏等待狂
    hide() {
      NProgress.done()
    },
    // 加载浏览器窗口变化自适应
    resize() {
      window.onresize = () => {
        this.iframeInit()
      }
    },
    // 加载组件
    load() {
      this.resize()
      this.show()
      this.$route.query.src = this.$route.query.src
        ? this.$route.query.src.replace('$', '#')
        : ''
      // 超时3s自动隐藏等待，加强用户体验
      let time = 3
      const timeFunc = setInterval(() => {
        time--
        if (time === 0) {
          this.hide()
          clearInterval(timeFunc)
        }
      }, 1000)
      this.iframeInit()
    },
    // iframe窗口初始化
    iframeInit() {
      const iframe = this.$refs.iframe
      if (!iframe) {
        return
      }
      const clientHeight = document.documentElement.clientHeight - 120
      iframe.style.height = `${clientHeight}px`
      if (iframe.attachEvent) {
        iframe.attachEvent('onload', () => {
          this.hide()
        })
      } else {
        iframe.onload = () => {
          this.hide()
        }
      }
    },
    getUrlPath: function() {
      // 获取 iframe src 路径
      let url = window.location.href
      url = url.replace('/myiframe', '')
      return url
    }
  }
}
</script>

<style lang="scss">
.iframe {
  width: 100%;
  height: 100%;
  border: 0;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
