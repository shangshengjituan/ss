// import request from '@/utils/request'
//
// export function test (data) {
//   return request({
//     url: '/test',
//     method: 'post',
//     data: data
//   })
// }

/**
 * api接口的统一出口
 */
import operation from '@/api/operation'
import user from '@/api/user'

export default {
  operation,
  user
}
