//topics.js
import * as services from '../../services/services.js'
import * as util from'../../utils/util';
// 引入HtmlParser
const HtmlParser = require('../../html-view/index')
const app = getApp();
Page({
  data: {
    articalId: '5433d5e4e737cbe96dcef312',
    artical: {},
    html: null
  },
  onLoad: function (options) {
    let {articalId} = options;
    services.getArtical(articalId).then(res=>{
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

  },
  notCollectClick () {
    
  }
})
