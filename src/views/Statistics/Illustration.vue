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
          <div class="collection-content d-block mx-auto">
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
        ><div class="distribution-map"></div
      ></v-card>
    </div>
    <div class="div5">
      <v-card class="d-block mx-auto rounded-t-lg rounded-b-0" flat>
        <div class="div5-background">
          <div class="distribution-title-text">学者分布</div>
          <div class="distribution-divider"><v-divider></v-divider></div>
        </div>
        <div class="distribution-title">
        </div
      ></v-card>
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
        });
      }, 300);

      console.log(document.getElementById("paper-number"));
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
        "#f00010",
        "#c93c42",
        "#f68d3c",
        "#c8171a",
        "#dd556c",
        "#a30048",
        "#b52409",
        "#822e29",
        "#f34d1e",
        "#f48269",
        "#be0235",
        "#fa3e16",
        "#cd2048",
        "#fa6579",
        "#e76bbe",
        "#980c3b",
        "#c95244",
        "#cd4e34",
        "#e8786b",
        "#be2301",
      ];
      var option = {
        series: [
          {
            type: "wordCloud",
            //maskImage: maskImage,
            sizeRange: [15, 45],
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
              fontFamily: "华文中宋",
              fontWeight: "normal",
            },
            data: keywords,
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      wordColud.setOption(option);
      window.addEventListener("resize", function () {
        wordColud.resize();
      });
    },
  },
};
</script>
<style scoped lang="scss">
.illustration-content {
  width: vw(1300);
  margin-left: vw(310);
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(10, 1fr);
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
  z-index: 10;
}
.div5 {
  margin-right: vw(20);
  grid-area: 4 / 3 / 5 / 4;
  position: relative;
  z-index: 100;
}
.div5-background {
  position: absolute;
  background-color: white;
  width: 100%;
  height: vh(120);
  padding: vh(20) vw(10);
}
.distribution-title-text {
  font-family: "庞门正道标题体", sans-serif;
  color: #333333;
  text-align: center;
  font-size: vw(36);
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
  font-family: "庞门正道标题体", sans-serif;
  color: #333333;
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
  height: vh(480);
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
  font-family: "庞门正道标题体", sans-serif;
  color: #333333;
  font-size: vw(36);
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
  height: vh(330);
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
  margin-left: vw(40);
  background-color: #ffffff;
  box-sizing: border-box;
  font-family: "庞门正道标题体", sans-serif;
  color: #333333;
  font-size: vw(36);
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
  height: vh(300);
  justify-content: center;
  align-items: center;
  gap: 0;
  padding: vh(10) vw(10);
  border-radius: 20px;
  background-color: #ffffff;
  box-sizing: border-box;
  box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.35);
}
</style>