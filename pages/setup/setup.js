
const app = getApp()
import * as util from'../../utils/util';

Page({
    data: {
        bgColor: '#E74C3C'
    },
    onLoad: function () {
        let color = genColor()
        this.setData({
            bgColor: color
        })
    },
    logoutClick () {
        wx.showLoading({title: '正在退出'})
        wx.clearStorageSync()
        app.globalData.cnode_token = null;
        app.globalData.cnode_userInfo = null;
        let pages = getCurrentPages()
        console.log(pages)
        wx.navigateBack({
            delta: pages.length - 1, // 回退前 delta(默认为1) 页面
        })
    },
    clearCacheClick () {
        wx.showLoading({title: '正在清除'})
        try {
            wx.clearStorageSync()
            app.globalData.cnode_token = null;
            app.globalData.cnode_userInfo = null;
            wx.showToast({title: '清除成功'})
        } catch(e) {
            wx.showToast({
                title: '清除失败',  
                image:"../../assets/white_error.gif"
            });
        }   
    },
    aboutMeClick () {

    }
})