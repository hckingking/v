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
  <div class="sidebar-container" :class="{'is-active':isCollapse}">
    <top class="top"></top>
    <el-menu
      unique-opened
      :default-active="nowTagValue"
      class="el-menu-vertical-demo"
      mode="vertical"
      :show-timeout="200"
      active-text-color="#409eff"
      :collapse="isCollapse"
    >
      <sidebar-item :menu="menu" :isCollapse="isCollapse"></sidebar-item>
    </el-menu>
  </div>
</template>

<script>
import { setUrlPath } from '@/util/util'
import { mapGetters } from 'vuex'
import top from './top'
import SidebarItem from './sidebarItem'
import { validatenull } from '@/util/validate'
import { initMenu } from '@/util/util'
export default {
  name: 'sidebar',
  components: { SidebarItem, top },
  data() {
    return {}
  },
  created() {
    if (validatenull(this.menu)) {
      this.$store.dispatch('GetMenu').then(data => {
        initMenu(this.$router, data)
      })
    }
  },
  computed: {
    ...mapGetters(['menu', 'tag', 'isCollapse']),
    nowTagValue: function() {
      return setUrlPath(this.$route)
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
</style>

