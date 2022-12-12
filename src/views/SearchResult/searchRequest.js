import axios from "axios";
import qs from "qs";

export function searchRequest(parmas){
    console.log('searchRequest',parmas)
    return axios({
        url: 'search',
        method: 'post',
        data:parmas,
        headers: {
            'Content-Type': 'application/json'
        },
    })
}
export function collect_paper(param){
    return axios({
        url:'/user_collect_by_id',
        method:'post',
        parmas:param
    })
}
