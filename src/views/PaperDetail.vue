<template>
  <v-container class="paper-detail-page">
    <v-row>
      <v-col cols="2" class="toc"> </v-col>
      <v-col cols="10">
        <p class="text-left font-weight-bold paper-title">{{ paper.title }}</p>
        <p class="text-left paper-data" v-if="paper.venue!='null'">
          {{ "来自 " + paper.venue + "  |  引用量：" + paper.n_citation }}
        </p>
        <v-container class="paper-info">
          <v-row class="paper-info-row">
            <v-col cols="2" class="paper-info-title">作者：</v-col>
            <v-col cols="10" class="paper-info-content" style="color: #185abd"
              >{{ paper.author_name.join(", ") }}
            </v-col>
          </v-row>
          <v-row class="paper-info-row">
            <v-col cols="2" class="paper-info-title">摘要：</v-col>
            <v-col cols="10" class="paper-info-content"
              >{{ paper.abstract === "null" ? "暂无摘要信息" : paper.abstract }}
            </v-col>
          </v-row>
          <v-row class="paper-info-row">
            <v-col cols="2" class="paper-info-title">关键词：</v-col>
            <v-col cols="10" class="paper-info-content" style="color: #185abd">
              {{
                paper.keywords.length === 0
                  ? "暂无关键词信息"
                  : paper.keywords.join(" ")
              }}
            </v-col>
          </v-row>
          <v-row class="paper-info-row">
            <v-col cols="2" class="paper-info-title">年份：</v-col>
            <v-col cols="10" class="paper-info-content">{{ paper.year }}</v-col>
          </v-row>
          <v-row class="paper-info-row">
            <v-col cols="2" class="paper-info-title">DOI：</v-col>
            <v-col cols="10" class="paper-info-content">{{
              paper.doi === "null" ? "暂无DOI信息" : paper.doi
            }}</v-col>
          </v-row>
        </v-container>
        <v-row class="paper-button-row">
          <v-col cols="2">
            <!-- <button class="paper-button" @click="subscribe_paper">
              {{ this.subscribed === true ? "已收藏" : "收藏" }}
            </button> -->
            <v-btn  depressed large color="blue-grey lighten-4" @click="subscribe_paper">  {{ this.subscribed === true ? "已收藏" : "收藏" }}</v-btn>
          </v-col>
          <v-col cols="2">
            <!-- <button class="paper-button" @click="generate_reference">
              引用
            </button> -->
            <v-btn  depressed large color="blue-grey lighten-4" @click="generate_reference">引用</v-btn>
          </v-col>
          <v-col cols="2">
            <!-- <button class="paper-button" @click="report_error">报错</button> -->
             <v-btn  depressed large color="blue-grey lighten-4" @click="report_error">报错</v-btn>
            
          </v-col>
          <v-col cols="2">
            <!-- <button class="paper-button" @click="share_paper">分享</button> -->
            <v-btn  depressed large color="blue-grey lighten-4" @click="share_paper">分享</v-btn>
          </v-col>
        </v-row>
        <div class="download-area" >
           <v-row justify="space-around" style="verticle-align:center">
                  <v-btn  color="blue-grey darken-3"  class="add_keyword_class"  style="cursor: pointer;display:inline-block;margin-left:50px;margin-top:8px;color:white"   @click="redirect_html">
                      HTML阅读
                  </v-btn>
                   <v-btn  color="blue-grey darken-3"  class="add_keyword_class"  style="cursor: pointer;display:inline-block;margin-left:50px;margin-top:8px;color:white"   @click="redirect_pdf">
                      PDF下载
                  </v-btn>
           </v-row>
            <!-- <span
              class="download-button"
              style="background-color: #ff9c59; cursor: pointer"
              @click="redirect_html"
              >HTML阅读</span
            >
            <span
              class="download-button"
              style="background-color: #28b611; cursor: pointer"
              @click="redirect_pdf"
              >PDF下载</span
            > -->
        </div>
        <v-row class="divide-bar">
          <v-col cols="5" class="divide">
            <v-divider></v-divider>
          </v-col>
          <v-col cols="2">相关推荐</v-col>
          <v-col cols="5" class="divide">
            <v-divider></v-divider>
          </v-col>
        </v-row>

        <div class="recommendations" style="width:800px">
        <v-card class="keywords_tab">
          <v-tabs v-model="tab" fixed-tabs  background-color="#7b828b" 
          center-active
          dark
          class="key_tab_item">
            <v-tab>相似文献</v-tab>
            <v-tab>相关学术成果</v-tab>
          </v-tabs>
        </v-card>
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <div style="width:800px">
                 <v-card
          class="home_focus_card_2"
          v-for="paper in similar_papers"
                  :key="paper.id"
        >
          <v-list-item-title class="headline_2"   @click="redirect_paper(paper.id)">{{
            paper.title
          }}</v-list-item-title>
          <v-list-item-subtitle class="subtitle_recommand_1">{{
             paper.year
          }}</v-list-item-subtitle>
                    <div class="author_rcm">
            <div
              v-for="item2 in paper.author_name"
              :key="item2.id"
              style="float: left"
            >
              <v-list-item-subtitle class="subtitle_recommand_1">{{
                item2
              }}</v-list-item-subtitle>
            </div>
          </div>
          <div class="recommand_book" v-if="paper.abstract != 'null'">
            Abstract：
          </div>
          <div class="recommand_book_2" v-if="paper.abstract != 'null'">
            {{paper.abstract
                    }}
          </div>
          <div v-else class="no_abstract">暂无摘要信息</div>
          <div style="display: flex">
            <div class="quote_recommand_fa">
              <p class="quote_recommand_0">引用量：</p>
              <p class="quote_recommand">{{ paper.n_citation}}</p>
            </div>
            <div class="recommand_icon_1" @click="into_detail(paper.url[0])">
              <v-icon color="#232f3d" class="recommand_icon_3" medium>
                mdi-earth
              </v-icon>
              <a class="quote_recommand_1">原文链接</a>
            </div>
          </div>
        </v-card>
                <!-- <div
                  class="recommendation-tab-item"
                  v-for="paper in similar_papers"
                  :key="paper.id"
                >
                  <p
                    class="similar-paper-title"
                    @click="redirect_paper(paper.id)"
                  >
                    {{ paper.title }}
                  </p>
                  <p class="similar-paper-abstract">
                    {{
                      paper.abstract === "null"
                        ? "暂无摘要信息"
                        : paper.abstract
                    }}
                  </p>
                  <p class="similar-paper-author-and-source">
                    {{
                      (paper.author_name.length === 0
                        ? "暂无作者信息"
                        : paper.author_name.join(", ") + " - ") +
                      (paper.venue === null ? "暂无来源信息" : paper.venue)
                    }}
                  </p>
                  <p class="similar-paper-citations-and-year">
                    {{
                      "被引量：" +
                      paper.n_citation +
                      "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
                      "发表：" +
                      paper.year
                    }}
                  </p>
                  <v-divider
                    class="recommendation-tab-item-divider"
                  ></v-divider>
                </div> -->
              </div>
            </v-tab-item>
            <v-tab-item>
                <v-card
          class="home_focus_card_2"
         v-for="paper in related_papers"
                  :key="paper.id"
        >
          <v-list-item-title class="headline_2"   @click="redirect_paper(paper.id)">{{
            paper.title
          }}</v-list-item-title>
          <v-list-item-subtitle class="subtitle_recommand_1">{{
             paper.year
          }}</v-list-item-subtitle>
                    <div class="author_rcm">
            <div
              v-for="item2 in paper.author_name"
              :key="item2.id"
              style="float: left"
            >
              <v-list-item-subtitle class="subtitle_recommand_1">{{
                item2
              }}</v-list-item-subtitle>
            </div>
          </div>
          <div class="recommand_book" v-if="paper.abstract != 'null'">
            Abstract：
          </div>
          <div class="recommand_book_2" v-if="paper.abstract != 'null'">
            {{paper.abstract
                    }}
          </div>
          <div v-else class="no_abstract">暂无摘要信息</div>
          <div style="display: flex">
            <div class="quote_recommand_fa">
              <p class="quote_recommand_0">引用量：</p>
              <p class="quote_recommand">{{ paper.n_citation}}</p>
            </div>
            <div class="recommand_icon_1" @click="into_detail(paper.url[0])">
              <v-icon color="#232f3d" class="recommand_icon_3" medium>
                mdi-earth
              </v-icon>
              <a class="quote_recommand_1">原文链接</a>
            </div>
          </div>
        </v-card>
              <!-- <div class="recommendation-tab">
                <div
                  class="recommendation-tab-item"
                  v-for="paper in related_papers"
                  :key="paper.id"
                >
                  <p
                    class="similar-paper-title"
                    @click="redirect_paper(paper.id)"
                  >
                    {{ paper.title }}
                  </p>
                  <p class="similar-paper-abstract">
                    {{
                      paper.abstract === "null"
                        ? "暂无摘要信息"
                        : paper.abstract
                    }}
                  </p>
                  <p class="similar-paper-author-and-source">
                    {{
                      (paper.author_name.length === 0
                        ? "暂无作者信息"
                        : paper.author_name.join(", ") + " - ") +
                      (paper.venue === null ? "暂无来源信息" : paper.venue)
                    }}
                  </p>
                  <p class="similar-paper-citations-and-year">
                    {{
                      "被引量：" +
                      paper.n_citation +
                      "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
                      "发表：" +
                      paper.year
                    }}
                  </p>
                  <v-divider
                    class="recommendation-tab-item-divider"
                  ></v-divider>
                </div>
              </div> -->
            </v-tab-item>
          </v-tabs-items>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from "vue";

export default {
  name: "PaperDetail",
  data() {
    return {
      paper: ref(null),
      tab: ref(null),
      similar_papers: ref(null),
      related_papers: ref(null),
      subscribed: ref(false),
      snackbar: false,
    };
  },
  methods: {
    generate_reference() {
      let reference =
        this.paper.author_name.join(", ") +
        ". " +
        this.paper.title +
        ". " +
        this.paper.venue +
        ". " +
        this.paper.year +
        ".";
      navigator.clipboard.writeText(reference);
      window.alert("引用信息已复制到剪贴板");
    },
    report_error() {
      window.alert("感谢您的反馈，我们会尽快处理");
    },
    share_paper() {
      let currentUrl = window.location.href;
      navigator.clipboard.writeText(currentUrl);
      window.alert("分享链接已复制到剪贴板");
    },
    redirect_paper(id) {
      console.log(id);
      this.get_paper_info(id);
    },
    redirect_html() {
      if (this.paper.url === null) {
        window.alert("暂时无法提供HTML阅读");
      } else {
        window.open(this.paper.url);
      }
    },
    redirect_pdf() {
      if (this.paper.url === null) {
        window.alert("暂时无法提供PDF下载");
      } else {
        window.open(this.paper.url); // TODO: 下载pdf的接口（get_paper_file_by_id）好像不能用，只好用跳转paper.url替代
      }
    },
    subscribe_paper: function () {
      var user_id = window.localStorage.getItem("user_id");
      if (!user_id) {
        return;
      }
      this.$axios({
        method: "post",
        url: "/subscribe_paper",
        data: {
          user_id: user_id,
          paper_id: this.paper.id,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => {
        if (res.data.status === "成功收藏") {
          this.subscribed = true;
          window.alert("已成功收藏");
        } else {
          this.subscribed = false;
          window.alert("已取消收藏");
        }
      });
    },
    check_subscribe: function () {
      // TODO: 由于后端没有提供检查是否收藏成功的接口，因此连续调用两次subscribe_paper接口，如果第二次返回的是'已收藏'，则说明收藏成功
      var user_id = window.localStorage.getItem("user_id");
      if (!user_id) {
        return;
      }
      this.$axios({
        method: "post",
        url: "/subscribe_paper",
        data: {
          user_id: user_id,
          paper_id: this.paper.id,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => {
        this.$axios({
          method: "post",
          url: "/subscribe_paper",
          data: {
            user_id: user_id,
            paper_id: this.paper.id,
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).then((res) => {
          this.subscribed = res.data.status === "成功收藏";
        });
      });
    },
    into_detail(url_tmp) {
      console.log(url_tmp);
      if (url_tmp == null) {
        this.snackbar = true;
        setTimeout(() => {
          this.snackbar = false;
        }, 1000);
      } else {
        window.open(url_tmp);
      }
    },
    get_paper() {
      const id = this.$route.query.id;
      this.get_paper_info(id);
    },
    get_paper_info: function (id) {
      this.$axios({
        method: "get",
        url: "/paper_info",
        params: {
          id: id,
        },
      }).then((response) => {
        this.paper = response.data;
        this.check_subscribe();
        this.get_similar_papers(); // TODO: 在测试的时候，获取相似文献和相关文献的接口都存在比较严重的性能问题，导致页面刷新不及时，目前还没找到好的解决方法
        this.get_related_papers();
      });
    },
    get_similar_papers: function () {
      // 部分文献没有关键词，对于这些文献，将其标题拆分后作为搜索条件检索。下面的相关学术成果逻辑类似。
      if (this.paper.keywords.length === 0) {
        this.$axios({
          method: "post",
          url: "/search",
          data: {
            search_word: this.paper.title.split(" "),
            search_type: Array(this.paper.title.split(" ").length)
              .fill()
              .map((v) => "2"),
            page: 0,
            size: 3,
            search_logic: Array(this.paper.title.split(" ").length - 1)
              .fill()
              .map((v) => "1"),
            order_type: 0,
            order: 0,
          },
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            this.similar_papers = response.data.papers;
            console.log(this.similar_papers);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.$axios({
          method: "post",
          url: "/search",
          data: {
            search_word: this.paper.keywords,
            search_type: Array(this.paper.keywords.length)
              .fill()
              .map((v) => "2"),
            page: 0,
            size: 3,
            search_logic: Array(this.paper.keywords.length - 1)
              .fill()
              .map((v) => "1"),
            order_type: 0,
            order: 0,
          },
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            this.similar_papers = response.data.papers;
            console.log(this.similar_papers);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    get_related_papers: function () {
      if (this.paper.author_name.length === 0) {
        this.$axios({
          method: "post",
          url: "/search",
          data: {
            search_word: this.paper.title.split(" "),
            search_type: Array(this.paper.title.split(" ").length)
              .fill()
              .map((v) => "2"),
            page: 0,
            size: 3,
            search_logic: Array(this.paper.title.split(" ").length - 1)
              .fill()
              .map((v) => "1"),
            order_type: 0,
            order: 0,
          },
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            this.related_papers = response.data.papers;
            console.log(this.related_papers);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.$axios({
          method: "post",
          url: "/search",
          data: {
            search_word: this.paper.author_name,
            search_type: Array(this.paper.author_name.length)
              .fill()
              .map((v) => "1"),
            page: 0,
            size: 3,
            search_logic: Array(this.paper.author_name.length - 1)
              .fill()
              .map((v) => "1"),
            order_type: 0,
            order: 0,
          },
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            this.related_papers = response.data.papers;
            console.log(this.related_papers);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.get_paper();
    });
  },
};
</script>

<style scoped lang="scss">
.paper-detail-page {
  background-color: white;
  width: vw(1920);
  margin: 0;
  margin-top:20px;
}

.toc {
  //background-color: #fafafa;
}

.toc-title {
  margin-top: vw(40);
}

.toc-content {
  margin-left: vw(40);
  margin-right: vw(40);
  line-height: vh(40);
  font-size: small;
}

.paper-title {
  margin-top: vh(90);
  padding-left: vw(180);
  font-family: "宋体 Bold", "宋体 常规", "宋体", sans-serif;
  font-weight: 700;
  font-size: 28px;
  font-style: normal;
}

.paper-data {
  margin-top: vh(10);
  padding-left: vw(180);
  font-family: "黑体", sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #7f7f7f;
  margin-bottom: vh(15);
}

.paper-info {
  padding-left: vw(180);
}

.paper-info-title {
  font-family: "黑体 Bold", "黑体", sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 16px;
  color: #000000;
  padding: vw(5) 0;
}

.paper-info-content {
  font-size: 14px;
  color: #7f7f7f;
  line-height: 26px;
  padding: vw(5) 0;
}

.paper-info-row {
  margin: 0;
  padding: 0;
}

.paper-button-row {
  padding-left: vw(180);
  height: vh(40);
}

.paper-button {
  height: 100%;
  width: 80%;
  background-color: #eff8fc;
  border-radius: 20px;
  font-size: 14px;
  text-align: center;
  line-height: vh(40);
  font-weight: 700;
  color: #506e96;
}

.download-area {
  margin-top: vh(60);
  padding-top: vh(20);
  padding-bottom: vh(20);
  height: vh(75);
  background-color: rgba(241, 246, 249, 1);
}

.download-buttons {
  margin-left: vw(405);
}

.download-button {
  color: white;
  height: 100%;
  width: vw(100);
  margin: vh(50);
  padding: vh(12) vh(30);
  font-size: 14px;
  border-radius: 5px;
}

.divide-bar {
  width: 100%;
  margin: 0;
  font-size: 20px;
  font-weight: 700;
 font-family: "Source Han Sans CN Normal", sans-serif;
  text-align: center;
}

.divide {
  padding-top: vh(40);
}

.recommendations {
  margin-left: vw(100);
  margin-right: vw(100);
}

.similar-paper-title {
  cursor: pointer;
  font-size: 18px;
  margin-top: vh(15);
  margin-left: vw(10);
  margin-bottom: 0;
  color: #3366cc;
}

.similar-paper-abstract {
  font-size: 12px;
  margin-top: vh(5);
  margin-left: vw(10);
  margin-bottom: 0;
  color: #7f7f7f;
  line-height: vh(35);
}

.similar-paper-author-and-source {
  font-size: 12px;
  margin-top: vh(10);
  margin-left: vw(10);
  margin-bottom: 0;
  color: #3366cc;
}

.similar-paper-citations-and-year {
  font-size: 12px;
  margin-top: vh(10);
  margin-left: vw(10);
  margin-bottom: vh(20);
  color: #7f7f7f;
}
.home_focus_card_2 {
  margin-left: 20px;
  margin-top: vh(40);
  width:95%;
  padding-top: 10px;
  padding-bottom: 0.5px;
  padding-right: vw(20);
}
.keywords_tab {
  margin-left: 0%;
  margin-top: vh(30);
  width: vw(1190);
}
.key_tab_item {
  font-family: Source Han Sans CN Light;
}
.headline_2 {
  margin-left: vw(20);
  font-size: vw(25);
  font-family: "Source Han Sans CN Normal", sans-serif;
  cursor: pointer;
}
.subtitle_recommand_1 {
  margin-left: vw(20);
  font-family: "Source Han Sans CN Normal", sans-serif;
}
.author_rcm {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
}
.subtitle_recommand_2 {
  margin-left: vw(20);
  font-family: "Source Han Sans CN Normal", sans-serif;
  color: #90a4ae;
}
.recommand_book {
  color: #455a64;
  margin-left: vw(20);
  margin-top: vh(15);
  margin-right: vw(20);
  font-weight: bold;
  font-family: "optima", sans-serif;
}
.recommand_book_2 {
  color: #455a64;
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
.no_abstract {
  margin-left: vw(20);
  font-size: 14px;
  color: #7f7f7f;
  line-height: 26px;
  padding: vw(5) 0;
}
.recommand_book_3 {
  color: #455a64;
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
  width: vw(1010);
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
  font-family: "SourceHanSerifCN", sans-serif;
  font-size: vw(17);
  margin-top: vh(42);
}
.recommand_icon_fa {
  display: flex;
  margin-left: vw(1130);
}
.recommand_icon_1 {
  display: flex;
  width: 100px;;
}
.recommand_icon_2 {
  width: vw(36);
  margin-left: vw(40);
  margin-bottom: vh(32);
}
.recommand_icon_3 {
  margin-top: vh(17);
}
.add_keyword_class {
  color: white;
  margin-left: vw(30);
  margin-top: vh(25);
}
.add_keyword_class_2 {
  color: white;
  margin-left: vw(20);
  margin-top: vh(25);
}
.display_box_1 {
  background-color: rgba(255, 255, 255, 0.97);
  margin-bottom: vh(30);
  width: vw(1250);
  border-radius: vw(10);
  padding: vw(20);
}
.display_botton_1 {
  text-align: center;
}
.headline_display_1 {
  font-weight: 550;
  font-size: 1rem;
  letter-spacing: 0.009375rem;
  color: #232f3d;
  margin-top: vh(10);
  font-family: "Source Han Sans CN Normal", sans-serif;
}
.headline_display_2 {
  font-weight: 500;
  font-size: 0.9rem;
  letter-spacing: 0.008375rem;
  color: #90a4ae;
  margin-left: vw(10);
  margin-top: vh(10);
  font-family: "Source Han Sans CN Normal", sans-serif;
}
.headline_display_3 {
  font-weight: 550;
  font-size: 1rem;
  letter-spacing: 0.009375rem;
  color: #232f3d;
  margin-top: vh(70);
  font-family: "Source Han Sans CN Normal", sans-serif;
}
.headline_display_4 {
  font-weight: 500;
  font-size: 0.9rem;
  letter-spacing: 0.008375rem;
  color: #90a4ae;
  margin-left: vw(10);
  margin-top: vh(70);
  font-family: "Source Han Sans CN Normal", sans-serif;
}
</style>