<template>
  <div class="rank-page">
    <v-tabs
      background-color="white"
      color="primary"
      v-model="tab"
      class="rank-tabs"
    >
      <v-tab key="1">学者</v-tab>
      <v-tab key="2">机构</v-tab>
      <v-tab key="3">期刊会议</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item key="1">
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
                  :items-per-page="15"
                  hide-default-footer
                  class="elevation-1"
                >
                  <template v-slot:item.name1="{ item }">
                    <div><b>{{ item.name1 }}</b></div>
                    <div>org:  {{ handleSubString(item.org) }}</div>
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

      <v-tab-item key="2">
        <div class="rank-content">
          <div class="field-filter">
            <v-card class="d-block mx-auto rounded-lg" flat>
              <div class="tree-filter">
                <v-treeview
                  :open="[1]"
                  selectable
                  dense
                  selected-color="indigo"
                  :items="fieldOptions"
                ></v-treeview>
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
                  :items-per-page="15"
                  hide-default-footer
                  class="elevation-1"
                >
                  <template v-slot:item.name="{ item }">
                    <div>{{ item.name }}</div>
                    <div>{{ item.org }}</div>
                    <div>{{ item.interests }}</div>
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
      <v-tab-item key="3"> 3 </v-tab-item>
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
        value: "name1",
        width: 600,
      },
      { text: "h指数", value: "h_index", filterable: false, width: 120 },
      { text: "论文数", value: "paperNum", filterable: false, width: 120 },
      { text: "引用数", value: "citation", filterable: false, width: 120 },
    ];

    const orgHeader = [
      {
        text: "姓名",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "国家", value: "country", filterable: false, sortable: false },
      { text: "2022自然指数", value: "index2022", filterable: false },
      { text: "2022论文数", value: "count2022", filterable: false },
    ];
    const orgDesserts = [
      {
        name: "Max Planck Society",
        country: "Germany",
        index2022: 782.72,
        count2022: 2780,
      },
      {
        name: "French National Centre for Scientific Research (CNRS)",
        country: "France",
        index2022: 675.69,
        count2022: 4399,
      },
      {
        name: "Helmholtz Association of German Research Centres",
        country: "Germany",
        index2022: 565.07,
        count2022: 2584,
      },
      {
        name: "University of Oxford",
        country: "United Kingdom (UK)",
        index2022: 452.28,
        count2022: 1485,
      },
      {
        name: "Swiss Federal Institute of Technology Zurich (ETH Zurich)",
        country: "Switzerland",
        index2022: 395.67,
        count2022: 1065,
      },
      {
        name: "Imperial College London (ICL),",
        country: "United Kingdom (UK)",
        index2022: 248.3,
        count2022: 963,
      },
      {
        name: "Russian Academy of Sciences (RAS)",
        country: "Russia",
        index2022: 242.05,
        count2022: 914,
      },
      {
        name: "Swiss Federal Institute of Technology Lausanne (EPFL)",
        country: "Switzerland",
        index2022: 228.37,
        count2022: 619,
      },
      {
        name: "UCL",
        country: "United Kingdom (UK)",
        index2022: 222.6,
        count2022: 981,
      },
      {
        name: "Spanish National Research Council (CSIC)",
        country: "Spain",
        index2022: 209.15,
        count2022: 1190,
      },
      {
        name: "Leibniz Association",
        country: "Germany",
        index2022: 200.12,
        count2022: 1001,
      },
    ];
    return {
      get_fields: require("@/assets/json/get_fields.json"),
      scholarSearch: "",
      fieldSelection: [],
      orgSearch: "",
      scholarpageCount: 0,
      orgpageCount: 0,
      orgDesserts,
      orgHeader,
      orgpage: 1,
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
  },

  methods: {
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
      if(string.length>60) {
        return string.substring(0,60)+"…";
      }
      else return string
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
    });
  },
};
</script>


<style scoped lang="scss">
.rank-page {
  position: relative;
  left: 0;
  height: auto;
  top: 0;
  width: vw(1900);
}
.rank-tabs {
  padding-left: vw(600);
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
  height: vh(900);
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
  width: 100%;
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