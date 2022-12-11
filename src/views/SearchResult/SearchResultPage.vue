<template>
  <div class="layout">
    <v-container>
      <v-row align="start d-flex flex-nowrap" no-gutters>
<!--        侧边栏-->
        <v-col >
          <div class="aside">
            <v-row>
              <div class="aside-flitter">
                <aside-time-flitter @update="update"></aside-time-flitter>
              </div>
            </v-row>
            <v-row v-for="(af,index) in this.all_aside_artibute" :key="index">
              <div class="aside-flitter">
                <aside-artribute-filter :title=af @update="update">
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
                <v-tab v-for="(item,index) in this.order_type" :key="index" @click="order_change(index)">
                  {{item.name}}
                  <v-icon v-if="active_order===index">{{ item.order==0?des_svg:asc_svg }}</v-icon>
                </v-tab>
              </v-tabs>
            </v-row>
            <v-row v-for="i in 5" align="center" >
                <search-result></search-result>
            </v-row>

            <div class="pagination">
              <v-row align="center">

                <v-pagination
                    v-model="page"
                    :length="pageNums"
                    :next-icon="nextIcon"
                    :prev-icon="prevIcon"
                    :page="page"
                    :total-visible="totalVisible"

                ></v-pagination>
              </v-row>
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
export default {
  name: "SearchResultPage",
  components: {SearchResult, AsideArtributeFilter, AsideTimeFlitter, SearchHeader},
  data: () => ({
    alignments: [
      'start',
      'center',
      'end',
    ],
    all_aside_artibute:[
      'filter_sub','filter_thm','filter_src','filter_org'
    ],
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
    pageNums: 100,
    nextIcon: mdiArrowRight,
    prevIcon: mdiArrowLeft,
    page: 1,
    totalVisible: 9,
  }),
  methods:{
    update(){
      console.log('更新搜索条件')
      let param=this.$store.getters.get_search_param
      searchRequest(param).then((res)=>{
        console.log(res.data)
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
    }
  },
  created() {
    this.update()
  },
  watch:{
    page(old_value,new_value){
      this.page_change()
    }
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
  align-self:center;
  position: relative;
  //left: vw(-120);
  top: vh(40);
}

</style>