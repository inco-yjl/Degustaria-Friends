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
              <div class="name ma-1 text-h5">
                <p class="text-left name">&nbsp;&nbsp;{{ Name }}</p>
              </div>
              <div class="faculty ma-1 text-h6">
                <p class="text-left faculty">{{ Faculty }}</p>
              </div>
              <div class="intro ma-1 text-body-1">
                <p class="text-left pa-1 intro">
                  {{ intro }}
                </p>
              </div>
              <div class="ma-1" v-if="showEmail">
                <p class="text-left faculty">Email:&nbsp; {{Email}}</p>
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
    <v-row class="mx-12">
      <v-col cols="8">
        <v-card elevation="7">
          <v-card-title class="text-left">论文共3篇</v-card-title>
          <v-card-subtitle>
            <v-row dense>
              <v-col cols="12">
                <v-btn-toggle v-model="toggleOne" tile color="primary" group mandatory>
                  <v-btn value="0" depressed elevation="1" small>按时间排序</v-btn
                  >
                  <v-btn value="1" depressed elevation="1" small>按引用量排序</v-btn
                  >
                </v-btn-toggle>
              </v-col>
              <v-col cols="12">
                <v-btn-toggle v-model="toggleTwo" tile color="primary" group mandatory>
                  <v-btn value="0" depressed elevation="1" small>全部</v-btn>
                  <v-btn value="1" depressed elevation="1" small>最近</v-btn>
                </v-btn-toggle>
              </v-col>
              <v-col cols="12">
                <v-btn-toggle v-model="toggleThree" tile color="primary" group mandatory>
                  <v-btn value="0" depressed elevation="1" small>论文</v-btn>
                  <v-btn value="1" depressed elevation="1" small>专利</v-btn>
                  <v-btn value="2" depressed elevation="1" small>项目</v-btn>
                </v-btn-toggle>
              </v-col>
            </v-row>
          </v-card-subtitle>
          <v-card-text id="PaperList">
            <div v-if="toggleThree === 0">
              <v-card
                class="home_focus_card_2"
                v-for="item in recommandPaper"
                :key="item.id"
              >
                <v-list-item-title class="headline_2">{{item.article_name}}</v-list-item-title>
                <v-list-item-subtitle class="subtitle_recommand_1">{{item.author}}</v-list-item-subtitle>
                <div class="recommand_book">{{item.book}}</div>
                <div class="quote_recommand">
                  <div>
                    <p class="font-weight-black">Number of citation：{{item.quote_num}}</p>
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
                论文列表加载失败
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
            <div v-else-if="toggleThree === 1">
              <v-card
                class="home_focus_card_2"
                v-for="item in recommandPatent"
                :key="item.id"
              >
                <v-list-item-title class="headline_2">{{item.article_name}}</v-list-item-title>
                <v-list-item-subtitle class="subtitle_recommand_1">{{item.author}}</v-list-item-subtitle>
                <div class="recommand_book">{{item.book}}</div>
                <div class="quote_recommand">
                  <div>
                    <p class="font-weight-black">Number of citation：{{item.quote_num}}</p>
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
            <v-container class="max-width">
              <v-pagination
                v-model="page"
                class="my-4"
                :length="PaginationLength"
                :total-visible="7"
                @click="this.$vuetify.goTo('#PaperList')"
              ></v-pagination>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card elevation="6" min-height="420">
          <v-card-title class="text-left">学者关系图：</v-card-title>
          <v-card-text>
            <div style="height: 350px; width: 100%">
              <scholar-relation-vue :id="scholarId"/>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
      scholarName: "Azadeh Amin",
      intro: "",
      showEmail: true,
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
      recommandPaper: [
        {
          article_name: "Curvature-Adaptive Meta-Learning for Fast Adaptation to Manifold Data",
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
        }
      ],
      recommandPatent: [
      {
          article_name: "Curvature-Adaptive Meta-Learning for Fast Adaptation to Manifold Data",
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
        }
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
          id: this.scholarId
        })
      })
      .then(
        response => {
          this.MainField=[];
          this.Name = response.data.name1;
          this.Faculty = response.data.org;
          this.Email = response.data.e_mail;
          let iarr = response.data.interests.split(",");
          for(let i = 1; i <= 6; i++)
            this.MainField.push({
              index: i,
              title: iarr[i - 1]
            })
          if (this.Email == null)
            this.showEmail = false;
        }
      )
      .catch(
        e => console.log(e)
      )
    },
    loadScholarIntro() {
      this.$axios({
        method: "post",
        url: "/get_scholar_introduction",
        data: qs.stringify({
          id: this.scholarId
        })
      })
      .then(
        res => this.intro = res.data.intro
      )
      .catch(
        e => console.log(e)
      )
    },
    loadScholarPapers(npage = 1) {
      this.recommandPaper = [];
      let sort = (this.toggleTwo === 1) ? "year" : "citation";
      let year = (this.toggleOne === 1) ? 0 : 1;
      this.$axios({
        method: "post",
        url: "/get_p_number_of_scholar",
        data: qs.stringify({
          scholar_id: this.scholarId
        })
      })
      .then(
        response => {
          this.PaginationLength = Math.ceil((this.toggleTwo === 0 ?
            response.data.paper_number : response.data.paper_number_10) / 6
          );
        }
      )
      .catch(e => console.log(e))
      this.$axios({
        method: "post",
        url: "/get_papers_by_scholar",
        data: qs.stringify({
          scholar_id: this.scholarId,
          page: npage,
          size: 6,
          order: sort,
          year: year,
        })
      })
      .then(
        response => {
          for (let x in 6)
              this.recommandPaper.push({
                article_name: response.data.at(x).title,
                author: response.data.at(x).author,
                book: response.data.at(x).source,
                quote_num: response.data.at(x).citation,
                url: response.data.at(x).url,
              });
        }
      )
      .catch(
        error => {
          this.showSnackBar = true;
          console.log(error);
        }
      )
    },
    loadScholarPatent(npage = 1) {
      this.recommandPatent = [];
      let sort = (this.toggleTwo === 1) ? "year" : "citation";
      let year = (this.toggleOne === 1) ? 0 : 1;
      this.$axios({
        method: "post",
        url: "/get_p_number_of_scholar",
        data: qs.stringify({
          scholar_id: this.scholarId
        })
      })
      .then(
        response => {
          this.PaginationLength = Math.ceil((this.toggleOne === 1 ?
            response.data.patent_number : response.data.patent_number_10) / 6
          );
        }
      )
      this.$axios({
        method: "post",
        url: "/get_patents_by_scholar",
        data: qs.stringify({
          scholar_id: this.scholarId,
          page: npage,
          size: 6,
          order: sort,
          year: year,
        })
      })
      .then(
        response => {
          console.log("patent")
          for (let x = 0; x < 6; x++)
              this.recommandPatent.push({
                article_name: response.data.at(x).title,
                author: response.data.at(x).author,
                book: response.data.at(x).source,
                quote_num: response.data.at(x).citation,
                url: response.data.at(x).url,
              });
        }
      )
      .catch(
        error => {
          this.showSnackBar = true;
          console.log(error);
        }
      )
    },
    to_string(strs) {
      var retstr = "";
      for (let str in strs) {
        retstr += str;
        retstr += ",";
      }
      return retstr;
    }
  },
  watch: {
    page: {
      handler(nval, oval) {
        console.log(oval + "->" + nval);
        if (nval !== oval)
          switch(this.toggleThree) {
              case '0':
                loadScholarPapers(nval);
                break;
              case '1':
                loadScholarPatent(nval);
                break;
              case '2':
                break;
            }
      }
    },
    toggleOne: {
      handler(nval, oval) {
        console.log(oval + "->" + nval)
        if (nval !== oval)
          switch(this.toggleThree) {
              case '0':
                this.loadScholarPapers();
                break;
              case '1':
                this.loadScholarPatent();
                break;
              case '2':
                break;
            }
      }
    },
    toggleTwo: {
      handler(nval, oval) {
        if (nval !== oval)
          switch(this.toggleThree) {
              case '0':
                this.loadScholarPapers();
                break;
              case '1':
                this.loadScholarPatent();
                break;
              case '2':
                break;
            }
      }
    },
    toggleThree: {
      handler(nval, oval) {
        if (nval !== oval)
          switch(nval) {
            case '0':
              console.log("change to paper")
              this.loadScholarPapers();
              break;
            case '1':
              console.log("change to patent")
              this.loadScholarPatent();
              break;
            case '2':
              break;
            default:
              console.log("nothing happened")
          }
        console.log(oval + "->" + nval)
      }
    }
  },
  beforeMount() {
    this.scholarId = parseInt(this.$route.params.scholar_id);
  },
  mounted() {
    this.loadScholarInfo();
    this.loadScholarIntro();
    switch(this.toggleThree) {
          case undefined:
          case 0:
            this.loadScholarPapers();
            break;
          case 1:
            this.loadScholarPatent();
            break;
          case 2:
            break;
        }
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
  margin-top: 35px;
  min-height: 100%;
  border-left-style: solid;
  border-left-color: gray;
  border-right-style: solid;
  border-right-color: gray;
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
  margin-left: vw(20);
  margin-top: vh(40);
  width: vw(1010);
  padding-top: 10px;
}
.headline_2 {
  margin-left: vw(20);
  height: vh(30);
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
  font-family: "Source Han Sans CN Medium";
}
</style>
