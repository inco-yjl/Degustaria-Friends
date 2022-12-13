<template>
  <div>
    <v-row justify="center" align="center" class="base-header" >
      <v-system-bar app :color="$route.name==='scholarSearch'||$route.name==='institutionSearch'?'rgba(0,0,0,0)':'#232f3d'" dark height="70">
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
        <div class="to-scholars" @click="toScholars()">学者</div>
        <div class="index-span"></div>
        <div class="to-institution" @click="toInstitution()">机构</div>
        <div class="index-span"></div>
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
            <span class="user-name-icon" v-if="user_id">{{user_name.charAt(0)}}</span>
            <span class="user-name-icon" v-else>游</span>
          </v-btn>
        </v-avatar>
      </v-system-bar>
    </v-row>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "baseHeader",
  data() {
    return {
      logo: require("@/assets/logo1.png"),
      gusto: require("@/assets/gusto2.png"),
      First_name: "",
      user_img: "",
      user_name: "",
      user_id: "",
      user_email: ""
    };
  },
  methods: {
    toScholars() {
      if (this.$route.name !== 'scholarSearch') {
        this.$router.push({name: 'scholarSearch'});
      }
    },
    toInstitution() {
      if (this.$route.name !== 'institutionSearch') {
        this.$router.push({name: 'institutionSearch'});
      }
    },
    toStatistics() {
      if (this.$route.name !== 'statisticsRank' && this.$route.name !== 'statisticsIllustration')
      this.$router.push({name: 'statisticsRank'});
    },
    ToHome() {
      if (this.$route.name !== 'home')
      this.$router.push({path: '/home'});
    },
    toUser() {},
  },
  mounted() {
    this.user_img = window.localStorage.getItem('user_headshot');
    this.user_name = window.localStorage.getItem('user_name')
    this.user_id = window.localStorage.getItem('user_id')
    this.user_email = window.localStorage.getItem('user_email');
    console.log(this.user_name);
  }
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
.to-scholars {
  cursor: pointer;
}
.to-institution {
  cursor: pointer;
}
.index-span {
  width: vw(80);
}
.to-statistics {
  cursor: pointer;
}
</style>