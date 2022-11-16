<template>
<div class="border">
  <div style="height: 20px">
    <v-subheader>
      {{title}}
    </v-subheader>
  </div>
  <div class="checkbox" v-for="i in Math.min(subjects.length,showNums)">
    <v-checkbox
        color="primary"
        :label="subjects[i-1]"
        v-model="selected[i-1]"
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
      default:[
        "计算机科学与技术",
        "数学",
        "汽车工业",
        "电力技术",
        "计算机科学与技术",
        "数学",
        "汽车工业",
        "电力技术",
        "计算机科学与技术",
        "数学",
        "汽车工业",
        "电力技术",
      ]
    },
    title:{
      default: "学科"
    },
  },
  data(){
    return{
      selected:[],
      showNums:6,
      moreIcon:"mdi-chevron-down",
    }
  },
  mounted() {
    for(let i=0;i<this.subjects.length;i++){
      this.selected.push(false);
    }
  },
  methods:{
    change(){
      this.showNums=this.showNums==this.subjects.length?6:this.subjects.length
      this.moreIcon=this.moreIcon=="mdi-chevron-down"?"mdi-chevron-up":"mdi-chevron-down";
    }
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