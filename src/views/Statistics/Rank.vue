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
                  <template v-slot:item.name="{ item }">
                    <div>{{ item.name }}</div>
                    <div>{{ item.org }}</div>
                    <div>{{ item.area }}</div>
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
                <div>{{ item.area }}</div>
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
export default {
  data() {
    const fieldOptions = [
      {
        id: 1,
        name: "全部",
        children: [
          { id: 2, name: "自动化" },
          {
            id: 3,
            name: "计算机应用",
            children: [
              { id: 4, name: "人工智能" },
              { id: 5, name: "软件工程" },
            ],
          },
          {
            id: 6,
            name: "电力技术",
          },
          {
            id: 7,
            name: "航天航空科学与工程",
          },
          {
            id: 8,
            name: "汽车工业",
          },
          {
            id: 9,
            name: "互联网技术",
          },
          {
            id: 10,
            name: "电信技术",
          },
          {
            id: 11,
            name: "公路与水路运输",
          },
          {
            id: 95,
            name: "电信技术",
          },
          {
            id: 103,
            name: "计算机应用",
            children: [
              { id: 104, name: "人工智能" },
              { id: 105, name: "软件工程" },
            ],
          },
          {
            id: 106,
            name: "电力技术",
          },
          {
            id: 107,
            name: "航天航空科学与工程",
          },
          {
            id: 108,
            name: "汽车工业",
          },
          {
            id: 109,
            name: "互联网技术",
          },
          {
            id: 100,
            name: "电信技术",
          },
          {
            id: 101,
            name: "公路与水路运输",
          },
        ],
      },
    ];
    const scholarHeader = [
      {
        text: "姓名",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "h指数", value: "hIndex", filterable: false },
      { text: "论文数", value: "paperNum", filterable: false },
      { text: "引用数", value: "citationNum", filterable: false },
    ];
    const scholarDesserts = [
      {
        name: "Frozen Yogurt",
        hIndex: 159,
        paperNum: 6.0,
        citationNum: 24,
        org: "北京航空航天大学",
        area: "人工智能",
      },
      {
        name: "Ice cream sandwich",
        hIndex: 237,
        paperNum: 9.0,
        citationNum: 37,
        org: "北京航空航天大学",
        area: "计算机 软件工程",
      },
      {
        name: "Eclair",
        hIndex: 262,
        paperNum: 16.0,
        citationNum: 23,
        org: "北京航空航天大学",
        area: "生物医学 化学合成 基因技术",
      },
      {
        name: "Cupcake",
        hIndex: 305,
        paperNum: 3.7,
        citationNum: 67,
        org: "北京航空航天大学",
        area: "AI",
      },
      {
        name: "Gingerbread",
        hIndex: 356,
        paperNum: 16.0,
        citationNum: 49,
        org: "北京航空航天大学",
        area: "AI",
      },
      {
        name: "Jelly bean",
        hIndex: 375,
        paperNum: 0.0,
        citationNum: 94,
        org: "北京航空航天大学",
        area: "AI",
      },
      {
        name: "Lollipop",
        hIndex: 392,
        paperNum: 0.2,
        citationNum: 98,
        org: "北京航空航天大学",
        area: "AI",
      },
      {
        name: "Honeycomb",
        hIndex: 408,
        paperNum: 3.2,
        citationNum: 87,
        org: "北京航空航天大学",
        area: "AI",
      },
      {
        name: "Donut",
        hIndex: 452,
        paperNum: 25.0,
        citationNum: 51,
        org: "北京航空航天大学",
        area: "AI",
      },
      {
        name: "KitKat",
        hIndex: 518,
        paperNum: 26.0,
        citationNum: 65,
        org: "北京航空航天大学",
        area: "AI",
      },
      {
        name: "Ice cream sandwich",
        hIndex: 237,
        paperNum: 9.0,
        citationNum: 37,
        org: "北京航空航天大学",
        area: "计算机 软件工程",
      },
      {
        name: "Eclair",
        hIndex: 262,
        paperNum: 16.0,
        citationNum: 23,
        org: "北京航空航天大学",
        area: "生物医学 化学合成 基因技术",
      },
      {
        name: "Cupcake",
        hIndex: 305,
        paperNum: 3.7,
        citationNum: 67,
        org: "北京航空航天大学",
        area: "AI",
      },
      {
        name: "Gingerbread",
        hIndex: 356,
        paperNum: 16.0,
        citationNum: 49,
        org: "北京航空航天大学",
        area: "AI",
      },
      {
        name: "Jelly bean",
        hIndex: 375,
        paperNum: 0.0,
        citationNum: 94,
        org: "北京航空航天大学",
        area: "AI",
      },
      {
        name: "Lollipop",
        hIndex: 392,
        paperNum: 0.2,
        citationNum: 98,
        org: "北京航空航天大学",
        area: "AI",
      },
      {
        name: "Honeycomb",
        hIndex: 408,
        paperNum: 3.2,
        citationNum: 87,
        org: "北京航空航天大学",
        area: "AI",
      },
      {
        name: "Donut",
        hIndex: 452,
        paperNum: 25.0,
        citationNum: 51,
        org: "北京航空航天大学",
        area: "AI",
      },
      {
        name: "KitKat",
        hIndex: 518,
        paperNum: 26.0,
        citationNum: 65,
        org: "北京航空航天大学",
        area: "AI",
      },
    ];
    const orgHeader = [
        {
        text: "姓名",
        align: "start",
        sortable: false,
        value: "name",
        },
        { text: "国家", value: "country", filterable: false, sortable: false, },
        { text: "2022自然指数", value: "index2022", filterable: false },
        { text: "2022论文数", value: "count2022", filterable: false },
    ];
    const orgDesserts = [
        {
            name: 'Max Planck Society',
            country: 'Germany',
            index2022: 782.72,
            count2022: 2780
        },
        {
            name: 'French National Centre for Scientific Research (CNRS)',
            country: 'France',
            index2022: 675.69,
            count2022: 4399
        },
        {
            name: 'Helmholtz Association of German Research Centres',
            country: 'Germany',
            index2022: 565.07,
            count2022: 2584
        },
        {
            name: 'University of Oxford',
            country: 'United Kingdom (UK)',
            index2022: 452.28,
            count2022: 1485
        },
        {
            name: 'Swiss Federal Institute of Technology Zurich (ETH Zurich)',
            country: 'Switzerland',
            index2022: 395.67,
            count2022: 1065
        },
        {
            name: 'Imperial College London (ICL),',
            country: 'United Kingdom (UK)',
            index2022: 248.3,
            count2022: 963
        },
        {
            name: 'Russian Academy of Sciences (RAS)',
            country: 'Russia',
            index2022: 242.05,
            count2022: 914
        },
        {
            name: 'Swiss Federal Institute of Technology Lausanne (EPFL)',
            country: 'Switzerland',
            index2022: 228.37,
            count2022: 619
        },
        {
            name: 'UCL',
            country: 'United Kingdom (UK)',
            index2022: 222.6,
            count2022: 981
        },
        {
            name: 'Spanish National Research Council (CSIC)',
            country: 'Spain',
            index2022: 209.15,
            count2022: 1190
        },
        {
            name: 'Leibniz Association',
            country: 'Germany',
            index2022: 200.12,
            count2022: 1001
        }
    ];
    return {
      scholarSearch: "",
      orgSearch: "",
      scholarpageCount: 0,
      orgpageCount: 0,
      orgDesserts,
      orgHeader,
      orgpage: 1,
      scholarpage: 1,
      tab: null,
      fieldOptions,
      scholarDesserts,
      scholarHeader,
    };
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
  border-radius: 20px;
  background-color: #ffffff;
  box-sizing: border-box;
  font-size: vw(16);
  box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.35);
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