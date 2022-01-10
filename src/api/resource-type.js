import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/resource/type',
    method: 'get',
    params: params
  })
}

export function fetchById(id) {
  return request({
    url: `/resource/type/${id}`,
    method: 'get'
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

export function fetchPresetProperty() {
  return request({
    url: '/resource/type/property',
    method: 'get'
  })
}

export function createProperty(id, data) {
  return request({
    url: `/resource/type/property/${id}`,
    method: 'post',
    data
  })
}

export function updateProperty(data) {
  return request({
    url: '/resource/type/property',
    method: 'put',
    data
  })
}

export function deleteProperty(data) {
  return request({
    url: '/resource/type/property',
    method: 'delete',
    data
  })
}
