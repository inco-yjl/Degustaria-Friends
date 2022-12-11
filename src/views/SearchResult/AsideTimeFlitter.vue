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
            background-color="#ffffff"
            dense
            light
            flat
            solo
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

            label="结束时间"
            background-color="#ffffff"
            dense
            light
            flat
            solo
        >
        </v-select>
      </div>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <div class="button">
        <v-btn>
          近一年
        </v-btn>
      </div>
    </v-col>
    <v-col>
      <div class="button">
        <v-btn>
          近五年
        </v-btn>
      </div>
    </v-col>
    <v-col>
      <div class="button">
        <v-btn>
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
      startTime:2022,
      endTime:2022,
      endTimes: [
        2022,2021,2020,2019
      ],
      startTimes: [
        2022,2021,2020,2019
      ],
    }
  },
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
</style>