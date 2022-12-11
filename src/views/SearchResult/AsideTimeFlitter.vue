<template>
<div class="border">
<v-container>
  <v-row align="center">
      <v-subheader style="color: white">
        时间范围
      </v-subheader>
  </v-row>
  <v-row align="center">
    <v-col>
      <div class="selector">
        <v-select
            v-model="startTime"
            :items="startTimes"
            persistent-hint
            allow-overflow="false"
            label="开始时间"
            autofocus="true"
            background-color="#ffffff"
            dense
            light
            flat
            solo
            @click="update()"
        ></v-select>
      </div>
    </v-col>
    <div style="color: white;width: 10px;align-self: center">
      ~
    </div>
    <v-col >
      <div class="selector">
        <v-select
            v-model="endTime"
            :items="endTimes"
            persistent-hint
            autofocus="true"
            label="结束时间"
            background-color="#ffffff"
            dense
            light
            flat
            solo
            @click="update()"
        >
        </v-select>
      </div>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <div class="button">
        <v-btn @click="recent_year(1)">
          近一年
        </v-btn>
      </div>
    </v-col>
    <v-col>
      <div class="button">
        <v-btn @click="recent_year(5)">
          近五年
        </v-btn>
      </div>
    </v-col>
    <v-col>
      <div class="button">
        <v-btn @click="recent_year(10)">
          近十年
        </v-btn>
      </div>
    </v-col>
  </v-row>
</v-container>
</div>
</template>

<script>
export default {
  name: "AsideTimeFlitter",
  data () {
    return {
      startTime:1970,
      endTime:2022,
      endTimes: [
      ],
      startTimes: [
      ],
    }
  },
  methods:{
    update(){
      let param=this.$store.getters.get_search_param

      param.filter_time=[]
      param.filter_time.push(this.startTime)
      param.filter_time.push(this.endTime)
      this.$store.commit("mod_search_param",param)
      console.log("in time aside",this.$store.getters.get_search_param)
      this.$emit('update')
    },
    recent_year(i){
      let date=new Date()
      this.endTime=date.getFullYear()
      this.startTime=this.endTime-i
      this.update()
    }
  },
  created() {
    for(let i=2022;i>=1970;i--){
      this.startTimes.push(i)
      this.endTimes.push(i)
    }
  }
}
</script>

<style scoped lang="scss">
.border{
  border-color: #232f3d;
  border:vw(1);
  border-radius: vw(10);
  border-style: solid;
  background: #232f3d;
  padding: 3%;
}
.selector{
  width: vw(140);
  height: vh(60);
}
.button{
  width: vw(60);
  height: vh(60);
}
.facus{
  color: red;
}
</style>