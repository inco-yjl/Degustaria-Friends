<template>
  <div id="page">
    <div class="left-side"></div>
    <div class="right-side"></div>
    <div class="mid-part">
      <v-alert
        dense
        class="alert"
        dismissible
        border="left"
        elevation="2"
        v-if="snackbar2"
        type="success"
        >{{ text2 }}</v-alert
      >
      <v-alert
        dense
        class="alert"
        dismissible
        border="left"
        elevation="2"
        v-if="snackbar3"
        type="success"
        >{{ text3 }}</v-alert
      >
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
                      <p class="text-left name">{{ Name }}</p>
                    </div>
                  </v-col>
                  <v-col cols="1" v-if="!isMyPage && scholarId != userId">
                    <v-btn
                      class="scholar_icon_top"
                      fab
                      dark
                      small
                      color="primary"
                      @click="subscribeScholar()"
                    >
                      <v-icon dark v-if="!is_focus"> mdi-account-plus </v-icon>
                      <v-icon dark v-if="is_focus"> mdi-account-minus </v-icon>
                      <v-snackbar
                        v-model="unlog"
                        :timeout="2000"
                        color="red accent-2"
                      >
                        用户未登录
                        <template v-slot:action="{ attrs }">
                          <v-btn
                            color="white"
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
                <div class="faculty">
                  <p class="text-left faculty">机构：{{ Faculty }}</p>
                </div>
                <div style="display: flex;">
                  <p class="quote_scholar">引用量：{{citation}}</p>
                  <p class="quote_scholar_2">H-index：{{h_index}}</p>
                  <div class="sch_email" v-if="showEmail">
                    <p >Email：{{ Email }}</p>
                  </div>
                  <div class="sch_email" v-if="!showEmail">
                    <p >Email：无</p>
                  </div>
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
              <div class="main_research_head">
                <p>主要研究领域：</p>
              </div>
              <v-row class="main_research_mid" dense>
                <v-col
                  v-for="item in MainField"
                  :key="item.index"
                  cols="6"
                  class="main_research_item"
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
            <v-card-title class="scholar_article_head"
              v-if="toggleThree == 0"
              >论文共{{ recommandPaper.length }}篇</v-card-title
            >
            <v-card-title class="scholar_article_head"
              v-if="toggleThree == 1"
              >专利共{{ recommandPatent_num }}个</v-card-title
            >
            <v-card-title class="scholar_article_head"
              v-if="toggleThree == 2"
              >项目共{{ recommandProject_num }}个</v-card-title
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
                    <v-btn value=1 depressed elevation="1" small
                      >按时间排序</v-btn
                    >
                    <v-btn value=2 depressed elevation="1" small
                    v-if="toggleThree != 2"
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
                    <v-btn value=1 depressed elevation="1" small>升序</v-btn>
                    <v-btn value=0 depressed elevation="1" small>降序</v-btn>
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
                  class="home_focus_card_2_2"
                  v-for="item in recommandPaper"
                  :key="item.index"
                >
                  <v-list-item-title class="headline_2">{{
                    item.title
                  }}</v-list-item-title>
                  <v-list-item-subtitle class="subtitle_recommand_1">{{
                    item.author_name
                  }}</v-list-item-subtitle>
                  <v-list-item-subtitle class="subtitle_recommand_1_1">{{
                    item.year
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
                      v-if="item.pdf != 'null'"
                    >
                      <v-icon color="#232f3d" class="recommand_icon_3" medium v-if="item.pdf">
                        mdi-earth
                      </v-icon>
                      <a class="quote_recommand_1" :href="item.pdf">原文链接</a>
                    </div>
                    <div
                      class="recommand_icon_1"
                      v-else
                      @click="alert_none()"
                    >
                      <v-icon color="#232f3d" class="recommand_icon_3" medium >
                        mdi-earth
                      </v-icon>
                      <a class="quote_recommand_1">原文链接</a>
                    </div>
                    <v-icon color="#232f3d" medium class="recommand_icon_2">
                      mdi-star
                    </v-icon>
                  </div>
                </v-card>
              </div>
              <div v-else-if="toggleThree == 1">
                <v-card
                  class="home_focus_card_2_2"
                  v-for="item in recommandPatent"
                  :key="item.id"
                >
                  <v-list-item-title class="headline_2">{{
                    item.title
                  }}</v-list-item-title>
                  <v-list-item-subtitle class="subtitle_recommand_1">{{
                    item.author
                  }}</v-list-item-subtitle>
                  <v-list-item-subtitle class="subtitle_recommand_1_1">{{
                    item.apply_datetime
                  }}</v-list-item-subtitle>
                  <div class="recommand_book">Keyword：</div>
                  <div class="recommand_book_2" v-if="item.keyword !== 'null'">
                    {{ item.keyword }}
                  </div>
                  <div class="recommand_book_3" v-if="item.keyword === 'null'">
                    -
                  </div>
                  <div style="display: flex">
                    <div class="quote_recommand_fa">
                      <p class="quote_recommand_0">引用量：</p>
                      <p class="quote_recommand">{{ item.citation }}</p>
                    </div>
                    <div
                      class="recommand_icon_1"
                      @click="into_detail(item.url[0])"
                      v-if="item.pdf != 'null'"
                    >
                      <v-icon color="#232f3d" class="recommand_icon_3" medium >
                        mdi-earth
                      </v-icon>
                      <a class="quote_recommand_1" :href="item.pdf">原文链接</a>
                    </div>
                    <div
                      class="recommand_icon_1"
                      v-else
                      @click="alert_none()"
                    >
                      <v-icon color="#232f3d" class="recommand_icon_3" medium >
                        mdi-earth
                      </v-icon>
                      <a class="quote_recommand_1">原文链接</a>
                    </div>
                    <v-icon color="#232f3d" medium class="recommand_icon_2">
                      mdi-star
                    </v-icon>
                  </div>
                </v-card>
                <v-snackbar
                  v-model="showSnackBar"
                  :timeout="2000"
                  color="blue accent-2"
                >
                  暂无内容
                  <template v-slot:action="{ attrs }">
                    <v-btn
                      color="white"
                      text
                      v-bind="attrs"
                      @click="snackbar = false"
                    >
                      Close
                    </v-btn>
                  </template>
                </v-snackbar>
              </div>
              <div v-else-if="toggleThree == 2">
                <v-card
                  class="home_focus_card_2_2"
                  v-for="item in recommandProject"
                  :key="item.id"
                >
                  <v-list-item-title class="headline_2">{{
                    item.title
                  }}</v-list-item-title>
                  <v-list-item-subtitle class="subtitle_recommand_1">Director：{{
                    item.director
                  }}</v-list-item-subtitle>
                  <v-list-item-subtitle class="subtitle_recommand_1_1">{{
                    item.begin
                  }}——{{item.end}}</v-list-item-subtitle>
                  <div class="recommand_book">Participants：</div>
                  <div class="recommand_book_2" v-if="item.keyword !== 'null'">
                    {{ item.participant }}
                  </div>
                  <div class="recommand_book_3" v-if="item.keyword === 'null'">
                    -
                  </div>
                  <v-list-item-subtitle class="subtitle_recommand_1">Financial institution：{{
                    item.financial_institution
                  }}</v-list-item-subtitle>
                  <v-list-item-subtitle class="subtitle_recommand_5">Undertaking institution：{{
                    item.undertaking_institution
                  }}</v-list-item-subtitle>
                  <div style="display: flex">
                    <div
                      class="recommand_icon_1_5"
                      @click="into_detail(item.url[0])"
                      v-if="item.url != 'null'"
                    >
                      <a class="quote_recommand_1_5" :href="item.url">项目链接</a>
                    </div>
                    <div
                      class="recommand_icon_1_5"
                      v-else
                      @click="alert_none()"
                    >
                      <a class="quote_recommand_1">项目链接</a>
                    </div>
                  </div>
                </v-card>
                <v-snackbar
                  v-model="showSnackBar"
                  :timeout="2000"
                  color="blue accent-2"
                >
                  暂无内容
                  <template v-slot:action="{ attrs }">
                    <v-btn
                      color="white"
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
                  v-model="npage"
                  :length="PaginationLength"
                  :total-visible="7"
                  @input="pagination_getlist(toggleThree)"
                  class="pagr_index_123"
                ></v-pagination>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card min-height="420">
            <v-card-title class="scholor_union_pic">学者关系图：</v-card-title>
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
      citation: "",
      h_index: "",
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
          title: "-",
        }
      ],
      recommandPaper: [],
      recommandPatent: [],
      recommandPatent_num: 0,
      recommandProject: [],
      recommandProject_num: 0,
      toggleOne: 1,
      toggleTwo: 0,
      toggleThree: 0,
      showSnackBar: false,
      color: "",
      mode: "",
      snackbar2: false,
      text2: "订阅成功！",
      snackbar3: false,
      text3: "已取消订阅！",
      x: null,
      y: "top",
      is_focus: 0,
      username: "",
      npage: 1
    };
  },
  methods: {
    alert_none() {
      this.showSnackBar = true;
    },
    pagination_getlist(cnt) {
      if(cnt == 0) {
        this.loadScholarPapers();
      }
      else if(cnt == 1) {
        this.loadScholarPatent();
      }
      else {
        this.loadScholarProject();
      }
    },
    loadScholarInfo() {
      this.$axios({
        method: "post",
        url: "/get_scholar_by_id",
        data: qs.stringify({
          id: this.scholarId,
        }),
      })
        .then((response) => {
          console.log("field", response.data);
          this.Name = response.data.name1;
          this.Faculty = response.data.org == "null"? "-":response.data.org;
          this.Email = response.data.e_mail;
          this.charId = response.data.char_id;
          this.citation = response.data.citation;
          this.h_index = response.data.h_index;
          let iarr = response.data.interests.split(",");
          if(iarr[0] != "null") {
            this.MainField = [];
            for (let i = 1; i <= 6; i++)
            this.MainField.push({
              index: i,
              title: iarr[i - 1],
            });
          }
          if (this.Email == null) this.showEmail = false;
          this.loadScholarPapers();
        })
        .catch((e) => console.log(e));
    },
    subscribeScholar() {
      let user_name = window.localStorage.getItem("user_name");
      if (user_name == 0 || user_name == null || user_name == "") {
        this.unlog = true;
      }
      else {
        console.log("user_name", user_name);
        console.log("scholarId", this.scholarId);
        if(this.is_focus == 0) {
          this.$axios({
            method: "post",
            url: "/subscribe_scholar",
            data: qs.stringify({
              username: user_name,
              scholar_id: this.scholarId,
            }),
          })
          .then((res) => {
            console.log(res.data);
            this.snackbar2 = true;
            setTimeout(() => {
                this.snackbar2 = false;
              }, 1000);
            this.is_focus = 1;
          })
          .catch((err) => {
            console.log(err);
          });
        }
        else {
          this.$axios({
            method: "post",
            url: "/not_subscribe",
            data: qs.stringify({
              username: user_name,
              scholar_id: this.scholarId,
            }),
          })
          .then((res) => {
            console.log(res.data);
            this.snackbar3 = true;
            setTimeout(() => {
                this.snackbar3 = false;
            }, 1000);
            this.is_focus = 0;
          })
          .catch((err) => {
            console.log(err);
          });
        }
      }
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
    loadScholarPapers() {
      this.recommandPaper = [];
      console.log(this.charId);
      // let order_type_tmp = this.toggleOne;
      // console.log("order_type_tmp", order_type_tmp);
      // console.log("toggleTwo", this.toggleTwo);
      this.$axios({
        method: "post",
        url: "/search",
        data: {
          search_word: [this.charId],
          search_type: ["3"],
          search_logic: [],
          page: this.npage,
          size: 6,
          order_type: this.toggleOne-'0',
          order: this.toggleTwo-'0',
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
            year: papers[i].year,
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
    loadScholarPatent() {
      this.recommandPatent = [];
      let sort = this.toggleOne == 1 ? "year" : "citation";
      console.log(this.toggleOne, sort);
      this.$axios({
        method: "post",
        url: "/get_patents_by_scholar",
        data: qs.stringify({
          scholar_id: this.scholarId,
          page: this.npage,
          size: 6,
          order: sort,
          up: this.toggleTwo - '0',
        }),
      })
      .then((res) => {
        console.log("patent", res.data);
        this.PaginationLength = res.data.n_page;
        let len = res.data.res.length;
        this.recommandPatent_num = res.data.total;
        this.recommandPatent = res.data.res;
      })
      .catch((error) => {
        this.showSnackBar = true;
        console.log(error);
      });
    },
    loadScholarProject() {
      this.recommandProject = [];
      this.$axios({
        method: "post",
        url: "/get_projects_by_scholar",
        data: qs.stringify({
          scholar_id: this.scholarId,
          page: this.npage,
          size: 6,
          order: "year",
          up: this.toggleTwo - '0',
        }),
      })
      .then((res) => {
        console.log("project", res.data);
        this.PaginationLength = res.data.n_page;
        let len = res.data.res.length;
        this.recommandProject_num = res.data.total;
        this.recommandProject = res.data.res;
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
              loadScholarProject(nval);
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
              this.loadScholarProject();
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
              this.loadScholarProject();
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
              this.loadScholarProject();
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
    this.username = window.localStorage.getItem("user_name");
    let fd= new FormData;
    fd.append('username',this.username)
    fd.append('scholar_id',this.scholarId)
    this.$axios({
        method: "post",
        url: '/judge_subscribe',
        data: fd
    }).then((res) => {
      console.log("judge", res.data);
      if(res.data.errno == 1) {
        this.is_focus = 1;
      }
      else {
        this.is_focus = 0; //未关注
      }
    });
  },
  components: { ScholarRelationVue },
};
</script>

<style lang="scss" scoped>
#pcard {
  height: vh(250);
}
#name {
  margin-top: vh(100);
}
#page {
  min-height: 100%;
}
.scholar_icon_top {
  margin-top: vh(12);
  margin-left: vw(30);
}
.left-side {
  position: fixed;
  top: -150px;
  left: 0;
  background-color: rgb(249, 249, 249);
  height: vh(1480);
  width: vw(150);
}
.right-side {
  position: fixed;
  top: -150px;
  right: 0;
  background-color: rgb(249, 249, 249);
  height: vh(1480);
  width: vw(150);
}
.mid-part {
  padding-top: vh(80);
  width: vw(1500);
  padding-left: vw(20);
  padding-right: vw(20);
  margin-left: vw(170);
}
.name {
  font-family: "optima", "SourceHanSerifCN";
  margin-top: vh(20);
}
.faculty {
  font-family: "optima", SourceHanSerifCN;
  font-size: medium;
  margin-right: vw(10);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  margin-top: vh(5);
}
.sch_email {
  font-family: "optima", SourceHanSerifCN;
  font-size: medium;
  margin-right: vw(10);
  margin-top: vh(0);
  margin-left: vw(20);
}
.quote_scholar {
  font-family: "optima", SourceHanSerifCN;
  font-size: medium;
  margin-right: vw(10);
  margin-top: vh(0);
}
.quote_scholar_2 {
  font-family: "optima", SourceHanSerifCN;
  font-size: medium;
  margin-right: vw(10);
  margin-top: vh(0);
  margin-left: vw(20);
}
.intro {
  font-family: optima, "SourceHanSerifCN";
}

.main-field-title {
  font-size: 23px;
  font-family: "Source Han Sans CN Medium";
}
.home_focus_card_2_2 {
  margin-top: vh(40);
  width: vw(950);
  padding-top: 15px;
  padding-bottom: 0.5px;
  padding-right: vw(20);
}
.headline_2 {
  margin-left: vw(20);
  font-size: vw(25);
  font-family: "optima", sans-serif;
}
.subtitle_recommand_1 {
  margin-left: vw(20);
  font-family: "Source Han Sans CN Normal", sans-serif;
  margin-top: vh(10);
}
.subtitle_recommand_5 {
  margin-left: vw(20);
  font-family: "Source Han Sans CN Normal", sans-serif;
  margin-top: vh(1);
  margin-bottom: vh(15);
}
.subtitle_recommand_1_1 {
  margin-left: vw(20);
  font-family: "Source Han Sans CN Normal", sans-serif;
  margin-top: vh(1);
  color: #656d77;
  font-size: vw(14);
}
.recommand_book {
  color: #455A64;
  margin-left: vw(20);
  margin-top: vh(15);
  margin-right: vw(20);
  font-weight: bold;
  font-family: "optima", sans-serif;
  font-size: vw(17);
}
.recommand_book_2 {
  color: #455A64;
  margin-left: vw(20);
  margin-top: vh(2);
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
  margin-top: vh(2);
  margin-right: vw(20);
  font-family: "SourceHanSerifCN", sans-serif;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden; 
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
}
.quote_recommand_fa {
  width: vw(735);
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
  font-size: vw(17);
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
.recommand_icon_1_5 {
  display: flex;
  margin-left: vw(20);
  margin-bottom: vh(15);
}
.recommand_icon_2 {
  width: vw(36);
  margin-top: vh(42);
  margin-left: vw(5);
  margin-bottom: vh(30);
}
.recommand_icon_3 {
  margin-top: vh(14);
}
.recommand_icon_3_5 {
  margin-top: vh(14);
}
.scholar-relation {
  font-size: 23px;
  font-family: "Source Han Sans CN Medium";
}
.main_research_head {
  font-family: SourceHanSerifCN-2;
  font-size: vw(24);
}
.main_research_mid {
  margin-left: vw(2);
}
.main_research_item {
  font-family: "optima", Courier, "PingFang SC";
  font-size: vw(21);
}
.main_research_item:hover {
  color: #667d97;
}
.scholar_article_head {
  font-family: SourceHanSerifCN-2;
  margin-bottom: vh(10);
  margin-left: vw(3);
}
.scholor_union_pic {
  font-family: SourceHanSerifCN-2;
  z-index: 9999;
}
.alert {
  position: fixed;
  top: vh(270);
  width: vw(500);
  left: vw(560);
  z-index: 9999;
}
.pagr_index_123 {
  margin-top: vh(20);
}
</style>
