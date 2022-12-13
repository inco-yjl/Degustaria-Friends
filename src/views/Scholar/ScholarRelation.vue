<template>
  <div class="e-graph">
    <div id="chart" style="width: 100%; height:100%"></div>
  </div>
 </template>
 <script>
 import * as  echarts from "echarts";
 import qs from "qs";
 export default {
  data() {
    return {
      scholarId: 0,
      rdata: [],
      relation: []
    };
  },
  props: {
    id: {type: Number}
  },
  mounted() {
    this.scholarId = this.id
    console.log(this.scholarId, this.id)
    this.getRelationship();
    this.initChart();
  },
 
  methods: {
    getRelationship() {
      this.$axios({
        method: "post",
        url: '/get_relationships_by_scholar_id',
        data: qs.stringify({
          id: this.scholarId
        })
      })
      .then(
        res => {
          console.log(res.data)
          for (let r in res.data) {
            this.rdata.push({
              name: r.target,
              category: Math.floor(Math.random() * 9)
            });
            this.relation.push({
              source: this.scholarId,
              target: r.target,
            })
          }
        }
      )
      .catch(
        e => console.log(e)
      )
    },
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
                case 0:
                  return 30;
                case 1:
                  return 15;
                case 2:
                  return 20;
                case 3:
                  return 25;
                case 4:
                  return 30;
                case 5:
                  return 35;
                case 6:
                  return 40;
                case 7:
                  return 10;
                case 8:
                  return 45;
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
                category: 3,
              },
              {
                name: "pyy",
                category: 5,
              },
              {
                name: "yxy",
                category: 7,
              },
              {
                name: "zjr",
                category: 8,
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