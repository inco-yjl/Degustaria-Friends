<template>
  <div class="illustration-content">
    <div class="div1">
      <v-card class="d-block mx-auto rounded-lg" flat>
        <div class="achievement-summary">
          <div class="achievement-summary-charts">
            <div id="paper-number" class="achievement-summary-chart"></div>
            <div id="project-number" class="achievement-summary-chart"></div>
            <div id="patent-number" class="achievement-summary-chart"></div>
          </div>
          <div class="time-chart-row">
            <div id="time-distribution"></div>
          </div>
        </div>
      </v-card>
    </div>
    <!--
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
    </div>-->
    <div class="div2">
      <v-card class="d-block mx-auto rounded-lg" flat>
        <div class="search-word-summary">
          <div class="search-word-title">搜索热词</div>
          <div class="search-word-divider"><v-divider></v-divider></div>
          <div id="word-cloud"></div>
        </div>
      </v-card>
    </div>
    <div class="div3">
      <v-card class="d-block mx-auto rounded-lg" flat
        >
        <div class="distribution-map">
          <div class="distribution-content">
            <div>
              <div class="summary-title">
            <div class="title-text">学术成果总数</div>
            <div class="summary-num">
              <CountUp :delay="0" :endVal="achievementSum" :options="options" />
            </div>
          </div>
            <div class="summary-title">
              <div class="title-text">机构总数</div>
              <div class="summary-num">
                <CountUp
                  :delay="0"
                  :endVal="orgNum"
                  :options="options"
                />
              </div>
            </div>
            <div class="summary-title">
              <div class="title-text">学者总数</div>
              <div class="summary-num">
                <CountUp
                  :delay="0"
                  :endVal="scholarNum"
                  :options="options"
                />
              </div>
            </div>
          </div>
          <div>机构分布
          <div id="map-content"></div></div>
        </div>
        </div>
      </v-card>
    </div>
    <!--
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
         
        </div>
      </v-card>
    </div>-->
  </div>
</template>

<script>
import CountUp from "vue-countup-v2";
import * as echarts from "echarts";
import "echarts-wordcloud/dist/echarts-wordcloud";
import "echarts-wordcloud/dist/echarts-wordcloud.min";
import { ref } from 'vue';
export default {
  components: {
    CountUp,
  },
  data() {
    var widthScale = document.documentElement.clientWidth / 1920;
    var heightScale = document.documentElement.clientHeight / 1080;
    var currentScaleRatio = widthScale < heightScale ? widthScale : heightScale;
    const paperNum = 9827075;
    const patentNum = 331919;
    const orgNum = 252278;
    const achievementSum = paperNum + patentNum;
    const paperPercent = ((paperNum / achievementSum)*100).toFixed(2);
    const patentPercent = ((patentNum / achievementSum)*100).toFixed(2);
    return {
      title1: "收录",
      scholarNum: 1326613,
      achievementSum,
      currentScaleRatio,
      paperPercent,
      projectPercent: 0,
      patentPercent,
      orgNum,
      distribution: [],
      achievementSumStart: 1000000,
      options: {
        useEasing: true,
        startVal: 100000,
        useGrouping: true,
        separator: ",",
        decimal: ".",
        suffix: "",
      },
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getDistribution();
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
    getDistribution() {
      this.$axios({
        method: "post",
        url: "/get_distribution"
      })
        .then((res) => {
          console.log("distribution:"+res.data);
          var keys = Object.keys(res.data);
          var value = Object.values(res.data);
          this.distribution = [];
          for(var i=0;i<keys.length;i++){
            if (keys[i].indexOf("(")>0)
              keys[i] = keys[i].substring(0,keys[i].indexOf("(")-1)
            this.distribution.push({
              name: keys[i],
              value: value[i]
            })
          }
          console.log(this.distribution)
          this.drawMap();
        })
        .catch((err) => {
          //请求若出现路由找不到等其它异常，则在终端输出错误信息
          console.log(err);
        });
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
          max: 120,
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
            data: this.distribution
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
  grid-template-rows: repeat(13, 1fr);
}

.div1 {
  grid-area: 1 / 1 / 7 / 4;
}
.div2 {
  grid-area: 1 / 4 / 7 / 7;
}
.div3 {
  grid-area: 7 / 1 / 12 / 7; 
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
  height: vh(480);
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
  width: vw(180);
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
  justify-items: center;
  gap: vw(20);
}
.achievement-summary-chart {
  width: vw(123);
  height: vh(140);
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
  width: vw(620);
  height: vh(480);
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
  width: vw(640);
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
  width: vw(620);
}

#word-cloud {
  width: vw(620);
  height: vh(460);
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
  width: vw(1270);
  height: vh(420);
  justify-content: center;
  align-items: center;
  gap: 0;
  padding: vh(10) vw(10);
  border-radius: 20px;
  background-color: #ffffff;
  box-sizing: border-box;
  box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.35);
}
.distribution-content {
  display: flex;
  margin-top: vh(10);
}
#map-content {
  width: vw(750);
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