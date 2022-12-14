<template>
  <div class="search-result-page">
    <div class="left-side"></div>
    <div class="right-side"></div>
    <div class="search-box">
      <div class="search-title">搜索学者:</div>
      <v-text-field
        dense
        light
        solo
        flat
        height="20"
        v-model="singleInput"
        append-icon="mdi-magnify"
        @click:append="searchScholar()"
        background-color="rgba(255,255,255,0.85)"
        class="search-input"
        clearable
      ></v-text-field>
    </div>
    <div class="result-list">
      <div v-if="loaded !== 0">
        <v-card
          class="search-card"
          v-for="(item, index) in result"
          :key="index"
          @click="ToScholar(item)"
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

          <div class="focus_research_area">
            <div class="research-area-title">研究领域：</div>
            <div class="search-item">
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
      <v-pagination
        class="pagination"
        v-model="scholarPage"
        :total-visible="7"
        :length="scholarPageCount"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import qs from "qs";
export default {
  data() {
    var input = this.$route.query.searchWord;
    return {
      singleInput: ref(input),
      scholarPage: ref(1),
      scholarPageCount: ref(1),
      result: [],
      loaded: ref(0),
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.searchResult();
    });
  },
  watch: {
    scholarPage(newVal) {
      this.searchResult();
    },
  },
  methods: {
    ToScholar(item) {
      this.$router.push({
        name: "ScholarShow",
        query: {
          id: item.id,
        },
      });
    },
    searchScholar() {
      if (!this.singleInput || !this.singleInput.length > 0) {
        return;
      }
      this.scholarPage = 1;
      this.scholarPageCount = 1;
      this.searchResult();
      this.$router.push({
        name: "scholarResult",
        query: {
          searchWord: this.singleInput,
        },
      });
    },
    searchResult() {
      this.loaded = 0;
      this.$axios({
        method: "post",
        url: "/search_scholar",
        data: qs.stringify({
          search_word: this.singleInput,
          page: this.scholarPage,
          size: 10,
        }),
      })
        .then((res) => {
          console.log(res.data);
          this.loaded = 1;
          this.scholarPageCount = res.data.amount;
          this.result = res.data.list;
        })
        .catch((err) => {
          console.log(err.errno);
        });
    },
  },
};
</script>

<style scoped lang="scss">
.search-result-page {
  position: relative;
  margin-top: 150px;
}
.left-side {
  position: fixed;
  top: -150px;
  left: 0;
  background-color: rgb(249, 249, 249);
  height: vh(1480);
  width: vw(440);
}
.right-side {
  position: fixed;
  top: -150px;
  right: 0;
  background-color: rgb(249, 249, 249);
  height: vh(1480);
  width: vw(440);
}
.search-box {
  display: flex;
  padding-right: vw(600);
  padding-left: vw(600);
}
.search-title {
  font-family: Source Han Sans CN Normal;
  line-height: vh(50);
  font-size: vw(18);
  padding-right: vw(10);
}
.search-input {
  border: 1.5px solid black;
  border-radius: 5px;
  height: vh(50);
}
.result-list {
  margin-top: vh(20);
  margin-left: vw(500);
  padding-bottom: vh(50);
  width: vw(900);
}
.search-card {
  margin-bottom: vh(10);
  padding-left: vw(20);
  padding-right: vw(20);
  padding-bottom: vh(10);
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
.research-area-title {
  width: vw(100);
}
.focus_research_area {
  display: flex;
  flex-wrap: wrap;
  margin-left: vw(20);
  font-family: "SourceHanSerifCN", sans-serif;
  font-weight: 500;
  font-size: vw(18);
  margin-top: vh(20);
}
.search-item {
  width: vw(700);
}
.focus_research_area_item {
  margin-right: vw(10);
  margin-left: vw(5);
  font-family: "optima", sans-serif;
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
  margin-left: vw(0.5);
  width: vw(900);
  height: vw(990);
  // border: 1px solid #232f3d;
}
.mx-auto {
  margin-top: vh(10);
}
</style>