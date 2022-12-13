<template>
  <div>
    <div style="display: flex">
      <div class="focus_1">
        <v-btn depressed large v-if="user_name" @click="into_another_son(1)"
          >关注</v-btn
        >
      </div>
      <div class="focus_2" v-if="user_name">
        <v-btn depressed large @click="into_another_son(2)">推荐</v-btn>
      </div>
      <div class="focus_2_2" v-else>
        <v-btn
          depressed
          large
          color="blue-grey lighten-4"
          @click="into_another_son(2)"
          >推荐</v-btn
        >
      </div>
      <div class="focus_3" v-if="user_name">
        <v-btn
          depressed
          large
          @click="into_another_son(3)"
          color="blue-grey lighten-4"
          >收藏</v-btn
        >
      </div>
    </div>
    <div>
      <v-card
        class="home_focus_card_2"
        v-for="item in recommand_content"
        :key="item.id"
      >
        <v-list-item-title class="headline_2">{{
          item.title
        }}</v-list-item-title>
        <div class="author_rcm">
          <div
            v-for="item2 in item.author_name"
            :key="item2.id"
            style="float: left"
          >
            <v-list-item-subtitle class="subtitle_recommand_1">{{
              item2
            }}</v-list-item-subtitle>
          </div>
        </div>
        <v-list-item-subtitle class="subtitle_recommand_1">{{
          item.year
        }}</v-list-item-subtitle>
        <div class="recommand_book">Abstract：</div>
        <div class="recommand_book_2" v-if="item.abstract != 'null'">
          {{ item.abstract }}
        </div>
        <div class="recommand_book_3" v-if="item.abstract == 'null'">-</div>
        <div style="display: flex">
          <div class="quote_recommand_fa">
            <p class="quote_recommand_0">引用量：</p>
            <p class="quote_recommand">{{ item.n_citation }}</p>
          </div>
          <div class="recommand_icon_1" @click="into_detail(item.url[0])">
            <v-icon color="#232f3d" class="recommand_icon_3" medium>
              mdi-earth
            </v-icon>
            <p class="quote_recommand_1">原文链接</p>
          </div>
          <v-icon color="#232f3d" medium class="recommand_icon_2">
            mdi-star-minus
          </v-icon>
        </div>
      </v-card>
      <div class="page_index_2">
        <v-container>
          <v-row justify="center">
            <v-col cols="6">
              <v-container>
                <v-pagination
                  v-model="page"
                  :length="page_all"
                  @input="home_get_user_list_3()"
                ></v-pagination>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <v-snackbar
        v-model="snackbar"
        :top="y === 'top'"
        :vertical="mode === 'vertical'"
      >
        {{ text }}
        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>
  
<script>
import qs from "qs";
export default {
  data() {
    return {
      recommand_content: [],
      overlay: 0,
      page: 1,
      page_all: 0,
      user_img: "",
      user_name: "",
      user_id: "",
      user_email: "",
      user_rcm_total: 0,
      hover: false,
      snackbar: false,
      text: "暂无数据",
      color: "",
      mode: "",
      timeout: 3000,
      x: null,
      y: "top",
      keyword: ["AI", "a"],
      arr1: [],
      arr2: [],
      arr_len: 2,
      input_keyword: "",
      add_tmp_str: "",
      del_tmp_str: "",
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.updateUser();
    });
  },
  mounted() {},
  methods: {
    updateUser() {
      this.user_img = window.localStorage.getItem("user_headshot");
      this.user_name = window.localStorage.getItem("user_name");
      this.user_id = window.localStorage.getItem("user_id");
      this.user_email = window.localStorage.getItem("user_email");
      if (!this.user_name) {
        this.into_another_son(2);
      }else 
      this.home_get_user_list_3();
    },
    into_another_son(choose_num) {
      console.log(choose_num);
      if (choose_num == 1) {
        this.$router.push({
          name: "home_focus",
        });
      } else if (choose_num == 2) {
        this.$router.push({
          name: "home_recommend",
        });
      } else {
        this.$router.push({
          name: "home_collection",
        });
      }
    },
    home_get_user_list_3() {
      if (this.user_name != "") {
        this.$axios({
          method: "post",
          url: "collection_paper_list",
          data: qs.stringify({
            uid: this.user_id,
            page: this.page,
            size: 5
          }),
        })
          .then((res) => {
            console.log("rcm_content", res.data);
            this.page_all = res.data.n_page;
            this.recommand_content = res.data.info;
          })
          .catch((err) => {
            console.log("err1", err.errno);
          });
      } else {
        this.$axios({
          method: "post",
          url: "search",
          data: {
            search_word: this.keyword,
            search_type: this.arr1,
            search_logic: this.arr2,
            page: this.page,
            size: 5,
            order_type: 2,
            order: 0,
          },
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            console.log("rcm_content2", res.data);
            this.page_all = 100;
            this.recommand_content = res.data.papers;
          })
          .catch((err) => {
            console.log("err2", err.errno);
          });
      }
    },
    into_detail(url_tmp) {
      console.log(url_tmp);
      if (url_tmp == null) {
        this.snackbar = true;
        this.setData({ snackbar: true });
      } else {
        document.location.href = url_tmp;
      }
    },
  },
};
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
.focus_2_2 {
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
  padding-bottom: 0.5px;
  padding-right: vw(20);
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
.author_rcm {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
}
.subtitle_recommand_2 {
  margin-left: vw(20);
  font-family: "Source Han Sans CN Normal", sans-serif;
  color: #90a4ae;
}
.recommand_book {
  color: #455a64;
  margin-left: vw(20);
  margin-top: vh(15);
  margin-right: vw(20);
  font-weight: bold;
  font-family: "optima", sans-serif;
}
.recommand_book_2 {
  color: #455a64;
  margin-left: vw(20);
  margin-top: vh(5);
  margin-right: vw(20);
  font-family: "optima", sans-serif;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
}
.recommand_book_3 {
  color: #455a64;
  margin-left: vw(20);
  margin-top: vh(5);
  margin-right: vw(20);
  font-family: "SourceHanSerifCN", sans-serif;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
}
.quote_recommand_fa {
  width: vw(1010);
  margin-bottom: vh(10);
  margin-top: vh(20);
}
.quote_recommand {
  margin-left: vw(5);
  margin-top: vh(17);
  display: flex;
  font-family: "optima", sans-serif;
  font-weight: bolder;
  font-size: vw(19);
}
.quote_recommand_0 {
  margin-left: vw(20);
  margin-top: vh(15);
  display: flex;
  font-family: "SourceHanSerifCN", sans-serif;
  font-weight: bolder;
  font-size: vw(19);
  float: left;
}
.quote_recommand_1 {
  margin-left: vw(5);
  display: flex;
  font-family: "SourceHanSerifCN", sans-serif;
  font-size: vw(17);
  margin-top: vh(48);
}
.recommand_icon_fa {
  display: flex;
  margin-left: vw(1130);
}
.recommand_icon_2 {
  width: vw(36);
  margin-left: vw(40);
  margin-bottom: vh(30);
}
.recommand_icon_3 {
  margin-top: vh(17);
}
.add_keyword_class {
  color: white;
  margin-left: vw(30);
  margin-top: vh(25);
}
.add_keyword_class_2 {
  color: white;
  margin-left: vw(20);
  margin-top: vh(25);
}
.display_box_1 {
  background-color: rgba(255, 255, 255, 0.97);
  margin-bottom: vh(30);
  width: vw(1250);
  border-radius: vw(10);
  padding: vw(20);
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
  color: #90a4ae;
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
  color: #90a4ae;
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
  background-color: #232f3d;
  margin-right: vw(20);
  padding: vw(10);
  border-radius: vw(10);
  font-family: "optima", sans-serif;
  color: whitesmoke;
}
.display_item_3 {
  color: #232f3d;
  display: flex;
}
.display_item_4 {
  background-color: #232f3d;
  margin-right: vw(20);
  padding: vw(10);
  border-radius: vw(10);
  box-shadow: 0 0 5px 1px #232f3d;
  margin-bottom: vh(20);
  font-family: "Source Han Sans CN Normal", sans-serif;
}
.display_item_4:hover {
  background-color: #37474f;
  margin-right: vw(20);
  color: white;
  padding: vw(10);
  border-radius: vw(10);
  box-shadow: 0 0 5px 1px #37474f;
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
.page_index_2 {
  text-align: center;
  margin-top: vh(10);
}
.recommand_icon_1 {
  display: flex;
}
.recommand_icon_2 {
  margin-top: vh(49);
  margin-left: vw(10);
}
</style>
