import {get, post} from '../utils/wxRequest'

let host = 'https://cnodejs.org/api/v1';

//主题列表
export function getTopics (params) {
    let url = host + '/topics';
    return get(url, params)
}

//主题详情
export function getArtical (id) {
    let url = host + '/topic/'+id;
    return get(url)
}

//校验用户accesstoekn
export function getUserInfo (accesstoken) {
    let url = host + '/accesstoken';
    return post(url,{accesstoken})
}

//获取用户信息
export function getUserInfoDetail (loginname) {
    let url = host + '/user/'+loginname;
    return get(url)
}
/**
 * 发表帖子
accesstoken String 用户的 accessToken
title String 标题
tab String 目前有 ask share job
content String 主体内容
 */
export function newTopic (body) {
    let url = host + '/topics';
    return post(url,body)
}

//收藏主题
export function collectTopic (accesstoken,topic_id) {
    let url = host + '/topic_collect/collect';
    return post(url,{
        accesstoken,
        topic_id
    })
}
//收藏主题
export function notCollectTopic (accesstoken,topic_id) {
    let url = host + '/topic_collect/de_collect';
    return post(url,{
        accesstoken,
        topic_id
    })
}