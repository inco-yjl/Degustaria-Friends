<template>
  <v-container id="page">
    <v-row no-gutters>
      <v-col id="pcard" cols="8">
        <div class="pcard ma-2 pa-1">
          <v-row no-gutters>
            <v-col cols="2">
              <div style="margin: 0 auto; text-align: center">
                <v-avatar color="blue darken-2" size="100" class="mt-2 mr-2">
                  <v-img :src="selfImage" alt="self-image"></v-img>
                </v-avatar>
              </div>
            </v-col>
            <v-col class="ml-2">
              <div class="name ma-1 text-h5">
                <p class="text-left">&nbsp;&nbsp;{{ Name }}</p>
              </div>
              <div class="faculty ma-1 text-h6">
                <p class="text-left">{{ Faculty }}</p>
              </div>
              <div class="intro ma-1 text-body-1">
                <p class="text-left pa-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Placeat tempora eligendi nihil ex velit ipsam fuga dolorum
                  molestias doloribus. Voluptas saepe nemo ad pariatur doloribus
                  nesciunt consequuntur a, quam fuga!
                </p>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col id="related pcard" cols="4">
        <v-row>
          <v-col cols="1" id="pcard">
            <v-divider vertical></v-divider>
          </v-col>
          <v-col>
            <div class="mt-2 text-h6">
              <p>·主要研究领域：</p>
            </div>
            <v-row class="mt-2" dense>
              <v-col
                v-for="item in MainField"
                :key="index"
                cols="6"
                class="pa-auto"
              >
                <p class="item-title">{{ item.title }}</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="mx-12">
      <v-col cols="8">
        <v-card elevation="7">
          <v-card-title class="text-left">论文共{{ Papers.length }}篇</v-card-title>
          <v-card-subtitle>
            <v-row dense>
              <v-col cols="12">
                <v-btn-toggle v-model="toggle_one" tile color="primary" group mandatory>
                  <v-btn value="inTime" depressed elevation="1" small>按时间排序</v-btn
                  >
                  <v-btn value="inReference" depressed elevation="1" small>按引用量排序</v-btn
                  >
                </v-btn-toggle>
              </v-col>
              <v-col cols="12">
                <v-btn-toggle v-model="toggle_one" tile color="primary" group mandatory>
                  <v-btn value="All" depressed elevation="1" small>全部</v-btn>
                  <v-btn value="Recent" depressed elevation="1" small>最近</v-btn>
                </v-btn-toggle>
              </v-col>
            </v-row>
          </v-card-subtitle>
        </v-card>
        <v-row>
          <v-col cols="12" v-for="paper in Papers" :key="index">
            <PaperShowVue
              :name="paper.name"
              :researchers="paper.researchers"
              :quoted="paper.quoted"
              :journal="paper.journal"
              :ptime="paper.ptime"
            ></PaperShowVue>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4">
        <ScholarRelationVue/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PaperShowVue from "./PaperShow.vue";
import ScholarRelationVue from "./ScholarRelation.vue";
export default {
  name: "ScholarPage",
  data() {
    return {
      SelfImage: "https://cdn.vuetifyjs.com/images/john.jpg",
      Name: "XYF",
      Faculty: "北京航空航天大学 软件学院",
      MainField: [
        {
          title: "人工智能",
          link: "#",
        },
        {
          title: "图像处理",
          link: "#",
        },
        {
          title: "模式识别",
          link: "#",
        },
        {
          title: "土豆种植",
          link: "#",
        },
        {
          title: "吃饭睡觉",
          link: "#",
        },
        {
          title: "啦啦啦啦",
          link: "#",
        },
      ],
      Papers: [
        {
          name: "abcde",
          researchers: ["a", "b", "c"],
          journal: "cdefg",
          quoted: 1234,
          ptime: 2022,
        },
        {
          name: "abcde",
          researchers: ["a", "b", "c"],
          journal: "cdefg",
          quoted: 1234,
          ptime: 2022,
        },
        {
          name: "abcde",
          researchers: ["a", "b", "c"],
          journal: "cdefg",
          quoted: 1234,
          ptime: 2022,
        },
      ],
    };
  },
  components: { PaperShowVue },
};
</script>

<style lang="scss" scoped>
#pcard {
  height: vw(250);
}
#name {
  margin-top: vw(50);
}
#page {
  min-height: calc(100%-70);
  border-left-style: solid;
  border-right-style: solid;
}
.item-title :hover {
  color: midnightblue;
}
</style>
