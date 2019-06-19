<p align="center">
 <img src="https://img.shields.io/circleci/project/vuejs/vue/dev.svg" alt="Build Status">
  <img src="https://img.shields.io/badge/Spring%20Cloud-EdgwareSR3-blue.svg" alt="Coverage Status">
  <img src="https://img.shields.io/badge/Spring%20Boot-1.5.12-blue.svg" alt="Downloads">
  <img src="https://img.shields.io/badge/npm-v5.5.1-blue.svg" alt="Version">
  <img src="https://img.shields.io/npm/l/vue.svg" alt="License">
</p>

<h2 align="center">Supporting Pig Developer Team</h2> 

   
### 在线体验
地址： http://preview.pig4cloud.com

### 项目官网
文档、视频：https://pig4cloud.com

### 配套代码
<a href="https://gitee.com/log4j/pig-ui" target="_blank">pig-ui</a>、<a href="https://gitee.com/cqzqxq_lxh/pig-config" target="_blank">pig-config</a>  

### 前端解决方案
https://gitee.com/smallweigit/avue

### 分支介绍
分支 | 介绍
---|---
master | 稳定版本，推荐使用  
dev | 开发分支，bug修复分支
local | 配置中心本地化，开发使用不建议生产
redis | 提供cachecloud的整合方案
 
 ### now
``` lua
pig
├── pig-ui -- element-vue-admin实现[9528]
├── pig-auth -- 授权服务提供[3000]
├── pig-common -- 系统公共模块 
├── pig-config -- 配置中心[4001]
├── pig-eureka -- 服务注册与发现[1025]
├── pig-gateway -- ZUUL网关[9999]
├── pig-modules -- 微服务模块
├    ├── pig-daemon-service -- 分布式调度中心[4060]
├    ├── pig-mc-service -- 消息中心[4050]
├    ├── pig-sso-client-demo -- 单点登录客户端示例[4040]
├    └── pig-upms-service -- 权限管理提供[4000]
└── pig-visual  -- 图形化模块 
     ├── pig-monitor -- 服务状态监控、turbine [5001]
     ├── pig-zipkin-elk -- zipkin、ELK监控[5002、5601]
     └── pig-cache-cloud -- 缓存管理、统一监控[5005]
```
###  已完成功能
- 完善登录：账号密码模式、短信验证码模式、社交账号模式均整合Spring security oAuth
- 单点登录：基于Srping security oAuth 提供单点登录接口，方便其他系统对接
- 用户管理：用户是系统操作者，该功能主要完成系统用户配置。
- 机构管理：配置系统组织机构（公司、部门、小组），树结构展现，可随意调整上下级。
- 菜单管理：配置系统菜单，操作权限，按钮权限标识等。
- 角色管理：角色菜单权限分配、设置角色按机构进行数据范围权限划分。
- 字典管理：对系统中经常使用的一些较为固定的数据进行维护，如：是否、男女、类别、级别等。
- 操作日志：系统正常操作日志记录和查询；系统异常信息日志记录和查询。
- 服务限流：多种维度的流量控制（服务、IP、用户等）
- 消息总线：配置动态实时刷新
- 分库分表：shardingdbc分库分表策略
- 数据权限: 使用mybatis对原查询做增强，业务代码不用控制，即可实现。
- 文件系统: 支持FastDFS、七牛云，扩展API几行代码实现上传下载
- 消息中心：短信、邮件模板发送，几行代码实现发送
- 聚合文档：基于zuul实现 swagger各个模块的实现
- 代码生成：前后端代码的生成，支持Vue
- 缓存管理：基于Cache Cloud 保证Redis 的高可用
- 服务监控: Spring Boot Admin
- 分布式任务调度： 基于elastic-job的分布式文件系统，zookeeper做调度中心
- zipkin链路追踪： 数据保存ELK，图形化展示
- pinpoint链路追踪： 数据保存hbase，图形化展示

欢迎加入交流群，互相学习  
一键加群：<a target="_blank" href="https://jq.qq.com/?_wv=1027&k=5zWEvg5"><img border="0" src="//pub.idqqimg.com/wpa/images/group.png"></a>   
![image](http://oss.wjg95.cn/pig_qq_qun.png)

### 截图 （点击可大图预览）
<table>
    <tr>
        <td><img src="http://p3blpcsde.bkt.clouddn.com/login.png"/></td>
        <td><img src="http://p3blpcsde.bkt.clouddn.com/1.png"/></td>
    </tr>
    <tr>
        <td><img src="http://p3blpcsde.bkt.clouddn.com/2.png"/></td>
        <td><img src="http://p3blpcsde.bkt.clouddn.com/3.png"/></td>
    </tr>
    <tr>
        <td><img src="http://p3blpcsde.bkt.clouddn.com/4.png"/></td>
        <td><img src="http://p3blpcsde.bkt.clouddn.com/5.png"/></td>
    </tr>
    <tr>
        <td><img src="http://p3blpcsde.bkt.clouddn.com/6.png"/></td>
        <td><img src="http://p3blpcsde.bkt.clouddn.com/7.png"/></td>
    </tr>
    <tr>
        <td><img src="http://p3blpcsde.bkt.clouddn.com/8.png"/></td>
        <td><img src="http://p3blpcsde.bkt.clouddn.com/9.png"/></td>
    </tr>
    <tr>
        <td><img src="http://p3blpcsde.bkt.clouddn.com/10.png"/></td>
        <td><img src="http://p3blpcsde.bkt.clouddn.com/11.png"/></td>
    </tr>
    <tr>
        <td><img src="http://p3blpcsde.bkt.clouddn.com/12.png"/></td>
        <td><img src="http://p3blpcsde.bkt.clouddn.com/13.png"/></td>
    </tr>
    <tr>
        <td><img src="http://p3blpcsde.bkt.clouddn.com/14.png"/></td>
        <td><img src="http://p3blpcsde.bkt.clouddn.com/15.png"/></td>
    </tr>
    <tr>
        <td><img src="http://p3blpcsde.bkt.clouddn.com/16.png"/></td>
        <td><img src="http://p3blpcsde.bkt.clouddn.com/17.png"/></td>
    </tr>
</table>

