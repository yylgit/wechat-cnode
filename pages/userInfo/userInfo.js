import * as services from '../../services/services';
import {wxRedirectTo,wxGetSystemInfo,wxNavigateTo} from '../../utils/wxApi';
import {formatShortTime} from '../../utils/util';
var app = getApp()
Page({
    data: {
        editIcon: 'http://dn-cnode.qbox.me/FnxmEholmxOeqkEuPXrBK8Mkb8a4',
        setUpIcon: 'http://dn-cnode.qbox.me/FskVMbTkcRYxUFF-EjtSTFv5Vhli',
        userInfo: null,
        tabList: [{
            key: 'topics', value: '最近发布'
        },{
            key: 'replies', value: '最近回复'
        }],
        activeTab: 'topics',
        scrollViewHeight: '0rpx'
    },
    onLoad: function () {
        let userInfo = app.globalData.cnode_userInfo;
        console.log(userInfo)
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
        wxGetSystemInfo()().then(data=>{
            console.log(data)
            let {screenHeight,pixelRatio} = data;
            let rpxHeight = screenHeight * pixelRatio;
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
    }
})