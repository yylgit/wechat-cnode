Page({
    data: {
        tab: [{
            key: 'share', value: '分享'
        },{
            key: 'ask', value: '问答'
        },{
            key: 'job', value: '招聘'
        }],
        index: -1
    },
    bindPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    }
})