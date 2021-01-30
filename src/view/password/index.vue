<template>
  <div class="container">
    <!-- 头部区域 -->
    <my-header></my-header>
    <!--  个人中心 -->
    <div class="personal">
      <div class="w">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href="javascript:;">个人中心</a>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="order">
      <div class="w clearfix">
        <!-- 左侧 -->
        <div class="left_name left">
          <my-personal></my-personal>
        </div>
        <!-- 右侧 -->
        <div class="right_order left">
          <!-- 修改密码 -->
          <div class="my_order">
            <img src="../../assets/order/lock.png" alt />
            <span>修改密码</span>
          </div>
          <!-- 新旧密码 -->
          <div class="change_password">
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="126px"
              class="demo-ruleForm"
            >
              <el-form-item label="旧密码" id="label_" prop="oldpassword">
                <el-input
                  class="item"
                  type="password"
                  v-model="ruleForm.oldpassword"
                  autocomplete="off"
                  placeholder="请输入旧密码"
                ></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="password">
                <el-input
                  class="item"
                  type="password"
                  v-model="ruleForm.password"
                  autocomplete="off"
                  placeholder="请输入新密码"
                ></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="repassword">
                <el-input
                  class="item"
                  type="password"
                  v-model="ruleForm.repassword"
                  autocomplete="off"
                  placeholder="请再次输入新密码"
                ></el-input>
              </el-form-item>
              <el-form-item class="btn__">
                <el-button
                  type="primary"
                  @click="submitForm('ruleForm')"
                  class="bbt"
                  style="width: 176px"
                  >保存</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <!-- 尾部 -->
    <my-footer></my-footer>
  </div>
</template>
<script>
import local from "@/utils/local";
import { mapActions } from "vuex"
export default {
  // 修改密码
  name: "password",
  data() {
    var validateOldPass = (rule, value, callback) => {
      // console.log(value);
      if (!value) {
        return callback(new Error("旧密码不能为空"));
      }
      this.ruleForm.oldpassword = value;
      console.log("旧", this.ruleForm.oldpassword);
    };
    var validatePass = (rule, value, callback) => {
      // console.log(value, "新密码");

      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.ruleForm.repassword !== "") {
          this.$refs.ruleForm.validateField("repassword");
        }
        callback();
        this.ruleForm.password = value;
        // console.log("新1", this.ruleForm.password);
      }
    };
    var validatePass2 = (rule, value, callback) => {
      // console.log(value, "新密码2");
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
        this.ruleForm.repassword = value;
        // console.log("新2", this.ruleForm.repassword);
      }
    };
    return {
      ruleForm: {
        oldpassword: "", // 旧密码
        password: "", // 新密码
        repassword: "" // 确认密码
      },
      rules: {
        oldpassword: [{ validator: validateOldPass, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        repassword: [{ validator: validatePass2, trigger: "blur" }]
      },
    };
  },
  methods: {
    ...mapActions(['loginOutInfo']),
    async submitForm(formName) {
      const { data } = await this.$http.post(
        "api/user/changepwd",
        this.ruleForm
      );
      this.$message.success("修改密码成功");
      sessionStorage.clear()
      localStorage.clear()
      this.loginOutInfo()
      setTimeout(() => {
        // this.$router.push('/login')
        this.$router.push({ path: '/login', query: { toLogin: '0' } })
      }, 2000);


    }
  }
};
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  height: 100%;
  //   个人中心
  .personal {
    padding-top: 20px;
    .w {
      .el-breadcrumb {
        height: 40px;
        line-height: 40px;
        .el-breadcrumb-item {
          color: #ccc;
          z-index: 999;
          .el-breadcrumb__inner {
            color: #87b4e4;
            z-index: 99;
          }
        }
      }
    }
  }
  .order {
    .w {
      // 左侧部分
      .left_name {
        width: 256px;
        height: 700px;
        box-shadow: 5px 5px 5px #f4f4f4;
        background-color: #fff;
      }
      //   右侧部分
      .right_order {
        margin-left: 16px;
        width: 928px;
        padding: 20px 32px;
        box-sizing: border-box;
        box-shadow: 5px 5px 5px #f4f4f4;
        background-color: #fff;
        height: 700px;
        // 修改密码
        .my_order {
          height: 50px;
          display: flex;
          align-items: center;

          img {
            width: 22px;
            height: 22px;
          }
          span {
            padding-left: 10px;
            font-size: 20px;
          }
        }
        // 修改密码1
        .change_password {
          margin-top: 15px;
          width: 100%;
        }
      }
    }
  }
}
</style>