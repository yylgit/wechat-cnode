import {json2Form, wxPromisify} from '../utils/util'

/**
 * 微信请求get方法
 * url
 * data 以对象的格式传入
 */
export function get(url, data) {
  var getRequest = wxPromisify(wx.request)
  return getRequest({
    url: url,
    method: 'GET',
    data: data,
    header: {
      'content-type': 'application/json'
    }
  })
}

/**
 * 微信请求post方法封装
 * url
 * data 以对象的格式传入
 */
export function post(url, data) {
  var postRequest = wxPromisify(wx.request)
  return postRequest({
    url: url,
    method: 'POST',
    data: json2Form(data),
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
  })
}
