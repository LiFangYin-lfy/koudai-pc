<template>
  <div class="container">
    <!-- 头部区域 -->
    <my-header></my-header>
    <!-- 更改LOGO -->
    <div class="logo_txt">
      <div class="w">
        <!-- 标题 -->
        <div class="change_logo">
          <div class="my_logo">
            <img src="../../assets/image/change.png" alt />
            <span>更换LOGO</span>
          </div>
        </div>

        <!-- 上传头像 -->
        <!-- action="http://glaforteachers.com/api/common/upload"   正式的-->
        <!-- action="http://koudai.t.brotop.cn/api/common/upload" -->
        <div class="upload">
          <div class="upload_head">
            <el-upload
              class="avatar-uploader a_card"
              action="https://glaforteachers.com/api/common/upload"
              :on-success="handleSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img :src="dialogImageUrl" class="avatar" v-show="avatar" />
              <div class="box" v-show="show__">
                <img src="../../assets/order/camera.png" alt />
                <span>上传LOGO 长宽比1:1</span>
              </div>
            </el-upload>
          </div>
          <div class="preview_btn" @click="preview">
            <el-button class="preview">预览</el-button>
            <!--  确认预览的弹窗 -->
            <div class="register_5g" v-if="show" :data="loops">
              <div class="userwrap_5g">
                <div class="all_box">
                  <div class="quit_btn" @click.stop="offPreview">
                    <img src="../../assets/image/quit_white.png" alt />
                  </div>
                  <el-carousel :interval="5000" arrow="always" v-if="this.car_id">
                    <el-carousel-item v-for="(item , index) in loops" :key="index">
                      <img :src="item.image" class="img_report" alt />
                    </el-carousel-item>
                  </el-carousel>
                  <el-carousel :interval="5000" arrow="always" v-if="this.data">
                    <el-carousel-item>
                      <img :src="loopsObj.image" class="img_report" alt />
                    </el-carousel-item>
                  </el-carousel>
                  <!-- <div class="l_arrows">
                    <img src="../../assets/image/feel3.png" alt />
                  </div>
                  <div class="r_arrows">
                    <img src="../../assets/image/feel4.png" alt />
                  </div>-->
                  <div class="dialogImageUrl">
                    <img :src="dialogImageUrl" alt />
                  </div>
                  <el-button class="validated" @click="togo">确认使用</el-button>
                </div>
              </div>
            </div>
            <div class="content_p">
              <span>*</span>
              <span>请上传正方形LOGO，图片不小于148*148。满意预览效果后再付款，虚拟商品不支持退费，请您理解。如遇其他问题，可联系小口袋微信：shucai_001，帮您解决！</span>
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
import local from "@/utils/local";
import EventBus from "@/components/bus";
export default {
  // 更换logo
  name: "change",
  data() {
    return {
      show: false,
      dialogImageUrl: "",
      car_id: "",
      data: '',
      loops: [],//  预览轮播图
      show__: true, // 图像相机
      avatar: false,
      loopsObj: ''

    };
  },
  created() {
    this.getGoodsId();
  },
  methods: {
    getGoodsId() {
      let routeParams = JSON.parse(this.$route.query.routeParams);
      this.car_id = routeParams.car_id;
      this.data = routeParams.data
    },
    // 上传图片  成功
    handleSuccess(res, file) {
      this.avatar = true
      this.show__ = false
      this.dialogImageUrl = URL.createObjectURL(file.raw); // 将上传图片保存起来
      // 提示
      // console.log(this.dialogImageUrl);
      this.$message.success("上传成功");
    },
    // 上传前
    beforeAvatarUpload(file) {
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
    async preview() {
      this.show = !this.show;
      if (this.car_id) {
        console.log(this.car_id, "购物车");
        const {
          data: { data }
        } = await this.$http.post("api/order/carOrder", { car_id: this.car_id.toString() });
        this.loops = data.data
      } else {
        const {
          data: { data }
        } = await this.$http.post("api/order/order", this.data);
        this.loopsObj = data.data
      }
    },
    offPreview() {
      this.show = !this.show;
    },
    togo() {
      console.log(this.dialogImageUrl, "上传图片路径");
      //通过emit触发事件，并传值
      EventBus.$emit("eventTarget", this.dialogImageUrl);
      this.$router.go(-1);
    }
  }
};
</script>
<style>
.el-upload--picture-card {
  width: 176px;
  height: 176px;
  background-color: #e9e9e9 !important ;
  position: absolute;
  left: 44%;
  top: 50%;
}
</style>
<style scoped lang='less'>
.container {
  width: 100%;
  height: 100%;

  //    更换LOGO
  .logo_txt {
    margin-top: 50px;
    .w {
      // 更换LOGO
      .change_logo {
        height: 52px;
        border-bottom: 2px solid #8b9cbc;
        margin-bottom: 30px;

        .my_logo {
          height: 50px;
          line-height: 48px;
          float: left;
          width: 136px;
          border-bottom: 4px solid #416fae;

          img {
            width: 19px;
            height: 22px;
            vertical-align: baseline;
          }
          span {
            padding-left: 10px;
            font-size: 20px;
            color: #2c2c2c;
          }
        }
      }
      //  上传头像
      .upload {
        height: 580px;
        background-color: #fff;
        .upload_head {
          height: 360px;
          position: relative;
          .a_card {
            position: absolute;
            top: 158px;
            left: 523px;
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
          }

          .camera {
            width: 148px;
            height: 148px;
            background-color: #e9e9e9;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -75px;
            margin-left: -75px;

            .box {
              // width: 176px;
              height: 100%;
              line-height: 30px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              position: relative;

              img {
                position: absolute;
                top: 50px;
                left: 53px;
                width: 40px;
                height: 30px;
              }
              span {
                position: absolute;
                top: 83px;
                left: 0px;
                display: block;
                height: 20px;
                width: 148px;
                color: #999999;
                text-align: center;
                line-height: 20px;
              }
            }
          }
        }
        //   预览按钮
        .preview_btn {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          .preview {
            width: 160px;
            height: 48px;
            background-color: #416fae;
            text-align: center;
            color: #fff;
            border-radius: 25px;
            font-size: 16px;
            margin-bottom: 20px;
          }
          .content_p {
            width: 538px;
            span:nth-child(1) {
              color: #ff0000;
            }
            span:nth-child(2) {
              font-size: 12px;
              line-height: 21px;
              color: #999999;
            }
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
              width: 584px;
              height: 826px;
              background: rgba(255, 255, 255, 1);
              border-radius: 10px;
              position: absolute;
              top: 45%;
              left: 50%;
              transform: translate(-50%, -50%);
              .all_box {
                position: relative;
                .quit_btn {
                  position: absolute;
                  top: 0;
                  right: -34px;
                  z-index: 1999;
                }
                .img_report {
                  width: 584px;
                  height: 826px;
                }
                .dialogImageUrl {
                  width: 120px;
                  height: 120px;
                  position: absolute;
                  top: 5px;
                  right: -15px;
                  z-index: 1999;
                  img {
                    width: 80px;
                    height: 80px;
                  }
                }
                .l_arrows {
                  width: 48px;
                  height: 48px;
                  border-radius: 50%;
                  background-color: #b8b8b8;
                  position: absolute;
                  top: 400px;
                  left: -80px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
                .r_arrows {
                  width: 48px;
                  height: 48px;
                  border-radius: 50%;
                  background-color: #b8b8b8;
                  position: absolute;
                  top: 400px;
                  right: -80px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
                .validated {
                  margin-top: 30px;
                  width: 160px;
                  height: 48px;
                  border-radius: 25px;
                  background-color: #f5f5f5;
                  color: #416fae;
                  font-size: 16px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>