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
            value: "COMBINE",
        },
        {
            name: "主题",
            value: "TOPIC",
        },
        {
            name: "专利名",
            value: "NAME",
        },
        {
            name: "摘要",
            value: "ABSTRACT",
        },
        {
            name: "关键词",
            value: "KEYWORDS",
        },
        {
            name: "全文",
            value: "CONTENT",
        },
        {
            name: "申请人",
            value: "APPLICATOR",
        },
        {
            name: "发明人",
            value: "INVENTOR",
        },
        {
            name: "代理人",
            value: "AGENCY",
        },
        {
            name: "申请号",
            value: "APPLICATENUMBER",
        },
        {
            name: "公开号",
            value: "PUBLICNUMBER",
        },
        {
            name: "分类号",
            value: "CLASSNUMBER",
        },
        {
            name: "主分类号",
            value: "MAINCLASSNUMBER",
        },
    ],
    [
        {
            name: "综合",
            value: "COMBINE",
        },
        {
            name: "主题",
            value: "TOPIC",
        },
        {
            name: "项目名称",
            value: "NAME",
        },
        {
            name: "摘要",
            value: "ABSTRACT",
        },
        {
            name: "关键词",
            value: "KEYWORDS",
        },
        {
            name: "项目专家",
            value: "EXPERT",
        },
        {
            name: "承担机构",
            value: "EXEINSTITUTE",
        },
        {
            name: "资助机构",
            value: "PAYINSTITUTE",
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
export const PAGE_SIZE=0;
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
// export default {
//     logicOptions,ORDER_TYPE_RELATIVE,ORDER_TYPE_TIME,ORDER_REFSUM,ORDER_DES,ORDER_ASD,
//     AND,OR,NOT,
//     accuracyOptions,
//     PAGE_SIZE,
//     referAttributes,
// }
