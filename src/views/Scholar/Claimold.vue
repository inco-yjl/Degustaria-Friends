<template>
  <div id="Claimold">
    <base-header />
    <div class="wrapper">
        <v-alert
      outlined
      type="error"
      prominent
      border="left"
    width="800px"
    style="margin:auto;margin-bottom:20px"
    dismissible
    v-if="resp==0"
    v-model="alert2"
    >
     邮箱错误，认领失败
    </v-alert>
       <v-alert
      outlined
      type="success"
      prominent
      border="left"
    width="800px"
    style="margin:auto;margin-bottom:20px"
    dismissible
    v-if="resp==1"
    v-model="alert"
    >
     认领成功
    </v-alert>
      <v-stepper v-model="e1">
        <v-stepper-header>
            <span>
          <v-stepper-step :complete="e1 > 1" step="1">
            查询学者
          </v-stepper-step>
            </span>

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
        <div class="tabs" style="margin-top:20px">
                     <v-card>
                         <v-card class="mx-auto" max-width="750px" style="margin-top:20px" >
                        <v-list two-line class="liststyle" style="margin-top:20px">
                          <v-list-item-group
                            v-model="selected"
                            active-class="blue-grey lighten-4 blue-grey--text text--darken-4"
                            multiple
                            style="width: 750px;margin-top:20px"
                            v-if="grouplist.length!=0"
                          >
                            <template v-for="(item, index) in grouplist">
                              <v-list-item
                                :key="grouplist[index].id"
                                style="width: 700px;margin-top:20px"
                              >
                                <template v-slot:default="{ active }">
                                  <v-list-item-content style="width: 700px " >
                                    <v-list-item-title ><h3 style="display:inline">{{grouplist[index].name1}}</h3></v-list-item-title>
                                    <v-list-item-title  v-if="grouplist[index].name2"><h3 style="display:inline"> | {{grouplist[index].name2}} </h3></v-list-item-title>
                                    <v-list-item-title  v-if="grouplist[index].name3"><h3 style="display:inline"> | {{grouplist[index].name3}} </h3></v-list-item-title>
                                     <v-list-item-subtitle
                                    ><h4 style="display:inline">{{listtxt.h_index}}:</h4>{{item.h_index}}</v-list-item-subtitle>   
                                
                                    <v-list-item-subtitle><h4 style="display:inline">{{listtxt.org}}:</h4>{{item.org}}</v-list-item-subtitle>

                                    <v-list-item-subtitle><h4 style="display:inline">{{listtxt.interests}}:</h4>{{item.interests}}</v-list-item-subtitle>
                                    <v-list-item-subtitle><h4 style="display:inline">{{listtxt.citation}}:</h4>{{item.citation}}</v-list-item-subtitle>
                                    <v-list-item-subtitle><h4 style="display:inline">{{listtxt.e_mail}}:</h4>{{item.e_mail}}</v-list-item-subtitle>
                                  </v-list-item-content>

                                  <v-list-item-action>
                                    <v-btn
                                     @click="addart(item.id,active)"
                                      v-if="!active"
                                        class="ma-2"
                                        color="primary"
                                        dark
                                     >
                                        认证
                                     <v-icon
                                          dark
                                          right
                                     >
                                          mdi-checkbox-marked-circle
                                      </v-icon>
                                     </v-btn>
                                
                                     <v-btn
                                      @click="delart(item.id,active)"
                                       v-if="active"
                                     class="ma-2"
                                     color="primary"
                                      dark
                                     >
                                     取消认证
                                     <v-icon
                                       dark
                                          right
                                     >
                                          mdi-checkbox-marked-circle
                                     </v-icon>
                                     </v-btn>
                                  </v-list-item-action>
                                </template>
                              </v-list-item>

                              <v-divider
                                v-if="index < grouplist.length - 1"
                                :key="index"
                              ></v-divider>
                            </template>
                          </v-list-item-group>
                           <h4  style="margin:auto;text-align:center" v-else>您还没有搜索任何学者哦(*^▽^*)~</h4>
                        </v-list>
                      </v-card>
                     <!-- 页脚 -->
                      <div class="text-center">
                        <v-pagination v-model="page" :length="pagenum" @next="nextpage" @previous="prepage" @input="getpage"></v-pagination>
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
                      <v-btn
                        color="normal"
                        style="display:inline-block;left:70%;margin:20px"
                        @click="click2claim"
                        >
                    还没有在网站认证？  
                    </v-btn>
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
            listtxt:{
        
                name:'学者名',
                org: '组织',
                interests: '领域',
                citation: '首页',
                h_index: 'h_index',
                e_mail: '邮箱',
            },
            pagenum:5,
            e1: 1,
            email:window.localStorage.getItem('user_email'),
            page:1,
            resp:-1,
            index:1,
            namenum:1,
            switch1:true,
            switch2:true,
            ifshow: 1,
            searchmsg:'',
            articlenum: 2,
            selected:[],
            tab:null,
            id:'12106839',
            active:false,
            alert:true,
            alert2:true,
            grouplist:[
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
        this.id=el1;
        this.e1=2;
        this.selected.splice(0,this.selected.length);
      },
      delart(el1,el2){
        if(el2==true){
          const index=this.selected_articlesid.indexOf(el1);
          if(index!=-1)
            this.selected_articlesid.splice(index,1);
        }
        console.log('list:'+this.selected_articlesid);
      },
      click2claim(){
        this.$router.push({name:'scholar'});
      },
      nextpage(){
        this.search();
      },
      prepage(){
        this.search();
      },
      getpage(){
        // this.selected.splice(0,this.selected.length);
        this.search();
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
          console.log('ori'+this.grouplist);
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
            // var i=0;
            // for(i=0;i<res.data.length;i++){
            //     this.grouplist.push(res.data[i]);
            // }
            console.log('ori'+this.grouplist.length);
            var i=0;
            for(i=0;i<5;i++)
            console.log(this.grouplist[i].id);
            // console.log('grouplist'+this.grouplist);
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
        formData.append('username', window.localStorage.getItem('user_name'));
          this.$axios({
        method: "post",
        url: '/claim_scholar',
        data: formData
      })
        .then((res) => {
          console.log("认领成功", res.data);
          if(res.data.status){
          this.resp=0;
          this.alert2=true;
          }
          else{
          this.resp=1;
          this.alert=true;
          }
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
#Claimold{
  position: absolute;
  top: 20%;
  width: 100%;
  height: 100%;
  margin-bottom: 20%;
  bottom: 20%;
}
.wrapper {
  width: 60%;
  margin: auto;
}
.mb-12 {
  padding: 20px;
    margin: 20px;
  margin-top:40px;
}
.cntstyle {
  display: inline-block;
  position: absolute;
  right: 30px;
}
.liststyle {
  margin: 20px;
  width: 700px;
  padding: 20px;
}
</style>