<template>
  <div>
    <div>
      <v-card class="search_result_card">
        <v-list-item-title class="headline_2_2">
          <span class="title" @click="gotoPaper" v-if="mode===MODE_PAPER">{{paper.title}}</span>
          <span class="title" v-else-if="mode===MODE_PROJECT" @click="gotoProject">{{paper.title}}</span>
          <span class="title" v-else @click="gotoPatent">{{paper.title}}</span>
        </v-list-item-title>
        <v-list-item-subtitle class="subtitle_recommand_1_2">
          {{text_process(this.authors)}}
        </v-list-item-subtitle>
        <div class="recommand_book_1" v-if="this.mode==MODE_PAPER">
          <div class="year_info">机构：{{text_process(paper.author_org[0])}}</div>
          <div class="year_info">出版时间：{{text_process(paper.year)}}</div>
          <div class="year_info">来源:{{text_process(paper.venue)}}</div>
        </div>
        <div class="recommand_book_1" v-if="this.mode==MODE_PATENT">
<!--          <div class="year_info">机构：{{text_process(paper.author_org[0])}}</div>-->
          <div class="year_info">申请时间：{{text_process(paper.apply_datetime.slice(0,10))}}</div>
        </div>
        <div class="recommand_book_1" v-if="this.mode==MODE_PROJECT">
          <!--          <div class="year_info">机构：{{text_process(paper.author_org[0])}}</div>-->
          <div class="year_info">计划起始时间：{{text_process(beg_end)}}</div>
          <div class="year_info">资金：{{text_process(paper.money)}}</div>
          <div class="year_info">资助机构：{{text_process(paper.financial_institution)}}</div>
          <div class="year_info">执行机构：{{text_process(paper.undertaking_institution)}}</div>

          <div class="year_info">参与方：{{text_process(paper.participant)}}</div>
        </div>

        <v-list-item-action-text v-if="this.mode==MODE_PAPER||this.mode==MODE_PROJECT">
          <div class="abstract_info" >
            <span style="font-weight: bold">摘要：</span>
            {{text_process(this.abstract)}}
          </div>
        </v-list-item-action-text>

        <div class="keywords_info" v-if="this.mode==MODE_PAPER">
          <span style="font-weight: bold">关键词：</span>
          <span v-for="i in paper.keywords">{{text_process(text_process(i)+", ")}}</span>
        </div>
        <div class="keywords_info" v-if="this.mode==MODE_PATENT">
          <span style="font-weight: bold">关键词：</span>
          <span >{{text_process(paper.keyword)}}</span>
        </div>
        <div class="quote_recommand_2" v-if="this.mode==MODE_PAPER">
          <div>
            <p class="font-weight-black">引用量：{{text_process(paper.n_citation)}}</p>
          </div>
        </div>
        <div class="quote_recommand_2" v-if="this.mode==MODE_PATENT">
          <div>
            <p class="font-weight-black">引用量：{{text_process(paper.citation)}}</p>
          </div>
        </div>
        <div class="recommand_icon_fa_2" >
          <img src="@/assets/quote.png"
               v-if="this.mode===MODE_PAPER"
               class="recommand_icon_1_2" @click="open_dialog()"/>
          <img :src="saved?collected:uncollected" class="recommand_icon_2_2" @click="change_collect()"/>
          <img :src="download_img" v-if="this.mode==MODE_PAPER||this.mode==MODE_PROJECT"
               class="recommand_icon_2_2" @click="download()"/>
        </div>

      </v-card>
    </div>
    <v-snackbar
        v-model="snackbar"
        color="error"
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
        v-if="this.mode==MODE_PAPER"
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
    index:{
      type:Number,
      default:0,
    },
    paper:{
      type:Object,
      default:()=>{
        return {
          id:0,
          title:"架设东西方的桥梁——英国汉学家理雅各研究",
          author_name:["岳峰","张伟"],
          author_org:["org1"],
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
          introduction:"这是项目的简介这是项目的简介这是项目的简介这是项目的简介这是项目的简介这是项目的简介这是项目的简介",
          "open_id": 4255928,
          "apply_id": 0,
          "actual_id": null,
          "keyword": "exhaust pipe,cover assembly\n",
          "author": "W. Richard Jones,Albert Hartman Jr.,Earl Conrad,Harry J. Kraig\n",
          "char_id": "DE220100284",
          "type": "Discovery Early Career Researcher Award",
          "money": "448020AUD",
          "director": "ASHISH GOYAL",
          "participant": "ASHISH GOYAL",
          "undertaking_institution": "null",
          "financial_institution": "Australian Research Council",
          "begin": "2023-10-01",
          "end": "2026-09-30",
          "url_name": "Australian Research Council"
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
  computed:{
    download_img(){
      if(this.paper.url.length===0||this.paper.url[0]=='null'||this.paper.url[0].length==0){
        return this.undownloadImg
      }
      return this.downloadImg
    },
    context(){
      let ret="[1] "
      for(let index=0; index< this.paper.author_name.length;index++){
        ret+=this.paper.author_name[index]
        ret+="."
      }
      ret+=this.paper.title+"[J]."
      ret+=this.paper.author_org[0]+","+this.paper.year+"."
      ret+=this.paper.url[0]
      return ret
    },
    abstract(){
      if(this.paper.abstract.length>300){
        return this.paper.abstract.substr(0,300)+"..."
      }
      else if(typeof this.abstract!=String||this.paper.abstract.length<10){
        return "暂无摘要"
      }
      return this.paper.abstract.length
    },
    beg_end(){
      if(this.paper.end!=="-"){
        return this.paper.begin+" ~ "+this.paper.end
      }else {
        return this.paper.begin+" ~ "+"完成"
      }
    },
    authors(){
      if(this.mode===MODE_PAPER){
        if(this.paper.author_name===undefined||this.paper.author_name.length==0){
          return "作者："+"佚名"
        }
        let ret=""
        for(let i=0;i<Math.min(3,this.paper.author_name.length);i++){
          ret+=this.paper.author_name[i]
          if(i!==Math.min(3,this.paper.author_name.length)-1){
            ret+=", "
          }
        }
        return "作者："+ret
      }
      else if(this.mode===MODE_PATENT){
        if(this.paper.author===undefined||this.paper.author.length===0){
          return "作者："+"佚名"
        }
        return this.paper.author
      }
      else if(this.mode===MODE_PROJECT){
        if(this.paper.director===undefined||this.paper.director.length===0){
          return "负责人："+"佚名"
        }
        return "负责人："+this.paper.director
      }
    }
  },
  methods: {
    gotoProject() {
      let id=this.paper.id
      this.$router.push({
        name:'projectDetail',
        query:{
          id:id
        }
      })
    },
    gotoPatent() {
      let id=this.paper.id
      this.$router.push({
        name:'patentDetail',
        query:{
          id:id
        }
      })
    },
    gotoPaper(){
      let id=this.paper.id
      this.$router.push({
        name:'paperDetail',
        query:{
          id:id
        }
      })
    },
    text_process(str){
      if(str===undefined||str==="null"||str.length===0){
        return "未知"
      }
      return str
    },
    download(){
      if(this.mode==MODE_PAPER){
        if(this.paper.url.length===0||this.paper.url[0]=='null'||this.paper.url[0].length==0){
          this.snackbar=true
        }else {
          window.location.href=this.paper.url[0]
        }
      }else if(this.mode==MODE_PROJECT){
        if(this.paper.url===undefined||this.paper.url=='null'||this.paper.url.length==0){
          this.snackbar=true
        }else {
          window.location.href=this.paper.url
        }
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
  mounted() {
    console.log("SearchResult 挂载")
  },

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
.title:hover{
  padding: 2%;
  border: solid;
  border-radius: 5px;
  border-color:white ;
  color: red;
  background: rgba(33, 49, 42, 0.29);;
}
</style>