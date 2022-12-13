<template>
  <div id="page">
    <div class="left-side"></div>
    <div class="right-side"></div>
    <div class="mid-part">
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
                <v-row>
                  <v-col cols="10">
                    <div class="name ma-1 text-h5">
                      <p class="text-left name">&nbsp;&nbsp;{{ Name }}</p>
                    </div>
                  </v-col>
                  <v-col cols="1" v-if="!isMyPage && scholarId != userId">
                    <v-btn
                      class="mx-2"
                      fab
                      dark
                      small
                      color="primary"
                      @click="subscribeScholar()"
                    >
                      <v-icon dark> mdi-account-plus </v-icon>
                      <v-snackbar
                        v-model="unlog"
                        :timeout="2000"
                        color="red accent-2"
                      >
                        用户未登录
                        <template v-slot:action="{ attrs }">
                          <v-btn
                            color="blue"
                            text
                            v-bind="attrs"
                            @click="snackbar = false"
                          >
                            Close
                          </v-btn>
                        </template>
                      </v-snackbar>
                    </v-btn>
                  </v-col>
                </v-row>
                <div class="faculty ma-1 text-h6">
                  <p class="text-left faculty">{{ Faculty }}</p>
                </div>
                <div class="intro ma-1 text-body-1">
                  <p class="text-left pa-1 intro">
                    {{ intro }}
                  </p>
                </div>
                <div class="ma-1" v-if="showEmail">
                  <p class="text-left faculty">Email:&nbsp; {{ Email }}</p>
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
                <p>·主要研究领域：</p>
              </div>
              <v-row class="mt-2" dense>
                <v-col
                  v-for="item in MainField"
                  :key="item.index"
                  cols="6"
                  class="pa-auto"
                >
                  <p class="item-title">{{ item.title }}</p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8">
          <v-card elevation="0" flat>
            <v-card-title class="text-left"
              >论文共{{ recommandPaper.length }}篇</v-card-title
            >
            <v-card-subtitle>
              <v-row dense>
                <v-col cols="12">
                  <v-btn-toggle
                    v-model="toggleOne"
                    tile
                    color="primary"
                    group
                    mandatory
                  >
                    <v-btn value="0" depressed elevation="1" small
                      >按时间排序</v-btn
                    >
                    <v-btn value="1" depressed elevation="1" small
                      >按引用量排序</v-btn
                    >
                  </v-btn-toggle>
                </v-col>
                <v-col cols="12">
                  <v-btn-toggle
                    v-model="toggleTwo"
                    tile
                    color="primary"
                    group
                    mandatory
                  >
                    <v-btn value="0" depressed elevation="1" small>升序</v-btn>
                    <v-btn value="1" depressed elevation="1" small>降序</v-btn>
                  </v-btn-toggle>
                </v-col>
                <v-col cols="12">
                  <v-btn-toggle
                    v-model="toggleThree"
                    tile
                    color="primary"
                    group
                    mandatory
                  >
                    <v-btn value="0" depressed elevation="1" small>论文</v-btn>
                    <v-btn value="1" depressed elevation="1" small>专利</v-btn>
                    <v-btn value="2" depressed elevation="1" small>项目</v-btn>
                  </v-btn-toggle>
                </v-col>
              </v-row>
            </v-card-subtitle>
            <v-card-text id="PaperList">
              <div v-if="toggleThree == 0">
                <v-card
                  class="home_focus_card_2"
                  v-for="item in recommandPaper"
                  :key="item.index"
                >
                  <v-list-item-title class="headline_2">{{
                    item.title
                  }}</v-list-item-title>
                  <v-list-item-subtitle class="subtitle_recommand_1">{{
                    item.author_name
                  }}</v-list-item-subtitle>
                  <div class="recommand_book">Abstract：</div>
                  <div class="recommand_book_2" v-if="item.abstract !== 'null'">
                    {{ item.abstract }}
                  </div>
                  <div class="recommand_book_3" v-if="item.abstract === 'null'">
                    -
                  </div>
                  <div style="display: flex">
                    <div class="quote_recommand_fa">
                      <p class="quote_recommand_0">引用量：</p>
                      <p class="quote_recommand">{{ item.n_citation }}</p>
                    </div>
                    <div
                      class="recommand_icon_1"
                      @click="into_detail(item.url[0])"
                    >
                      <v-icon color="#232f3d" class="recommand_icon_3" medium v-if="item.pdf">
                        mdi-earth
                      </v-icon>
                      <a class="quote_recommand_1" v-if="item.pdf" :href="item.pdf">原文链接</a>
                    </div>
                    <v-icon color="#232f3d" medium class="recommand_icon_2">
                      mdi-star
                    </v-icon>
                  </div>
                </v-card>
              </div>
              <div v-else-if="toggleThree == 1">
                <v-card
                  class="home_focus_card_2"
                  v-for="item in recommandPatent"
                  :key="item.id"
                >
                  <v-list-item-title class="headline_2">{{
                    item.article_name
                  }}</v-list-item-title>
                  <v-list-item-subtitle class="subtitle_recommand_1">{{
                    item.author
                  }}</v-list-item-subtitle>
                  <div class="recommand_book">{{ item.book }}</div>
                  <div class="quote_recommand">
                    <div>
                      <p class="font-weight-black">
                        Number of citation：{{ item.quote_num }}
                      </p>
                    </div>
                  </div>
                  <div class="recommand_icon_fa">
                    <img src="@/assets/quote.png" class="recommand_icon_1" />
                    <img src="@/assets/art_sc.png" class="recommand_icon_2" />
                  </div>
                </v-card>
                <v-snackbar
                  v-model="showSnackBar"
                  :timeout="2000"
                  color="red accent-2"
                >
                  专利列表加载失败
                  <template v-slot:action="{ attrs }">
                    <v-btn
                      color="blue"
                      text
                      v-bind="attrs"
                      @click="snackbar = false"
                    >
                      Close
                    </v-btn>
                  </template>
                </v-snackbar>
              </div>
              <div class="max-width">
                <v-pagination
                  v-model="page"
                  class="my-4"
                  :length="PaginationLength"
                  :total-visible="7"
                  @click="this.$vuetify.goTo('#PaperList')"
                ></v-pagination>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card min-height="420">
            <v-card-title class="text-left">学者关系图：</v-card-title>
            <v-card-text>
              <div style="height: 350px; width: 100%">
                <scholar-relation-vue :id="scholarId" />
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import ScholarRelationVue from "./ScholarRelation.vue";
import qs from "qs";
export default {
  name: "ScholarPage",
  data() {
    return {
      SelfImage: "https://cdn.vuetifyjs.com/images/john.jpg",
      Name: "",
      Faculty: "北京航空航天大学 软件学院",
      Email: "tjyfxiao@126.com",
      PaginationLength: 15,
      page: 1,
      size: 10,
      scholarId: 0,
      charId: "",
      unlog: false,
      scholarName: "Azadeh Amin",
      intro: "",
      userId: window.localStorage.getItem("user_id"),
      showEmail: true,
      isMyPage: false,
      MainField: [
        {
          index: 1,
          title: "人工智能",
        },
        {
          index: 2,
          title: "图像处理",
        },
        {
          index: 3,
          title: "模式识别",
        },
        {
          index: 4,
          title: "土豆种植",
        },
        {
          index: 5,
          title: "吃饭睡觉",
        },
        {
          index: 6,
          title: "啦啦啦啦",
        },
      ],
      recommandPaper: [],
      recommandPatent: [
        {
          article_name:
            "Curvature-Adaptive Meta-Learning for Fast Adaptation to Manifold Data",
          author: "Zhi Gao,Yuwei Wu,Mehrtash T Harandi,Yunde Jia",
          book: "IEEE Transactions on Pattern Analysis and Machine Intelligence (TPAMI) （2022）",
          quote_num: 0,
          url: "",
        },
        {
          article_name: "Variational Deep Image Restoration",
          author: "Jae Woong Soh, Nam Ik Cho",
          book: "Computer Science、CCF A",
          quote_num: 0,
          url: "",
        },
      ],
      toggleOne: 0,
      toggleTwo: 0,
      toggleThree: 0,
      showSnackBar: false,
    };
  },
  methods: {
    loadScholarInfo() {
      this.$axios({
        method: "post",
        url: "/get_scholar_by_id",
        data: qs.stringify({
          id: this.scholarId,
        }),
      })
        .then((response) => {
          this.MainField = [];
          this.Name = response.data.name1;
          this.Faculty = response.data.org;
          this.Email = response.data.e_mail;
          this.charId = response.data.char_id;
          let iarr = response.data.interests.split(",");
          for (let i = 1; i <= 6; i++)
            this.MainField.push({
              index: i,
              title: iarr[i - 1],
            });
          if (this.Email == null) this.showEmail = false;
          this.loadScholarPapers();
        })
        .catch((e) => console.log(e));
    },
    subscribeScholar() {
      let user_name = window.localStorage.getItem("user_name");
      if (user_name == 0 || user_name == null || user_name == "")
        this.unlog = true;
      else
        this.$axios({
          method: "post",
          url: "/subscribe_scholar",
          data: qs.stringify({
            username: user_name,
            scholar_id: this.scholarId,
          }),
        })
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
    },
    loadScholarIntro() {
      this.$axios({
        method: "post",
        url: "/get_scholar_introduction",
        data: qs.stringify({
          id: this.scholarId,
        }),
      })
        .then((res) => (this.intro = res.data.intro))
        .catch((e) => console.log(e));
    },
    loadScholarPapers(npage = 0) {
      this.recommandPaper = [];
      console.log(this.charId);
      this.$axios({
        method: "post",
        url: "/search",
        data: {
          search_word: [this.charId],
          search_type: ["3"],
          search_logic: [],
          page: npage,
          size: 6,
          order_type: this.toggleOne + 1,
          order: this.toggleTwo,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          this.PaginationLength = response.data.n_page;
          let papers = response.data.papers;
          let len = Math.min(papers.length, 6);
          for (let i = 0; i < len; i++) {
            this.recommandPaper.push({
              index: i,
              pdf: papers[i].pdf,
              abstract: papers[i].abstract,
              title: papers[i].title,
              author_name: this.to_string(papers[i].author_name),
              n_citation: papers[i].n_citation,
              venue: papers[i].venue,
            });
          }
          console.log(response.data.papers);
        })
        .catch((error) => {
          this.showSnackBar = true;
          console.log(error);
        });
      console.log(this.recommandPaper);
    },
    loadScholarPatent(npage = 1) {
      this.recommandPatent = [];
      let sort = this.toggleTwo === 1 ? "year" : "citation";
      let year = this.toggleOne === 1 ? 0 : 1;
      this.$axios({
        method: "post",
        url: "/get_p_number_of_scholar",
        data: qs.stringify({
          scholar_id: this.scholarId,
        }),
      }).then((response) => {
        this.PaginationLength = Math.ceil(
          (this.toggleOne === 1
            ? response.data.patent_number
            : response.data.patent_number_10) / 6
        );
      });
      this.$axios({
        method: "post",
        url: "/get_patents_by_scholar",
        data: qs.stringify({
          scholar_id: this.scholarId,
          page: npage,
          size: 6,
          order: sort,
          year: year,
        }),
      })
        .then((response) => {
          console.log("patent");
          for (let x = 0; x < 6; x++)
            this.recommandPatent.push({
              article_name: response.data[x].title,
              author: response.data[x].author,
              book: response.data[x].source,
              quote_num: response.data[x].citation,
              url: response.data[x].url,
            });
        })
        .catch((error) => {
          this.showSnackBar = true;
          console.log(error);
        });
    },
    to_string(strs) {
      let retstr = "";
      let len = strs.length;
      for (let i = 0; i < len; i++) {
        retstr += strs[i];
        retstr += ",";
      }
      return retstr.substring(0, retstr.length - 2);
    },
  },
  watch: {
    page: {
      handler(nval, oval) {
        console.log(oval + "->" + nval);
        if (nval !== oval && this.charId != "")
          switch (this.toggleThree) {
            case "0":
              loadScholarPapers(nval);
              break;
            case "1":
              loadScholarPatent(nval);
              break;
            case "2":
              break;
          }
      },
    },
    toggleOne: {
      handler(nval, oval) {
        console.log(oval + "->" + nval);
        if (nval !== oval && this.charId != "")
          switch (this.toggleThree) {
            case "0":
              this.loadScholarPapers();
              break;
            case "1":
              this.loadScholarPatent();
              break;
            case "2":
              break;
          }
      },
    },
    toggleTwo: {
      handler(nval, oval) {
        if (nval !== oval && this.charId != "")
          switch (this.toggleThree) {
            case "0":
              this.loadScholarPapers();
              break;
            case "1":
              this.loadScholarPatent();
              break;
            case "2":
              break;
          }
      },
    },
    toggleThree: {
      handler(nval, oval) {
        if (nval !== oval && this.charId != "")
          switch (nval) {
            case "0":
              console.log("change to paper");
              this.loadScholarPapers();
              break;
            case "1":
              console.log("change to patent");
              this.loadScholarPatent();
              break;
            case "2":
              break;
            default:
              console.log("nothing happened");
          }
        console.log(oval + "->" + nval);
      },
    },
  },
  beforeMount() {
    this.scholarId = parseInt(this.$route.query.id);
  },
  mounted() {
    this.loadScholarInfo();
    this.loadScholarIntro();
  },
  components: { ScholarRelationVue },
};
</script>

<style lang="scss" scoped>
#pcard {
  height: vh(250);
}
#name {
  margin-top: vw(50);
}
#page {
  min-height: 100%;
}
.left-side {
  position: fixed;
  top: -150px;
  left: 0;
  background-color: rgb(249, 249, 249);
  height: vh(1480);
  width: vw(300);
}
.right-side {
  position: fixed;
  top: -150px;
  right: 0;
  background-color: rgb(249, 249, 249);
  height: vh(1480);
  width: vw(300);
}
.mid-part {
  padding-top: 40px;
  width: vw(1300);
  padding-left: vw(20);
  padding-right: vw(20);
  margin-left: vw(300);
}
.name {
  font-family: "Times New Roman", "Source Han Sans CN Normal";
}
.faculty {
  font-family: "Times New Roman", STZhongsong;
  font-size: medium;
}
.intro {
  font-family: Georgia, "Source Han Sans CN Normal";
}
.item-title {
  font-size: 18px;
  font-family: "Courier New", Courier, "PingFang SC";
}
p.item-title:hover {
  color: rgb(89, 126, 175);
}
.main-field-title {
  font-size: 23px;
  font-family: "Source Han Sans CN Medium";
}
.home_focus_card_2 {
  margin-top: vh(40);
  width: vw(1190);
  padding-top: 10px;
  padding-bottom: 0.5px;
  padding-right: vw(20);
}
.headline_2 {
  margin-left: vw(20);
  font-size: vw(25);
  font-family: "Source Han Sans CN Normal", sans-serif;
}
.headline_2:hover {
  color: rgb(89, 126, 175);
}
.subtitle_recommand_1 {
  margin-left: vw(20);
  font-family: "Source Han Sans CN Normal", sans-serif;
}
.recommand_book {
  color: #455A64;
  margin-left: vw(20);
  margin-top: vh(15);
  margin-right: vw(20);
  font-weight: bold;
  font-family: "optima", sans-serif;
}
.recommand_book_2 {
  color: #455A64;
  margin-left: vw(20);
  margin-top: vh(5);
  margin-right: vw(20);
  font-family: "optima", sans-serif;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden; 
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
}
.recommand_book_3 {
  color: #455A64;
  margin-left: vw(20);
  margin-top: vh(5);
  margin-right: vw(20);
  font-family: "SourceHanSerifCN", sans-serif;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden; 
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
}
.quote_recommand_fa {
  width: vw(610);
  margin-bottom: vh(10);
  margin-top: vh(20);
}
.quote_recommand {
  margin-left: vw(5);
  margin-top: vh(17);
  display: flex;
  font-family: "optima", sans-serif;
  font-weight: bolder;
  font-size: vw(19);
}
.quote_recommand_0 {
  margin-left: vw(20);
  margin-top: vh(15);
  display: flex;
  font-family: "SourceHanSerifCN", sans-serif;
  font-weight: bolder;
  font-size: vw(19);
  float: left;
}
.quote_recommand_1 {
  margin-left: vw(5);
  display: flex;
  width: vw(80);
  font-family: "SourceHanSerifCN", sans-serif;
  font-size: vw(17);
  margin-top: vh(44);
  text-decoration: none;
}
.recommand_icon_fa {
  display: flex;
  margin-left: vw(1130);
}
.recommand_icon_1 {
  display: flex;
}
.recommand_icon_2 {
  width: vw(36);
  margin-top: vh(40);
  margin-left: vw(40);
  margin-bottom: vh(30);
}
.recommand_icon_3 {
  margin-top: vh(17);
}
.scholar-relation {
  font-size: 23px;
  font-family: "Source Han Sans CN Medium";
}
</style>
