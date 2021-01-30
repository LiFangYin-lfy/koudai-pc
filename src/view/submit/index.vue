<template>
  <div class="container">
    <!-- 头部区域 -->
    <my-header></my-header>
    <!-- 订单提交成功 -->
    <div class="submit_order">
      <div class="w">
        <div class="order_num">
          <p v-if="logo != 2">订单号:{{ reqParams.order_num }}</p>
        </div>
        <!-- 成功 -->
        <div class="order_img">
          <img src="../../assets/order/success.png" alt />
        </div>
        <div class="p">
          <p>订单提交成功</p>
        </div>
        <!--  二维码  -->
        <div class="sweep">
          <div class="top_title">
            <p>
              距离二维码过期还剩
              <span>{{ count }}</span> 秒，过期后请刷新页面重新获取二维码。
            </p>
          </div>
          <div class="sweep_coll">
            <div class="sweep_img">
              <img :src="url" class="imgMoney" />
              <div class="success" v-show="successImg">
                <img src="../../assets/order/success.png" alt />
              </div>
            </div>

            <div class="code">
              <img src="../../assets/order/sweep.png" alt />
              <p>请使用微信扫一扫扫描二维码支付</p>
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
var timer = ''
export default {
  // 订单提交成功页面
  name: "submit",
  data() {
    return {
      successImg: true,
      count: 60,
      timer: null,
      reqParams: {
        order_id: "",
        order_num: "",
        is_authorize_logo: "",
        pay_type: "",
      },
      status: 3,
      submitPage: {},
      url: "",
      logo: '',
      order_logo_id: '',

    };
  },
  mounted() {

    if (this.logo != 2) {
      this.getSubmitPage();

      if (localStorage.getItem('orderId') == this.reqParams.order_id && localStorage.getItem('isTrue')) {
      } else {
        this.getCode()
        let token = localStorage.getItem("koudaishangcheng-key");
        token = token.split('"');
        token = token[1];
        this.url =
          "https://glaforteachers.com/api/order/orderPay/order_id" +
          "/" +
          this.reqParams.order_id +
          "/" +
          "pay_type" +
          "/" +
          this.reqParams.pay_type +
          "/" +
          "token" +
          "/" +
          token;
        this.successImg = false
      }
    } else {
      this.getSubmitPaged()
    }
  },
  created() {
    console.log(this.reqParams.pay_type, " this.reqParams.pay_type");
    // 取到路由带过来的参数
    const routerParams = this.$route.query;
    console.log('this.$route.query', this.$route.query);
    // 把数据存到当前数据中;
    this.reqParams.order_id = routerParams.order_id || '';
    this.reqParams.order_num = routerParams.order_num || '';
    this.reqParams.pay_type = routerParams.pay_type || '';
    console.log(this.reqParams.pay_type);
    this.order_logo_id = routerParams.order_logo_id;
    this.logo = routerParams.logo;
  },
  methods: {
    async getSubmitPage() {
      const { data } = await this.$http.post(
        "api/order/orderPay",
        this.reqParams
      );
      // console.log(this.reqParams.order_id);
    },
    getCode() {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
            if (this.logo != 2) {
              this.getcheckOrder()

            } else {
              this.getcheckOrrd()
            }
          } else {
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000)
      }
    },
    async getcheckOrder() {
      var that = this;
      const { data: { data } } = await this.$http.post(
        "api/order/checkOrder", { order_num: this.reqParams.order_num }
      );
      if (data == true) {
        this.successImg = !this.successImg
        localStorage.setItem('isTrue', true)
        localStorage.setItem('orderId', that.reqParams.order_id)
        clearInterval(this.timer);
        setTimeout(function () {
          that.$router.push({ path: '/order', query: { status: JSON.stringify(that.status) } });
        }, 400)
      }
    },
    async getcheckOrrd() {
      var that = this;
      const { data: { data } } = await this.$http.post(
        "api/order_logo/checkOrderLogo", { order_logo_id: this.order_logo_id }
      );
      // console.log(data);
      if (data == true) {
        this.successImg = !this.successImg
        clearInterval(this.timer);
        setTimeout(function () {
          that.$router.push({ path: '/order', query: { status: JSON.stringify(that.status) } });
        }, 400)
      }
    },
    getSubmitPaged() {
      this.getCode()
      console.log(this.logo);
      let that = this
      let token = localStorage.getItem("koudaishangcheng-key");
      token = token.split('"');
      token = token[1];
      that.url =
        "https://glaforteachers.com/api/order_logo/orderLogoPay?order_logo_id=" +
        this.order_logo_id + "&token=" + token;
      console.log(that.url, "url");
      this.successImg = false
    },
  }
};
</script>
<style scoped lang='less'>
.container {
  width: 100%;
  height: 100%;
  // 订单提交成功
  .submit_order {
    margin-top: 40px;
    .w {
      background-color: #fff;
      padding: 0 20px;
      height: 730px;
      .order_num {
        padding: 20px 40px;
        box-sizing: border-box;
        p {
          color: #000;
          font-size: 20px;
          height: 40px;
          line-height: 40px;
        }
      }
      .order_img {
        margin: 40px 0 20px 0;
        position: relative;
        height: 110px;
        img {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          margin: auto;
        }
      }
      .p {
        height: 30px;
        line-height: 30px;
        text-align: center;
        margin-bottom: 80px;
        p {
          font-size: 14px;
        }
      }
      .sweep {
        height: 350px;
        background-color: #f4f5f9;
        .top_title {
          height: 100px;
          line-height: 100px;
          p {
            color: #666666;
            font-size: 20px;
            text-align: center;
            span {
              color: red;
            }
          }
        }
        .sweep_coll {
          height: 212px;
          padding: 20px;
          display: flex;
          .sweep_img {
            flex: 1;
            text-align: center;
            position: relative;
            .imgMoney {
              width: 168px;
              height: 168px;
            }
            .success {
              background-color: #f4f5f9;
              position: absolute;
              top: 0px;
              left: 206px;
              width: 168px;
              height: 168px;
              img {
                width: 96px;
                height: 96px;
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                margin: auto;
              }
            }
          }

          .code {
            flex: 1;
            text-align: center;
            p {
              color: #666666;
              font-size: 14px;
              text-align: center;
            }
          }
        }
      }
    }
  }
}
</style>