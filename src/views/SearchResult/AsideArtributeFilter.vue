<template>
<div class="border">
  <div style="height: 20px">
    <v-subheader>
      {{trans[title]}}
    </v-subheader>
  </div>
  <div class="checkbox" v-for="i in Math.min(subjects.length,showNums)">
    <v-checkbox
        color="primary"
        :label="subjects[i-1]"
        v-model="selected[i-1]"
        @click="update"
    >
    </v-checkbox>
  </div>
  <div class="more" @click="change">
    <v-icon x-large>{{moreIcon}}</v-icon>
  </div>
</div>
</template>

<script>
export default {
  name: "AsideArtributeFilter",
  props:{
    subjects:{
      type:Array,
      default:()=>{
        return [
          "计算机科学与技术",
          "数学",
          "英语",
        ]
      }
    },
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
      max_showNum:6,
      trans:{
        filter_sub:"学科",
        filter_thm:"主题",
        filter_org:"机构",
        filter_src:"来源",
      }
    }
  },
  mounted() {
    for(let i=0;i<this.subjects.length;i++){
      this.selected.push(false);
    }
  },
  methods:{
    change(){
      this.showNums=this.showNums===Math.min(this.subjects.length,this.max_showNum)?this.mini_showNum:Math.min(this.subjects.length,this.max_showNum)
      this.moreIcon=this.moreIcon==="mdi-chevron-down"?"mdi-chevron-up":"mdi-chevron-down";
    },
    update(){
      let param=this.$store.getters.get_search_param
      param[this.title]=[]
      for(let i=0;i<this.subjects.length;i++){
        if(this.selected[i]){
          param[this.title].push(this.subjects[i])
        }
      }
      this.$store.commit("mod_search_param",param)
      console.log("in artribute aside",this.$store.getters.get_search_param)
      this.$emit('update')
    },
  }
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
}
.checkbox{
  height: vh(30);
  margin-bottom: vh(5);
}
.more{
  height: vh(30);
  position: relative;
  top: vh(-15);
  width: 100%;
  text-align: center;

}
</style>