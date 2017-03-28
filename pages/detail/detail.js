//topics.js
import * as services from '../../services/services.js'
var util =  require('../../utils/util');
Page({
  data: {
    articalId: '5433d5e4e737cbe96dcef312',
    artical: {}
  },
  onLoad: function (options) {
    let {articalId} = options;
    services.getArtical(articalId).then(res=>{
      this.artical = res.data.data;
    })
  }
})
