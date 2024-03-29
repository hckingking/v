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

import { setStore, getStore } from '@/util/store'
const errLog = {
  state: {
    errLog: getStore({ name: 'errLog' }) || []
  },
  mutations: {
    ADD_LOG: (state, log) => {
      state.errLog.push(log)
      setStore({ name: 'errLog', content: state.errLog })
    },
    CLEAR_ALL_LOG: (state, action) => {
      state.errLog = []
      setStore({ name: 'errLog', content: state.errLog })
    }
  }

}

export default errLog
