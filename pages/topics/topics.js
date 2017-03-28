//topics.js
import * as services from '../../services/services';
import {wxNavigateTo} from '../../utils/wxApi';
var util =  require('../../utils/util');
Page({
  data: {
    topics: [],
    pageIndex: 1,
    tab: '', //ask share job good
    limit: 10
  },
  onLoad: function () {
    let {pageIndex,tab,limit} = this.data;
    services.getTopics({
      page: pageIndex,
      tab: tab,
      limit: limit
    }).then(res=>{
      res.data.data = res.data.data.map(item=>{
        item.create_at = util.formatTime(new Date(item.create_at))
        return item
      })
      this.setData({
        topics: res.data.data
      })
    })
  },
  itemClick (e) {
    let {articalId} = e.currentTarget.dataset;
    wxNavigateTo("../detail/detail",{articalId})
    .then(()=>{})
    .catch(()=>{})
  }
})
