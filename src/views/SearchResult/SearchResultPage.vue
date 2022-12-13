<template>
  <div class="layout" >
    <v-container>
      <v-row  no-gutters>
<!--        侧边栏-->
        <v-col >
          <div class="aside" >
            <v-row>
              <div class="aside-flitter">
                <aside-time-flitter @update="update" :time_end="this.time_end"
                                    :time_start="this.time_start"></aside-time-flitter>
              </div>
            </v-row>
            <v-row v-if="source_not_null">
              <div class="aside-flitter" >
                <aside-artribute-filter title="来源" @update="update"></aside-artribute-filter>
              </div>
            </v-row>
            <v-row v-if="org_not_null">
              <div class="aside-flitter" >
                <aside-artribute-filter title="机构" @update="update"></aside-artribute-filter>
              </div>
            </v-row>
            <v-row v-if="field_not_null">
              <div class="aside-flitter" >
                <aside-artribute-filter title="领域" @update="update"></aside-artribute-filter>
              </div>
            </v-row>
          </div>
        </v-col>
<!--        搜索结果-->
        <v-col>
          <div class="searchResult">
            <v-row>
              <v-tabs>
                <v-tab v-for="(item,index) in this.order_type" :key="index" @click="order_change(index)">
                  {{item.name}}
                  <v-icon v-if="active_order===index&&index!==0">{{ item.order==0?des_svg:asc_svg }}</v-icon>
                </v-tab>
              </v-tabs>
            </v-row>

            <v-row v-if="showPapers">
                <search-result
                    v-for="paper in this.papers"
                    :paper="paper"
                ></search-result>
            </v-row>
            <v-row v-if="!showPapers">
              <v-sheet
                  color="grey lighten-4"
              >
                <v-skeleton-loader
                    class="loading"
                    type="card"
                ></v-skeleton-loader>
              </v-sheet>
            </v-row>
            <v-row v-if="no_paper&&showPapers">
              <div class="not_found">
                <v-card shaped=true>
                  <v-card-title>
                    对不起！暂无数据
                  </v-card-title>

                  <v-card-text>
                    您可以尝试减少检索条件进行检索<br>
                    我们将会努力丰富资源
                  </v-card-text>
                </v-card>
              </div>

            </v-row>
            <div class="pagination" v-if="showPapers&&!no_paper">
              <v-pagination
                  v-model="page"
                  :length="this.n_page"
                  :next-icon="nextIcon"
                  :prev-icon="prevIcon"
                  :page="page"
                  :total-visible=Math.min(10,this.n_page)

              ></v-pagination>
            </div>
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
import {searchRequest} from "@/views/SearchResult/searchRequest";
import { mdiArrowUp,mdiArrowDown,mdiArrowRight,mdiArrowLeft } from '@mdi/js';
import { ref, computed } from 'vue'
import {PAGE_SIZE} from "@/views/SearchResult/SearchDataType";
export default {
  name: "SearchResultPage",
  components: {SearchResult, AsideArtributeFilter, AsideTimeFlitter, SearchHeader},
  data: () => ({
    org:[],
    field:[],
    source:[],
    asc_svg:mdiArrowUp,
    des_svg:mdiArrowDown,
    order_type:[
      {
        name:"相关度",
        order:0,
      },
      {
        name:"发表时间",
        order:1,
      },
      {
        name:"引用量",
        order:1,
      }
    ],
    active_order:0,
    nextIcon: mdiArrowRight,
    prevIcon: mdiArrowLeft,
    page: 1,
    status:false,
    papers: [],
    time_start:1950,
    time_end:2022
  }),
  methods:{
    check(){
      console.log(this.papers,this.n_page)
      console.log("vuex内容",this.$store.getters.get_page_info)

    },
    update(){
      let _this=this
      this.status=false
      return searchRequest(this.$store.getters.get_search_param).
      then((res)=>{
        let data=res.data
        console.log("搜索结果：")
        console.log(data)
        _this.$store.commit('mod_page_info',data)
        _this.papers=this.$store.getters.get_page_info.papers
        _this.field=data.field
        _this.source=data.source
        _this.org=data.org
        _this.status=true
        _this.time_start=data.time[0]
        _this.time_end=data.time[1]
        console.log(this.status)
      })
    },
    order_change(index){
      this.active_order=index
      this.order_type[index].order=1-this.order_type[index].order
      let param=this.$store.getters.get_search_param
      param.order=this.order_type[index].order
      param.order_type=index
      this.$store.commit("mod_search_param",param)
      console.log('修改排序',this.$store.getters.get_search_param)
      this.update()
    },
    page_change(){
      let param=this.$store.getters.get_search_param
      param.page=this.page
      this.$store.commit("mod_search_param",param)
      console.log('修改page',this.$store.getters.get_search_param)
      this.update()
    },

  },
  computed:{
    n_page(){
      return this.$store.getters.get_page_info.n_page
    },
    showPapers(){
      return this.status
    },
    source_not_null(){
      return this.source.length!==0
    },
    field_not_null(){
      return this.field.length!==0
    },
    org_not_null(){
      return this.org.length!==0
    },
    no_paper(){
      return this.$store.getters.get_page_info.n_page===0
    }
  },
  watch:{
    page(old_value,new_value){
      if(old_value!==new_value){
        this.page_change()
      }
    },
  },
  created() {
    this.papers=this.$store.getters.get_page_info.papers
    this.field=this.$store.getters.get_page_info.field
    this.source=this.$store.getters.get_page_info.source
    this.org=this.$store.getters.get_page_info.org
    this.time_start=this.$store.getters.get_page_info.time[0]
    this.time_end=this.$store.getters.get_page_info.time[1]
    this.status=true
  }

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
  left: vw(00);
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin: 0;
  border: 0;
  padding:0;

}
.aside{
  width: vw(400);
}
.pagination{
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  //left: vw(-120);
  top: vh(40);
}
.loading{
  width: vw(700)
}
.not_found{
  margin: vw(10);
  padding: vh(10);
  width: vw(800);
  height: vh(800);
}

.headline_2_2 {
  margin-left: vw(20);
  font-size: vw(40);
  font-weight: vw(16);
  font-family: "Source Han Sans CN Normal", sans-serif;
}
</style>