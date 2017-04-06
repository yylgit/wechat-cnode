import * as services from '../../services/services';
import {wxRedirectTo,wxGetSystemInfo,wxNavigateTo} from '../../utils/wxApi';
import {formatShortTime, genColor} from '../../utils/util';
var app = getApp()
Page({
    data: {
        userInfo: null,
        tabList: [{
            key: 'topics', value: '最近发布'
        },{
            key: 'replies', value: '最近回复'
        }],
        activeTab: 'topics',
        scrollViewHeight: '0rpx',
        bgColor: '#E74C3C'
    },
    onShow() {
        if(app.globalData.isSubmitTopic) {
            app.globalData.isSubmitTopic = false;
            this.fetchData();
            wx.showToast({
                title: '发表成功',
                icon: 'success',
                duration: 2000
            })
        }
       
    },
    onLoad: function () {
        let color = genColor()
        this.setData({
            bgColor: color
        })
        this.fetchData(); 
    },
    fetchData() {
        let userInfo = app.globalData.cnode_userInfo;
        if(userInfo) {
           services.getUserInfoDetail(userInfo.loginname).then(res=>{
                res.data.data.create_at = 
                formatShortTime(new Date(res.data.data.create_at))
                this.setData({
                userInfo: res.data.data
                })
            })
        } else {
            wxRedirectTo('../login/login')
        }
        wxGetSystemInfo().then(data=>{
            let {screenHeight,screenWidth, pixelRatio} = data;
            console.log('screenHeight:'+screenHeight)
            let rpxHeight = screenHeight / screenWidth * 750;
            let scrollViewHeight = rpxHeight - 380;
            this.setData({
                scrollViewHeight: scrollViewHeight + 'rpx'
            })
        })
    },
    tabClick(e) {
        this.setData({
            activeTab: e.currentTarget.dataset.tab
        })
    },
    itemClick(e) {
        let {articalId} = e.currentTarget.dataset;
        wxNavigateTo("../detail/detail",{articalId})
        .then(()=>{})
        .catch(()=>{})
    },
    editClick (e) {
         wxNavigateTo("../newTopic/newTopic")
    },
    gotoSetupClick () {
         wxNavigateTo("../setup/setup")
    }
})