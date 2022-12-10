<template>
  <div>
    <v-row justify="center" align="center" class="base-header" >
      <v-system-bar app color="primary" dark height="70">
        <div class="d-flex align-center to-home-button" @click="ToHome">
          <v-img
            alt="Gusto Logo"
            class="shrink mr-2"
            contain
            :src="logo"
            transition="scale-transition"
            width="60"
            height="60"
          />

          <v-img
            alt="Vuetify Name"
            class="shrink mt-1 hidden-sm-and-down"
            contain
            min-width="100"
            :src="gusto"
            width="200"
          />
        </div>
        <v-spacer /><v-spacer />
        <div class="to-statistics" @click="toStatistics()">统计</div>
        <v-spacer />
        <v-avatar size="45" :class="`rounded${45}`" class="border-white">
          <v-btn
            @click="toUser()"
            target="_blank"
            depressed
            class="user-button"
            height="42"
            width="42"
            text
          >
            <span class="user-name-icon">Yu</span>
          </v-btn>
        </v-avatar>
      </v-system-bar>
    </v-row>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "baseHeader",
  data() {
    return {
      logo: require("@/assets/logo1.png"),
      gusto: require("@/assets/gusto2.png"),
    };
  },
  methods: {
    toStatistics() {
      if (this.$route.name !== 'statisticsRank' && this.$route.name !== 'statisticsIllustration')
      this.$router.push({name: 'statisticsRank'});
    },
    ToHome() {
      if (this.$route.name !== 'home')
      this.$router.push({path: '/home'});
    },
    toUser() {},
    /*
    changeLanguage() {
      if (this.$vuetify.lang.current === "en") {
        this.$vuetify.lang.current = "zhHans";
      } else {
        this.$vuetify.lang.current = "en";
      }
      console.log(this.$vuetify.lang.current);
    },*/
  },
};
</script>

<style scoped lang="scss">
.border-white {
  border: 3px solid white;
  margin-right: 10px;
}
.user-name-icon{
  font-family:'Times New Roman', Times, serif;
  font-size: 16px;
}
.to-home-button {
  cursor: pointer;
}
.to-statistics {
  cursor: pointer;
}
</style>