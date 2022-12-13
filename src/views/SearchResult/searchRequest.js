import axios from "axios";
import qs from "qs";
import {AND, attributes} from "@/views/SearchResult/SearchDataType";

export function searchRequest(p){
    let parmas=JSON.parse(JSON.stringify(p));
    if(parmas.mode===undefined){
        console.log('没有指明搜索对象')
    }
    if(parmas.filter_org!==undefined){
        for(let i=0;i<parmas.filter_org.length;i++){
            if(parmas.filter_org[i]===undefined) continue;
            parmas.search_word.push(parmas.filter_org[i])
            parmas.search_type.push("9")
            parmas.search_logic.push(AND)
        }
    }
    if(parmas.filter_field!==undefined){
        for(let i=0;i<parmas.filter_field.length;i++){
            if(parmas.filter_field[i]===undefined) continue;
            parmas.search_word.push(parmas.filter_field[i])
            parmas.search_type.push("7")
            parmas.search_logic.push(AND)
        }
    }
    if(parmas.filter_src!==undefined){
        for(let i=0;i<parmas.filter_src.length;i++){
            if(parmas.filter_src[i]===undefined) continue;
            parmas.search_word.push(parmas.filter_src[i])
            parmas.search_type.push("5")
            parmas.search_logic.push(AND)
        }
    }
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
