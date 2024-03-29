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

import {
  setStore,
  getStore,
  removeStore
} from '@/util/store'
import {
  validatenull
} from '@/util/validate'
import {
  getDic
} from '@/api/admin'
import {
  baseUrl
} from '@/config/env'
import website from '@/const/website'
const common = {

  state: {
    isCollapse: false,
    isFullScren: false,
    isLock: getStore({
      name: 'isLock'
    }) || false,
    theme: getStore({
      name: 'theme'
    }) || '#409EFF',
    lockPasswd: getStore({
      name: 'lockPasswd'
    }) || '',
    website: website
  },
  actions: {
    // 获取字典公用类
    GetDic({
      commit,
      state,
      dispatch
    }, dic) {
      return new Promise((resolve, reject) => {
        if (dic instanceof Array) {
          Promise.all(dic.map(ele => getDic(ele))).then(data => {
            const result = {}
            dic.forEach((ele, index) => {
              result[ele] = data[index].data
            })
            resolve(result)
          })
        }
      })
    }
  },
  mutations: {
    SET_COLLAPSE: (state, action) => {
      state.isCollapse = !state.isCollapse
    },
    SET_FULLSCREN: (state, action) => {
      state.isFullScren = !state.isFullScren
    },
    SET_LOCK: (state, action) => {
      state.isLock = true
      setStore({
        name: 'isLock',
        content: state.isLock,
        type: 'session'
      })
    },
    SET_THEME: (state, color) => {
      state.theme = color
      setStore({
        name: 'theme',
        content: state.theme
      })
    },
    SET_LOCK_PASSWD: (state, lockPasswd) => {
      state.lockPasswd = lockPasswd
      setStore({
        name: 'lockPasswd',
        content: state.lockPasswd,
        type: 'session'
      })
    },
    CLEAR_LOCK: (state, action) => {
      state.isLock = false
      state.lockPasswd = ''
      removeStore({
        name: 'lockPasswd'
      })
      removeStore({
        name: 'isLock'
      })
    }
  }
}
export default common
