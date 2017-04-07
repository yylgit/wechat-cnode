// 引入HtmlParser
const HtmlParser = require('../../html-view/index')
import * as services from '../../services/services'
import * as util from '../../utils/util';
Page({
    data: {
        replies: [],
        artical: {}
    },
    onLoad (options) {
        // let {articalId} = options;
        let articalId = '58e607b0ddee72813eb22323';
        console.log(articalId)
        services.getArtical(articalId).then(res=>{
        // 解析HTML字符串

            res.data.data.replies.forEach(item=>{
                item.html = new HtmlParser(item.content).nodes
                item.create_at = util.formatTime(new Date(item.create_at))
            })
            console.log(res.data.data)
            this.setData({
                replies: res.data.data.replies,
                artical: res.data.data
            }) 
        })
    }
})