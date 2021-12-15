import request from '@/utils/request'

export function overview() {
  return request({
    url: '/dashboard/overview',
    method: 'get'
  })
}

export function profitAndTask() {
  return request({
    url: '/dashboard/profit-task',
    method: 'get'
  })
}

export function usage() {
  return request({
    url: '/dashboard/usage',
    method: 'get'
  })
}

export function fault() {
  return request({
    url: '/dashboard/fault',
    method: 'get'
  })
}

export function loadAndQuality() {
  return request({
    url: '/dashboard/load-quality',
    method: 'get'
  })
}

export function deliveryAndReputation() {
  return request({
    url: '/dashboard/delivery-reputation',
    method: 'get'
  })
}

export function taskTable() {
  return request({
    url: '/dashboard/task',
    method: 'get'
  })
}
