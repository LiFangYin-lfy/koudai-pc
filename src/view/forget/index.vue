<template>
  <div class="container">
    <!-- 头部区域 -->
    <my-header></my-header>
    <!-- 登录注册区 -->
    <div class="login_card">
      <div class="w">
        <div class="login_text clearfix">
          <a href="javascript:;">忘记密码</a>
        </div>
        <div class="box_card">
          <div class="login_set">
            <div class="login_message left">
              <div class="message">
                <div class="news">
                  <el-form
                    :model="ForgetForm"
                    :rules="ForgetRules"
                    class="news"
                    ref="ForgetForm"
                  >
                    <el-form-item prop="email" class="one one_">
                      <img src="../../assets/image/emails1.png" alt />
                      <el-input
                        v-model="ForgetForm.email"
                        placeholder="请输入邮箱地址"
                      ></el-input>
                    </el-form-item>
                    <el-form-item prop="captcha" class="two">
                      <img src="../../assets/image/codes.png" alt />
                      <el-input
                        style="width: 200px"
                        v-model="ForgetForm.captcha"
                        placeholder="邮箱验证码"
                      ></el-input>
                      <el-button
                        @click="sendCode"
                        :disabled="isDisabled"
                        class="email_btn"
                        >{{ counted }}</el-button
                      >
                    </el-form-item>
                    <el-form-item prop="password" class="one">
                      <img src="../../assets/order/lock (2).png" alt />
                      <el-input
                        type="password"
                        maxlength="16"
                        minlength="6"
                        v-model="ForgetForm.password"
                        placeholder="输入新密码"
                      ></el-input>
                    </el-form-item>
                    <el-form-item prop="repassword" class="one">
                      <img src="../../assets/order/lock (2).png" alt />
                      <el-input
                        type="password"
                        maxlength="16"
                        minlength="6"
                        v-model="ForgetForm.repassword"
                        placeholder="确认密码"
                      ></el-input>
                    </el-form-item>
                    <!-- 重置密码 -->
                    <el-form-item>
                      <el-button
                        @click="preview(ForgetForm)"
                        class="bbt"
                        style="width: 460px; height: 48px; margin-left: 20px"
                        >重置密码</el-button
                      >
                    </el-form-item>
                  </el-form>
                </div>
                <!-- 重置密码成功弹窗 -->
                <div class="btn">
                  <!--  确认预览的弹窗 -->
                  <div class="register_5g" v-if="show">
                    <div class="userwrap_5g">
                      <div class="all_box">
                        <div class="quit_btn" @click="preview">
                          <img src="../../assets/image/quit.png" alt />
                        </div>
                        <div class="img_report">
                          <img src="../../assets/order/success (1).png" alt />
                        </div>
                        <div class="suss">
                          <p>恭喜您！密码重置成功!</p>
                        </div>
                      </div>
                    </div>
                  </div>
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
    <my-footer></my-footer>
  </div>
</template>
      <script>
export default {
  name: "forget",
  data() {
    //  邮箱验证
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
    //  <!--验证码是否为空-->
    var checkSmscode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱验证码"));
      } else {
        callback();
      }
    };
    // 验证密码
    var validatePass = (rule, value, callback) => {
      var passwordreg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
      if (value === '') {
        callback(new Error("请输入密码"));
      } else if (!passwordreg.test(value)) {
        callback(new Error('请输入6-16位的密码，需包含数字、字母'))
      } else {
        if (this.ForgetForm.repassword !== '') {
          this.$refs.ForgetForm.validateField("repassword");
        }
        callback();
      }
    };
    // 二次验证密码
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ForgetForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      VIPlist: [],
      code_show: true,
      count: "",
      timer: null,
      centerDialogVisible: false,
      buttonText: "发送验证码",
      counted: "发送验证码",
      isDisabled: false, // 是否禁止点击发送验证码按钮
      show: false,
      ForgetForm: {
        email: "",
        password: "", // 密码
        repassword: "", // 确认密码
        captcha: "" // 验证码
      },
      ForgetRules: {
        email: [{ validator: validateEmail, trigger: "blur" }],
        captcha: [{ validator: checkSmscode, trigger: "change" }],
        password: [{ validator: validatePass, trigger: "change" }],
        repassword: [{ validator: validatePass2, trigger: "change" }]
      }
    };
  },
  created() {
    this.getVIP()
  },
  methods: {
    //获取邮箱验证码
    sendCode() {
      console.log(this.ForgetForm.email);
      if (this.ForgetForm.email != '') {
        this.$http
          .get("api/ems/send", {
            params: {
              email: this.ForgetForm.email,
              event: 'reset'
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
                  clearInterval(this.timer);
                  this.isDisabled = false;
                  this.counted = '发送验证码'
                  this.timer = null;
                }
              }, 1000);
            }

          })
          .catch(err => {
            this.users = [];
          });
      } else {
        this.$message.error('邮箱不能为空')
      }
    },
    //  重置密码按钮 弹窗函数
    preview(ForgetForm) {
      this.$refs.ForgetForm.validate(async valid => {
        if (valid) {
          this.$http
            .post("api/user/forgetpwd", this.ForgetForm)
            .then(res => {
              this.show = !this.show;
              setTimeout(() => {
                this.$router.push("/login");
              }, 1000);
            })
            .catch(err => {
              console.log(err);
              this.$message.error("重置不成功");
            });
        }
      });
    },
    async getVIP() {
      const {
        data: { data }
      } = await this.$http.post("api/user/getUserSystem")
      this.VIPlist = data
      console.log(data);
    },
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;

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
      }
      .box_card {
        border-top: 1px solid #ccc;
        margin-top: 10px;

        .login_set {
          .login_message {
            width: 710px;
            .log_top {
              height: 130px;
              width: 100%;
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
                    width: 68px;
                    height: 76px;
                  }
                }
                .logo_p {
                  width: 102px;
                  height: 48px;
                  margin-top: 25px;
                  margin-left: -8px;

                  p {
                    color: #416fae;
                    font-size: 9px;
                    font-weight: bold;
                  }
                }
              }
            }
            .message {
              width: 500px;
              margin-left: 117px;
              padding-top: 100px;
              .news {
                .one {
                  display: block;
                  position: relative;
                  border-bottom: 2px solid #f5f5f5;
                  margin: 20px 0;
                  width: 500px;

                  img {
                    position: absolute;
                    top: 11px;
                    left: 12px;
                    width: 32px;
                    height: 32px;
                  }
                }
                .one_ {
                  img {
                    height: 24px;
                  }
                }
                .two {
                  display: block;
                  position: relative;
                  border-bottom: 2px solid #f5f5f5;
                  margin: 20px 0;

                  img {
                    position: absolute;
                    top: 8px;
                    left: 12px;
                    width: 28px;
                    height: 32px;
                  }
                  .email_btn {
                    position: absolute;
                    top: -3px;
                    right: 0px;
                    color: #fff !important;
                    background-color: #416fae !important;
                    padding: 14px 20px !important;
                    z-index: 2;
                  }
                }
              }

              .btn {
                line-height: 50px;
                margin: 50px 0;
                input {
                  width: 497px;
                  height: 50px;
                  margin-top: 40px;
                  border-style: none;
                  display: block;
                  border-radius: 30px;
                  background-color: #27508c;
                  color: #fff;
                  font-size: 18px;
                }
                //  弹窗  确认使用
                .register_5g {
                  width: 100%;
                  height: 100%;
                  background-color: rgba(0, 0, 0, 0.5);
                  position: fixed;
                  top: 0;
                  left: 0;
                  right: 0;
                  z-index: 999;
                  .userwrap_5g {
                    width: 400px;
                    height: 400px;
                    background: rgba(255, 255, 255, 1);
                    border-radius: 10px;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    .all_box {
                      position: relative;
                      .quit_btn {
                        position: absolute;
                        top: 30px;
                        right: 30px;
                        z-index: 1999;
                      }
                      .img_report {
                        height: 240px;
                        position: relative;
                        img {
                          width: 112px;
                          position: absolute;
                          top: 105px;
                          left: 140px;
                        }
                      }
                      .suss {
                        height: 40px;
                        line-height: 40px;
                        text-align: center;
                        p {
                          color: #2c2c2c;
                          font-size: 20px;
                        }
                      }
                    }
                  }
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
                width: 100%;
                display: flex;
                align-items: center;
                .imgVIP {
                  width: 24px;
                  height: 32px;
                  flex-shrink: 0;
                  img {
                    width: 100%;
                  }
                }
                .itemName {
                  flex: 1;
                  margin-left: 10px;
                  font-size: 18px;
                  background-color: red "\9"; /*所有ie*/
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