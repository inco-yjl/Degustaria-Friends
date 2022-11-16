<template>
  <div>
    <div style="display: flex;">
      <div class="focus_1">
        <v-btn depressed large @click="into_another_son(1)">关注</v-btn>
      </div>
      <div class="focus_2">
        <v-btn depressed large color="blue-grey lighten-4" @click="into_another_son(2)">推荐</v-btn>
      </div>
      <div class="focus_3">
        <v-btn depressed large @click="into_another_son(3)">收藏</v-btn>
      </div>
      <v-btn
        color="blue-grey darken-3"
        class="add_keyword_class"
        @click="overlay = !overlay"
      >
        管理订阅关键词
      </v-btn>

      <div style="text-align: center;">
        <v-overlay
          :absolute="absolute"
          :opacity="opacity"
          :value="overlay"
        >
          <div class="display_box_1">
            <div style="display: flex;">
              <div class="headline_display_1">我关注的领域：</div>
              <div class="headline_display_2">*点击进入该领域</div>
            </div>
            <div class="display_item_1">
              <div 
                v-for="item in concern_field"
                :key="item.id"
              >
                <div class="display_item_2">{{item.name}}</div>
              </div>
            </div>
            <div style="display: flex;">
              <div class="headline_display_3">添加订阅关键词：</div>
              <div class="headline_display_4">*点击即可添加</div>
            </div>
            <v-text-field
              solo
              label="Append"
              append-icon="mdi-plus"
              class="add_key_focus_1"
            >
            </v-text-field>
            <div class="display_item_3">
              <div 
                v-for="item in rcmd_field"
                :key="item.id"
              >
                <div class="display_item_4">{{item.name}}</div>
              </div>
            </div>
          </div>
          <v-btn class="display_botton_1" fab dark color="blue-grey darken-2" @click="overlay = false">
            <v-icon dark>mdi-close</v-icon>
          </v-btn>
        </v-overlay>
      </div>
    </div>
    <div>
      <v-card
        class="home_focus_card_2"
        v-for="item in recommand_content"
        :key="item.id"
      >
        <v-list-item-title class="headline_2">{{item.article_name}}</v-list-item-title>
        <v-list-item-subtitle class="subtitle_recommand_1">{{item.author}}</v-list-item-subtitle>
        <div class="recommand_book">{{item.book}}</div>
        <div class="quote_recommand">
          <div>
            <p class="font-weight-black">Number of citation：{{item.quote_num}}</p>
          </div>
          <div style="margin-left: 20px;">
            <p class="font-weight-black">Number of visits：{{item.page_view}}</p>
          </div>
        </div>
        <div class="recommand_icon_fa">
          <img src="@/assets/quote.png" class="recommand_icon_1" />
          <img src="@/assets/art_sc.png" class="recommand_icon_2" />
        </div>
      </v-card>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      recommand_content: [
        {
          article_name: "Curvature-Adaptive Meta-Learning for Fast Adaptation to Manifold Data",
          author: "Zhi Gao,Yuwei Wu,Mehrtash T Harandi,Yunde Jia",
          book: "IEEE Transactions on Pattern Analysis and Machine Intelligence (TPAMI) （2022）",
          quote_num: 0,
          page_view: 0
        },
        {
          article_name: "Variational Deep Image Restoration",
          author: "Jae Woong Soh, Nam Ik Cho",
          book: "Computer Science、CCF A",
          quote_num: 0,
          page_view: 0
        }
      ],
      concern_field: [
        {name: "Computer Neural Network"},{name: "Computer Perception"},{name: "Intelligent Robotics"}
      ],
      rcmd_field: [
        {name: "知识工程"},{name: "进化计算"},{name: "进化计算"},{name: "智能机器人"}
      ],
      overlay: 0
    }
  },
  mounted() {

  },
  methods: {
    into_another_son(choose_num) {
      console.log(choose_num);
      if(choose_num == 1) {
        this.$router.push({
          name: "home_focus",
        });
      }
      else if(choose_num == 2) {
        this.$router.push({
          name: "home_recommend",
        });
      }
      else {
        this.$router.push({
          name: "home_collection",
        });
      }
    },
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
  .home_focus_card_2 {
    margin-left: vw(110);
    margin-top: vh(40);
    width: vw(1190);
    padding-top: 10px;
  }
  .headline_2 {
    margin-left: vw(20);
    font-size: vw(25);
    font-family: "Source Han Sans CN Normal", sans-serif;
  }
  .subtitle_recommand_1 {
    margin-left: vw(20);
    font-family: "Source Han Sans CN Normal", sans-serif;
  }
  .recommand_book {
    color: #455A64;
    margin-left: vw(20);
    margin-top: vh(10);
    font-family: "Source Han Sans CN Normal", sans-serif;
  }
  .quote_recommand {
    margin-left: vw(20);
    margin-top: vh(15);
    display: flex;
    font-family: "Source Han Sans CN Normal", sans-serif;
  }
  .recommand_icon_fa {
    display: flex;
  }
  .recommand_icon_1 {
    margin-left: vw(1070);
    width: vw(30);
    margin-bottom: vh(30);
  }
  .recommand_icon_2 {
    width: vw(30);
    margin-left: vw(25);
    margin-bottom: vh(30);
  }
  .add_keyword_class {
    color: white;
    margin-left: vw(30);
    margin-top: vh(25);
  }
  .display_box_1 {
    background-color: rgba(255,255,255,0.97);
    margin-bottom: vh(30);
    width: vw(1250);
    border-radius: vw(10);
    padding: vw(20);
    box-shadow: 0 0 5px 2px white;
  }
  .display_botton_1 {
    text-align: center;
  }
  .headline_display_1 {
    font-weight: 550;
    font-size: 1rem;
    letter-spacing: 0.009375rem;
    color: #232f3d;
    margin-top: vh(10);
    font-family: "Source Han Sans CN Normal", sans-serif;
  }
  .headline_display_2 {
    font-weight: 500;
    font-size: 0.9rem;
    letter-spacing: 0.008375rem;
    color: #90A4AE;
    margin-left: vw(10);
    margin-top: vh(10);
    font-family: "Source Han Sans CN Normal", sans-serif;
  }
  .headline_display_3 {
    font-weight: 550;
    font-size: 1rem;
    letter-spacing: 0.009375rem;
    color: #232f3d;
    margin-top: vh(70);
    font-family: "Source Han Sans CN Normal", sans-serif;
  }
  .headline_display_4 {
    font-weight: 500;
    font-size: 0.9rem;
    letter-spacing: 0.008375rem;
    color: #90A4AE;
    margin-left: vw(10);
    margin-top: vh(70);
    font-family: "Source Han Sans CN Normal", sans-serif;
  }
  .display_item_1 {
    color: #232f3d;
    display: flex;
    margin-top: vh(20);
  }
  .display_item_2 {
    background-color: #CFD8DC;
    margin-right: vw(20);
    padding: vw(10);
    border-radius: vw(10);
    box-shadow: 0 0 5px 1px #CFD8DC;
    font-family: "Source Han Sans CN Normal", sans-serif;
  }
  .display_item_3 {
    color: #232f3d;
    display: flex;
  }
  .display_item_4 {
    background-color: #CFD8DC;
    margin-right: vw(20);
    padding: vw(10);
    border-radius: vw(10);
    box-shadow: 0 0 5px 1px #CFD8DC;
    margin-bottom: vh(20);
    font-family: "Source Han Sans CN Normal", sans-serif;
  }
  .display_item_2:hover {
    background-color: #37474F;
    margin-right: vw(20);
    color: white;
    padding: vw(10);
    border-radius: vw(10);
    box-shadow: 0 0 5px 1px #37474F;
    font-family: "Source Han Sans CN Normal", sans-serif;
  }
  .display_item_4:hover {
    background-color: #37474F;
    margin-right: vw(20);
    color: white;
    padding: vw(10);
    border-radius: vw(10);
    box-shadow: 0 0 5px 1px #37474F;
    margin-bottom: vh(20);
    font-family: "Source Han Sans CN Normal", sans-serif;
  }
  .add_key_focus_1 {
    margin-top: vh(30);
  }
  .home_icon_5 {
    width: vw(25);
    height: vw(25);
  }
</style>
