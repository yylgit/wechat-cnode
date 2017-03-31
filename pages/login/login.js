
import {wxScanCode, wxNavigateTo, wxRedirectTo} from '../../utils/wxApi';
import * as services from '../../services/services';
var app = getApp()
Page({
    data: {

    },
    scanClick () {
        wxScanCode().then(data=>{
        wx.showLoading({title: '正在加载'})
           if(data.result) { 
                app.globalData.cnode_token = data.result
                wx.setStorageSync('cnode_token',data.result)
                services.getUserInfo(data.result).then(res=>{
                    app.globalData.cnode_userInfo = res.data;
                    console.log(res.data)
                    wx.setStorageSync('cnode_userInfo', res.data)
                    wx.hideLoading()
                    wxRedirectTo('../topics/topics')
                }).catch(()=>{

                })
           }
        }).catch(()=>{

        })
    }

})