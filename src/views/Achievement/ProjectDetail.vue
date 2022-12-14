<template>
  <v-container class="project-detail-page">
    <v-row>
      <v-col cols="2" class="toc"> </v-col>
      <v-col cols="10">
        <p class="text-left font-weight-bold project-title">
          {{ project.title }}
        </p>
        <v-container class="project-info">
            <v-row class="project-info-row">
            <v-col cols="2" class="project-info-title">项目负责人：</v-col>
            <v-col cols="10" class="project-info-content"
              >{{ project.participant.join(", ") }}
            </v-col>
          </v-row>
          <v-row class="project-info-row">
            <v-col cols="2" class="project-info-title">项目参与者：</v-col>
            <v-col cols="10" class="project-info-content"
              >{{ project.director=== "null" ? "-" :project.director}}
            </v-col>
          </v-row>
          <v-row class="project-info-row">
            <v-col cols="2" class="project-info-title">项目类型：</v-col>
            <v-col
              cols="10"
              class="project-info-content"
              style="color: #185abd"
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
          <v-col cols="2">
            <button class="project-button" @click="report_error">报错</button>
          </v-col>
          <v-col cols="2">
            <button class="project-button" @click="share_project">分享</button>
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
                  v-for="project in similar_projects"
                  :key="project.id"
                >
                  <p
                    class="similar-project-title"
                    @click="redirect_project(project.id)"
                  >
                    {{ project.title }}
                  </p>
                  <p class="similar-project-abstract">
                    {{
                      project.abstract === "null"
                        ? "暂无摘要信息"
                        : project.abstract
                    }}
                  </p>
                  <p class="similar-project-author-and-source">
                    {{
                      (project.author_name.length === 0
                        ? "暂无作者信息"
                        : project.author_name.join(", ") + " - ") +
                      (project.venue === null ? "暂无来源信息" : project.venue)
                    }}
                  </p>
                  <p class="similar-project-citations-and-year">
                    {{
                      "被引量：" +
                      project.n_citation +
                      "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
                      "发表：" +
                      project.year
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
                  v-for="project in related_projects"
                  :key="project.id"
                >
                  <p
                    class="similar-project-title"
                    @click="redirect_project(project.id)"
                  >
                    {{ project.title }}
                  </p>
                  <p class="similar-project-abstract">
                    {{
                      project.abstract === "null"
                        ? "暂无摘要信息"
                        : project.abstract
                    }}
                  </p>
                  <p class="similar-project-author-and-source">
                    {{
                      (project.author_name.length === 0
                        ? "暂无作者信息"
                        : project.author_name.join(", ") + " - ") +
                      (project.venue === null ? "暂无来源信息" : project.venue)
                    }}
                  </p>
                  <p class="similar-project-citations-and-year">
                    {{
                      "被引量：" +
                      project.n_citation +
                      "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
                      "发表：" +
                      project.year
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
import qs from "qs";

export default {
  name: "ProjectDetail",
  data() {
    return {
      project: ref(null),
      tab: ref(null),
      similar_projects: ref(null),
      related_projects: ref(null),
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
      window.alert("引用信息已复制到剪贴板");
    },
    report_error() {
      window.alert("感谢您的反馈，我们会尽快处理");
    },
    share_project() {
      let currentUrl = window.location.href;
      navigator.clipboard.writeText(currentUrl);
      window.alert("分享链接已复制到剪贴板");
    },
    redirect_project(id) {
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
        window.alert("暂时无法提供HTML阅读");
      } else {
        window.open(this.project.url);
      }
    },
    redirect_pdf() {
      if (this.project.url === null) {
        window.alert("暂时无法提供PDF下载");
      } else {
        window.open(this.project.url); // TODO: 下载pdf的接口（get_project_file_by_id）好像不能用，只好用跳转project.url替代
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
        this.get_similar_projects(); // TODO: 在测试的时候，获取相似文献和相关文献的接口都存在比较严重的性能问题，导致页面刷新不及时，目前还没找到好的解决方法
        this.get_related_projects();
      });
    },
    get_similar_projects() {
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
          this.similar_projects = response.data.papers;
          console.log(this.similar_projects);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    get_related_projects() {
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
            this.related_projects = response.data.papers;
            console.log(this.related_projects);
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
            this.related_projects = response.data.papers;
            console.log(this.related_projects);
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
  font-family: "宋体 Bold", "宋体 常规", "宋体", sans-serif;
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
</style>