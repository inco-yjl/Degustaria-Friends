<template>
  <div>
    <v-row justify="center" align="center">
      <v-app-bar
        app
        class="search-header"
        color="primary"
        dark
        :shrink-on-scroll="method === 'HighLevel'?true:false"
        :height="method === 'HighLevel' ? 300 : 100"
        max-height="300"
        min-height="100"
      >
        <v-spacer />
        <!--搜索内容选择器&&输入框-->
        <v-col>
          <div class="tags">
            <v-item-group class="search-option" mandatory>
              <v-row>
                <v-item
                  v-for="(item, index) in searchOptions"
                  :key="index"
                  v-slot:default="{ active, toggle }"
                >
                  <div @click="toggle">
                    <v-btn
                      depressed
                      :class="active ? 'active-search-option' : ''"
                      small
                      :color="
                        active ? 'rgb(255, 255, 255)' : 'rgba(255, 255, 255, 0)'
                      "
                      @click="setOption(index)"
                      >{{ item.name }}</v-btn
                    >
                  </div>
                </v-item>
              </v-row>
            </v-item-group>
          </div>
          <v-row>
            <div
              color="rgba(255, 255, 255, 0)"
              flat
              elevation="0"
              class="search-input-area"
              :class="method !== 'HighLevel' ? 'movedown-search-area' : ''"
            >
              <v-row v-if="method === 'Simple'">
                <div class="simple-search-selector">
                  <v-select
                    :items="searchAttributes"
                    dense
                    light
                    solo
                    flat
                    item-text="name"
                    item-value="value"
                    return-object
                    v-model="complexSearchOptions.search_type[0]"
                    height="40"
                    class="selector-input"
                    full-width
                    color="primary"
                    background-color="#ffffff"
                  ></v-select>
                </div>
                <div class="search-textarea">
                  <v-text-field
                    dense
                    light
                    solo
                    flat
                    height="40"
                    v-model="complexSearchOptions.search_word[0]"
                    append-icon="mdi-magnify"
                    @click:append="search"
                    background-color="#ffffff"
                    class="search-input"
                    clearable
                  ></v-text-field>
                </div>
              </v-row>
              <div v-if="method === 'HighLevel'" class="high-level-search-area">
                <v-row
                  v-for="(option, index) in complexSearchOptions.search_word"
                  :key="index"
                >
                  <div class="logic-search-selector">
                    <v-select
                      v-if="index > 0"
                      :items="logicOptions"
                      dense
                      light
                      solo
                      flat
                      item-text="name"
                      item-value="value"
                      return-object
                      v-model="complexSearchOptions.search_logic[index-1]"
                      height="40"
                      class="selector-input"
                      full-width
                      color="primary"
                      background-color="#ffffff"
                    ></v-select>
                  </div>
                  <div class="search-selector">
                    <v-select
                      :items="searchAttributes"
                      dense
                      light
                      solo
                      flat
                      item-text="name"
                      item-value="value"
                      return-object
                      v-model="complexSearchOptions.search_type[index]"
                      height="40"
                      class="selector-input"
                      full-width
                      color="primary"
                      background-color="#ffffff"
                    ></v-select>
                  </div>
                  <div class="high-search-textarea">
                    <v-text-field
                      dense
                      light
                      solo
                      flat
                      height="40"
                      v-model="complexSearchOptions.search_word[index]"
                      background-color="#ffffff"
                      class="search-input"
                      clearable
                    ></v-text-field>
                  </div>
                  <div></div>
                  <div class="high-search-add-minus">
                    <v-btn
                      icon
                      color="white"
                      @click="search()"
                      v-if="index === 0"
                    >
                      <v-icon>mdi-magnify</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      color="white"
                      @click="minusOption(index)"
                      v-if="index > 0"
                    >
                      <v-icon>mdi-minus-circle-outline</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      color="white"
                      v-if="index === complexSearchOptions.search_word.length - 1"
                      @click="addSearchOptions()"
                    >
                      <v-icon>mdi-plus-circle-outline</v-icon>
                    </v-btn>
                  </div>
                </v-row>
              </div>
            </div>
          </v-row>
        </v-col>
        <!--检索方式选择器-->
        <v-card color="rgba(255, 255, 255, 0)" flat>
          <v-col class="search-method-options" color="primary">
            <div v-if="this.mode==0">
              <v-row v-if="method !== 'Simple'">
                <div>
                  <v-btn
                      depressed
                      small
                      color="rgba(255, 255, 255, 0)"
                      @click="setMethod('Simple')"
                  >简单检索>
                  </v-btn>
                </div>
              </v-row>
              <v-row v-if="method !== 'HighLevel'">
                <div>
                  <v-btn
                      depressed
                      small
                      color="rgba(255, 255, 255, 0)"
                      @click="setMethod('HighLevel')"
                  >高级检索>
                  </v-btn>
                </div>
              </v-row>
            </div>
          </v-col>
        </v-card>
        <v-spacer></v-spacer>
      </v-app-bar>
    </v-row>
    <div class="main-container"> <router-view /></div>
  </div>
</template>
  
<script>
import { ref } from "vue";
import {
  logicOptions, ORDER_TYPE_RELATIVE, ORDER_TYPE_TIME, ORDER_REFSUM, ORDER_DES, ORDER_ASD,
  AND, OR, NOT,
  accuracyOptions,
  PAGE_SIZE,NormalizeSearchParam,
  referAttributes, attributes, NOT_REF, REF, MODE_PATENT, MODE_PROJECT,MODE_PAPER
} from "../SearchResult/SearchDataType"
import {searchRequest} from "@/views/SearchResult/searchRequest";
export default {
  name: "searchHeader",
  data() {

    return {
      res_show:true,
      logicOptions,ORDER_TYPE_RELATIVE,ORDER_TYPE_TIME,ORDER_REFSUM,ORDER_DES,ORDER_ASD,
      AND,OR,NOT,attributes,MODE_PAPER,MODE_PROJECT,MODE_PATENT,
      accuracyOptions,
      PAGE_SIZE,
      complexSearchOptions: {
          search_word:[],
          search_type:[],
          search_logic:[],
          filter_sub:[],
          filter_thm:[],
          filter_org:[],
          filter_src:[],
          filter_time:[],
          page:1,
          size:this.PAGE_SIZE,
          order:this.ORDER_DES,
          order_type:this.ORDER_TYPE_RELATIVE,
          ref:NOT_REF,
      },

      referAttributes,
      logo: require("@/assets/logo1.png"),
      gusto: require("@/assets/gusto2.png"),
      searchOptions: [
        {
          name: "论文检索",
        },
        {
          name: "专利检索",
        },
        {
          name: "项目检索",
        },
      ],
      mode: MODE_PAPER,
      method: "Simple",
      searchAttributes: attributes[0],
    };
  },
  methods: {
    toUser() {},
    addSearchOptions(){
      //首先加逻辑，再加关键字
      if(this.complexSearchOptions.search_word.length>0){
        this.complexSearchOptions.search_logic.push(this.logicOptions[0].value);
      }
      this.complexSearchOptions.search_word.push("");
      this.complexSearchOptions.search_type.push(this.attributes[0][0].value);
      this.complexSearchOptions.order=ORDER_DES
      this.complexSearchOptions.order_type=ORDER_TYPE_RELATIVE

    },
    search() {
      //注意，v-model的值不要随便复制!!!
      let search_word=[]
      let search_type=[]
      let search_logic=[]
      let filter_sub=this.complexSearchOptions.filter_sub
      let filter_thm=this.complexSearchOptions.filter_thm
      let filter_org=this.complexSearchOptions.filter_org
      let filter_src=this.complexSearchOptions.filter_src
      let filter_time=this.complexSearchOptions.filter_time
      let page=this.complexSearchOptions.page
      let size=this.PAGE_SIZE
      let order=this.complexSearchOptions.order
      let order_type=this.complexSearchOptions.order_type
      let ref=this.complexSearchOptions.ref
      let mode=this.mode
      console.log(this.complexSearchOptions)
      for(let i=0;i<this.complexSearchOptions.search_word.length;i++){
        if(i!=0){
          let logic=this.complexSearchOptions.search_logic[i-1].value
          if(logic===undefined){
            logic="0";
          }
          search_logic.push(logic)

        }
        let type=this.complexSearchOptions.search_type[i].value
        if(type===undefined){
          type="0";
        }
        search_type.push(type)
        let word=this.complexSearchOptions.search_word[i]
        if(word===undefined){
          word=" "
        }
        search_word.push(word)
      }
      if(search_word[0]===undefined||search_type[0]===undefined||search_logic[0]===undefined){
        console.log("没有初始化")
      }
      let param={
        'search_word':search_word,
        'search_type':search_type,
        'search_logic':search_logic,
        'filter_sub':filter_sub,
        'filter_thm':filter_thm,
        'filter_org':filter_org,
        'filter_src':filter_src,
        'filter_time':filter_time,
        'page':page,
        'size':size,
        'order':order,
        'order_type':order_type,
        'ref':ref,
        'mode':mode,
      }
      this.$store.commit("mod_search_param",param)
      console.log('vuex :',this.$store.getters.get_search_param)
      searchRequest(this.$store.getters.get_search_param).then(res=>{

        console.log(res.data)
        this.$store.commit('mod_page_info',res.data)
        console.log('Header完成搜索')
      }).then(()=>{
        console.log("进入 searchResult")
        this.$router.push('/searchResult')
      })

    },
    setOption(index) {
      console.log(index);
      this.method = "Simple";
      if(index==0){
        this.mode=MODE_PAPER
      }else if(index==1){
        this.mode=MODE_PATENT
      }else {
        this.mode=MODE_PROJECT
      }
      this.searchAttributes = this.attributes[index];
    },
    setMethod(method) {
      this.method=method;
      this.complexSearchOptions.search_word.splice(1 );
      this.complexSearchOptions.search_type.splice(1 );
      this.complexSearchOptions.search_logic.splice(1) ;
      if(method=="HighLevel"){
        this.addSearchOptions();
      }
    },
    minusOption(index) {
      this.complexSearchOptions.search_word.splice(index, 1);
      this.complexSearchOptions.search_type.splice(index, 1);
      this.complexSearchOptions.search_logic.splice(index-1, 1);

    },

  },
  created() {
    this.addSearchOptions();

  }
};
</script>
  
  <style scoped lang="scss">
.tags {
  margin-bottom: 20px;
}
.border-white {
  border: 3px solid white;
}
.search-input {
  border-left: 1px solid #232f3d;
}
.search-selector {
  width: vw(150);
  border-left: 1px solid #232f3d;
}
.simple-search-selector {
  width: vw(200);
  border-left: 1px solid #232f3d;
  margin-left: vw(20);
}
.logic-search-selector {
  width: vw(120);
  border-left: 1px solid #232f3d;
}
.search-input-area {
  position: relative;
  width: vw(820);
}
.movedown-search-area {
  top: vh(20);
}
.high-search-textarea {
  width: vw(300);
}
.high-level-search-area {
  padding-left: vw(30);
  width: vw(820);
  height: vh(230);
  padding-top: vh(20);
  padding-bottom: vh(0);
  overflow-y: auto;
  overflow-x: hidden;
}
.high-search-add-minus {
  position: relative;
  top: -5px;
  width: vw(80);
  display: flex;
}
.search-textarea {
  width: vw(560);
}
.active-search-option {
  font-weight: bold;
  color: #232f3d;
}
.search-option {
  position: relative;
}
.search-method-options {
  position: absolute;
  margin-left: vw(20);
}
.search-header {
  overflow-y: hidden;
}
.main-container{
  height:1000px;
  width:vw(1920);
}
</style>
<style lang="scss">
div.high-level-search-area::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: vw(12); /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
div.high-level-search-area.high-level-search-area::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.684);
  scrollbar-arrow-color: red;
}
div.high-level-search-area::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
</style>