var Promise = require('../plugins/es6-promise.js')
var util = require('./util')
function wxPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        //成功
        resolve(res)
      }
      obj.fail = function (res) {
        //失败
        reject(res)
      }
      fn(obj)
    })
  }
}
//无论promise对象最后状态如何都会执行
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
/**
 * 微信用户登录,获取code
 */
function wxLogin() {
  return wxPromisify(wx.login)
}
/**
 * 获取微信用户信息
 * 注意:须在登录之后调用
 */
function wxGetUserInfo() {
  return wxPromisify(wx.getUserInfo)
}
/**
 * 获取系统信息
 */
function wxGetSystemInfo() {
  return wxPromisify(wx.getSystemInfo)
}


/**
 * 扫码
 */
function wxScanCode(obj) {
  return wxPromisify(wx.scanCode)(obj)
}

/**
 * 扫码
 */
function wxGetStorage(key) {
  return wxPromisify(wx.getStorage)({key})
}


/**
 * 保留当前页面，跳转到应用内的某个页面
 * url:'../index/index'
 * params:{key:value1}
 */
function wxNavigateTo(url, params) {
  var wxNavigateTo = wxPromisify(wx.navigateTo)
  const serializedParams = util.json2Form(params)
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
function wxRedirectTo(url, params) {
  var redirectTo = wxPromisify(wx.redirectTo)
  const serializedParams = util.json2Form(params)
  if (serializedParams.length > 0) {
    url += ((url.indexOf('?') == -1) ? '?' : '&') + serializedParams
  }
  return redirectTo({
    url: url
  })
}
module.exports = {
  wxNavigateTo,
  wxPromisify,
  wxLogin,
  wxGetUserInfo,
  wxGetSystemInfo,
  wxScanCode,
  wxGetStorage,
  wxRedirectTo
}
