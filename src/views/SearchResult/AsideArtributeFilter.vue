<template>
<div class="border">
  <div v-if="showFilter">
    <div style="height: 20px">
      <v-subheader>
        {{title}}
      </v-subheader>
    </div>
    <div class="checkbox" v-for="i in Math.min(label.length,showNums)">
      <v-tooltip right v-if="tooLong(label[i-1])">
        <template v-slot:activator="{ on, attrs }">
          <div
              v-bind="attrs"
              v-on="on"
          >
            <v-checkbox
                color="primary"
                :label="brief(label[i-1])"
                v-model="selected[i-1]"
                @click="update"
            >
            </v-checkbox>
          </div>
        </template>
        <span>{{label[i-1]}}</span>
      </v-tooltip>
      <v-checkbox
          v-if="!tooLong(label[i-1])"
          color="primary"
          :label="brief(label[i-1])"
          v-model="selected[i-1]"
          @click="update"
      >
      </v-checkbox>

    </div>
    <div class="more" @click="change">
      <v-icon x-large>{{moreIcon}}</v-icon>
    </div>
  </div>
  <div v-if="!showFilter">
    <v-sheet
        color="grey lighten-4"
    >
      <v-skeleton-loader
          class="loading"
          type="card"
      ></v-skeleton-loader>
    </v-sheet>
  </div>
</div>
</template>

<script>
import {searchRequest} from "@/views/SearchResult/searchRequest";
export default {
  name: "AsideArtributeFilter",
  props:{
    title:{
      type:String,
      default: "filter_sub"
    },
  },
  data(){
    return{
      selected:[],
      showNums:0,
      moreIcon:"mdi-chevron-down",
      mini_showNum:0,
      max_showNum:10,
      label:[],//需要显示的
      subjects:[],
      state:true,
    }
  },
  mounted() {
    this.update_datas()
  },
  computed:{
    showFilter(){
      return this.state
    }
  },
  methods:{
    brief(str){
      if(str.length>28)
        return str.substr(0,25)+"..."
      return str
    },
    tooLong(str){
      return str.length>28
    },
    update_datas(){
      this.selected.splice(0,this.selected.length)
      this.subjects.splice(0,this.selected.length)
      let param=this.$store.getters.get_search_param
      let page_info=this.$store.getters.get_page_info
      let filter=[]
      console.log("in update_datas"+"page_info:",this.$store.getters.get_page_info)
      if(this.title==="来源"){
        filter=param.filter_src
        this.subjects=page_info.source
      }else if(this.title==="领域"){
        filter=param.filter_field
        this.subjects=page_info.field
      }else if(this.title==="机构"){
        filter=param.filter_org
        this.subjects=page_info.org
      }
      console.log("侧边栏更新："+this.title)
      console.log("filter:",filter)
      console.log("subjects:",this.subjects)
      this.label.splice(0,this.label.length)
      console.log("原来的label",this.label)
      for(let i=0; filter!==undefined&&i<filter.length; i++){
        this.selected.push(true);
        this.label.push(filter[i])
      }
      console.log("添加过filter后的label",this.label)
      for(let i=0;i<this.subjects.length;i++){
        if(this.label.indexOf(this.subjects[i])!==-1){
          continue
        }
        this.selected.push(false);
        this.label.push(this.subjects[i])
      }
      this.$forceUpdate()
    },
    change(){
      this.showNums=this.showNums===Math.min(this.subjects.length,this.max_showNum)?this.mini_showNum:Math.min(this.subjects.length,this.max_showNum)
      this.moreIcon=this.moreIcon==="mdi-chevron-down"?"mdi-chevron-up":"mdi-chevron-down";
    },
    update(){
      console.log(this.title+"开始update")
      let param=Object.assign({},this.$store.getters.get_search_param)
      param.filter_org=[]
      param.filter_field=[]
      param.filter_src=[]
      for(let i=0;i<this.selected.length;i++){
        if(this.selected[i]){
          switch (this.title) {
            case '机构':
              param.filter_org.push(this.label[i])
              break;
            case '来源':
              param.filter_src.push(this.label[i])
              break;
            case '领域':
              param.filter_field.push(this.label[i])
              break;
          }
        }
      }
      this.$store.commit("mod_search_param",param)
      this.state=false
      searchRequest(param).then((res)=>{
        console.log(this.title+"收到",res.data)
        this.$store.commit('mod_page_info',res.data)
        this.update_datas()
        this.state=true
      })
      console.log("in artribute aside",this.$store.getters.get_search_param)
      this.$emit('update')
    },
  },

}
</script>

<style scoped lang="scss">
.border{
  border-color: #232f3d;
  border:vw(1);
  border-radius: vw(10);
  border-style: solid;
  background: white;
  padding-left: 3%;
  padding-right: 3%;
}
.checkbox{
  height: vh(30);
  margin-bottom: vh(5);
}
.more{
  height: vh(40);
  position: relative;
  top: vh(-15);
  width: 100%;
  text-align: center;
}
.loading{
  margin: vh(20);
  height: vh(200);
  width: vw(100);
}
</style>