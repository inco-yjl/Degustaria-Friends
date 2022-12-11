<template>
  <div>
    <div>
      <v-card class="search_result_card">
        <v-list-item-title class="headline_2_2">{{paper.title}}</v-list-item-title>
        <v-list-item-subtitle class="subtitle_recommand_1_2">
            {{paper.author[0]}}|{{paper.venue[0]}}
        </v-list-item-subtitle>
        <div class="recommand_book_1">
          <span class="year_info">出版单位：{{paper.publisher}}</span>
          <span class="year_info">出版时间：{{paper.year}}</span>
        </div>
        <div class="abstract_info">
          <span style="font-weight: bold">摘要：</span>
          {{paper.abstract}}
        </div>
        <div class="keywords_info">
          <span style="font-weight: bold">关键词：</span>
          <span v-for="i in paper.keywords">{{i+"; "}}</span>
        </div>
        <div class="quote_recommand_2">
          <div>
            <p class="font-weight-black">引用量：{{paper.n_citation}}</p>
          </div>
        </div>
        <div class="recommand_icon_fa_2">
          <img src="@/assets/quote.png" class="recommand_icon_1_2" />
          <img :src="saved?collected:uncollected" class="recommand_icon_2_2" @click="change_collect()"/>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import collected from "@/assets/art_sc.png";
import uncollected from "@/assets/art_sc_cancel2.png";
import {collect_paper, searchRequest} from "@/views/SearchResult/searchRequest";
export default {
  name:"SearchResult",
  props:{
    paper:{
      type:Object,
      default:
        {
          id:0,
          title:"架设东西方的桥梁——英国汉学家理雅各研究",
          author:["岳峰","张伟"],
          venue:["福建师范大学","北京大学"],
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
          url:"",
          publisher:"史学理论研究",
        },

    },
    saved:{
      type:Boolean,
      default: false,
    },
    type:{
      type:String,
      default:"期刊"
    }
  },
  data() {
    return {
      collected:collected,
      uncollected:uncollected,
    }
  },
  mounted() {

  },
  methods: {
    change_collect(){
      this.saved=!this.saved
      let user_name=window.localStorage.getItem("user_name")
      let op=this.saved?0:1
      let id=this.paper.id
      let param={
        op,
        id,
        user_name,
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
      collect_paper(param).then((res)=>{
        let state=res.data.state
        this.saved=state===1
      })
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
  margin-left: vw(700);
  width: vw(30);
  margin-bottom: vh(30);
}
.recommand_icon_2_2 {
  width: vw(31);
  height: vw(31);
  margin-left: vw(25);
  margin-bottom: vh(30);
}
.year_info{
  color: #282626;
  margin-left: vw(20);
  margin-top: vh(10);
  font-family: "Source Han Sans CN Normal", sans-serif;
}
</style>