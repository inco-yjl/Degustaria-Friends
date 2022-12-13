<template>
    <div class="home-page">
        <div class="page-top">
            <div class="page-top-info">
                <div class="title1">{{ institutionName }}</div>
                <div v-if="wiki !== null" class="title3" @click="clkWiki">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -6 24 22" width="20" fill="currentColor"><path d="M19.857.021H15.875V.708h.398c.311 0 .592.161.751.431a.88.88 0 0 1 .016.872l-4.283 7.93-1.95-4.69 1.836-3.402A2.165 2.165 0 0 1 14.548.708h.217V.02h-4.112V.708h.398c.311 0 .592.161.75.431a.88.88 0 0 1 .017.872l-1.333 2.467-1.188-2.856a.654.654 0 0 1 .059-.62A.642.642 0 0 1 9.9.708h.435V.02H5.467V.708h.194c.909 0 1.723.546 2.074 1.391L9.49 6.32 7.535 9.942l-3.46-8.32a.654.654 0 0 1 .059-.62.642.642 0 0 1 .544-.294H5.276V.02H0V.708h.439c.908 0 1.723.546 2.074 1.391l3.988 9.591a.446.446 0 0 0 .804.042l.52-.964 1.986-3.676 1.912 4.598a.446.446 0 0 0 .804.041l.52-.963 4.819-8.92A2.165 2.165 0 0 1 19.77.709h.217V.02h-.13z"></path></svg>
                     {{ wiki }} 
                </div>
                <div v-if="web !== null" class="title3" @click="clkWeb">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 22" width="20" fill="currentColor"><path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0 2C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z"></path><path d="M10 18c.448 0 1.119-.568 1.747-1.823C12.532 14.607 13 12.392 13 10c0-2.392-.468-4.607-1.253-6.177C11.119 2.568 10.447 2 10 2c-.448 0-1.119.568-1.747 1.823C7.468 5.393 7 7.608 7 10c0 2.392.468 4.607 1.253 6.177C8.881 17.432 9.553 18 10 18zm0 2c-2.761 0-5-4.477-5-10S7.239 0 10 0s5 4.477 5 10-2.239 10-5 10z"></path><path d="M2 12h16v2H2v-2zm0-6h16v2H2V6z"></path></svg>
                     {{ web }} 
                </div>
            </div>
            <div class="page-top-detail">
                <div v-if="infoDetail !== null" class="text1" style="white-space: pre-wrap;">{{ infoDetail }}</div>
            </div>
        </div>
        <!-- <v-divider
        ></v-divider> -->
        <div class="page-bottom">
            <v-card
                class="home_focus_card"
                v-for="item in focus_people"
                :key="item.id"
            >
                <v-list-item>
                <div class="scholer_icon_1">
                    <div class="head_style_font" v-if="item.icon.length === 0">
                    {{ item.author_name.charAt(0) }}
                    </div>
                    <div class="icon-div" v-else><img :src="item.icon" /></div>
                </div>
                <v-list-item-content>
                    <v-list-item-title class="headline_fa">{{
                    item.author_name
                    }}</v-list-item-title>
                    <div style="display: flex">
                    <v-list-item-subtitle class="headline_focus_1"
                        >H-index：{{ item.h_index }}</v-list-item-subtitle
                    >
                    <v-list-item-subtitle class="headline_focus_1"
                        >论文数：{{ item.article_num }}</v-list-item-subtitle
                    >
                    <v-list-item-subtitle class="headline_focus_1"
                        >引用数：{{ item.quote_num }}</v-list-item-subtitle
                    >
                    </div>
                </v-list-item-content>
                </v-list-item>

                <div v-if="item.domains !== null" class="focus_research_area" style="display: flex">
                研究领域：
                    <div v-for="domain in item.domains" :key="domain">
                        <div class="focus_research_area_item">{{ domain }}</div>
                    </div>
                </div>
            </v-card>
        </div>
    </div>
</template>
<script>
import {defineComponent, reactive, ref} from 'vue';
import * as echarts from 'echarts';
import qs from "qs";
import router from '@/router';
export default defineComponent({
    data() {
        return {
            institutionName: "",
            institutionId: 192096,
            web: null,
            wiki: null,
            infoDetail: null,
            scholars: [],
            focus_people: [
                // {
                //     author_name: "NAME PANYUYI",
                //     h_index: 70,
                //     icon: "",
                //     article_num: 80,
                //     quote_num: 10809,
                //     domains: [computer ,science],
                // },
                // {
                //     author_name: "YJL",
                //     h_index: 100,
                //     icon: "https://i.imgtg.com/2022/05/08/zDhaG.jpg",
                //     article_num: 180,
                //     quote_num: 18317,
                // },
                // {
                //     author_name: "软工二",
                //     h_index: 100,
                //     icon: "",
                //     article_num: 180,
                //     quote_num: 18317,
                // },
            ],
        }
    },
    mounted() {
        // 自动刷新数据
        this.$nextTick(() => {
            setTimeout(() => {
                this.initInfo();
            }, 500);
        });
        window.onresize = () => {
            return (() => {
                this.$nextTick(() => {
                });
            })();
        };
    },
    methods: {
        initInfo() {
            this.searchOrg();
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
                url: "/get_org",
                data: qs.stringify({
                    org_id: this.institutionId
                }),
            })
            .then((res) => {
                console.log(res);
                this.institutionName = res.data.name;
                this.institutionId = res.data.id;
                // if ( res.data[0].introduction === "null" ) {
                //     this.infoDetail = null;
                // } else {
                //     this.infoDetail = res.data[0].introduction;
                // }
                if ( res.data.wikipage === "null" ) {
                    this.wiki = null;
                } else {
                    this.wiki = res.data.wikipage;
                }
                if ( res.data.url === "null" ) {
                    this.web = null;
                } else {
                    this.web = res.data.url;
                }

                this.getScholarsByOrg(this.institutionName);
                console.log("searchOrg");
            })
            .catch((err) => {
                console.error(err);
            });
        },
        getScholarsByOrg(name) {
            // console.log("getScholarsByOrg");
            this.$axios({
                method: "post",
                url: "/get_scholars_by_org",
                data: qs.stringify({
                    name: name,
                    page: 1,
                    size: 100,
                }),
            })
            .then((res) => {
                console.log(res);
                this.focus_people = [];
                for (var i=0; i<res.data.length ; i++) {
                    var aScholar = {};
                    aScholar.author_name = res.data[i].name1;
                    aScholar.h_index = res.data[i].h_index;
                    aScholar.icon = "";
                    aScholar.article_num = "";
                    aScholar.quote_num = res.data[i].citation;

                    if ( res.data[i].interests === "null" ) {
                        aScholar.domains = null;
                    } else {
                        var strList = res.data[i].interests.split(",");
                        // console.log(strList)
                        aScholar.domains = [];
                        for (var j=0; j<strList.length && j<5; j++) {
                            aScholar.domains[j] = strList[j];
                        }
                        // aScholar.domains = strList;
                    }

                    this.focus_people.push(aScholar);
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

        clkWiki() {
            console.log(this.wiki)
            window.open(this.wiki,"_blank");
        },
        clkWeb() {
            console.log(this.web)
            window.open(this.web,"_blank");
        },
    }
});
</script>

<style scoped lang="scss">


.home_focus_card {
    // border: 3px solid #1f22ff;
  margin-left: vw(255);
  margin-top: vh(40);
  width: vw(1190);
  padding-bottom: vh(20);
}
.scholer_icon_1 {
  box-shadow: 0 0 1px 1px #CFD8DC;
  width: vw(60);
  height: vw(60);
  border-radius: 100px;
  margin-right: vw(20);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit:fill
  }
}
.head_style_font {
  font-family: YouSheBiaoTiHei;
  color: #232f3d;
  font-size: vw(34);
}
.icon-div {
  position: relative;
  float:left;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}
.headline_fa {
  font-family: "Source Han Sans CN Medium", sans-serif;
  font-size: vw(27);
}
.headline_focus_1 {
  margin-top: vh(5);
  font-family: "Source Han Sans CN Normal", sans-serif;
}
.focus_research_area {
  margin-left: vw(20);
  font-family: "Source Han Sans CN Normal", sans-serif;
  font-weight: 500;
  font-size: vw(18);
  margin-top: vh(20);
}
.focus_research_area_item {
    background-color: #e8eaf6;
    margin-right: vw(10);
    margin-left: vw(5);
    font-family: "Source Han Sans CN Normal", sans-serif;
    padding: vw(5);
}








    // 
    // 
    // 
    .home-page {
        // background-color:yellow;
        // height:vh(3000);//改成自适应的
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
        // height:vh(2000);//改成自适应的
        //绝对，为了使顶部内容正常显示，不被search-bar遮挡
        width:vw(1720);
        margin-bottom: vw(100);
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
        color: #646262;
        cursor: pointer;
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