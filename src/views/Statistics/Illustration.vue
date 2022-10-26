<template>
  <div class="illustration-content">
    <div class="div1">
      <v-card class="d-block mx-auto rounded-lg" flat>
        <div class="achievement-summary">
          <div class="summary-title">
            <div class="title-text">学术成果总数</div>
            <div class="summary-num">
              <CountUp :delay="0" :endVal="achievementSum" :options="options" />
            </div>
          </div>
          <div class="achievement-summary-charts">
            <div id="paper-number" class="achievement-summary-chart"></div>
            <div id="project-number" class="achievement-summary-chart"></div>
            <div id="patent-number" class="achievement-summary-chart"></div>
            <div id="others-number" class="achievement-summary-chart"></div>
          </div>
        </div>
      </v-card>
    </div>
    <div class="div3">
      <v-card class="rounded-lg" flat>
        <div class="collections-summary">
          <div class="collections-title">收录</div>
          <div class="collection-divider"><v-divider></v-divider></div>
          <div
            class="collection-content d-flex flex-wrap justify-space-between"
          >
            <div class="summary-title">
              <div class="title-text">机构总数</div>
              <div class="summary-num">
                <CountUp
                  :delay="0"
                  :endVal="achievementSum"
                  :options="options"
                />
              </div>
            </div>
            <div class="summary-title">
              <div class="title-text">期刊总数</div>
              <div class="summary-num">
                <CountUp
                  :delay="0"
                  :endVal="achievementSum"
                  :options="options"
                />
              </div>
            </div>
            <div class="summary-title">
              <div class="title-text">会议总数</div>
              <div class="summary-num">
                <CountUp
                  :delay="0"
                  :endVal="achievementSum"
                  :options="options"
                />
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </div>
    <div class="div2">
      <v-card class="d-block mx-auto rounded-lg" flat>
        <div class="search-word-summary">
          <div class="search-word-title">搜索热词</div>
          <div class="search-word-divider"><v-divider></v-divider></div>
          <div id="word-cloud"></div>
        </div>
      </v-card>
    </div>
    <div class="div4">
      <v-card class="d-block mx-auto rounded-lg" flat
        ><div class="distribution-map">
          <div id="map-content"></div></div
      ></v-card>
    </div>
    <div class="div5">
      <v-card class="d-block mx-auto rounded-t-lg rounded-b-0" flat>
        <div class="div5-background">
          <div class="distribution-title-text">学者分布</div>
          <div class="distribution-divider"><v-divider></v-divider></div>
        </div>
        <div class="distribution-title"></div
      ></v-card>
    </div>
    <div class="div6">
      <v-card class="d-block mx-auto rounded-lg" flat>
        <div class="achievement-time-summary">
          <div class="achievement-time-summary-title">学术成果统计</div>
          <div class="achievement-time-summary-divider">
            <v-divider></v-divider>
          </div>
          <div class="time-chart-row">
            <div id="category-distribution"></div>
            <div id="time-distribution"></div>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import CountUp from "vue-countup-v2";
import * as echarts from "echarts";
import "echarts-wordcloud/dist/echarts-wordcloud";
import "echarts-wordcloud/dist/echarts-wordcloud.min";

export default {
  components: {
    CountUp,
  },
  data() {
    var widthScale = document.documentElement.clientWidth / 1920;
    var heightScale = document.documentElement.clientHeight / 1080;
    var currentScaleRatio = widthScale < heightScale ? widthScale : heightScale;
    return {
      title1: "收录",
      achievementSum: 123123543,
      currentScaleRatio,
      paperPercent: 82.5,
      projectPercent: 7.6,
      patentPercent: 0.6,
      achievementSumStart: 100000000,
      options: {
        useEasing: true,
        startVal: 100000000,
        useGrouping: true,
        separator: ",",
        decimal: ".",
        suffix: "",
      },
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.redraw();
    });
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        var widthScale = document.documentElement.clientWidth / 1920;
        var heightScale = document.documentElement.clientHeight / 1080;
        this.currentScaleRatio =
          widthScale < heightScale ? widthScale : heightScale;
        this.redraw();
      })();
    };
  },
  methods: {
    redraw() {
      setTimeout(() => {
        this.$nextTick(() => {
          this.drawPaperPie();
          this.drawProjectPie();
          this.drawPatentPie();
          this.drawOthersPie();
          this.drawWordCloud();
          this.drawMap();
          this.drawCategoryDistribution();
          this.drawTimeDistribution();
        });
      }, 300);
    },
    drawCategoryDistribution() {
      const colorPalette = [
        "#0064d0",
        "#5470c6",
        "#278cdc",
        "#0f8aea",
        "#62aef0",
        "#71abdc",
        "#1e2a78",
        "#0ca2de",
        "#47aae0",
        "#537cc0",
        "#4c66e0",
        "#5771c7",
        "rgb(84,112,198)",
        "#484eca",
        "#3021bb",
        "#3c359e",
      ];
      const item1 = {
        color: "#0064d0",
      };
      const item2 = {
        color: "#c3e0ff",
      };
      const item3 = {
        color: "#278cdc",
      };
      const data = [
        {
          children: [
            {
              value: 5,
              children: [
                {
                  value: 1,
                  itemStyle: item1,
                },
                {
                  value: 2,
                  children: [
                    {
                      value: 1,
                      itemStyle: item2,
                    },
                  ],
                },
                {
                  children: [
                    {
                      value: 1,
                    },
                  ],
                },
              ],
              itemStyle: item1,
            },
            {
              value: 10,
              children: [
                {
                  value: 6,
                  children: [
                    {
                      value: 1,
                      itemStyle: item1,
                    },
                    {
                      value: 1,
                    },
                    {
                      value: 1,
                      itemStyle: item2,
                    },
                    {
                      value: 1,
                    },
                  ],
                  itemStyle: item3,
                },
                {
                  value: 2,
                  children: [
                    {
                      value: 1,
                    },
                  ],
                  itemStyle: item3,
                },
                {
                  children: [
                    {
                      value: 1,
                      itemStyle: item2,
                    },
                  ],
                },
              ],
              itemStyle: item1,
            },
          ],
          itemStyle: item1,
        },
        {
          value: 9,
          children: [
            {
              value: 4,
              children: [
                {
                  value: 2,
                  itemStyle: item2,
                },
                {
                  children: [
                    {
                      value: 1,
                      itemStyle: item1,
                    },
                  ],
                },
              ],
              itemStyle: item1,
            },
            {
              children: [
                {
                  value: 3,
                  children: [
                    {
                      value: 1,
                    },
                    {
                      value: 1,
                      itemStyle: item2,
                    },
                  ],
                },
              ],
              itemStyle: item3,
            },
          ],
          itemStyle: item2,
        },
        {
          value: 7,
          children: [
            {
              children: [
                {
                  value: 1,
                  itemStyle: item3,
                },
                {
                  value: 3,
                  children: [
                    {
                      value: 1,
                      itemStyle: item2,
                    },
                    {
                      value: 1,
                    },
                  ],
                  itemStyle: item2,
                },
                {
                  value: 2,
                  children: [
                    {
                      value: 1,
                    },
                    {
                      value: 1,
                      itemStyle: item1,
                    },
                  ],
                  itemStyle: item1,
                },
              ],
              itemStyle: item3,
            },
          ],
          itemStyle: item1,
        },
        {
          children: [
            {
              value: 6,
              children: [
                {
                  value: 1,
                  itemStyle: item2,
                },
                {
                  value: 2,
                  children: [
                    {
                      value: 2,
                      itemStyle: item2,
                    },
                  ],
                  itemStyle: item1,
                },
                {
                  value: 1,
                  itemStyle: item3,
                },
              ],
              itemStyle: item3,
            },
            {
              value: 3,
              children: [
                {
                  value: 1,
                },
                {
                  children: [
                    {
                      value: 1,
                      itemStyle: item2,
                    },
                  ],
                },
                {
                  value: 1,
                },
              ],
              itemStyle: item3,
            },
          ],
          itemStyle: item1,
        },
      ];
      const option = {
        series: {
          radius: ["15%", "80%"],
          type: "sunburst",
          sort: undefined,
          emphasis: {
            focus: "ancestor",
          },
          data: data,
          label: {
            rotate: "radial",
          },
          levels: [],
          itemStyle: {
            color: "#ddd",
            borderWidth: 2,
          },
        },
      };
      if (document.getElementById("category-distribution") === null) {
        console.log("null");
        return;
      }
      echarts.dispose(document.getElementById("category-distribution"));
      var cateChart = echarts.init(
        document.getElementById("category-distribution")
      );
      cateChart.setOption(option);
    },
    drawTimeDistribution() {
      if (document.getElementById("time-distribution") === null) {
        console.log("null");
        return;
      }
      echarts.dispose(document.getElementById("time-distribution"));
      var timeChart = echarts.init(
        document.getElementById("time-distribution")
      );
      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          textStyle: {
            fontSize: 16 * this.currentScaleRatio,
          },
        },
        xAxis: {
          axisLabel: {
            textStyle: {
              fontSize: 16 * this.currentScaleRatio,
            },
          },
          type: "category",
          data: [
            "2013",
            "2014",
            "2015",
            "2016",
            "2017",
            "2018",
            "2019",
            "2020",
            "2021",
            "2022",
          ],
        },
        yAxis: {
          axisLabel: {
            textStyle: {
              fontSize: 16 * this.currentScaleRatio,
            },
          },
          type: "value",
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260, 501, 391, 951],
            type: "line",
          },
        ],
      };
      timeChart.setOption(option);
    },
    drawMap() {
      // 基于准备好的dom，初始化echarts实例
      let chart = echarts.init(document.getElementById("map-content"));
      // 监听屏幕变化自动缩放图表
      window.addEventListener("resize", function () {
        chart.resize();
      });
      // 绘制图表
      chart.setOption({
        // 图表主标题
        // title: {
        //   text: '世界地图', // 主标题文本，支持使用 \n 换行
        //   top: 10, // 定位 值: 'top', 'middle', 'bottom' 也可以是具体的值或者百分比
        //   left: 'center', // 值: 'left', 'center', 'right' 同上
        //   textStyle: { // 文本样式
        //     fontSize: 24,
        //     fontWeight: 600,
        //     color: '#000'
        //   }
        // },
        grid: {
          width: "100%",
          height: "100%",
          left: "0%",
          right: "0%",
          bottom: "0%",
          containLabel: true,
        },
        // 提示框组件
        tooltip: {
          trigger: "item", // 触发类型, 数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用
          // 提示框浮层内容格式器，支持字符串模板和回调函数两种形式
          // 使用函数模板  传入的数据值 -> value: number | Array
          formatter: function (val) {
            if (val.data == null) return;
            return val.data.name + ": " + val.data.value;
          },
        },
        // 视觉映射组件
        visualMap: {
          min: 0,
          max: 100000,
          text: ["最多", "最少"],
          realtime: false,
          calculable: true,
          color: ["#0064d0", "#c3e0ff"],
        },
        series: [
          {
            type: "map", // 类型
            // 系列名称，用于tooltip的显示，legend 的图例筛选 在 setOption 更新数据和配置项时用于指定对应的系列
            name: "世界地图",
            mapType: "world", // 地图类型
            // 是否开启鼠标缩放和平移漫游 默认不开启 如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move' 设置成 true 为都开启
            roam: true,
            // 图形上的文本标签
            label: {
              show: false, // 是否显示对应地名
            },
            zoom: 1.2,
            // 地图区域的多边形 图形样式
            itemStyle: {
              // areaColor: '#7B68EE', // 地图区域的颜色 如果设置了visualMap，areaColor属性将不起作用
              borderWidth: 0.5, // 描边线宽 为 0 时无描边
              borderColor: "#000", // 图形的描边颜色 支持的颜色格式同 color，不支持回调函数
              borderType: "solid", // 描边类型，默认为实线，支持 'solid', 'dashed', 'dotted'
            },
            // 高亮状态下的多边形和标签样式
            emphasis: {
              label: {
                show: true, // 是否显示标签
                color: "#fff", // 文字的颜色 如果设置为 'auto'，则为视觉映射得到的颜色，如系列色
              },
              itemStyle: {
                areaColor: "#FF6347", // 地图区域的颜色
              },
            },
            // 地图系列中的数据内容数组 数组项可以为单个数值
            data: [
              { name: "Afghanistan", value: 28397.812 },
              { name: "Angola", value: 19549.124 },
              { name: "Albania", value: 3150.143 },
              { name: "United Arab Emirates", value: 8441.537 },
              { name: "Argentina", value: 40374.224 },
              { name: "Armenia", value: 2963.496 },
              { name: "French Southern and Antarctic Lands", value: 268.065 },
              { name: "Australia", value: 22404.488 },
              { name: "Austria", value: 8401.924 },
              { name: "Azerbaijan", value: 9094.718 },
              { name: "Burundi", value: 9232.753 },
              { name: "Belgium", value: 10941.288 },
              { name: "Benin", value: 9509.798 },
              { name: "Burkina Faso", value: 15540.284 },
              { name: "Bangladesh", value: 151125.475 },
              { name: "Bulgaria", value: 7389.175 },
              { name: "The Bahamas", value: 66402.316 },
              { name: "Bosnia and Herzegovina", value: 3845.929 },
              { name: "Belarus", value: 9491.07 },
              { name: "Belize", value: 308.595 },
              { name: "Bermuda", value: 64.951 },
              { name: "Bolivia", value: 716.939 },
              { name: "Brazil", value: 195210.154 },
              { name: "Brunei", value: 27.223 },
              { name: "Bhutan", value: 716.939 },
              { name: "Botswana", value: 1969.341 },
              { name: "Central African Republic", value: 4349.921 },
              { name: "Canada", value: 34126.24 },
              { name: "Switzerland", value: 7830.534 },
              { name: "Chile", value: 17150.76 },
              { name: "China", value: 1359821.465 },
              { name: "Ivory Coast", value: 60508.978 },
              { name: "Cameroon", value: 20624.343 },
              { name: "Democratic Republic of the Congo", value: 62191.161 },
              { name: "Republic of the Congo", value: 3573.024 },
              { name: "Colombia", value: 46444.798 },
              { name: "Costa Rica", value: 4669.685 },
              { name: "Cuba", value: 11281.768 },
              { name: "Northern Cyprus", value: 1.468 },
              { name: "Cyprus", value: 1103.685 },
              { name: "Czech Republic", value: 10553.701 },
              { name: "Germany", value: 83017.404 },
              { name: "Djibouti", value: 834.036 },
              { name: "Denmark", value: 5550.959 },
              { name: "Dominican Republic", value: 10016.797 },
              { name: "Algeria", value: 37062.82 },
              { name: "Ecuador", value: 15001.072 },
              { name: "Egypt", value: 78075.705 },
              { name: "Eritrea", value: 5741.159 },
              { name: "Spain", value: 46182.038 },
              { name: "Estonia", value: 1298.533 },
              { name: "Ethiopia", value: 87095.281 },
              { name: "Finland", value: 5367.693 },
              { name: "Fiji", value: 860.559 },
              { name: "Falkland Islands", value: 49.581 },
              { name: "France", value: 63230.866 },
              { name: "Gabon", value: 1556.222 },
              { name: "United Kingdom", value: 62066.35 },
              { name: "Georgia", value: 4388.674 },
              { name: "Ghana", value: 24262.901 },
              { name: "Guinea", value: 10876.033 },
              { name: "Gambia", value: 1680.64 },
              { name: "Guinea Bissau", value: 10876.033 },
              { name: "Equatorial Guinea", value: 696.167 },
              { name: "Greece", value: 11109.999 },
              { name: "Greenland", value: 56.546 },
              { name: "Guatemala", value: 14341.576 },
              { name: "French Guiana", value: 231.169 },
              { name: "Guyana", value: 786.126 },
              { name: "Honduras", value: 7621.204 },
              { name: "Croatia", value: 4338.027 },
              { name: "Haiti", value: 9896.4 },
              { name: "Hungary", value: 10014.633 },
              { name: "Indonesia", value: 240676.485 },
              { name: "India", value: 1205624.648 },
              { name: "Ireland", value: 4467.561 },
              { name: "Iran", value: 240676.485 },
              { name: "Iraq", value: 30962.38 },
              { name: "Iceland", value: 318.042 },
              { name: "Israel", value: 7420.368 },
              { name: "Italy", value: 60508.978 },
              { name: "Jamaica", value: 2741.485 },
              { name: "Jordan", value: 6454.554 },
              { name: "Japan", value: 127352.833 },
              { name: "Kazakhstan", value: 15921.127 },
              { name: "Kenya", value: 40909.194 },
              { name: "Kyrgyzstan", value: 5334.223 },
              { name: "Cambodia", value: 14364.931 },
              { name: "South Korea", value: 51452.352 },
              { name: "Kosovo", value: 97.743 },
              { name: "Kuwait", value: 2991.58 },
              { name: "Laos", value: 6395.713 },
              { name: "Lebanon", value: 4341.092 },
              { name: "Liberia", value: 3957.99 },
              { name: "Libya", value: 6040.612 },
              { name: "Sri Lanka", value: 20758.779 },
              { name: "Lesotho", value: 2008.921 },
              { name: "Lithuania", value: 3068.457 },
              { name: "Luxembourg", value: 507.885 },
              { name: "Latvia", value: 2090.519 },
              { name: "Morocco", value: 31642.36 },
              { name: "Moldova", value: 103.619 },
              { name: "Madagascar", value: 21079.532 },
              { name: "Mexico", value: 117886.404 },
              { name: "Macedonia", value: 507.885 },
              { name: "Mali", value: 13985.961 },
              { name: "Myanmar", value: 51931.231 },
              { name: "Montenegro", value: 620.078 },
              { name: "Mongolia", value: 2712.738 },
              { name: "Mozambique", value: 23967.265 },
              { name: "Mauritania", value: 3609.42 },
              { name: "Malawi", value: 15013.694 },
              { name: "Malaysia", value: 28275.835 },
              { name: "Namibia", value: 2178.967 },
              { name: "New Caledonia", value: 246.379 },
              { name: "Niger", value: 15893.746 },
              { name: "Nigeria", value: 159707.78 },
              { name: "Nicaragua", value: 5822.209 },
              { name: "Netherlands", value: 16615.243 },
              { name: "Norway", value: 4891.251 },
              { name: "Nepal", value: 26846.016 },
              { name: "New Zealand", value: 4368.136 },
              { name: "Oman", value: 2802.768 },
              { name: "Pakistan", value: 173149.306 },
              { name: "Panama", value: 3678.128 },
              { name: "Peru", value: 29262.83 },
              { name: "Philippines", value: 93444.322 },
              { name: "Papua New Guinea", value: 6858.945 },
              { name: "Poland", value: 38198.754 },
              { name: "Puerto Rico", value: 3709.671 },
              { name: "North Korea", value: 1.468 },
              { name: "Portugal", value: 10589.792 },
              { name: "Paraguay", value: 6459.721 },
              { name: "Qatar", value: 1749.713 },
              { name: "Romania", value: 21861.476 },
              { name: "Russia", value: 21861.476 },
              { name: "Rwanda", value: 10836.732 },
              { name: "Western Sahara", value: 514.648 },
              { name: "Saudi Arabia", value: 27258.387 },
              { name: "Sudan", value: 35652.002 },
              { name: "South Sudan", value: 9940.929 },
              { name: "Senegal", value: 12950.564 },
              { name: "Solomon Islands", value: 526.447 },
              { name: "Sierra Leone", value: 5751.976 },
              { name: "El Salvador", value: 6218.195 },
              { name: "Somaliland", value: 9636.173 },
              { name: "Somalia", value: 9636.173 },
              { name: "Republic of Serbia", value: 3573.024 },
              { name: "Suriname", value: 524.96 },
              { name: "Slovakia", value: 5433.437 },
              { name: "Slovenia", value: 2054.232 },
              { name: "Sweden", value: 9382.297 },
              { name: "Swaziland", value: 1193.148 },
              { name: "Syria", value: 7830.534 },
              { name: "Chad", value: 11720.781 },
              { name: "Togo", value: 6306.014 },
              { name: "Thailand", value: 66402.316 },
              { name: "Tajikistan", value: 7627.326 },
              { name: "Turkmenistan", value: 5041.995 },
              { name: "East Timor", value: 10016.797 },
              { name: "Trinidad and Tobago", value: 1328.095 },
              { name: "Tunisia", value: 10631.83 },
              { name: "Turkey", value: 72137.546 },
              { name: "United Republic of Tanzania", value: 44973.33 },
              { name: "Uganda", value: 33987.213 },
              { name: "Ukraine", value: 46050.22 },
              { name: "Uruguay", value: 3371.982 },
              { name: "United States of America", value: 312247.116 },
              { name: "Uzbekistan", value: 27769.27 },
              { name: "Venezuela", value: 236.299 },
              { name: "Vietnam", value: 89047.397 },
              { name: "Vanuatu", value: 236.299 },
              { name: "West Bank", value: 13.565 },
              { name: "Yemen", value: 22763.008 },
              { name: "South Africa", value: 51452.352 },
              { name: "Zambia", value: 13216.985 },
              { name: "Zimbabwe", value: 13076.978 },
            ],
          },
        ],
      });
    },
    drawPaperPie() {
      if (document.getElementById("paper-number") === null) {
        console.log("null");
        return;
      }
      echarts.dispose(document.getElementById("paper-number"));
      var paperChart = echarts.init(document.getElementById("paper-number"));
      paperChart.setOption({
        series: [
          {
            name: "学术成果分布",
            type: "pie", // 设置图表类型为饼图
            hoverAnimation: false, //关闭鼠标放上去时的动画效果
            radius: ["70%", "90%"], // 环形图的关键。90%为外半径，80%为内半径，中间10%即环形的宽度
            center: ["50%", "50%"], //调整饼图位置
            data: [
              {
                name: "论文",
                value: this.paperPercent,
                label: {
                  show: true,
                  fontSize: 18 * this.currentScaleRatio,
                  fontWeight: "bold",
                }, //单独显示某一项值的关键
              },
              { name: "未使用", value: 100 - this.paperPercent },
            ],
            itemStyle: {
              //图形样式设置
              normal: {
                color: function (params) {
                  //自定义饼图各板块颜色
                  var colorList = ["rgb(84,112,198)", "#cccccc"];
                  return colorList[params.dataIndex];
                },
              },
            },
            label: {
              //文本样式
              position: "center",
              normal: {
                textStyle: {
                  fontSize: 12, // 改变标示文字的大小
                  color: "#232f3d",
                },
                formatter: "{d}%\n{b}", //提示文本内容 d代表百分比，b代表name文本
                position: "center", //控制文字显示的位置，center居中显示
                show: false, //由于要单独显示（已使用）的数值，所以得先隐藏label
              },
            },
          },
        ],
      });
    },
    drawProjectPie() {
      if (document.getElementById("project-number") === null) {
        console.log("null");
        return;
      }
      echarts.dispose(document.getElementById("project-number"));
      var projectChart = echarts.init(
        document.getElementById("project-number")
      );
      projectChart.setOption({
        series: [
          {
            name: "学术成果分布",
            type: "pie", // 设置图表类型为饼图
            hoverAnimation: false, //关闭鼠标放上去时的动画效果
            radius: ["70%", "90%"], // 环形图的关键。90%为外半径，80%为内半径，中间10%即环形的宽度
            center: ["50%", "50%"], //调整饼图位置
            data: [
              {
                name: "项目",
                value: this.projectPercent,
                label: {
                  show: true,
                  fontSize: 18 * this.currentScaleRatio,
                  fontWeight: "bold",
                }, //单独显示某一项值的关键
              },
              { name: "未使用", value: 100 - this.projectPercent },
            ],
            itemStyle: {
              //图形样式设置
              normal: {
                color: function (params) {
                  //自定义饼图各板块颜色
                  var colorList = ["rgb(84,112,198)", "#cccccc"];
                  return colorList[params.dataIndex];
                },
              },
            },
            label: {
              //文本样式
              position: "center",
              normal: {
                textStyle: {
                  fontSize: 12, // 改变标示文字的大小
                  color: "#232f3d",
                },
                formatter: "{d}%\n{b}", //提示文本内容 d代表百分比，b代表name文本
                position: "center", //控制文字显示的位置，center居中显示
                show: false, //由于要单独显示（已使用）的数值，所以得先隐藏label
              },
            },
          },
        ],
      });
    },
    drawPatentPie() {
      if (document.getElementById("patent-number") === null) {
        console.log("null");
        return;
      }
      echarts.dispose(document.getElementById("patent-number"));
      var patentChart = echarts.init(document.getElementById("patent-number"));
      patentChart.setOption({
        series: [
          {
            name: "学术成果分布",
            type: "pie", // 设置图表类型为饼图
            hoverAnimation: false, //关闭鼠标放上去时的动画效果
            radius: ["70%", "90%"], // 环形图的关键。90%为外半径，80%为内半径，中间10%即环形的宽度
            center: ["50%", "50%"], //调整饼图位置
            data: [
              {
                name: "专利",
                value: this.patentPercent,
                label: {
                  show: true,
                  fontSize: 18 * this.currentScaleRatio,
                  fontWeight: "bold",
                }, //单独显示某一项值的关键
              },
              { name: "未使用", value: 100 - this.patentPercent },
            ],
            itemStyle: {
              //图形样式设置
              normal: {
                color: function (params) {
                  //自定义饼图各板块颜色
                  var colorList = ["rgb(84,112,198)", "#cccccc"];
                  return colorList[params.dataIndex];
                },
              },
            },
            label: {
              //文本样式
              position: "center",
              normal: {
                textStyle: {
                  fontSize: 12, // 改变标示文字的大小
                  color: "#232f3d",
                },
                formatter: "{d}%\n{b}", //提示文本内容 d代表百分比，b代表name文本
                position: "center", //控制文字显示的位置，center居中显示
                show: false, //由于要单独显示（已使用）的数值，所以得先隐藏label
              },
            },
          },
        ],
      });
    },
    drawOthersPie() {
      if (document.getElementById("others-number") === null) {
        console.log("null");
        return;
      }
      echarts.dispose(document.getElementById("others-number"));
      var othersChart = echarts.init(document.getElementById("others-number"));
      othersChart.setOption({
        series: [
          {
            name: "学术成果分布",
            type: "pie", // 设置图表类型为饼图
            hoverAnimation: false, //关闭鼠标放上去时的动画效果
            radius: ["70%", "90%"], // 环形图的关键。90%为外半径，80%为内半径，中间10%即环形的宽度
            center: ["50%", "50%"], //调整饼图位置
            data: [
              {
                name: "其他",
                value:
                  100 -
                  this.paperPercent -
                  this.patentPercent -
                  this.projectPercent,
                label: {
                  show: true,
                  fontSize: 18 * this.currentScaleRatio,
                  fontWeight: "bold",
                }, //单独显示某一项值的关键
              },
              {
                name: "未使用",
                value:
                  this.paperPercent + this.patentPercent + this.projectPercent,
              },
            ],
            itemStyle: {
              //图形样式设置
              normal: {
                color: function (params) {
                  //自定义饼图各板块颜色
                  var colorList = ["rgb(84,112,198)", "#cccccc"];
                  return colorList[params.dataIndex];
                },
              },
            },
            label: {
              //文本样式
              position: "center",
              normal: {
                textStyle: {
                  fontSize: 12, // 改变标示文字的大小
                  color: "#232f3d",
                },
                formatter: "{d}%\n{b}", //提示文本内容 d代表百分比，b代表name文本
                position: "center", //控制文字显示的位置，center居中显示
                show: false, //由于要单独显示（已使用）的数值，所以得先隐藏label
              },
            },
          },
        ],
      });
    },
    drawWordCloud() {
      if (document.getElementById("word-cloud") === null) {
        console.log("null");
        return;
      }
      echarts.dispose(document.getElementById("word-cloud"));
      var wordColud = echarts.init(document.getElementById("word-cloud"));
      var keywords = [
        { name: "AI", value: 2.64 },
        { name: "人脸识别", value: 4.03 },
        { name: "基因编辑", value: 24.95 },
        { name: "进化", value: 4.04 },
        { name: "COVID-19", value: 5.27 },
        { name: "深度学习", value: 5.8 },
        { name: "强化学习", value: 3.09 },
        { name: "量子力学", value: 24.71 },
        { name: "量子纠缠", value: 6.33 },
        { name: "相对论", value: 2.55 },
        { name: "拓扑", value: 3.88 },
        { name: "积分", value: 8.04 },
        { name: "极限", value: 5.87 },
        { name: "大爆炸", value: 6.97 },
        { name: "NovelAI", value: 2.53 },
        { name: "Diffusion", value: 2.49 },
        { name: "深伪", value: 3.91 },
        { name: "无监督", value: 3.25 },
        { name: "对抗", value: 9.93 },
        { name: "青蒿素", value: 3.65 },
        { name: "极限", value: 5.87 },
        { name: "大爆炸", value: 6.97 },
        { name: "NovelAI", value: 2.53 },
        { name: "Diffusion", value: 2.49 },
        { name: "深伪", value: 3.91 },
        { name: "无监督", value: 3.25 },
        { name: "对抗", value: 9.93 },
        { name: "青蒿素", value: 3.65 },
      ];
      const colorPalette = [
        "#5470c6",
        "#0064d0",
        "#278cdc",
        "#0f8aea",
        "#62aef0",
        "#71abdc",
        "#1e2a78",
        "#0ca2de",
        "#47aae0",
        "#537cc0",
        "#4c66e0",
        "#5771c7",
        "rgb(84,112,198)",
        "#484eca",
        "#3021bb",
        "#3c359e",
      ];
      var option = {
        series: [
          {
            type: "wordCloud",
            //maskImage: maskImage,
            sizeRange: [
              15 * this.currentScaleRatio,
              60 * this.currentScaleRatio,
            ],
            rotationRange: [0, 0],
            rotationStep: 45,
            gridSize: 8,
            shape: "pentagon",
            width: "100%",
            height: "100%",
            textStyle: {
              color: function () {
                const index = Math.floor(16 * Math.random());
                return colorPalette[index];
              },
              fontFamily: "思源宋体",
              fontWeight: "normal",
            },
            data: keywords,
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      wordColud.setOption(option);
    },
  },
};
</script>
<style scoped lang="scss">
.illustration-content {
    font-weight: bold;
  width: vw(1300);
  padding-top: vh(60);
  margin-left: vw(310);
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(11, 1fr);
}

.div1 {
  grid-area: 1 / 1 / 4 / 4;
}
.div2 {
  grid-area: 4 / 1 / 8 / 3;
}
.div3 {
  grid-area: 1 / 4 / 5 / 7;
}
.div4 {
  margin-right: vw(20);
  grid-area: 5 / 3 / 8 / 7;
  z-index: 0;
}
.div5 {
  margin-right: vw(20);
  grid-area: 4 / 3 / 5 / 4;
  position: relative;
  z-index: 1;
}
.div6 {
  grid-area: 8 / 1 / 12 / 7;
}
.div5-background {
  position: absolute;
  background-color: white;
  width: 100%;
  height: vh(112);
  padding: vh(10) vw(10);
}
.distribution-title-text {
  font-family: "汉仪晓波花月圆", sans-serif;
  color: #333333;
  text-align: center;
  font-size: vw(30);
  text-align: left;
  padding-left: vw(10);
  align-items: center;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
.achievement-summary {
  justify-content: center;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  width: vw(620);
  height: vh(370);
  padding: vh(10) vw(10);
  border-radius: 20px;
  background-color: #ffffff;
  box-sizing: border-box;
  box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.35);
}
.summary-title {
  margin-top: vh(20);
  display: flex;
  width: vw(500);
  gap: vw(30);
}
.title-text {
  width: vw(220);
  height: vh(84);
  line-height: vh(84);
  background-color: #ffffff;
  box-sizing: border-box;
  font-family: "汉仪晓波花月圆", sans-serif;
  color: #222222;
  text-align: center;
  font-size: vw(24);
  align-items: center;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
.summary-num {
  width: vw(250);
  height: vh(84);
  border-radius: 25px;
  border: 1px solid rgba(121, 121, 121, 0);
  background-color: #cccccc5f;
  box-sizing: border-box;
  font-family: "Comic Sans MS", sans-serif;
  font-size: vw(24);
  line-height: vh(84);
  color: rgb(70, 93, 163);
  text-align: center;
  vertical-align: center;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
.achievement-summary-charts {
  display: flex;
  width: vw(580);
  justify-items: center;
  gap: vw(20);
}
.achievement-summary-chart {
  width: vw(143);
  height: vh(180);
}
.collections-summary {
  justify-content: center;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  width: vw(620);
  height: vh(473);
  padding: vh(10) vw(10);
  border-radius: 20px;
  background-color: #ffffff;
  box-sizing: border-box;
  box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.35);
}
.collections-title {
  position: relative;
  width: vw(600);
  margin-left: vw(40);
  background-color: #ffffff;
  box-sizing: border-box;
  font-family: "汉仪晓波花月圆", sans-serif;
  color: #333333;
  font-size: vw(30);
  text-align: left;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
.collection-divider {
  width: vw(600);
}
.collection-content {
  padding-left: vw(20);
  height: vh(390);
}
.search-word-summary {
  margin-top: vh(20);
  width: vw(400);
  height: vh(470);
  justify-content: center;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  padding: vh(10) vw(10);
  border-radius: 20px;
  background-color: #ffffff;
  box-sizing: border-box;
  box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.35);
}
.search-word-title {
  position: relative;
  width: vw(420);
  margin-left: vw(10);
  background-color: #ffffff;
  box-sizing: border-box;
  font-family: "汉仪晓波花月圆", sans-serif;
  color: #333333;
  font-size: vw(30);
  text-align: left;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
.search-word-divider {
  width: vw(400);
}

#word-cloud {
  width: vw(400);
  height: vh(420);
}
.distribution-title {
  margin-top: vh(20);
  width: auto;
  height: vh(97);
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0;
  padding: vh(10) vw(10);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 0;
  background-color: #ffffff;
  box-sizing: border-box;
  box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.35);
}
.distribution-map {
  width: vw(835);
  height: vh(368);
  justify-content: center;
  align-items: center;
  gap: 0;
  padding: vh(10) vw(10);
  border-radius: 20px;
  background-color: #ffffff;
  box-sizing: border-box;
  box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.35);
}
#map-content {
  width: vw(810);
  height: vh(350);
}
.achievement-time-summary {
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0;
  width: vw(1270);
  height: vh(400);
  margin-top: vh(20);
  padding: vh(10) vw(10);
  border-radius: 20px;
  background-color: #ffffff;
  box-sizing: border-box;
  box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.35);
}
.achievement-time-summary-title {
  font-family: "汉仪晓波花月圆", sans-serif;
  color: #333333;
  text-align: center;
  font-size: vw(30);
  text-align: left;
  padding-left: vw(10);
  align-items: center;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
.time-chart-row {
  width: 100%;
  height: 100%;
  display: flex;
  gap: vw(20);
}
#category-distribution {
  height: vh(320);
  width: vw(500);
}
#time-distribution {
  height: vh(320);
  width: vw(800);
}
</style>