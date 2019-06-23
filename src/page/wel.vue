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
  <div class="pull-chheight wel-contailer">
    <div class="banner-text">
      <div>
        God
        <el-collapse v-model="activeNames">
          <el-collapse-item title="项目官网" name="1">
            <div>完善登录：账号密码模式、短信验证码模式、社交账号模式均整合Spring security oAuth</div>
            <div>单点登录：基于Srping security oAuth 提供单点登录接口，方便其他系统对接</div>
            <div>用户管理：用户是系统操作者，该功能主要完成系统用户配置。</div>
            <div>机构管理：配置系统组织机构，树结构展现，可随意调整上下级。</div>
            <div>菜单管理：配置系统菜单，操作权限，按钮权限标识等。</div>
            <div>角色管理：角色菜单权限分配、设置角色按机构进行数据范围权限划分。</div>
            <div>动态路由：基于zuul实现动态路由，后端可配置化。</div>
            <div>灰度发布：自定义ribbon路由规则匹配多版本请求。</div>
            <div>终端管理：动态配置oauth终端，后端可配置化。</div>
            <div>字典管理：对系统中经常使用的一些较为固定的数据进行维护，如：是否等。</div>
            <div>操作日志：系统正常操作日志记录和查询；系统异常信息日志记录和查询。</div>
            <div>服务限流：多种维度的流量控制（服务、IP、用户等）</div>
            <div>消息总线：配置动态实时刷新</div>
            <div>分库分表：shardingdbc分库分表策略</div>
            <div>数据权限: 使用mybatis对原查询做增强，业务代码不用控制，即可实现。</div>
            <div>文件系统: 支持FastDFS、七牛云，扩展API几行代码实现上传下载</div>
            <div>消息中心：短信、邮件模板发送，几行代码实现发送</div>
            <div>聚合文档：基于zuul实现 swagger各个模块的实现</div>
            <div>代码生成：前后端代码的生成，支持Vue</div>
            <div>缓存管理：基于Cache Cloud 保证Redis 的高可用</div>
            <div>服务监控: Spring Boot Admin</div>
            <div>分布式任务调度： 基于elastic-job的分布式任务，zookeeper做调度中心</div>
            <div>zipkin链路追踪： 数据保存ELK，图形化展示</div>
            <div>pinpoint链路追踪： 数据保存hbase，图形化展示</div>

            <div>
              <i class="god god-king"></i>

              <i class="god god-QQ"></i>

              <i class="god god-icon-test"></i>
              <i class="god god-changyonglogo40"></i>
              <i class="god god-taobao"></i>
              <i class="god god-xinlang"></i>

              <i class="god god-baidu"></i>

              <i class="god god-jingdong"></i>

              <i class="god god-iconziti48"></i>
              <i class="god god-WEBANK"></i>
              <i class="god god-weixin"></i>
              <i class="god god-zhifubao"></i>
              <i class="god god-douyin"></i>
              <i class="god god-dingding"></i>
              <i class="god god-huawei"></i>

              <i class="god god-yonghu"></i>
              <i class="god god-china"></i>

              <i class="god god-ziyuan"></i>

              <i class="god god-icon-test1"></i>
              <i class="god god-icon-46"></i>
              <i class="god god-iconfontxingxing"></i>
            </div>
          </el-collapse-item>
          <el-collapse-item title="开发文档" name="2">
            <div>快速了解Spring Cloud 企业开发,前后端完全分离，前端使用avue即使没有前端开发经验也能快速上手</div>
            <div>基于Spring Boot 2.1.5.RELEASE丶Greenwich.SR1</div>
            <div>基于Spring Cloud Gateway 定制webflux网关</div>
            <div>深度定义LCN 解决分布式事务问题</div>
            <div>基于 Spring Security OAuth 深度权限定制,权限控制到菜单、token</div>
            <div>完全打通常见社交登录，面对OAuth 前后端分离架构不在难办</div>
            <div>封装部分Spring Cloud 原生组件，开发更加方便</div>
            <div>去除了部分对于开发不友好的中间件,快速上手</div>
            <div>完全开放源代码，持续更新</div>
          </el-collapse-item>
          <el-collapse-item title="配套视频" name="3">
            <div>微服务开发平台pig 的开发文档</div>
            <div>实现细节、监控落地、生产部署文档</div>
            <div>源码部署细节</div>
            <div>OAuth2 源码讲解</div>
            <div>监控pinpoint 使用</div>
          </el-collapse-item>
          <el-collapse-item title="最新版本" name="4">
            <div>Spring Cloud 最完整运用</div>
            <div>深度定制兼容 1.0 、 2.0</div>
            <div>覆盖常见的业务使用场景</div>
            <div>基于Spring Cloud Gateway</div>
            <div>基于Spring Cloud Finchley.SR1</div>
            <div>基于Spring Boot 2.0.4.RELEASE</div>
            <div>基于开源LCN 分布式事务解决方案深度定制</div>
            <div>
              Vue,一款神奇的配置化前端框架
              让数据驱动视图，减去繁琐的操作，更贴近企业级的前端开发组件
            </div>
            <span>ElementUI,网站快速成型工具,一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库</span>
            <div>
              <span :class="['actor',{typeing:isText}]">{{text}}</span>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'wel',
  data() {
    return {
      activeNames: ['1', '2', '3', '4'],
      DATA: [],
      text: '',
      actor: '',
      count: 0,
      isText: false
    }
  },
  computed: {
    ...mapGetters(['website'])
  },
  created() {
    this.DATA = this.website.wel.list
    this.actor = this.DATA[this.count] || ''
    setTimeout(() => {
      this.isText = true
      this.setData()
    }, 2000)
  },
  methods: {
    getData() {
      if (this.count < this.DATA.length - 1) {
        this.count++
      } else {
        this.count = 0
      }
      this.isText = true
      this.actor = this.DATA[this.count]
    },
    setData() {
      let num = 0
      let count = 0
      let active = false
      const timeoutstart = 5000
      const timeoutend = 1000
      const timespeed = 10
      setInterval(() => {
        if (this.isText) {
          if (count === this.actor.length) {
            active = true
          } else {
            active = false
          }
          if (active) {
            num--
            this.text = this.actor.substr(0, num)
            if (num === 0) {
              this.isText = false
              setTimeout(() => {
                count = 0
                this.getData()
              }, timeoutend)
            }
          } else {
            num++
            this.text = this.actor.substr(0, num)
            if (num === this.actor.length) {
              this.isText = false
              setTimeout(() => {
                this.isText = true
                count = this.actor.length
              }, timeoutstart)
            }
          }
        }
      }, timespeed)
    }
  }
}
</script>

<style scoped="scoped" lang="scss">
.wel-contailer {
  position: relative;
}
.banner-text {
  position: relative;
  padding: 0 20px;
  font-size: 20px;
  text-align: center;
  color: #333;
}
.banner-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  display: none;
}
.actor {
  height: 250px;
  overflow: hidden;
  font-size: 18px;
  color: #333;
}

.actor:after {
  content: '';
  width: 3px;
  height: 25px;
  vertical-align: -5px;
  margin-left: 5px;
  background-color: #333;
  display: inline-block;
  animation: blink 0.4s infinite alternate;
}

.typeing:after {
  animation: none;
}

@keyframes blink {
  to {
    opacity: 0;
  }
}
</style>
