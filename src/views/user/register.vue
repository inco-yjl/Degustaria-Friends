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
    <v-card color="rgba(35,47,61,0.4)" dark class="login_card">
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
        <div class="login_tips2">确认密码：</div>
        <v-text-field
          v-model="input_password2"
          :rules="[emailMatch]"
          class="input_login_1"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show2 ? 'text' : 'password'"
          label="Password again"
          @click:append="show2 = !show2"
        ></v-text-field>
        <div class="login_tips2">邮箱：</div>
        <v-text-field
          label="E-mail"
          class="input_login_1"
          :rules="emailRules"
          clearable="true"
          clear-icon="mdi-close-circle"
          append-icon="mdi-email-arrow-right-outline"
          @click:append="send_email"
          v-model="input_email"
        ></v-text-field>
        <div class="login_tips2">邮箱验证码：</div>
        <v-text-field
          label="Verification code"
          class="input_login_1"
          clearable="true"
          clear-icon="mdi-close-circle"
          v-model="input_email_cf"
        ></v-text-field>
      </div>
      <div style="display: flex">
        <div class="login_btn_1" @click="register_ok">
          <v-btn color="rgba(0,0,0,0.6)">Register</v-btn>
        </div>
        <div class="login_btn_2" @click="go_login">
          <v-btn light color="rgba(255,255,255,0.6)">Go LOGIN</v-btn>
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
          v-if="snackbar"
          type="info"
          >{{ text }}</v-alert
        >
        <v-alert
          dense
          class="alert"
          dismissible
          border="left"
          elevation="2"
          v-if="snackbar2"
          type="success"
          >{{ text2 }}</v-alert
        >
        <v-alert
          dense
          class="alert"
          dismissible
          border="left"
          elevation="2"
          v-if="snackbar3"
          type="error"
          >{{ text3 }}</v-alert
        >
        <v-alert
          dense
          class="alert"
          dismissible
          border="left"
          elevation="2"
          v-if="snackbar4"
          type="error"
          >{{ text4 }}</v-alert
        >
        <v-alert
          dense
          class="alert"
          dismissible
          border="left"
          elevation="2"
          v-if="snackbar5"
          type="error"
          >{{ text5 }}</v-alert
        >
        <v-alert
          dense
          class="alert"
          dismissible
          border="left"
          elevation="2"
          v-if="snackbar6"
          type="error"
          >{{ text6 }}</v-alert
        >
        <v-alert
          dense
          class="alert"
          dismissible
          border="left"
          elevation="2"
          v-if="snackbar7"
          type="error"
          >{{ text7 }}</v-alert
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
        email: "",
        password: "",
      },
      input_user: "",
      input_email: "",
      input_email_cf: "",
      input_password: "",
      input_password2: "",
      show1: false,
      show2: false,
      password: "Password",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => {
          const pattern = /.+@.+\..+/;
          return pattern.test(v) || "Invalid e-mail.";
        },
      ],
      color: "",
      mode: "",
      snackbar: false,
      snackbar2: false,
      snackbar3: false,
      snackbar4: false,
      snackbar5: false,
      snackbar6: false,
      snackbar7: false,
      text: "邮件已发送！",
      text2: "注册成功！",
      text3: "两次输入的密码不一致！",
      text4: "后端瓦特了...",
      text5: "邮箱已注册！",
      text6: "名称已存在！",
      text7: "验证码错误！",
      timeout: 3000,
      x: null,
      y: "top",
    };
  },
  mounted() {},
  methods: {
    emailMatch(value) {
      if (value !== this.input_password) {
        return "两次输入的密码不相同";
      } else {
        return true;
      }
    },
    register_ok() {
      if (this.input_password != this.input_password2) {
        this.snackbar3 = true;
        setTimeout(() => {
          this.snackbar3 = false;
        }, 1000);
        return;
      }
      this.$axios({
        method: "post",
        url: "/register",
        data: qs.stringify({
          email: this.input_email,
          code: this.input_email_cf,
          nickname: this.input_user,
          password: this.input_password,
        }),
      })
        .then((res) => {
          if (res.data.errno == 1) {
            this.snackbar5 = true;
            setTimeout(() => {
              this.snackbar5 = false;
            }, 1000);
            return;
          } else if (res.data.errno == 2) {
            this.snackbar6 = true;
            setTimeout(() => {
              this.snackbar6 = false;
            }, 1000);
            return;
          } else if (res.data.errno == 3) {
            this.snackbar7 = true;
            setTimeout(() => {
              this.snackbar7 = false;
            }, 1000);
            return;
          } else if (res.data.errno == 4) {
            this.snackbar7 = true;
            setTimeout(() => {
              this.snackbar7 = false;
            }, 1000);
            return;
          } else if (res.data.errno == 5) {
            this.snackbar7 = true;
            setTimeout(() => {
              this.snackbar7 = false;
            }, 1000);
            return;
          } else if (res.data.errno == 6) {
            this.snackbar2 = true;
            setTimeout(() => {
              this.snackbar2 = false;
              this.$router.push("/login");
            }, 1000);
          } else {
            this.snackbar4 = true;
            setTimeout(() => {
              this.snackbar4 = false;
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err.errno);
        });
    },
    go_login() {
      this.$router.push({
        name: "login",
      });
    },
    home() {
      this.$router.push({
        path: "/home/focus",
      });
    },
    send_email() {
      this.$axios({
        method: "post",
        url: "/code",
        data: qs.stringify({
          email: this.input_email,
        }),
      })
        .then((res) => {
          if (res.data.errno == 3) {
            this.snackbar5 = true;
            setTimeout(() => {
              this.snackba5 = false;
            }, 1000);
            return;
          } else {
            console.log("Send_message", res.data);
            this.snackbar = true;
            setTimeout(() => {
              this.snackbar = false;
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
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
.login-bg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
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
  font-family: PingFang SC;
  margin-top: vh(60);
  margin-left: vw(40);
  font-size: 1.2rem;
  text-align: left;
  letter-spacing: 0.015625rem;
}
.login_tips2 {
  font-family: PingFang SC;
  margin-top: vh(5);
  margin-left: vw(40);
  font-size: 1.2rem;
  text-align: left;
  letter-spacing: 0.015625rem;
}
.input_login_1 {
  margin-left: vw(40);
  margin-top: vh(10);
  margin-right: vw(40);
}
.login_btn_1 {
  font-family: "Times New Roman", Times, serif;
  font-weight: bolder;
  margin-left: vw(160);
  margin-top: vh(10);
}
.login_btn_2 {
  font-family: "Times New Roman", Times, serif;
  font-weight: bolder;
  margin-left: vw(20);
  margin-top: vh(10);
}
.login_logo_1 {
  width: vw(140);
  height: vw(140);
  margin-top: vh(60);
  margin-left: vw(100);
}
.login_logo_3 {
  width: vw(250);
  height: vw(55);
  margin-top: vh(160);
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