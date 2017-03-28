import {get, post} from '../utils/wxRequest'

let host = 'https://cnodejs.org/api/v1';


export function getTopics (params) {
    let url = host + '/topics';
    return get(url, params)
}

export function getArtical (id) {
    let url = host + '/topic/'+id;
    return get(url)
}