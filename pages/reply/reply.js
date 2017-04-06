// 引入HtmlParser
const HtmlParser = require('../../html-view/index')

Page({
    data: {
        replies: [],
        artical: {}
    },
    onLoad () {
        let {articalId} = options;
        services.getArtical(articalId).then(res=>{
        // 解析HTML字符串
            res.data.data.replies.forEach(item=>{
                item.html = new HtmlParser(item.content).nodes
            })
            this.setData({
                replies: res.data.data.replies,

            }) 
        })
    }
})