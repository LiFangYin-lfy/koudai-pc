<template>
  <div class="container" v-cloak>
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
    <!-- 我的订单  + 张小北 -->
    <div class="order">
      <div class="w clearfix">
        <div class="left_name left">
          <my-personal></my-personal>
        </div>
        <div class="right_order left">
          <div class="my_order">
            <img src="../../assets/image/order2.png" class="my_img" alt />
            <span>基本信息</span>
          </div>
          <div class="information">
            <div class="n_name">
              <label for="昵称" class="pet_name">
                <span>*</span>
                昵称
              </label>
              <input type="text" placeholder="请输入昵称" v-model="userInfo.nickname" />
            </div>
            <div class="n_gender">
              <label for="性别" class="gender">性别</label>
              <div class="gender_man">
                <el-checkbox v-model="checked" @change="chooseItem">男</el-checkbox>
              </div>
              <div class="gender_man">
                <el-checkbox v-model="checkednv" @change="chooseItemnv">女</el-checkbox>
              </div>
            </div>
            <div class="n_birthday">
              <label for="生日" class="birthday">生日</label>
              <input type="date" placeholder="请选择您的生日" v-model="userInfo.birthday" />
            </div>
            <div class="n_mailbox">
              <label for="邮箱" class="mailbox">邮箱</label>
              <div class="email_input">
                <input type="text" disabled placeholder="请输入邮箱" v-model="userInfo.email" />
                <div class="tishi">(不可修改)</div>
              </div>
            </div>
            <div class="n_password">
              <label for="密码" class="password">密码</label>
              <input type="password" placeholder="请输入修改密码" @focus="modify" />
              <span @click="modify">修改</span>
            </div>
            <div class="n_head">
              <label for="头像照片" class="head">头像照片</label>
              <el-upload
                class="avatar-uploader a_card"
                action="http://koudai.t.brotop.cn/api/common/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
              >
                <img :src="userInfo.avatar" class="avatar" />
                <div class="box" v-show="show__">
                  <img src="../../assets/order/camera.png" alt />
                  <span>上传头像</span>
                </div>
              </el-upload>
            </div>
            <div class="n_readonly">
              <label for class="readonly"></label>
              <span>*</span>
              <p>（仅支持JPG、PNG、GIF、BMP格式，文件小于4M）</p>
            </div>
          </div>
          <!-- 保存按钮 -->
          <div class="n_btn">
            <button class="btn" @click="confirmImage">保存</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 尾部 -->
    <my-footer></my-footer>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex"
import local from "@/utils/local";
export default {
  // 基本信息
  name: "information",
  // props: ["value"],
  data() {
    return {
      dialogVisible: false, // 裁剪组件的基础配置option
      option: {
        img: "", // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: "jpeg", // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 295, // 默认生成截图框宽度
        autoCropHeight: 413, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [5, 5], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      picsList: [], //页面显示的数组 // 防止重复提交
      // -------------------------------------------------------
      loading: false,
      checked: false,
      checkednv: false,
      show__: true, // 图像相机
      userInfo: {
        avatar: require("@/assets/image/logoimg.png"), //上传头像
        nickname: "", // 用户名
        gender: "", // 性别
        birthday: "" // 生日
      },
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      },
      // dialogVisible: false,
      activeName: "image",
      selectedImageUrl: null,
      uploadImageUrl: null,
      defaultImage: "",
    };
  },
  created() {
    this.getInformation();
  },
  mounted() {
    window.addEventListener('beforeunload', e => this.beforeunloadFn(e))
  },

  destroyed() {
    window.removeEventListener('beforeunload', e => this.beforeunloadFn(e))
  },
  methods: {
    ...mapActions(['userinfo']),
    // -------------------------------------------------
    beforeunloadFn(e) {
      if (this.loading == false) {
        this.loading = true
        console.log(this.loading);
      }
      setTimeout(() => {
        this.loading = false
      }, 2000)
    },

    chooseItem() {
      this.checked = true;
      this.userInfo.gender = 0;
      this.checkednv = false;
    },
    // 女
    chooseItemnv() {
      this.checked = false;
      this.userInfo.gender = 1;
      this.checkednv = true;
    },
    async getInformation() {
      const {
        data: { data }
      } = await this.$http.post("api/user/getUserInfo");
      this.userInfo = data;
      if (this.userInfo.gender == 0) {
        this.checked = true;
      } else {
        this.checkednv = true;
      }
    },
    // 保存数据
    async confirmImage() {
      const { data } = await this.$http.post("api/user/profile", this.userInfo);
      this.$message.success("保存成功");
      this.getUserInfo()
    },
    async getUserInfo() {
      let myuserInfo = []
      const {
        data: { data }
      } = await this.$http.post("api/user/getUserInfo");
      // console.log(data, "myuserInfo");
      myuserInfo = data;
      this.userinfo(myuserInfo);

    },
    // 上传图片  成功
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.show__ = false
      // this.userInfo.avatar = URL.createObjectURL(file.raw); // 将上传图片保存起来
      this.userInfo.avatar = res.data.url
      console.log(this.userInfo.avatar);
      this.$message.success("上传成功");
    },
    // 上传前
    beforeAvatarUpload(file) {
      if (this.loading === false) {
        this.loading = true
      }
      setTimeout(() => {
        this.loading = false
      }, 2000)
      if (
        !(
          file.type === "image/png" ||
          file.type === "image/gif" ||
          file.type === "image/jpg" ||
          file.type === "image/jpeg"
        )
      ) {
        this.$notify.warning({
          title: "警告",
          message:
            "请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片"
        });
      }
      let size = file.size / 1024 / 1024 / 4;
      if (size > 4) {
        this.$notify.warning({
          title: "警告",
          message: "图片大小必须小于4M"
        });
      }


    },
    // 修改
    modify() {
      this.$router.push("/password");
    }
  }
};
</script>

<style scoped lang='less'>
[v-cloak] {
  display: none;
}
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
        height: 778px;
        background-color: #fff;
        box-shadow: 5px 5px 5px #f4f4f4;
      }
      //   右侧部分
      .right_order {
        margin-left: 16px;
        width: 928px;
        padding: 20px 32px;
        box-sizing: border-box;
        box-shadow: 5px 5px 5px #f4f4f4;
        background-color: #fff;
        .my_order {
          height: 50px;
          display: flex;
          align-items: center;

          .my_img {
            width: 20px;
            height: 22px;
          }
          span {
            padding-left: 10px;
            font-size: 20px;
          }
        }
        // 基本信息2
        .information {
          margin-top: 15px;
          .n_name {
            height: 56px;
            display: flex;
            flex-direction: row;
            align-items: center;
            background-color: #f4f5f9;
            margin-bottom: 5px;

            .pet_name {
              display: block;
              width: 160px;
              height: 40px;
              line-height: 40px;
              padding-left: 30px;
              box-sizing: border-box;
              font-size: 18px;
              span {
                color: red;
                padding-right: 2px;
              }
            }
            input {
              padding: 8px 136px 8px 0;
              height: 40px;
              box-sizing: border-box;
              text-indent: 20px;
              width: 551px;
              border-style: none;
              font-size: 16px;
            }
          }
          .n_gender {
            height: 56px;
            display: flex;
            flex-direction: row;
            align-items: center;
            background-color: #f4f5f9;
            margin-bottom: 5px;

            .gender {
              display: block;
              width: 160px;
              height: 40px;
              line-height: 40px;
              padding-left: 46px;
              box-sizing: border-box;
              font-size: 18px;
            }
            .el-checkbox {
              margin-left: 2px;
              margin-right: 100px;
            }
          }
          .n_birthday {
            height: 56px;
            display: flex;
            flex-direction: row;
            align-items: center;
            background-color: #f4f5f9;
            margin-bottom: 5px;
            .birthday {
              display: block;
              width: 160px;
              height: 40px;
              line-height: 40px;
              padding-left: 46px;

              box-sizing: border-box;
              font-size: 18px;
            }
            input {
              height: 40px;
              box-sizing: border-box;
              text-indent: 10px;
              width: 551px;
              border-style: none;
              padding-right: 8px;
              font-size: 16px;
            }
          }
          .n_mailbox {
            height: 56px;
            display: flex;
            flex-direction: row;
            align-items: center;
            background-color: #f4f5f9;
            margin-bottom: 5px;
            .mailbox {
              display: block;
              width: 160px;
              height: 40px;
              line-height: 40px;
              padding-left: 46px;

              box-sizing: border-box;
              font-size: 18px;
            }
            .email_input {
              width: 551px;
              background-color: #fff;
              display: flex;
              align-items: center;
              input {
                flex: 1;
                padding: 8px 136px 8px 0;
                height: 40px;
                box-sizing: border-box;
                text-indent: 20px;
                // width: 551px;
                font-size: 16px;
                border-style: none;
              }
              .tishi {
                width: 100px;
                font-size: 16px;
                color: #ccc;
                padding-right: 8px;
                text-align: right;
              }
            }
          }
          .n_password {
            height: 56px;
            display: flex;
            flex-direction: row;
            align-items: center;
            background-color: #f4f5f9;
            margin-bottom: 5px;
            position: relative;
            .password {
              display: block;
              width: 160px;
              height: 40px;
              line-height: 40px;
              padding-left: 46px;

              box-sizing: border-box;
              font-size: 18px;
            }
            input {
              padding: 8px 136px 8px 0;
              height: 40px;
              box-sizing: border-box;
              text-indent: 20px;
              width: 551px;
              border-style: none;
              font-size: 16px;
            }
            span {
              display: block;
              position: absolute;
              right: 165px;
              font-size: 16px;
              color: #416fae;
            }
          }
          .n_head {
            height: 165px;
            display: flex;
            align-items: center;
            background-color: #f4f5f9;
            position: relative;
            .head {
              display: block;
              width: 160px;
              padding-left: 46px;
              box-sizing: border-box;
              font-size: 18px;
            }
            .a_card {
              position: absolute;
              top: 12px;
              left: 160px;
              background-color: #f5f5f5;
              width: 148px;
              height: 148px;
              .box {
                height: 50px;
                line-height: 30px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                img {
                  width: 40px;
                  height: 30px;
                }
                span {
                  display: block;
                  width: 116px;
                  text-align: center;
                  line-height: 46px;
                  color: #000;
                }
              }
            }
            .avatar {
              width: 148px;
              height: 148px;
              display: block;
              position: absolute;
              top: 2px;
              left: 2px;
              z-index: 5;
              border-radius: 8px;
            }
          }
          .n_readonly {
            height: 30px;
            display: flex;
            flex-direction: row;
            align-items: center;
            background-color: #f4f5f9;
            padding-bottom: 10px;

            .readonly {
              display: block;
              width: 160px;
              padding-left: 46px;
              box-sizing: border-box;
              font-size: 14px;
            }
            span {
              display: block;
              color: red;
            }
            p {
              color: #ccc;
            }
          }
        }
        // 保存按钮
        .n_btn {
          text-align: center;
          .btn {
            width: 272px;
            height: 48px;
            margin-top: 40px;
            line-height: 48px;
            background-color: #416fae;
            border-style: none;
            border: 1px solid #416fae;
            border-radius: 106px;
            color: #fff;
            font-weight: bold;
            font-size: 20px;
          }
        }
      }
    }
  }
}
</style>