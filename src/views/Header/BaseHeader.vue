<template>
  <div>
    <v-row justify="center" align="center" class="base-header">
      <v-system-bar
        app
        :color="
          $route.name === 'scholarSearch' || $route.name === 'institutionSearch'
            ? 'rgba(0,0,0,0)'
            : '#232f3d'
        "
        dark
        height="70"
      >
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
          <v-menu offset-y class=action-menu>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                depressed
                class="user-button"
                v-bind="attrs"
                v-on="on"
                height="42"
                width="42"
                text
              >
                <span class="user-name-icon" v-if="user_img"
                  ><img :src="user_img"
                /></span>
                <span class="user-name-icon" v-else-if="hasLogin">{{
                  user_name.charAt(0)
                }}</span>
                <span class="user-name-icon" v-else>游</span>
              </v-btn>
            </template>
            <v-list class="action-list"  dense>
              <v-list-item
                key="1"
                v-if="scholar_id != null"
                @click="ToScholarPage()"
              >
                <v-list-item-title>学者主页 </v-list-item-title>
              </v-list-item>
              <v-list-item
                key="2"
                v-else-if="hasLogin"
                @click="ToCertificate()"
              >
                <v-list-item-title>认证学者 </v-list-item-title>
              </v-list-item>
              <v-list-item key="3" v-else @click="Login()">
                <v-list-item-title>登录 </v-list-item-title>
              </v-list-item>
              <v-list-item key="4" v-if="user_id" @click="Logout()">
                <v-list-item-title>退出登录 </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-avatar>
      </v-system-bar>
    </v-row>
    <router-view />
  </div>
</template>

<script>
import qs from "qs";
import { ref } from "vue";
export default {
  name: "baseHeader",
  data() {
    return {
      logo: require("@/assets/logo1.png"),
      gusto: require("@/assets/gusto2.png"),
      user_img: "",
      user_name: "",
      user_id: ref(),
      hasLogin: ref(false),
      user_email: "",
      scholar_id: ref(),
    };
  },
  methods: {
    toScholars() {
      if (this.$route.name !== "scholarSearch") {
        this.$router.push({ name: "scholarSearch" });
      }
    },
    ToScholarPage() {
      this.$router.push({ name: "login" });
    },
    Login() {
      this.$router.push({ name: "login" });
    },
    Logout() {
      window.localStorage.setItem("user_email", "");
      window.localStorage.setItem("user_name", "");
      window.localStorage.setItem("user_headshot", "");
      window.localStorage.setItem("user_id", "");
      window.localStorage.setItem("scholar_id", "");
      this.hasLogin = false;
      this.user_id = null;
      this.user_email = null;
      this.user_img = null;
      this.user_name = null;
      this.scholar_id = null;
      window.location.reload();
    },
    ToCertificate() {
      this.$router.push({ name: "scholarold" });
    },
    toInstitution() {
      if (this.$route.name !== "institutionSearch") {
        this.$router.push({ name: "institutionSearch" });
      }
    },
    toStatistics() {
      if (
        this.$route.name !== "statisticsRank" &&
        this.$route.name !== "statisticsIllustration"
      )
        this.$router.push({ name: "statisticsRank" });
    },
    ToHome() {
      if (this.$route.name !== "home") this.$router.push({ path: "/home" });
    },
    updateUser() {
      this.user_img = window.localStorage.getItem("user_headshot");
      if (this.user_img && this.user_img !== "null") {
        this.user_img = "http://120.46.201.113:6001/api" + this.user_img;
      } else {
        this.user_img = null;
      }
      this.user_name = window.localStorage.getItem("user_name");
      this.user_id = window.localStorage.getItem("user_id");
      this.user_email = window.localStorage.getItem("user_email");
      if (!this.user_id) return;
      this.hasLogin = true;
      this.$axios({
        method: "post",
        url: "/get_scholar_by_userid",
        data: qs.stringify({
          userid: this.user_id,
        }),
      })
        .then((res) => {
          if (
            res.data.status === "您尚未认证为学者" ||
            res.data.status === "用户不存在"
          ) {
            window.localStorage.setItem("scholar_id", "");
            this.scholar_id = null;
          } else {
            window.localStorage.setItem("scholar_id", res.data.id);
            this.scholar_id = res.data.id;
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err.errno);
        });
    },
    toUser() {},
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.updateUser();
    });
  },
};
</script>

<style scoped lang="scss">
.border-white {
  border: 3px solid white;
  margin-right: 20px;
}
.user-name-icon {
  font-family: "Times New Roman", Times, serif;
  font-size: 16px;
  img {
    height: 45px;
    width: 45px;
  }
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