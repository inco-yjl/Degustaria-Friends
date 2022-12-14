<template>
  <v-container class="paper-detail-page">
    <v-row>
      <v-col cols="2" class="toc"> </v-col>
      <v-col cols="10">
        <p class="text-left font-weight-bold paper-title">{{ paper.title }}</p>
        <p class="text-left paper-data" v-if="paper.citation!=='null'">
          {{ "引用量：" + paper.citation }}
        </p>
        <v-container class="paper-info">
          <v-row class="paper-info-row">
            <v-col cols="2" class="paper-info-title">作者：</v-col>
            <v-col cols="10" class="paper-info-content"
              >{{ paper.author}}
            </v-col>
          </v-row>
          <v-row class="paper-info-row">
            <v-col cols="2" class="paper-info-title">关键词：</v-col>
            <v-col cols="10" class="paper-info-content" style="color: #185abd">
              {{
                paper.keyword.length === 0
                  ? "暂无关键词信息"
                  : paper.keyword
              }}
            </v-col>
          </v-row>
          <v-row class="paper-info-row">
            <v-col cols="2" class="paper-info-title">年份：</v-col>
            <v-col cols="10" class="paper-info-content" v-if="paper.year<2022">{{ paper.year }}</v-col>
            <v-col cols="10" class="paper-info-content" v-else>-</v-col>
          </v-row>
        </v-container>
        <v-row class="paper-button-row">
          <v-col cols="2">
            <button class="paper-button" @click="report_error">报错</button>
          </v-col>
          <v-col cols="2">
            <button class="paper-button" @click="share_paper">分享</button>
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
          <v-tabs v-model="tab" fixed-tabs background-color="rgb(240,240,240)">
            <v-tab>相似文献</v-tab>
            <v-tab>相关学术成果</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <div class="recommendation-tab">
                <div
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
                </div>
              </div>
            </v-tab-item>
            <v-tab-item>
              <div class="recommendation-tab">
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
              </div>
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
    };
  },
  methods: {
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
    get_paper() {
      const id = this.$route.query.id;
      this.get_paper_info(id);
    },
    get_paper_info: function (id) {
      this.$axios({
        method: "post",
        url: "/get_patent_by_id",
        data: {
          id: id,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((response) => {
        console.log(response.data);
        this.paper = response.data;
        if(this.paper.author==='null') this.paper.author = '';
        if(this.paper.keyword === 'null') this.paper.keyword = '';
        this.get_similar_papers(); // TODO: 在测试的时候，获取相似文献和相关文献的接口都存在比较严重的性能问题，导致页面刷新不及时，目前还没找到好的解决方法
        this.get_related_papers();
      });
    },
    get_similar_papers: function () {
      // 部分文献没有关键词，对于这些文献，将其标题拆分后作为搜索条件检索。下面的相关学术成果逻辑类似。
      if (this.paper.keyword.length === 0) {
        this.$axios({
          method: "post",
          url: "/search",
          data: {
            search_word: this.paper.title.split(" "),
            search_type: Array(this.paper.title.split(" ").length)
              .fill()
              .map((v) => "2"),
            page: 0,
            size: 10,
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
        const keywords = this.paper.keyword.split(",")
        this.$axios({
          method: "post",
          url: "/search",
          data: {
            search_word: keywords,
            search_type: Array(keywords.length)
              .fill()
              .map((v) => "2"),
            page: 0,
            size: 10,
            search_logic: Array(keywords.length - 1)
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
      if (this.paper.author.length === 0) {
        this.$axios({
          method: "post",
          url: "/search",
          data: {
            search_word: this.paper.title.split(" "),
            search_type: Array(this.paper.title.split(" ").length)
              .fill()
              .map((v) => "2"),
            page: 0,
            size: 10,
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
        const authors = this.paper.author.split(",")
        this.$axios({
          method: "post",
          url: "/search",
          data: {
            search_word: authors,
            search_type: Array(authors.length)
              .fill()
              .map((v) => "1"),
            page: 0,
            size: 10,
            search_logic: Array(authors.length - 1)
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
  font-family: "宋体", sans-serif;
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
    
  display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
  -webkit-line-clamp: 3; /*显示的行数；如果要设置2行加...则设置为2*/
  overflow: hidden; /*超出的文本隐藏*/
  text-overflow: ellipsis; /* 溢出用省略号*/
  -webkit-box-orient: vertical; /*伸缩盒子的子元素排列：从上到下*/
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
</style>