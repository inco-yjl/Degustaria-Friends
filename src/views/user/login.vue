<template>
  <div id="register" class="register">
    <vue-particles
      class="login-bg"
      color="#39AFFD"
      :particleOpacity="0.7"
      :particlesNumber="100"
      shapeType="circle"
      :particleSize="4"
      linesColor="#8DD1FE"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <v-card color="rgba(35,47,61,0.4)" dark flat class="login_card">
      <div style="display: flex">
        <img src="../../assets/logo1.png" class="login_logo_1" />
        <img src="../../assets/gusto2.png" class="login_logo_3" />
      </div>
      <div>
        <div class="login_tips">用户名：</div>
        <v-text-field
          label="User"
          class="input_login_1"
          clearable="true"
          clear-icon="mdi-close-circle"
          v-model="input_user"
        ></v-text-field>
        <div class="login_tips2">密码：</div>
        <v-text-field
          v-model="input_password"
          class="input_login_1"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          label="Password"
          @click:append="show1 = !show1"
        ></v-text-field>
      </div>
      <div style="display: flex">
        <div class="login_btn_1">
          <v-card-actions @click="login_now">
            <v-btn color="rgba(0,0,0,0.6)">Login Now</v-btn>
          </v-card-actions>
        </div>
        <div class="login_btn_2" @click="go_register">
          <v-card-actions>
            <v-btn light color="rgba(255,255,255,0.6)">Go register</v-btn>
          </v-card-actions>
        </div>
      </div>
    </v-card>
    <div class="alerts">
      <transition name="fade">
        <v-alert
          dense
          class="alert"
          dismissible
          border="left"
          elevation="2"
          v-if="snackbar2"
          type="error"
          >{{ text2 }}</v-alert
        >
        <v-alert
          dense
          class="alert"
          dismissible
          border="left"
          elevation="2"
          v-if="snackbar"
          type="success"
          >{{ text }}</v-alert
        >
      </transition>
    </div>
  </div>
</template>
  
  <script>
import qs from "qs";
export default {
  name: "Register",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      input_user: "",
      input_password: "",
      show1: false,
      password: "Password",
      snackbar: false,
      snackbar2: false,
      text: "登录成功！",
      text2: "用户名和密码不匹配！",
      color: "",
      mode: "",
      timeout: 3000,
      x: null,
      y: "top",
    };
  },
  methods: {
    login_now() {
      this.$axios({
        method: "post",
        url: "/login",
        data: qs.stringify({
          username: this.input_user,
          password: this.input_password,
        }),
      })
      .then((res) => {
        console.log(res.data);
        window.localStorage.setItem("user_email", res.data.email);
        window.localStorage.setItem("user_name", res.data.username);
        window.localStorage.setItem("user_headshot", res.data.headshot);
        window.localStorage.setItem("user_id", res.data.id);
        if(res.data.errno == 0) {
          if (res.data.errno == 0) {
            this.snackbar = true;
            setTimeout(() => {
              this.snackbar = false;
              this.$router.push("/");
            }, 1000);
          }
          else {
            console.log("login:", res.data);
            this.snackbar2 = true;
            setTimeout(() => {
              this.snackbar2 = false;
            }, 1000);
          }
        }
      })
      .catch((err) => {
        console.log(err.errno);
      });
    },
    go_register() {
      this.$router.push({
        name: "register",
      });
    },
  },
};
</script>
  
  <style scoped lang="scss">
* {
  //登录页禁止选中
  -webkit-touch-callout: none; /*系统默认菜单被禁用*/
  -webkit-user-select: none; /*webkit浏览器*/
  -khtml-user-select: none; /*早期浏览器*/
  -moz-user-select: none; /*火狐*/
  -ms-user-select: none; /*IE10*/
  user-select: none;
}
#register {
  width: 100%;
  overflow: hidden;
  background-color: #9aafc2;
  background-image: url(../../assets/1.jpg);
  height: 100%;
  background-size: 100%;
  display: flex;
}
.login-bg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.login_card {
  width: vw(600);
  height: 100%;
  margin: 0 auto;
  text-align: center;
}
.headline_login {
  margin-top: vh(80);
  margin-left: vw(40);
  font-family: YouSheBiaoTiHei;
  font-weight: vw(100);
  font-size: 3.75rem;
  letter-spacing: -0.03125rem;
}
.login_tips {
  font-family: Source Han Sans CN Normal;
  font-weight: vw(30);
  margin-top: vh(70);
  margin-left: vw(40);
  font-size: 1.5rem;
  text-align: left;
  letter-spacing: 0.015625rem;
}
.login_tips2 {
  font-family: Source Han Sans CN Normal;
  font-weight: vw(30);
  margin-top: vh(50);
  margin-left: vw(40);
  font-size: 1.5rem;
  text-align: left;
  letter-spacing: 0.015625rem;
}
.input_login_1 {
  margin-left: vw(40);
  margin-top: vh(20);
  margin-right: vw(40);
}
.login_btn_1 {
  font-family: "Times New Roman", Times, serif;
  font-weight: bolder;
  margin-left: vw(140);
  margin-top: vh(50);
}
.login_btn_2 {
  font-family: "Times New Roman", Times, serif;
  font-weight: bolder;
  margin-left: vw(10);
  margin-top: vh(50);
}
.login_logo_1 {
  width: vw(200);
  margin-top: vh(80);
  margin-left: vw(70);
}
.login_logo_3 {
  width: vw(250);
  height: vw(55);
  margin-top: vh(180);
  margin-left: vw(10);
}
.login_logo_2 {
  margin-left: vw(200);
  margin-top: vh(50);
}
.alerts {
  position: absolute;
  margin-top: vh(40);
  margin-left: vw(710);
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