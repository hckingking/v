import request from '@/router/axios'

export function getCityList(query) {
  return request({
    url: '/ad/c',
    method: 'get',
    params: query
  })
}

export function getCityObj(query) {
  return request({
    url: '/ad/c/id',
    method: 'get',
    params: query
  })
}

export function delCityObj(query) {
  return request({
    url: '/ad/c/',
    method: 'delete',
    data: query
  })
}

export function postCityObj(query) {
  return request({
    url: '/ad/c',
    method: 'post',
    data: query
  })
}

export function putCityObj(query) {
  return request({
    url: '/ad/c',
    method: 'put',
    data: query
  })
}

export function getCitys() {
  return request({
    url: '/ad/c/list',
    method: 'get'
  })
}

export function getPieTabs() {
  return request({
    url: '/ad/c/pie',
    method: 'get'
  })
}
