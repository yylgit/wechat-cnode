
import {wxGetSystemInfo,wxRedirectTo} from '../../utils/wxApi';
import {newTopic} from '../../services/services'
var app = getApp()

Page({
    data: {
        tab: [{
            key: 'share', value: '分享'
        },{
            key: 'ask', value: '问答'
        },{
            key: 'job', value: '招聘'
        }],
        index: -1,
        textareaHeight: '100rpx',
        title: '',
        content: '',
        submiting: false
    },
    bindPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },
    onLoad () {
        wxGetSystemInfo().then(data=>{
            let {screenHeight,screenWeight, pixelRatio} = data;
            let rpxHeight = screenHeight / screenWeight * 750;
            let textareaHeight = rpxHeight - (30+80+80+120+40);
            this.setData({
                textareaHeight: textareaHeight + 'rpx'
            })
        })
    },
    submitClick () {
        if(this.data.index === -1) {
             wx.showModal({
                 title: '请选择板块',
                 showCancel: false
             })
             return;
        }
        if(this.data.title === '') {
             wx.showModal({
                 title: '请填写标题',
                 showCancel: false
             })
             return;
        }

        if(this.data.content === '') {
             wx.showModal({
                 title: '请填写帖子内容',
                 showCancel: false
             })
             return;
        }
        if(!app.globalData.cnode_token) {
            wx.showModal({
                title: '请先登录',
                showCancel: false,
                success: function () {
                    wxRedirectTo('../login/login')
                }
            })
            return;
        }
        let body = {
            accesstoken: app.globalData.cnode_token,
            title: this.data.title,
            content:  this.data.content,
            tab: this.data.tab[this.data.index].key
        }
        this.setData({
            submiting: true
        })
        wx.showLoading();
        newTopic(body).then(res=>{
            let data = res.data;
            if(data.success) {
               app.globalData.isSubmitTopic = true;
                wx.navigateBack({
                    delta: 1
                })
                
            } else {
                wx.showModal({
                    title: data.error_msg || '发表失败',
                    showCancel: false,
                })
            }
           
        }).catch((err)=>{
            wx.showModal({
                title: err.error_msg || '发表失败',
                showCancel: false,
            })
        }).finally(()=>{
            this.setData({
                submiting: false
            })
        })

        
    },
    titleInputChange (e) {
        this.setData({
            title: e.detail.value
        })
    },
    contentInputChange (e) {
        this.setData({
            content: e.detail.value
        })
    }   
})