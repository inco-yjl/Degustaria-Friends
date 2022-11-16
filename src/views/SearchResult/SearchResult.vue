<template>
  <div>
    <div>
      <v-card
          class="search_result_card"
          v-for="item in collect_content"
          :key="item.id"
      >
        <v-list-item-title class="headline_2_2">{{item.article_name}}</v-list-item-title>
        <v-list-item-subtitle class="subtitle_recommand_1_2">{{item.author}}</v-list-item-subtitle>
        <div class="recommand_book_2">{{item.book}}</div>
        <div class="quote_recommand_2">
          <div>
            <p class="font-weight-black">Number of citation：{{item.quote_num}}</p>
          </div>
          <div style="margin-left: 20px;">
            <p class="font-weight-black">Number of visits：{{item.page_view}}</p>
          </div>
        </div>
        <div class="recommand_icon_fa_2">
          <img src="@/assets/quote.png" class="recommand_icon_1_2" />
          <img :src="saved?collected:uncollected" class="recommand_icon_2_2" />
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import collected from "@/assets/art_sc.png";
import uncollected from "@/assets/art_sc_cancel2.png";
export default {
  name:"SearchResult",
  props:{
    collect_content:{
      default:      [
        {
          article_name: "Curvature-Adaptive Meta-Learning for Fast Adaptation to Manifold Data",
          author: "Zhi Gao,Yuwei Wu,Mehrtash T Harandi,Yunde Jia",
          book: "IEEE Transactions on Pattern Analysis and Machine Intelligence (TPAMI) （2022）",
          quote_num: 0,
          page_view: 0
        },
      ]
    },
    saved:{
      default: false,
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
.recommand_book_2 {
  color: #455A64;
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
</style>