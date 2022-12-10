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
            <div class="login_tips">用户名：</div>
            <v-text-field label="User" class="input_login_1" 
            clearable="true" clear-icon="mdi-close-circle" v-model="input_user"></v-text-field>
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
            <v-text-field label="E-mail" class="input_login_1" :rules="emailRules"
            clearable="true" clear-icon="mdi-close-circle" 
            append-icon="mdi-email-arrow-right-outline" @click:append="send_email" v-model="input_email"></v-text-field>
            <div class="login_tips2">邮箱验证码：</div>
            <v-text-field label="Verification code" class="input_login_1" 
            clearable="true" clear-icon="mdi-close-circle" v-model="input_email_cf"></v-text-field>       
        </div>
        <div style="display:flex;">
            <div class="login_btn_1" @click="register_ok">
              <v-btn color="#022c52">Register Now</v-btn>
            </div>
            <div class="login_btn_2" @click="go_login">
              <v-btn color="#4e7394">Go LOGIN</v-btn>
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
        input_user: "",
        input_email: "",
        input_email_cf: "",
        input_password: "",
        input_password2: "",
        show1: false,
        show2: false,
        password: 'Password',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => {
                    const pattern = /.+@.+\..+/
                    return pattern.test(v) || 'Invalid e-mail.'
            },
        ],
        snackbar: false,
        text: '注册成功！',
        timeout: 2000,
      };
    },
    mounted() {
    },
    methods: {
      emailMatch(value) {
        if (value !== this.input_password) {
            return "两次输入的密码不相同";
        } else {
            return true;
        }
      },
      register_ok() {
        this.$router.push({
          name: "login",
        })
      },
      go_login() {
        this.$router.push({
          name: "login",
        })
      },
      home() {
          this.$router.push({
            path: "/home/focus",
          });
      },
      send_email() {
        if (valid) {
          this.time = 60;
          this.timer();
          let that = this;
          this.$axios
            .post(
                "user/code/",
                qs.stringify({
                  email: this.user.email,
                })
            )
            .then((res) => {
              if (res.data.errno === 2) {
                console.log("send success");
                this.$message.success('验证码发送成功')
              }
              else {
                console.log("send failure");
                console.log(res.data)
                this.$message.error(res.data.message)
              }
              // console.log(response.data.dir_filelist);
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          console.log('输入格式不正确');
          return false;
        }
      },
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
    margin-top: vh(30);
    margin-left: vw(40);
    font-size: 1.2rem;
    text-align: left;
    letter-spacing: 0.015625rem;
  }
  .login_tips2{
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
    margin-left: vw(30);
    margin-top: vh(10);
  }
  .login_btn_2 {
    margin-left: vw(20);
    margin-top: vh(10);
  }
  .login_logo_1 {
    width: vw(140);
    height: vw(140);
    margin-top: vh(30);
    margin-left: vw(100);
  }
  .login_logo_3 {
    width: vw(250);
    height: vw(55);
    margin-top: vh(130);
    margin-left: vw(10);
  }
  .login_logo_2 {
    margin-left: vw(200);
    margin-top: vh(50);
  }
  </style>