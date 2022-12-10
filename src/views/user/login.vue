<template>
    <div id="register" class="register">
      <v-card
        color="rgba(35,47,61,0.9)"
        dark
        class="login_card"
      >
        <div style="display: flex;">
            <img src="../../assets/logo1.png" class="login_logo_1"/>
            <img src="../../assets/gusto2.png" class="login_logo_3"/>
        </div>
        <div>
            <div class="login_tips">邮箱：</div>
            <v-text-field label="E-mail" class="input_login_1" clearable="true" clear-icon="mdi-close-circle" v-model="input_email"></v-text-field>
            <div class="login_tips">密码：</div>
            <v-text-field
                v-model="input_password"
                class="input_login_1"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                label="Password"
                @click:append="show1 = !show1"
            ></v-text-field>
        </div>
        <div style="display:flex;">
            <div class="login_btn_1">
                <v-card-actions @click="login_now">
                    <v-btn color="#022c52">Login Now</v-btn>
                </v-card-actions>
            </div>
            <div class="login_btn_2" @click="go_register">
                <v-card-actions>
                    <v-btn color="#4e7394">Go register</v-btn>
                </v-card-actions>
            </div>
        </div>
      </v-card>
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
        input_email: "",
        input_password: "",
        show1: false,
        password: 'Password'
      };
    },
    methods: {
      home() {
        this.$router.push({
          path: "/home/focus",
        });
      },
      login_now() {
        this.$router.push({
          name: "home_focus",
        })
      },
      go_register() {
        this.$router.push({
          name: "register",
        })
      },
      login() {
        this.$refs["user"].validate((valid) => {
          if (valid) {
            console.log(this.user);
            this.$axios
              .post(
                "/user/login",
                qs.stringify({
                  email: this.user.email,
                  password: this.user.password,
                })
              )
              .then((res) => {
                if (res.data.errno === 2) {
                  console.log("获取到登录信息", res);
                  this.$message({
                    message: "登录成功",
                    type: "success",
                  });
                  console.log(res.data);
                  this.$store.dispatch("saveUserInfo", {
                    user: "已登录",//存储状态
                  });
                  console.log(res.data.data + "已登录");
                  window.open("/home", "_self");
                } else {
                  this.$message.error(res.data.msg);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            console.log("输入格式不正确");
            return false;
          }
        });
      },
    },
    mounted() {
    },
  };
  </script>
  
  <style scoped lang="scss">
  #register {
    width: 100%;
    overflow: hidden;
    background-color: #9aafc2;
    background-image:url(../../assets/1.jpg);
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
  .login_tips{
    font-family: PingFang SC;
    font-weight: vw(30);
    margin-top: vh(70);
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
    margin-left: vw(30);
    margin-top: vh(50);
  }
  .login_btn_2 {
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
    margin-top: vh(240);
    margin-left: vw(10);
  }
  .login_logo_2 {
    margin-left: vw(200);
    margin-top: vh(50);
  }
  </style>