//topics.js
import * as services from '../../services/services';
import {wxNavigateTo,wxGetStorage} from '../../utils/wxApi';
import * as util from'../../utils/util';
var app = getApp()
Page({
  data: {
    topics: [],
    pageIndex: 1,
    activeTab: 'all', //ask share job good
    limit: 20,
    tabList: [{key: 'all', value: '全部'},
    {key: 'good', value: '精华'},
    {key: 'share', value: '分享'},
    {key: 'ask', value: '问答'},
    {key: 'job', value: '招聘'}],
    fetchMore: false,
    nodata: false,
    userInfo: null,
    hasLogin: false,
    userLoginImage: 'http://p0.meituan.net/shangchao/e7af34f830a74a9abac65828721cacfa.jpg'
  },
  plainData: {
    pullTimeStamp: Date.now()
  },
  onLoad() {
    this.fetchList(true)
    console.log('topics onLoad')
  },
  onShow() {
    this.fetchUserInfo()
  },
  fetchUserInfo () {
    let userInfo = app.globalData.cnode_userInfo;
  
    if(userInfo) {
      this.setData({
        userInfo,
        hasLogin: true
      })
    } else {
      this.setData({
        userInfo: null,
        hasLogin: false
      })
    }
  },
  fetchList (reset) {
    let {pageIndex,activeTab,limit} = this.data;
    return services.getTopics({
      page: pageIndex,
      tab: activeTab,
      limit: limit
    }).then(res=>{
      res.data.data = res.data.data.map(item=>{
        item.create_at = util.formatTime(new Date(item.create_at))
        return item
      })
      if(reset) {
        this.setData({
          topics: res.data.data
        })
      } else {
        this.setData({
          topics: this.data.topics.concat(res.data.data)
        })
      }
       
    })
  },
  itemClick (e) {
    let {articalId} = e.currentTarget.dataset;
    wxNavigateTo("../detail/detail",{articalId})
    .then(()=>{})
    .catch(()=>{})
  },
  //  "enablePullDownRefresh": true, 
  onPullDownRefresh(e) {
    // wx.showLoading({title: '正在加载'})
    this.plainData.pullTimeStamp = Date.now()
    this.fetchList(true).finally(()=>{
      let time = Date.now()
      let delayTime = Date.now() - this.plainData.pullTimeStamp;
      let leftTime = 1000 - delayTime;
      if(leftTime > 0) {
          setTimeout(()=>{
            wx.stopPullDownRefresh();
            // wx.hideLoading()
          },leftTime)
      }
      
    })
  },
  onReachBottom: function () {  
    this.setData({
      fetchMore: true
    })
    this.data.pageIndex++;
    this.fetchList(false).finally(()=>{
      this.setData({
        fetchMore: false
      })
    })
     
  },
  onShareAppMessage: function () {
    return {
      title: 'CNODE社区小程序',
      path: 'pages/topics/topics',
      success: function(res) {
        // 分享成功
      },
      fail: function(res) {
        // 分享失败
      }
    }
  },
  tabClick(e) {
    wx.showLoading({title: '正在加载'})
    this.setData({
      activeTab: e.currentTarget.dataset.tab
    })
    this.fetchList(true).finally(()=>{
       wx.hideLoading()
    })
  },
  loginAvatarClick() {
    if(!this.data.hasLogin) {
      wxNavigateTo("../login/login")
    } else {
      wxNavigateTo("../userInfo/userInfo")
    }
  }
})
