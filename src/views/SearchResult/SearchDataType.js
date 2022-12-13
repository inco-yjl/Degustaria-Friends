export const attributes = [
    [
        {
            name: "综合",
            value: "0",
        },
        {
            name: "作者",
            value: "1",
        },
        {
            name: "标题",
            value: "2",

        },
        {
            name: "引用",
            value: "3",
        },
        {
            name: "摘要",
            value: "4",
        },
        {
            name: "来源",
            value: "5",
        },
        {
            name: "关键词",
            value: "6",
        },
        {
            name: "领域",
            value: "7",
        },
        {
            name: "DOI",
            value: "8",
        },
        {
            name: "机构",
            value: "9",
        },
    ],
    [
        {
            name: "综合",
            value: "0",
        },
        {
            name: "主题",
            value: "1",
        },
        {
            name: "专利名",
            value: "2",
        },
        {
            name: "关键词",
            value: "3",
        },
        {
            name: "发明人",
            value: "4",
        },
    ],
    [
        {
            name: "综合",
            value: "0",
        },
        {
            name: "主题",
            value: "1",
        },
        {
            name: "项目名称",
            value: "2",
        },
        {
            name: "简介",
            value: "3",
        },
        {
            name: "关键词",
            value: "4",
        },
        {
            name: "项目专家",
            value: "5",
        },
        {
            name: "承担机构",
            value: "6",
        },

    ],
];
export const referAttributes = [
    {
        name: "被引主题",
        value: "0",
    },
    {
        name: "被引作者",
        value: "1",
    },
    {
        name: "被引摘要",
        value: "4",
    },
    {
        name: "被引文献来源",
        value: "5",
    },
    {
        name: "被引关键词",
        value: "6",
    },
    {
        name: "被引机构",
        value: "9",
    },

];
export const logicOptions = [
    {
        name: "而且",
        value: 0,
    },
    {
        name: "或者",
        value: 1
    },
    {
        name: "且非",
        value: 2,
    },
];
export const accuracyOptions = [
    {
        name: "模糊",
        value: "VAGUE",
    },
    {
        name: "精确",
        value: "PRECISE",
    },
];
export const PAGE_SIZE=10;
export const ORDER_TYPE_RELATIVE=0;
export const ORDER_TYPE_TIME=1;
export const ORDER_REFSUM=2;
export const ORDER_DES=0;
export const ORDER_ASD=1;
export const AND=0;
export const OR=1;
export const NOT=2;
export const REF=1;
export const NOT_REF=0;
export const MODE_PAPER=0;
export const MODE_PATENT=1;
export const MODE_PROJECT=2;
export function NormalizeSearchParam(param){
    param.size=PAGE_SIZE
    if(param.search_word!==undefined){
        for(let i=0;i<param.search_word;i++){
            param.search_word[i]=param.search_word[i].toString()
        }
    }
    if(param.search_type!==undefined){
        for(let i=0;i<param.search_type;i++){
            param.search_type[i]=parseInt(param.search_type[i])
        }
    }
    if(param.search_logic!==undefined){
        for(let i=0;i<param.search_logic;i++){
            param.search_logic[i]=parseInt(param.search_logic[i])
        }
    }
    if(param.mode!==undefined){
        param.mode=parseInt(param.mode)
    }
    if(param.page!==undefined){
        param.page=parseInt(param.page)
    }
    if(param.size!==undefined){
        param.size=parseInt(param.size)
    }
    if(param.order!==undefined){
        param.order=parseInt(param.order)
    }
    if(param.order_type!==undefined){
        param.order_type=parseInt(param.order_type)
    }
    if(param.ref!==undefined){
        param.ref=parseInt(param.ref)
    }
    return param
}