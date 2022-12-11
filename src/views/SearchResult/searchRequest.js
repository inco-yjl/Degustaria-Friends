import axios from "axios";

export function searchRequest(param){
    return axios({
        url: '/search_paper',
        method: 'get',
        param,
    })
}
export function collect_paper(param){
    return axios({
        url:'/user_collect_paper_by_id',
        method:'post',
        param,
    })
}
