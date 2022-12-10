<template>
  <div id="Claim">
    <base-header />
    <div class="wrapper">
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">
            个人学术档案
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 2" step="2"> 文章 </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3"> 设置 </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <!-- card1 -->
          <v-stepper-content step="1" color="blue-grey lighten-5">
            <v-card class="mb-12" color="blue-grey lighten-5">
              <h3 style="margin-bottom: 20px">
                您可以跟踪自己文章的引用情况。个人学术档案还会出现在学术搜索结果中
              </h3>
              <h4 style="display: inline-block; margin-right: 45px">
                {{ email }}
              </h4>
              <v-btn
                color="primary"
                outlined
                small
                style="display: inline-block"
                width="100px"
                >切换账户</v-btn
              >
              <div class="card1">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-container>
                    <v-col>
                      <v-text-field
                        style="display: inline-block; width: 450px"
                        v-model="form.name"
                        :counter="10"
                        :rules="nameRules"
                        label="姓名"
                        hint="发表文章时使用的全名"
                        persistent-hint
                        filled
                        shaped
                      ></v-text-field>

                      <v-btn
                        style="
                          display: inline-block;
                          margin-left: 30px;
                          text-align: center;
                        "
                        text
                        x-large
                        color="primary"
                        @click="addothername"
                      >
                        + 添加其他姓名
                      </v-btn>
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="form.work"
                        :rules="emailRules"
                        label="工作单位"
                        hint="例如，北京航空航天大学物理学教授"
                        persistent-hint
                        filled
                        shaped
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="form.email"
                        :rules="emailRules"
                        label="验证电子邮件"
                        hint="例如，1195800097@qq.com"
                        persistent-hint
                        filled
                        shaped
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="form.area"
                        :rules="emailRules"
                        label="感兴趣的领域"
                        hint="例如，广义相对论、统一场论"
                        persistent-hint
                        filled
                        shaped
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="form.homepage"
                        :rules="emailRules"
                        label="首页（可选）"
                        hint="例如，广义相对论、统一场论"
                        persistent-hint
                        filled
                        shaped
                      ></v-text-field>
                    </v-col>
                  </v-container>

                  <!-- <v-select
      v-model="select"
      :items="items"
      :rules="[v => !!v || 'Item is required']"
      label="Item"
      required
    ></v-select> -->

                  <!-- <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
    ></v-checkbox> -->
                </v-form>
              </div>
              <v-row align="center" justify="space-around">
                <v-btn
                  style="margin: auto; margin: 20px"
                  color="primary"
                  @click="e1 = 2"
                  >下一步</v-btn
                >
              </v-row>
            </v-card>
          </v-stepper-content>
          <!-- card2 -->
          <v-stepper-content step="2">
            <v-card class="mb-12" color="blue-grey lighten-5">
              <span class="card2tit" style="display: block">
                <h3 style="display: inline-block">添加您撰写的文章</h3>
                <span class="cntstyle">已选篇数：{{ articlenum }}</span>
              </span>
              <v-text-field
                v-model="searchmsg"
                label="请输入"
                style="display: inline-block; width: 80%"
              >
              </v-text-field>
              <v-btn
                style="display: inline-block; position: absolute; right: 30px"
                round
                class="ma-2"
                color="primary"
                dark
                >搜索<v-icon dark right>mdi-magnify</v-icon></v-btn
              >
              <div class="tabs">
                <v-card>
                  <v-tabs v-model="tab" centered fixed-tabs icons-and-text>
                    <v-tabs-slider></v-tabs-slider>

                    <v-tab href="#tab-1" class="primary--text">
                      文章组
                      <v-icon>mdi-file-document-multiple</v-icon>
                    </v-tab>

                    <v-tab href="#tab-2" class="primary--text">
                      文章
                      <v-icon>mdi-file-document</v-icon>
                    </v-tab>
                  </v-tabs>

                  <v-tabs-items v-model="tab">
                    <v-tab-item v-for="i in 2" :key="i" :value="'tab-' + i">
                      <!-- <v-card flat>
          <v-card-text>{{ text }}</v-card-text>
        </v-card> -->
                      <v-card class="mx-auto" max-width="650px">
                        <v-list two-line class="liststyle">
                          <v-list-item-group
                            v-model="selected"
                            active-class="blue-grey lighten-4 blue-grey--text text--darken-4"
                            multiple
                            style="width: 600px"
                          >
                            <template v-for="(item, index) in grouplist">
                              <v-list-item
                                :key="item.title"
                                style="width: 600px"
                              >
                                <template v-slot:default="{ active }">
                                  <v-list-item-content style="width: 600px">
                                    <v-list-item-title v-text="item.title">{{
                                      item.title
                                    }}</v-list-item-title>

                                    <v-list-item-subtitle
                                      class="text--primary"
                                      v-text="item.subtitle"
                                    ></v-list-item-subtitle>

                                    <v-list-item-subtitle
                                      v-text="item.content"
                                    ></v-list-item-subtitle>
                                  </v-list-item-content>

                                  <v-list-item-action>
                                    <v-icon
                                      v-if="!active"
                                      color="blue-grey lighten-1"
                                    >
                                      mdi-star-plus-outline
                                    </v-icon>

                                    <v-icon v-else color="blue-grey darken-4">
                                      mdi-star-plus
                                    </v-icon>
                                  </v-list-item-action>
                                </template>
                              </v-list-item>

                              <v-divider
                                v-if="index < grouplist.length - 1"
                                :key="index"
                              ></v-divider>
                            </template>
                          </v-list-item-group>
                        </v-list>
                      </v-card>
                      <!-- 页脚 -->
                      <div class="text-center">
                        <v-pagination v-model="page" :length="3"></v-pagination>
                      </div>
                      <!-- button panel -->
                      <v-row justify="space-around">
                        <v-btn
                          style="margin: 100px"
                          color="primary"
                          @click="e1 = 1"
                          >返回</v-btn
                        >
                        <v-btn
                          style="margin: 100px"
                          color="primary"
                          @click="e1 = 3"
                          >继续</v-btn
                        >
                      </v-row>
                    </v-tab-item>
                  </v-tabs-items>
                </v-card>
              </div>
            </v-card>
          </v-stepper-content>

          <!-- card 3 -->
          <v-stepper-content step="3">
            <v-card class="mx-auto" color="blue-grey lighten-4">
              <h1 style="padding: 20px">隐私设置</h1>
              <v-sheet class="pa-5" color="blue-grey lighten-4">
                <v-switch
                  v-model="switch1"
                  inset
                  :label="`我的邮箱公开可见`"
                ></v-switch>
                <v-switch
                  v-model="switch2"
                  inset
                  :label="`学者主页公开可见`"
                ></v-switch>
              </v-sheet>
            </v-card>
            <!-- button panel -->
            <v-row justify="space-around">
              <v-btn style="margin: 100px" color="primary" @click="e1 = 2"
                >返回</v-btn
              >
              <v-btn style="margin: 100px" color="primary" @click="e1 = 1"
                >继续</v-btn
              >
            </v-row>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </div>
  </div>
</template>

<script>
// 学者认领页
import baseHeader from "../Header/BaseHeader.vue";
export default {
  name: "Claim",
  data() {
    return {
      e1: 1,
      email: "1195800097@qq.com",
      form: {
        name: "",
        work: "",
        email: "",
        area: "",
        homepage: "",
      },
      page: 1,
      switch1: true,
      switch2: true,
      ifshow: 1,
      searchmsg: "",
      articlenum: 2,
      tab: null,
      grouplist: [
        {
          subtitle: "Brunch this weekend?",
          content: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
          title: "Ali Connors",
        },
        {
          subtitle: "摘要:Summer BBQ",
          content: "内容:Wish I could come, but I am out of town this weekend.",
          title: "标题:me, Scrott, Jennifer",
        },
      ],
      singlelist: [
        {
          subtitle: "摘要:Summer BBQ",
          content: "内容:Wish I could come, but I am out of town this weekend.",
          title: "标题:me, Scrott, Jennifer",
        },
      ],

      selected: [2],
    };
  },
  components: {
    baseHeader,
  },
  methods: {
    click() {},
  },
};
</script>

<style>
#Claim {
  /* background-color: #ECEFF1; */
}
.wrapper {
  width: 60%;
  margin: auto;
}
.mb-12 {
  padding: 20px;
}
.cntstyle {
  display: inline-block;
  position: absolute;
  right: 30px;
}
.liststyle {
  margin: 20px;
  width: 600px;
  padding: 20px;
}
</style>