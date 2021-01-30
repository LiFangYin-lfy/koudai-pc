<template>
  <div class="container">
    <!-- 头部区域 -->
    <my-header></my-header>
    <!--  评价 -->
    <div class="appraise" :data="appraise">
      <div class="w">
        <!-- 标题 -->
        <div class="appraise_title">
          <img src="../../assets/order/appraise.png" alt />
          <span>评价</span>
        </div>
        <div class="appraise_content">
          <div class="appraise_content_img">
            <img :src="appraise.image" alt />
            <div class="flash_sale" v-if="appraise.reduced_price!= 0">
              <div class="time_limit">
                <div class="sale">
                  <span>限时特惠</span>
                </div>
              </div>
            </div>
          </div>
          <div class="appraise_content__">
            <div class="topAppraise_content__">
              <div class="appraise_content_text two_text">{{appraise.name}}</div>
              <div class="appraise_content_price">
                <div class="reduced_price">
                  <span class="icon_price">￥</span>
                  <span
                    class="price_Item"
                  >{{appraise.reduced_price == 0?appraise.price :appraise.reduced_price}}</span>
                </div>
                <del class="delcolor" v-if="appraise.reduced_price != 0">￥{{appraise.price}}</del>
              </div>
            </div>
            <!-- <div class="grade">
              <span class="items" v-if="appraise.grade_name!=''">年级：</span>
              <span class="grade_name">{{appraise.grade_name}}</span>
            </div>
            <div class="small_title_change">
              <span class="items" v-if="appraise.category_name!=''">类别：</span>
              <span class="category_name">{{appraise.category_name}}</span>
            </div>-->
          </div>
        </div>

        <!-- 评分 -->
        <div class="store_appraise">
          <label for="商品评分" class="store_title">商品评分</label>
          <div class="block">
            <el-rate v-model="reqParams.score" :colors="colors" class="el_rate"></el-rate>
          </div>
        </div>
        <!-- 评价 -->
        <div class="appraise_txt">
          <label for="评价" class="store_title">评价</label>
          <textarea placeholder="分享使用心得，给想买的人一个参考~" class="txt" v-model="reqParams.content"></textarea>
        </div>
        <!-- 发表按钮 -->
        <div class="n_btn">
          <el-button class="btn" @click="publish">发表</el-button>
        </div>
      </div>
    </div>
    <!-- 尾部 -->
    <my-footer></my-footer>
  </div>
</template>

<script>
export default {
  // 评价
  name: "appraise",
  data() {
    return {
      // value: null,
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      appraise: "",
      status: 0,
      reqParams: {
        score: "", // 评价分数
        content: "", // 评价内容
        goods_id: "", // 商品id
        order_id: "" // 订单id
      }
    };
  },
  created() {
    const item_id = this.$route.query;
    this.reqParams.goods_id = item_id.goods_id;
    this.reqParams.order_id = item_id.order_id;
    console.log(this.reqParams);
    this.getAppraise();
  },
  methods: {
    async getAppraise() {
      try {
        const {
          data: { data }
        } = await this.$http.post("api/goods/goodsInfo", {
          goods_id: this.reqParams.goods_id
        });
        this.appraise = data;
        console.log("订单内容", this.appraise);
      } catch (err) {
        this.$message.error(err.msg)
      }

    },
    // 点击发表
    publish() {
      this.$http
        .post("api/evaluate/addEvaluate", this.reqParams)
        .then(res => {
          this.$message.success("发表成功");
          this.$router.push({ path: '/order', query: { status: JSON.stringify(this.status) } });
        })
        .catch(err => {
          this.$message.success("发表失败");
        });
    }
  }
};
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  background-color: #fbf8fb;
  height: 1300px;
  // 评价
  .appraise {
    margin-top: 30px;

    .w {
      background-color: #fff;
      padding: 20px;
      box-sizing: border-box;
      // 标题
      .appraise_title {
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
      .appraise_content {
        padding-left: 40px;
        box-sizing: border-box;
        display: flex;

        .appraise_content_img {
          width: 224px;
          height: 139px;
          position: relative;

          img {
            width: 100%;
            height: 100%;
            border-radius: 6px;
          }
          // 限时优惠
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
            border-radius: 6px 0 0 0;
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

        .appraise_content__ {
          flex: 1;
          height: 140px;
          background-color: #fff;
          .topAppraise_content__ {
            width: 100%;
            display: flex;
            height: 75px;
            .appraise_content_text {
              flex: 1;
              padding: 10px 20px;
              box-sizing: border-box;
              line-height: 30px;
              color: #666666;
              font-size: 20px;
            }
            .appraise_content_price {
              width: 200px;
              text-align: right;
              padding-right: 20px;
              box-sizing: border-box;
              .reduced_price {
                .icon_price {
                  color: #ff0000;
                  font-weight: bold;
                  font-size: 26px;
                  line-height: 40px;
                }
                .price_Item {
                  color: #ff0000;
                  font-weight: bold;
                  font-size: 35px;
                  line-height: 40px;
                }
              }
              .delcolor {
                margin-top: 5px;
                color: #ccc;
                font-size: 16px;
              }
            }
          }
          .grade {
            height: 20px;
            padding: 0 10px;
            box-sizing: border-box;
            .items {
              font-size: 16px;
              color: #2c2c2c;
              margin: 0 10px;
            }
            .grade_name {
              font-size: 14px;
              color: #2c2c2c;
              margin-right: 10px;
            }
          }
          .small_title_change {
            height: 20px;
            padding: 0 10px;
            box-sizing: border-box;
            .items {
              font-size: 16px;
              color: #2c2c2c;
              margin: 0 10px;
            }
            .category_name {
              font-size: 14px;
              color: #2c2c2c;
              margin-right: 10px;
            }
          }
        }
      }
      // 评分
      .store_appraise {
        display: flex;
        align-items: center;
        margin: 20px 0;
        height: 40px;
        .store_title {
          display: block;
          width: 160px;
          height: 40px;
          line-height: 40px;
          padding-left: 43px;
          box-sizing: border-box;
          font-size: 18px;
        }
        .block {
          display: flex;
          align-items: center;
          height: 40px;
          .el_rate {
            height: 40px;
            display: flex;
            align-items: center;
          }
        }
      }
      // 评价
      .appraise_txt {
        display: flex;
        margin-right: 10px;
        .store_title {
          display: block;
          width: 160px;
          height: 40px;
          line-height: 40px;
          padding-left: 43px;
          box-sizing: border-box;
          font-size: 18px;
        }

        .txt {
          flex: 1;
          height: 120px;
          border: 1px solid #ccc;
          padding: 20px;
          box-sizing: border-box;
        }
      }
      // 保存按钮
      .n_btn {
        height: 176px;
        line-height: 176px;
        text-align: center;
        .btn {
          width: 272px;
          height: 48px;
          background-color: #416fae;
          border-style: none;
          border: 1px solid #416fae;
          border-radius: 106px;
          color: #fff;
        }
      }
    }
  }
}
</style>