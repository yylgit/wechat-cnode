// 引入HtmlParser
const HtmlParser = require('../../html-view/index')
import * as services from '../../services/services'
import * as util from '../../utils/util';
import {wxNavigateTo} from '../../utils/wxApi';
var app = getApp();
Page({
    data: {
        replies: [],
        artical: {},
        articalId: ''
    },
    onShow() {
        if(app.globalData.isSubmitReply) {
            app.globalData.isSubmitReply = false;
            this.fetchData();
            wx.showToast({
                title: '评论成功',
                icon: 'success',
                duration: 2000
            })
        }
    },
    onLoad (options) {
        let {articalId} = options;
        this.data.articalId = articalId;
        this.fetchData();
    },
    fetchData() {
        let token = app.globalData.cnode_token;
        services.getArtical(this.data.articalId, token).then(res=>{
        // 解析HTML字符串
            res.data.data.replies.reverse();
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
    },
    upreplyClick (e) {
        let index = e.currentTarget.dataset.index;
        if(app.getAccessToken()) {
            services.upreply(app.getAccessToken(),e.currentTarget.dataset.replyId).then(res=>{
                console.log(res)
                 if(res.data.success) {
                    console.log(index)
                    this.data.replies[index].is_uped = res.data.action == 'up';
                    
                    if(res.data.action == 'up') {
                        //this.data.replies[index].ups.length++会出问题
                        this.data.replies[index].ups.push('1')
                    } else {
                        this.data.replies[index].ups.length--;
                    }
                    console.log(this.data.replies)
                    this.setData({
                        replies: this.data.replies
                    })
                   
                 } else {
                    wx.showToast({
                        title: res.data.error_msg || "操作失败",
                        image:"../../assets/white_error.gif"
                    })
                 }
            })
        }
    },
    inputFocus () {
        if(!app.getAccessToken()){
            return
        }
        wxNavigateTo('../newReply/newReply',{
            articalId:this.data.artical.id
        })
    },
    replyComment (e) {
        if(!app.getAccessToken()){
            return
        }
        let {replyId,authorName} = e.currentTarget.dataset;
        wxNavigateTo('../newReply/newReply',{
            articalId:this.data.artical.id,
            replyId,
            authorName
        })
    }
})