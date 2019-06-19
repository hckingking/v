/*
 *    Copyright (c) 2018-2025, god All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * Neither the name of the pig4cloud.com developer nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 * Author: god (1830278686@qq.com)
 */

import router from './router/router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  getToken
} from '@/util/auth'
import {
  setTitle
} from '@/util/util'
import {
  validatenull
} from '@/util/validate'

// NProgress Configuration
NProgress.configure({
  showSpinner: false
})

function hasPermission(roles, permissionRoles) {
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}
const whiteList = ['/login', '/404', '/401', '/lock']
const lockPage = '/lock'

router.beforeEach((to, from, next) => {
  // start progress bar
  NProgress.start()
  const value = to.query.src ? to.query.src : to.path
  const label = to.query.name ? to.query.name : to.name
  if (whiteList.indexOf(value) === -1) {
    store.commit('ADD_TAG', {
      label: label,
      value: value,
      query: to.query
    })
  }
  if (store.getters.access_token) { // determine if there has token
    /* has token*/
    if (store.getters.isLock && to.path !== lockPage) {
      next({
        path: lockPage
      })
      NProgress.done()
    } else if (to.path === '/login') {
      next({
        path: '/'
      })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetUserInfo').then(res => {
          const roles = res.roles
          next({ ...to,
            replace: true
          })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            next({
              path: '/login'
            })
            NProgress.done()
          })
        })
      } else {
        next()
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

// 寻找子菜单的父类
function findMenuParent(tag) {
  const tagCurrent = []
  const menu = store.getters.menu
  tagCurrent.push(tag)
  return tagCurrent
}

router.afterEach((to, from) => {
  NProgress.done()
  setTimeout(() => {
    const tag = store.getters.tag
    setTitle(tag.label)
    store.commit('SET_TAG_CURRENT', findMenuParent(tag))
  }, 0)
})
