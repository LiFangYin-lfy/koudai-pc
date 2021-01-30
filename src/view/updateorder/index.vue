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

    <!-- 我的订单  + 张小北 -->
    <div class="order" :data="updateorders">
      <div class="w clearfix">
        <!-- 左侧 -->
        <div class="left_name left">
          <my-personal></my-personal>
        </div>
        <!-- 右侧 -->
        <div class="right_order left">
          <div class="my_order">
            <img src="../../assets/image/order2.png" alt />

            <span>我的订单</span>
          </div>
          <!-- 图集 -->
          <div class="order_one">
            <div class="order_title">
              <div class="title_left">
                <img src="../../assets/image/yx_order.png" alt />
                <span>订单号:298342389574343</span>
              </div>
            </div>
            <div class="order_content">
              <div class="order_left_img">
                <img src="../../assets/order/NoPath_img.png" alt />
                <!-- 限时特惠 -->
                <div class="flash_sale">
                  <div class="time_limit">
                    <div class="sale">
                      <span>限时特惠</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 右侧内容 -->
              <div class="order_right_content">
                <div class="top_content clearfix">
                  <div class="content_details left">
                    <p>封面是书的脸面,起保护书页和装饰封里也叫封二即封面的里面封面是书的脸面起保护书起保护书页和装饰封里饰作用...</p>
                    <div class="small_title_change">
                      <p>一年级</p>
                      <p>自然拼读-拼读</p>
                    </div>
                    <p>下单时间:2020-01-02 03:32:34</p>
                  </div>
                  <div class="order_price left">
                    <p>￥3000</p>
                    <del>￥129</del>
                    <p>
                      <span>*</span>
                      2020-03-30更新
                    </p>
                  </div>
                </div>
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
  // 我的订单  带合计框
  name: "updateorder",
  data() {
    return {
      updateorders: "",
      order_id: ""
    };
  },
  created() {
    this.getUpdateorderList();
  },
  methods: {
    async getUpdateorderList() {
      const order_id = this.$route.query.order_id;
      this.order_id = order_id;
      const {
        data: { data }
      } = await this.$http.post("api/user/order", {});
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
  //   订单
  .order {
    .w {
      .left_name {
        width: 256px;
        height: 700px;
        box-shadow: 5px 5px 5px #f4f4f4;
        background-color: #fff;
      }
      .right_order {
        margin-left: 16px;
        width: 928px;
        height: 700px;
        border-bottom: 2px solid #f5f5f5;
        padding: 20px 32px;
        box-sizing: border-box;
        box-shadow: 5px 5px 5px #f4f4f4;
        background-color: #fff;
        .my_order {
          height: 50px;
          line-height: 50px;
          img {
            width: 19px;
            height: 22px;
            vertical-align: baseline;
          }
          span {
            padding-left: 10px;
            font-size: 20px;
          }
        }
        // 图文集
        .order_one {
          padding: 20px 0;
          box-sizing: border-box;
          border-bottom: 1px solid #f5f5f5;
          .order_title {
            display: flex;
            flex-direction: row;
            margin-bottom: 10px;

            .title_left {
              height: 30px;
              width: 100%;
              line-height: 30px;
              justify-content: flex-start;
              span {
                font-size: 16px;
                margin-left: 10px;
              }

              img {
                width: 20px;
                height: 24px;
              }
            }
          }
          // 订单内容
          .order_content {
            display: flex;
            .order_left_img {
              width: 224px;
              height: 139px;
              position: relative;
              img {
                width: 100%;
              }
              // 限时特惠
              .flash_sale {
                position: absolute;
                top: 0;
                left: 0;
                width: 0;
                height: 0;
                border-top: 32px solid #ff0000;
                border-right: 32px solid transparent;
                border-bottom: 32px solid transparent;
                border-left: 32px solid #ff0000;
                .time_limit {
                  position: relative;
                  .sale {
                    width: 40px;

                    color: #fff;
                    font-size: 14px;
                    position: absolute;
                    font-family: 迷你简菱心;
                    line-height: 15px;
                    top: -32px;
                    left: -28px;
                    transform: rotate(-45deg);
                  }
                }
              }
            }

            .order_right_content {
              flex: 1;
              position: relative;
              .top_content {
                display: flex;
                .content_details {
                  width: 502px;
                  p:nth-child(1) {
                    font-size: 16px;
                    margin-left: 20px;
                  }
                  p:nth-child(3) {
                    font-size: 12px;
                    color: #ccc;
                    line-height: 30px;
                    padding-left: 20px;
                  }
                  .small_title_change {
                    margin: 10px 20px 10px 0;
                    height: 20px;
                    p {
                      float: left;
                      color: #fff;
                      font-size: 14px;
                      text-align: center;
                      margin-right: 10px;
                    }
                    p:nth-child(1) {
                      display: block;
                      height: 20px;
                      width: 50px;
                      background-color: #ff5823;
                    }
                    p:nth-child(2) {
                      display: block;
                      height: 20px;
                      width: 100px;
                      background-color: #ffa200;
                    }
                  }
                }
                .order_price {
                  flex: 1;
                  text-align: right;
                  padding-right: 20px;
                  p:nth-child(1) {
                    color: red;
                    font-weight: bold;
                    font-size: 35px;
                  }
                  p:nth-child(3) {
                    span {
                      color: #ff0000;
                    }
                    color: #999999;
                    font-size: 12px;
                  }
                  del {
                    color: #999999;
                    line-height: 30px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  //   合计
  .total_box {
    width: 296px;
    height: 360px;
    background-color: #fff;
    box-shadow: 10px 10px 10px #ccc;
    padding: 20px;
    box-sizing: border-box;
    position: absolute;
    top: 470px;
    left: 1580px;

    .total {
      height: 60px;
      border-bottom: 1px solid #8b9cbc;

      h1 {
        float: left;
        color: #416fae;
        line-height: 58px;
        border-bottom: 3px solid #416fae;
      }
      span {
        float: left;
        color: #8b9cbc;
        line-height: 70px;
        margin-left: 10px;
      }
    }
    .slip {
      height: 270px;
      margin-top: 10px;
      position: relative;
      .total_store {
        height: 50px;
        .store_count {
          float: left;
          display: block;
          width: 130px;
          height: 50px;
          line-height: 50px;
          font-size: 16px;
          color: #999999;
        }
        p {
          float: right;
          color: #000;
          font-size: 20px;
          font-weight: 600;
          line-height: 50px;
        }
      }
      .discount {
        height: 50px;
        .discount_count {
          float: left;
          display: block;
          width: 130px;
          color: #999999;
          font-size: 16px;
          height: 50px;
          line-height: 50px;
        }
        p {
          float: right;
          color: #000;
          font-size: 20px;
          text-align: right;
          font-weight: 600;
          line-height: 50px;
        }
      }
      .total_price {
        height: 50px;
        .price_count {
          float: left;
          display: block;
          width: 130px;
          height: 50px;
          line-height: 50px;
          font-size: 20px;
          color: #000;
        }
        p {
          float: right;
          color: #ff0000;
          font-size: 24px;
          line-height: 50px;
          font-weight: 600;
        }
      }
      .pay {
        position: absolute;
        bottom: 50px;
        left: 50px;

        input {
          height: 48px;
          width: 160px;
          border-style: none;
          background-color: #416fae;
          border: 1px solid #416fae;
          border-radius: 25px;
          text-align: center;
          outline: none;
          color: #fff;
        }
      }
    }
  }
}
</style>
