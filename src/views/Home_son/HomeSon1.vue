<template>
  <div>
    <div style="display: flex">
      <div class="focus_1">
        <v-btn
          depressed
          large
          color="blue-grey lighten-4"
          v-if="user_name"
          @click="into_another_son(1)"
          >关注</v-btn
        >
      </div>
      <div class="focus_2" v-if="user_name">
        <v-btn depressed large @click="into_another_son(2)">推荐</v-btn>
      </div>
      <div class="focus_2_2" v-else>
        <v-btn
          depressed
          large
          color="blue-grey lighten-4"
          @click="into_another_son(2)"
          >推荐</v-btn
        >
      </div>
      <div class="focus_3" v-if="user_name">
        <v-btn depressed large @click="into_another_son(3)">收藏</v-btn>
      </div>
    </div>
    <div>
      <div v-if="loaded !== 0">
        <v-card
          class="home_focus_card"
          v-for="item in focus_people"
          @click="ToScholar(item)"
          :key="item.id"
        >
          <v-list-item>
            <div class="scholer_icon_1">
              <div class="head_style_font" v-if="!item.icon">
                {{ item.name1.charAt(0) }}
              </div>
              <div class="icon-div" v-else><img :src="item.icon" /></div>
            </div>
            <v-list-item-content>
              <v-list-item-title class="headline_fa">{{
                item.name1
              }}</v-list-item-title>
              <div style="display: flex">
                <v-list-item-subtitle class="headline_focus_1"
                  >H-index：{{ item.h_index }}</v-list-item-subtitle
                >
                <v-list-item-subtitle class="headline_focus_1"
                  >引用数：{{ item.citation }}</v-list-item-subtitle
                >
                <v-list-item-subtitle
                  class="headline_focus_1"
                  v-if="item.org != 'null'"
                  >机构：{{ item.org }}</v-list-item-subtitle
                >
                <v-list-item-subtitle
                  class="headline_focus_1"
                  v-if="item.org == 'null'"
                  >机构：-</v-list-item-subtitle
                >
              </div>
            </v-list-item-content>
          </v-list-item>

          <div class="focus_research_area" style="display: flex">
            研究领域：
            <div
              class="focus_research_area_item"
              v-if="item.interests != 'null'"
            >
              {{ item.interests }}
            </div>
            <div
              class="focus_research_area_item_2"
              v-if="item.interests == 'null'"
            >
              无
            </div>
          </div>
        </v-card>
      </div>
      <v-sheet class="pa-3" v-else>
        <v-skeleton-loader
          class="mx-auto"
          max-width="1200"
          height="75"
          type="list-item-avatar-three-line"
        ></v-skeleton-loader>
        <v-skeleton-loader
          class="mx-auto"
          max-width="1200"
          height="75"
          type="list-item-avatar-three-line"
        ></v-skeleton-loader>
        <v-skeleton-loader
          class="mx-auto"
          max-width="1200"
          height="75"
          type="list-item-avatar-three-line"
        ></v-skeleton-loader>
        <v-skeleton-loader
          class="mx-auto"
          max-width="1200"
          height="75"
          type="list-item-avatar-three-line"
        ></v-skeleton-loader>
        <v-skeleton-loader
          class="mx-auto"
          max-width="1200"
          height="75"
          type="list-item-avatar-three-line"
        ></v-skeleton-loader>
        <v-skeleton-loader
          class="mx-auto"
          max-width="1200"
          height="75"
          type="list-item-avatar-three-line"
        ></v-skeleton-loader>
      </v-sheet>
      <div class="page_index_1">
        <v-container>
          <v-row justify="center">
            <v-col cols="6">
              <v-container>
                <v-pagination
                  v-model="page"
                  :length="Math.ceil(user_total / 5)"
                  @input="home_get_user_list()"
                ></v-pagination>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </div>
</template>
  
<script>
import qs from "qs";
import { ref } from "vue";
export default {
  data() {
    return {
      focus_people: [],
      user_img: "",
      user_name: "",
      user_id: "",
      user_email: "",
      page: 1,
      user_total: 0,
      loaded: ref(0),
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.updateUser();
    });
  },
  mounted() {},
  methods: {
    ToScholar(item) {
      this.$router.push({
        name: "ScholarShow",
        query: {
          id: item.id,
        },
      });
    },
    updateUser() {
      this.user_img = window.localStorage.getItem("user_headshot");
      this.user_name = window.localStorage.getItem("user_name");
      this.user_id = window.localStorage.getItem("user_id");
      this.user_email = window.localStorage.getItem("user_email");
      if (!this.user_name) {
        this.into_another_son(2);
      }
      this.home_get_user_list();
      this.$axios({
        method: "post",
        url: "/get_sub_num",
        data: qs.stringify({
          username: this.user_name,
        }),
      })
        .then((res) => {
          console.log(res.data.sub_num);
          this.user_total = res.data.sub_num;
        })
        .catch((err) => {
          console.log(err.errno);
        });
    },
    home_get_user_list() {
      this.loaded = 0;
      this.$axios({
        method: "post",
        url: "/get_subscribed_scholar",
        data: qs.stringify({
          username: this.user_name,
          page: this.page,
          size: 5,
        }),
      })
        .then((res) => {
          console.log(res.data);
          this.focus_people = res.data;
          this.loaded = 1;
        })
        .catch((err) => {
          console.log(err.errno);
        });
    },
    into_another_son(choose_num) {
      console.log(choose_num);
      if (choose_num == 1) {
        this.$router.push({
          name: "home_focus",
        });
      } else if (choose_num == 2) {
        this.$router.push({
          name: "home_recommend",
        });
      } else {
        this.$router.push({
          name: "home_collection",
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.focus_1 {
  margin-left: vw(110);
  color: #232f3d;
  margin-top: vh(20);
}
.focus_2 {
  margin-left: vw(20);
  color: #232f3d;
  margin-top: vh(20);
}
.focus_2_2 {
  color: #232f3d;
  margin-top: vh(20);
}
.focus_3 {
  margin-left: vw(20);
  color: #232f3d;
  margin-top: vh(20);
}
.home_focus_card {
  margin-left: vw(110);
  margin-top: vh(40);
  width: vw(1190);
  padding-bottom: vh(20);
}
.headline_fa {
  font-family: "Calibri", sans-serif;
  font-size: vw(27);
}
.headline_focus_1 {
  margin-top: vh(5);
  font-family: "Baskerville", sans-serif;
}
.headline_focus_2 {
  margin-top: vh(5);
  margin-left: vw(10);
  font-family: "Source Han Sans CN Normal", sans-serif;
}
.headline_focus_3 {
  margin-bottom: vh(5);
  color: #263238;
  font-family: "Source Han Sans CN Normal", sans-serif;
}
.focus_research_area {
  margin-left: vw(20);
  font-family: "SourceHanSerifCN", sans-serif;
  font-weight: 500;
  font-size: vw(18);
  margin-top: vh(20);
}
.focus_research_area_item {
  margin-right: vw(10);
  margin-left: vw(5);
  font-family: "optima", sans-serif;
  width: vw(1050);
  margin-top: vh(1);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
}
.focus_research_area_item_2 {
  margin-right: vw(10);
  margin-left: vw(5);
  font-family: "SourceHanSerifCN", sans-serif;
  width: vw(1050);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
}
.fucous_timeline {
  border-top: solid 1px #cfd8dc;
}
.timeline-item_1 {
  width: 95%;
  margin-right: 5%;
}
.scholer_icon_1 {
  border: solid 1px #d3d3d3;
  width: vw(60);
  height: vw(60);
  border-radius: 10000px;
  margin-right: vw(20);
  display: flex;
  justify-content: center;
  align-items: center;
}
.head_style_font {
  font-family: Bodonitown;
  color: #232f3d;
  font-size: vw(34);
}
.icon-div {
  position: relative;
  float: left;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}
.page_index_1 {
  text-align: center;
  margin-top: vh(10);
}
.pa-3 {
  margin-left: vw(100);
  width: vw(1100);
  height: vw(590);
  // border: 1px solid #232f3d;
}
.mx-auto {
  margin-top: vh(10);
}
</style>