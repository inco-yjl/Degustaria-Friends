<template>
  <v-container id="page">
    <v-row no-gutters>
      <v-col id="pcard" cols="8">
        <div class="pcard ma-2 pa-1">
          <v-row no-gutters>
            <v-col cols="2">
              <div style="margin: 0 auto; text-align: center">
                <v-avatar color="blue darken-2" size="100" class="mt-2 mr-2">
                  <v-img :src="SelfImage" alt="self-image"></v-img>
                </v-avatar>
              </div>
            </v-col>
            <v-col class="ml-2">
              <div class="ma-1 text-h5">
                <p class="name text-left">&nbsp;&nbsp;{{ Name }}</p>
              </div>
              <div class="ma-1 text-h6">
                <p class="faculty text-left">{{ Faculty }}</p>
              </div>
              <div class="ma-1 text-body-1">
                <p class="intro text-left pa-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Placeat tempora eligendi nihil ex velit ipsam fuga dolorum
                  molestias doloribus. Voluptas saepe nemo ad pariatur doloribus
                  nesciunt consequuntur a, quam fuga!
                </p>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col id="related pcard" cols="4">
        <v-row>
          <v-col cols="1" id="pcard">
            <v-divider vertical></v-divider>
          </v-col>
          <v-col>
            <div class="mt-2 text-h6">
              <p class="main-field-title">·主要研究领域：</p>
            </div>
            <v-row class="mt-2" dense>
              <v-col
                v-for="item in MainField"
                :key="item.id"
                cols="5"
                class="pa-auto"
              >
                <p class="item-title">{{ item.title }}</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="mx-12">
      <v-col cols="8">
        <v-card elevation="7">
          <v-card-title class="text-left main-field-title">论文共{{ recommand_content.length }}篇</v-card-title>
          <v-card-subtitle>
            <v-row dense>
              <v-col cols="12">
                <v-btn-toggle v-model="toggleOne" tile color="primary" group mandatory>
                  <v-btn value="inTime" depressed elevation="1" small>按时间排序</v-btn
                  >
                  <v-btn value="inReference" depressed elevation="1" small>按引用量排序</v-btn
                  >
                </v-btn-toggle>
              </v-col>
              <v-col cols="12">
                <v-btn-toggle v-model="toggleOne" tile color="primary" group mandatory>
                  <v-btn value="All" depressed elevation="1" small>全部</v-btn>
                  <v-btn value="Recent" depressed elevation="1" small>最近</v-btn>
                </v-btn-toggle>
              </v-col>
            </v-row>
          </v-card-subtitle>
          <v-card-text>
            <div>
                <v-card
                  class="home_focus_card_2"
                  v-for="item in recommand_content"
                  :key="item.id"
                >
                  <v-list-item-title class="headline_2">{{item.article_name}}</v-list-item-title>
                  <v-list-item-subtitle class="subtitle_recommand_1">{{item.author}}</v-list-item-subtitle>
                  <div class="recommand_book">{{item.book}}</div>
                  <div class="quote_recommand">
                    <div>
                      <p class="font-weight-black">Number of citation：{{item.quote_num}}</p>
                    </div>
                    <div style="margin-left: 20px;">
                      <p class="font-weight-black">Number of visits：{{item.page_view}}</p>
                    </div>
                  </div>
                  <div class="recommand_icon_fa">
                    <img src="@/assets/quote.png" class="recommand_icon_1" />
                    <img src="@/assets/art_sc.png" class="recommand_icon_2" />
                  </div>
                </v-card>
              </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card elevation="6" min-height="420">
          <v-card-title class="scholar-relation text-left">学者关系图：</v-card-title>
          <v-card-text>
            <div style="height: 350px; width: 100%">
              <scholar-relation-vue/>
            </div>
          </v-card-text>
        </v-card>
        <!-- <div class="e-graph">
          <div id="chart" style="width: 100%; height:100%"></div>
        </div> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PaperShowVue from "./PaperShow.vue";
import ScholarRelationVue from "./ScholarRelation.vue";
export default {
  name: "ScholarPage",
  data() {
    return {
      SelfImage: "https://cdn.vuetifyjs.com/images/john.jpg",
      Name: "XYF",
      Faculty: "北京航空航天大学 软件学院",
      MainField: [
        {
          id: 1,
          title: "人工智能",
          link: "#",
        },
        {
          id: 2,
          title: "图像处理",
          link: "#",
        },
        {
          id: 3,
          title: "模式识别",
          link: "#",
        },
        {
          id: 4,
          title: "土豆种植",
          link: "#",
        },
        {
          id: 5,
          title: "吃饭睡觉",
          link: "#",
        },
        {
          id: 6,
          title: "啦啦啦啦",
          link: "#",
        },
      ],
      recommand_content: [
        {
          article_name: "Curvature-Adaptive Meta-Learning for Fast Adaptation to Manifold Data",
          author: "Zhi Gao,Yuwei Wu,Mehrtash T Harandi,Yunde Jia",
          book: "IEEE Transactions on Pattern Analysis and Machine Intelligence (TPAMI) （2022）",
          quote_num: 0,
          page_view: 0
        },
        {
          article_name: "Variational Deep Image Restoration",
          author: "Jae Woong Soh, Nam Ik Cho",
          book: "Computer Science、CCF A",
          quote_num: 0,
          page_view: 0
        }
      ],
      toggleOne: 0,
    };
  },
  components: { PaperShowVue, ScholarRelationVue },
};
</script>

<style lang="scss" scoped>
#pcard {
  height: vw(250);
}
#name {
  margin-top: vw(50);
}
#page {
  margin-top: 35px;
  min-height: 100%;
  border-left-style: solid;
  border-right-style: solid;
}
.name {
  font-family: 'Times New Roman', "Source Han Sans CN Normal";
}
.faculty {
  font-family: Serif, STZhongsong;
}
.intro {
  font-family: Georgia, "Source Han Sans CN Normal";
}
.item-title {
  font-size: 18px;
  font-family: 'Courier New', Courier, 'PingFang SC';
}
.item-title :hover {
  color: midnightblue;
}
.main-field-title {
  font-size: 23px;
  font-family: 'Source Han Sans CN Medium';
}
.home_focus_card_2 {
  margin-left: vw(20);
  margin-top: vh(40);
  width: vw(1010);
  padding-top: 10px;
}
.headline_2 {
  margin-left: vw(20);
  font-size: vw(25);
  font-family: "Source Han Sans CN Normal", sans-serif;
}
.subtitle_recommand_1 {
  margin-left: vw(20);
  font-family: "Source Han Sans CN Normal", sans-serif;
}
.recommand_book {
  color: #455A64;
  margin-left: vw(20);
  margin-top: vh(10);
  font-family: "Source Han Sans CN Normal", sans-serif;
}
.quote_recommand {
  margin-left: vw(20);
  margin-top: vh(15);
  display: flex;
  font-family: "Source Han Sans CN Normal", sans-serif;
}
.recommand_icon_fa {
  display: flex;
}
.recommand_icon_1 {
  margin-left: vw(900);
  width: vw(30);
  margin-bottom: vh(30);
}
.recommand_icon_2 {
  width: vw(30);
  margin-left: vw(25);
  margin-bottom: vh(30);
}
.scholar-relation {
  font-size: 23px;
  font-family: 'Source Han Sans CN Medium';
}
</style>
