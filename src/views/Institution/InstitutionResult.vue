<template>
  <div class="search-result-page">
    <div class="left-side"></div>
    <div class="right-side"></div>
    <div class="search-box">
      <div class="search-title">搜索机构:</div>
      <v-text-field
        dense
        light
        solo
        flat
        height="20"
        v-model="singleInput"
        append-icon="mdi-magnify"
        @click:append="searchInstitution()"
        background-color="rgba(255,255,255,0.85)"
        class="search-input"
        clearable
      ></v-text-field>
    </div>
    <div class="result-list">
      <v-card class="search-card" v-for="(org, index) in result" :key="index">
        <div class="orgName">{{ org.name }}</div>
        <div v-if="org.cn_name" class="orgName-cn">翻译：{{ org.cn_name }}</div>
        <div class="official-url" v-if="org.url !== 'null'">
          <img src="@/assets/icon/earth.png" /><a class="link-url" :href="org.url">{{ org.url }}</a>
        </div>
        <div class="last-line">
          <div class="wikipedia-url" v-if="org.wikipage !== 'null'">
            <img src="@/assets/icon/wikipedia_icon.png" /><a class="link-url" :href="org.wikipage">{{
              org.wikipage
            }}</a>
          </div>
          <div
            class="location"
            v-if="org.longitude !== 'null' && org.latitude !== 'null'"
          >
            <v-icon>mdi-map-marker</v-icon>
            ({{ org.longitude }},{{ org.latitude }})
          </div>
        </div>
      </v-card>
    </div>
      <v-pagination
        class="pagination"
        v-model="orgpage"
        :total-visible="7"
        :length="orgpageCount"
      ></v-pagination>
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
      orgpage: ref(1),
      orgpageCount: ref(1),
      result: [],
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.searchResult();
    });
  },
  watch: {
    orgpage(newVal) {
      this.searchResult();
    },
  },
  methods: {
    searchInstitution() {
      if (!this.singleInput || !this.singleInput.length > 0) {
        this.inputalert = true;
        console.log(1);
        setTimeout(() => {
          this.inputalert = false;
        }, 1000);
        return;
      }
      this.orgpage = 1;
      this.orgpageCount = 1;
      this.searchResult();
      this.$router.push({
        name: "institutionResult",
        query: {
          searchWord: this.singleInput,
        },
      });
    },
    searchResult() {
      console.log("!!!");
      this.$axios({
        method: "post",
        url: "/search_org",
        data: qs.stringify({
          search_word: this.singleInput,
          page: this.orgpage,
          size: 10,
        }),
      })
        .then((res) => {
          console.log(res.data);
          this.orgpageCount = res.data.amount;
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
    background-color: rgb(249,249,249);
    height: vh(1480);
    width: vw(440);
}
.right-side {
    position: fixed;
    top: -150px;
    right: 0;
    background-color: rgb(249,249,249);
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
  width: vw(900);
}
.search-card {
  margin-bottom: vh(10);
  padding-left: vw(20);
  padding-right: vw(20);
  padding-bottom: vh(10);
}
.pagination {
    padding-bottom: vh(50);
}
.orgName {
  font-family: "Times New Roman", Times, serif;
  color: #232f3d;
  font-size: vw(30);
  line-height: vh(64);
  display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
  -webkit-line-clamp: 1; /*显示的行数；如果要设置2行加...则设置为2*/
  overflow: hidden; /*超出的文本隐藏*/
  text-overflow: ellipsis; /* 溢出用省略号*/
  -webkit-box-orient: vertical; /*伸缩盒子的子元素排列：从上到下*/
}
.orgName-cn {
  margin-left: vw(20);
  font-family: Source Han Sans CN Normal;
  color: #232f3d;
  font-size: vw(16);
  line-height: vh(40);
}
.last-line {
  display: flex;
}
.official-url {
  img {
    vertical-align: text-bottom;
    margin-right: vw(5);
    height: vh(20);
  }
  font-size: vh(16);
  line-height: vh(20);
  display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
  -webkit-line-clamp: 1; /*显示的行数；如果要设置2行加...则设置为2*/
  overflow: hidden; /*超出的文本隐藏*/
  text-overflow: ellipsis; /* 溢出用省略号*/
  -webkit-box-orient: vertical; /*伸缩盒子的子元素排列：从上到下*/
}
.link-url {
  width: vw(600);

}
.wikipedia-url {
  img {
    vertical-align: text-bottom;
    margin-right: vw(5);
    height: vh(20);
  }
  font-size: vh(16);
  line-height: vh(20);
  display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
  -webkit-line-clamp: 1; /*显示的行数；如果要设置2行加...则设置为2*/
  overflow: hidden; /*超出的文本隐藏*/
  text-overflow: ellipsis; /* 溢出用省略号*/
  -webkit-box-orient: vertical; /*伸缩盒子的子元素排列：从上到下*/
}
.location {
  position: absolute;
  bottom: vh(10);
  right: vw(20);
}
</style>