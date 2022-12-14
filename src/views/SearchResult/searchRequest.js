import axios from "axios";
import qs from "qs";
import {AND, attributes, MODE_PAPER, MODE_PATENT, MODE_PROJECT} from "@/views/SearchResult/SearchDataType";
let headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}
let transformRequest = [
    function (data) {
        let ret = ''
        for (let it in data) {
            // 防止数据为 null 时，转换成字符串 'null' 传给后端导致报错
            ret += encodeURIComponent(it) + '=' + (data[it] !== null ? encodeURIComponent(data[it]) : '') + '&'
        }
        ret = ret.substring(0, ret.lastIndexOf('&'))
        return ret
    }
]
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

    if(parmas.mode===MODE_PAPER){
        console.log('searchPapers',parmas)
        return axios({
            url: 'search',
            method: 'post',
            data:parmas,
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }
    else if(parmas.mode===MODE_PATENT){
        let tmp=new FormData
        let url="/search_patent"
        let sendData={
            word:parmas.search_word[0],
            page:parmas.page,
            size:parmas.size,
            type:parmas.search_type[0]
        }
        tmp.append("word",parmas.search_word[0])
        tmp.append("page",parmas.page)
        tmp.append("size",parmas.size)
        console.log('searchPatent',sendData)
        return axios({
            method: "post",
            url,
            data: qs.stringify(sendData)
            }
        )
    }else if(parmas.mode===MODE_PROJECT){
        let tmp=new FormData
        tmp.append("word",parmas.search_word[0])
        tmp.append("page",parmas.page)
        tmp.append("size",parmas.size)
        let url="/search_project"
        let sendData={
            word:parmas.search_word[0],
            page:parmas.page,
            size:parmas.size,
            type:parmas.search_type[0]
        }
        console.log('searchProject',sendData)
        return axios({
                method: "post",
                url,
                data: qs.stringify(sendData)
            }
        )
    }
}
export function collect_paper(param){
    return axios({
        url:'/user_collect_by_id',
        method:'post',
        parmas:param
    })
}
