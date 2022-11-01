<template>
    <div class="home-page">
        <div class="page-top">
            <!-- {{ imgSrc }} -->
            <v-img
                class="img1"
                max-height="150"
                max-width="150"
                :src="imgSrc"
            ></v-img>
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
        <v-divider
            inset
        ></v-divider>
        <div class="page-bottom">
            <div class="bottom-left">
                <div class="bottom-left-1">
                </div>
                
                <div class="bottom-left-2">
                    <v-divider
                        inset
                    ></v-divider>
                </div>
                <div class="bottom-left-3">
                    <v-divider
                        inset
                    ></v-divider>
                </div>
            </div>
            <div class="bottom-right">
                <v-divider
                    inset
                    vertical
                ></v-divider>
            </div>
        </div>
    </div>
</template>
<script>
import {defineComponent, reactive, ref} from 'vue';
export default defineComponent({
    data() {
        return {
            imgSrc: require("@/assets/profilePhoto.png"),
            institutionName: "土豆研究所",
            institutionLocation: "野比大雄的院子",
            num: "123",
            rangeLow: "1111",
            rangeHigh: "2232",
            infoDetail: "    土豆，上帝赐予人类最宝贵的礼物，世界上最完美的事物，土豆丝好吃，土豆片好吃，土豆块好吃，土豆泥好吃，炸着吃烤着吃蒸着吃煎着吃都好吃，薯条好吃，薯饼好吃，炖肉好吃，加孜然好吃，蘸辣椒好吃，焗芝士好吃，卷饼里好吃，怎么样都好吃，哪怕整个煮熟了撒盐都好吃，除了发芽吃了会死，没有任何缺陷。\n    发芽吃了会死是人类的缺陷，土豆是完美的。",
        }
    },
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
        height:vh(250);//改成自适应的
        //绝对，为了使顶部内容正常显示，不被search-bar遮挡
        width:vw(1720);
    }
    .page-top-info {
        // border: 3px solid #ff2fff;
        margin-left: vw(60);
        height:vh(250);//改成自适应的
        //绝对，为了使顶部内容正常显示，不被search-bar遮挡
        width:vw(400);
        float: left;
    }
    .page-top-detail {
        // border: 3px solid #ff2fff;
        margin-left: vw(50);
        height:vh(250);//改成自适应的
        //绝对，为了使顶部内容正常显示，不被search-bar遮挡
        width:vw(400);
        float: left;
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
        height:vh(1300);//改成自适应的
        //绝对，为了使顶部内容正常显示，不被search-bar遮挡
        width:vw(410);
        float: right;
    }
    .bottom-left-1 {
        // border: 3px solid #bda9bc;
        height:vh(400);//改成自适应的
        //绝对，为了使顶部内容正常显示，不被search-bar遮挡
        width:vw(1290);
        float: left;
        z-index: 100;
    }
    .bottom-left-2 {
        // border: 3px solid #bda9bc;
        height:vh(600);//改成自适应的
        //绝对，为了使顶部内容正常显示，不被search-bar遮挡
        width:vw(1290);
        float: left;
        z-index: 100;
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
        font-size: 16px;
        margin-top: vw(16);
    }
</style>