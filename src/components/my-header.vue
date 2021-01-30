<template>
  <el-header>
    <div class="top">
      <div class="w">
        <div class="nav">
          <ul>
            <li @click.once="toLogin">
              <a>{{ nickname }}</a>
              <span>/</span>
            </li>
            <li @click="toRegister" v-if="showRegister == true">
              <a href="javascript:;">免费注册</a>
              <span>/</span>
            </li>
            <li @click="myOrder">
              <a href="javascript:;">我的订单</a>
              <span>/</span>
            </li>
            <li @click="open" class="personLISE">
              <span class="iddd">个人中心</span>
              <span>/</span>
              <div class="per_center" v-if="pop">
                <div
                  class="popupBOX"
                  @mouseenter="leaveenter"
                  @mouseleave="leavepop"
                >
                  <div class="jiao"></div>
                  <div class="quit">
                    <p @click="loginOut">登出</p>
                  </div>
                  <div class="per_head" @click="account">
                    <div class="head_img">
                      <img :src="avatar" v-if="avatar != ''" alt />
                      <img src="../assets/image/logoimg.png" alt v-else />
                    </div>
                    <div class="head_name">
                      <p>{{ pername }}</p>
                      <div class="head_money">
                        <img src="../assets/image/purse.png" alt />
                        <span>￥</span>
                        <span>{{ money }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="per_data">
                    <!-- 列表信息 -->
                    <ul>
                      <li @click="account">
                        <span>
                          <img src="../assets/image/account.png" alt />
                        </span>
                        <span>账户信息</span>
                      </li>
                      <li @click="order">
                        <span>
                          <img src="../assets/image/order03.png" alt />
                        </span>
                        <span>我的订单</span>
                      </li>
                      <li @click="collect">
                        <span>
                          <img src="../assets/image/collect.png" alt />
                        </span>
                        <span>我的收藏</span>
                      </li>
                      <li @click="cart">
                        <span>
                          <img src="../assets/image/shop01.png" alt />
                        </span>
                        <span class="itemcar">我的购物车</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li @mouseover.stop="enter" @mouseout.stop="out" class="publishhao">
              <a href="javascript:;">公众号</a>
              <div class="imgs__" v-show="coded">
                <img src="../assets/image/top_sanjiao.png" alt />
                <img :src="wechatcode" alt />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- log区域 加搜索框 -->
    <div class="logo_search">
      <div class="w">
        <div class="logo left" @click="tohome">
          <div class="box">
            <img src="../assets/image/logo.png" alt />
          </div>
          <div class="logo_p">
            <p>干货小口袋</p>
            <p>梦想大宇宙</p>
          </div>
        </div>
        <!-- 搜索框 -->
        <div class="search_shop left">
          <div class="search">
            <div class="search_input">
              <i class="el-icon-search"></i>
              <el-input
                class="el_input"
                type="text"
                placeholder="请输入要搜索的关键词"
                v-model="reqParams.keyword"
                @focus="hiddened"
                @change="searchResult"
                ref="input"
              />
              <input
                class="input2"
                type="button"
                value="搜索"
                @click="searchResult"
              />
            </div>

            <div class="input_box" v-show="hiddem">
              <div class="hot_ci">
                <span
                  class="itemsHot"
                  v-for="(item, index) in HotSearch"
                  :key="index"
                  @click="hotword(item)"
                  >{{ item.name }}</span
                >
              </div>
            </div>
          </div>
        </div>
        <router-link to="/cart">
          <div class="shopping_cart right">
            <img class="shop22" src="../assets/image/shop22.png" alt />
            <p>购物车</p>
            <span v-if="storeCount != 0">{{
              storeCount > 0 ? storeCount : "0"
            }}</span>
          </div>
        </router-link>
      </div>
    </div>
  </el-header>
</template>
<script>
import local from "@/utils/local";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex"
import { EventBus } from "./bus";
export default {
  name: "my-header",
  data() {
    return {
      showRegister: true,
      hiddem: false,
      flag: false,
      coded: false,
      pop: false,
      code: "", // 公众号
      searchList: [],
      userInfo: "", // 用户信息
      show: 1,
      keyword: '',
      wechatcode: "",
      HotSearch: [],
      status: 0,
      reqParams: {
        page: 15,
        per_page: 5,
        response_type: "comment",
        keyword: "", // 关键字搜索
        grade: "", // 年级id
        category: "", // 分类id
        price: "", //价格筛选
        view_num: "", //	浏览量排序 1=降序,2=升序
        createtime: "", //	上架时间排序 1=降序,2=升序
        price_type: "", // 价格排序 1=降序,2=升序
        type: "", //	教学进程表
        offset: 1,// 页数  
      },
    };
  },
  computed: {
    ...mapState(['nickname', 'pername', 'money', 'avatar', 'storeCount',]),
  },
  created() {
    this.$forceUpdate()
    this.registername()
    this.getHotSearch()
    this.getshopcounted()
    let token = localStorage.getItem("koudaishangcheng-key");
    if (token) {
      this.getUserInfo()
    }
  },
  methods: {
    ...mapActions(['addStoreCount', 'loginOutInfo', 'userinfo']),
    async getUserInfo() {
      let userInfo = {}
      const {
        data: { data }
      } = await this.$http.post("api/user/getUserInfo");
      userInfo = data;
      this.userinfo(userInfo);
    },
    async getshopcounted() {
      let token = localStorage.getItem("koudaishangcheng-key");
      if (token) {
        var obj = JSON.parse(localStorage.getItem('shopCart'))
        const {
          data: { data }
        } = await this.$http.post("api/user/car");
        // console.log(data);
        if (obj != null) {
          this.cart = data.list.concat(obj); // 购物车数据
          this.numbber = this.list.length
        } else {
          this.cart = data.total
          this.numbber = data.total
        }
        this.addStoreCount(data.total)
        this.cart = this.cart;
        this.numbber = this.numbber;
      } else {         // 没有token
        this.cart = JSON.parse(localStorage.getItem('shopCart'))
      }
    },
    registername() {
      let token = localStorage.getItem("koudaishangcheng-key");
      if (token != null) {
        this.showRegister = false
      } else {
        this.showRegister = true
      }
    },
    hiddened() {
      this.hiddem = !this.hiddem
    },
    searchResult() {
      this.hiddem = !this.hiddem
      this.$router.push({ path: '/articles', query: { keyword: this.reqParams.keyword } })
    },
    // 去登陆
    toLogin() {
      let token = localStorage.getItem("koudaishangcheng-key");
      if (token) {
        this.$router.push("/information");
      } else {
        this.$router.push("/login");
      }
    },
    // 去注册
    toRegister() {
      // 跳转到注册页面
      this.$router.push("/register");
    },
    tohome() {
      this.$router.push("/");
    },
    // 跳转我的订单
    myOrder() {
      let token = localStorage.getItem("koudaishangcheng-key");
      if (token) {
        this.$router.push({ path: '/order', query: { status: JSON.stringify(this.status) } });
      } else {
        this.$message.success('您尚未登录 ，请先登录')
        this.$router.push("/login");
      }
    },
    open() { //  个人中心的显示隐藏
      let token = localStorage.getItem("koudaishangcheng-key");
      if (token) {
        this.pop = !this.pop;
      } else {
        this.$message.success('您尚未登录 ，请先登录')
        this.$router.push("/login");
      }
    },
    // 点击我的账户
    account() {
      // 跳转到基本信息页面
      this.$router.push("/information");
    },
    leavepop() {
      this.pop = false;
    },
    leaveenter() {
      this.pop = true;
    },
    myhome() {   // 去首页
      this.$router.push("/");
    },
    // 跳转到我的订单
    order() {
      this.$router.push({ path: '/order', query: { status: JSON.stringify(this.status) } });
    },
    // 跳转到我的收藏
    collect() {
      this.$router.push("/collect");
    },
    // 跳转到我的购物车
    cart() {
      this.$router.push("/cart");
    },
    // 退出
    async loginOut() {
      try {
        this.pop = !this.pop
        this.flag = false
        await this.$http.get("api/user/logout");
        this.loginOutInfo();
        this.$message.success("退出成功");
        local.delUser();
        sessionStorage.clear()
        localStorage.clear()
        // this.$router.push('/login')
        this.$router.push({ path: '/login', query: { toLogin: '0' } })
      } catch (err) {
        console.log(err);
      }
    },
    async getSearchList() {
      const {
        data: { data }
      } = await this.$http.post("api/index/goodsList", this.reqParams);
      this.searchList = data.list || {};
      if (this.searchList.length > 0) {
        console.log(this.searchList, data);
        this.$emit("result", this.searchList);
      } else {
        this.$message.error("未查询到内容");
      }
    },
    async getHotSearch() {    //获取热门搜索
      const {
        data: { data }
      } = await this.$http.post("api/sundry/getHotSearch");
      this.HotSearch = data
      // console.log(data);

    },
    // 搜索栏后边的购物车
    goToCart() {
      this.$router.push("/cart");
    },
    // 点击公共号
    async enter() {
      this.coded = !this.coded;
      const { data } = await this.$http.post("api/sundry/getQrcode", { type: 1 });
      this.wechatcode = data.data;
    },
    out() {
      this.coded = !this.coded;
    },
    hotword(item) {  // 热搜
      console.log(item, "热搜");
      this.reqParams.keyword = item.name
      this.$router.push({ path: '/articles', query: { keyword: this.reqParams.keyword } })
      this.hiddem = !this.hiddem
    },
  }
};
</script>

<style scoped lang='less'>
.top {
  height: 40px;
  // background-color: #416fae;
  background: linear-gradient(
    93deg,
    rgba(39, 80, 140, 1) 0%,
    rgba(65, 111, 174, 1) 100%
  );
  opacity: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .w {
    .nav {
      height: 20px;
      line-height: 20px;
      float: right;
      ul {
        // height: 20px;
        li {
          float: left;
          a {
            color: #fff;
            font-size: 16px;
          }
          a:hover {
            color: #ffa200;
          }
          span {
            color: #fff;

            margin: 0 10px;
            font-size: 16px;
          }
          .iddd {
            margin: 0;
            color: #fff;
            font-size: 16px;
          }
          .iddd:hover {
            color: #ffa200;
          }
        }
        .personLISE {
          position: relative;
          .per_center {
            position: absolute;
            top: 32px;
            right: -50px;
            width: 256px;
            height: 320px;
            background-color: #fff;
            padding: 20px 16px;
            box-sizing: border-box;
            z-index: 9999;
            border-radius: 4px;
            .popupBOX {
              width: 100%;
              height: 320px;
              .quit {
                height: 22px;
                line-height: 22px;
                text-align: right;
                p {
                  color: #416fae;
                  font-size: 16px;
                }
              }
              .per_head {
                height: 80px;
                border-bottom: 1px dashed #ccc;
                position: relative;
                .head_img {
                  float: left;
                  width: 64px;
                  height: 64px;
                  border-radius: 50%;
                  position: absolute;
                  top: 0;
                  left: 0;
                  img {
                    width: 64px;
                    height: 64px;
                  }
                }
                .head_name {
                  float: left;
                  margin-left: 80px;
                  p {
                    width: 100%;
                    height: 30px;
                    color: #2c2c2c;
                    font-size: 18px;
                    font-weight: 600;
                    line-height: 30px;
                  }
                  .head_money {
                    width: 113px;
                    height: 19px;
                    position: relative;
                    span:nth-child(2) {
                      position: absolute;
                      top: 6px;
                      left: -10px;
                      color: #fff;
                      font-size: 1px;
                    }
                    span:nth-child(3) {
                      font-size: 16px;
                      line-height: 22px;
                      color: #ff5823;
                      margin-left: 5px;
                      position: absolute;
                      top: 2px;
                      left: 14px;
                    }
                  }
                }
              }
              .per_data {
                margin-top: 10px;
                ul {
                  li {
                    height: 40px;
                    line-height: 40px;
                    border-bottom: 1px solid #f5f5f5;
                    display: flex;
                    // padding: 0 20px;
                    box-sizing: border-box;
                    span:nth-child(1) {
                      display: block;
                      width: 20px;
                      height: 20px;
                      img {
                        width: 100%;
                      }
                    }
                    span:nth-child(2) {
                      display: block;
                      height: 40px;
                      line-height: 40px;
                      font-size: 16px;
                      margin-left: 8px;
                      color: #666666;
                    }
                    span:hover {
                      color: red;
                    }
                    .itemcar {
                      margin-left: 6px !important;
                    }
                  }
                  li:hover {
                    background-color: #416fae;
                    width: 218px;
                    opacity: 0.5;
                    span {
                      color: #fff;
                    }
                  }
                }
              }
            }
          }
        }
        .publishhao {
          position: relative;
          .imgs__ {
            width: 240px;
            height: 240px;
            background-color: #fff;
            position: absolute;
            top: 32px;
            right: -90px;
            z-index: 3;
            img:nth-child(1) {
              width: 24px;
              height: 24px;
              position: absolute;
              top: -14px;
              right: 100px;
            }
            img:nth-child(2) {
              padding: 20px;
              box-sizing: border-box;
              width: 100%;
            }
          }
        }
      }
    }
  }
}
.logo_search {
  background-color: #fff;

  .w {
    height: 80px;
    display: flex;
    align-items: center;
    .logo {
      width: 218px;
      display: flex;
      align-items: center;
      justify-content: center;
      .box {
        width: 68px;
        height: 76px;
        img {
          width: 100%;
        }
      }
      .logo_p {
        width: 102px;
        height: 48px;
        margin-left: -8px;

        p {
          color: #27508c;
          font-size: 14px;
          font-weight: 700;
        }
      }
    }
    .search_shop {
      margin-left: 245px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .search {
        position: relative;
        .search_input {
          // border: 1px solid #416fae;
          display: flex;
          justify-content: flex-start;
          position: relative;
          .el-icon-search {
            position: absolute;
            left: 13px;
            top: 17px;
            z-index: 10;
            width: 16px;
            height: 16px;
          }
          .el_input {
            text-indent: 30px;
            height: 44px;
            width: 480px;
            line-height: 44px;
            border: none;
            outline: none;
            border: 1px solid #416fae;
          }
          /deep/input::-webkit-input-placeholder {
            color: #ccc;
            font-size: 14px;
          }
          input:nth-child(3) {
            font-size: 19px;
            float: left;
            width: 104px;
            background: linear-gradient(
              93deg,
              rgba(39, 80, 140, 1) 0%,
              rgba(65, 111, 174, 1) 100%
            );
            border-radius: 0px 4px 4px 0px;
            border: none;
            color: #fff;
          }
        }
        .input_box {
          position: absolute;
          top: 46px;
          left: 0px;
          z-index: 5;
          width: 480px;
          min-height: 200px;
          border: 1px solid #f5f5f5;
          background-color: #fff;
          border-radius: 0 0 8px 8px;
          // padding-bottom: 20px;
          .hot_ci {
            width: 100%;
            padding: 10px 20px;
            box-sizing: border-box;
            height: 100%;
            .itemsHot {
              width: 100%;
              display: block;
              line-height: 22px;
              font-size: 14px;
              margin: 5px;
            }
            .itemsHot:hover {
              color: #416fae;
            }
          }
        }
      }
    }
    .shopping_cart {
      margin-left: 20px;
      display: flex;
      right: -5px;
      width: 144px;
      height: 44px;
      background: linear-gradient(
        93deg,
        rgba(39, 80, 140, 1) 0%,
        rgba(65, 111, 174, 1) 100%
      );
      border: 1px solid #416fae;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      .shop22 {
        width: 33px;
        height: 24px;
      }
      p {
        color: #fff;
        font-size: 19px;
        padding-left: 10px;
      }
      span {
        display: block;
        border: 1px solid #ccc;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        border-radius: 50%;
        background-color: red;
        color: #fff;
        position: absolute;
        right: -10px;
        top: -10px;
      }
    }
  }
}
</style>
<style  >
.el_btn {
  background-color: #416fae !important;
  border: 1px solid #416fae !important;
  color: #fff !important;
  font-size: 18px !important;
  border-radius: 0 0 !important;
}
</style>