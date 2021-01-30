<template>
  <div class="container">
    <my-header></my-header>
    <div class="login_card">
      <div class="w">
        <div class="login_text clearfix">
          <a @click="tologin">登录</a>
          <a>注册</a>
        </div>
        <div class="box_card">
          <!-- 分割线下边 -->
          <div class="login_set">
            <div class="login_message left">
              <div class="message">
                <div class="news">
                  <el-form
                    :model="RegisterForm"
                    :rules="RegisterRules"
                    ref="RegisterForm"
                  >
                    <el-form-item prop="email" class="one_">
                      <img src="../../assets/image/emails1.png" alt />
                      <el-input
                        type="text"
                        v-model="RegisterForm.email"
                        @blur="blurEmail"
                        placeholder="请输入邮箱地址"
                      ></el-input>
                    </el-form-item>
                    <el-form-item prop="password" class="one">
                      <img src="../../assets/order/lock (2).png" alt />
                      <el-input
                        type="password"
                        v-model="RegisterForm.password"
                        placeholder="请输入密码"
                        autocomplete="off"
                        maxlength="16"
                        minlength="6"
                      ></el-input>
                    </el-form-item>
                    <el-form-item prop="repassword" class="one">
                      <img src="../../assets/order/lock (2).png" alt />
                      <el-input
                        type="password"
                        v-model="RegisterForm.repassword"
                        placeholder="确认密码"
                        autocomplete="off"
                        maxlength="16"
                        minlength="6"
                      ></el-input>
                    </el-form-item>
                    <el-form-item class="two" prop="smscode">
                      <img src="../../assets/image/codes.png" alt />
                      <el-input
                        type="text"
                        style="width: 200px"
                        v-model="RegisterForm.captcha"
                        placeholder="邮箱验证码"
                      ></el-input>
                      <el-button
                        type="primary"
                        @click="sendCode"
                        :disabled="isDisabled"
                        class="sendcode"
                        >{{ counted }}</el-button
                      >
                    </el-form-item>
                    <el-form-item>
                      <el-button
                        @click="submitForm('RegisterForm')"
                        class="bbt"
                        style="width: 460px; height: 48px; margin-left: 20px"
                        >注册</el-button
                      >
                    </el-form-item>
                  </el-form>
                </div>
                <div class="register_txt">
                  <p>
                    已有账号？
                    <span @click="tologin">快去登录</span>
                  </p>
                </div>
                <div class="other_login">
                  <div class="solid">
                    <p>使用第三方账号登录</p>
                  </div>
                </div>
                <!--  微信图标 -->
                <div class="wechat">
                  <img
                    src="../../assets/image/icon_wechat.png"
                    @click="getLogin"
                    alt
                  />
                </div>
              </div>
            </div>
            <!-- 右侧会员制度 -->
            <div class="vip_seting left">
              <div class="vip_title">
                <img src="../../assets/image/vip.png" alt />
              </div>
              <div
                class="ordinary_member"
                v-for="(item, index) in VIPlist"
                :key="index"
              >
                <div class="imgSE">
                  <div class="imgVIP">
                    <img :src="item.image" alt />
                  </div>
                  <div class="itemName">
                    {{ item.name }}：{{ item.describe }}
                  </div>
                </div>
              </div>
              <div class="vip_time">
                <span>*</span>
                会员有效期为30天
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 尾部 -->
    <my-footer></my-footer>
  </div>
</template>
      <script>
export default {
  // 登记注册页面
  name: "register",
  data() {
    // 邮箱验证
    var validateEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱格式"));
        }
      }, 100);
    };
    // 验证密码
    var validatePass = (rule, value, callback) => {
      // console.log(this.RegisterForm.password);
      // console.log(value, "vlaue", rule, "rule", "密码");
      var passwordreg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
      if (value === '') {
        callback(new Error("请输入密码"));
      } else if (!passwordreg.test(value)) {
        callback(new Error('请输入6-16位的密码，需包含数字、字母'))
      } else {
        if (this.RegisterForm.repassword !== '') {
          this.$refs.RegisterForm.validateField("repassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      console.log(this.RegisterForm.repassword);
      console.log(value, "vlaue", rule, "rule", "新密码");
      if (value === '') {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.RegisterForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    //  <!--验证码是否为空-->
    var checkSmscode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱验证码"));
      } else {
        callback();
      }
    };

    return {
      // 倒计时
      VIPlist: [],
      code_show: true,
      count: "",
      timer: null,
      counted: '发送验证码',
      // buttonText: "发送验证码",
      isDisabled: false, // 是否禁止点击发送验证码按钮
      RegisterForm: {
        email: "",
        password: "",
        repassword: "",
        captcha: "", // 验证码
        thirdid: "" // 第三方id
      },
      RegisterRules: {
        email: [{ validator: validateEmail, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        repassword: [{ validator: validatePass2, trigger: "blur" }],
        smscode: [{ validator: checkSmscode, trigger: "change" }]
      },
      reqParams: {
        appid: 'wx80aae94b645530b0',
        scope: 'snsapi_login',
        redirect_uri: encodeURI(window.location.href),
        state: "123",
        login_type: 'jssdk',
        self_redirect: false,
        myWindow: '',
      }

    };
  },
  created() {
    var code = this.$route.query.code;
    // console.log(code);
    if (code) {
      this.$http
        .get("api/user/codeinfo?code=" + code)
        .then(res => {
          console.log(res.data.data);
          if (res.data.data.thirdid) {
            this.$router.replace({ path: '/WxAuth?thirdid=' + res.data.data.thirdid, replace: true });
          } else {
            local.setUser(res.data.data.userinfo.token);
            console.log(res.data.data.userinfo, "注册");
            this.getUserInfo();
            this.$router.push("/");
          }
        })
        .catch(err => {
          this.$message.error(res.data.msg);
        });
    }
    this.getVIP()
  },
  methods: {
    getLogin() {
      window.location.href = "https://open.weixin.qq.com/connect/qrconnect?appid=" + this.reqParams.appid + "&scope=" + this.reqParams.scope + "&redirect_uri=" + this.reqParams.redirect_uri + "&state=" + this.reqParams.state + "#wechat_redirect", '微信登录', 'width=540,height=540'
    },
    sendCode() {    //获取验证码
      console.log(this.RegisterForm.email);
      if (this.RegisterForm.email != '') {
        this.$http
          .get("api/ems/send", {
            params: {
              email: this.RegisterForm.email,
              smscode: this.RegisterForm.smscode
            }
          })
          .then(res => {
            const TIME_COUNT = 60;
            this.count = TIME_COUNT;
            this.counted = "已发送" + this.count + '秒'
            this.isDisabled = true;
            if (!this.timer) {
              this.code_show = false;
              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.count--;
                  this.counted = "已发送" + this.count + '秒';
                } else {
                  this.code_show = true;
                  this.isDisabled = false;
                  clearInterval(this.timer);
                  this.counted = '发送验证码'
                  this.timer = null;
                }
              }, 1000);
            }
          })
          .catch(err => {
            console.log(err);
            this.$message.error(err.data.msg)
            this.users = [];
          });
      } else {
        this.$message.error('邮箱不能为空')
      }
    },
    async blurEmail() {
      if (this.RegisterForm.email) {
        try {
          const {
            data: { data }
          } = await this.$http.post("api/validate/check_email_available",
            {
              email: this.RegisterForm.email
            })
          console.log(data);

        } catch (err) {
          console.log(err);
          this.$message.error(err.data.msg)
        }
      }

    },
    submitForm(RegisterForm) {    // <!--提交注册-->
      this.$refs[RegisterForm].validate(async valid => {
        if (valid) {
          this.$http
            .post("api/user/register", this.RegisterForm)
            .then(res => {
              this.$message.success(res.data.msg)
              this.$router.push("/login");
            })
            .catch(err => {
              console.log(err);
              this.$message.error(err.data.msg);
            });
        }
      });
    },
    // 去登录
    tologin() {
      this.$router.push("/login");
    },
    async getVIP() {
      try {
        const {
          data: { data }
        } = await this.$http.post("api/user/getUserSystem")
        this.VIPlist = data
      } catch (err) {
        console.log(err);
      }

    },
  }
};
</script>


<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  //    注册区域
  .login_card {
    height: 800px;

    .w {
      background-color: #fff;
      height: 100%;
      margin-top: 20px;
      .login_text {
        width: 100%;
        padding-bottom: 10px;
        padding-left: 60px;
        padding-top: 30px;
        box-sizing: border-box;
        a {
          font-size: 24px;
          color: #416fae;
          padding: 20px 20px 18px;
        }
        a:nth-child(1) {
          color: #ccc;
        }
        a:nth-child(2) {
          border-bottom: 4px solid #416fae;
        }
      }
      .box_card {
        // 登录设置
        border-top: 1px solid #f5f5f5;
        margin-top: 10px;

        .login_set {
          // 左侧
          .login_message {
            width: 710px;
            .log_top {
              height: 130px;
              width: 710px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              .logo {
                width: 218px;
                display: flex;
                flex-direction: row;
                justify-content: center;

                .box {
                  img {
                    width: 100%;
                  }
                }
                .logo_p {
                  width: 102px;
                  height: 48px;
                  margin-top: 30px;
                  margin-left: -8px;

                  p {
                    color: #416fae;
                    font-size: 18px;
                    font-weight: bold;
                  }
                }
              }
            }
            .message {
              padding-top: 75px;
              width: 500px;
              margin-left: 117px;
              .news {
                .one_ {
                  display: block;
                  position: relative;
                  border-bottom: 2px solid #f5f5f5;
                  margin: 20px 0;
                  width: 500px;

                  img {
                    position: absolute;
                    top: 11px;
                    left: 14px;
                    width: 32px;
                    height: 24px;
                  }
                }
                .one {
                  display: block;
                  position: relative;
                  border-bottom: 2px solid #f5f5f5;
                  margin: 20px 0;
                  width: 500px;

                  img {
                    position: absolute;
                    top: 11px;
                    left: 14px;
                    width: 32px;
                    height: 32px;
                  }
                }
                .two {
                  display: block;
                  position: relative;
                  border-bottom: 2px solid #f5f5f5;
                  margin: 20px 0 30px 0;

                  img {
                    position: absolute;
                    top: 4px;
                    left: 17px;
                    width: 28px;
                    height: 32px;
                  }
                }
              }

              .register_txt {
                width: 500px;
                p {
                  line-height: 60px;
                  text-align: center;
                  color: #ccc;
                  font-size: 14px;
                  span {
                    color: #416fae;
                    font-weight: 500;
                    font-size: 14px;
                  }
                }
              }
              .other_login {
                height: 30px;
                position: relative;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;

                .solid {
                  width: 210px;
                  height: 2px;
                  background-color: #ccc;
                  display: flex;
                  flex-direction: row;
                  justify-content: center;
                  align-items: center;
                  p {
                    color: #ccc;
                    width: 150px;
                    background-color: #fff;
                    text-align: center;
                    font-size: 14px;
                    padding: 0 10px;
                    box-sizing: border-box;
                  }
                }
              }
              // 微信图标
              .wechat {
                height: 100px;
                position: relative;
                img {
                  position: absolute;
                  left: 45%;
                  top: 20%;
                  width: 65px;
                  height: 65px;
                }
              }
            }
          }
          //  右侧
          .vip_seting {
            margin-top: 80px;
            border-left: 2px solid #dae2ed;
            padding: 30px;
            box-sizing: border-box;
            width: 490px;
            .vip_title {
              text-align: center;
              padding-bottom: 30px;
              img {
                width: 220px;
                height: 31px;
              }
            }
            .ordinary_member {
              padding: 15px 0;
              box-sizing: border-box;
              width: 100%;
              display: flex;
              align-items: center;
              .imgSE {
                display: flex;
                align-items: center;
                width: 100%;
                .imgVIP {
                  width: 24px;
                  height: 32px;
                  img {
                    width: 100%;
                  }
                }
                .itemName {
                  flex: 1;
                  margin-left: 10px;
                  font-size: 18px;
                  color: #666666;
                }
              }
            }
            .vip_time {
              padding: 15px 0 15px 30px;
              box-sizing: border-box;
              font-size: 14px;
              color: #cccccc;
              span {
                color: #ff0000;
              }
            }
          }
        }
      }
    }
  }
}
</style>
