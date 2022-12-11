<template>
  <div>
    <div style="display: flex;">
      <div class="focus_1">
        <v-btn depressed large color="blue-grey lighten-4" @click="into_another_son(1)">关注</v-btn>
      </div>
      <div class="focus_2">
        <v-btn depressed large @click="into_another_son(2)">推荐</v-btn>
      </div>
      <div class="focus_3">
        <v-btn depressed large @click="into_another_son(3)">收藏</v-btn>
      </div>
    </div>
    <div>
      <v-card
        class="home_focus_card"
        v-for="item in focus_people"
        :key="item.id"
      >
        <v-list-item>
          <div class="scholer_icon_1">
            <div class="head_style_font">{{item.author_name.charAt(0)}}</div>
          </div>
          <v-list-item-content>
            <v-list-item-title class="headline_fa">{{item.author_name}}</v-list-item-title>
            <div style="display:flex;">
              <v-list-item-subtitle class="headline_focus_1">H-index：{{item.h_index}}</v-list-item-subtitle>
              <v-list-item-subtitle class="headline_focus_1">论文数：{{item.article_num}}</v-list-item-subtitle>
              <v-list-item-subtitle class="headline_focus_1">引用数：{{item.quote_num}}</v-list-item-subtitle>
            </div>
          </v-list-item-content>
        </v-list-item>

        <div class="focus_research_area" style="display: flex;">
          研究领域：
          <div class="focus_research_area_item">Computer Science</div>
          <div class="focus_research_area_item">Computer Science</div>
        </div>
      </v-card>
      <div class="page_index_1">
        <v-container>
            <v-row justify="center">
            <v-col cols="6">
                <v-container>
                <v-pagination
                    v-model="page"
                    :length="15"
                ></v-pagination>
                </v-container>
            </v-col>
            </v-row>
        </v-container>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      focus_people: [
        {
          author_name: "NAME PANYUYI",
          h_index: 70,
          article_num: 80,
          quote_num: 10809
        },
        {
          author_name: "YPWDPYM",
          h_index: 100,
          article_num: 180,
          quote_num: 18317
        },
        {
          author_name: "软工二",
          h_index: 100,
          article_num: 180,
          quote_num: 18317
        }
      ],
      user_img: "",
      user_name: "",
      user_id: "",
      user_email: "",
      page: 1
    }
  },
  mounted() {
    this.user_img = window.localStorage.getItem('user_headshot');
    this.user_name = window.localStorage.getItem('user_name')
    this.user_id = window.localStorage.getItem('user_id')
    this.user_email = window.localStorage.getItem('user_email')
    this.$axios({
      method: "post",
      url: "/get_subscribed_scholar",
      data: qs.stringify({
        username: this.user_name
      }),
    })
    .then((res) => {
      console.log(res.data);
      if(res.data.errno == 0) {
        setTimeout(() => { this.$router.push("/home/focus"); }, 1000);
        this.snackbar = true;
        this.setData({ snackbar : true });
      }
      else {
        console.log("login:", res.data);
        this.snackbar2 = true;
        this.setData({ snackbar2 : true });
      }
    })
    .catch((err) => {
      console.log(err.errno);
    });
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
  .home_focus_card {
    margin-left: vw(110);
    margin-top: vh(40);
    width: vw(1190);
    padding-bottom: vh(20);
  }
  .headline_fa {
    font-family: "Source Han Sans CN Medium", sans-serif;
    font-size: vw(27);
  }
  .headline_focus_1 {
    margin-top: vh(5);
    font-family: "Source Han Sans CN Normal", sans-serif;
  }
  .headline_focus_2 {
    margin-top: vh(5);
    margin-left: vw(10);
    font-family: "Source Han Sans CN Normal", sans-serif;
  }
  .headline_focus_3 {
    margin-bottom: vh(5);
    color: #263238;
    font-family: "Source Han Sans CN Normal", sans-serif;
  }
  .focus_research_area {
    margin-left: vw(20);
    font-family: "Source Han Sans CN Normal", sans-serif;
    font-weight: 500;
    font-size: vw(18);
    margin-top: vh(20);
  }
  .focus_research_area_item {
    background-color: #E8EAF6;
    margin-right: vw(10);
    margin-left: vw(5);
    font-family: "Source Han Sans CN Normal", sans-serif;
    padding: vw(5);
  }
  .focus_research_area_item:hover{
    background-color: #C5CAE9;
    margin-right: vw(10);
    margin-left: vw(5);
    font-family: "Source Han Sans CN Normal", sans-serif;
    padding: vw(5);
  }
  .fucous_timeline {
    border-top: solid 1px #CFD8DC;
  }
  .timeline-item_1 {
    width: 95%;
    margin-right: 5%;
  }
  .scholer_icon_1 {
    border: solid 1px #D3D3D3;
    width: vw(60);
    height: vw(60);
    border-radius: 10000px;
    margin-right: vw(20);
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .head_style_font {
    font-family: YouSheBiaoTiHei;
    color: #232f3d;
    font-size: vw(34);
  }
  .page_index_1 {
    text-align: center;
    margin-top: vh(10);
  }
</style>