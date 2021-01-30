<template>
  <div class="container">
    <my-header></my-header>
    <!-- 登录注册区 -->
    <div class="login_card">
      <div class="w">
        <div class="login_text clearfix">
          <a>登录</a>
          <a @click="toRegister">注册</a>
        </div>
        <div class="box_card">
          <!-- 分割线下边 -->
          <div class="login_set">
            <!-- 左侧登录 -->
            <div class="login_message left">
              <div class="message">
                <div>
                  <el-form
                    :model="LoginForm"
                    :rules="LoginRules"
                    ref="loginForm"
                    class="text-plachorder"
                  >
                    <el-form-item prop="email" class="one_">
                      <img src="../../assets/image/emails1.png" alt />
                      <el-input
                        v-model="LoginForm.email"
                        placeholder="请输入邮箱地址"
                      ></el-input>
                    </el-form-item>
                    <el-form-item prop="checkPass" class="two_" size="medium">
                      <img src="../../assets/order/lock (2).png" alt />
                      <el-input
                        type="password"
                        maxlength="16"
                        minlength="6"
                        v-model="LoginForm.password"
                        placeholder="输入密码"
                      ></el-input>
                    </el-form-item>
                    <div class="password clearfix">
                      <div
                        class="passimg"
                        style="margin-left: 20px"
                        @click.stop="isShow"
                      >
                        <img
                          src="../../assets/image/changefang.png"
                          v-if="remember"
                          alt
                        />
                        <img src="../../assets/image/fang.png" v-else alt />
                        <span>记住密码</span>
                      </div>
                      <div class="right_left" @click="toForget">忘记密码?</div>
                    </div>
                    <el-form-item>
                      <el-button
                        @click="login"
                        class="bbt"
                        style="width: 460px; height: 48px; margin-left: 20px"
                        >登录</el-button
                      >
                    </el-form-item>
                  </el-form>
                </div>
                <div class="register">
                  <p>
                    还没有账号？
                    <span @click="toRegister">快去注册</span>
                  </p>
                </div>
                <div class="other_login">
                  <div class="solid">
                    <p>使用第三方账号登录</p>
                  </div>
                </div>
                <div class="wechat">
                  <img
                    src="../../assets/image/icon_wechat.png"
                    @click="getLogin"
                    alt
                  />
                </div>
                <div
                  class="wechat_box"
                  v-show="wechatLogo"
                  id="login_container"
                ></div>
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
<script src="https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"></script>
<script>
import { mapState, mapMutations, mapActions } from "vuex"
import local from "@/utils/local";
import { EventBus } from "../../components/bus";
const Base64 = require('js-base64').Base64
export default {
  name: "login",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error("请输入密码"));
      } else if (this.LoginForm.password !== "") {
        this.$refs.loginForm.validateField("password");
      }
      callback();
    };
    return {
      VIPlist: [],
      toLogin: 0, // 判断是从哪里进来的登录页面
      wechatLogo: false,
      remember: false,
      LoginForm: {
        email: "",
        password: "",
        car: '',
      },
      LoginRules: {
        email: [
          { message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" }
        ],
        checkPass: [{ validator: validatePass, trigger: "blur" }]
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
    console.log(this.$route.query);
    this.toLogin = this.$route.query.toLogin
    // 在页面加载时从cookie获取登录信息
    let email = this.getCookie("email")
    let remember = this.getCookie("remember")
    let password = Base64.decode(this.getCookie("password"))
    // 如果存在赋值给表单，并且将记住密码勾选
    if (remember) {
      this.LoginForm.email = email
      this.LoginForm.password = password
      this.remember = remember
    }
    console.log(email, password,);
    var code = this.$route.query.code;
    if (code) {
      this.$http
        .get("api/user/codeinfo?code=" + code)
        .then(res => {
          console.log(res.data.data);
          if (res.data.data.thirdid) {
            this.$router.replace({ path: '/WxAuth?thirdid=' + res.data.data.thirdid, replace: true });
          } else {
            console.log(res.data.data.userinfo, "登录");
            local.setUser(res.data.data.userinfo.token);
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
  mounted() {

  },
  methods: {
    ...mapActions(['userinfo']),
    getLogin() {
      window.location.href = "https://open.weixin.qq.com/connect/qrconnect?appid=" + this.reqParams.appid + "&scope=" + this.reqParams.scope + "&redirect_uri=" + this.reqParams.redirect_uri + "&state=" + this.reqParams.state + "#wechat_redirect", '微信登录', 'width=540,height=540'
    },
    login() {
      let shopCartID = JSON.parse(localStorage.getItem('shopCartID'))
      if (shopCartID) {
        this.LoginForm.car = shopCartID.join(',')
      }
      // 对整个表单进行校验
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          this.$http
            .post("api/user/login", this.LoginForm)
            .then(res => {
              if (res.data.code == 1) {
                this.getUserInfo();
                local.setUser(res.data.data.token);
                localStorage.removeItem('shopCartID');
                localStorage.removeItem('shopCart');
                this.setUserInfo()
                if (this.toLogin == 1) {
                  this.$router.back(-1);
                } else {
                  this.$router.push('/')
                }

              }
            })
            .catch(err => {
              console.log(err);
              this.$message.error(err.data.msg);
            });
        }
      });
    },
    async getVIP() {
      try {
        const {
          data: { data }
        } = await this.$http.post("api/user/getUserSystem")
        this.VIPlist = data
        // console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
    async getUserInfo() {
      let userInfo = {}
      try {
        const {
          data: { data }
        } = await this.$http.post("api/user/getUserInfo");
        userInfo = data;
        this.userinfo(userInfo);
      } catch (err) {
        console.log(err);
      }
    },
    toForget() {     // 跳转到忘记密码页面
      this.$router.push("/forget");
    },
    toRegister() {
      this.$router.push("/register");
    },
    isShow() { // 记住密码
      // 如果没有勾选，储存的信息为空
      // wxApi.getVIP()
      this.remember = !this.remember
    },
    // 储存表单信息
    setUserInfo() {
      if (this.remember) {
        this.setCookie("email", this.LoginForm.email)
        let password = Base64.encode(this.LoginForm.password)   // base64加密密码
        this.setCookie("remember", this.remember)
        this.setCookie("password", password)
      } else {
        this.setCookie("email", "")
        this.setCookie("password", "")
      }
    },
    // 获取cookie
    getCookie(key) {
      if (document.cookie.length > 0) {
        var start = document.cookie.indexOf(key + '=')
        if (start !== -1) {
          start = start + key.length + 1
          var end = document.cookie.indexOf(';', start)
          if (end === -1) end = document.cookie.length
          return unescape(document.cookie.substring(start, end))
        }
      }
      return ''
    },
    setCookie(cName, value, expiredays) {      // 保存cookie
      var exdate = new Date()
      exdate.setDate(exdate.getDate() + expiredays)
      document.cookie = cName + '=' + decodeURIComponent(value) +
        ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
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
    height: 700px;

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
          border-bottom: 4px solid #416fae;
        }
        a:nth-child(2) {
          color: #ccc;
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
              display: -ms-flexbox;
              display: -webkit-flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              .logo {
                width: 218px;
                display: flex;
                display: -ms-flexbox;
                display: -webkit-flex;
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
              padding-top: 100px;
              width: 500px;
              margin-left: 117px;
              .one_ {
                display: block;
                position: relative;
                border-bottom: 2px solid #f5f5f5;
                margin: 20px 0 0;
                width: 500px;
                img {
                  position: absolute;
                  top: 13px;
                  left: 15px;
                  width: 29px;
                  height: 24px;
                }
              }
              .two_ {
                display: block;
                margin: 20px 0;
                border-bottom: 2px solid #f5f5f5;
                width: 500px;
                img {
                  position: absolute;
                  top: 3px;
                  left: 14px;
                  width: 32px;
                  height: 32px;
                }
              }
              .password {
                width: 500px;
                display: flex;
                display: -ms-flexbox;
                display: -webkit-flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 0 20px 0;
                box-sizing: border-box;

                .passimg {
                  display: flex;
                  display: -ms-flexbox;
                  display: -webkit-flex;
                  align-items: center;

                  img {
                    width: 20px;
                    height: 20px;
                  }
                  span {
                    margin-left: 3px;
                    font-size: 16px;
                    color: #666666;
                  }
                }
                .right_left {
                  flex: 1;
                  -ms-flex: 1;
                  -webkit-box-flex: 1;
                  text-align: right;
                  font-size: 16px;
                  color: #3b6baf;
                }
              }

              .btn {
                line-height: 50px;
                input {
                  width: 500px;
                  height: 50px;
                  margin-top: 30px;
                  border-style: none;
                  display: block;
                  border-radius: 30px;
                  background-color: #27508c;
                  font-size: 20px;
                  color: #fff;
                }
              }
              .register {
                width: 500px;
                // margin-top: 40px;
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
                display: -ms-flexbox;
                display: -webkit-flex;
                // flex-direction: row;
                justify-content: center;
                align-items: center;

                .solid {
                  width: 210px;
                  height: 2px;
                  background-color: #ccc;
                  top: 50%;
                  display: flex;
                  display: -ms-flexbox;
                  display: -webkit-flex;
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
              .wechat_box {
                width: 300px;
                height: 300px;
                background-color: #fff;
                padding: 20px;
                box-sizing: border-box;
                border: 1px solid #ccc;
                position: absolute;
                left: 235px;
                top: 400px;
                img {
                  height: 260px;
                  height: 260px;
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
              display: -ms-flexbox;
              display: -webkit-flex;
              align-items: center;
              .imgSE {
                display: flex;
                width: 100%;
                display: -ms-flexbox;
                display: -webkit-flex;
                align-items: center;
                .imgVIP {
                  width: 24px;
                  height: 32px;
                  img {
                    width: 100%;
                  }
                }
                .itemName {
                  flex: 1;
                  -webkit-box-flex: 1;
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
