<template>
  <div id="Claimold">
    <base-header />
    <div class="wrapper">
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">
            查询学者
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 2" step="2"> 发起认领 </v-stepper-step>

          <v-divider></v-divider>
        </v-stepper-header>

        <v-stepper-items>
          <!-- card1 -->
                <v-stepper-content step="1">
        <v-card
          class="mb-12"
          color="blue-grey lighten-5"
        >
        <span class="card2tit" style="display: block">
            <h3 style="display: inline-block">查询学者</h3>
        </span>
        <v-text-field
            v-model="searchmsg"
            label="请输入学者名字"
            style="display: inline-block;width:80%"
        >
        </v-text-field>
        <v-btn style="display: inline-block; position: absolute;right: 30px;" rounded class="ma-2" color="primary" dark @click="search">搜索<v-icon dark right>mdi-magnify</v-icon></v-btn>
        <div class="tabs">
                     <v-card>
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
                                :key="item.paper_id"
                                style="width: 600px"
                              >
                                <template v-slot:default="{ active }">
                                  <v-list-item-content style="width: 600px">
                                    <v-list-item-title v-text="item.title">{{
                                      item.title
                                    }}</v-list-item-title>

                                    <v-list-item-subtitle
                                      class="text--primary"
                                      v-text="item.keyword"
                                    ></v-list-item-subtitle>

                                    <v-list-item-subtitle
                                      v-text="item.abstract"
                                    ></v-list-item-subtitle>
                                  </v-list-item-content>

                                  <v-list-item-action>
                                    <v-icon
                                    @click="addart(item.paper_id,active)"
                                      v-if="!active"
                                      color="blue-grey lighten-1"
                                    >
                                      mdi-star-plus-outline
                                    </v-icon>
                                    <v-icon v-else color="blue-grey darken-4"
                                    @click="delart(item.paper_id,active)">
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
                          @click="e1 = 2"
                          >继续</v-btn
                        >
                      </v-row>
                </v-card>
              </div>
            </v-card>
          </v-stepper-content>
        <!-- card2 -->
        
          <v-stepper-content step="2" color="blue-grey lighten-5">
              <v-card
          class="mx-auto"
          color="blue-grey lighten-5"
        >
        <h1 style="padding: 20px">邮箱验证</h1>
        <v-col>
         <v-text-field
            v-model="email"
            label="验证电子邮件"
             hint="例如，1195800097@qq.com"
            persistent-hint
             filled
             shaped
            ></v-text-field>
    </v-col>
        <h1 style="padding: 20px">隐私设置</h1>
        <v-sheet class="pa-5" color="blue-grey lighten-5">
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
      <v-row  justify="space-around">          
        <v-btn style="margin:100px" color="primary"  @click="e1=1">返回</v-btn>
        <v-btn style="margin:100px" color="primary"  @click="submit">完成</v-btn>
    </v-row>
    
      </v-stepper-content>
          <v-divider
            v-if="index < grouplist.length - 1"
            :key="index"
          ></v-divider>
    </v-stepper-items>
  </v-stepper>
    </div>
  </div>
</template>

<script>
// 学者认领页
import baseHeader from "../Header/BaseHeader.vue";
export default {
    name:'Claimold',
    data() {
        return {
            e1: 1,
            email:"123@qq.com",
            page:1,
            index:1,
            namenum:1,
            switch1:true,
            switch2:true,
            ifshow: 1,
            searchmsg:'haha',
            articlenum: 2,
            selected:[2],
            tab:null,
            id:'12106839',
            active:false,
            grouplist:[
                        {
                            id: '1',
                            name1: 'name1',
                            name2: '',
                            name3: '',
                            org: '',
                            interests: '',
                            citation: '',
                            h_index: '',
                            e_mail: '',
                        },
                        {
                            id: '2',
                            name1: 'name2',
                            name2: '',
                            name3: '',
                            org: '',
                            interests: '',
                            citation: '',
                            h_index: '',
                            e_mail: '',
                        },
                    ],
            valid:true,
            selected_articlesid:[],
        }
    },
    components:{
        baseHeader
    },
    methods: {
      addart(el1,el2){
        console.log(el1);
        console.log(el2);
        if(el2==false){
          this.selected_articlesid.push(el1);
          console.log('list:'+this.selected_articlesid);
        }
      },
      delart(el1,el2){
        if(el2==true){
          const index=this.selected_articlesid.indexOf(el1);
          if(index!=-1)
            this.selected_articlesid.splice(index,1);
        }
        console.log('list:'+this.selected_articlesid);
      },
      search(){
         const formData = new FormData();
        formData.append('search_word', this.searchmsg);
        formData.append('page', this.page);
        formData.append('size', 5);
        console.log('form:'+formData);
         var data={
          search_word:this.searchmsg,
          page:this.page,
          size:5
		}
    console.log(JSON.stringify(data))
      this.$axios({
        url:'/search_scholar',
	      method:'post',
	      data: formData
      })
        .then((res) => {
            /* res 是 response 的缩写 */
            console.log('搜索成功');
            console.log(res.data);
            this.grouplist=res.data;
          })
          .catch((err) => {
            /* 请求若出现路由找不到等其它异常，则在终端输出错误信息 */
            console.log(err);
          });


      },
        submit(){
          var sw1="1";
          var sw2="1";
          if(this.switch1==false)
            sw1="0";
            if(this.switch2==false)
            sw2="0";
          var str=this.selected_articlesid.toString();
           const formData = new FormData();
        formData.append('id', this.id);
        formData.append('e_mail', this.email);
        formData.append('email_privacy', sw1);
        formData.append('home_privacy', sw2);
        formData.append('username', "panyuyi");
          this.$axios({
        method: "post",
        url: '/claim_scholar',
        data: formData
      })
        .then((res) => {
          console.log("认领成功", res.data);
          window.alert('认领成功!');
        })
        .catch((err) => {
          //请求若出现路由找不到等其它异常，则在终端输出错误信息
          console.log(err);
        });

        },
        addpaper(){
                  // 添加文章
        var str=this.selected_articlesid.toString;
        var params1={
            scholar_id:1,
            paper_id:str
        }
        this.$axios({
          method:"post",
          url:"/add_paper_for_scholar",
          data: this.$qs.stringify({params1})
        })
        }
    }
}
</script>

<style>
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