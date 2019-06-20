import request from '@/router/axios'

export function getCityList(query) {
  return request({
    url: '/admin/c',
    method: 'get',
    params: query
  })
}

export function getCityObj(query) {
  return request({
    url: '/admin/c/id',
    method: 'get',
    params: query
  })
}

export function delCityObj(query) {
  return request({
    url: '/admin/c/',
    method: 'delete',
    data: query
  })
}

export function postCityObj(query) {
  return request({
    url: '/admin/c',
    method: 'post',
    data: query
  })
}

export function putCityObj(query) {
  return request({
    url: '/admin/c',
    method: 'put',
    data: query
  })
}

export function getCitys() {
  return request({
    url: '/admin/c/list',
    method: 'get'
  })
}
