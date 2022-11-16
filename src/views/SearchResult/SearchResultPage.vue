<template>
  <div class="layout">
    <v-container>
      <v-row align="start d-flex flex-nowrap" no-gutters>
<!--        侧边栏-->
        <v-col >
          <div class="aside">
            <v-row>
              <div class="aside-flitter">
                <aside-time-flitter></aside-time-flitter>
              </div>
            </v-row>
            <v-row>
              <div class="aside-flitter">
                <aside-artribute-filter :title="subject.title" :subjects="subject.subjects">
                </aside-artribute-filter>
              </div>
            </v-row>
            <v-row>
              <div class="aside-flitter">
                <aside-artribute-filter title="主题" :subjects="subject.subjects">
                </aside-artribute-filter>
              </div>
            </v-row>
            <v-row>
              <div class="aside-flitter">
                <aside-artribute-filter title="机构" :subjects="subject.subjects">
                </aside-artribute-filter>
              </div>
            </v-row>
            <v-row>
              <div class="aside-flitter">
                <aside-artribute-filter title="文献来源" :subjects="subject.subjects">
                </aside-artribute-filter>
              </div>
            </v-row>
          </div>
        </v-col>
<!--        搜索结果-->
        <v-col>
          <div class="searchResult">
            <v-row align="center">
              <v-tabs>
                <v-tab>最新</v-tab>
                <v-tab>综合</v-tab>
                <v-tab>引用数量</v-tab>
              </v-tabs>
            </v-row>
            <v-row v-for="i in 10">
              <search-result></search-result>
            </v-row>
          </div>
        </v-col>
      </v-row>

    </v-container>
  </div>
</template>

<script>
import SearchHeader from "@/views/Header/SearchHeader";
import AsideTimeFlitter from "@/views/SearchResult/AsideTimeFlitter";
import AsideArtributeFilter from "@/views/SearchResult/AsideArtributeFilter";
import SearchResult from "@/views/SearchResult/SearchResult";

export default {
  name: "SearchResultPage",
  components: {SearchResult, AsideArtributeFilter, AsideTimeFlitter, SearchHeader},
  data: () => ({
    alignments: [
      'start',
      'center',
      'end',
    ],
    subject:{
      title:"学科",
      subjects:[
        "自动化",
        "计算机应用",
        "电信技术",
        "电力技术",
        "汽车工业",
        "互联网技术",
        "航天航空科学与工程",
        "公路与水路运输",
        "汽车工业",
        "互联网技术",
      ]
    },
  }),
}
</script>

<style scoped lang="scss">
.layout{
  margin: vh(30);
  padding: 20px;
}
.aside-flitter{
  width: vw(400);
  margin-bottom: vh(10);
}
.searchResult{
  width: vw(1000);
  position: relative;
  left: vw(00);
}
.aside{
  width: vw(400);
}

</style>