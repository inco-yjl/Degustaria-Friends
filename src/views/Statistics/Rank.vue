<template>
  <div class="rank-page">
    <v-tabs
      background-color="white"
      color="primary"
      v-model="tab"
      class="rank-tabs"
    >
    <v-tab key="1">机构</v-tab>
      <v-tab key="2">学者</v-tab>
      <v-tab key="3">期刊会议</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item key="1">
        <div class="rank-content">
          <div class="field-filter">
            <v-card class="d-block mx-auto rounded-lg" flat>
              <div class="tree-filter">
                <v-radio-group v-model="radioGroup" class="org-field-tree">
                  <v-radio :key="1" label="all" :value="1"> </v-radio>
                  <div
                    class="org-field-class"
                    v-for="group in orgFieldOptions"
                    :key="group.name"
                  >
                    {{ group.name }}:
                    <div class="org-field-selections">
                      <v-radio
                        v-for="field in group.children"
                        :key="field.id"
                        :label="field.name"
                        :value="field.id"
                      ></v-radio>
                    </div>
                  </div>
                </v-radio-group>
              </div>
            </v-card>
          </div>
          <div class="rank-main-content">
            <div class="table-filters">
              <v-text-field
                v-model="orgSearch"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </div>
            <div class="table">
              <div class="main-table">
                <v-data-table
                  :search="orgSearch"
                  :headers="orgHeader"
                  :items="orgDesserts"
                  @page-count="orgpageCount = $event"
                  :page.sync="orgpage"
                  :items-per-page="10"
                  hide-default-footer
                  class="elevation-1"
                >
                  <template v-slot:item.share="{ item }">
                    <div v-html="numFilter(item.share)"></div>
                  </template>
                </v-data-table>
                <v-pagination
                  class="pagination"
                  v-model="orgpage"
                  :length="orgpageCount"
                ></v-pagination>
              </div>
            </div>
          </div>
        </div>
      </v-tab-item>
      <v-tab-item key="2">
        <div class="rank-content">
          <div class="field-filter">
            <v-card class="d-block mx-auto rounded-lg" flat>
              <div class="tree-filter">
                <v-treeview
                  selectable
                  dense
                  selected-color="indigo"
                  v-model="fieldSelection"
                  :items="fieldOptions"
                  selection-type="leaf"
                  return-object
                  open-all
                ></v-treeview>
              </div>
            </v-card>
          </div>
          <div class="rank-main-content">
            <div class="table-filters">
              <v-text-field
                v-model="scholarSearch"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </div>
            <div class="table">
              <div class="main-table">
                <v-data-table
                  :search="scholarSearch"
                  :headers="scholarHeader"
                  :items="scholarDesserts"
                  @page-count="scholarpageCount = $event"
                  :page.sync="scholarpage"
                  :items-per-page="10"
                  hide-default-footer
                  class="elevation-1"
                >
                  <template v-slot:item.name1="{ item }">
                    <div>
                      <b>{{ item.name1 }}</b>
                    </div>
                    <div>org: {{ handleSubString(item.org) }}</div>
                    <div>area: {{ handleSubString(item.interests) }}</div>
                  </template>
                </v-data-table>
                <v-pagination
                  class="pagination"
                  v-model="scholarpage"
                  :length="scholarpageCount"
                ></v-pagination>
              </div>
              <!--
              <div class="selected-info">
                <card><div></div></card>
                <card><div></div></card>
              </div>
              -->
            </div>
          </div>
        </div>
      </v-tab-item>
      <v-tab-item key="3"> 
        <div class="rank-content">
          <div class="field-filter">
            <v-card class="d-block mx-auto rounded-lg" flat>
              <div class="tree-filter">
                <v-radio-group v-model="conChoice" class="org-field-tree">
                  <v-radio :key="7" label="all" :value="7"> </v-radio>
                  <div
                    class="org-field-class"
                    v-for="group in conferenceFieldOptions"
                    :key="group.name"
                  >
                    {{ group.name }}:
                    <div class="org-field-selections">
                      <v-radio
                        v-for="field in group.children"
                        :key="field.id"
                        :label="field.name"
                        :value="field.id"
                      ></v-radio>
                    </div>
                  </div>
                </v-radio-group>
              </div>
            </v-card>
          </div>
          <div class="rank-main-content">
            <div class="table-filters">
              <v-text-field
                v-model="conferenceSearch"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </div>
            <div class="table">
              <div class="main-table">
                <v-data-table
                  :search="conferenceSearch"
                  :headers="conferenceHeader"
                  :items="conferenceDesserts"
                  @page-count="conferencepageCount = $event"
                  :page.sync="conferencePage"
                  :items-per-page="10"
                  hide-default-footer
                  class="elevation-1"
                >
                </v-data-table>
                <v-pagination
                  class="pagination"
                  v-model="conferencePage"
                  :length="conferencepageCount"
                ></v-pagination>
              </div>
            </div>
          </div>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { ref } from "vue";
import qs from "qs";
export default {
  data() {
    const fieldOptions = [];
    const scholarHeader = [
      {
        text: "姓名",
        align: "start",
        sortable: false,
        value: "name1"
      },
      { text: "h指数", value: "h_index", filterable: false, width: 120 },
      { text: "引用数", value: "citation", filterable: false, width: 120 },
    ];

    const orgHeader = [
      {
        text: "姓名",
        align: "start",
        sortable: false,
        value: "name",
        width: 40,
      },
      {
        text: "国家",
        value: "country",
        filterable: false,
        sortable: false,
        width: 30,
      },
      { text: "学术成果数量", value: "count", filterable: false, width: 20 },
      { text: "自然指数", value: "share", filterable: false, width: 20 },
    ];
    const conferenceHeader = [
      {
        text: "姓名",
        align: "start",
        sortable: false,
        value: "name",
        width: 40,
      },
      { text: "h5指数", value: "h5Value", filterable: false, width: 20 },
      { text: "h5中位数", value: "h5MidValue", filterable: false, width: 20 },
    ];
    const orgFieldOptions = [
      {
        name: "主题",
        children: [
          {
            name: "Chemistry",
            id: 2,
          },
          {
            name: "Earth & Environmental",
            id: 3,
          },
          {
            name: "Life Sciences",
            id: 4,
          },
          {
            name: "Physical Sciences",
            id: 6,
          },
        ],
      },
      {
        name: "期刊",
        children: [
          {
            name: "Nature & Science",
            id: 5,
          },
        ],
      },
    ];
    const conferenceFieldOptions = [
      {
        name: "学科",
        children: [
          {
            name: "Business,Economics & Management",
            id: 10,
          },
          {
            name: "Chemical & Material Sciences",
            id: 8,
          },
          {
            name: "Engineering & Computer Science",
            id: 9,
          },
          {
            name: "Health & Medical Sciences",
            id: 11
          },
          {
            name: "Humanities, Literature & Arts",
            id: 12,
          },
          {
            name: "Life Sciences & Earth Sciences",
            id: 13
          },
          {
            name: "Physics & Mathematics",
            id: 14
          },
          {
            name: "Social Sciences",
            id: 15
          }
        ],
      },
    ];
    return {
      conferenceHeader,
      conferenceFieldOptions,
      conChoice: 7,
      radioGroup: 1,
      orgFieldOptions,
      get_fields: require("@/assets/json/get_fields.json"),
      scholarSearch: "",
      fieldSelection: [],
      orgSearch: "",
      conferenceSearch: "",
      scholarpageCount: 0,
      conferencepageCount: 0,
      orgpageCount: 0,
      orgDesserts: [],
      conferenceDesserts: [],
      orgHeader,
      orgpage: 1,
      conferencePage: 1,
      scholarpage: 1,
      tab: null,
      fieldOptions,
      scholarDesserts: ref(),
      scholarHeader,
      pushRank: ref(0),
    };
  },
  watch: {
    fieldSelection(newVal) {
      console.log(1);
      this.getScholarRank();
    },
    radioGroup(newVal) {
      this.getOrgRank();
    },
    conChoice(newVal){
      this.getConfRank();
    }
  },

  methods: {
    numFilter(value) {
      value = Number(value)
      var realVal = value.toFixed(2);
      return realVal;
    },
    getScholarFields() {
      /*
      this.$axios({
      method: "get",
      url: "/get_fields",
    })
      .then((res) => {
        // res 是 response 的缩写
        console.log("Scholar:getFields", res.data);
        var list = res.data;
        this.fieldOptions = [];
        this.fieldOptions.push({
          name: '全部',
          id: 0,
          children: []
        })
        this.fieldOptions[0].children.push({
          id: 1,
          name: 'physics',
          children: []
        })
        for (var index = 1; index < list.length; index++) {
          if (list[index].includes('physics') || list[index].includes('Physics') ) {
            this.fieldOptions[0].children[0].children.push({
              id: index + 1,
              name: list[index]
            })
            continue;
          }
          this.fieldOptions[0].children.push({
            id: index + 1,
            name: list[index]
          })
        }
      })
      .catch((err) => {
        //请求若出现路由找不到等其它异常，则在终端输出错误信息
        console.log(err);
      });
      */
      const list = this.get_fields.sort();
      this.fieldOptions = [];
      this.fieldOptions.push({
        name: "全部",
        id: 0,
        children: [],
      });
      this.pushRank = 0;
      for (var index = 0; index < list.length; index++) {
        if (list[index] instanceof Array) {
          this.fieldOptions[0].children.push({
            name: list[index][0],
            id: ++this.pushRank,
            children: this.getAllFields(list[index], index),
          });
        } else {
          this.fieldOptions[0].children.push({
            name: list[index],
            id: ++this.pushRank,
          });
        }
      }
    },
    getAllFields(list, i) {
      var array = [];
      for (var index = 1; index < list.length; index++) {
        if (list[index] instanceof Array) {
          array.push({
            name: list[index][0],
            id: ++this.pushRank,
            children: this.getAllFields(list[index], i + index),
          });
        } else {
          array.push({
            name: list[index],
            id: ++this.pushRank,
          });
        }
      }
      return array;
    },
    handleSubString(string) {
      if (string.length > 60) {
        return string.substring(0, 60) + "…";
      } else return string;
    },
    getOrgRank() {
      this.$axios({
        method: "post",
        url: "/get_rank",
        data: qs.stringify({
          type: this.radioGroup,
        }),
      })
        .then((res) => {
          this.orgDesserts = res.data;
        })
        .catch((err) => {
          //请求若出现路由找不到等其它异常，则在终端输出错误信息
          console.log(err);
        });
    },
    getConfRank() {
      this.$axios({
        method: "post",
        url: "/get_rank",
        data: qs.stringify({
          type: this.conChoice
        }),
      })
        .then((res) => {
          this.conferenceDesserts = res.data;
          console.log("Con:getFields", res.data);
        })
        .catch((err) => {
          //请求若出现路由找不到等其它异常，则在终端输出错误信息
          console.log(err);
        });
    },
    getScholarRank() {
      var select_items = "";
      for (var i = 0; i < this.fieldSelection.length; i++) {
        if (i != 0) select_items += ",";
        select_items += this.fieldSelection[i].name;
      }
      if (this.fieldSelection.length === 128) {
        this.select_items = "";
      }
      this.$axios({
        method: "post",
        url: "/get_scholars_by_h_index",
        data: qs.stringify({
          select_items: select_items,
        }),
      })
        .then((res) => {
          this.scholarDesserts = res.data;
          console.log("Scholar:getFields", res.data);
        })
        .catch((err) => {
          //请求若出现路由找不到等其它异常，则在终端输出错误信息
          console.log(err);
        });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.getScholarFields();
      this.getScholarRank();
      this.getOrgRank();
      this.getConfRank();
    });
  },
};
</script>


<style scoped lang="scss">
.rank-page {
  position: relative;
  left: 0;
  height: auto;
  margin-top: 69px;
  width: vw(1900);
}
.rank-tabs {
  padding-left: vw(680);
}
.rank-content {
  width: vw(1600);
  margin-left: vw(160);
  height: auto;
  display: flex;
}
.field-filter {
  position: relative;
  margin-right: vw(60);
  top: vh(39);
  height: vh(850);
  left: 0;
}
.tree-filter {
  padding-top: 20px;
  border-radius: 20px;
  background-color: #ffffff;
  box-sizing: border-box;
  border: 2px solid rgba(0, 0, 0, 0.65);
  font-size: vw(16);
  width: vw(430);
  height: vh(700);
  overflow: auto;
}
.org-field-tree {
  margin-top: 0;
  margin-left: vw(20);
  font-family: "思源黑体";
  font-size: vw(20);
  line-height: vh(36);
}
.org-field-class {
  margin-bottom: vh(24);
}
.org-field-selections {
  margin-left: vw(15);
}
.rank-main-content {
  width: 100%;
}
.table-filters {
  padding-left: vw(30);
  width: vw(250);
}
.table {
  display: flex;
  width: 100%;
}
.main-table {
  padding-top: vh(20);
  padding-left: vw(10);
  padding-right: vw(20);
  width: vw(1100);
}
.pagination {
  margin-top: vh(20);
}
</style>
<style lang="scss">
.tree-filter button {
  width: vw(24) !important;
  height: vw(24);
}
div::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: vw(4); /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
div::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px #7192b7;
  background: #333333;
  scrollbar-arrow-color: red;
}
div::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(154, 154, 154, 0.5);
  border-radius: 0;
  background: rgba(255, 255, 255, 0.1);
}
</style>