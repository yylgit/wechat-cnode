//topics.js
import * as services from '../../services/services.js'
import * as util from'../../utils/util';
import {wxNavigateTo} from '../../utils/wxApi'
// 引入HtmlParser
const HtmlParser = require('../../html-view/index')
var app = getApp();
Page({
  data: {
    articalId: '',
    artical: {},
    html: null,
    bgColor: ''
  },

  onLoad: function (options) {
    let color = util.genColor()
    this.setData({
        bgColor: color
    })
    let {articalId} = options;
    console.log(articalId)
    let token = app.globalData.cnode_token;
    services.getArtical(articalId, token).then(res=>{
      console.log(res.data.data)
      // 解析HTML字符串
      const html = new HtmlParser(res.data.data.content).nodes
      this.setData({
        artical: res.data.data,
        html
      }) 
      console.log(this.data.artical)
      
    })
  },
  collectClick () {
    if(app.getAccessToken()) {
      services.notCollectTopic(app.getAccessToken(), this.data.artical.id)
      .then(res=>{
        if(res.data.success) {
          wx.showToast({
            title: '取消收藏成功！'
          })
          this.setData({
            artical: Object.assign(this.data.artical,{is_collect: false})
          })
        } else {
          throw new Error(res.data.error_msg || '取消收藏失败！')
        }
       
      }).catch((err)=>{
        wx.showToast({
          title: err.toString(),
          image:"../../assets/white_error.gif"
        })
      })
    }
  },
  notCollectClick () {
    if(app.getAccessToken()) {
      services.collectTopic(app.getAccessToken(), this.data.artical.id)
      .then(res=>{
         if(res.data.success) {
            wx.showToast({
              title: '收藏成功！'
            })
            this.setData({
              artical: Object.assign(this.data.artical,{is_collect: true})
            })
         } else {
           throw new Error(res.data.error_msg || '收藏失败')
         }
        
      }).catch((err)=>{
        wx.showToast({
          title: err.toString(),
          image:"../../assets/white_error.gif"
        })
      })
    }
  },
  gotoReplyClick () {
    console.log('gotoReplyClick')
    wxNavigateTo('../reply/reply',{
      articalId: this.data.artical.id
    })
  }
})
