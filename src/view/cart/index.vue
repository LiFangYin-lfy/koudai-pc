<template>
  <div class="container">
    <!-- 头部区域 -->
    <my-header></my-header>
    <!-- 购物车 -->
    <div class="cart" :data="cart">
      <div class="w">
        <div class="my_cart">
          <img src="../../assets/order/shop(3).png" alt />
          <span>购物车</span>
        </div>
        <div class="dashed"></div>
        <!-- 有购物车数据 -->
        <div class="youstore" v-if="cart.length != 0">
          <div class="solid_top">
            <!-- 全选   商品名称 -->
            <div class="left_change">
              <div class="item_C" @click.stop="checkedAll">
                <div class="box_c">
                  <img
                    src="../../assets/image/changefang.png"
                    v-if="all_cloose == 1"
                    alt
                  />
                  <img src="../../assets/image/fang.png" v-else alt />
                </div>
                <div class="allchange">全选</div>
              </div>
            </div>
            <div class="left_change">
              <span>商品名称</span>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="shop_list">
            <div class="store" v-for="(item, index) in cart" :key="index">
              <div @click.stop="is_cloose(index)" class="box">
                <img
                  src="../../assets/image/changefang.png"
                  v-if="item.is_cloose == 1"
                  alt
                />
                <img src="../../assets/image/fang.png" v-else alt />
              </div>
              <div class="listbox" @click="goTointroduce(item)">
                <div class="store_content">
                  <img :src="item.image" alt />
                </div>
                <div class="flash_sale" v-if="item.reduced_price != 0">
                  <div class="time_limit">
                    <div class="sale">
                      <span>限时特惠</span>
                    </div>
                  </div>
                </div>
                <div class="store_right_content">
                  <div class="top_content">
                    <div class="content_details three_text">
                      {{ item.name }}
                    </div>
                    <div class="order_price">
                      <div class="reduced_price">
                        <span class="icon_price" v-if="item.price != '免费'"
                          >￥</span
                        >
                        <span class="price_Item">{{
                          item.reduced_price == 0
                            ? item.price
                            : item.reduced_price
                        }}</span>
                      </div>
                      <del class="delcolor" v-if="item.reduced_price != 0"
                        >￥{{ item.price }}</del
                      >
                    </div>
                  </div>
                  <div class="change_icon">
                    <!-- 收藏 -->
                    <div
                      class="five_star left"
                      @click.stop="toggleStatus(item.goods_id)"
                    >
                      <img
                        src="../../assets/order/icon_38@2x.png"
                        alt
                        v-if="item.is_collect == 1"
                      />
                      <img
                        src="../../assets/order/icon_36@2x (2).png"
                        v-else
                        alt
                      />
                    </div>
                    <!-- 删除 -->
                    <div class="img_del left" @click.stop="deleteStore(item)">
                      <img src="../../assets/order/icon_37@2x.png" alt />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 无购物车数据 -->
        <div class="nostore" v-else>
          <div class="empty_img">
            <img src="../../assets/image/emptycart.png" alt />
          </div>
          <div class="prompts">
            <span>
              您的购物车暂无商品，
              <a href="/" target="_self">快去选购吧</a>
            </span>
          </div>
          <div class="hot_store">
            <img src="../../assets/order/hot (1).png" alt />
            <span>热销商品</span>
            <span @click="moreStore">更多></span>
          </div>
          <div
            class="loops"
            @mouseenter.stop="mouseover"
            @mouseleave.stop="removeActive"
          >
            <swiper :options="swiperOption">
              <swiper-slide
                class="swiper_item"
                v-for="(item, index) in groomList"
                :key="index"
              >
                <div class="list_loops" @click="ToDetails(item)">
                  <div class="img__">
                    <img :src="item.image" alt />
                  </div>
                  <div class="flash_sale" v-if="item.reduced_price != 0">
                    <div class="time_limit">
                      <div class="sale">
                        <span>限时特惠</span>
                      </div>
                    </div>
                  </div>
                  <div class="text two_text">{{ item.name }}</div>
                  <div class="price">
                    <div class="price_red">
                      <span class="item1" v-if="item.price != '免费'">￥</span>
                      <span>{{
                        item.reduced_price == 0
                          ? item.price
                          : item.reduced_price
                      }}</span>
                    </div>
                    <div class="people">
                      <img src="../../assets/image/eye.png" alt />
                      <span>{{ item.view_num }}</span>
                    </div>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
            <div class="prev btn_1 btn_prev" v-show="up">
              <img
                src="../../assets/image/index_tab_l.png"
                class="left-btn sm-btn"
              />
            </div>
            <div class="next btn_1 btn_next" v-show="up">
              <img
                src="../../assets/image/index_tab_r.png"
                class="right-btn sm-btn"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  合计 -->
    <div class="totaldown">
      <div class="w">
        <div class="downlist">
          <div class="downone">
            <div class="topones">
              <div class="totalnum">
                已选择
                <span class="red">{{
                  extra.goods_num ? extra.goods_num : 0
                }}</span>
                件商品
              </div>
              <div class="totalprice">
                <span class="total_name">总价：</span>
                <div class="order_price tot">
                  <span class="icon_price in1" v-if="extra.price > 0">￥</span>
                  <span class="price_Item in2">{{
                    extra.price ? extra.price : "0"
                  }}</span>
                </div>
              </div>
            </div>
            <div class="toptwo">
              <div class="discount_name">
                <span class="total_name1">折扣：</span>
                <div class="order_price tot1">
                  <span class="icon_price icon1" v-if="extra.discount > 0"
                    >￥</span
                  >
                  <span class="price_Item icon2">{{
                    extra.discount ? extra.discount : 0
                  }}</span>
                </div>
              </div>
              <div class="price_count">
                <span class="total_name2">合计：</span>
                <div class="order_price tot2">
                  <span class="icon_price icon1" v-if="extra.total > 0"
                    >￥</span
                  >
                  <span class="price_Item icon2">{{
                    extra.total ? extra.total : 0
                  }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="pay">
            <el-button class="bbt" style="width: 160px" @click="payOut"
              >付款</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <div class="page" v-if="total != 0">
      <div class="w">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="reqParams.offset"
          :current-page="reqParams.page"
          @current-change="pager"
        ></el-pagination>
      </div>
    </div>

    <!-- 尾部 -->
    <my-footer></my-footer>
  </div>
</template>
<script>
import local from "@/utils/local";
import { mapActions } from "vuex";
export default {
  // 购物车
  name: "cart",
  data() {
    return {
      all_cloose: 0,
      cart: [], //购物车数据
      groomList: [], // 推荐
      up: false,
      valueOBG: '',
      car_id: [],
      shopId: [], //购物车id
      look: true,
      id: "",
      ISlogoList: [],
      limit: "",
      slectedStore: [], //已选
      is_collect: 0, // 0=未收藏  1 收藏
      is_authorize_logo: "2",
      extra: "",
      reqParams: {
        car_id: "",
        page: 1,
        offset: 10
      },
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 30,
        freeMode: true, // 不止滑动一格
        navigation: {
          nextEl: ".next",
          prevEl: ".prev"
        },
      },
      arr: [],  //  追加得商品id
      slide: false,
      total: 0,
    };
  },
  created() {
    this.getCartList();
    this.getGroomList();

  },
  methods: {
    ...mapActions(['addStoreCount']),
    pager(newPage) {   // 分页函数
      this.reqParams.page = newPage
      this.getCartList()
    },
    async getCartList() { // 获取购物车列表  
      let shopCart = JSON.parse(localStorage.getItem('shopCart'))
      let token = localStorage.getItem("koudaishangcheng-key");
      if (token) {
        try {
          const {
            data: { data }
          } = await this.$http.post("api/user/car", this.reqParams);
          if (data.list.length != 0) {
            data.list.forEach(item => {
              item.is_cloose = 0
            })
          }
          this.all_cloose = 0
          console.log(data);
          this.cart = data.list;
          this.total = data.total;
        } catch (err) {
          console.log(err);
          this.$message.error(err)
        }
      } else {  // 没有token
        if (shopCart.length != 0) {
          shopCart.forEach(item => {
            item.is_cloose = 0
          })
        }
        this.cart = shopCart
        console.log(this.cart);
      }
    },
    async getGroomList() {
      try {
        const {
          data: { data }
        } = await this.$http.post("api/goods/randGoods");
        this.groomList = data;
        console.log(data);
      } catch (err) {
        console.log(err);
        this.$message.error(err.data.msg)
      }
    },
    goTointroduce(item) {  // 去详情
      this.$router.push({ path: "/loopcart", query: { goods_id: item.goods_id, type: item.type } });
    },
    ToDetails(item) {
      this.$router.push({ path: "/loopcart", query: { goods_id: item.id, type: item.type } })
    },
    async totalNUM() {   // 合计
      let totalPrice = []
      let cartID = this.car_id
      cartID.forEach(item => {
        let storeObj = {}
        storeObj.is_authorize_logo = 2
        storeObj.goods_id = item
        totalPrice.push(storeObj)
      })
      console.log(totalPrice);
      try {
        const {
          data: { data }
        } = await this.$http.post("api/order/getCarTotal", totalPrice);
        this.extra = data;
        console.log(data);
      } catch (err) {
        console.log(err);
        // this.$message.error(err.data.msg)
      }
    },
    checkedAll() {    // 全选
      let that = this;
      let cartID = []
      let shopId = []
      let cartlist = that.cart
      let token = localStorage.getItem("koudaishangcheng-key")
      if (that.all_cloose == 1) {
        that.all_cloose = 0
        cartlist.forEach(value => {
          value.is_cloose = 0
        })
        that.car_id = []
        that.shopId = []
      } else {
        that.all_cloose = 1
        cartlist.forEach(value => {
          value.is_cloose = 1
          cartID.push(value.goods_id)
          shopId.push(value.car_id)
        })
      }
      that.cart = cartlist
      that.car_id = cartID
      that.shopId = shopId
      that.totalNUM()
      console.log(that.cart, "cart");
      console.log(that.car_id, "car_id");
      console.log(that.shopId, "shopId");
    },
    is_cloose(send) {  // 单选
      let that = this
      let list = that.cart
      let carId = that.car_id
      let shopId = that.shopId
      list.forEach((item, index) => {
        if (send == index) {
          if (item.is_cloose == 0) {
            item.is_cloose = 1
            if (carId.indexOf(item.goods_id == -1)) {
              carId.push(item.goods_id)
              shopId.push(item.car_id)
            }
          } else {
            item.is_cloose = 0
            let x = carId.indexOf(item.goods_id)
            let k = shopId.indexOf(item.car_id)
            if (x != -1) {
              carId.splice(x, 1)
              shopId.splice(k, 1)
            }
          }
        }
      })
      if (carId.length == list.length) {
        this.all_cloose = 1
      } else {
        this.all_cloose = 0
      }
      that.cart = list
      that.car_id = carId
      that.shopId = shopId
      // console.log(carId);
      that.totalNUM()
    },
    payOut() {  // 付款
      let that = this
      let token = localStorage.getItem("koudaishangcheng-key")
      if (token) {
        if (that.car_id.length > 0) {
          console.log(this.shopId);
          this.$router.push({
            path: "/confirm",
            query: {
              routeParams: JSON.stringify({ car_id: this.shopId, num: 2, admin_id: 1 })
            }
          });
        } else {
          this.$message.warning('请先选中要购买的商品')
        }

      } else {
        this.$confirm('登录之后才可购买', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return router.push('/login')
        }).catch(() => {

        });
      }

    },
    async toggleStatus(idt) {  // 添加收藏 取消收藏
      try {
        const {
          data
        } = await this.$http.post("api/sundry/addGoodsCollect", {
          goods_id: idt
        });
        console.log(data);
        this.$message.success(data.msg);
        this.shopId = []
        this.car_id = []
        this.totalNUM()
      } catch (err) {
        console.log(err);
        this.$message.error(err.data.msg)
      }
      this.getCartList()
    },
    deleteStore(state) {
      let shopId = this.shopId
      let car_id = this.car_id
      console.log(state, "state");
      this.$confirm
        ("此操作将永久删除该商品, 是否继续?", "温馨提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(async () => {
          let token = localStorage.getItem("koudaishangcheng-key");
          if (token) {
            try {
              const { data } = await this.$http.post("api/sundry/delCar", { id: state.car_id });
              console.log(data);
              let k = shopId.indexOf(state.car_id)
              let m = shopId.indexOf(state.goods_id)
              if (k != -1) {
                shopId.splice(k, 1)
                car_id.splice(k, 1)
              }
              // this.shopId = shopId
              // this.car_id = car_id
              this.shopId = []
              this.car_id = []
              console.log(shopId, "shopId");
              console.log(car_id, "car_id");

              this.$message.success('删除成功');
              this.getCartList();
              this.totalNUM()
            } catch (err) {
              console.log(err);
              this.$message.error(err.data.msg)
            }
          }
        });
    },
    mouseover() {
      this.up = true;
    },
    removeActive() {
      this.up = false;
    },
    moreStore() {
      this.$router.push("/");
    },


  }
};
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  background-color: #fbf8fb;
  height: 100%;
  padding-bottom: 30px;
  // 购物车
  .cart {
    padding-top: 20px;
    .w {
      .my_cart {
        height: 50px;
        width: 136px;
        line-height: 50px;
        position: relative;
        border-bottom: 3px solid #416fae;

        img {
          width: 24px;
          position: absolute;
          top: 50%;
          margin-top: -10px;
        }

        span {
          color: #2c2c2c;
          font-size: 20px;
          font-weight: 600;
          margin-left: 40px;
        }
      }
      .dashed {
        width: 100%;
        border-bottom: 1px solid #416fae;
      }
      .youstore {
        .solid_top {
          height: 30px;
          padding: 10px 0;
          display: flex;
          background-color: #f4f5f9;
          margin: 10px 0;
          .left_change {
            flex: 1;
            .item_C {
              display: flex;
              align-items: center;
              .box_c {
                width: 50px;
                padding: 0 10px 0 20px;
                box-sizing: border-box;
                img {
                  width: 20px;
                  height: 20px;
                }
              }
              .allchange {
                font-size: 16px;
                font-weight: bold;
              }
            }

            span {
              margin-left: 20px;
              font-size: 16px;
              font-weight: bold;
            }
          }
        }
        //   商品列表
        .shop_list {
          .store {
            width: 100%;
            margin-bottom: 5px;
            padding: 20px 0;
            box-sizing: border-box;
            border-bottom: 1px solid #f5f5f5;
            background-color: #fff;
            display: flex;
            align-items: center;

            .box {
              height: 139px;
              line-height: 139px;
              width: 50px;
              padding: 0 10px 0 20px;
              box-sizing: border-box;
              img {
                width: 20px;
                height: 20px;
              }
            }
            .listbox {
              flex: 1;
              display: flex;
              align-items: center;
              height: 139px;
              position: relative;
              // 商品内容
              .store_content {
                width: 224px;
                height: 139px;

                img {
                  width: 224px;
                  height: 139px;
                  border-radius: 6px;
                }
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
              .store_right_content {
                flex: 1;
                position: relative;
                height: 139px;
                .top_content {
                  display: flex;
                  width: 100%;
                  .content_details {
                    flex: 1;
                    font-size: 20px;
                    color: #666666;
                    padding: 10px 20px;
                    box-sizing: border-box;
                    height: 106px;
                    line-height: 30px;
                    .logo_money {
                      height: 20px;
                      line-height: 20px;
                      margin: 20px;
                      img {
                        width: 20px;
                        height: 20px;
                        padding-bottom: 4px;
                        box-sizing: border-box;
                      }
                    }
                  }
                  .order_price {
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

                .change_icon {
                  position: absolute;
                  bottom: 5px;
                  right: 20px;
                  .five_star {
                    width: 40px;
                    height: 40px;
                    margin-right: 30px;
                    img {
                      width: 100%;
                    }
                  }
                  .img_del {
                    width: 40px;
                    height: 40px;
                    img {
                      width: 100%;
                    }
                  }
                }
              }
            }
          }
        }
      }
      .nostore {
        .empty_img {
          padding-top: 30px;
          width: 50%;
          margin: 0 auto;
          img {
            width: 100%;
            margin: auto;
          }
        }
        .prompts {
          height: 60px;
          text-align: center;
          padding: 30px 0;
          box-sizing: border-box;
          width: 100%;
          span {
            font-size: 20px;
            color: #000;
          }
        }
        .hot_store {
          height: 50px;
          line-height: 50px;
          width: 1200px;
          position: relative;
          img {
            float: left;
            position: absolute;
            top: 6px;
            left: 0px;
          }
          span:nth-child(2) {
            font-size: 20px;
            font-weight: 600;
            margin-left: 37px;
            float: left;
            color: #2c2c2c;
          }
          span:nth-child(3) {
            float: right;
            margin-right: 30px;
            color: #999999;
            font-size: 14px;
          }
        }
        .loops {
          height: 280px;
          position: relative;
          .swiper_item {
            height: 280px;
            // margin: 0 11px !important;
            .list_loops {
              height: 280px;
              box-sizing: border-box;
              background-color: #fff;
              position: relative;
              border-radius: 6px 6px 0 0;
              .img__ {
                // width: 272px;
                // height: 170px;

                img {
                  border-radius: 6px 6px 0 0;
                  width: 100%;
                  height: 170px;
                }
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
              .text {
                font-size: 18px;
                line-height: 25px;
                text-align: left;
                padding: 5px 16px;
                box-sizing: border-box;
              }
              .price {
                .price_red {
                  position: absolute;
                  left: 16px;
                  bottom: 16px;
                  .item1 {
                    color: #ff0000;
                    font-size: 10px;
                  }
                  span {
                    color: #ff0000;
                    font-size: 18px;
                    font-weight: bold;
                  }

                  del {
                    color: #ccc;
                    margin-left: 10px;
                  }
                }
                .people {
                  position: absolute;
                  right: 16px;
                  bottom: 16px;
                  img {
                    width: 20px;
                    height: 10px;
                  }
                  span {
                    margin-left: 5px;

                    font-size: 10px;
                    color: #999999;
                  }
                }
              }
            }
          }

          .btn_prev {
            position: absolute;
            top: 80px;
            left: 10px;
            z-index: 2;
          }
          .btn_next {
            position: absolute;
            right: 10px;
            top: 80px;
            z-index: 2;
          }
        }
      }
    }
  }
  // 第四部分 分页
  .page {
    width: 100%;
    padding: 20px 0;
    box-sizing: border-box;
    .w {
      .el-pagination {
        text-align: right;
      }
    }
  }
  //   合计
  .total_box {
    width: 296px;
    background-color: #fff;
    box-shadow: 10px 10px 10px #ccc;
    padding: 20px;
    box-sizing: border-box;
    position: fixed;
    bottom: 150px;
    right: 20px;
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
      margin-top: 10px;

      height: 100%;
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
        .order_price {
          float: right;
          .icon_price {
            color: #ff0000;
            font-weight: bold;
            font-size: 16px;
            line-height: 50px;
          }
          .price_Item {
            color: #ff0000;
            font-weight: bold;
            font-size: 24px;
            line-height: 50px;
          }
        }
      }
      .discount {
        height: 50px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        .discount_count {
          display: block;
          width: 130px;
          color: #999999;
          font-size: 16px;
          height: 50px;
          line-height: 50px;
        }
        .order_price {
          text-align: right;
          .icon_price {
            color: #000;
            font-size: 16px;
            line-height: 50px;
            font-weight: 600;
          }
          .price_Item {
            color: #000;
            font-size: 24px;
            line-height: 50px;
            font-weight: 600;
          }
        }
      }
      .total_price {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
        .price_count {
          display: block;
          width: 130px;
          height: 50px;
          line-height: 50px;
          font-size: 20px;
          color: #000;
        }
        .order_price {
          text-align: right;
          .icon_price {
            color: #ff0000;
            font-size: 16px;
            line-height: 50px;
            font-weight: 600;
          }
          .price_Item {
            color: #ff0000;
            font-size: 26px;
            line-height: 50px;
            font-weight: 600;
          }
        }
      }
    }
    .pay {
      display: flex;
      justify-content: center;
    }
  }
  .totaldown {
    width: 100%;
    height: 100px;
    background-color: #fbf8fb;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 5;
    .downlist {
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      display: flex;
      background-color: #fff;
      .downone {
        flex: 1;
        height: 100px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: flex-end;
        padding-right: 20px;
        box-sizing: border-box;

        .topones {
          display: flex;
          // height: 40px;
          align-items: center;
          .totalnum {
            font-size: 18px;
            color: #000;
            .red {
              color: #ff0000;
              font-size: 18px;
            }
          }
          .totalprice {
            display: flex;
            align-items: center;
            margin-left: 20px;
            .total_name {
              font-size: 18px;
              color: #000;
            }
            .order_price {
              text-align: right;
              .icon_price {
                color: #ff0000;
                font-size: 12px;
              }
              .price_Item {
                color: #ff0000;
                font-size: 18px;
              }
            }
          }
        }
        .toptwo {
          display: flex;
          align-items: center;
          // height: 40px;
          .discount_name {
            display: flex;
            align-items: center;
            .total_name1 {
              font-size: 18px;
              color: #000;
            }
            .order_price {
              text-align: right;
              .icon_price {
                color: #000;
                font-size: 12px;
              }
              .price_Item {
                color: #000;
                font-size: 18px;
              }
            }
          }
          .price_count {
            margin-left: 30px;
            display: flex;
            align-items: center;
            .total_name2 {
              font-size: 18px;
              color: #000;
            }
            .order_price {
              text-align: right;
              .icon_price {
                color: #ff0000;
                font-size: 14px;
              }
              .price_Item {
                color: #ff0000;
                font-size: 22px;
              }
            }
          }
        }
      }
      .pay {
        width: 160px;
        height: 100px;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>