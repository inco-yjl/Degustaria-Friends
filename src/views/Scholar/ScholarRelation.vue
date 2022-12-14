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
    console.log("id"+ this.id)
    this.getRelationship();
    window.onresize = () => {
      return (() => {
        this.initChart();
      })();
    };
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
          this.rdata = [];
          this.relation = [];
          console.log(res.data);
          for(var i=0;i<res.data.length;i++){
            var r=res.data[i];
            this.rdata.push({
              name: r.target,
              category: r.times,
              value: r.times
            });
            this.relation.push({
              source: "",
              target: r.target,
            })
          }
          this.rdata.push({
              name: "",
              category: res.data.length,
              value: 'Scholar'
            });
            console.log(this.rdata)
            this.initChart();
        }
      )
      .catch(
        e => console.log(e)
      )
    },
    initChart() {
      if (document.getElementById('chart') === null) {
        console.log("null");
        return;
      }
      echarts.dispose(document.getElementById('chart'));
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
              return params.data.category+14
            },
            roam: true,
            label: {
              show: true, 
              position: "right"
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
                return colorList[Math.floor(Math.random() * 9)]
              }
            },
            data:  this.rdata,
            links: this.relation,
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