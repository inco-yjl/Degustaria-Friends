<template>
    <div>
      <div style="display: flex;">
        <div class="focus_1">
          <v-btn depressed large @click="into_another_son(1)">关注</v-btn>
        </div>
        <div class="focus_2">
          <v-btn depressed large @click="into_another_son(2)">推荐</v-btn>
        </div>
        <div class="focus_3">
          <v-btn depressed large color="blue-grey lighten-4" @click="into_another_son(3)">收藏</v-btn>
        </div>
      </div>
      <div>
        
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
            focus_icon: 'https://s1.ax1x.com/2022/10/24/x2o8Rx.jpg',
            h_index: 70,
            article_num: 80,
            quote_num: 10809
          },
          {
            author_name: "YPWDPYM",
            focus_icon: 'https://s1.ax1x.com/2022/10/24/xRmgw8.jpg',
            h_index: 100,
            article_num: 180,
            quote_num: 18317
          }
        ]
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
  </style>