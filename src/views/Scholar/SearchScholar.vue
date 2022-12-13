<template>
  <div class="search-scholar-body">
    <div class="search-back">
      <div class="search-box">
        <div class="search-title">搜索学者</div>
        <div class="dividers"><img src="@/assets/divider2.png" /></div>
        <v-text-field
          dense
          light
          solo
          height="40"
          v-model="singleInput"
          append-icon="mdi-magnify"
          @click:append="searchScholar()"
          background-color="rgba(255,255,255,0.85)"
          class="search-input"
          clearable
        ></v-text-field>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      singleInput: ref(),
    };
  },
  methods: {
    searchScholar() {},
  },
};
</script>

<style scoped lang="scss">
* {
  //此页禁止选中
  -webkit-touch-callout: none; /*系统默认菜单被禁用*/
  -webkit-user-select: none; /*webkit浏览器*/
  -khtml-user-select: none; /*早期浏览器*/
  -moz-user-select: none; /*火狐*/
  -ms-user-select: none; /*IE10*/
  user-select: none;
}
.search-scholar-body {
  position: absolute;
  top: 0;
  overflow: hidden;
  width: vw(1920);
  height: 100%;
  padding-bottom: 0;
}
.search-back {
  background-color: #9aafc2;
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: url(@/assets/1.jpg);
  background-size: cover;
}

.search-box {
  position: relative;
  z-index: 1000;
  margin-top: vh(400);
  margin-left: vw(520);
  height: vh(800);
}
.search-title {
  width: vw(800);
  text-align: center;
  font-family: "华文中宋";
  color: white;
  font-size: vw(48);
  line-height: vh(64);
}
.dividers {
  margin-left: vw(246);
  width: vw(400);
}
img {
  width: vw(300);
}
.search-input {
  width: vw(800);
}
</style>