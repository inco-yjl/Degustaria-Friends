<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-app-bar
        app
        class="search-header"
        color="primary"
        dark
        shrink-on-scroll
        max-height="300"
        min-height="70"
      >
        <v-spacer />
        <!--搜索内容选择器-->
        <v-card flat color="rgba(255, 255, 255, 0)" width="100">
          <v-col class="mx-auto" color="primary">
            <v-item-group class="search-option" mandatory>
              <v-item
                v-for="(item, index) in searchOptions"
                :key="index"
                v-slot:default="{ active, toggle }"
                ><v-row>
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
                </v-row>
              </v-item>
            </v-item-group>
          </v-col>
        </v-card>
        <!--输入框-->
        <div color="rgba(255, 255, 255, 0)" flat elevation="0" class="search-input-area" :class="method!=='HighLevel' ? 'movedown-search-area' : ''">
          <v-row  v-if="method==='Simple'">
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
                v-model="singleSelection"
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
                background-color="#ffffff"
                class="search-input"
                clearable
                append-icon="mdi-magnify"
              ></v-text-field>
            </div>
          </v-row>
          <v-row  v-if="method==='Reference'">
            <div class="search-selector">
              <v-select
                :items="referAttributes"
                dense
                light
                solo
                flat
                item-text="name"
                item-value="value"
                return-object
                v-model="singleSelection"
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
                background-color="#ffffff"
                class="search-input"
                clearable
                append-icon="mdi-magnify"
              ></v-text-field>
            </div>
          </v-row>
          <v-col  v-if="method==='HighLevel'">
            <v-row v-for="(option,index) in complexSearchOptions"
            :key = 'index'>
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
                v-model="option.logic"
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
                v-model="option.word"
                height="40"
                class="selector-input"
                full-width
                color="primary"
                background-color="#ffffff"
              ></v-select>
            </div>
            <div class="logic-search-selector">
              <v-select
                :items="accuracyOptions"
                dense
                light
                solo
                flat
                item-text="name"
                item-value="value"
                return-object
                v-model="option.accuracy"
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
                background-color="#ffffff"
                class="search-input"
                clearable
                append-icon="mdi-magnify"
              ></v-text-field>
            </div>
            </v-row>
          </v-col>
        </div>
        <!--检索方式选择器-->
        <v-card color="rgba(255, 255, 255, 0)"  flat>
          <v-col class="search-method-options" color="primary">
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
            <v-row v-if="method !== 'Reference' && mode === 0">
              <div>
                <v-btn
                  depressed
                  small
                  color="rgba(255, 255, 255, 0)"
                  @click="setMethod('Reference')"
                  >引文检索>
                </v-btn>
              </div>
            </v-row>
          </v-col>
        </v-card>
        <v-spacer></v-spacer>
      </v-app-bar>
    </v-row>
    <v-container style="height: 1000px"> <router-view /></v-container>
  </v-container>
</template>
  
<script>
import { ref } from "vue";
export default {
  name: "searchHeader",
  data() {
    const attributes = [
      [
        {
          name: "综合",
          value: "COMBINE",
        },
        {
          name: "主题",
          value: "TOPIC",
        },
        {
          name: "篇名",
          value: "NAME",
        },
        {
          name: "摘要",
          value: "ABSTRACT",
        },
        {
          name: "关键词",
          value: "KEYWORDS",
        },
        {
          name: "全文",
          value: "CONTENT",
        },
        {
          name: "作者",
          value: "AUTHOR",
        },
        {
          name: "作者单位",
          value: "INSTITUTE",
        },
        {
          name: "参考文献",
          value: "REFERENCE",
        },
        {
          name: "文献来源",
          value: "SOURCE",
        },
        {
          name: "DOI",
          value: "DOI",
        },
      ],
      [
        {
          name: "综合",
          value: "COMBINE",
        },
        {
          name: "主题",
          value: "TOPIC",
        },
        {
          name: "专利名",
          value: "NAME",
        },
        {
          name: "摘要",
          value: "ABSTRACT",
        },
        {
          name: "关键词",
          value: "KEYWORDS",
        },
        {
          name: "全文",
          value: "CONTENT",
        },
        {
          name: "申请人",
          value: "APPLICATOR",
        },
        {
          name: "发明人",
          value: "INVENTOR",
        },
        {
          name: "代理人",
          value: "AGENCY",
        },
        {
          name: "申请号",
          value: "APPLICATENUMBER",
        },
        {
          name: "公开号",
          value: "PUBLICNUMBER",
        },
        {
          name: "分类号",
          value: "CLASSNUMBER",
        },
        {
          name: "主分类号",
          value: "MAINCLASSNUMBER",
        },
      ],
      [
        {
          name: "综合",
          value: "COMBINE",
        },
        {
          name: "主题",
          value: "TOPIC",
        },
        {
          name: "项目名称",
          value: "NAME",
        },
        {
          name: "摘要",
          value: "ABSTRACT",
        },
        {
          name: "关键词",
          value: "KEYWORDS",
        },
        {
          name: "项目专家",
          value: "EXPERT",
        },
        {
          name: "承担机构",
          value: "EXEINSTITUTE",
        },
        {
          name: "资助机构",
          value: "PAYINSTITUTE",
        },
      ],
    ];
    const referAttributes = [
      {
        name: "被引主题",
        value: "REFERTOPIC",
      },
      {
        name: "被引题名",
        value: "REFERNAME",
      },
      {
        name: "被引关键词",
        value: "REFERKEYWORD",
      },
      {
        name: "被引摘要",
        value: "REFERABSTRACT",
      },
      {
        name: "被引作者",
        value: "REFERAUTHOR",
      },
      {
        name: "被引机构",
        value: "REFERINSTITUTE",
      },
      {
        name: "被引文献来源",
        value: "REFERSOURCE",
      }
    ]
    const logicOptions = [
      {
        name: '而且',
        value: 'AND'
      },
      {
        name: '或者',
        value: 'OR'
      },
      {
        name: '且非',
        value: 'NOT'
      }
    ]
    const accuracyOptions = [
      {
        name: '模糊',
        value: 'VAGUE'
      },
      {
        name: '精确',
        value: 'PRECISE'
      }
    ]
    return {
      logicOptions,
      accuracyOptions,
      complexSearchOptions: [],
      referAttributes,
      singleSelection: ref(attributes[0][0]),
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
      mode: 0,
      method: "Simple",
      attributes,
      searchAttributes: attributes[0],
    };
  },
  methods: {
    toUser() {},
    setOption(index) {
      console.log(index);
      this.method = 'Simple';
      this.mode = index;
      this.searchAttributes = this.attributes[index];
      this.singleSelection = this.searchAttributes[0];
    },
    setMethod(method) {
      if (method === 'Simple') {
        this.singleSelection = this.searchAttributes[0];
      } else if (method === 'Reference') {
        this.singleSelection = this.referAttributes[0];
      } else {
        this.complexSearchOptions = [];
        this.complexSearchOptions.push(
          {
            logic: null,
            word: this.searchAttributes[0],
            accuracy: this.accuracyOptions[0],
            input: ''
          }
        );
        this.complexSearchOptions.push(
          {
            logic: this.logicOptions[0],
            word: this.searchAttributes[1],
            accuracy: this.accuracyOptions[0],
            input: ''
          }
        );
      }
      this.method = method;
    }
    /*
      changeLanguage() {
        if (this.$vuetify.lang.current === "en") {
          this.$vuetify.lang.current = "zhHans";
        } else {
          this.$vuetify.lang.current = "en";
        }
        console.log(this.$vuetify.lang.current);
      },*/
  },
};
</script>
  
  <style scoped lang="scss">
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
.logic-search-selector{
  width: vw(100);
  border-left: 1px solid #232f3d;
}
.search-input-area{
  position: relative;
  
}
.movedown-search-area{
  top: vh(20)
}
.high-search-textarea{
  width: vw(300);
}
.search-textarea {
  width: vw(500);
}
.active-search-option {
  font-weight: bold;
  color: #232f3d;
}
.search-option {
  position: relative;
}
.search-method-options{
  position: relative;
  margin-left: vw(20);
}
.search-header{
  overflow-y:hidden;
}
</style>