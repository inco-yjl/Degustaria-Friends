<template>
  <div class="layout" v-if="status">
    <v-container>
      <v-row  no-gutters>
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
            <v-row>
              <v-tabs>
                <v-tab v-for="(item,index) in this.order_type" :key="index" @click="order_change(index)">
                  {{item.name}}
                  <v-icon v-if="active_order===index&&index!==0">{{ item.order==0?des_svg:asc_svg }}</v-icon>
                </v-tab>
              </v-tabs>
            </v-row>

            <v-row>
                <search-result v-if="this.n_page!==undefined"
                               v-for="(paper,index) in this.papers"
                               :paper="paper"
                ></search-result>
            </v-row>
            <v-btn @click="check"></v-btn>
            <v-row >
              <div class="pagination">
                <v-pagination
                    v-model="page"
                    :length="this.n_page"
                    :next-icon="nextIcon"
                    :prev-icon="prevIcon"
                    :page="page"
                    :total-visible=Math.min(10,this.n_page)

                ></v-pagination>
              </div>
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
import {searchRequest} from "@/views/SearchResult/searchRequest";
import { mdiArrowUp,mdiArrowDown,mdiArrowRight,mdiArrowLeft } from '@mdi/js';
import { ref, computed } from 'vue'
export default {
  name: "SearchResultPage",
  components: {SearchResult, AsideArtributeFilter, AsideTimeFlitter, SearchHeader},
  data: () => ({
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
    nextIcon: mdiArrowRight,
    prevIcon: mdiArrowLeft,
    page: 1,
    n_page:1,
    papers:[],
    status:true,

  }),
  methods:{
    check(){
      console.log(this.papers,this.n_page)
    },
    update(){
      let _this=this
      // this.status=false
      return searchRequest(this.$store.getters.get_search_param).
      then((res)=>{
        let data=res.data
        console.log("搜索结果：")
        console.log(data)
        _this.$store.commit('mod_page_info',data)
        _this.n_page=data.n_page
        _this.papers=data.papers
        console.log("准备刷新")
        // _this.status=true
        // _this.$forceUpdate()

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
  watch:{
    page(old_value,new_value){
      if(old_value!==new_value){
        this.page_change()
      }
    },
  },

  mounted() {
    console.log("准备渲染")
    this.update()
    // this.papers=this.$store.getters.get_page_info.papers
    // this.n_page=this.$store.getters.get_page_info.n_page
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