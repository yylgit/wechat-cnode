import {wxGetStorage,wxNavigateTo} from './utils/wxApi'

//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    wxGetStorage('cnode_userInfo').then(res=>{
      if(res.data || res.data.success) {
        this.globalData.cnode_userInfo = res.data;
      }
       console.log('cnode_userInfo')
       console.log(res)
    })
    wxGetStorage('cnode_token').then(res=>{
      this.globalData.cnode_token = res.data;
      console.log('cnode_token')
      console.log(res.data)
    })
  },
  getAccessToken() {
    if(this.globalData.cnode_token) {
      return this.globalData.cnode_token
    } else {
      wx.showModal({
          title: '请先登录',
          showCancel: false,
          success: function () {
              wxNavigateTo('../login/login')
          }
      })
      return '';
    }
  },
  globalData:{
    userInfo:null,
    cnode_token: null,
    cnode_userInfo: null,
    isSubmitTopic: false //是否发表文章
  }
})