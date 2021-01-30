<template>
  <div class="container">
    <!-- 头部区域 -->
    <my-header></my-header>
    <!--  个人中心 -->
    <div class="personal" :data="CollectList">
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
    <div class="order">
      <div class="w clearfix">
        <!-- 左侧 -->
        <div class="left_name left">
          <my-personal></my-personal>
        </div>
        <!-- 右侧 -->
        <div class="right_order left" :data="CollectList">
          <!-- 右侧顶部 -->
          <div class="my_collect">
            <div class="order_left">
              <img src="../../assets/order/collect2.png" alt />
              <span>我的收藏</span>
            </div>
            <div class="order_right_search">
              <div class="search_input">
                <i class="el-icon-search"></i>
                <input
                  type="text"
                  placeholder="请输入要搜索的关键词"
                  v-model="reqParams.keyword"
                  placeholder-class="itte"
                />
                <input type="button" value="搜索" @click="search" />
              </div>
            </div>
          </div>
          <!-- 订单详情  订单状态 -->
          <el-table tooltip-effect="dark" style="width: 100%" height="50px">
            <el-table-column type="selection" width="30"></el-table-column>
            <el-table-column label="日期" width="400px"></el-table-column>
            <el-table-column prop="address" label="商品名称" show-overflow-tooltip></el-table-column>
          </el-table>
          <div class="order_number" v-if="CollectList.length!=0">
            <div class="order_one" v-for="(item,index) in CollectList" :key="index">
              <div class="el_checkbox" @click.stop="is_cloose(index)">
                <img src="../../assets/image/changefang.png" v-if="item.is_cloose == 1" alt />
                <img src="../../assets/image/fang.png" v-else alt />
              </div>
              <!-- <el-checkbox class="box left" @click.stop="is_cloose(index)"></el-checkbox> -->
              <div class="order_content">
                <div class="order_left_img">
                  <img :src="item.image" alt />
                </div>
                <div class="flash_sale" v-if="item.reduced_price!= 0">
                  <div class="time_limit">
                    <div class="sale">
                      <span>限时特惠</span>
                    </div>
                  </div>
                </div>
                <!-- 右侧内容 -->
                <div class="order_right_content" @click.stop="goToIntroduce(item)">
                  <div class="top_content clearfix">
                    <div class="content_details left">
                      <p class="item_name two_text">{{item.name}}</p>
                      <p class="item_createtime">下单时间:{{item.createtime}}</p>
                    </div>
                    <div class="order_price left">
                      <div class="item_store">
                        <span class="item_icon">￥</span>
                        <span
                          class="item_price"
                        >{{item.reduced_price == 0?item.price :item.reduced_price}}</span>
                      </div>
                      <del class="reduced_price" v-if="item.reduced_price!=0">￥{{item.price}}</del>
                    </div>
                  </div>
                  <div class="pay">
                    <img
                      src="../../assets/order/shop2 (1).png"
                      alt
                      @click.stop="addCart(item.goods_id)"
                    />
                    <img src="../../assets/order/del.png" alt @click.stop="delItem(item.id)" />
                  </div>
                </div>
              </div>
            </div>

            <div class="btn" v-if="CollectList.length>0">
              <el-button
                class="bbt"
                style="width:272px;height:48px;  margin:20px 30px"
                @click="addAllCart"
              >加入购物车</el-button>
              <el-button
                class="bbt1"
                style="width:272px; height:48px; margin:20px 30px"
                @click="delAllItem"
              >删除</el-button>
            </div>
          </div>
          <div class="empty_order" v-else>
            <div class="empty_img">
              <img src="../../assets/image/emptycart.png" alt />
            </div>
            <div class="prompts">
              <span>
                您的收藏里暂无商品,
                <a href="/" target="_self">快去选购吧</a>
              </span>
            </div>
          </div>
          <!-- </el-scrollbar> -->
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <div class="page">
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
export default {
  // 我的收藏
  name: "collect",
  data() {
    return {
      CollectList: [],
      searchList: [],
      collID: [],
      id: [],
      storeNumber: 0,
      msg: '',
      reqParams: {
        goods_id: "",
        keyword: "",
        page: 1,
        offset: 10,
      },
      total: 0,
    };
  },
  created() {
    this.getCollect();
  },
  methods: {
    pager(newPage) {   // 分页函数
      this.reqParams.page = newPage
      this.getCollect()
    },
    async getCollect() {
      try {
        const {
          data: { data }
        } = await this.$http.post("api/user/collect", this.reqParams);
        if (data.list != 0) {
          data.list.forEach(item => {
            item.is_cloose = 0
          });
          this.$forceUpdate()
        }
        this.CollectList = data.list;
        this.total = data.total;
        console.log(this.CollectList);
      } catch (err) {
        console.log(err);
        this.$message.error(err.data.msg)
      }

    },
    is_cloose(send) {
      let that = this
      // console.log(send);
      let collID = that.collID
      let id = that.id
      let list = that.CollectList
      list.forEach((value, index) => {
        if (send == index) {
          if (value.is_cloose == 0) {
            value.is_cloose = 1
            if (collID.indexOf(value.goods_id) == -1) {
              collID.push(value.goods_id)
              id.push(value.id)
            }
          } else {
            value.is_cloose = 0
            let x = collID.indexOf(value.goods_id)
            let y = id.indexOf(value.id)
            if (x != -1) {
              collID.splice(x, 1)
              id.splice(y, 1)
            }
          }
        }
      })
      that.CollectList = list
      that.collID = collID
      that.id = id
    },
    async addCart(id) {
      try {
        const { data } = await this.$http.post("api/sundry/addCar", { goods_id: id });
        // console.log(data);
        this.$message.success(data.msg);
      } catch (err) {
        console.log(err);
        this.$message.error(err.data.msg)
      }
    },
    async delItem(id) {
      try {
        const { data } = await this.$http.post("api/sundry/delGoodsCollect", { id: id });
        // console.log(data);
        this.$message.success(data.msg);
        this.getCollect()
      } catch (err) {
        console.log(err);
        this.$message.error(err.data.msg)
      }

    },
    async addAllCart() {      //  复选框加入购物车
      let good = this.collID.join(',')
      console.log(good);
      try {
        const { data } = await this.$http.post("api/sundry/addCar", { goods_id: good });
        // console.log(data);
        this.$message.success(data.msg);
      } catch (err) {
        console.log(err);
        this.$message.error(err.data.msg)
      }
    },
    async delAllItem() {  // 复选框删除
      let id = this.id.join(',')
      // console.log(id);
      try {
        const { data } = await this.$http.post("api/sundry/delGoodsCollect", { id: id });
        console.log(data);
        this.$message.success(data.msg);
        this.getCollect()
        this.$forceUpdate()
      } catch (err) {
        console.log(err);
        this.$message.error(err.data.msg)
      }

    },
    search() {
      this.getSearchList();
    },
    // 搜索结果
    async getSearchList() {
      const {
        data: { data }
      } = await this.$http.post("api/user/collect", this.reqParams);
      // console.log("搜索结果", data);
      this.searchList = data.list || {};
      // this.params.keyword = "";
      if (this.searchList.length > 0) {
        this.CollectList = "";
        this.CollectList = this.searchList;
      } else {
        this.$message.error("未查询到内容");
      }
      // console.log(data);
    },
    goToIntroduce(item) {
      console.log(item);
      this.$router.push({ path: "/loopcart", query: { goods_id: item.goods_id, type: item.type } });
    },
  }
};
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  background-color: #fbf8fb;
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
  .order {
    .w {
      .left_name {
        width: 256px;
        height: 778px;
        background-color: #fff;
        box-shadow: 5px 5px 5px #f4f4f4;
      }
      .right_order {
        margin-left: 16px;
        background-color: #fff;
        width: 928px;
        min-height: 778px;
        padding: 20px 32px;
        box-sizing: border-box;
        box-shadow: 5px 5px 5px #f4f4f4;

        // 我的收藏
        .my_collect {
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 15px;

          .order_left {
            display: flex;
            align-items: center;

            img {
              width: 22px;
              height: 22px;
            }
            span {
              padding-left: 10px;
              font-size: 20px;
            }
          }
          .order_right_search {
            .search_input {
              display: flex;
              justify-content: flex-start;
              position: relative;
              .el-icon-search {
                position: absolute;
                left: 16px;
                top: 15px;
              }
              input:nth-child(2) {
                text-indent: 30px;
                height: 38px;
                line-height: 38px;
                color: #ccc;
                font-size: 16px;
                border: none;
                width: 263px;
                border: 1px solid #416fae;
              }
              /deep/input::-webkit-input-placeholder {
                // padding-left: 40px;
                color: #ccc;
                font-size: 14px;
              }
              input:nth-child(3) {
                float: left;
                width: 75px;
                background: linear-gradient(
                  93deg,
                  rgba(39, 80, 140, 1) 0%,
                  rgba(65, 111, 174, 1) 100%
                );
                opacity: 1;
                border-radius: 0px 4px 4px 0px;
                border: none;
                color: #fff;
              }
            }
          }
        }
      }
      .order_number {
        min-height: 606px;
        position: relative;
        width: 100%;
        padding-bottom: 100px;
        .order_one {
          margin: 20px 0;
          box-sizing: border-box;
          border-bottom: 1px solid #f5f5f5;
          height: 160px;
          display: flex;
          align-items: center;
          width: 100%;
          .el_checkbox {
            width: 40px;
            padding: 0 10px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            height: 139px;
          }
          .order_content {
            flex: 1;
            display: flex;
            position: relative;
            .order_left_img {
              width: 224px;
              height: 139px;
              img {
                width: 100%;
                height: 139px;
                border-radius: 8px;
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
            .order_right_content {
              flex: 1;
              position: relative;
              .top_content {
                display: flex;
                width: 100%;
                .content_details {
                  flex: 1;

                  .item_name {
                    font-size: 18px;
                    height: 56px;
                    padding: 5px 16px;
                    box-sizing: border-box;
                  }
                  .item_createtime {
                    font-size: 16px;
                    color: #ccc;
                    line-height: 30px;
                    padding: 5px 16px;
                    box-sizing: border-box;
                  }
                }
                .order_price {
                  width: 150px;
                  text-align: right;
                  padding: 10px 20px 0 0;
                  box-sizing: border-box;
                  .item_store {
                    display: flex;
                    align-items: baseline;
                    justify-content: flex-end;
                    .item_icon {
                      color: red;
                      font-weight: bold;
                      font-size: 14px;
                    }
                    .item_price {
                      color: red;
                      font-weight: bold;
                      font-size: 22px;
                    }
                  }
                  .reduced_price {
                    color: #ccc;
                    margin-left: 10px;
                  }
                }
              }

              .pay {
                position: absolute;
                bottom: 5px;
                right: 20px;
                img:nth-child(1) {
                  margin: 0 30px;
                }
              }
            }
          }
        }

        .btn {
          width: 100%;
          position: absolute;
          bottom: 0px;
          margin: 0 auto;
          background-color: #fff;
          padding-left: 100px;
          box-sizing: border-box;
        }
      }
      .empty_order {
        padding-top: 100px;
        box-sizing: border-box;

        .empty_img {
          width: 60%;
          margin: 0 auto;
          img {
            width: 100%;
            margin: auto;
          }
        }
        .prompts {
          margin-top: 60px;
          height: 60px;
          text-align: center;
          span {
            font-size: 20px;
            color: #000;
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
}
</style>