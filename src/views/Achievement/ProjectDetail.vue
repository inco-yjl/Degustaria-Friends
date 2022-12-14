<template>
  <v-container class="project-detail-page">
    <div class="alerts">
      <transition name="fade">
        <v-alert
          dense
          class="alert"
          dismissible
          border="left"
          elevation="2"
          v-if="snackbar2"
          type="info"
          >{{ text2 }}</v-alert
        >
        <v-alert
          dense
          class="alert"
          dismissible
          border="left"
          elevation="2"
          v-if="snackbar"
          type="success"
          >{{ text }}</v-alert
        >
      </transition>
    </div>
    <v-row>
      <v-col cols="2" class="toc"> </v-col>
      <v-col cols="10">
        <p class="text-left font-weight-bold project-title">
          {{ project.title }}
        </p>
        <v-container class="project-info">
            <v-row class="project-info-row">
            <v-col cols="2" class="project-info-title">项目负责人：</v-col>
            <v-col cols="10" class="project-info-content" style="color: #185abd"
              >{{ project.participant.join(", ") }}
            </v-col>
          </v-row>
          <v-row class="project-info-row">
            <v-col cols="2" class="project-info-title" >项目参与者：</v-col>
            <v-col cols="10" class="project-info-content" style="color: #185abd"
              >{{ project.director=== "null" ? "-" :project.director}}
            </v-col>
          </v-row>
          <v-row class="project-info-row">
            <v-col cols="2" class="project-info-title">项目类型：</v-col>
            <v-col
              cols="10"
              class="project-info-content"
            >
              {{
                project.type==="null"
                  ? "暂无信息"
                  : project.type
              }}
            </v-col>
          </v-row>
          <v-row class="project-info-row">
            <v-col cols="2" class="project-info-title">项目金额：</v-col>
            <v-col cols="10" class="project-info-content"
              >{{ project.money=== "null" ? "-" :project.money}}
            </v-col>
          </v-row>
          <v-row class="project-info-row">
            <v-col cols="2" class="project-info-title">承担机构：</v-col>
            <v-col cols="10" class="project-info-content"
              >{{ project.undertaking_institution=== "null" ? "-" :undertaking_institution}}
            </v-col>
          </v-row>
          <v-row class="project-info-row">
            <v-col cols="2" class="project-info-title">资助机构：</v-col>
            <v-col cols="10" class="project-info-content"
              >{{ project.financial_institution=== "null" ? "-" :financial_institution}}
            </v-col>
          </v-row>
          <v-row class="project-info-row">
            <v-col cols="2" class="project-info-title">摘要：</v-col>
            <v-col cols="10" class="project-info-content"
              >{{
                project.abstract === "null" ? "暂无摘要信息" : project.abstract
              }}
            </v-col>
          </v-row>

          <v-row class="project-info-row">
            <v-col cols="2" class="project-info-title">项目起始时间：</v-col>
            <v-col cols="10" class="project-info-content">{{
              project.begin
            }}</v-col>
          </v-row>
          <v-row class="project-info-row">
            <v-col cols="2" class="project-info-title">项目终止时间：</v-col>
            <v-col cols="10" class="project-info-content">{{
              project.end
            }}</v-col>
          </v-row>
          <v-row class="project-info-row">
            <v-col cols="2" class="project-info-title">来源：</v-col>
            <v-col cols="10" class="project-info-content"  style="color: #185abd">
                <span v-if="project.url==='null'">暂无来源信息</span>
                <span v-else><a :ref="project.url">{{project.url_name}}</a></span>
            </v-col>
          </v-row>
        </v-container>
        <v-row class="project-button-row">
          <!--
          <v-col cols="1">
            <v-btn
              class="mx-2"
              fab
              dark
              small
              color="red"
              @click="report_error"
            >
              <v-icon>mdi-alert</v-icon>
            </v-btn>
          </v-col>
          -->
          <v-col cols="1">
            <v-btn
              class="mx-2"
              fab
              dark
              small
              color="success"
              @click="share_project"
            >
              <v-icon>mdi-share</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="divide-bar">
          <v-col cols="5" class="divide">
            <v-divider></v-divider>
          </v-col>
          <v-col cols="2">相关推荐</v-col>
          <v-col cols="5" class="divide">
            <v-divider></v-divider>
          </v-col>
        </v-row>
        <div class="recommendations">
          <v-card class="keywords_tab">
            <v-tabs
              v-model="tab"
              fixed-tabs
              background-color="#7b828b"
              center-active
              dark
              class="key_tab_item"
            >
              <v-tab>相似文献</v-tab>
              <v-tab>相关学术成果</v-tab>
            </v-tabs>
          </v-card>
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <div style="width: 800px">
                <v-card
                  class="home_focus_card_2"
                  v-for="paper in similar_papers"
                  :key="paper.id"
                >
                  <v-list-item-title
                    class="headline_2"
                    @click="redirect_paper(paper.id)"
                    >{{ paper.title }}</v-list-item-title
                  >
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
                    {{ paper.abstract }}
                  </div>
                  <div v-else class="no_abstract">暂无摘要信息</div>
                  <div style="display: flex">
                    <div class="quote_recommand_fa">
                      <p class="quote_recommand_0">引用量：</p>
                      <p class="quote_recommand">{{ paper.n_citation }}</p>
                    </div>
                    <div
                      class="recommand_icon_1"
                      @click="into_detail(paper.url[0])"
                    >
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
                <v-list-item-title
                  class="headline_2"
                  @click="redirect_paper(paper.id)"
                  >{{ paper.title }}</v-list-item-title
                >
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
                  {{ paper.abstract }}
                </div>
                <div v-else class="no_abstract">暂无摘要信息</div>
                <div style="display: flex">
                  <div class="quote_recommand_fa">
                    <p class="quote_recommand_0">引用量：</p>
                    <p class="quote_recommand">{{ paper.n_citation }}</p>
                  </div>
                  <div
                    class="recommand_icon_1"
                    @click="into_detail(paper.url[0])"
                  >
                    <v-icon color="#232f3d" class="recommand_icon_3" medium>
                      mdi-earth
                    </v-icon>
                    <a class="quote_recommand_1">原文链接</a>
                  </div>
                </div>
              </v-card>
              
            </v-tab-item>
          </v-tabs-items>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from "vue";
import qs from "qs";

export default {
  name: "ProjectDetail",
  data() {
    return {
      project: ref(null),
      tab: ref(null),
      similar_papers: ref(null),
      related_papers: ref(null),
      snackbar: false,
      snackbar2: false,
      text2: "",
      text: "",
    };
  },
  methods: {
    generate_reference() {
      let reference =
        this.project.participant.join(", ") +
        ". " +
        this.project.title +
        ". " +
        this.project.venue +
        ". " +
        this.project.year +
        ".";
      navigator.clipboard.writeText(reference);
      this.text = "引用信息已复制到剪贴板";
      this.snackbar = true;
      setTimeout(() => {
        this.snackbar = false;
      }, 1000);
    },
    report_error() {
      this.text = "感谢您的反馈，我们会尽快处理";
      this.snackbar = true;
      setTimeout(() => {
        this.snackbar = false;
      }, 1000);
    },
    share_project() {
      let currentUrl = window.location.href;
      navigator.clipboard.writeText(currentUrl);
      this.text = "链接已复制到剪贴板";
      this.snackbar = true;
      setTimeout(() => {
        this.snackbar = false;
      }, 1000);
    },
    rrelated_paper(id) {
      console.log(id);
      this.$router.push({
        name: 'paperDetail',
        query: {
            id: id
        }
      })
    },
    redirect_html() {
      if (this.project.url === null) {
        this.text2 = "暂时无法链接到原文";
        this.snackbar2 = true;
        setTimeout(() => {
          this.snackbar2 = false;
        }, 1000);
      } else {
        window.open(this.project.url);
      }
    },
    into_detail(url_tmp) {
      console.log(url_tmp);
      if (url_tmp == null) {
        this.text2 = "暂无数据";
        this.snackbar2 = true;
        setTimeout(() => {
          this.snackbar2 = false;
        }, 1000);
      } else {
        window.open(url_tmp);
      }
    },
    get_project() {
      const id = this.$route.query.id;
      this.get_project_info(id);
    },
    get_project_info(id) {
      console.log(id);
      this.$axios({
        method: "post",
        url: "/get_proj_by_id",
        data: {
          id: id,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((response) => {
        console.log(response.data);
        this.project = response.data;
        this.project.participant = response.data.participant.split(",");
        this.get_similar_papers(); // TODO: 在测试的时候，获取相似文献和相关文献的接口都存在比较严重的性能问题，导致页面刷新不及时，目前还没找到好的解决方法
        this.get_related_papers();
      });
    },
    get_similar_papers() {
      this.$axios({
        method: "post",
        url: "/search",
        data: {
          search_word: this.project.title.split(" "),
          search_type: Array(this.project.title.split(" ").length)
            .fill()
            .map((v) => "2"),
          page: 0,
          size: 10,
          search_logic: Array(this.project.title.split(" ").length - 1)
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
    },
    get_related_papers() {
      if (this.project.participant.length === 0) {
        this.$axios({
          method: "post",
          url: "/search",
          data: {
            search_word: this.project.title.split(" "),
            search_type: Array(this.project.title.split(" ").length)
              .fill()
              .map((v) => "2"),
            page: 0,
            size: 10,
            search_logic: Array(this.project.title.split(" ").length - 1)
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
            search_word: this.project.participant,
            search_type: Array(this.project.participant.length)
              .fill()
              .map((v) => "1"),
            page: 0,
            size: 10,
            search_logic: Array(this.project.participant.length - 1)
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
      vm.get_project();
    });
  },
};
</script>

<style scoped lang="scss">
.project-detail-page {
  background-color: white;
  width: vw(1920);
  margin: 0;
  margin-top: 20px;
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

.project-title {
  margin-top: vh(90);
  padding-left: vw(180);
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-weight: 700;
  font-size: 28px;
  font-style: normal;
}

.project-data {
  margin-top: vh(10);
  padding-left: vw(180);
  font-family: "黑体", sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #7f7f7f;
  margin-bottom: vh(15);
}

.project-info {
  padding-left: vw(180);
}

.project-info-title {
  font-family: "黑体 Bold", "黑体", sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 16px;
  color: #000000;
  padding: vw(5) 0;
}

.project-info-content {
  font-size: 14px;
  color: #7f7f7f;
  line-height: 26px;
  padding: vw(5) 0;
}

.project-info-row {
  margin: 0;
  padding: 0;
}

.project-button-row {
  padding-left: vw(180);
  height: vh(40);
}

.project-button {
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
  margin-left: vw(90);
  margin-top: vh(50);
  font-size: 20px;
  font-weight: 700;
  font-family: "Source Han Sans CN Normal", sans-serif;
  text-align: center;
}

.divide {
  padding-top: vh(40);
}

.recommendations {
  width: vw(900);
  margin-left: vw(180);
  margin-right: vw(100);
}

.similar-project-title {
  cursor: pointer;
  font-size: 18px;
  margin-top: vh(15);
  margin-left: vw(10);
  margin-bottom: 0;
  color: #3366cc;
}

.similar-project-abstract {
  font-size: 12px;
  margin-top: vh(5);
  margin-left: vw(10);
  margin-bottom: 0;
  color: #7f7f7f;
  line-height: vh(35);
  
  display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
  -webkit-line-clamp: 3; /*显示的行数；如果要设置2行加...则设置为2*/
  overflow: hidden; /*超出的文本隐藏*/
  text-overflow: ellipsis; /* 溢出用省略号*/
  -webkit-box-orient: vertical; /*伸缩盒子的子元素排列：从上到下*/
}

.similar-project-author-and-source {
  font-size: 12px;
  margin-top: vh(10);
  margin-left: vw(10);
  margin-bottom: 0;
  color: #3366cc;
}

.similar-project-citations-and-year {
  font-size: 12px;
  margin-top: vh(10);
  margin-left: vw(10);
  margin-bottom: vh(20);
  color: #7f7f7f;
}

.home_focus_card_2 {
  margin-left: 20px;
  margin-top: vh(20);
  margin-bottom: vh(20);
  width: 95%;
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
  width: vw(100);
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
  width: 100px;
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
.alerts {
  position: fixed;
  z-index: 100000;
  top: 10px;
  margin-left: vw(710);
}
.alert {
  position: relative;
  margin-top: vh(20);
  width: vw(500);
}
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.1s;
}
.fade-leave-to {
  opacity: 0;
}
.fade-leave-active {
  transition: opacity 0.1s;
}
</style>