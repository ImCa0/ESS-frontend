import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/resource/type',
    method: 'get',
    params: params
  })
}

export function createResourceType(data) {
  return request({
    url: '/resource/type',
    method: 'post',
    data
  })
}

export function updateResourceType(data) {
  return request({
    url: '/resource/type',
    method: 'put',
    data
  })
}

export function deleteResourceType(data) {
  return request({
    url: '/resource/type',
    method: 'delete',
    data
  })
}
