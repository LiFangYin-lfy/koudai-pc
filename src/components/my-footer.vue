<template>
  <!-- 尾部 -->
  <div class="footer">
    <div class="w">
      <div class="photos">
        <div class="small_box">
          <div
            class="foot"
            @mouseover.stop="clickeEnterpublic"
            @mouseout.stop="clickOutpublic"
          >
            <a>
              <img src="../assets/image/icon_4.png" alt />
              <span>公众号</span>
            </a>
            <div class="imgs__wecode" v-show="outpublic">
              <!-- <img src="../assets/image/top_sanjiao.png" alt /> -->
              <img :src="wechatcode1" alt />
            </div>
          </div>
          <div class="foot">
            <a href="https://www.facebook.com/MsVeGeRocks" target="view_window">
              <img src="../assets/image/icon_3.png" alt />
              <span>粉丝专页</span>
            </a>
          </div>

          <div class="foot">
            <a
              href="https://wxf374733b0b997f5d.h5.xiaoe-tech.com"
              target="view_window"
            >
              <img src="../assets/image/icon_2.png" alt />
              <span>线上课程</span>
            </a>
          </div>
          <!-- <div class="foot" @click="shareWeibo"> -->
          <div class="foot">
            <a href="https://weibo.com/u/2638915523" target="view_window">
              <img src="../assets/image/icon_1.png" alt />
              <span>新浪微博</span>
            </a>
          </div>
          <div
            class="foot"
            @mouseover.stop="clickMiniProgramenter"
            @mouseout.stop="clickMiniProgramout"
          >
            <a href="javascript:;">
              <img src="../assets/image/icon_5.png" alt />
              <span>小程序</span>
            </a>
            <div class="miniProgram" v-show="miniProgram">
              <!-- <img src="../assets/image/top_sanjiao.png" alt /> -->
              <img :src="codePublic" alt />
            </div>
          </div>
        </div>
      </div>
      <!-- 备案内容 -->
      <div class="record" :data="footbox">
        <p v-for="item in footbox" :key="item">{{ item }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-footer',
  data() {
    return {
      outpublic: false,
      miniProgram: false,
      codePublic: '',
      wechatcode1: '',
      type: '',
      footbox: [],
    }

  },
  created() {
    this.getfootbox()
  },
  methods: {
    clickOutpublic() {
      this.outpublic = !this.outpublic;
    },
    async clickeEnterpublic() {    // 点击公共号
      this.outpublic = !this.outpublic;
      const { data } = await this.$http.post("api/sundry/getQrcode", { type: 2 });
      this.wechatcode1 = data.data;
    },
    clickMiniProgramout() {
      this.miniProgram = !this.miniProgram;
    },
    async clickMiniProgramenter() {    // 小程序
      this.miniProgram = !this.miniProgram;
      const { data } = await this.$http.post("api/sundry/getQrcode", { type: 3 });
      this.codePublic = data.data;
    },
    async getfootbox() {
      const { data: { data } } = await this.$http.post("api/sundry/getBottom");
      this.footbox = data;
    },
    // 分享到微博
    shareWeibo() {
      window.open('http://service.weibo.com/share/share.php?url=' + document.location.href + '?sharesource=weibo&title=口袋商品&pic=图片&appkey=微博平台申请的key');
    },
  }
}
</script>

<style scoped lang='less'>
//尾部
.footer {
  margin: 30px 0 50px 0;
  .w {
    .photos {
      // height: 108x;
      .small_box {
        display: flex;
        flex-direction: row;
        justify-content: center;
        position: relative;

        .foot {
          margin: 0 -15px;
          width: 180px;
          height: 108px;
          line-height: 108px;

          a {
            width: 136px;
            margin-top: 16px;
            margin-left: 15px;
            display: block;
            height: 62px;
            line-height: 62px;

            background-color: #fff;
            border: 1px #ccc solid;
            display: flex;
            align-items: center;
            justify-content: center;

            span {
              padding-left: 5px;
              color: black;
              font-weight: bold;
              font-size: 15px;
            }
            img {
              width: 40px;
              height: 40px;
            }
          }
          .miniProgram {
            width: 240px;
            height: 240px;
            background-color: #fff;
            position: absolute;
            top: -225px;
            right: 135px;
            z-index: 3;
            // img:nth-child(1) {
            //   width: 24px;
            //   height: 24px;
            //   position: absolute;
            //   bottom: -14px;
            //   right: 100px;
            // }
            img {
              padding: 20px;
              box-sizing: border-box;
              width: 100%;
            }
          }
          .imgs__wecode {
            width: 240px;
            height: 240px;
            background-color: #fff;
            position: absolute;
            top: -226px;
            left: 123px;
            z-index: 3;
            img {
              padding: 20px;
              box-sizing: border-box;
              width: 100%;
            }
          }
        }
      }
    }
    .record {
      margin-top: 10px;
      p {
        color: #5d5d5d;
        line-height: 30px;
        text-align: center;
      }
    }
  }
}
</style>