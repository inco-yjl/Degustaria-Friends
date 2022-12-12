<template>
    <div class="home-page">
        <div class="page-top">
            <!-- {{ imgSrc }} -->
            <!-- <v-img
                class="img1"
                max-height="150"
                max-width="150"
                :src="imgSrc"
            ></v-img> -->
            <div class="page-top-info">
                <div class="title1">{{ institutionName }}</div>
                <div class="title2">{{ institutionLocation }}</div>
                <div class="title3">学术成果总量 {{ num }} 篇</div>
                <div class="title4">收录范围： {{ rangeLow }} - {{ rangeHigh }}</div>
            </div>
            <div class="page-top-detail">
                <div class="text1" style="white-space: pre-wrap;">{{ infoDetail }}</div>
            </div>
        </div>
        <!-- <v-divider
        ></v-divider> -->
        <div class="page-bottom">
            <div class="bottom-left">
                <div class="bottom-left-1">
                    <div class="bottom-left-1-top">
                        <div id="pie1"></div>
                        <div id="pie2"></div>
                        <div id="pie3"></div>
                        <div id="pie4"></div>
                        <div class="pie-num">总计 {{ numPie }} 篇</div>
                    </div>
                    <div class="bottom-left-1-bottom">
                        <div id="category1"></div>
                        <div id="category2"></div>
                    </div>
                </div>
                <div class="bottom-left-2">
                    <v-divider
                    ></v-divider>
                    <div class="bottom-left-2-title">
                        学术成果
                    </div>
                    <div class="tabs">
                        <v-card>
                            <v-toolbar
                                color="#ffffff"
                                dark
                                flat
                            >
                                <v-tabs
                                    v-model="tab"
                                >
                                    <v-tabs-slider color="yellow"></v-tabs-slider>
                                    <v-tab
                                        v-for="item in items"
                                        :key="item.name"
                                    >
                                        <div class="tab-name">{{ item.name }}</div>
                                        <div class="tab-num">共 {{ item.num }} 篇</div>
                                    </v-tab>
                                </v-tabs>
                            </v-toolbar>

                            <v-tabs-items v-model="tab">
                                <v-tab-item
                                    v-for="item in items"
                                    :key="item.name"
                                >
                                    <v-card flat>
                                        <div class="selector">
                                            <div class="recommendation-tab-item" v-for="paper in similar_papers" :key="paper.id">
                                            <p class="similar-paper-title">{{ paper.title }}</p>
                                            <p class="similar-paper-abstract">{{ paper.abstract }}</p>
                                            <p class="similar-paper-author-and-source">{{ paper.author + ' - ' + paper.source }}</p>
                                            <p class="similar-paper-citations-and-year">
                                                {{ '被引量：' + paper.citations + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + '发表：' + paper.year }}</p>
                                            <v-divider class="recommendation-tab-item-divider"></v-divider>
                                            </div>
                                        </div>
                                    </v-card>
                                </v-tab-item>
                            </v-tabs-items>
                        </v-card>
                    </div>
                </div>
                <div class="bottom-left-3">
                    <v-divider
                    ></v-divider>
                    <div class="bottom-left-2-title">
                        刊物
                    </div>
                    <div class="bottom-left-3-left">
                        <div class="journals" v-for="journal in journals">
                            <div class="journal">
                                <v-img
                                    class="img-scholar"
                                    :src="journal.photo"
                                ></v-img>
                                <div class="scholar-info">
                                    <div class="scholar-info1">{{ journal.name }}</div>
                                    <div class="scholar-info2">{{ journal.intro }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <v-divider
                        inset
                        vertical
                        style="float: left;"
                    ></v-divider>
                    <div class="bottom-left-3-right">

                    </div>
                </div>
            </div>
            <div class="bottom-right">
                <v-divider
                    inset
                    vertical
                    style="float: left;"
                ></v-divider>
                <div class="bottom-right-title">
                    机构学者
                </div>
                <div class="scholar-list">
                    <div class="scholars" v-for="scholar in scholars">
                        <!-- <v-img
                            class="img-scholar"
                            :src="scholar.photo"
                        ></v-img> -->
                        <div class="scholar-info">
                            <div class="scholar-info1">{{ scholar.name }}</div>
                            <div class="scholar-info2">{{ scholar.loc }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {defineComponent, reactive, ref} from 'vue';
import * as echarts from 'echarts';
import qs from "qs";
export default defineComponent({
    data() {
        return {
            imgSrc: require("@/assets/profilePhoto.png"),
            institutionName: "Accident Research Centre",
            // institutionLocation: "野比大雄的院子",
            institutionLocation: "",
            institutionId: -7,
            num: "123",
            rangeLow: "1111",
            rangeHigh: "2232",
            // infoDetail: "    土豆，上帝赐予人类最宝贵的礼物，世界上最完美的事物，土豆丝好吃，土豆片好吃，土豆块好吃，土豆泥好吃，炸着吃烤着吃蒸着吃煎着吃都好吃，薯条好吃，薯饼好吃，炖肉好吃，加孜然好吃，蘸辣椒好吃，焗芝士好吃，卷饼里好吃，怎么样都好吃，哪怕整个煮熟了撒盐都好吃，除了发芽吃了会死，没有任何缺陷。\n    发芽吃了会死是人类的缺陷，土豆是完美的。",
            infoDetail: "Lorem ipsm dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit",
            // scholars: [
            //     {
            //         name: "DeGang Guo",
            //         loc: "artificial intelligence",
            //         photo: require("@/assets/profilePhoto.png")
            //     },
            //     {
            //         name: "Alec Radford",
            //         loc: "Indico Data Solutions",
            //         photo: require("@/assets/profilePhoto.png")
            //     },
            //     {
            //         name: "郭德纲",
            //         loc: "德云社",
            //         photo: require("@/assets/profilePhoto.png")
            //     },
            //     {
            //         name: "郭德纲",
            //         loc: "德云社",
            //         photo: require("@/assets/profilePhoto.png")
            //     },
            //     {
            //         name: "郭德纲",
            //         loc: "德云社",
            //         photo: require("@/assets/profilePhoto.png")
            //     }
            // ],
            scholars: [],
            journals: [
                {
                    name: "土豆种植模式",
                    intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    photo: require("@/assets/profilePhoto.png")
                },
                {
                    name: "模式种植土豆",
                    intro: "Proin gravida dolor sit amet lacus accumsan et viverra.",
                    photo: require("@/assets/profilePhoto.png")
                },
                {
                    name: "郭德纲吃土豆",
                    intro: "Aenean euismod bibendum laoreet.",
                    photo: require("@/assets/profilePhoto.png")
                }
            ],
            numPie: "666",
            // /
            tab: null,
            items: [
                {
                    name: '论文',
                    num: 68,
                },
                {
                    name: '专利',
                    num: 55,
                },
                {
                    name: '项目',
                    num: 77,
                },
            ],
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            similar_papers: [
                {
                    id: 1,
                    title: '跨越发展奔小康-—达茂联合旗实施"三集中"战略纪实',
                    abstract: '＜正＞落后旗县如何使经济发展驶入快车道,农牧民收入大提高?达茂旗的实践证明,有了超常规发展的思路,才会有跨越式发展的出路。2002年,达茂旗全社会固定资产投资…',
                    author: '张滨艳',
                    source: '《实践(思想理论版)》',
                    citations: 0,
                    year: 2003
                },
                {
                    id: 2,
                    title: '积极实施"六化"战略全力推进跨越发展——府谷县经济社会发展纪实',
                    abstract: '近年来,府谷县紧紧国绕打造国内一流的煤电化载能工业基地的目标,立足资源优势,坚持科学发展,大力实施新型工业化,农业产业化城乡一体化,民企集团化;环境大优化,民生优…',
                    author: '刘玲',
                    source: '《新西部(新闻版)》',
                    citations: 0,
                    year: 2010
                },
                {
                    id: 3,
                    title: '跨越 突破 搏击 -- 农二师实施大调整大转变战略纪实',
                    abstract: '新年伊始,记者来到农二师采访,深深地感受到这里在经济结构战略性大调整、发展方式战略性大转变过程中所展现出的勃勃生机,新的希望正在这里冉冉升腾。“要立足农业内涵…',
                    author: '高利，栗卫亚',
                    source: '《当代兵团》',
                    citations: 0,
                    year: 2010
                }
            ]
        }
    },
    mounted() {
        // 自动刷新数据
        this.$nextTick(() => {
            setTimeout(() => {
                this.initGraph();
                this.initInfo();
            }, 500);
        });
        window.onresize = () => {
            return (() => {
                this.$nextTick(() => {
                    this.initGraph();
                });
            })();
        };
    },
    methods: {
        initGraph() {
            this.drawPieChart1();
            this.drawPieChart2();
            this.drawPieChart3();
            this.drawPieChart4();
            this.drawCategory1();
            this.drawCategory2();
        },
        drawPieChart1() {
            echarts.dispose(document.getElementById('pie1'));
            var chartDom = document.getElementById('pie1');
            var myChart = echarts.init(chartDom);
            var option;
            option = {
                tooltip: {
                    trigger: 'item'
                },
                graphic: [
                    { //环形图中间添加文字
                        type: 'text', //通过不同top值可以设置上下显示
                        left: 'center',
                        top: '38%',
                        style: {
                            text: '论文',
                            textAlign: 'center',
                            fill: '#8c8c8c', //文字的颜色 
                            width: 30,
                            height: 30,
                            fontSize: 25,
                            fontFamily: "Microsoft YaHei"
                        }
                    },
                    // 写了两个文字插入是因为业务要求两行不一样样式的字
                    { //环形图中间添加文字  
                        type: 'text', //通过不同top值可以设置上下显示
                        left: 'center',
                        top: '53%',
                        style: {
                            text: '85%',
                            textAlign: 'center',
                            fill: '#123212', //文字的颜色
                            width: 30,
                            height: 30,
                            fontSize: 30,
                            fontFamily: "Microsoft YaHei" // 这个自己看着办
                        }
                    }
                ],
                series: [
                    {
                        color: ['#169bd5', '#d7d7d7'],
                        type: 'pie',
                        radius: ['60%', '90%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                            show: false,
                            fontSize: '40',
                            fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 58, name: 'Search Engine',  },
                            { value: 735, name: 'Direct' },
                        ]
                    }
                ]
            };
            option && myChart.setOption(option);
        },
        drawPieChart2() {
            echarts.dispose(document.getElementById('pie2'));
            var chartDom = document.getElementById('pie2');
            var myChart = echarts.init(chartDom);
            var option;
            option = {
                tooltip: {
                    trigger: 'item'
                },
                graphic: [
                    { //环形图中间添加文字
                        type: 'text', //通过不同top值可以设置上下显示
                        left: 'center',
                        top: '38%',
                        style: {
                            text: '项目',
                            textAlign: 'center',
                            fill: '#8c8c8c', //文字的颜色 
                            width: 30,
                            height: 30,
                            fontSize: 25,
                            fontFamily: "Microsoft YaHei"
                        }
                    },
                    // 写了两个文字插入是因为业务要求两行不一样样式的字
                    { //环形图中间添加文字  
                        type: 'text', //通过不同top值可以设置上下显示
                        left: 'center',
                        top: '53%',
                        style: {
                            text: '85%',
                            textAlign: 'center',
                            fill: '#123212', //文字的颜色
                            width: 30,
                            height: 30,
                            fontSize: 30,
                            fontFamily: "Microsoft YaHei" // 这个自己看着办
                        }
                    }
                ],
                series: [
                    {
                        color: ['#169bd5', '#d7d7d7'],
                        type: 'pie',
                        radius: ['60%', '90%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                            show: false,
                            fontSize: '40',
                            fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 158, name: 'Search Engine',  },
                            { value: 735, name: 'Direct' },
                        ]
                    }
                ]
            };
            option && myChart.setOption(option);
        },
        drawPieChart3() {
            echarts.dispose(document.getElementById('pie3'));
            var chartDom = document.getElementById('pie3');
            var myChart = echarts.init(chartDom);
            var option;
            option = {
                tooltip: {
                    trigger: 'item'
                },
                graphic: [
                    { //环形图中间添加文字
                        type: 'text', //通过不同top值可以设置上下显示
                        left: 'center',
                        top: '38%',
                        style: {
                            text: '专利',
                            textAlign: 'center',
                            fill: '#8c8c8c', //文字的颜色 
                            width: 30,
                            height: 30,
                            fontSize: 25,
                            fontFamily: "Microsoft YaHei"
                        }
                    },
                    // 写了两个文字插入是因为业务要求两行不一样样式的字
                    { //环形图中间添加文字  
                        type: 'text', //通过不同top值可以设置上下显示
                        left: 'center',
                        top: '53%',
                        style: {
                            text: '85%',
                            textAlign: 'center',
                            fill: '#123212', //文字的颜色
                            width: 30,
                            height: 30,
                            fontSize: 30,
                            fontFamily: "Microsoft YaHei" // 这个自己看着办
                        }
                    }
                ],
                series: [
                    {
                        color: ['#169bd5', '#d7d7d7'],
                        type: 'pie',
                        radius: ['60%', '90%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                            show: false,
                            fontSize: '40',
                            fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 258, name: 'Search Engine',  },
                            { value: 735, name: 'Direct' },
                        ]
                    }
                ]
            };
            option && myChart.setOption(option);
        },
        drawPieChart4() {
            echarts.dispose(document.getElementById('pie4'));
            var chartDom = document.getElementById('pie4');
            var myChart = echarts.init(chartDom);
            var option;
            option = {
                tooltip: {
                    trigger: 'item'
                },
                graphic: [
                    { //环形图中间添加文字
                        type: 'text', //通过不同top值可以设置上下显示
                        left: 'center',
                        top: '38%',
                        style: {
                            text: '其他',
                            textAlign: 'center',
                            fill: '#8c8c8c', //文字的颜色 
                            width: 30,
                            height: 30,
                            fontSize: 25,
                            fontFamily: "Microsoft YaHei"
                        }
                    },
                    // 写了两个文字插入是因为业务要求两行不一样样式的字
                    { //环形图中间添加文字  
                        type: 'text', //通过不同top值可以设置上下显示
                        left: 'center',
                        top: '53%',
                        style: {
                            text: '85%',
                            textAlign: 'center',
                            fill: '#123212', //文字的颜色
                            width: 30,
                            height: 30,
                            fontSize: 30,
                            fontFamily: "Microsoft YaHei" // 这个自己看着办
                        }
                    }
                ],
                series: [
                    {
                        color: ['#169bd5', '#d7d7d7'],
                        type: 'pie',
                        radius: ['60%', '90%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                            show: false,
                            fontSize: '40',
                            fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 358, name: 'Search Engine',  },
                            { value: 735, name: 'Direct' },
                        ]
                    }
                ]
            };
            option && myChart.setOption(option);
        },
        drawCategory1() {
            echarts.dispose(document.getElementById('category1'));
            var chartDom = document.getElementById('category1');
            var myChart = echarts.init(chartDom);
            var option;
            option = {
                tooltip: {
                    trigger: 'axis',
                    position: function (pt) {
                        return [pt[0], '10%'];
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [123, 932, 422, 934, 1290, 1330, 1320],
                        type: 'line',
                        areaStyle: {}
                    }
                ],
                grid: {
                    x: 1,
                    y: 1,
                    x2: 1,
                    y2: 25,
                    borderWidth: 1,
                }
            };
            option && myChart.setOption(option);
        },
        drawCategory2() {
            echarts.dispose(document.getElementById('category2'));
            var chartDom = document.getElementById('category2');
            var myChart = echarts.init(chartDom);
            var option;
            option = {
                tooltip: {
                    trigger: 'axis',
                    position: function (pt) {
                        return [pt[0], '10%'];
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [123, 932, 422, 934, 1290, 1330, 1320],
                        type: 'line',
                        areaStyle: {}
                    }
                ],
                grid: {
                    x: 1,
                    y: 1,
                    x2: 1,
                    y2: 25,
                    borderWidth: 1,
                }
            };
            option && myChart.setOption(option);
        },

        
        initInfo() {
            this.searchOrg();
            this.getScholarsByOrg();
            // this.getPAmountByOrg();
            // this.getMagazinesByOrg();
            // this.getPapersByOrg();
            // this.getPatentsByOrg();
            // this.getProjectsByOrg();
        },
        searchOrg() {
            // console.log("searchOrg");
            this.$axios({
                method: "post",
                url: "/search_org",
                data: qs.stringify({
                    search_word: this.institutionName,
                    page: 1,
                    size: 1,
                }),
            })
            .then((res) => {
                console.log(res);
                this.institutionId = res.data[0].id;
                this.institutionLocation = res.data[0].country;
                this.infoDetail = res.data[0].introduction;
                console.log("searchOrg");
            })
            .catch((err) => {
                console.error(err);
            });
        },
        getScholarsByOrg() {
            // console.log("getScholarsByOrg");
            this.$axios({
                method: "post",
                url: "/get_scholars_by_org",
                data: qs.stringify({
                    name: this.institutionName,
                    page: 1,
                    size: 100,
                }),
            })
            .then((res) => {
                console.log(res);
                for (var i=0; i<res.data.length; i++) {
                    var aScholar = {};
                    aScholar.name = res.data[i].name1;
                    aScholar.loc = res.data[i].interests;
                    this.scholars.push(aScholar);
                }
                console.log("getScholarsByOrg");
            })
            .catch((err) => {
                console.error(err);
            });
        },
        getPAmountByOrg() {    // 后端有问题 未完成
            // console.log("getPAmountByOrg");
            this.$axios({
                method: "post",
                url: "/get_p_amount_by_org",
                data: qs.stringify({
                    name: this.institutionName,
                }),
            })
            .then((res) => {
                console.log(res);
                // for (var i=0; i<res.data.length; i++) {
                //     var aScholar = {};
                //     aScholar.name = res.data[i].name1;
                //     aScholar.loc = res.data[i].interests;
                //     this.scholars.push(aScholar);
                // }

                console.log("getPAmountByOrg");
            })
            .catch((err) => {
                console.error(err);
            });
        },
        getMagazinesByOrg() {    // 后端magezine表无数据
            // console.log("getMagazinesByOrg");
            this.$axios({
                method: "post",
                url: "/get_magazines_by_org",
                data: qs.stringify({
                    name: this.institutionName,
                    page: 1,
                    size: 100,
                }),
            })
            .then((res) => {
                console.log(res);
                // for (var i=0; i<res.data.length; i++) {
                //     var aScholar = {};
                //     aScholar.name = res.data[i].name1;
                //     aScholar.loc = res.data[i].interests;
                //     this.scholars.push(aScholar);
                // }

                console.log("getMagazinesByOrg");
            })
            .catch((err) => {
                console.error(err);
            });
        },
        getPapersByOrg() {      // 数据库表未空
            // console.log("getPapersByOrg");
            this.$axios({
                method: "post",
                url: "/get_papers_by_org",
                data: qs.stringify({
                    name: this.institutionName,
                    page: 1,
                    size: 100,
                }),
            })
            .then((res) => {
                console.log(res);

                console.log("getPapersByOrg");
            })
            .catch((err) => {
                console.error(err);
            });
        },
        getPatentsByOrg() {       // 数据库表未空
            // console.log("getPapersByOrg");
            this.$axios({
                method: "post",
                url: "/get_patents_by_org",
                data: qs.stringify({
                    name: this.institutionName,
                    page: 1,
                    size: 100,
                }),
            })
            .then((res) => {
                console.log(res);

                console.log("getPatentsByOrg");
            })
            .catch((err) => {
                console.error(err);
            });
        },
        getProjectsByOrg() {        // 数据库表未空
            // console.log("getPapersByOrg");
            this.$axios({
                method: "post",
                url: "/get_projects_by_org",
                data: qs.stringify({
                    name: this.institutionName,
                    page: 1,
                    size: 100,
                }),
            })
            .then((res) => {
                console.log(res);

                console.log("getProjectsByOrg");
            })
            .catch((err) => {
                console.error(err);
            });
        },
    }
});
</script>

<style scoped lang="scss">
    .home-page {
        // background-color:yellow;
        height:vh(3000);//改成自适应的
        padding-top:40px;
        //绝对，为了使顶部内容正常显示，不被search-bar遮挡
        margin-left: vw(100);
        margin-right: vw(100);
        width:vw(1720);
    }
    .page-top {
        // border: 3px solid #ff2fff;
        // height:vh(250);//改成自适应的
        //绝对，为了使顶部内容正常显示，不被search-bar遮挡
        width: vw(1720);
        padding-bottom: 20px;
        border-bottom: 1px solid #d7d7d7;
    }
    .page-top-info {
        // border: 3px solid #ff2fff;
        margin-left: vw(260);
        // height:vh(250);//改成自适应的
        //绝对，为了使顶部内容正常显示，不被search-bar遮挡
        width:vw(700);
        // float: left;
        display: inline-block;
    }
    .page-top-detail {
        // border: 3px solid #ff2fff;
        margin-left: vw(50);
        // height:vh(250);//改成自适应的
        //绝对，为了使顶部内容正常显示，不被search-bar遮挡
        width:vw(400);
        // float: left;
        display: inline-block;
    }
    .page-bottom {
        // border: 3px solid #1f22ff;
        height:vh(2000);//改成自适应的
        //绝对，为了使顶部内容正常显示，不被search-bar遮挡
        width:vw(1720);
    }
    .bottom-left {
        // border: 3px solid #89e91c;
        height:vh(2000);//改成自适应的
        //绝对，为了使顶部内容正常显示，不被search-bar遮挡
        width:vw(1290);
        float: left;
    }
    .bottom-right {
        // border: 3px solid #29dfe9;
        margin-top: vw(30);
        height:vh(1300);//改成自适应的
        //绝对，为了使顶部内容正常显示，不被search-bar遮挡
        width:vw(410);
        float: right;
    }
    .bottom-left-1 {
        // border: 3px solid #54cd6a;
        // height:vh(400);//改成自适应的
        //绝对，为了使顶部内容正常显示，不被search-bar遮挡
        width:vw(1290);
        float: left;
    }
    .bottom-left-1-top {
        // border: 3px solid #bda9bc;
        margin-top: vh(60);
        margin-bottom: vh(60);
        height:vh(200);//改成自适应的
        //绝对，为了使顶部内容正常显示，不被search-bar遮挡
        width:vw(1290);
    }
    .bottom-left-1-bottom {
        // border: 3px solid #bda9bc;
        height:vh(260);//改成自适应的
        //绝对，为了使顶部内容正常显示，不被search-bar遮挡
        width:vw(1290);
        margin-bottom: vh(60);
        border-top: 1px dashed #797979;
    }
    .bottom-left-2 {
        // border: 3px solid #bda9bc;
        // height:vh(600);//改成自适应的
        //绝对，为了使顶部内容正常显示，不被search-bar遮挡
        width:vw(1290);
        float: left;
        z-index: 100;
    }
    .bottom-left-2-title {
        margin: vh(30) 0 0 vw(50);
        font-size: 35px;
    }
    .bottom-left-3 {
        // border: 3px solid #bda9bc;
        height:vh(700);//改成自适应的
        //绝对，为了使顶部内容正常显示，不被search-bar遮挡
        width:vw(1290);
        float: left;
        z-index: 100;
    }
    .img1 {
        border-radius:50%;
        margin: vh(30) 0 0 vw(300);
        float: left;
    }
    .title1 {
        font-size: 60px;
    }
    .title2 {
        font-size: 15px;
    }
    .title3 {
        font-size: 20px;
    }
    .title4 {
        font-size: 23px;
    }
    .text1 {
        vertical-align: bottom;
        font-size: 14px;
        line-height: 26px;
        margin-top: vw(16);
        color: #7F7F7F;
    }
    .bottom-right-title {
        margin: vh(10) 0 0 vw(30);
        font-size: 35px;
        border-bottom: 1px dashed #797979;
    }
    .scholar-list {
        margin: vh(10) 0 0 vw(40);
    }
    .scholars {
        // border: 3px solid #bda9bc;
        // height: vh(125);
        margin-bottom: vh(10);
        padding-bottom: vh(10);
        border-bottom: 1px solid #d7d7d7;
    }
    .img-scholar {
        // border: 3px solid #bda9bc;
        margin: vh(0) 0 0 vw(20);
        height: vh(90);
        width: vw(90);
        float: left;
        margin-top: vh(10);
    }
    .scholar-info {
        // border: 3px solid #bda9bc;
        margin: vh(10) 0 0 vw(10);
    }
    .scholar-info1 {
        font-size: 30px;
        font-weight: 500;
        color: #3c3c3c;
    }
    .scholar-info2 {
        margin-top: vh(3);
        font-size: 15px;
        color: #8c8c8c;
    }

    #pie1 {
        // border: 3px solid #bda9bc;
        width: vw(200);
        height: vh(200);
        margin-left: vw(50);
        float: left;
    }
    #pie2 {
        // border: 3px solid #bda9bc;
        width: vw(200);
        height: vh(200);
        margin-left: vw(50);
        float: left;
    }
    #pie3 {
        // border: 3px solid #bda9bc;
        width: vw(200);
        height: vh(200);
        margin-left: vw(50);
        float: left;
    }
    #pie4 {
        // border: 3px solid #bda9bc;
        width: vw(200);
        height: vh(200);
        margin-left: vw(50);
        float: left;
    }
    .pie-num {
        // border: 3px solid #bda9bc;
        margin: vh(0) 0 0 vw(1050);
        padding-top: vh(60);
        background-color: rgba(255, 255, 255, 0);
        box-sizing: border-box;
        font-family: "华文中宋", sans-serif;
        font-size: 35px;
        color: #333333;
        text-align: left;
        line-height: normal;
    }
    #category1 {
        // border: 3px solid #bda9bc;
        width: vw(500);
        height: vh(200);
        margin-top: vh(60);
        margin-left: vh(90);
        float: left;
    }
    #category2 {
        // border: 3px solid #bda9bc;
        width: vw(500);
        height: vh(200);
        margin-top: vh(60);
        margin-left: vh(90);
        float: left;
    }
    .tabs {
        // border: 3px solid #bda9bc;
        // box-shadow: darkgrey 3px 3px 9px 1.3px ;
        margin-left: vw(50);
        margin-top: vh(60);
        margin-bottom: vh(60);
        width: vw(1200);
        // height: vh(1000);
    }
    .tab-name {
        color: #000; 
        font-size: 20px;
    }
    .tab-num {
        color: #8c8c8c; 
        font-size: 10px;
        margin-left: vw(10);
        margin-top: vh(10);
    }
    // .selector {
    //     // border: 3px solid #bda9bc;
    //     // width: vw(200);
    //     // height: vh(200);
    // }
    .bottom-left-3-left {
        // border: 3px solid #bda9bc;
        margin-left: vw(50);
        margin-top: vh(60);
        margin-right: vh(60);
        width: vw(570);
        height: vh(200);
        float: left;
    }
    .bottom-left-3-right {
        // border: 3px solid #bda9bc;
        margin-left: vw(50);
        margin-top: vh(60);
        width: vw(570);
        height: vh(200);
        float: left;
    }
    .journal {
        border: 1px solid #908d90;
        margin-bottom: vh(10);
    }
    // /
    // /
    .similar-paper-title {
        font-size: 18px;
        margin-top: vh(15);
        margin-left: vw(10);
        margin-bottom: 0;
        color: #3366CC;
    } 
    .similar-paper-abstract {
        font-size: 12px;
        margin-top: vh(5);
        margin-left: vw(10);
        margin-bottom: 0;
        color: #7F7F7F;
        line-height: vh(35);
    }

    .similar-paper-author-and-source {
        font-size: 12px;
        margin-top: vh(10);
        margin-left: vw(10);
        margin-bottom: 0;
        color: #3366CC;
    }

    .similar-paper-citations-and-year{
        font-size: 12px;
        margin-top: vh(10);
        margin-left: vw(10);
        margin-bottom: vh(20);
        color: #7F7F7F;
    }
    // /
    // /
</style>