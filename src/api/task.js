import request from '@/utils/request'

export function fetchToBeAcceptedList(params) {
  return request({
    url: '/task/to-be-accepted',
    method: 'get',
    params: params
  })
}

export function acceptTask(data) {
  return request({
    url: '/task/accept',
    method: 'post',
    data
  })
}

export function declineTask(data) {
  return request({
    url: '/task/decline',
    method: 'post',
    data
  })
}
