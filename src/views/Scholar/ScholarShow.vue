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
      <v-alert 
        dense 
        shaped 
        text 
        type="success" 
        dismissible 
        v-if="addsuccess==1">添加成功</v-alert>
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
                   <v-col cols="1">
                       <v-row
                         align="center"
                          justify="space-around"
                       >
                         <div class="text-center">
                          <!-- 添加文章弹窗 -->
                             <v-dialog
      v-model="dialog"
      width="1000px"
      height="800px"
      style="padding:20px;margin:auto;background-color:white"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
        <v-icon left> mdi-pencil </v-icon>
            添加论文
        </v-btn>
      </template>
      <v-card>
           <v-card class="mb-12" color="blue-grey lighten-5" >
              <span class="card2tit" style="display: block">
                <h3 style="display: inline-block">添加您撰写的文章</h3>
                <span class="cntstyle"
                  >已选篇数：{{ selected_articlesid.length }}</span
                >
              </span>
              <v-text-field
                v-model="searchmsg"
                label="请输入"
                style="display: inline-block; width: 80%"
              >
              </v-text-field>
              <v-btn
                style="display: inline-block; position: absolute; right: 30px"
                rounded
                class="ma-2"
                color="primary"
                dark
                @click="search"
                >搜索<v-icon dark right>mdi-magnify</v-icon></v-btn
              >
              <div class="tabs">
                <v-card>
                  <v-tabs v-model="tab" centered fixed-tabs icons-and-text>
                    <v-tabs-slider></v-tabs-slider>

                    <v-tab href="#tab-1" class="primary--text">
                      文章
                      <v-icon>mdi-file-document-multiple</v-icon>
                    </v-tab>
                    <!-- 
                    <v-tab href="#tab-2" class="primary--text">
                      文章
                      <v-icon>mdi-file-document</v-icon>
                    </v-tab> -->
                  </v-tabs>

                  <v-tabs-items v-model="tab">
                    <v-tab-item v-for="i in 1" :key="i" :value="'tab-' + i">
                      <!-- <v-card flat>
          <v-card-text>{{ text }}</v-card-text>
        </v-card> -->
                      <v-card class="mx-auto" max-width="850px">
                        <v-list two-line class="liststyle">
                          <v-list-item-group
                            v-model="selected"
                            active-class="blue-grey lighten-4 blue-grey--text text--darken-4"
                            multiple
                            style="width: 800px"
                            v-if="grouplist.length != 0"
                          >
                            <template v-for="(item, index) in grouplist">
                              <v-list-item :key="item.id" style="width: 800px">
                                <template v-slot:default="{ active }">
                                  <v-list-item-content style="width: 800px">
                                    <v-list-item-title
                                      ><h3>
                                        {{ item.title }}
                                      </h3></v-list-item-title
                                    >

                                    <v-list-item-subtitle class="text--primary" v-if="item.keywords.length!=0"
                                      ><h4 style="display: inline">关键词：</h4>
                                      {{
                                        item.keywords.toString()
                                      }}</v-list-item-subtitle
                                    >

                                    <v-list-item-subtitle v-if="item.abstract!='null'"
                                      ><h4 style="display: inline">摘要：</h4>
                                      {{ item.abstract }}</v-list-item-subtitle
                                    >
                                  </v-list-item-content>

                                  <v-list-item-action>
                                    <v-icon
                                      @click="addart(item.id, active)"
                                      v-if="active == false"
                                      color="blue-grey lighten-1"
                                    >
                                      mdi-star-plus-outline
                                    </v-icon>
                                    <v-icon
                                      v-else
                                      color="blue-grey darken-4"
                                      @click="delart(item.id, active)"
                                    >
                                      mdi-star-plus
                                    </v-icon>
                                  </v-list-item-action>
                                </template>
                              </v-list-item>

                              <v-divider
                                v-if="index < grouplist.length - 1"
                                :key="index"
                              ></v-divider>
                            </template>
                          </v-list-item-group>
                          <h4 style="text-align: center" v-else>
                            您还没有搜索任何文章哦~
                          </h4>
                        </v-list>
                      </v-card>

                      <!-- 页脚 -->
                      <div class="text-center">
                        <v-pagination
                          v-model="ppage"
                          :length="ppagenum"
                          @next="nextpage"
                          @previous="prepage"
                          @input="getpage"
                        ></v-pagination>
                      </div>
                      <!-- button panel -->
                      <v-row justify="space-around">
                        <v-btn
                          style="margin: 50px"
                          color="primary"
                          @click="add_paper_for_scholar"
                          >添加</v-btn
                        >
                      </v-row>
                    </v-tab-item>
                  </v-tabs-items>
                </v-card>

              </div>
            </v-card>
      </v-card>
                             </v-dialog>
                          </div>
                        </v-row>                   
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
                    <v-btn value=1 depressed elevation="1" small
                      >按时间排序</v-btn
                    >
                    <v-btn value=2 depressed elevation="1" small
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
                  class="home_focus_card_2_2"
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
                        引用量：{{ item.quote_num }}
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
                  color="blue accent-2"
                >
                  尚无专利
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
      selected:[],
      selected_articlesid:[],
      page: 1,
      ppage:1,  //添加文章中的页脚
      ppagenum:5,
      size: 10,
      scholarId: 0,
      charId: "",
      unlog: false,
      scholarName: "Azadeh Amin",
      intro: "",
      userId: window.localStorage.getItem("user_id"),
      showEmail: true,
      isMyPage: false,
      searchmsg:'',
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
      grouplist:[],
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
      toggleOne: 1,
      toggleTwo: 0,
      toggleThree: 0,
      pagenum:5,
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
      dialog:false,
      addsuccess:-1,
      
    };
  },
  methods: {
    add_paper_for_scholar(){
         var str = this.selected_articlesid.toString();
          const formData = new FormData();
          this.scholarId=window.localStorage.getItem('scholar_id');
          console.log('scholarid'+this.scholarId);
          formData.append('scholar_id',this.scholarId);
          formData.append('paper_id',str);
          this.$axios({
          method: "post",
          url: "/add_paper_for_scholar",
          data: formData,
          })
        .then((res) => {
          console.log(res.data);
          this.addsuccess=1;
          this.dialog=false;
        })
        .catch((err) => {
          //请求若出现路由找不到等其它异常，则在终端输出错误信息
          console.log(err);
          this.addsuccess=0;
        });
    },
        addart(el1, el2) {
      if (!this.selected_articlesid.includes(el1)) {
        this.active = true;
        console.log("selected" + this.selected);
        this.selected_articlesid.push(el1);
        console.log("list:" + this.selected_articlesid);
      }
    },
    delart(el1, el2) {
      if (this.selected_articlesid.includes(el1)) {
        this.active = false;
        const index = this.selected_articlesid.indexOf(el1);
        if (index != -1) this.selected_articlesid.splice(index, 1);
        console.log("list:" + this.selected_articlesid);
      }
    },
    nextpage() {
      this.search();
      this.selected.splice(0, this.selected.length);
    },
    prepage() {
      this.search();
    },
    getpage() {
      // this.selected.splice(0,this.selected.length);
      this.search();
    },
    search() {
      // window.alert('searchmsg'+this.searchmsg);
      var arr1 = new Array();
      arr1.push(this.searchmsg);
      var arr2 = new Array();
      arr2.push("1");
      var arr3 = new Array();
      var data = {
        search_word: arr1,
        search_type: arr2,
        search_logic: arr3,
        page: this.ppage,
        size: 5,
        order_type: 0,
        order: 0,
      };
      console.log(JSON.stringify(data));
      console.log(window.localStorage.getItem("user_name"));
      this.$axios({
        url: "/search",
        method: "post",
        data: JSON.stringify(data),
        header: {
          "Content-Type": "application/json", //如果写成contentType会报错,如果不写这条也报错
          //Content type 'application/x-www-form-urlencoded;charset=UTF-8'...
        },
      })
        .then((res) => {
          /* res 是 response 的缩写 */
          console.log("搜索成功");
          console.log(res.data);
          if (res.data.n_page > 30) {
            this.alert = true;
            console.log(1);
            setTimeout(() => {
              this.alert = false;
            }, 1000);
            this.ppagenum = 30;
          } else this.ppagenum = res.data.n_page;
          this.grouplist = res.data.papers;
        })
        .catch((err) => {
          /* 请求若出现路由找不到等其它异常，则在终端输出错误信息 */
          console.log(err);
        });
      this.selected.splice(0, this.selected.length);
      var i = 0;
      for (i = 0; i < 5; i++) {
        if (this.selected_articlesid.includes(this.grouplist[i].id))
          this.selected.push(i);
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
          this.MainField = [];
          this.Name = response.data.name1;
          this.Faculty = response.data.org;
          this.Email = response.data.e_mail;
          this.charId = response.data.char_id;
          this.citation = response.data.citation;
          this.h_index = response.data.h_index;
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
    loadScholarPapers(npage = 0) {
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
          page: npage,
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
    loadScholarPatent(npage = 1) {
      this.recommandPatent = [];
      let sort = this.toggleOne === 1 ? "year" : "citation";
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
          year: 0,
        }),
      })
      .then((res) => {
        console.log("patent", res.data);
        for (let x = 0; x < 6; x++)
          this.recommandPatent.push({
            article_name: res.data[x].title,
            author: res.data[x].author,
            book: res.data[x].source,
            quote_num: res.data[x].citation,
            url: res.data[x].url,
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
.subtitle_recommand_1_1 {
  margin-left: vw(20);
  font-family: "Source Han Sans CN Normal", sans-serif;
  margin-top: vh(1);
  color: #656d77;
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
.recommand_icon_2 {
  width: vw(36);
  margin-top: vh(42);
  margin-left: vw(5);
  margin-bottom: vh(30);
}
.recommand_icon_3 {
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
.mb-12 {
  padding: 20px;
  width: 100%;
}
.cntstyle {
  display: inline-block;
  position: absolute;
  right: 30px;
}
</style>
