import request from '@/utils/request'

export function fetchResourceList(params) {
  return request({
    url: '/resource',
    method: 'get',
    params: params
  })
}

export function fetchById(id) {
  return request({
    url: `/resource/${id}`,
    method: 'get'
  })
}

export function createResource(data) {
  return request({
    url: '/resource',
    method: 'post',
    data
  })
}

export function updateResource(data) {
  return request({
    url: '/resource',
    method: 'put',
    data
  })
}

export function deleteResource(data) {
  return request({
    url: '/resource',
    method: 'delete',
    data
  })
}

export function updateProperty(data) {
  return request({
    url: '/resource/property',
    method: 'put',
    data
  })
}
