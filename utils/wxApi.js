
import {wxPromisify,json2Form } from './util'

/**
 * 微信用户登录,获取code
 */
export function wxLogin() {
  return wxPromisify(wx.login)
}
/**
 * 获取微信用户信息
 * 注意:须在登录之后调用
 */
export function wxGetUserInfo() {
  return wxPromisify(wx.getUserInfo)
}
/**
 * 获取系统信息
 */
export function wxGetSystemInfo() {
  return wxPromisify(wx.getSystemInfo)()
}


/**
 * 扫码
 */
export function wxScanCode(obj) {
  return wxPromisify(wx.scanCode)(obj)
}

/**
 * 扫码
 */
export function wxGetStorage(key) {
  return wxPromisify(wx.getStorage)({key})
}


/**
 * 保留当前页面，跳转到应用内的某个页面
 * url:'../index/index'
 * params:{key:value1}
 */
export function wxNavigateTo(url, params) {
  var wxNavigateTo = wxPromisify(wx.navigateTo)
  const serializedParams = json2Form(params)
  if (serializedParams.length > 0) {
    url += ((url.indexOf('?') == -1) ? '?' : '&') + serializedParams
  }
  return wxNavigateTo({
    url: url
  })
}

/**
 * 重定向页面
 * url:'../index/index'
 * params:{key:value1}
 */
export function wxRedirectTo(url, params) {
  var redirectTo = wxPromisify(wx.redirectTo)
  const serializedParams = json2Form(params)
  if (serializedParams.length > 0) {
    url += ((url.indexOf('?') == -1) ? '?' : '&') + serializedParams
  }
  return redirectTo({
    url: url
  })
}

