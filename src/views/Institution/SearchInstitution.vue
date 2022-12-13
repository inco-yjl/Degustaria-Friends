<template>
  <div class="search-institution-body">
    <div class="search-back">
      <div class="alerts">
        <transition name="fade">
          <v-alert
            class="alert"
            dismissible
            border="left"
            elevation="2"
            v-if="inputalert"
            type="error"
            >请输入搜索内容</v-alert
          >
        </transition>
      </div>
      <div class="search-box">
        <div class="search-title">搜索机构</div>
        <div class="dividers"><img src="@/assets/divider2.png" /></div>
        <v-text-field
          dense
          light
          solo
          height="40"
          v-model="singleInput"
          append-icon="mdi-magnify"
          @click:append="searchInstitution()"
          background-color="rgba(255,255,255,0.85)"
          class="search-input"
          clearable
        ></v-text-field>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { ref } from "vue";
export default {
  data() {
    return {
      singleInput: ref(),
      inputalert: false
    };
  },
  methods: {
    searchInstitution() {
      if (!this.singleInput || !this.singleInput.length > 0) {
        this.inputalert = true;
        console.log(1);
        setTimeout(() => {
          this.inputalert = false;
        }, 1000);
        return;
      }
      this.$router.push({
        name: "institutionResult",
        query: {
          searchWord: this.singleInput,
        },
      });
    },
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
.search-institution-body {
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
.alerts {
  position: absolute;
  margin-top: vh(40);
  margin-left: vw(670);
}
.alert {
  position: relative;
  margin-top: vh(20);
  width: vw(500);
}
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.1s;
}
.fade-leave-to {
  opacity: 0;
}
.fade-leave-active {
  transition: opacity 0.1s;
}
</style>