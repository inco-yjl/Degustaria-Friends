<template>
  <div>
    <div>
      <v-card class="search_result_card">
        <v-list-item-title class="headline_2_2">{{paper.title}}</v-list-item-title>
        <v-list-item-subtitle class="subtitle_recommand_1_2">
            {{text_process("第一作者："+paper.author[0])}}{{text_process(" | 来源："+text_process(paper.venue))}}
        </v-list-item-subtitle>
        <div class="recommand_book_1" v-if="this.mode==MODE_PAPER">
          <span class="year_info">出版单位：{{text_process(paper.publisher)}}</span>
          <span class="year_info">出版时间：{{text_process(paper.year)}}</span>
        </div>
        <div class="recommand_book_1" v-if="this.mode==MODE_PATENT">
          <span class="year_info">机构：{{text_process(paper.publisher)}}</span>
          <span class="year_info">应用时间：{{text_process(paper.apply_datetime)}}</span>
        </div>

        <v-list-item-action-text>
          <div class="abstract_info" v-if="this.mode==MODE_PAPER">
            <span style="font-weight: bold">摘要：</span>
            {{text_process(this.abstract)}}
          </div>
          <div class="abstract_info" v-if="this.mode==MODE_PROJECT">
            <span style="font-weight: bold">项目简介：</span>
            {{text_process(paper.introduction)}}
          </div>
        </v-list-item-action-text>

        <div class="keywords_info">
          <span style="font-weight: bold">关键词：</span>
          <span v-for="i in paper.keywords">{{text_process(text_process(i)+"; ")}}</span>
        </div>
        <div class="quote_recommand_2">
          <div>
            <p class="font-weight-black">引用量：{{text_process(paper.n_citation)}}</p>
          </div>
        </div>
        <div class="recommand_icon_fa_2">
          <img src="@/assets/quote.png" class="recommand_icon_1_2" @click="open_dialog()"/>
          <img :src="saved?collected:uncollected" class="recommand_icon_2_2" @click="change_collect()"/>
          <img :src="download_img" class="recommand_icon_2_2" @click="download()"/>
        </div>

      </v-card>
    </div>
    <v-snackbar
        v-model="snackbar"
        :bottom="y === 'bottom'"
        color="error"
        :multi-line="mode === 'multi-line'"
        :timeout=3000
        :top=true
    >
      暂无资源

      <template v-slot:action="{ attrs }">
        <v-btn
            dark
            text
            v-bind="attrs"
            @click="snackbar = false"
        >
           关闭
        </v-btn>
      </template>
    </v-snackbar>
    <v-dialog
        v-model="dialog_show"
        max-width="350"
    >
      <v-card>
        <v-card-title class="headline">GB/T 7714-2015 格式引文</v-card-title>
        <v-card-text>
          {{this.context}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="black darken-1"
              text
              @click="dialog_show = false"
          >
            关闭
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import downloadImg from "@/assets/download.png"
import undownloadImg from "@/assets/nodownload.png"
import collected from "@/assets/art_sc.png";
import uncollected from "@/assets/art_sc_cancel2.png";
import {collect_paper, searchRequest} from "@/views/SearchResult/searchRequest";
import {MODE_PAPER,MODE_PROJECT,MODE_PATENT,} from "@/views/SearchResult/SearchDataType";
export default {
  name:"SearchResult",
  props:{
    paper:{
      type:Object,
      default:()=>{
        return {
          id:0,
          title:"架设东西方的桥梁——英国汉学家理雅各研究",
          author:["岳峰","张伟"],
          venue:"史学理论研究",//来源
          year: 2022,
          keywords:["理雅各","传教士","翻译", "香港教育", "汉学"],
          abstract:"本文原载英文版《近现代中国》(Modern China)第17卷第3期,1991年7月。文章发表后在美国理论界、史学界激起很大反响。现经作者同意,特在本刊发表(略有删节)。由于文中提到中国经济社会史上一系列重要的理论问题,如自明清以来的资本主义萌芽问题、商品化与发展的问题、自然经济与市场的问题、公民权力与公众领域问题、封建主义问题等等。特别是作者以方法论的高度提出在这些问题研究上的“规范认识危机”和一系列悖论现象,向传统的解释提出挑战。长期以来,这些问题在海内外的学术界一直存在不同的看法和争论,为了使这种探讨深入下去,我们准备围绕黄宗智教授在这篇论文中提出的这些问题展开讨论,欢迎海内外的学者参加讨论。",
          field:[],
          n_citation:103,
          lang:"",
          issn:"",
          isbn:"",
          doi:"",
          pdf:"",
          url:["http://www.baidu.com"],
          publisher:"北京大学",//出版单位
          apply_datetime:"2022-05-13",
          org:"中国福利院",
          introduction:"这是项目的简介这是项目的简介这是项目的简介这是项目的简介这是项目的简介这是项目的简介这是项目的简介"
        }
      }

    },
    saved:{
      type:Boolean,
      default: false,
    },
    mode:{
      type:Number,
      default:MODE_PAPER
    }
  },
  data() {
    return {
      undownloadImg:undownloadImg,
      downloadImg:downloadImg,
      collected:collected,
      uncollected:uncollected,
      dialog_show:false,
      MODE_PAPER,MODE_PROJECT,MODE_PATENT,
      snackbar:false,
    }
  },
  mounted() {

  },
  computed:{
    download_img(){
      if(this.paper.url.length===0||this.paper.url[0]=='null'||this.paper.url[0].length==0){
        return this.undownloadImg
      }
      return this.downloadImg
    },
    context(){
      let ret="[1] "
      for(let index=0; index< this.paper.author.length;index++){
        ret+=this.paper.author[index]
        ret+="."
      }
      ret+=this.paper.title+"[J]."
      ret+=this.paper.publisher+","+this.paper.year+"."
      ret+=this.paper.url[0]
      return ret
    },
    abstract(){
      if(this.paper.abstract.length>300){
        return this.paper.abstract.substr(0,300)+"..."
      }
      return this.paper.abstract.length
    }
  },
  methods: {
    text_process(str){
      if(str===undefined||str==="null"||str.length===0){
        return "未知"
      }
      return str
    },
    download(){
      if(this.paper.url.length===0||this.paper.url[0]=='null'||this.paper.url[0].length==0){
        this.snackbar=true
      }else {
        window.location.href=this.paper.url[0]
      }
    },
    open_dialog(){
      this.dialog_show=true
    },
    change_collect(){
      this.saved=!this.saved
      let user_name=window.localStorage.getItem("user_name")
      let op=this.saved?0:1
      let id=this.paper.id
      let mode=param.mode
      let param={
        op,
        id,
        user_name,
        mode,
      }
      collect_paper(param).then(()=>{
        this.update_collect()
      })
    },
    update_collect(){
      let user_name=window.localStorage.getItem("user_name")
      let op=2
      let id=this.paper.id
      let param={
        op,
        id,
        user_name,
      }
      // collect_paper(param).then((res)=>{
      //   let state=res.data.state
      //   this.saved=state===1
      // })
    }
  },
  created() {
    this.update_collect()


  }

}
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
.focus_3 {
  margin-left: vw(20);
  color: #232f3d;
  margin-top: vh(20);
}

.search_result_card {
  margin: vw(10);
  padding: vh(10);
  width: vw(1000);

}
.headline_2_2 {
  margin-left: vw(20);
  font-size: vw(25);
  font-family: "Source Han Sans CN Normal", sans-serif;
}
.subtitle_recommand_1_2 {
  margin-left: vw(20);
  font-family: "Source Han Sans CN Normal", sans-serif;
}
.abstract_info {
  color: #555555;
  margin-left: vw(20);
  margin-top: vh(10);
  font-family: "Source Han Sans CN Normal", sans-serif;
}
.keywords_info{
  color: #282626;
  margin-left: vw(20);
  margin-top: vh(10);
  font-family: "Source Han Sans CN Normal", sans-serif;
}
.quote_recommand_2 {
  margin-left: vw(20);
  margin-top: vh(15);
  display: flex;
  font-family: "Source Han Sans CN Normal", sans-serif;
}
.recommand_icon_fa_2 {
  display: flex;
}
.recommand_icon_1_2 {
  margin-left: vw(820);
  width: vw(30);
  margin-bottom: vh(30);
}
.recommand_icon_1_2:hover{
  background: rgba(33, 49, 42, 0.29);
}

.recommand_icon_2_2 {
  width: vw(31);
  height: vw(31);
  margin-left: vw(25);
  margin-bottom: vh(30);
}
.recommand_icon_2_2:hover{
  background: rgba(33, 49, 42, 0.29);
}
.year_info{
  color: #282626;
  margin-left: vw(20);
  margin-top: vh(10);
  font-family: "Source Han Sans CN Normal", sans-serif;
}
</style>