<template>
  <div>
    <div class="left_name_top" :data="userInfo">
      <div class="ont">
        <div class="header">
          <div class="head">
            <img :src="avatar" v-if="avatar != ''" alt />
            <img v-else src="../assets/image/logoimg.png" alt />
          </div>
          <p>{{pername}}</p>
        </div>
        <!-- 奖章medal  -->
        <div class="medal">
          <div class="medal_img">
            <img :src="vip_logo" v-if="vip_logo != ''" alt />
            <img src="../assets/image/icon_21@2x.png" v-else alt />
          </div>
          <div class="medal_text">
            <p>{{level_name !=''?level_name : '普通会员'}}</p>
          </div>
          <div class="medalIMG" @mouseenter="changeenter" @mouseleave="changeleave">
            <div class="medal_small_img">
              <img src="../assets/order/question.png" alt />
            </div>
            <div class="textsmet" v-if="textsmet">{{RightCenter}}</div>
          </div>
        </div>
      </div>

      <!--  余额和优惠券 -->
      <div class="coupon_sum">
        <div class="coupon" @click="goToCoupon">
          <span>优惠券：</span>
          <span>{{ticket_num !=0?ticket_num : 0}}</span>
        </div>
        <!-- <div class="icon_shu"></div> -->
        <div class="sum">
          <span>余额：</span>
          <span>{{money!=0?money : 0 }}</span>
        </div>
      </div>
    </div>
    <!-- 列表信息 -->
    <div class="list">
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
          <span>我的购物车</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex"
import local from "@/utils/local";
export default {
  // 我的个人信息
  name: "my-personal",
  data() {
    return {
      VIPlist: [],
      RightCenter: '',
      userInfo: "",
      textsmet: false,
      status: 0,
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      }
    };
  },
  computed: {
    ...mapState(['pername', 'money', 'avatar', 'ticket_num', 'level_name', 'vip_logo'])
  },
  created() {
    this.getVIP()
    // console.log(this.level_name);
  },
  methods: {
    // 点击优惠券
    goToCoupon() {
      this.$router.push("/coupon");
    },
    // 点击我的账户
    account() {
      // 跳转到基本信息页面
      this.$router.push("/information");
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
    async getVIP() {
      try {
        const {
          data: { data }
        } = await this.$http.post("api/user/getUserSystem")
        this.VIPlist = data
        // console.log(data);
        data.forEach(item => {
          if (item.name == this.level_name) {
            this.RightCenter = item.describe
          }
        });
        // console.log(this.RightCenter);
      } catch (err) {
        this.$message.error(err.data.msg)
      }
    },
    changeenter() {
      this.textsmet = !this.textsmet
    },
    changeleave() {
      this.textsmet = !this.textsmet
    },

  }
};
</script>
<style scoped lang='less'>
// 左侧部分

.left_name_top {
  border-bottom: 1px solid #f5f5f5;
  .ont {
    padding: 20px 20px 8px;
    box-sizing: border-box;

    .header {
      padding: 32px 60px 10px;
      box-sizing: border-box;
      .head {
        width: 96px;
        height: 96px;
        img {
          width: 100%;
          border-radius: 50%;
        }
      }
      p {
        margin-top: 10px;
        font-size: 16px;
        text-align: center;
      }
    }

    .medal {
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      .medal_img {
        width: 30px;
        height: 40px;
        display: flex;
        align-items: center;
        img {
          width: 25px;
          height: 30px;
        }
      }
      .medal_text {
        line-height: 40px;
        box-sizing: border-box;
        p {
          color: #87b4e4;
        }
      }
      .medalIMG {
        position: relative;
        padding-left: 10px;
        box-sizing: border-box;
        .medal_oeder_img {
          width: 17px;
          height: 17px;
        }
        .textsmet {
          position: absolute;
          bottom: 0px;
          left: 29px;
          padding: 20px;
          min-width: 200px;
          min-height: 50px;
          background-color: #f9f9f9;
          border-radius: 8px;
          z-index: 10;
        }
      }
    }
  }

  .coupon_sum {
    width: 100%;
    background-color: #fff;
    height: 36px;
    padding: 10px 0px;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    .coupon {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      border-right: 1px solid #8b9cbc;
      // opacity: 0.2;
      span:nth-child(1) {
        font-size: 14px;
        color: #ccc;
      }
      span:nth-child(2) {
        margin-left: 10px;
        font-size: 16px;
        color: #ffa200;
        font-weight: bold;
      }
    }
    .sum {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      span:nth-child(1) {
        font-size: 14px;
        color: #ccc;
      }
      .icon_money {
        margin-left: 10px;
        font-size: 12px;
        color: #ff5823;
      }
      span:nth-child(2) {
        font-size: 16px;
        color: #ff5823;
      }
    }
  }
}

// 列表信息
.list {
  margin-top: 15px;

  ul {
    li {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 20px;
      box-sizing: border-box;
      span:nth-child(1) {
        width: 16px;
        display: block;
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
      }
    }
    li:hover {
      background-color: #416fae;
      opacity: 0.5;
      span {
        color: #fff;
        font-weight: bold;
      }
    }
  }
}
</style>