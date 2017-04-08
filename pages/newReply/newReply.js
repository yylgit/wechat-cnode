
import * as services from '../../services/services'
var app = getApp()
Page({
    data: {
        submiting: false
    },
    content: '',
    articalId: '',
    replyId: '',
    authorName: '',
    onLoad(options) {
        let {articalId,replyId,authorName} = options;
        this.articalId = articalId;
        this.replyId = replyId;
        this.authorName = authorName;
    },
    submitClick () {
        if(this.content === '') {
             wx.showModal({
                 title: '请填写发表内容',
                 showCancel: false
             })
             return;
        }
        if(!app.getAccessToken()){
            return
        }
        wx.showLoading({title:'发表中...'});
        // if(this.authorName) {
        //     this.content = `[@${this.authorName}] ` + this.content;
        // }
        // this.content += '<br/>from <a href="https://github.com/yylgit/wechat-cnode">wechat-cnode</a>';
        services.newReply(
            app.getAccessToken(),
            this.content,
            this.articalId,
            this.replyId
        ).then(res=>{
            let data = res.data;
            if(data.success) {
               app.globalData.isSubmitReply = true;
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
    contentChange (e) {
        this.content = e.detail.value
    }
})