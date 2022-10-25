<template>
  <div>
    <v-row justify="center" align="center">
      <v-app-bar
        color="primary"
        dark
        fixed
        min-height="60"
        class="statistics-header"
      >
        <div class="statistics-routers">
          <div
            :class="
              this.$route.name === 'statisticsRank'
                ? 'active-page-router'
                : 'unactive-page-router'
            "
            @click="ToRank"
          >
            <div class="router-content">排名</div>
          </div>
          <div
            :class="
              this.$route.name === 'statisticsIllustration'
                ? 'active-page-router'
                : 'unactive-page-router'
            "
            @click="ToIllustration"
          >
            <div class="router-content">统计</div>
          </div>
        </div>
      </v-app-bar>
    </v-row>
    <div class="statistic-content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    ToRank() {
      if (this.$route.name !== "statisticsRank") {
        this.$router.push({ name: "statisticsRank" });
      }
    },
    ToIllustration() {
      if (this.$route.name !== "statisticsIllustration") {
        this.$router.push({ name: "statisticsIllustration" });
      }
    },
  },
};
</script>

<style scoped lang="scss">
//  app-bar高度不变，所以对于导航卡片的高度/行高用固定长度表示
.statistics-header {
  top: 68px;
  overflow-y: hidden;
}
.statistics-routers {
  padding-top: 70px;
  margin-left: vw(200);
  display: flex;
  gap: vw(40);
}
.page-router {
  width: vw(200);
  height: 128px;
  padding: 2px 2px 2px 2px;
  border-top-left-radius: vw(40);
  border-top-right-radius: vw(40);
  border: 1px solid #232f3d;
  background-color: #f2f2f2;
  box-shadow: inset 0px 5px 10px 0px rgba(0, 0, 0, 0.35);
}
.unactive-page-router {
  width: vw(200);
  height: 128px;
  border-top-left-radius: vw(40);
  border-top-right-radius: vw(40);
  cursor: pointer;
  transition-duration: 0.2s;
  .router-content {
    color: #ffffff;
  }
}
.router-content {
  font-family: "思源黑体", sans-serif;
  font-weight: bold;
  color: #333333;
  text-align: center;
  line-height: 70px;
  font-size: vw(24);
  width: vw(200);
  height: 128px;
  align-items: center;
  justify-items: center;
  vertical-align: center;
}
.active-page-router {
  width: vw(200);
  height: 128px;
  border-top-left-radius: vw(40);
  border-top-right-radius: vw(40);
  background-color: rgba(255, 255, 255, 0.99);
  cursor: pointer;
  transition-duration: 0.2s;
}
.statistic-content {
  width: 100%;
  padding-top: 150px;
}
</style>