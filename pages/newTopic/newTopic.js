
import {wxGetSystemInfo} from '../../utils/wxApi';
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
        textareaHeight: '100rpx'
    },
    bindPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },
    onLoad () {
        wxGetSystemInfo()().then(data=>{
            console.log(data)
            let {screenHeight,pixelRatio} = data;
            let rpxHeight = screenHeight * pixelRatio;
            let textareaHeight = rpxHeight - (30+80+80+120+40);
            this.setData({
                textareaHeight: textareaHeight + 'rpx'
            })
        })
    }
})