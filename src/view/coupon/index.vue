<template>
  <div class="container">
    <!-- 头部区域 -->
    <my-header></my-header>
    <!-- 优惠券 -->
    <div class="coupons">
      <div class="w">
        <!-- 标题 -->
        <div class="coupon_title">
          <img src="../../assets/image/coupon.png" alt />
          <span>优惠券</span>
        </div>
        <div class="ticket" :data="couponList">
          <div
            class="ticket_one clearfix"
            v-for="(item, index) in couponList"
            :key="index"
          >
            <div class="ticket_img left">
              <div class="tit_item">
                <span class="icon1">￥</span>
                <span class="icon2">{{ item.face_value }}</span>
              </div>
              <div class="full_reduction_value" v-if="item.type == 2">
                满<span class="itemfull">{{ item.full_reduction_value }}</span
                >可用
              </div>
              <div
                v-if="item.goods_type == 1 && item.type == 1"
                class="full_reduction_value"
              >
                全场通用
              </div>
              <div
                v-if="item.goods_type == 2 && item.type == 1"
                class="full_reduction_value"
              >
                部分商品可用
              </div>
            </div>
            <div class="ticket_text left">
              <p class="two_text">{{ item.name }}</p>
              <p>到期时间：{{ item.end_time }}</p>
              <div class="ticket_number">
                <el-button class="btn" @click="employ" style="line-height: 0"
                  >立即使用</el-button
                >
              </div>
              <div class="circle_1">
                <img :src="item.image" v-if="item.image != ''" alt />
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
  // 优惠券
  name: "coupon",
  data() {
    return {
      // 初始化优惠券
      couponList: [],
      reqParams: {
        page: 1
      }
    };
  },
  created() {
    this.getCoupon();
  },
  methods: {
    async getCoupon() {
      const {
        data: { data }
      } = await this.$http.post("api/user/coupons", this.reqParams);

      this.couponList = data.list;
    },
    //  立即使用
    employ() {
      // 点击跳转至订单页面
      this.$router.push('/')
    }
  }
};
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  background-color: #fbf8fb;
  height: 100%;
  // 优惠券
  .coupons {
    margin-top: 30px;

    .w {
      background-color: #fff;
      padding: 20px;
      box-sizing: border-box;
      // 标题
      .coupon_title {
        height: 50px;
        line-height: 50px;
        img {
          vertical-align: baseline;
        }
        span {
          font-size: 26px;
          color: #2c2c2c;
          margin-left: 10px;
        }
      }
      // 券
      .ticket {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 30px;
        .ticket_one {
          width: 43%;
          height: 152px;
          box-shadow: 5px 5px 5px #ccc;
          margin: 0 0 58px 47px;
          border-radius: 8px;

          .ticket_img {
            width: 176px;
            height: 152px;
            background-color: #416fae;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-radius: 8px 0 0 8px;

            .tit_item {
              .icon1 {
                font-size: 37px;
                color: #fff;
                font-weight: bold;
              }
              .icon2 {
                font-size: 55px;
                color: #fff;
                font-weight: bold;
              }
            }
            .full_reduction_value {
              font-size: 20px;
              color: #fff;
            }
          }
          .ticket_text {
            position: relative;
            width: 322px;
            height: 152px;
            padding: 14px 10px 0;
            box-sizing: border-box;
            overflow: hidden;

            p:nth-child(1) {
              color: #000;
              line-height: 28px;
              font-size: 20px;
            }
            p:nth-child(2) {
              width: 100%;
              color: #ccc;
              line-height: 20px;
              font-size: 14px;
              padding: 10px 0;
              box-sizing: border-box;
              span:nth-child(1) {
                width: 100px;
              }
              span:nth-child(2) {
                width: 10px;
              }
              span:nth-child(3) {
                width: 100px;
              }
            }
            .ticket_number {
              display: flex;
              align-items: center;
              justify-content: flex-end;
              margin-top: 30px;

              .btn {
                width: 112px;
                // height: 30px;
                color: #fff;
                border: solid 1px #416fae;
                border-radius: 15px;
                background-color: #416fae;
              }
            }
            .circle_1 {
              position: absolute;
              top: 0;
              right: 0;
            }
          }
        }
      }
    }
  }
}
</style>