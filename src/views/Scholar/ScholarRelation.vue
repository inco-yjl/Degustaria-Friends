<template>
  <div class="e-graph">
    <div id="chart" style="width: 100%; height:100%"></div>
  </div>
 </template>
 <script>
 import * as  echarts from "echarts";
 export default {
  data() {
    return {
    };
  },
  mounted() {
    this.initChart()
  },
 
  methods: {
    initChart() {
      let myChart = echarts.init(document.getElementById('chart'))
      myChart.resize();
      myChart.setOption(this.setOption());
    },
    setOption() {
      let option = {
        color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            type: "graph",
            layout: "force",
            symbolSize: 100,
            symbolSize: (value, params) => {
              switch (params.data.category) {
                case 1:
                  return 50;
                  break;
                case 2:
                  return 60;
                  break;
              }
            },
            roam: true,
            label: {
              show: true, 
              position: "right",
            },
            focusNodeAdjacency: true, 
            edgeSymbolSize: [4, 10],
            draggable: true,
            edgeLabel: {
              fontSize: 14,
            },
            force: {
              repulsion: 200,
              edgeLength: 120,
            },
            itemStyle: {
              color: params => {
                let colorList = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
                return colorList[params.data.category]
              }
            },
            data: [
              {
                name: "xyf",
                category: 1,
              },
              {
                name: "yjl",
                category: 2,
              },
              {
                name: "zxc",
                category: 1,
              },
              {
                name: "pyy",
                category: 2,
              },
              {
                name: "yxy",
                category: 1,
              },
              {
                name: "zjr",
                category: 1,
              }
            ],
            links: [
              {
                source: "xyf",
                target: "zxc",
              },
              {
                source: "yjl",
                target: "pyy",
              },
              {
                source: "yjl",
                target: "yxy",
              },
              {
                source: "yjl",
                target: "zjr",
              },
              {
                source: "xyf",
                target: "pyy",
              },
              {
                source: "zjr",
                target: "xyf",
              }
            ],
            lineStyle: {
              opacity: 0.9,
              width: 2,
              curveness: 0,
            },
          },
        ],
      };
      return option;
    },
  },
 };
 </script>
 
 <style scoped>
 .e-graph {
  width: 100%;
  height: 350px;
 }
 </style>