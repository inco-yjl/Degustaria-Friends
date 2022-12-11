<template>
  <div class="home-page">
    <div>
      <div class="home_left_zone">
        <div class="card_1">
          <v-card>
            <v-card-text>
              <p class="card_title_1">自然指数TOP 机构</p>
              <div
                class="card_content_1"
                v-for="(item, index) in topOrg"
                v-bind:key="index"
              >
                ·{{ item.name }}
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="indigo darken-4" @click="ToRank()"> Learn More </v-btn>
            </v-card-actions>
          </v-card>
        </div>
        <div>
          <v-card class="card_2">
            <v-card-text>
              <p class="card_title_1">H5指数TOP 会议</p>
              <div
                class="card_content_1"
                v-for="(item, index) in topCon"
                v-bind:key="index"
              >
              ·{{ item.name }}
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="indigo darken-4" @click="ToRank()"> Learn More </v-btn>
            </v-card-actions>
          </v-card>
        </div>
        <div>
          <v-card class="card_3">
            <v-card-text>
              <p class="card_title_1">H5指数TOP 期刊</p>
              <div
                class="card_content_1"
                v-for="(item, index) in topJour"
                v-bind:key="index"
              >
              ·{{ item.name }}
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="indigo darken-4" @click="ToRank()"> Learn More </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </div>
      <div class="main_container_2"><router-view /></div>
    </div>
    <div class="home_right_zone">
      <div>
        <v-card class="card_home_right">
          <v-list-item>
            <v-list-item-icon>
              <img src="../../src/assets/home_user.png" class="home_icon_1" />
            </v-list-item-icon>
            <div>
              <v-list-item-subtitle class="home_all_1"
                >84,387,047</v-list-item-subtitle
              >
              <v-list-item-title class="home_all_2">科研人员</v-list-item-title>
            </div>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <img src="../../src/assets/home_search.png" class="home_icon_1" />
            </v-list-item-icon>
            <div>
              <v-list-item-subtitle class="home_all_1"
                >329,431,326</v-list-item-subtitle
              >
              <v-list-item-title class="home_all_2">学术成果</v-list-item-title>
            </div>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <img src="../../src/assets/home_yy.png" class="home_icon_1" />
            </v-list-item-icon>
            <div>
              <v-list-item-subtitle class="home_all_1"
                >1,128,966,992</v-list-item-subtitle
              >
              <v-list-item-title class="home_all_2">引用关系</v-list-item-title>
            </div>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <img src="../../src/assets/home_org.png" class="home_icon_1" />
            </v-list-item-icon>
            <div>
              <v-list-item-subtitle class="home_all_1"
                >1,123,897</v-list-item-subtitle
              >
              <v-list-item-title class="home_all_2">科研机构</v-list-item-title>
            </div>
          </v-list-item>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="hot_field_title"
                >热门领域：</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>

          <v-list rounded>
            <v-list-item-group v-model="item" color="primary">
              <v-list-item v-for="(item, i) in hot_field" :key="i">
                <div class="home_hot_field">{{ i + 1 }}.</div>
                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      topOrg: [
        {
          name: "中国科学院 (CAS)",
        },
        {
          name: "Harvard University",
        },
        {
          name: "Max Planck Society",
        },
        {
          name: "French National Centre for Scientific Research",
        },
        {
          name: "中国科学院大学",
        },
      ],
      topJour: [
        {
          name: 'Nature'
        },
        {
          name: 'The New England Journal of Medicine'
        },
        {
          name: 'Science'
        },
        {
          name: 'The Lancet'
        },
        {
          name: 'Advanced Materials'
        }
      ],
      topCon: [
        {
          name: 'CVPR (IEEE/CVF Conference on Computer Vision and Pattern Recognition)'
        },
        {
          name: 'ICLR (International Conference on Learning Representations)'
        },
        {
          name: 'NIPS (Neural Information Processing Systems)'
        },
        {
          name: 'ICCV (IEEE/CVF International Conference on Computer Vision)'
        },
        {
          name: 'ICML (International Conference on Machine Learning)'
        }
      ],
      hot_istt: [
        { name: "name1" },
        { name: "name2" },
        { name: "name3" },
        { name: "name4" },
        { name: "name5" },
      ],
      hot_field: [
        { name: "CLINICAL MEDICINE" },
        { name: "CHEMISTRY" },
        { name: "MATERIALS SCIENCE" },
        { name: "ENGINEERING" },
        { name: "BIOLOGY & BIOCHEMISTR" },
        { name: "PHYSICS" },
        { name: "MOLECULAR BIOLOGY & GENETICS" },
        { name: "ENVIRONMENT/ECOLOGY" },
        { name: "NEUROSCIENCE & BEHAVIOR" },
        { name: "SOCIAL SCIENCES, GENERAL" },
      ],
    };
  },
  methods: {
    ToRank(){
      this.$router.push({name: 'statisticsRank'});
    }
  }
};
//hot_field来源于"https://esi.clarivate.com/IndicatorsAction.action"
</script>

<style scoped lang="scss">
.home-page {
  background-color: white;
  padding-top: 40px;
  //绝对，为了使顶部内容正常显示，不被search-bar遮挡
  width: vw(1920);
  display: flex;
}
.main_container_2 {
  width: vw(1200);
  margin-top: vh(20);
}
.home_left_zone {
  width: vw(1300);
  display: flex;
}
.card_1 {
  width: vw(350);
  margin-left: vw(110);
  margin-top: vw(50);
}
.card_2 {
  width: vw(350);
  margin-left: vw(80);
  margin-top: vw(50);
}
.card_3 {
  width: vw(350);
  margin-left: vw(80);
  margin-top: vw(50);
}
.card_title_1 {
  font-size: vw(30);
  font-weight: bold;
  font-family: "Source Han Sans CN Normal", sans-serif;
  color: #232f3d;
  margin-bottom: vw(20);
}
.card_content_1 {
  font-size: 1.1rem;
  color: rgba(0, 0, 0, 0.8);
  text-justify: auto;
  font-family: "Source Han Sans CN Normal", sans-serif;
  font-weight: 400;
  letter-spacing: 0.009375rem;
  line-height: 28px;
  display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
  -webkit-line-clamp: 1; /*显示的行数；如果要设置2行加...则设置为2*/
  overflow: hidden; /*超出的文本隐藏*/
  text-overflow: ellipsis; /* 溢出用省略号*/
  -webkit-box-orient: vertical; /*伸缩盒子的子元素排列：从上到下*/
}

.card_home_right {
  margin-top: vw(50);
  width: vw(400);
  margin-left: vw(90);
  padding-top: 10px;
  padding-left: 10px;
}

.home_icon_1 {
  width: vw(30);
  height: vw(30);
}
.home_all_1 {
  font-size: vw(20);
}
.home_all_2 {
  font-size: vw(22);
  font-weight: vw(400);
  color: #232f3d;
  margin-top: 3px;
  font-family: "Source Han Sans CN Normal", sans-serif;
}
.home_hot_field {
  margin-right: 5px;
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.078125rem;
  font-family: "Source Han Sans CN Normal", sans-serif;
}
.hot_field_title {
  font-weight: bold;
  color: #232f3d;
  margin-top: 30px;
  font-family: "Source Han Sans CN Normal", sans-serif;
  font-size: 1.6rem;
}
</style>