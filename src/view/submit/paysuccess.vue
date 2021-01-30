<template>
  <div class="container">
    <!-- 头部区域 -->
    <my-header></my-header>
    <div class="submit_order">
      <div class="w">
        <div class="order_num">
          <p v-if="logo !=2">订单号:{{order_num}}</p>
        </div>
        <div class="order_img">
          <img src="../../assets/order/success.png" alt />
        </div>
        <div class="p">
          <p>订单支付成功</p>
        </div>
      </div>
    </div>
    <!-- 尾部 -->
    <my-footer></my-footer>
  </div>
</template>
<script>
import local from "@/utils/local";
export default {
  // 订单提交成功页面
  name: "submit",
  data() {
    return {
      order_id: "",
      order_num: '',
      order_logo_id: '',
      logo: '',
    };
  },
  created() {
    this.getSubmitPage();
    setTimeout(() => {
      this.$router.push({
        path: "/order", query: {
          status: 3,
          looked: 3
        }
      })
    }, 3000);
  },
  methods: {
    async getSubmitPage() {
      // 取到路由带过来的参数
      const routerParams = this.$route.query;
      // 把数据存到当前数据中
      this.order_id = routerParams.order_id || '';
      this.order_num = routerParams.order_num || '';
      this.order_logo_id = routerParams.order_logo_id || '';
      this.logo = routerParams.logo || '';
      console.log(routerParams);
    }
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
      height: 350px;
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
    }
  }
}
</style>